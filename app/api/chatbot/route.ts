import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { runWorkflow } from "./Agent";
import crypto from "crypto";
import { clampToLast3Pairs, type StoredMsg } from "./history";

const redis = Redis.fromEnv();

const MAX_INPUT_CHARS = 100;
const REDIS_TIMEOUT_MS = 1_500;

const SESSION_LIMIT = 10; // max 10 messages per session
const IP_LIMIT = 30;
const WINDOW_SECONDS = 60 * 60; // 1h

type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfter: number; message: string };

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

async function withRedisTimeout<T>(label: string, work: Promise<T>): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeout = setTimeout(
      () => reject(new Error(`${label} timed out after ${REDIS_TIMEOUT_MS}ms`)),
      REDIS_TIMEOUT_MS,
    );
  });

  try {
    return await Promise.race([work, timeoutPromise]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${label} failed: ${message}`);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function redisUnavailableResponse(label: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[chatbot] Redis ${label} failed. ${message}`);

  return NextResponse.json(
    {
      error: "redis_unavailable",
      message:
        "Chatbot storage is temporarily unavailable. Check the Upstash Redis configuration and try again.",
      detail: message,
    },
    { status: 503 },
  );
}

async function incrWithWindow(key: string): Promise<number> {
  const count = await withRedisTimeout("redis.incr", redis.incr(key));
  if (count === 1) {
    await withRedisTimeout("redis.expire", redis.expire(key, WINDOW_SECONDS));
  }
  return count;
}

async function ttlSeconds(key: string): Promise<number> {
  const t = await withRedisTimeout("redis.ttl", redis.ttl(key));
  return typeof t === "number" ? t : WINDOW_SECONDS;
}

async function checkRateLimit(
  key: string,
  limit: number,
  message: string,
): Promise<RateLimitResult> {
  const count = await incrWithWindow(key);
  if (count <= limit) return { ok: true };

  return {
    ok: false,
    retryAfter: await ttlSeconds(key),
    message,
  };
}

async function loadHistory(historyKey: string): Promise<StoredMsg[]> {
  return (
    (await withRedisTimeout("redis.get", redis.get<StoredMsg[]>(historyKey))) ??
    []
  );
}

async function saveHistory(historyKey: string, history: StoredMsg[]) {
  await withRedisTimeout(
    "redis.set",
    redis.set(historyKey, history, { ex: 60 * 60 * 24 }),
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

    const ipLimit = await checkRateLimit(
      ipKey,
      IP_LIMIT,
      "Demasiadas consultas desde esta red. Probá más tarde.",
    );
    if (!ipLimit.ok) {
      const out = NextResponse.json(
        {
          error: "rate_limited",
          message: ipLimit.message,
        },
        { status: 429, headers: { "Retry-After": String(ipLimit.retryAfter) } },
      );
      if (isNew) setSIDCookie(out, sid);
      return out;
    }

    const sidKey = `rl:sid:${sid}`;
    const sidLimit = await checkRateLimit(
      sidKey,
      SESSION_LIMIT,
      "Límite: 10 preguntas por sesión. Probá en un rato.",
    );

    if (!sidLimit.ok) {
      const out = NextResponse.json(
        {
          error: "rate_limited",
          message: sidLimit.message,
        },
        {
          status: 429,
          headers: { "Retry-After": String(sidLimit.retryAfter) },
        },
      );
      if (isNew) setSIDCookie(out, sid);
      return out;
    }

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
