// src/app/api/chat/respond/helpers.ts
export function isSpanish(lang?: "en" | "es") {
  return (lang ?? "en") === "es";
}
