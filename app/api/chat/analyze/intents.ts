// src/app/api/chat/analyze/intents.ts
import Fuse from "fuse.js";
import { Profanity } from "@2toad/profanity";
import customWords from "./profanity.json";
import { getIntentExamples } from "./intent-examples/intent-examples";
import { normalize } from "./normalize";

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
  | "availability"
  | "pricing"
  | "services"
  | "education"
  | "certifications"
  | "blog"
  | "scheduling"
  | "timezone"
  | "relocation"
  | "opensource"
  | "support"
  | "fallback";

type ExampleIntent = Exclude<Intent, "profanity" | "fallback">;

type Lang = "en" | "es";

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

// -------------------- helpers --------------------

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeLang(lang?: string): Lang {
  const l = (lang ?? "en").toLowerCase();
  if (l === "es" || l.startsWith("es-")) return "es";
  return "en";
}

// Normalize an example phrase once, consistently.
// NOTE: `normalize()` presumably already lowercases / strips punctuation etc.
// We still trim and filter empties after normalization.
function normalizeExamplePhrase(p: string) {
  return normalize(p).trim();
}

// -------------------- per-language caches --------------------

type Compiled = {
  // Keep original examples (for debugging / tooling)…
  examples: Array<{ intent: ExampleIntent; phrases: string[] }>;

  // …but also store normalized phrases for fast consistent matching paths.
  normalizedExamples: Array<{ intent: ExampleIntent; phrases: string[] }>;

  exactMatchers: Array<{ intent: ExampleIntent; regs: RegExp[] }>;
  fuse: Fuse<{ intent: ExampleIntent; phrase: string; rawPhrase: string }>;
  debugFuse: Fuse<{ intent: ExampleIntent; phrase: string; rawPhrase: string }>;
};

const compiledByLang = new Map<Lang, Compiled>();

function getCompiled(lang?: string): Compiled {
  const L = normalizeLang(lang);
  const cached = compiledByLang.get(L);
  if (cached) return cached;

  const examples = getIntentExamples(L);

  const normalizedExamples = examples.map(({ intent, phrases }) => ({
    intent,
    phrases: phrases.map(normalizeExamplePhrase).filter(Boolean),
  }));

  const STARTS_WITH_INTENTS: ExampleIntent[] = ["greeting", "support"];

  const exactMatchers: Array<{ intent: ExampleIntent; regs: RegExp[] }> =
    normalizedExamples.map(({ intent, phrases }) => ({
      intent,
      regs: phrases.map((p) => {
        const escaped = escapeRegExp(p);
        return STARTS_WITH_INTENTS.includes(intent)
          ? new RegExp(`^\\s*${escaped}\\b`, "i")
          : new RegExp(`\\b${escaped}\\b`, "i");
      }),
    }));

  const fuseItems = examples.flatMap((x) =>
    x.phrases.map((p) => ({
      intent: x.intent,
      phrase: normalizeExamplePhrase(p),
      rawPhrase: p,
    })),
  );

  const fuse = new Fuse(fuseItems, {
    keys: ["phrase"],
    threshold: 0.4,
    includeScore: true,
    ignoreLocation: true,
    findAllMatches: true,
  });

  const debugFuse = new Fuse(fuseItems, {
    keys: ["phrase"],
    threshold: 1.0,
    includeScore: true,
    ignoreLocation: true,
    findAllMatches: true,
  });

  const compiled: Compiled = {
    examples,
    normalizedExamples,
    exactMatchers,
    fuse,
    debugFuse,
  };

  compiledByLang.set(L, compiled);
  return compiled;
}

// -------------------- exact match --------------------

function detectIntentExact(text: string, lang?: string): ExampleIntent | null {
  const { exactMatchers } = getCompiled(lang);
  const candidates = [text, text.split(" ").slice(1).join(" ")].filter(Boolean);

  for (const t of candidates) {
    for (const { intent, regs } of exactMatchers) {
      if (regs.some((r) => r.test(t))) return intent;
    }
  }
  return null;
}

// -------------------- fuzzy match --------------------

function logTopIntents(text: string, lang?: string, limit = 5) {
  const { debugFuse } = getCompiled(lang);
  const results = debugFuse.search(text, { limit });

  console.log(
    "Top intent candidates:",
    results.map((r) => ({
      intent: r.item.intent,
      phrase: r.item.rawPhrase ?? r.item.phrase,
      confidence: +(1 - (r.score ?? 1)).toFixed(3),
      //score: +(r.score ?? 1).toFixed(3),
    })),
  );
}

export function detectIntentFuzzy(text: string, lang?: string) {
  const { fuse } = getCompiled(lang);
  const result = fuse.search(text)[0];
  const intent: Intent = (result?.item.intent as Intent) ?? "fallback";
  const confidence = result ? 1 - (result.score ?? 1) : 0;
  return { intent, confidence };
}

// -------------------- contains match --------------------

function detectIntentContains(
  text: string,
  lang?: string,
): ExampleIntent | null {
  const { normalizedExamples } = getCompiled(lang);
  const MIN_LEN = 4;

  for (const { intent, phrases } of normalizedExamples) {
    for (const phrase of phrases) {
      if (phrase.length < MIN_LEN) continue;

      if (text.includes(phrase) || phrase.includes(text)) {
        return intent;
      }
    }
  }

  return null;
}

// -------------------- unified entrypoint --------------------

const MIN_FUZZY_CONFIDENCE = 0.6;

export function detectIntent(text: string, lang?: string): Intent {
  const t = normalize(text);
  const L = normalizeLang(lang);

  if (isProfanity(t)) return "profanity";

  const exact = detectIntentExact(t, L);

  if (exact) return exact;

  const contains = detectIntentContains(t, L);
  if (contains) return contains;

  logTopIntents(t, L, 3);

  const { intent, confidence } = detectIntentFuzzy(t, L);
  if (confidence < MIN_FUZZY_CONFIDENCE) return "fallback";

  return intent;
}
