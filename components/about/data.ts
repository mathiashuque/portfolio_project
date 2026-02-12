import type { Tab } from "./types";

export const ABOUT_TABS = [
  {
    key: "principles",
    label: "Principles",
    lead: "The defaults I optimize for when designing and building software.",
    cards: [
      {
        title: "Clarity over cleverness",
        description:
          "Readable code scales better than smart tricks. I optimize for understanding first.",
        tag: "Readability",
      },
      {
        title: "Design for change",
        description:
          "Requirements evolve. I prefer composable structure that adapts without rewrites.",
        tag: "Maintainability",
      },
      {
        title: "Quality is a feature",
        description:
          "Performance and accessibility are part of the design—not polish work at the end.",
        tag: "UX & Perf",
      },
    ] as const,
  },
  {
    key: "process",
    label: "Process",
    lead: "How I go from vague problem → reliable solution without overengineering.",
    cards: [
      {
        title: "Start with constraints",
        description:
          "I clarify goals, users, failure modes, and trade-offs before choosing tools or patterns.",
        tag: "Discovery",
      },
      {
        title: "Ship small, iterate",
        description:
          "I build the thinnest useful slice first, then iterate based on what breaks and what matters.",
        tag: "Iteration",
      },
      {
        title: "Introduce structure when needed",
        description:
          "Abstractions earn their place. I add layers only when complexity justifies it.",
        tag: "Architecture",
      },
    ] as const,
  },
  {
    key: "direction",
    label: "Direction",
    lead: "What I’m aiming to get better at next, beyond just shipping features.",
    cards: [
      {
        title: "Systems that stay understandable",
        description:
          "I’m focused on designing larger codebases that remain predictable and easy to reason about.",
        tag: "Systems",
      },
      {
        title: "Developer experience",
        description:
          "I care about fast feedback loops: tooling, tests, docs, and conventions that reduce friction.",
        tag: "DX",
      },
      {
        title: "Pragmatic engineering",
        description:
          "I want to get better at choosing the simplest solution that meets the real constraints.",
        tag: "Trade-offs",
      },
    ] as const,
  },
] as const satisfies readonly Tab[];
