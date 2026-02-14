// src/app/api/chat/respond/templates.i18n.ts
import { templates as raw } from "./templates";

export const templates = {
  en: {
    greeting: raw.greeting_en,
    about: raw.about_en,
    contact: raw.contact_en,
    cv: raw.cv_en,

    projects: raw.projects_en,
    projects_none: raw.projects_none_en,

    stackShort: raw.stackShort_en,
    stackDetailed: raw.stackDetailed_en,

    age: raw.age_en,
    origin: raw.origin_en,
    languages: raw.languages_en,

    experienceShort: raw.experienceShort_en,
    experienceDetailed: raw.experienceDetailed_en,

    personal: raw.personal_en,
    profanity: raw.profanity_en,

    fallback: raw.fallback_en,
  },

  es: {
    greeting: raw.greeting_es,
    about: raw.about_es,
    contact: raw.contact_es,
    cv: raw.cv_es,

    projects: raw.projects_es,
    projects_none: raw.projects_none_es,

    stackShort: raw.stackShort_es,
    stackDetailed: raw.stackDetailed_es,

    age: raw.age_es,
    origin: raw.origin_es,
    languages: raw.languages_es,

    experienceShort: raw.experienceShort_es,
    experienceDetailed: raw.experienceDetailed_es,

    personal: raw.personal_es,
    profanity: raw.profanity_es,

    fallback: raw.fallback_es,
  },
} as const;
