import {
  type AgentOutputType,
  type InputGuardrail,
  type OutputGuardrail,
} from "@openai/agents";
import { buildProfanityRegex } from "./profanity/regex";
import { getOpenAIClient } from "./client";

/**
 * Blocklist personal (barata y determinística). No reemplaza a la moderación:
 * sólo atrapa palabras con las que no querés interactuar nunca.
 */
export const PROFANITY_RE = buildProfanityRegex();

async function isFlaggedByModeration(text: string): Promise<boolean> {
  const response: unknown = await getOpenAIClient().moderations.create({
    model: "omni-moderation-latest",
    input: text,
  });

  const results = (response as { results?: { flagged?: boolean }[] }).results;
  return Boolean(results?.[0]?.flagged);
}

/** Último mensaje del visitante, venga como string o como item del SDK. */
function lastUserText(input: unknown): string {
  if (typeof input === "string") return input;
  if (!Array.isArray(input)) return "";

  for (let i = input.length - 1; i >= 0; i -= 1) {
    const item = input[i] as { role?: unknown; content?: unknown } | undefined;
    if (item?.role !== "user") continue;

    const { content } = item;
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content
        .map((part) =>
          typeof part === "string"
            ? part
            : ((part as { text?: string })?.text ?? ""),
        )
        .filter((text) => text.length > 0)
        .join("\n");
    }

    return "";
  }

  return "";
}

/**
 * Guardrail de entrada: si se dispara, el modelo no llega a ejecutarse.
 * Corre en serie dentro de runner.run.
 */
export const moderationInputGuardrail: InputGuardrail = {
  name: "moderation_input",
  runInParallel: false,
  execute: async ({ input }) => {
    const userText = lastUserText(input);

    // Si no podemos aislar el texto del visitante, no bloqueamos.
    if (!userText) {
      return { outputInfo: { flagged: false }, tripwireTriggered: false };
    }

    // Corte determinístico por profanidad.
    if (PROFANITY_RE.test(userText)) {
      return { outputInfo: { flagged: true }, tripwireTriggered: true };
    }

    // Corte contextual por moderación.
    const flagged = await isFlaggedByModeration(userText);
    return { outputInfo: { flagged }, tripwireTriggered: flagged };
  },
};

/** Guardrail de salida: bloquea texto final que la moderación marque. */
export const moderationOutputGuardrail: OutputGuardrail<AgentOutputType> = {
  name: "moderation_output",
  execute: async ({ agentOutput }) => {
    const text = String(agentOutput ?? "");
    const flagged = await isFlaggedByModeration(text);
    return { outputInfo: { flagged }, tripwireTriggered: flagged };
  },
};
