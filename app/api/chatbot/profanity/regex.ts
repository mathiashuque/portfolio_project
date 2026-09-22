import { readFileSync } from "node:fs";
import { join } from "node:path";

function loadWordList(path: string): string[] {
  const content = readFileSync(path, "utf-8");

  return content
    .split("\n")
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length > 0 && !word.startsWith("#"));
}

function escapeRegex(word: string): string {
  return word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildProfanityRegex(): RegExp {
  const profanityDirectory = join(process.cwd(), "app/api/chatbot/profanity");
  const words = ["es.txt", "en.txt"]
    .flatMap((file) => loadWordList(join(profanityDirectory, file)))
    .map(escapeRegex);

  return new RegExp(`\\b(${words.join("|")})\\b`, "i");
}
