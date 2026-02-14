import { franc } from "franc-min";
export type Lang = "en" | "es" | "other";

export function detectLanguage(text: string): Lang {
  const clean = text.trim();

  // Too short? Default to English to avoid false "other"
  if (clean.length < 8) return "en";

  const iso3 = franc(clean, { minLength: 3 });

  if (iso3 === "eng") return "en";
  if (iso3 === "spa") return "es";

  return "other";
}
