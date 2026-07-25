import { OpenAI } from "openai";
import {
  Agent,
  Runner,
  withTrace,
  type InputGuardrail,
  type OutputGuardrail,
  InputGuardrailTripwireTriggered,
  OutputGuardrailTripwireTriggered,
  type AgentOutputType,
} from "@openai/agents";
import { buildProfanityRegex } from "./profanity/asd";
import { PORTFOLIO_CONTEXT } from "./portfolioContext";
import type { AgentInputItem } from "@openai/agents";
import { ENV, readEnv } from "@/lib/env";
import { blockedReply } from "./blockedReply";

const client = new OpenAI({ apiKey: readEnv(ENV.openaiApiKey) });
const runner = new Runner({
  traceMetadata: { __trace_source__: "agent-builder" },
});

const INSTRUCTIONS = `
You are Mathias Huque, a software developer from Uruguay.

You are speaking directly to visitors on your portfolio website.

PRIMARY SCOPE (about me):
- Use ONLY the provided CONTEXT to answer questions about me, my background, my projects, or my experience.
- If the information is not in the context, say you don’t have that information.
- You MAY use the conversation history provided in the messages to answer questions like “what did I ask earlier?” or “what did you say before?”.


SECONDARY SCOPE (general questions):
- If the user asks something NOT related to my portfolio/me (e.g., “what is AI?”, “how does ChatGPT work?”, general tech questions),
  you MAY answer with a VERY BRIEF, generic explanation (no personal claims about me),
  then immediately redirect with ONE short question or suggestion connected to my portfolio (projects, experience, stack, contact).
- Keep it to 1–2 sentences total whenever possible.

Speak in FIRST PERSON (use "I", "my", "me") ONLY when talking about me.
For general questions, you can speak neutrally without claiming personal details.

STYLE:
Answer naturally, like a friendly developer talking about his own work.

IMPORTANT — BREVITY:
- Keep answers SHORT.
- Prefer 1–3 sentences.
- Avoid long paragraphs.
- Avoid lists unless necessary.
- Only include the most relevant information.
- Do not add extra explanations unless asked.

Tone:
Professional, friendly, confident, and conversational.

Rules:
- Do not mention any "context" or that you are an AI.
- Do not invent details about me.
- Reply in the same language as the user's question (Spanish or English).
- If asked about hiring or contact, answer briefly and directly.
- If the user is disrespectful, rude, or uses profanity, respond politely and redirect the conversation toward my work, projects, or experience.


PROACTIVE ACTIONS (STRICTLY FORBIDDEN)
- Do NOT offer to contact anyone.
- Do NOT offer to email, message, call, reach out, schedule, or initiate communication.
- Do NOT ask for the visitor’s contact details.
- Do NOT suggest that you will take action outside this chat.
- You can only provide my contact information.
- Never ask follow-up questions about how I should contact the user.
- You cannot perform actions — only provide information.
- If the user asks about contact, simply provide my email and/or LinkedIn briefly. Do not add anything else.

Goal:
Help visitors quickly understand who I am and what I do, with minimal text, and redirect off-topic questions back to my portfolio.
`;

/**
 * Optional: personal profanity blocklist (cheap + deterministic).
 * This is NOT a moderation replacement; it just catches words you never want to engage with.
 */
const PROFANITY_RE = buildProfanityRegex();

type ModerationAPIResponse = {
  results: Array<{
    flagged: boolean;
  }>;
};

async function isFlaggedByModeration(text: string): Promise<boolean> {
  const respUnknown: unknown = await client.moderations.create({
    model: "omni-moderation-latest",
    input: text,
  });

  const resp = respUnknown as ModerationAPIResponse;
  return Boolean(resp.results?.[0]?.flagged);
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isMessageWithRoleAndContent(
  v: unknown,
): v is { role: string; content: unknown } {
  if (!isRecord(v)) return false;
  return typeof v.role === "string" && "content" in v;
}

function contentToText(content: unknown): string {
  // Agents SDK input items often use string content; sometimes content can be an array.
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((c) => (typeof c === "string" ? c : ""))
      .filter((s) => s.length > 0)
      .join("\n");
  }
  return "";
}

function extractLastUserText(input: unknown): string {
  if (typeof input === "string") return input;
  if (!Array.isArray(input)) return "";

  for (let i = input.length - 1; i >= 0; i--) {
    const item = input[i];
    if (isMessageWithRoleAndContent(item) && item.role === "user") {
      return contentToText(item.content);
    }
  }

  return "";
}

/**
 * Input guardrail: blocks model execution if it trips.
 * It runs serially inside runner.run, before model execution.
 */
const moderationInputGuardrail: InputGuardrail = {
  name: "moderation_input",
  runInParallel: false,
  execute: async ({ input }) => {
    const userText = extractLastUserText(input);

    // If we can't extract user text, don't block.
    if (!userText) {
      return { outputInfo: { flagged: false }, tripwireTriggered: false };
    }

    // Deterministic profanity block
    if (PROFANITY_RE.test(userText)) {
      return { outputInfo: { flagged: true }, tripwireTriggered: true };
    }

    // Contextual moderation block
    const flagged = await isFlaggedByModeration(userText);
    return { outputInfo: { flagged }, tripwireTriggered: flagged };
  },
};

/**
 * Output guardrail: blocks unsafe final output.
 */
const moderationOutputGuardrail: OutputGuardrail<AgentOutputType> = {
  name: "moderation_output",
  execute: async ({ agentOutput }) => {
    const text = String(agentOutput ?? "");
    const flagged = await isFlaggedByModeration(text);
    return { outputInfo: { flagged }, tripwireTriggered: flagged };
  },
};

const agent = new Agent({
  name: "Agent",
  instructions: `${INSTRUCTIONS}\n\n${PORTFOLIO_CONTEXT}`,
  model: "gpt-5-nano",
  modelSettings: { reasoning: { effort: "low" } },
  inputGuardrails: [moderationInputGuardrail],
  outputGuardrails: [moderationOutputGuardrail],
});

type WorkflowInput = {
  input_as_text: string;
  history?: { role: "user" | "assistant"; content: string }[];
};

export const runWorkflow = async (
  workflow: WorkflowInput,
): Promise<{ answer: string }> => {
  return await withTrace("New agent", async () => {
    const userText = workflow.input_as_text ?? "";

    // Keep the deterministic fast-path so known profanity never reaches the model.
    // The same check remains in the input guardrail as a safety boundary.
    if (PROFANITY_RE.test(userText)) {
      return { answer: blockedReply(userText) };
    }

    try {
      const history = workflow.history ?? [];

      const inputItems: AgentInputItem[] = [
        ...history.map((m): AgentInputItem => {
          if (m.role === "user") {
            return { role: "user", content: m.content };
          }
          return {
            role: "assistant",
            status: "completed",
            content: [{ type: "output_text", text: m.content }],
          };
        }),
        { role: "user", content: userText },
      ];

      const result = await runner.run(agent, inputItems);
      return { answer: String(result.finalOutput) };
    } catch (e: unknown) {
      if (e instanceof InputGuardrailTripwireTriggered) {
        return { answer: blockedReply(userText) };
      }
      if (e instanceof OutputGuardrailTripwireTriggered) {
        return { answer: blockedReply(userText) };
      }
      throw e;
    }
  });
};
