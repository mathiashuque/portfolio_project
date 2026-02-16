// src/app/api/chat/analyze/intent-examples/intent-examples.ts
import type { Intent } from "../intents";
import { intentExamplesEn } from "./intent-examples-en";
import { intentExamplesEs } from "./intent-examples-es";

export type ExampleIntent = Exclude<Intent, "profanity" | "fallback">;

export type IntentExamples = Array<{
  intent: ExampleIntent;
  phrases: string[];
}>;

export const intentExamplesByLang: Record<"en" | "es", IntentExamples> = {
  en: intentExamplesEn,
  es: intentExamplesEs,
};

/**
 * Returns intent examples for a given language. Defaults to EN.
 * Accepts broader inputs ("en-US", "es-AR", etc).
 */
export function getIntentExamples(lang?: string): IntentExamples {
  const l = (lang ?? "en").toLowerCase();

  if (l === "es" || l.startsWith("es-")) return intentExamplesByLang.es;
  if (l === "en" || l.startsWith("en-")) return intentExamplesByLang.en;

  return intentExamplesByLang.en;
}

/**
 * Backwards-compatible default export for existing code paths.
 * If you later pass lang in, switch your code to getIntentExamples(lang).
 */
export const intentExamples: IntentExamples = intentExamplesByLang.en;
