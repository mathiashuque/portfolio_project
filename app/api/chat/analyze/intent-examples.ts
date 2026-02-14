// src/app/api/chat/analyze/intent-examples.ts
import type { Intent } from "./intents";

export type ExampleIntent = Exclude<Intent, "profanity" | "fallback">;

export const intentExamples: Array<{
  intent: ExampleIntent;
  phrases: string[];
}> = [
  // --------------------
  // Greeting
  // --------------------
  {
    intent: "greeting",
    phrases: [
      // EN
      "hi",
      "hello",
      "hey",
      "hey there",
      "good morning",
      "good afternoon",
      "good evening",
      "what's up",
      "whats up",
      "sup",
      "yo",
      // ES
      "hola",
      "buenas",
      "buen día",
      "buen dia",
      "buenos días",
      "buenos dias",
      "buenas tardes",
      "buenas noches",
      "qué tal",
      "que tal",
      "como va",
      "cómo va",
    ],
  },

  // --------------------
  // About / Intro
  // --------------------
  {
    intent: "about",
    phrases: [
      // EN
      "about you",
      "tell me about yourself",
      "introduce yourself",
      "who are you",
      "what do you do",
      "what is this site",
      "what can you do",
      "what can you help with",
      // ES
      "sobre ti",
      "contame sobre vos",
      "cuéntame sobre ti",
      "presentate",
      "preséntate",
      "quién eres",
      "quien eres",
      "qué haces",
      "que haces",
      "qué puedes hacer",
      "que puedes hacer",
      "en qué me puedes ayudar",
      "en que me puedes ayudar",
    ],
  },

  // --------------------
  // Age
  // --------------------
  {
    intent: "age",
    phrases: [
      // EN
      "how old are you",
      "what is your age",
      "your age",
      "when were you born",
      "what year were you born",
      "what's your birth year",
      "whats your birth year",
      // ES
      "cuántos años tienes",
      "cuantos años tienes",
      "qué edad tienes",
      "que edad tienes",
      "tu edad",
      "cuándo naciste",
      "cuando naciste",
      "en qué año naciste",
      "en que año naciste",
      "año de nacimiento",
      "ano de nacimiento",
    ],
  },

  // --------------------
  // Origin / Location
  // --------------------
  {
    intent: "origin",
    phrases: [
      // EN
      "where are you from",
      "where were you born",
      "where do you live",
      "where are you based",
      "where are you located",
      "what city are you in",
      "what country are you in",
      "based in",
      "location",
      // ES
      "de dónde eres",
      "de donde eres",
      "de dónde sos",
      "de donde sos",
      "dónde naciste",
      "donde naciste",
      "dónde vives",
      "donde vives",
      "dónde vivís",
      "donde vivis",
      "dónde estás",
      "donde estas",
      "en qué ciudad estás",
      "en que ciudad estas",
      "dónde estás ubicado",
      "donde estas ubicado",
      "dónde estás radicado",
      "donde estas radicado",
      "ubicación",
      "ubicacion",
    ],
  },

  // --------------------
  // Languages spoken
  // --------------------
  {
    intent: "languagesSpoken",
    phrases: [
      // EN
      "what languages do you speak",
      "which languages do you speak",
      "what languages can you speak",
      "do you speak english",
      "do you speak spanish",
      "can you speak spanish",
      "can you reply in spanish",
      "can you reply in english",
      // ES
      "qué idiomas hablas",
      "que idiomas hablas",
      "qué idiomas sabes",
      "que idiomas sabes",
      "hablas inglés",
      "hablas ingles",
      "hablas español",
      "hablas espanol",
      "puedes hablar español",
      "puedes hablar espanol",
      "puedes responder en español",
      "puedes responder en espanol",
      "puedes responder en inglés",
      "puedes responder en ingles",
    ],
  },

  // --------------------
  // Tech stack / Skills
  // --------------------
  {
    intent: "stack",
    phrases: [
      // EN
      "tech stack",
      "your tech stack",
      "technology stack",
      "what technologies do you use",
      "what tools do you use",
      "what frameworks do you use",
      "what languages do you use",
      "what do you work with",
      "your skills",
      "what are your skills",
      "skills and tools",
      "stack",
      // ES
      "stack tecnológico",
      "stack tecnologico",
      "tu stack",
      "tu stack tecnológico",
      "tu stack tecnologico",
      "tecnologías que usas",
      "tecnologias que usas",
      "qué tecnologías usas",
      "que tecnologias usas",
      "qué herramientas usas",
      "que herramientas usas",
      "qué frameworks usas",
      "que frameworks usas",
      "cuáles son tus habilidades",
      "cuales son tus habilidades",
      "tus habilidades",
      "tecnologías",
      "tecnologias",
    ],
  },

  // --------------------
  // Projects
  // --------------------
  {
    intent: "projects",
    phrases: [
      // EN
      "projects",
      "your projects",
      "show me your projects",
      "what have you built",
      "what did you build",
      "what are you working on",
      "portfolio",
      "show me your portfolio",
      "things you've built",
      // ES
      "proyectos",
      "tus proyectos",
      "muéstrame tus proyectos",
      "muestrame tus proyectos",
      "qué construiste",
      "que construiste",
      "qué has construido",
      "que has construido",
      "en qué trabajaste",
      "en que trabajaste",
      "portafolio",
      "portfolio",
      "muéstrame tu portafolio",
      "muestrame tu portafolio",
    ],
  },

  // --------------------
  // Experience
  // --------------------
  {
    intent: "experience",
    phrases: [
      // EN
      "experience",
      "work experience",
      "professional experience",
      "your background",
      "tell me about your experience",
      "what roles have you had",
      "what have you worked on",
      "employment history",
      // ES
      "experiencia",
      "experiencia laboral",
      "experiencia profesional",
      "tu experiencia",
      "tu background",
      "tu trayectoria",
      "cuál es tu experiencia",
      "cual es tu experiencia",
      "en qué trabajaste",
      "en que trabajaste",
      "historial laboral",
    ],
  },

  // --------------------
  // Contact
  // --------------------
  {
    intent: "contact",
    phrases: [
      // EN
      "contact",
      "how can i contact you",
      "how do i contact you",
      "email",
      "your email",
      "linkedin",
      "your linkedin",
      "github",
      "your github",
      "how to reach you",
      // ES
      "contacto",
      "cómo puedo contactarte",
      "como puedo contactarte",
      "cómo te contacto",
      "como te contacto",
      "correo",
      "correo electrónico",
      "correo electronico",
      "tu correo",
      "tu email",
      "linkedin",
      "github",
      "cómo te encuentro",
      "como te encuentro",
    ],
  },

  // --------------------
  // CV / Resume
  // --------------------
  {
    intent: "cv",
    phrases: [
      // EN
      "cv",
      "resume",
      "résumé",
      "your resume",
      "your cv",
      "download your cv",
      "can i see your resume",
      // ES
      "currículum",
      "curriculum",
      "cv",
      "tu cv",
      "tu curriculum",
      "tu currículum",
      "hoja de vida",
      "ver tu cv",
      "descargar tu cv",
      "ver tu currículum",
      "ver tu curriculum",
    ],
  },

  // --------------------
  // Personal / Hobbies
  // --------------------
  {
    intent: "personal",
    phrases: [
      // EN
      "hobbies",
      "what do you do for fun",
      "what do you like to do",
      "what do you like",
      "what games do you play",
      "music you like",
      "favorite food",
      "favourite food",
      "personal interests",
      // ES
      "hobbies",
      "pasatiempos",
      "qué haces en tu tiempo libre",
      "que haces en tu tiempo libre",
      "qué te gusta hacer",
      "que te gusta hacer",
      "qué te gusta",
      "que te gusta",
      "juegas videojuegos",
      "qué juegos juegas",
      "que juegos juegas",
      "qué música te gusta",
      "que musica te gusta",
      "comida favorita",
      "intereses personales",
    ],
  },
];
