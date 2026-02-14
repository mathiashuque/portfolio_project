// src/app/api/chat/analyze/normalize.ts
export function normalizeInput(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s?!.,'’-]/gu, "")
    .replace(/\s+/g, " ");
}
