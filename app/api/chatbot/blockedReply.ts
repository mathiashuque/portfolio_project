export type BlockedReplyLanguage = "en" | "es";

const SPANISH_MARKERS = new Set([
  "acerca",
  "buenas",
  "buenos",
  "como",
  "cuando",
  "dime",
  "donde",
  "eres",
  "experiencia",
  "gracias",
  "hola",
  "idiota",
  "proyectos",
  "puedes",
  "quiero",
  "sobre",
  "trabajo",
]);

const ENGLISH_MARKERS = new Set([
  "about",
  "can",
  "experience",
  "hello",
  "hi",
  "how",
  "idiot",
  "please",
  "projects",
  "thanks",
  "tell",
  "what",
  "when",
  "where",
  "work",
]);

export function detectBlockedReplyLanguage(
  text: string,
): BlockedReplyLanguage {
  if (/[áéíóúüñ¿¡]/i.test(text)) return "es";

  const words = text.toLocaleLowerCase("en").match(/\p{L}+/gu) ?? [];
  let spanishScore = 0;
  let englishScore = 0;

  for (const word of words) {
    if (SPANISH_MARKERS.has(word)) spanishScore += 1;
    if (ENGLISH_MARKERS.has(word)) englishScore += 1;
  }

  return spanishScore > englishScore ? "es" : "en";
}

export function blockedReply(text: string): string {
  return detectBlockedReplyLanguage(text) === "es"
    ? "No hace falta hablar así. Si querés, preguntame sobre mi trabajo, proyectos o experiencia."
    : "No need for that. Feel free to ask about my work, projects, or experience.";
}
