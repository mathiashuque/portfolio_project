import {
  Agent,
  Runner,
  withTrace,
  InputGuardrailTripwireTriggered,
  OutputGuardrailTripwireTriggered,
} from "@openai/agents";
import type { AgentInputItem } from "@openai/agents";
import { INSTRUCTIONS } from "./prompt";
import { PORTFOLIO_CONTEXT } from "./portfolioContext";
import {
  PROFANITY_RE,
  moderationInputGuardrail,
  moderationOutputGuardrail,
} from "./guardrails";
import { blockedReply } from "./blockedReply";

const runner = new Runner({
  traceMetadata: { __trace_source__: "agent-builder" },
});

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

/** Traduce el historial del cliente a los items que espera el SDK. */
function toInputItems(
  history: NonNullable<WorkflowInput["history"]>,
  userText: string,
): AgentInputItem[] {
  return [
    ...history.map((message): AgentInputItem => {
      if (message.role === "user") {
        return { role: "user", content: message.content };
      }
      return {
        role: "assistant",
        status: "completed",
        content: [{ type: "output_text", text: message.content }],
      };
    }),
    { role: "user", content: userText },
  ];
}

/** Punto de entrada del route: una respuesta para cada consulta. */
export const runWorkflow = async (
  workflow: WorkflowInput,
): Promise<{ answer: string }> => {
  return await withTrace("New agent", async () => {
    const userText = workflow.input_as_text ?? "";

    // Fast-path determinístico: la profanidad conocida nunca llega al modelo.
    // El mismo chequeo sigue en el guardrail de entrada como red de seguridad.
    if (PROFANITY_RE.test(userText)) {
      return { answer: blockedReply(userText) };
    }

    try {
      const result = await runner.run(
        agent,
        toInputItems(workflow.history ?? [], userText),
      );
      return { answer: String(result.finalOutput) };
    } catch (error: unknown) {
      if (
        error instanceof InputGuardrailTripwireTriggered ||
        error instanceof OutputGuardrailTripwireTriggered
      ) {
        return { answer: blockedReply(userText) };
      }
      throw error;
    }
  });
};
