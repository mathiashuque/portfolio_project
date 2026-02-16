import { NextRequest } from "next/server";
import { runWorkflow } from "./Agent";
import crypto from "crypto";

const MAX_INPUT_CHARS = 100;

function safeEqual(a: string, b: string) {
  // constant-time compare (prevents timing leaks)
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.CHATBOT_API_KEY;
    if (!apiKey) {
      console.error("Missing CHATBOT_API_KEY env var");
      return Response.json({ error: "Server misconfigured" }, { status: 500 });
    }

    // Expect: Authorization: Bearer <secret>
    const auth = req.headers.get("authorization") ?? "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

    if (!token || !safeEqual(token, apiKey)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const input = body?.message ?? body?.input ?? "";

    if (!input) {
      return Response.json({ error: "Missing message" }, { status: 400 });
    }

    if (typeof input !== "string") {
      return Response.json({ error: "Invalid message format" }, { status: 400 });
    }

    if (input.length > MAX_INPUT_CHARS) {
      return Response.json(
        { error: `Message too long (max ${MAX_INPUT_CHARS} characters)` },
        { status: 413 }
      );
    }

    const { answer } = await runWorkflow({ input_as_text: input });
    return Response.json({ answer });
  } catch (error) {
    console.error("Chatbot error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
