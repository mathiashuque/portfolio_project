import { Resend } from "resend";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { ENV, readEnv } from "@/lib/env";
import {
  getClientIp,
  sanitizeEmailHeaderValue,
} from "@/lib/serverSecurity";
import { SITE } from "@/lib/site";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string; // honeypot
};

const MAX_NAME = 80;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4000;

const redis = Redis.fromEnv();
const REDIS_TIMEOUT_MS = 1_500;
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX = 5;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function clamp(str: string, max: number) {
  const s = String(str ?? "");
  return s.length > max ? s.slice(0, max) : s;
}

async function withRedisTimeout<T>(work: Promise<T>): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeout = setTimeout(
      () => reject(new Error("Contact rate limiter timed out")),
      REDIS_TIMEOUT_MS,
    );
  });

  try {
    return await Promise.race([work, timeoutPromise]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

async function rateLimit(ip: string) {
  const key = `rl:contact:ip:${encodeURIComponent(ip)}`;
  const [count] = await withRedisTimeout(
    redis
      .multi()
      .incr(key)
      .expire(key, RATE_LIMIT_WINDOW_SECONDS, "NX")
      .exec(),
  );

  if (count <= RATE_LIMIT_MAX) return { allowed: true, retryAfter: 0 };

  const ttl = await withRedisTimeout(redis.ttl(key));
  return {
    allowed: false,
    retryAfter:
      typeof ttl === "number" && ttl > 0 ? ttl : RATE_LIMIT_WINDOW_SECONDS,
  };
}

function getResend() {
  const key = readEnv(ENV.resendApiKey);
  return key ? new Resend(key) : null;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  let limit: Awaited<ReturnType<typeof rateLimit>>;
  try {
    limit = await rateLimit(ip);
  } catch (error) {
    console.error("[contact] Redis rate limiter failed", error);
    return NextResponse.json(
      { error: "Service temporarily unavailable" },
      { status: 503 },
    );
  }

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfter) },
      },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: if bots fill it, pretend success (don’t teach them)
  if (String(payload.website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = clamp(
    sanitizeEmailHeaderValue(String(payload.name ?? "").trim()),
    MAX_NAME,
  );
  const email = clamp(String(payload.email ?? "").trim(), MAX_EMAIL);
  const message = clamp(String(payload.message ?? "").trim(), MAX_MESSAGE);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const to = readEnv(ENV.contactToEmail);
  const resend = getResend();

  // Keep responses generic to avoid leaking config state
  if (!to || !resend) {
    return NextResponse.json({ error: "Service not configured" }, { status: 500 });
  }

  // IMPORTANT:
  // For Resend, `from` must be from a verified domain/sender.
  // Prefer a no-reply/alias rather than your personal inbox.
  const from = readEnv(ENV.contactFromEmail) ?? SITE.defaultContactFrom;

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nIP: ${ip}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
