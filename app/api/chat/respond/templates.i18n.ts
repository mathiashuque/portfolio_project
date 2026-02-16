// src/app/api/chat/respond/templates.i18n.ts
import Handlebars from "handlebars";

// ---- Helpers ----
Handlebars.registerHelper("join", function (arr: unknown[], sep: string) {
  if (!Array.isArray(arr)) return "";
  return arr.filter(Boolean).join(sep);
});

Handlebars.registerHelper(
  "yesNo",
  function (val: unknown, yes: string, no: string) {
    return val ? yes : no;
  },
);

Handlebars.registerHelper("bulletList", function (arr: unknown[]) {
  if (!Array.isArray(arr) || arr.length === 0) return "";
  return arr.map((x) => `• ${String(x)}`).join("\n");
});

export const templates = {
  en: {
    // Greetings
    greeting: Handlebars.compile(`Hi! I’m {{name}}. How can I help you?`),

    // About
    about: Handlebars.compile(
      `I’m {{name}}, a {{title}} based in {{location}}.\n{{tagline}}\n\nIf helpful, I can summarize my experience, projects, or technical stack.`,
    ),

    // Contact / CV
    contact: Handlebars.compile(
      `You can reach me here:\n\n• Email: {{email}}\n• LinkedIn: {{linkedin}}\n• GitHub: {{github}}`,
    ),

    cv: Handlebars.compile(`You can view my CV here: {{cv}}`),

    // Projects
    projects: Handlebars.compile(
      `Here are a few projects:\n\n{{#each projects}}**{{name}}**\n{{summary}}\n{{#if role}}Role: {{role}}\n{{/if}}{{#if tech}}Tech: {{tech}}\n{{/if}}{{#if live}}Live: {{live}}\n{{/if}}{{#if repo}}Repo: {{repo}}\n{{/if}}\n\n{{/each}}`,
    ),

    projectsNone: Handlebars.compile(
      `I couldn’t find that specific project. Want a list of my main projects instead?`,
    ),

    // Stack
    stackShort: Handlebars.compile(
      `Here’s a structured overview of my technical stack:\n\n• Frontend: {{frontend}}\n• Backend: {{backend}}\n• Databases: {{databases}}\n• Cloud & DevOps: {{cloud}}\n• Testing: {{testing}}`,
    ),

    // Age / Origin / Languages
    age: Handlebars.compile(
      `I was born in {{month}} {{year}}, so I’m currently {{age}} years old.`,
    ),

    origin: Handlebars.compile(
      `I’m based in {{location}}.{{#if country}} I’m originally from {{country}}.{{/if}}`,
    ),

    languages: Handlebars.compile(
      `I can communicate in: {{languages}}. If you prefer, you can write in Spanish and I’ll reply in Spanish.`,
    ),

    // Experience
    experienceShort: Handlebars.compile(
      `Here’s a short summary of my experience:\n\n{{#each items}}• {{this}}\n{{/each}}\n\nIf you want, I can expand on any role or project.`,
    ),

    experienceDetailed: Handlebars.compile(
      `Here’s a more detailed overview:\n\n{{#each roles}}**{{title}}** — {{org}}{{#if period}} ({{period}}){{/if}}\n{{#if bullets}}{{bulletList bullets}}{{/if}}\n\n{{/each}}`,
    ),

    // Personal
    personal: Handlebars.compile(
      `Outside of work, I’m into: {{#if hobbies}}{{join hobbies ", "}}{{else}}a few things depending on the season{{/if}}.\n\nIf you want, I can also share what I’m currently focusing on professionally.`,
    ),

    // Availability
    availability: Handlebars.compile(
      `Availability: **{{status}}**\n{{#if notes}}{{notes}}\n{{/if}}{{#if preferred}}\nPreferred: {{preferred}}\n{{/if}}{{#if startTimeline}}Start: {{startTimeline}}\n{{/if}}`,
    ),

    // Pricing
    pricing: Handlebars.compile(
      `Pricing\n\n{{#if disclaimer}}{{disclaimer}}\n\n{{/if}}{{#if models.length}}Typical models:\n{{#each models}}• {{formatted}}\n{{/each}}{{else}}I can share an estimate after a quick description of the scope.\n{{/if}}`,
    ),

    // Services
    services: Handlebars.compile(
      `Services I can help with:\n\n{{#each offerings}}**{{name}}**\n{{summary}}\n{{#if includes.length}}\nIncludes:\n{{bulletList includes}}\n{{/if}}{{#if idealFor.length}}\nIdeal for:\n{{bulletList idealFor}}\n{{/if}}{{#if tech.length}}\nTech:\n{{bulletList tech}}\n{{/if}}\n\n{{/each}}`,
    ),

    // Education
    education: Handlebars.compile(
      `Education\n\n{{#each items}}**{{degree}}** — {{institution}}{{#if period}} ({{period}}){{/if}}\n{{#if highlights.length}}{{bulletList highlights}}\n{{/if}}\n\n{{/each}}`,
    ),

    // Certifications
    certifications: Handlebars.compile(
      `Certifications\n\n{{#if items.length}}{{#each items}}• {{name}} — {{issuer}}{{#if issuedYear}} ({{issuedYear}}){{/if}}{{#if url}}\n  {{url}}{{/if}}\n{{/each}}{{else}}{{#if notes}}{{notes}}{{else}}No certifications listed yet.{{/if}}{{/if}}`,
    ),

    // Blog
    blog: Handlebars.compile(
      `Blog\n\n{{#if enabled}}{{#if posts.length}}{{#each posts}}• {{title}} ({{publishedAt}})\n  {{summary}}\n  {{#if url}}{{url}}{{/if}}\n{{/each}}{{else}}No posts published yet.{{/if}}{{else}}{{#if notes}}{{notes}}{{else}}Blog is not enabled yet.{{/if}}{{/if}}`,
    ),

    // Scheduling
    scheduling: Handlebars.compile(
      `Scheduling\n\n{{#if notes}}{{notes}}\n\n{{/if}}Preferred channels: {{preferredChannels}}\n{{#if bookingLink}}Booking link: {{bookingLink}}\n{{else}}You can message me at {{email}} or {{linkedin}} to set something up.\n{{/if}}`,
    ),

    // Timezone
    timezone: Handlebars.compile(
      `Timezone\n\n{{#if iana}}I’m in {{iana}}{{/if}}{{#if utcOffset}} ({{utcOffset}}){{/if}}.\n{{#if notes}}{{notes}}{{/if}}`,
    ),

    // Relocation
    relocation: Handlebars.compile(
      `Relocation\n\nRemote: {{yesNo openToRemote "Yes" "No"}}\nRelocation: {{yesNo openToRelocation "Yes" "No"}}\n{{#if preferredRegions}}Preferred regions: {{preferredRegions}}\n{{/if}}{{#if notes}}{{notes}}{{/if}}`,
    ),

    // Open source
    opensource: Handlebars.compile(
      `Open source\n\n{{#if contributions.length}}{{#each contributions}}• {{name}} — {{summary}}\n  {{url}}\n{{/each}}{{else}}{{#if notes}}{{notes}}{{else}}No featured open-source projects listed yet.{{/if}}\n\nGitHub: {{github}}{{/if}}`,
    ),

    // Support
    support: Handlebars.compile(
      `How I can help\n\n{{#if topics.length}}Topics:\n{{bulletList topics}}\n\n{{/if}}{{#if notes}}{{notes}}{{/if}}`,
    ),

    // Profanity / Fallback
    profanity: Handlebars.compile(
      `I can help, but let’s keep it respectful. What would you like to know?`,
    ),

    fallback: Handlebars.compile(
      `I’m not sure how to respond to that. You can ask about my projects, experience, stack, contact info, or CV.`,
    ),
  },

  es: {
    greeting: Handlebars.compile(`¡Hola! Soy {{name}}. ¿En qué puedo ayudarte?`),

    about: Handlebars.compile(
      `Soy {{name}}, un {{title}} viviendo en {{location}}.\n{{tagline}}\n\nSi quieres, puedo resumir mi experiencia, proyectos o stack técnico.`,
    ),

    contact: Handlebars.compile(
      `Puedes contactarme aquí:\n\n• Email: {{email}}\n• LinkedIn: {{linkedin}}\n• GitHub: {{github}}`,
    ),

    cv: Handlebars.compile(`Puedes ver mi CV aquí: {{cv}}`),

    projects: Handlebars.compile(
      `Aquí hay algunos proyectos:\n\n{{#each projects}}**{{name}}**\n{{summary}}\n{{#if role}}Rol: {{role}}\n{{/if}}{{#if tech}}Tecnologías: {{tech}}\n{{/if}}{{#if live}}En vivo: {{live}}\n{{/if}}{{#if repo}}Repositorio: {{repo}}\n{{/if}}\n\n{{/each}}`,
    ),

    projectsNone: Handlebars.compile(
      `No encontré ese proyecto específico. ¿Quieres ver una lista de mis proyectos principales?`,
    ),

    stackShort: Handlebars.compile(
      `Aquí tienes un resumen estructurado de mi stack técnico:\n\n• Frontend: {{frontend}}\n• Backend: {{backend}}\n• Bases de datos: {{databases}}\n• Cloud y DevOps: {{cloud}}\n• Testing: {{testing}}`,
    ),

    age: Handlebars.compile(
      `Nací en {{month}} de {{year}}, así que actualmente tengo {{age}} años.`,
    ),

    origin: Handlebars.compile(
      `Estoy viviendo en {{location}}.{{#if country}} Originalmente soy de {{country}}.{{/if}}`,
    ),

    languages: Handlebars.compile(
      `Puedo comunicarme en: {{languages}}. Si prefieres, puedes escribirme en español y te respondo en español.`,
    ),

    experienceShort: Handlebars.compile(
      `Aquí tienes un resumen breve de mi experiencia:\n\n{{#each items}}• {{this}}\n{{/each}}\n\nSi quieres, puedo ampliar cualquier puesto o proyecto.`,
    ),

    experienceDetailed: Handlebars.compile(
      `Aquí tienes una descripción más detallada:\n\n{{#each roles}}**{{title}}** — {{org}}{{#if period}} ({{period}}){{/if}}\n{{#if bullets}}{{bulletList bullets}}{{/if}}\n\n{{/each}}`,
    ),

    personal: Handlebars.compile(
      `Fuera del trabajo, me gustan: {{#if hobbies}}{{join hobbies ", "}}{{else}}varias cosas, depende de la época{{/if}}.\n\nSi quieres, también puedo contarte en qué me estoy enfocando profesionalmente.`,
    ),

    availability: Handlebars.compile(
      `Disponibilidad: **{{status}}**\n{{#if notes}}{{notes}}\n{{/if}}{{#if preferred}}\nPreferido: {{preferred}}\n{{/if}}{{#if startTimeline}}Inicio: {{startTimeline}}\n{{/if}}`,
    ),

    pricing: Handlebars.compile(
      `Precios\n\n{{#if disclaimer}}{{disclaimer}}\n\n{{/if}}{{#if models.length}}Modelos típicos:\n{{#each models}}• {{formatted}}\n{{/each}}{{else}}Puedo estimar un costo con una breve descripción del alcance.\n{{/if}}`,
    ),

    services: Handlebars.compile(
      `Servicios en los que puedo ayudar:\n\n{{#each offerings}}**{{name}}**\n{{summary}}\n{{#if includes.length}}\nIncluye:\n{{bulletList includes}}\n{{/if}}{{#if idealFor.length}}\nIdeal para:\n{{bulletList idealFor}}\n{{/if}}{{#if tech.length}}\nTecnologías:\n{{bulletList tech}}\n{{/if}}\n\n{{/each}}`,
    ),

    education: Handlebars.compile(
      `Educación\n\n{{#each items}}**{{degree}}** — {{institution}}{{#if period}} ({{period}}){{/if}}\n{{#if highlights.length}}{{bulletList highlights}}\n{{/if}}\n\n{{/each}}`,
    ),

    certifications: Handlebars.compile(
      `Certificaciones\n\n{{#if items.length}}{{#each items}}• {{name}} — {{issuer}}{{#if issuedYear}} ({{issuedYear}}){{/if}}{{#if url}}\n  {{url}}{{/if}}\n{{/each}}{{else}}{{#if notes}}{{notes}}{{else}}Todavía no tengo certificaciones listadas.{{/if}}{{/if}}`,
    ),

    blog: Handlebars.compile(
      `Blog\n\n{{#if enabled}}{{#if posts.length}}{{#each posts}}• {{title}} ({{publishedAt}})\n  {{summary}}\n  {{#if url}}{{url}}{{/if}}\n{{/each}}{{else}}Todavía no hay publicaciones.{{/if}}{{else}}{{#if notes}}{{notes}}{{else}}El blog aún no está habilitado.{{/if}}{{/if}}`,
    ),

    scheduling: Handlebars.compile(
      `Coordinar una reunión\n\n{{#if notes}}{{notes}}\n\n{{/if}}Canales preferidos: {{preferredChannels}}\n{{#if bookingLink}}Link para agendar: {{bookingLink}}\n{{else}}Puedes escribirme a {{email}} o por {{linkedin}} para coordinar.\n{{/if}}`,
    ),

    timezone: Handlebars.compile(
      `Zona horaria\n\n{{#if iana}}Estoy en {{iana}}{{/if}}{{#if utcOffset}} ({{utcOffset}}){{/if}}.\n{{#if notes}}{{notes}}{{/if}}`,
    ),

    relocation: Handlebars.compile(
      `Relocalización\n\nRemoto: {{yesNo openToRemote "Sí" "No"}}\nRelocalización: {{yesNo openToRelocation "Sí" "No"}}\n{{#if preferredRegions}}Regiones preferidas: {{preferredRegions}}\n{{/if}}{{#if notes}}{{notes}}{{/if}}`,
    ),

    opensource: Handlebars.compile(
      `Open source\n\n{{#if contributions.length}}{{#each contributions}}• {{name}} — {{summary}}\n  {{url}}\n{{/each}}{{else}}{{#if notes}}{{notes}}{{else}}Aún no tengo proyectos open-source destacados.{{/if}}\n\nGitHub: {{github}}{{/if}}`,
    ),

    support: Handlebars.compile(
      `En qué puedo ayudar\n\n{{#if topics.length}}Temas:\n{{bulletList topics}}\n\n{{/if}}{{#if notes}}{{notes}}{{/if}}`,
    ),

    profanity: Handlebars.compile(
      `Puedo ayudar, pero mantengamos un tono respetuoso. ¿Qué te gustaría saber?`,
    ),

    fallback: Handlebars.compile(
      `No estoy seguro de cómo responder a eso. Puedes preguntarme por proyectos, experiencia, stack, contacto o CV.`,
    ),
  },
} as const;
