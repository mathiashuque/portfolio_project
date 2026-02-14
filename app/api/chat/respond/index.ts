// src/app/api/chat/respond/index.ts
import { knowledge } from "../knowledge";
import { isSpanish } from "./helpers";
import type { Analysis } from "./types";
import type { Intent } from "../analyze/intents";
import { templates } from "./templates.i18n";

export function respondFromAnalysis(analysis: Analysis) {
  const k = knowledge;
  const t = isSpanish(analysis.lang) ? templates.es : templates.en;

  const handlers: Record<Intent, (analysis: Analysis) => string> = {
    profanity: () => t.profanity({}),

    greeting: () =>
      t.greeting({
        name: k.person.name,
      }),

    about: () =>
      t.about({
        name: k.person.name,
        title: k.person.title,
        location: k.person.location,
        tagline: k.person.tagline,
      }),

    contact: () =>
      t.contact({
        email: k.links.email,
        linkedin: k.links.linkedin,
        github: k.links.github,
      }),

    cv: () =>
      t.cv({
        cv: k.links.cv,
      }),

    projects: (analysis) => {
      const selected = analysis.entities?.projectName
        ? k.projects.find((x) => x.name === analysis.entities?.projectName)
        : null;

      return t.projects({
        projects: selected ? [selected] : k.projects,
      });
    },

    stack: () =>
      t.stackShort({
        frontend: k.stack.frontend.join(", "),
        backend: k.stack.backend.join(", "),
        databases: k.stack.databases.join(", "),
        cloud: k.stack.cloudAndDevOps.join(", "),
        testing: k.stack.testing.join(", "),
      }),

    age: () => {
      const birth = k.person.birth;
      const now = new Date();
      const age = now.getFullYear() - birth.year;

      return t.age({
        month: birth.month,
        year: birth.year,
        age,
      });
    },

    fallback: () => t.fallback({}),
    origin: function (analysis: Analysis): string {
      throw new Error("Function not implemented.");
    },
    languagesSpoken: function (analysis: Analysis): string {
      throw new Error("Function not implemented.");
    },
    experience: function (analysis: Analysis): string {
      throw new Error("Function not implemented.");
    },
    personal: function (analysis: Analysis): string {
      throw new Error("Function not implemented.");
    },
  };

  return handlers[analysis.intent]?.(analysis) ?? t.fallback({});
}
