export const SITE = {
  name: "Mathias Huque Portfolio",
  owner: "Mathias Huque",
  title: "Mathias Huque | Software Developer",
  description:
    "Portfolio of Mathias Huque, software developer building modern, scalable web applications from architecture to polished user experiences.",
  shortDescription: "I Build Software Apps That Turn Ideas Into Reality.",
  url: "https://mathiashuque.dev",
  liveUrl: "https://www.mathiashuque.dev/",
  ogImagePath: "/og/default.png",
  defaultContactFrom: "Portfolio <no-reply@mathiashuque.dev>",
} as const;

export const LOCALES = ["en", "es"] as const;
export const DEFAULT_LOCALE = "en";

export type Locale = (typeof LOCALES)[number];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.includes(value as Locale);
}

export function absoluteUrl(path = "") {
  return `${SITE.url}${path}`;
}
