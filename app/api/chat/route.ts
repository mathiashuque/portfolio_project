import { NextResponse } from "next/server";
import { analyze } from "./analyze";
import { respondFromAnalysis } from "./respond";

export async function POST(req: Request) {
  const body = (await req.json()) as { message?: string };
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400 },
    );
  }

  const analysis = analyze(message);
  const reply = respondFromAnalysis(analysis);

  return NextResponse.json({ reply });
}
