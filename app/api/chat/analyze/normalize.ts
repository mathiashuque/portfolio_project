export function normalizeInput(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ") // remove punctuation
    .replace(/\s+/g, " ");
}