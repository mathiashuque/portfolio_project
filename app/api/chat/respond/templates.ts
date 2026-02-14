// src/app/api/chat/respond/templates.ts
import Handlebars from "handlebars";

export const templates = {
  greeting_en: Handlebars.compile(
    `Hi! I’m {{name}}. How can I help you?`
  ),
  greeting_es: Handlebars.compile(
    `¡Hola! Soy {{name}}. ¿En qué puedo ayudarte?`
  ),

  about: Handlebars.compile(
    `I’m {{name}}, a {{title}} based in {{location}}.\n{{tagline}}\n\nIf helpful, I can summarize my experience, projects, or technical stack.`
  ),

  contact: Handlebars.compile(
    `You can reach me here:\n\n• Email: {{email}}\n• LinkedIn: {{linkedin}}\n• GitHub: {{github}}`
  ),

  cv: Handlebars.compile(`You can view my CV here: {{cv}}`),

  projects: Handlebars.compile(
    `Here are a few projects:\n\n{{#each projects}}**{{name}}**\n{{summary}}\n{{#if live}}Live: {{live}}\n{{/if}}\n\n{{/each}}`
  ),

  stackShort: Handlebars.compile(
    `Here’s a structured overview of my technical stack:\n\n• Frontend: {{frontend}}\n• Backend: {{backend}}\n• Databases: {{databases}}\n• Cloud & DevOps: {{cloud}}\n• Testing: {{testing}}`
  ),

  fallback: Handlebars.compile(
    `I can help with: projects, stack, experience, CV, or contact details.\nTry: “What’s your tech stack?” or “Tell me about your projects.”`
  ),
} as const;
