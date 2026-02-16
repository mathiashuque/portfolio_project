// src/app/api/chat/respond/index.ts
import { getKnowledge  } from "../knowledge/knowledge";
import { isSpanish } from "./helpers";
import type { Analysis } from "./types";
import type { Intent } from "../analyze/intents";
import { templates } from "./templates.i18n";

export function respondFromAnalysis(analysis: Analysis) {
  const k = getKnowledge(analysis.lang);
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
        location:
          typeof k.person.location === "string"
            ? k.person.location
            : k.person.location.country,
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

      if (analysis.entities?.projectName && !selected) {
        return t.projectsNone({});
      }

      return t.projects({
        projects: (selected ? [selected] : k.projects).map((p) => ({
          ...p,
          tech: Array.isArray(p.tags)
            ? p.tags.join(", ")
            : "",
        })),
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

      // Note: this is approximate because we don't have a day.
      const age = now.getFullYear() - birth.year;

      return t.age({
        month: birth.month,
        year: birth.year,
        age,
      });
    },

    // --------------------
    // Implemented new/placeholder intents
    // --------------------
    origin: () =>
      t.origin({
        location:
          typeof k.person.location === "string"
            ? k.person.location
            : k.person.location.country,
        country: k.person.birth?.country,
      }),

    languagesSpoken: () =>
      t.languages({
        languages: k.person.languagesSpoken.join(", "),
      }),

    experience: (analysis) => {
      // If your analyze step later supports an entity like `detailLevel`,
      // you can switch on it. For now: short by default.
      const shortItems = k.experience.map(
        (e) => `${e.role} — ${e.org} (${e.focus})`,
      );

      const detailedRoles = k.experience.map((e) => ({
        title: e.role,
        org: e.org,
        period:
          e.startYear || e.endYear
            ? `${e.startYear ?? "—"} – ${e.endYear ?? "—"}`
            : undefined,
        bullets: Array.isArray(e.highlights) && e.highlights.length > 0
          ? e.highlights
          : [e.focus].filter(Boolean),
      }));

      const wantsDetailed = false;

      return wantsDetailed
        ? t.experienceDetailed({ roles: detailedRoles })
        : t.experienceShort({ items: shortItems });
    },

    personal: () => {
      const hobbies: string[] = [];

      if (k.interests?.gaming) {
        const games = k.interests.gaming.favouriteGames?.length
          ? `Gaming (${k.interests.gaming.favouriteGames.join(", ")})`
          : "Gaming";
        hobbies.push(games);
      }

      if (k.interests?.music?.favouriteGenre) {
        hobbies.push(`Music (${k.interests.music.favouriteGenre})`);
      }

      if (k.interests?.food?.favourites?.length) {
        hobbies.push(`Food (${k.interests.food.favourites.join(", ")})`);
      }

      return t.personal({ hobbies });
    },

    availability: () =>
      t.availability({
        status: k.availability?.status,
        notes: k.availability?.notes,
        preferred: k.availability?.preferredEngagements?.join(", "),
        startTimeline: k.availability?.startTimeline,
      }),

    pricing: () =>
      t.pricing({
        disclaimer: k.pricing?.disclaimer,
        models: (k.pricing?.models ?? []).map((m) => ({
          ...m,
          formatted: `${m.currency} ${m.amount}${
            m.period ? ` / ${m.period}` : ""
          }${m.notes ? ` — ${m.notes}` : ""}`,
        })),
      }),

    services: () =>
      t.services({
        offerings: (k.services?.offerings ?? []).map((s) => ({
          name: s.name,
          summary: s.summary,
          includes: s.includes ?? [],
          idealFor: s.idealFor ?? [],
          tech: s.tech ?? [],
        })),
      }),

    education: () =>
      t.education({
        items: (k.education?.items ?? []).map((e) => ({
          degree: e.degree,
          institution: e.institution,
          period: e.endYear ? `${e.startYear ?? ""} – ${e.endYear}`.trim() : "",
          highlights: e.highlights ?? [],
        })),
      }),

    certifications: () =>
      t.certifications({
        items: k.certifications?.items ?? [],
        notes: k.certifications?.notes,
      }),

    blog: () =>
      t.blog({
        enabled: k.blog?.enabled,
        posts: k.blog?.posts ?? [],
        notes: k.blog?.notes,
      }),

    scheduling: () =>
      t.scheduling({
        preferredChannels: k.scheduling?.preferredChannels?.join(", "),
        bookingLink: k.scheduling?.bookingLink ?? k.links.calendly,
        notes: k.scheduling?.notes,
        email: k.links.email,
        linkedin: k.links.linkedin,
      }),

    timezone: () =>
      t.timezone({
        iana:
          k.timezone?.iana ??
          (typeof k.person.location === "object"
            ? k.person.location.timezone
            : undefined),
        utcOffset: k.timezone?.utcOffset,
        notes: k.timezone?.notes,
      }),

    relocation: () =>
      t.relocation({
        openToRemote: k.relocation?.openToRemote,
        openToRelocation: k.relocation?.openToRelocation,
        preferredRegions: (k.relocation?.preferredRegions ?? []).join(
          ", ",
        ),
        notes: k.relocation?.notes,
      }),

    opensource: () =>
      t.opensource({
        contributions: k.opensource?.contributions ?? [],
        notes: k.opensource?.notes,
        github: k.links.github,
      }),

    support: () =>
      t.support({
        topics: k.support?.topics ?? [],
        notes: k.support?.notes,
      }),

    fallback: () => t.fallback({}),
  };

  return handlers[analysis.intent]?.(analysis) ?? t.fallback({});
}
