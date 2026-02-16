export function normalize(text: string) {
  text = text
    .toLowerCase()
    .normalize("NFD")                 // descompone acentos
    .replace(/[\u0300-\u036f]/g, "")  // elimina diacríticos (tildes)
    .normalize("NFC")                 // recompone (opcional)
    .replace(/[’']/g, "")  
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  const tokens = text.split(/\s+/).filter(Boolean);
  if (tokens.length <= 3) {
    text = normalizeElongations(text);
  }

  return text;
}

function normalizeElongations(text: string) {
  return text.replace(/(\w)\1{2,}/g, "$1"); // Reemplaza letras repetidas 3 o más veces por una sola
}
