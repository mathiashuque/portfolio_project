// src/app/api/chat/analyze/intents.ts
import Fuse from "fuse.js";

export type Intent =
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

const intentExamples: Array<{ intent: Intent; phrases: string[] }> = [
  { intent: "greeting", phrases: ["hello", "hi", "hey", "good morning", "hola", "buenas"] },
  { intent: "age", phrases: ["how old are you", "your age", "when were you born"] },
  {
    intent: "origin",
    phrases: ["where are you from", "where were you born", "where are you based"],
  },
  {
    intent: "languagesSpoken",
    phrases: ["what languages do you speak", "do you speak english", "spanish"],
  },
  { intent: "stack", phrases: ["tech stack", "technologies", "tools", "skills"] },
  { intent: "projects", phrases: ["projects", "work", "portfolio", "what have you built"] },
  { intent: "experience", phrases: ["experience", "background", "roles", "teaching"] },
  { intent: "about", phrases: ["about you", "who are you", "introduce yourself"] },
  { intent: "contact", phrases: ["contact", "email", "linkedin", "github"] },
  { intent: "cv", phrases: ["cv", "resume", "résumé"] },
  { intent: "personal", phrases: ["hobbies", "games", "music", "food"] },
];

const fuse = new Fuse(
  intentExamples.flatMap((x) => x.phrases.map((p) => ({ intent: x.intent, phrase: p }))),
  { keys: ["phrase"], threshold: 0.4 }
);

export function detectIntentFuzzy(text: string) {
  const result = fuse.search(text)[0];
  const intent: Intent = result?.item.intent ?? "fallback";
  const confidence = result ? 1 - (result.score ?? 1) : 0;
  return { intent, confidence };
}
