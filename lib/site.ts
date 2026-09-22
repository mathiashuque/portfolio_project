export const SITE = {
  name: "Mathias Huque Portfolio",
  owner: "Mathias Huque",
  url: "https://mathiashuque.dev",
  ogImagePath: "/og/default.png",
  defaultContactFrom: "Portfolio <no-reply@mathiashuque.dev>",
  contactEmail: "contact@mathiashuque.dev",
  githubUrl: "https://github.com/mathiashuque",
  linkedInUrl: "https://www.linkedin.com/in/mathias-huque",
} as const;

export const LOCALES = ["en", "es"] as const;
export const DEFAULT_LOCALE = "en";

export type Locale = (typeof LOCALES)[number];

export const SEO: Record<
  Locale,
  { title: string; description: string; ogLocale: string }
> = {
  en: {
    title: "Mathias Huque | Software Engineer in Uruguay",
    description:
      "Portfolio of Mathias Huque, a Software Engineer in Uruguay building full-stack systems with TypeScript, React, Next.js, and Node.js — open to roles in Uruguay and remote in UTC-3 compatible timezones (US & South America).",
    ogLocale: "en_US",
  },
  es: {
    title: "Mathias Huque | Ingeniero de Software en Uruguay",
    description:
      "Portfolio de Mathias Huque, Ingeniero de Software en Uruguay que construye sistemas full-stack con TypeScript, React, Next.js y Node.js, disponible para roles en Uruguay y remoto en husos horarios compatibles con UTC-3 (EE. UU. y Sudamérica).",
    ogLocale: "es_UY",
  },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.includes(value as Locale);
}

export function absoluteUrl(path = "") {
  return `${SITE.url}${path}`;
}

export function localePath(locale: Locale) {
  return `/${locale}`;
}
