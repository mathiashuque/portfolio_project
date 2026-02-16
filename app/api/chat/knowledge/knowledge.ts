// src/app/api/chat/knowledge.ts

import { knowledgeEn } from "./knowledge.en";
import { knowledgeEs } from "./knowledge.es";
import { Knowledge } from "./types";

export function getKnowledge(lang?: string): Knowledge {
  const l = (lang ?? "").toLowerCase();
  if (l.startsWith("es")) return knowledgeEs;
  return knowledgeEn;
}

// Backwards compatibility (existing imports)
export const knowledge = knowledgeEn;
