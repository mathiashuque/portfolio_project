// src/app/api/chat/respond/helpers.ts
export function isSpanish(lang : string | undefined) {
  return (lang ?? "en") === "es";
}
