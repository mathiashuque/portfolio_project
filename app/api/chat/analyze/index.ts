// src/app/api/chat/analyze/index.ts
import nlp from "compromise";
import { normalizeInput } from "./normalize";
import { detectLanguage } from "./language";
import { detectIntent, detectIntentFuzzy } from "./intents";
import { extractEntities } from "./entities";

export function analyze(message: string) {
  const text = normalizeInput(message);
  console.log("Normalized text:", text);

  // keep compromise warm for future entity extraction
  nlp(text);

  const lang = detectLanguage(text);

  const intent = detectIntent(text);

  // Confidence: exact/profanity are deterministic; fuzzy uses Fuse score.
  const confidence =
    intent === "fallback"
      ? detectIntentFuzzy(text).confidence
      : intent === "profanity"
        ? 1
        : 1;

  return {
    lang,
    intent,
    confidence,
    entities: extractEntities(text),
  };
}
