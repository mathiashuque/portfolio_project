//function normalizeElongations(text: string) {
//  // Collapse any repeated letters (2 or more) into one
//  return text.replace(/(\p{L})\1+/gu, "$1");
//}

export function normalizeInput(text: string) {
  text = text
    .toLowerCase()
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Only aggressively normalize very short messages
  const tokens = text.split(/\s+/).filter(Boolean);
  if (tokens.length <= 3) {
    //text = normalizeElongations(text);
  }

  return text;
}
