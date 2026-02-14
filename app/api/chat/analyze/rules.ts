// src/app/api/chat/analyze/rules.ts
import type { Intent } from "./intents";

function isGreeting(t: string) {
  return /^(hi|hello|hey|yo|sup|good (morning|afternoon|evening)|hola|buenas|buenos dias|buen día)\b/.test(
    t
  );
}

function isAgeQuestion(t: string) {
  return /\b(how old|your age|born)\b/.test(t);
}

function isOriginQuestion(t: string) {
  return /\b(where (are|were) you (from|born)|where are you based|based in)\b/.test(t);
}

function isLanguagesQuestion(t: string) {
  return /\b(what languages|do you speak|english|spanish)\b/.test(t);
}



export function applyRules(text: string): Intent | null {
  if (isGreeting(text)) return "greeting";
  if (isAgeQuestion(text)) return "age";
  if (isOriginQuestion(text)) return "origin";
  if (isLanguagesQuestion(text)) return "languagesSpoken";
  return null;
}
