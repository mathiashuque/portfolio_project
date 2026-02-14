// src/app/api/chat/analyze/intents.ts
import Fuse from "fuse.js";
import { Profanity } from "@2toad/profanity";
import customWords from "./profanity.json";
import { intentExamples } from "./intent-examples";

export type Intent =
  | "profanity"
  | "greeting"
  | "about"
  | "age"
  | "origin"
  | "languagesSpoken"
  | "stack"
  | "projects"
  | "experience"
  | "contact"
  | "cv"
  | "personal"
  | "fallback";

type ExampleIntent = Exclude<Intent, "profanity" | "fallback">;

// -------------------- profanity (deterministic) --------------------

const profanity = new Profanity({
  languages: ["en", "es"],
  wholeWord: true,
  grawlix: "*****",
  grawlixChar: "$",
});
profanity.addWords(customWords);

function isProfanity(t: string) {
  return profanity.exists(t);
}

// -------------------- exact match (fast + deterministic) --------------------

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const exactMatchers: Array<{ intent: ExampleIntent; regs: RegExp[] }> =
  intentExamples.map(({ intent, phrases }) => ({
    intent,
    regs: phrases
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => {
        const escaped = escapeRegExp(p);
        // Greetings typically start the message; others can appear anywhere.
        return intent === "greeting"
          ? new RegExp(`^\\s*${escaped}\\b`, "i")
          : new RegExp(`\\b${escaped}\\b`, "i");
      }),
  }));

function detectIntentExact(text: string): ExampleIntent | null {
  for (const { intent, regs } of exactMatchers) {
    if (regs.some((r) => r.test(text))) return intent;
  }
  return null;
}

// -------------------- fuzzy match (fallback) --------------------

const fuse = new Fuse(
  intentExamples.flatMap((x) =>
    x.phrases.map((p) => ({ intent: x.intent, phrase: p })),
  ),
  { keys: ["phrase"], threshold: 0.4 },
);

export function detectIntentFuzzy(text: string) {
  const result = fuse.search(text)[0];
  const intent: Intent = (result?.item.intent as Intent) ?? "fallback";
  const confidence = result ? 1 - (result.score ?? 1) : 0;
  return { intent, confidence };
}

// -------------------- unified entrypoint --------------------

const MIN_FUZZY_CONFIDENCE = 0.6; // tune 0.55–0.75

export function detectIntent(text: string): Intent {
  if (isProfanity(text)) return "profanity";

  const exact = detectIntentExact(text);
  if (exact) return exact;

  const { intent, confidence } = detectIntentFuzzy(text);
  if (confidence < MIN_FUZZY_CONFIDENCE) return "fallback";

  return intent;
}
