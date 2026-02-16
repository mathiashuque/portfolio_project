// src/app/api/chat/knowledge/knowledge.es.ts
import type { Knowledge } from "./types";

export const knowledgeEs: Knowledge = {
  person: {
    name: "Mathias Huque",
    title: "Software Developer",
    tagline: "Construyo aplicaciones de software que convierten ideas en realidad.",

    birth: {
      month: "February",
      year: 2004,
      country: "Uruguay",
      city: undefined,
    },

    location: {
      country: "Uruguay",
      city: undefined,
      timezone: "America/Montevideo",
      openToRemote: true,
      openToRelocation: true,
      relocationNotes:
        "Abierto a relocalizarme según el rol y la ubicación. Prefiero equipos con cultura remote-friendly.",
    },

    languagesSpoken: ["English", "Spanish"],

    studying: {
      degree: "Systems Engineering",
      institution: "Universidad ORT Uruguay",
      startedAtAge: 18,
    },

    startedProgrammingAtAge: 15,

    biography:
      "Soy un desarrollador de software de Uruguay con un fuerte interés en construir aplicaciones prácticas y bien diseñadas. Empecé a programar a los 15 años y luego cursé Ingeniería en Sistemas en la Universidad ORT Uruguay. Me interesa tanto el desarrollo frontend como backend, con foco en performance, arquitectura limpia y experiencia de usuario.",

    personal: {
      values: ["Arquitectura limpia", "Performance", "Buena UX"],
      workingStyle: ["Comunicación clara", "Ingeniería pragmática", "Entrega iterativa"],
      interestsSummary:
        "Me gusta construir productos end-to-end, mejorar performance y mantener bases de código limpias y mantenibles.",
    },
  },

  interests: {
    technology: true,
    gaming: {
      favouriteGenres: ["Shooters"],
      favouriteGames: ["Mass Effect", "Counter-Strike"],
    },
    music: { favouriteGenre: "Rock" },
    food: {
      dislikes: ["La mayoría de pescados, alcohol"],
      favourites: ["Salmón", "Chocolate", "Hamburguesas"],
    },
  },

  links: {
    website: "https://www.mathiashuque.dev",
    email: "contact@mathiashuque.dev",
    github: "https://github.com/mathiashuque",
    linkedin: "https://www.linkedin.com/in/mathias-huque",
    cv: "https://www.mathiashuque.dev/Mathias_Huque_CV.pdf",
    calendly: undefined,
  },

  // Tech/data identical across languages
  stack: {
    programmingLanguages: ["C++", "C#", "JavaScript", "TypeScript", "Python", "Java", "SQL"],
    frontend: ["Angular", "React", "Next.js", "React Native", "HTML5", "CSS", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "NestJS", ".NET", "Entity Framework Core", "GraphQL", "REST APIs"],
    databases: ["PostgreSQL", "MySQL", "MongoDB", "SQL Server", "Prisma", "Sequelize", "Mongoose"],
    cloudAndDevOps: ["AWS", "Google Cloud", "Azure", "Docker", "Git", "GitHub", "CI/CD", "Linux", "Vercel", "Firebase"],
    testing: ["Jest", "Jasmine", "Cypress", "Cucumber"],
    methodologiesAndTools: ["Postman", "Figma", "Scrum", "Agile"],
  },

  experience: [
    {
      org: "Universidad ORT Uruguay",
      role: "Assistant Professor",
      focus: "Data Structures & Algorithms",
      startYear: undefined,
      endYear: undefined,
      highlights: [
        "Ayudé a estudiantes a entender conceptos clave de Estructuras de Datos y Algoritmos",
        "Apoyé con ejercicios, correcciones y explicaciones",
      ],
    },
    {
      org: "Universidad ORT Uruguay",
      role: "Professor",
      focus: "Fundamentals of Computing",
      startYear: undefined,
      endYear: undefined,
      highlights: [
        "Enseñé fundamentos de programación y computación",
        "Enfoque en explicaciones claras y ejercicios prácticos",
      ],
    },
  ],

  projects: [
    {
      name: "Portfolio Website",
      summary:
        "Mi portfolio personal hecho con Next.js y Tailwind CSS, mostrando proyectos, experiencia e información de contacto.",
      tags: ["Next.js", "React", "Tailwind CSS"],
      live: "https://www.mathiashuque.dev",
      repo: undefined,
      highlights: ["UI rápida y responsive", "Estructura simple y clara"],
    },
  ],

  availability: {
    status: "Open to opportunities",
    notes:
      "Disponible para pasantías, roles junior y proyectos freelance según alcance y tiempos.",
    preferredEngagements: ["Part-time", "Full-time", "Contract", "Freelance"],
    startTimeline: "Flexible / a coordinar",
  },

  services: {
    offerings: [
      {
        name: "Desarrollo Web Full-stack",
        summary:
          "Construcción de apps web completas con frontend + backend moderno, enfocándome en arquitectura limpia y performance.",
        includes: [
          "Frontend (React/Next.js/Angular)",
          "APIs backend (REST/GraphQL)",
          "Diseño e integración de base de datos",
          "Deploy (Docker/Vercel/Cloud)",
        ],
        idealFor: ["MVPs", "Dashboards", "Herramientas internas", "Features de producto"],
        tech: ["Next.js", "React", "Node.js", "NestJS", ".NET", "PostgreSQL"],
      },
      {
        name: "Ingeniería de APIs y Backend",
        summary:
          "Diseño e implementación de APIs robustas, autenticación, modelos de datos e integraciones.",
        includes: [
          "Diseño de APIs REST/GraphQL",
          "Auth (patrones JWT/OAuth)",
          "Modelado y migraciones",
          "Mejoras de performance",
        ],
        idealFor: ["Servicios escalables", "Integraciones", "Refactors"],
        tech: ["NestJS", "Express", ".NET", "PostgreSQL", "MongoDB"],
      },
      {
        name: "Refactor & Arquitectura",
        summary:
          "Refactor de codebases para volverlos mantenibles y bien estructurados.",
        includes: [
          "Modularización",
          "Límites de arquitectura limpia",
          "Estrategia de testing",
          "Profiling de performance",
        ],
        idealFor: ["Apps en crecimiento", "Legacy JS/TS/.NET"],
        tech: ["TypeScript", ".NET", "Jest", "Cypress"],
      },
    ],
  },

  pricing: {
    disclaimer:
      "El precio depende del alcance, timeline y requerimientos. Puedo estimar un costo con una breve descripción del proyecto.",
    models: [
      { currency: "USD", amount: 25, period: "hour", notes: "Punto de partida para tareas chicas." },
      { currency: "USD", amount: 600, period: "project", notes: "Mínimo típico para entrega end-to-end." },
    ],
  },

  education: {
    items: [
      {
        degree: "Systems Engineering",
        institution: "Universidad ORT Uruguay",
        country: "Uruguay",
        startedAtAge: 18,
        startYear: undefined,
        endYear: "Present",
        highlights: [
          "Bases sólidas de ingeniería de software",
          "Algoritmos y estructuras de datos",
          "Bases de datos y sistemas",
        ],
      },
    ],
  },

  certifications: {
    items: [],
    notes:
      "Todavía no listé certificaciones. La experiencia incluye proyectos reales y roles de docencia en universidad.",
  },

  blog: {
    enabled: false,
    posts: [],
    feedUrl: undefined,
    notes: "Todavía no hay posts públicos.",
  },

  scheduling: {
    preferredChannels: ["Email", "LinkedIn"],
    bookingLink: undefined,
    notes:
      "Enviame un mensaje corto con lo que necesitás y tu zona horaria, y te propongo un par de horarios.",
  },

  timezone: {
    iana: "America/Montevideo",
    utcOffset: "UTC-03:00",
    notes: "Me coordino bien con otras zonas horarias; decime tu ubicación o timezone.",
  },

  relocation: {
    openToRelocation: true,
    openToRemote: true,
    preferredRegions: ["Americas", "Europe"],
    notes:
      "Abierto a relocalización según el rol, el equipo y la ubicación. Idealmente remote-first.",
  },

  opensource: {
    contributions: [],
    notes:
      "Todavía no tengo proyectos open-source destacados, pero me siento cómodo colaborando en GitHub.",
  },

  support: {
    topics: [
      "Corrección de bugs",
      "Desarrollo de features",
      "Optimización de performance",
      "Refactor / arquitectura",
      "Setup de testing",
      "Ayuda con deploy",
    ],
    notes:
      "Si describís el problema (stack + objetivo + restricciones), puedo sugerir próximos pasos o ayudarte a implementarlo.",
  },
};
