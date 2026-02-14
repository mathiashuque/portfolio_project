// src/app/api/chat/analyze/language.ts
import { detect as detectHeavy } from "tinyld/heavy";
import { normalizeInput } from "./normalize";
import customWords from "./profanity.json";

export type Lang = "en" | "es" | "other";

const EN_SHORT = new Set(["hi", "hello", "hey", "thanks", "thank", "please"]);
const ES_SHORT = new Set(["hola", "gracias", "buenas", "por", "para", "que", "como", "cómo"]);

// Build once
const ES_PROFANITY = new Set(
  (Array.isArray(customWords) ? customWords : [])
    .map((w) => String(w).trim().toLowerCase())
    .filter(Boolean),
);

function shortOverride(clean: string): Lang | null {
  const tokens = clean.split(/\s+/).filter(Boolean);

  if (tokens.length <= 3) {
    for (const t of tokens) {
      if (EN_SHORT.has(t)) return "en";
      if (ES_SHORT.has(t)) return "es";
    }
  }

  return null;
}

/**
 * If input is very short and contains a word from profanity.json,
 * treat it as Spanish. This avoids "trolo" -> English by default.
 */
function profanitySpanishOverride(clean: string): Lang | null {
  const tokens = clean.split(/\s+/).filter(Boolean);

  // Only apply to short messages, otherwise it will misclassify mixed-language sentences.
  if (tokens.length > 4) return null;

  for (const t of tokens) {
    if (ES_PROFANITY.has(t)) return "es";
  }

  return null;
}

export function detectLanguage(text: string): Lang {
  const clean = normalizeInput(text);
  if (!clean) return "other";

  // 0) Spanish profanity override (short inputs only)
  const profOverride = profanitySpanishOverride(clean);
  if (profOverride) return profOverride;

  // 1) Deterministic override for very short inputs
  const override = shortOverride(clean);
  if (override) return override;

  // 2) TinyLD Heavy detection
  const iso2 = detectHeavy(clean);
  if (iso2 === "en") return "en";
  if (iso2 === "es") return "es";

  if (typeof iso2 === "string" && iso2.length > 0) return "other";

  // 3) Heuristic fallback ONLY when TinyLD can't decide
  const spanishStopwordMatch =
    /\b(que|como|por|para|con|sin|una|un|la|el|los|las|pero|porque)\b/i.test(clean);

  if (spanishStopwordMatch) return "es";

  return "en";
}
