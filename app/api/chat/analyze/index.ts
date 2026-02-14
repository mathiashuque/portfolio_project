// src/app/api/chat/analyze/index.ts
import nlp from "compromise";
import { normalizeInput } from "./normalize";
import { detectLanguage } from "./language";
import { applyRules } from "./rules";
import { detectIntentFuzzy } from "./intents";
import { extractEntities } from "./entities";

export function analyze(message: string) {
  const text = normalizeInput(message);

  // keep compromise warm for future entity extraction
  nlp(text);

  const lang = detectLanguage(text);

  // 1) rule-based short-circuits
  const ruleIntent = applyRules(text);
  if (ruleIntent) {
    return {
      lang,
      intent: ruleIntent,
      confidence: 1,
      entities: extractEntities(text),
    };
  }

  // 2) fuzzy intent
  const { intent, confidence } = detectIntentFuzzy(text);

  return {
    lang,
    intent,
    confidence,
    entities: extractEntities(text),
  };
}
