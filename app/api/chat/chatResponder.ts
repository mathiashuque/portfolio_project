// src/app/api/chat/chatResponder.ts
import { knowledge } from "./knowledge";

type Intent =
  | "greeting"
  | "about"
  | "stack"
  | "projects"
  | "experience"
  | "contact"
  | "cv"
  | "fallback";

function normalize(s: string) {
  return s.toLowerCase().trim();
}

function includesAny(text: string, needles: string[]) {
  return needles.some((n) => text.includes(n));
}

function pickProjectByName(text: string) {
  const t = normalize(text);
  return knowledge.projects.find((p) => t.includes(p.name.toLowerCase()));
}

function classify(message: string): Intent {
  const t = normalize(message);

  if (
    includesAny(t, [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
    ])
  )
    return "greeting";

  if (includesAny(t, ["about", "who are you", "introduce", "summary"]))
    return "about";

  if (includesAny(t, ["stack", "tech", "technologies", "tools", "framework", "language"]))
    return "stack";

  if (includesAny(t, ["project", "projects", "work", "portfolio", "built", "case study"]))
    return "projects";

  if (includesAny(t, ["experience", "background", "teaching", "job", "role"]))
    return "experience";

  if (includesAny(t, ["contact", "email", "reach", "linkedin", "github"]))
    return "contact";

  if (includesAny(t, ["cv", "resume", "résumé"]))
    return "cv";

  return "fallback";
}

function formatStack() {
  const s = knowledge.stack;
  return [
    `Here’s my current stack:`,
    ``,
    `• Languages: ${s.languages.join(", ")}`,
    `• Frontend: ${s.frontend.join(", ")}`,
    s.tooling?.length ? `• Tooling: ${s.tooling.join(", ")}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatExperience() {
  const lines = knowledge.experience.map(
    (e) => `• ${e.role} — ${e.org} (${e.focus})`
  );
  return [`Here’s a quick overview of my experience:`, ``, ...lines].join("\n");
}

function formatProjects(message: string) {
  const match = pickProjectByName(message);
  const projects = match ? [match] : knowledge.projects;

  const blocks = projects.map((p) => {
    const links = [
      p.live ? `Live: ${p.live}` : null,
      p.repo ? `Repo: ${p.repo}` : null,
    ].filter(Boolean);

    return [
      `**${p.name}**`,
      p.summary,
      p.tags?.length ? `Tech: ${p.tags.join(", ")}` : null,
      links.length ? links.join(" • ") : null,
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [`Here are some projects:`, ``, ...blocks].join("\n\n");
}

export function respond(message: string) {
  const intent = classify(message);

  switch (intent) {
    case "greeting":
      return `Hi! I’m ${knowledge.person.name}. How can I help—projects, stack, experience, or contact info?`;

    case "about":
      return [
        `I’m ${knowledge.person.name}, a ${knowledge.person.title}.`,
        `${knowledge.person.tagline}`,
        ``,
        `If you’d like, I can summarize my experience or point you to a specific project.`,
      ].join("\n");

    case "stack":
      return formatStack();

    case "experience":
      return formatExperience();

    case "projects":
      return formatProjects(message);

    case "contact":
      return [
        `You can reach me here:`,
        ``,
        `• Email: ${knowledge.links.email}`,
        `• LinkedIn: ${knowledge.links.linkedin}`,
        `• GitHub: ${knowledge.links.github}`,
      ].join("\n");

    case "cv":
      return knowledge.links.cv && !knowledge.links.cv.includes("<")
        ? `You can view my CV here: ${knowledge.links.cv}`
        : `I can share my CV—please reach out at ${knowledge.links.email}.`;

    default:
      return [
        `I can help with: stack, projects, experience, CV, or contact info.`,
        `Try asking: “What’s your tech stack?” or “Tell me about your projects.”`,
      ].join("\n");
  }
}
