// src/app/api/chat/respond/types.ts
export interface Analysis {
  intent: string;
  lang?: "en" | "es";
  entities?: {
    projectName?: string;
    mentionedSkills?: string[];
  };
}
