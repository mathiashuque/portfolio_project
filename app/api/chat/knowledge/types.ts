// src/app/api/chat/knowledge/types.ts
export type Language = "English" | "Spanish";

export type Money = {
  currency: "USD" | "EUR" | "UYU";
  amount: number;
  period?: "hour" | "day" | "week" | "month" | "project";
  notes?: string;
};

export type Service = {
  name: string;
  summary: string;
  includes?: string[];
  idealFor?: string[];
  tech?: string[];
};

export type Education = {
  degree: string;
  institution: string;
  country?: string;
  startedAtAge?: number;
  startYear?: number;
  endYear?: number | "Present";
  highlights?: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  issuedYear?: number;
  expiresYear?: number;
  url?: string;
};

export type BlogPost = {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string; // ISO
  tags?: string[];
  url?: string;
};

export type OpenSourceProject = {
  name: string;
  summary: string;
  url: string;
  role?: string;
  tech?: string[];
};

export type Knowledge = {
  person: {
    name: string;
    title: string;
    tagline: string;
    birth: {
      month: string;
      year: number;
      country: string;
      city?: string;
    };
    location: {
      country: string;
      city?: string;
      timezone: string;
      openToRemote: boolean;
      openToRelocation: boolean;
      relocationNotes: string;
    };
    languagesSpoken: Language[];
    studying: {
      degree: string;
      institution: string;
      startedAtAge: number;
    };
    startedProgrammingAtAge: number;
    biography: string;
    personal: {
      values: string[];
      workingStyle: string[];
      interestsSummary: string;
    };
  };

  interests: {
    technology: boolean;
    gaming: {
      favouriteGenres: string[];
      favouriteGames: string[];
    };
    music: { favouriteGenre: string };
    food: { dislikes: string[]; favourites: string[] };
  };

  links: {
    website: string;
    email: string;
    github: string;
    linkedin: string;
    cv: string;
    calendly?: string;
  };

  stack: {
    programmingLanguages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    cloudAndDevOps: string[];
    testing: string[];
    methodologiesAndTools: string[];
  };

  experience: Array<{
    org: string;
    role: string;
    focus: string;
    startYear?: number;
    endYear?: number | "Present";
    highlights?: string[];
  }>;

  projects: Array<{
    name: string;
    summary: string;
    tags: string[];
    live?: string;
    repo?: string;
    highlights?: string[];
  }>;

  availability: {
    status: "Open to opportunities" | "Not available" | "Limited availability";
    notes: string;
    preferredEngagements: string[];
    startTimeline: string;
  };

  services: { offerings: Service[] };

  pricing: {
    disclaimer: string;
    models: Money[];
  };

  education: { items: Education[] };

  certifications: {
    items: Certification[];
    notes?: string;
  };

  blog: {
    enabled: boolean;
    posts: BlogPost[];
    feedUrl?: string;
    notes?: string;
  };

  scheduling: {
    preferredChannels: string[];
    bookingLink?: string;
    notes?: string;
  };

  timezone: {
    iana: string;
    utcOffset: string;
    notes?: string;
  };

  relocation: {
    openToRelocation: boolean;
    openToRemote: boolean;
    preferredRegions: string[];
    notes?: string;
  };

  opensource: {
    contributions: OpenSourceProject[];
    notes?: string;
  };

  support: {
    topics: string[];
    notes?: string;
  };
};
