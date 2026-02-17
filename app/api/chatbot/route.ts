// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { runWorkflow } from "./Agent";
import crypto from "crypto";
import { clampToLast3Pairs } from "./history";

const redis = Redis.fromEnv();

const MAX_INPUT_CHARS = 100;

const SESSION_LIMIT = 10; // max 10 messages per session
const IP_LIMIT = 30;
const WINDOW_SECONDS = 60 * 60; // 1h

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function getIP(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  // @ts-expect-error - a veces existe en runtime
  return req.ip ?? "unknown";
}

function getSID(req: NextRequest): { sid: string; isNew: boolean } {
  const existing = req.cookies.get("sid")?.value;
  if (existing) return { sid: existing, isNew: false };
  return { sid: crypto.randomUUID(), isNew: true };
}

function setSIDCookie(res: NextResponse, sid: string) {
  res.cookies.set("sid", sid, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

async function incrWithWindow(key: string): Promise<number> {
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, WINDOW_SECONDS);
  return count;
}

async function ttlSeconds(key: string): Promise<number> {
  const t = await redis.ttl(key);
  return typeof t === "number" ? t : WINDOW_SECONDS;
}

export async function POST(req: NextRequest) {
  try {

    // 1) INPUT VALIDATION (tu lógica original)
    const body = (await req.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;
    const input = (body.message as string) ?? (body.input as string) ?? "";

    if (!input) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }
    if (typeof input !== "string") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 },
      );
    }
    if (input.length > MAX_INPUT_CHARS) {
      return NextResponse.json(
        { error: `Message too long (max ${MAX_INPUT_CHARS} characters)` },
        { status: 413 },
      );
    }

    // 2) RATE LIMIT (IP + sesión)
    const ip = getIP(req);
    const { sid, isNew } = getSID(req);

    const ipKey = `rl:ip:${encodeURIComponent(ip)}`;

    const ipCount = await incrWithWindow(ipKey);
    if (ipCount > IP_LIMIT) {
      const retryAfter = await ttlSeconds(ipKey);
      const out = NextResponse.json(
        {
          error: "rate_limited",
          message: "Demasiadas consultas desde esta red. Probá más tarde.",
        },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
      if (isNew) setSIDCookie(out, sid);
      return out;
    }

    const sidKey = `rl:sid:${sid}`;
    const sidCount = await incrWithWindow(sidKey);
    if (sidCount > SESSION_LIMIT) {
      const retryAfter = await ttlSeconds(sidKey);
      const out = NextResponse.json(
        {
          error: "rate_limited",
          message: "Límite: 10 preguntas por sesión. Probá en un rato.",
        },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
      if (isNew) setSIDCookie(out, sid);
      return out;
    }

    // 3) LOAD HISTORY (per session)
    const historyKey = `chat:sid:${sid}`;

    type StoredMsg = { role: "user" | "assistant"; content: string };

    const history = (await redis.get<StoredMsg[]>(historyKey)) ?? [];

    // 4) RUN WITH MEMORY
    const { answer } = await runWorkflow({
      input_as_text: input,
      history,
    });

    // 6) SAVE UPDATED HISTORY (last 3 Q&A pairs)
    const nextHistory = clampToLast3Pairs([
      ...history,
      { role: "user", content: input },
      { role: "assistant", content: answer },
    ]);

    await redis.set(historyKey, nextHistory, { ex: 60 * 60 * 24 });

    const out = NextResponse.json({ answer });
    if (isNew) setSIDCookie(out, sid);
    return out;
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
