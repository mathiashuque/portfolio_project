// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import { respond } from "./chatResponder";

export const runtime = "nodejs";

type ChatRequestBody = {
  message?: unknown;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequestBody;

    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    if (message.length > 600) {
      return NextResponse.json(
        { error: "Message exceeds maximum length." },
        { status: 413 },
      );
    }

    // Very light anti-bot guard (basic sanity check)
    if (message.replace(/\s/g, "").length < 2) {
      return NextResponse.json(
        { error: "Invalid message." },
        { status: 400 },
      );
    }

    const reply = respond(message);

    return NextResponse.json(
      { reply },
      { status: 200 },
    );
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
