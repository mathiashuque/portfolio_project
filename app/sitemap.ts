import type { MetadataRoute } from "next";
import { absoluteUrl, localePath, LOCALES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    en: absoluteUrl("/en"),
    es: absoluteUrl("/es"),
    "x-default": absoluteUrl("/en"),
  };

  return LOCALES.map((locale) => ({
    url: absoluteUrl(localePath(locale)),
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
