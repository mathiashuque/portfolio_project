import { NextRequest } from "next/server";
import { runWorkflow } from "./Agent";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const input = body?.message ?? body?.input ?? "";

    if (!input) {
      return Response.json(
        { error: "Missing message" },
        { status: 400 }
      );
    }

    const { answer } = await runWorkflow({
      input_as_text: input,
    });

    return Response.json({ answer });
  } catch (error) {
    console.error("Chatbot error:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
