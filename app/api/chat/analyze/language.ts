import { detect as detectHeavy } from "tinyld/heavy";
import { normalizeInput } from "./normalize";

export type Lang = "en" | "es" | "other";

const EN_SHORT = new Set(["hi", "hello", "hey", "thanks", "thank", "please"]);
const ES_SHORT = new Set([
  "hola",
  "gracias",
  "buenas",
  "por",
  "para",
  "que",
  "como",
  "cómo",
]);

function shortOverride(clean: string): Lang | null {
  const tokens = clean.split(/\s+/).filter(Boolean);
  console.log("Tokens:", tokens);

  if (tokens.length <= 3) {
    for (const t of tokens) {
      if (EN_SHORT.has(t)) {
        console.log("Short override matched EN token:", t);
        return "en";
      }
      if (ES_SHORT.has(t)) {
        console.log("Short override matched ES token:", t);
        return "es";
      }
    }
  }

  console.log("Short override: no match");
  return null;
}

export function detectLanguage(text: string): Lang {
  console.log("---- LANGUAGE DETECTION START ----");
  console.log("Raw input:", JSON.stringify(text));

  const clean = normalizeInput(text);
  console.log("Cleaned input:", JSON.stringify(clean));

  if (!clean) {
    console.log("Empty after normalization → returning 'other'");
    return "other";
  }

  // 1) Deterministic override for very short inputs
  const override = shortOverride(clean);
  if (override) {
    console.log("Returning from short override:", override);
    return override;
  }

  // 2) TinyLD Heavy detection
  const iso2 = detectHeavy(clean);
  console.log("TinyLD Heavy result:", JSON.stringify(iso2));

  if (iso2 === "en") {
    console.log("Returning TinyLD result: en");
    return "en";
  }

  if (iso2 === "es") {
    console.log("Returning TinyLD result: es");
    return "es";
  }

  // If TinyLD detected a *real* non-en/es language (de, fr, pt, etc.), return other
  if (typeof iso2 === "string" && iso2.length > 0) {
    console.log(
      "TinyLD detected non-supported language:",
      iso2,
      "→ returning 'other'",
    );
    return "other";
  }

  console.log("TinyLD returned empty/unknown:", iso2);

  // 3) Heuristic fallback ONLY when TinyLD can't decide (empty/unknown)
  const spanishStopwordMatch =
    /\b(que|como|por|para|con|sin|una|un|la|el|los|las|pero|porque)\b/i.test(
      clean,
    );

  console.log("Spanish stopword match:", spanishStopwordMatch);

  if (spanishStopwordMatch) {
    console.log("Returning fallback: es");
    return "es";
  }

  // Final default (UX choice): English, or change to "other" if you prefer
  console.log("Returning fallback: en");
  return "en";
}
