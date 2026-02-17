import { readFileSync } from "node:fs";
import { join } from "node:path";

function loadWordList(path: string): string[] {
  const content = readFileSync(path, "utf-8");

  return content
    .split("\n")
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length > 0 && !w.startsWith("#"));
}

function escapeRegex(word: string): string {
  return word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildProfanityRegex(): RegExp {
  const base = process.cwd();

  const esPath = join(base, "app/api/chatbot/profanity/es.txt");
  const enPath = join(base, "app/api/chatbot/profanity/en.txt");

  const words = [
    ...loadWordList(esPath),
    ...loadWordList(enPath),
  ].map(escapeRegex);

  const pattern = `\\b(${words.join("|")})\\b`;

  return new RegExp(pattern, "i");
}


