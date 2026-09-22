import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { runWorkflow } from "./Agent";
import { clampToLast3Pairs, type StoredMsg } from "./history";
import { getClientIp } from "@/lib/serverSecurity";
import {
  CHAT_IP_MESSAGE_LIMIT,
  CHAT_RATE_LIMIT_WINDOW_SECONDS,
  CHAT_SESSION_MESSAGE_LIMIT,
  MAX_MESSAGE_CHARS,
} from "@/lib/chat";
import { rateLimit } from "@/lib/rateLimit";
import { getRedis, REDIS_TIMEOUT_MS } from "@/lib/redis";
import { withTimeout } from "@/lib/timeout";

const SID_COOKIE = "chat_sid_v2";
const SID_MAX_AGE_SECONDS = 60 * 60 * 24;

function getSID(req: NextRequest): { sid: string; isNew: boolean } {
  const existing = req.cookies.get(SID_COOKIE)?.value;
  if (existing) return { sid: existing, isNew: false };
  return { sid: crypto.randomUUID(), isNew: true };
}

function setSIDCookie(res: NextResponse, sid: string) {
  res.cookies.set(SID_COOKIE, sid, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SID_MAX_AGE_SECONDS,
  });
}

function redisUnavailableResponse(label: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[chatbot] Redis ${label} failed. ${message}`);

  return NextResponse.json(
    {
      error: "redis_unavailable",
      message: "Chatbot storage is temporarily unavailable. Try again later.",
    },
    { status: 503 },
  );
}

function rateLimited(sid: string, isNew: boolean, retryAfter: number) {
  const out = NextResponse.json(
    { error: "rate_limited" },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
  if (isNew) setSIDCookie(out, sid);
  return out;
}

async function loadHistory(historyKey: string): Promise<StoredMsg[]> {
  const stored = await withTimeout(
    getRedis().get<StoredMsg[]>(historyKey),
    "redis.get",
    REDIS_TIMEOUT_MS,
  );
  return stored ?? [];
}

async function saveHistory(historyKey: string, history: StoredMsg[]) {
  await withTimeout(
    getRedis().set(historyKey, history, { ex: 60 * 60 * 24 }),
    "redis.set",
    REDIS_TIMEOUT_MS,
  );
}

export async function POST(req: NextRequest) {
  try {
    // 1) INPUT VALIDATION
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
    if (input.length > MAX_MESSAGE_CHARS) {
      return NextResponse.json(
        { error: `Message too long (max ${MAX_MESSAGE_CHARS} characters)` },
        { status: 413 },
      );
    }

    // 2) RATE LIMIT (IP + sesión)
    const ip = getClientIp(req);
    const { sid, isNew } = getSID(req);

    const ipKey = `rl:ip:${encodeURIComponent(ip)}`;
    const ipLimit = await rateLimit(
      ipKey,
      CHAT_IP_MESSAGE_LIMIT,
      CHAT_RATE_LIMIT_WINDOW_SECONDS,
      "redis.ipRateLimit",
    );

    if (!ipLimit.allowed) return rateLimited(sid, isNew, ipLimit.retryAfter);

    const sidLimit = await rateLimit(
      `rl:sid:${sid}`,
      CHAT_SESSION_MESSAGE_LIMIT,
      CHAT_RATE_LIMIT_WINDOW_SECONDS,
      "redis.sidRateLimit",
    );

    if (!sidLimit.allowed) return rateLimited(sid, isNew, sidLimit.retryAfter);

    // 3) LOAD HISTORY (per session)
    const historyKey = `chat:sid:${sid}`;
    const history = await loadHistory(historyKey);

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

    await saveHistory(historyKey, nextHistory);

    const out = NextResponse.json({ answer });
    if (isNew) setSIDCookie(out, sid);
    return out;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("redis.")) {
      return redisUnavailableResponse("operation", error);
    }

    console.error("Chatbot error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
