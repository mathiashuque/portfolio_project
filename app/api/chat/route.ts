import { NextResponse } from "next/server";
import { analyze } from "./analyze";
import { respondFromAnalysis } from "./respond";
import { detectLanguage } from "./analyze/language";
import { Profanity } from "@2toad/profanity";
import customWords from "./analyze/profanity.json";

// Build once (module scope)
const profanity = new Profanity({
  languages: ["en", "es"],
  wholeWord: true,      
  grawlix: "*****",
  grawlixChar: "$",
});
profanity.addWords(customWords);


export async function POST(req: Request) {
  const body = (await req.json()) as { message?: string };
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  // Profanity guard
  if (profanity.exists(message)) {
    return NextResponse.json({
      reply:
        "Your message contains inappropriate language and will not be answered. Please rephrase and try again.",
    });
  }

  // Language detection
  const lang = detectLanguage(message);

  if (lang === "other") {
    return NextResponse.json({
      reply:
        "Sorry! At the moment, I speak only English and Spanish. Feel free to ask your question in either language.",
    });
  }

  const analysis = analyze(message);
  const reply = respondFromAnalysis({ ...analysis, lang });

  return NextResponse.json({ reply });
}
