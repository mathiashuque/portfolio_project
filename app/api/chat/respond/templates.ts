// src/app/api/chat/respond/templates.ts
import Handlebars from "handlebars";

// Helpers útiles
Handlebars.registerHelper("join", function (arr: unknown[], sep: string) {
  if (!Array.isArray(arr)) return "";
  return arr.filter(Boolean).join(sep);
});

Handlebars.registerHelper("yesNo", function (val: unknown, yes: string, no: string) {
  return val ? yes : no;
});

export const templates = {
  // --------------------
  // Greetings
  // --------------------
  greeting_en: Handlebars.compile(`Hi! I’m {{name}}. How can I help you?`),

  greeting_es: Handlebars.compile(`¡Hola! Soy {{name}}. ¿En qué puedo ayudarte?`),

  // --------------------
  // About
  // --------------------
  about: Handlebars.compile(
    `I’m {{name}}, a {{title}} based in {{location}}.\n{{tagline}}\n\nIf helpful, I can summarize my experience, projects, or technical stack.`
  ),

  // --------------------
  // Contact / CV
  // --------------------
  contact: Handlebars.compile(
    `You can reach me here:\n\n• Email: {{email}}\n• LinkedIn: {{linkedin}}\n• GitHub: {{github}}`
  ),

  cv: Handlebars.compile(`You can view my CV here: {{cv}}`),

  // --------------------
  // Projects
  // --------------------
  projects: Handlebars.compile(
    `Here are a few projects:\n\n{{#each projects}}**{{name}}**\n{{summary}}\n{{#if role}}Role: {{role}}\n{{/if}}{{#if tech}}Tech: {{tech}}\n{{/if}}{{#if live}}Live: {{live}}\n{{/if}}{{#if repo}}Repo: {{repo}}\n{{/if}}\n\n{{/each}}`
  ),

  projects_none: Handlebars.compile(
    `I couldn’t find that specific project. Want a list of my main projects instead?`
  ),

  // --------------------
  // Stack
  // --------------------
  stackShort: Handlebars.compile(
    `Here’s a structured overview of my technical stack:\n\n• Frontend: {{frontend}}\n• Backend: {{backend}}\n• Databases: {{databases}}\n• Cloud & DevOps: {{cloud}}\n• Testing: {{testing}}`
  ),

  stackDetailed: Handlebars.compile(
    `Here’s a more detailed breakdown of my stack:\n\n**Frontend**: {{frontend}}\n**Backend**: {{backend}}\n**Databases**: {{databases}}\n**Cloud & DevOps**: {{cloud}}\n**Testing**: {{testing}}\n\nIf you tell me the role you’re hiring for, I can tailor this to what matters most.`
  ),

  // --------------------
  // Age / Origin / Languages
  // --------------------
  age_en: Handlebars.compile(
    `I was born in {{month}} {{year}}, so I’m currently {{age}} years old.`
  ),

  age_es: Handlebars.compile(
    `Nací en {{month}} de {{year}}, así que actualmente tengo {{age}} años.`
  ),

  origin_en: Handlebars.compile(
    `I’m based in {{location}}.{{#if country}} I’m originally from {{country}}.{{/if}}`
  ),

  origin_es: Handlebars.compile(
    `Estoy viviendo en {{location}}.{{#if country}} Originalmente soy de {{country}}.{{/if}}`
  ),

  languages_en: Handlebars.compile(
    `I can communicate in: {{languages}}. If you prefer, you can write in Spanish and I’ll reply in Spanish.`
  ),

  languages_es: Handlebars.compile(
    `Puedo comunicarme en: {{languages}}. Si prefieres, escríbeme en inglés y te respondo en inglés.`
  ),

  // --------------------
  // Experience
  // --------------------
  experienceShort: Handlebars.compile(
    `Here’s a short summary of my experience:\n\n{{#each items}}• {{this}}\n{{/each}}\n\nIf you want, I can expand on any role or project.`
  ),

  experienceDetailed: Handlebars.compile(
    `Here’s a more detailed overview:\n\n{{#each roles}}**{{title}}** — {{org}}{{#if period}} ({{period}}){{/if}}\n{{#each bullets}}• {{this}}\n{{/each}}\n\n{{/each}}`
  ),

  // --------------------
  // Personal
  // --------------------
  personal_en: Handlebars.compile(
    `Outside of work, I’m into: {{#if hobbies}}{{join hobbies ", "}}{{else}}a few things depending on the season 😄{{/if}}.\n\nWant the “quick list” version or the “tell me more” version?`
  ),

  personal_es: Handlebars.compile(
    `Fuera del trabajo, me gustan: {{#if hobbies}}{{join hobbies ", "}}{{else}}varias cosas, depende de la época 😄{{/if}}.\n\n¿Quieres la versión corta o la versión con más detalles?`
  ),

  // --------------------
  // Profanity / Safety-ish
  // --------------------
  profanity_en: Handlebars.compile(
    `I can help, but let’s keep it respectful. What would you like to know?`
  ),

  profanity_es: Handlebars.compile(
    `Puedo ayudar, pero mantengamos un tono respetuoso. ¿Qué te gustaría saber?`
  ),

  // --------------------
  // Fallback
  // --------------------
  fallback: Handlebars.compile(
    `I’m not sure how to respond to that. You can ask about my projects, experience, stack, contact info, or CV.`
  ),
} as const;
