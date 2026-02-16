// src/app/api/chat/knowledge/knowledge.en.ts
import type { Knowledge } from "./types";

export const knowledgeEn: Knowledge = {
  person: {
    name: "Mathias Huque",
    title: "Software Developer",
    tagline: "I build software applications that turn ideas into reality.",

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
        "Open to relocation depending on the role and location. Prefer remote-friendly teams.",
    },

    languagesSpoken: ["English", "Spanish"],

    studying: {
      degree: "Systems Engineering",
      institution: "Universidad ORT Uruguay",
      startedAtAge: 18,
    },

    startedProgrammingAtAge: 15,

    biography:
      "I am a software developer from Uruguay with a strong interest in building practical, well-architected applications. I began programming at the age of 15 and later pursued a degree in Systems Engineering at Universidad ORT Uruguay. My interests span both frontend and backend development, with a focus on performance, clean architecture, and user experience.",

    personal: {
      values: ["Clean architecture", "Performance", "Great UX"],
      workingStyle: ["Clear communication", "Pragmatic engineering", "Iterative delivery"],
      interestsSummary:
        "I enjoy building products end-to-end, improving performance, and keeping codebases clean and maintainable.",
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
      dislikes: ["Most fish, alcohol"],
      favourites: ["Salmon", "Chocolate", "Hamburgers"],
    },
  },

  links: {
    website: "https://www.mathiashuque.dev",
    email: "contact@mathiashuque.dev",
    github: "https://github.com/mathiashuque",
    linkedin: "https://www.linkedin.com/in/mathias-huque",
    cv: "https://mathiashuque.dev/Mathias_Huque_CV.pdf",
    calendly: undefined,
  },

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
        "Helped students understand core DS&A concepts",
        "Assisted with exercises, grading, and explanations",
      ],
    },
    {
      org: "Universidad ORT Uruguay",
      role: "Professor",
      focus: "Fundamentals of Computing",
      startYear: undefined,
      endYear: undefined,
      highlights: [
        "Taught foundational programming and computing concepts",
        "Focused on clear explanations and practical exercises",
      ],
    },
  ],

  projects: [
    {
      name: "Portfolio Website",
      summary:
        "My personal portfolio built with Next.js and Tailwind CSS, showcasing projects, experience, and contact information.",
      tags: ["Next.js", "React", "Tailwind CSS"],
      live: "https://www.mathiashuque.dev",
      repo: undefined,
      highlights: ["Fast, responsive UI", "Simple, clean structure"],
    },
  ],

  availability: {
    status: "Open to opportunities",
    notes:
      "Available for internships, junior roles, and freelance projects depending on scope and timeline.",
    preferredEngagements: ["Part-time", "Full-time", "Contract", "Freelance"],
    startTimeline: "Flexible / by agreement",
  },

  services: {
    offerings: [
      {
        name: "Full-stack Web Development",
        summary:
          "Build complete web apps with modern frontend + backend, focusing on clean architecture and performance.",
        includes: [
          "Frontend (React/Next.js/Angular)",
          "Backend APIs (REST/GraphQL)",
          "Database design & integration",
          "Deployment (Docker/Vercel/Cloud)",
        ],
        idealFor: ["MVPs", "Dashboards", "Internal tools", "Product features"],
        tech: ["Next.js", "React", "Node.js", "NestJS", ".NET", "PostgreSQL"],
      },
      {
        name: "API & Backend Engineering",
        summary:
          "Design and implement robust APIs, authentication, data models, and integrations.",
        includes: [
          "REST/GraphQL API design",
          "Auth (JWT/OAuth patterns)",
          "Database modeling & migrations",
          "Performance improvements",
        ],
        idealFor: ["Scalable services", "Integrations", "Refactors"],
        tech: ["NestJS", "Express", ".NET", "PostgreSQL", "MongoDB"],
      },
      {
        name: "Codebase Cleanup & Architecture",
        summary:
          "Refactor messy codebases into maintainable, well-structured systems.",
        includes: [
          "Modularization",
          "Clean architecture boundaries",
          "Testing strategy",
          "Performance profiling",
        ],
        idealFor: ["Growing apps", "Legacy JS/TS/.NET systems"],
        tech: ["TypeScript", ".NET", "Jest", "Cypress"],
      },
    ],
  },

  pricing: {
    disclaimer:
      "Pricing depends on scope, timeline, and requirements. I’m happy to give an estimate after a quick description of the project.",
    models: [
      { currency: "USD", amount: 25, period: "hour", notes: "Starting point for small freelance tasks." },
      { currency: "USD", amount: 600, period: "project", notes: "Typical minimum project budget for end-to-end delivery." },
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
          "Strong foundations in software engineering",
          "Algorithms and data structures",
          "Databases and systems",
        ],
      },
    ],
  },

  certifications: {
    items: [],
    notes:
      "No formal certifications listed yet. Experience includes real projects and university teaching roles.",
  },

  blog: {
    enabled: false,
    posts: [],
    feedUrl: undefined,
    notes: "No public blog posts listed yet.",
  },

  scheduling: {
    preferredChannels: ["Email", "LinkedIn"],
    bookingLink: undefined,
    notes:
      "Send a short message with what you need and your timezone, and I’ll propose a couple of times.",
  },

  timezone: {
    iana: "America/Montevideo",
    utcOffset: "UTC-03:00",
    notes: "I can coordinate across timezones; just tell me your location or timezone.",
  },

  relocation: {
    openToRelocation: true,
    openToRemote: true,
    preferredRegions: ["Americas", "Europe"],
    notes: "Open to relocation depending on role, team, and location. Remote-first is ideal.",
  },

  opensource: {
    contributions: [],
    notes:
      "No featured open-source projects listed yet, but I’m comfortable contributing and collaborating on GitHub.",
  },

  support: {
    topics: [
      "Bug fixes",
      "Feature development",
      "Performance optimization",
      "Refactoring / architecture",
      "Testing setup",
      "Deployment help",
    ],
    notes:
      "If you describe the problem (stack + goal + constraints), I can suggest next steps or help implement a fix.",
  },
};
