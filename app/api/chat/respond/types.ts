// src/app/api/chat/respond/types.ts
import type { Intent } from "../analyze/intents";
import type { Lang } from "../analyze/language";

export type Analysis = {
  lang: Lang; // now includes "other"
  intent: Intent;
  confidence: number;
  entities?: {
    projectName?: string;
    mentionedSkills: string[];
  };
};
