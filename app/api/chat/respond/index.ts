// src/app/api/chat/respond/index.ts
import { knowledge } from "../knowledge";
import { templates } from "./templates";
import { isSpanish } from "./helpers";
import type { Analysis } from "./types";

export function respondFromAnalysis(analysis: Analysis) {
  const k = knowledge;

  switch (analysis.intent) {
    case "greeting":
      return isSpanish(analysis.lang)
        ? templates.greeting_es({ name: k.person.name })
        : templates.greeting_en({ name: k.person.name });

    case "about":
      return templates.about({
        name: k.person.name,
        title: k.person.title,
        location: k.person.location,
        tagline: k.person.tagline,
      });

    case "contact":
      return templates.contact({
        email: k.links.email,
        linkedin: k.links.linkedin,
        github: k.links.github,
      });

    case "cv":
      return templates.cv({ cv: k.links.cv });

    case "projects": {
      const selected = analysis.entities?.projectName
        ? k.projects.find((x) => x.name === analysis.entities?.projectName)
        : null;

      return templates.projects({
        projects: selected ? [selected] : k.projects,
      });
    }

    case "stack":
      return templates.stackShort({
        frontend: k.stack.frontend.join(", "),
        backend: k.stack.backend.join(", "),
        databases: k.stack.databases.join(", "),
        cloud: k.stack.cloudAndDevOps.join(", "),
        testing: k.stack.testing.join(", "),
      });

    case "age": {
      const birth = k.person.birth; // { month, year, country }
      const now = new Date();
      const age = now.getFullYear() - birth.year;

      return isSpanish(analysis.lang)
        ? `Nací en ${birth.month} de ${birth.year}, así que actualmente tengo ${age} años.`
        : `I was born in ${birth.month} ${birth.year}, so I’m currently ${age} years old.`;
    }

    default:
      return templates.fallback({});
  }
}
