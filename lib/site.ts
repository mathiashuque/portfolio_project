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
    title: "Mathias Huque | Software Developer in Uruguay",
    description:
      "Portfolio of Mathias Huque, a software developer in Uruguay building scalable web applications with React, Next.js, TypeScript, and .NET.",
    ogLocale: "en_US",
  },
  es: {
    title: "Mathias Huque | Desarrollador de Software en Uruguay",
    description:
      "Portfolio de Mathias Huque, desarrollador de software en Uruguay especializado en aplicaciones web escalables con React, Next.js, TypeScript y .NET.",
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
