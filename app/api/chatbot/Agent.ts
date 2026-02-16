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

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const INSTRUCTIONS = `
You are Mathias Huque, a software developer from Uruguay.

You are speaking directly to visitors on your portfolio website.

Use ONLY the provided CONTEXT to answer questions about yourself.
If the information is not in the context, say you don’t have that information.

Speak in FIRST PERSON (use "I", "my", "me").

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
- Do not invent details.
- Reply in the same language as the user's question (Spanish or English).
- If asked about hiring or contact, answer briefly and directly.
- If the user is disrespectful, rude, or uses profanity, respond politely and redirect the conversation toward my work, projects, or experience.

Goal:
Help visitors quickly understand who you are and what you do, with minimal text.
`;

type Lang = "en" | "es";

function detectLang(text: string): Lang {
  return /[áéíóúñ¿¡]/i.test(text) ? "es" : "en";
}

function blockedReply(text: string): string {
  const lang = detectLang(text);
  return lang === "es"
    ? "No hace falta hablar así. Si querés, preguntame sobre mi trabajo, proyectos o experiencia."
    : "No need for that. Feel free to ask about my work, projects, or experience.";
}

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
 * (Note: it runs inside runner.run; to save vector-store cost too, we also pre-check before retrieval.)
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
  instructions: INSTRUCTIONS,
  model: "gpt-5-nano",
  modelSettings: { reasoning: { effort: "low" } },
  inputGuardrails: [moderationInputGuardrail],
  outputGuardrails: [moderationOutputGuardrail],
});

type WorkflowInput = { input_as_text: string };

type VectorStoreSearchItem = {
  score: number;
  filename?: string;
  content?: Array<{ text: string }>;
  text?: string;
};

type VectorStoreSearchResponse = {
  data: VectorStoreSearchItem[];
};

function normalizeSearchText(item: VectorStoreSearchItem): string {
  const fromContent = item.content?.map((c) => c.text).join("\n") ?? "";
  const fallback = item.text ?? "";
  return (fromContent || fallback).trim();
}

export const runWorkflow = async (
  workflow: WorkflowInput,
): Promise<{ answer: string }> => {
  return await withTrace("New agent", async () => {
    const runner = new Runner({
      traceMetadata: { __trace_source__: "agent-builder" },
    });

    const userText = workflow.input_as_text ?? "";

    // Pre-check BEFORE retrieval to avoid wasting vector-store calls on junk.
    // (This complements the input guardrail, which runs inside runner.run.)
    if (PROFANITY_RE.test(userText)) {
      return { answer: blockedReply(userText) };
    }
    if (await isFlaggedByModeration(userText)) {
      return { answer: blockedReply(userText) };
    }

    // 1) retrieve
    const vsId = process.env.vsId as string;
    const searchUnknown: unknown = await client.vectorStores.search(vsId, {
      query: userText,
    });
    const search = searchUnknown as VectorStoreSearchResponse;

    const hits = search.data
      .map((r) => ({
        score: r.score,
        filename: r.filename,
        text: normalizeSearchText(r),
      }))
      .filter((h) => h.text.length > 0)
      .slice(0, 8);

    const contextText = hits.length
      ? hits
          .map(
            (h, i) =>
              `# Source ${i + 1} (${h.filename ?? "file"}, score ${h.score})\n${h.text}`,
          )
          .join("\n\n")
      : "No relevant context found.";

    try {
      // 2) answer using context (guardrails apply here too)
      const result = await runner.run(agent, [
        { role: "system", content: `CONTEXT:\n${contextText}` },
        { role: "user", content: userText },
      ]);

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
