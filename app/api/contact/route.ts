import { Resend } from "resend";
import { NextResponse } from "next/server";
import { ENV, readEnv } from "@/lib/env";
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

// Basic burst protection (best-effort; resets on cold start)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;
const buckets = new Map<string, { count: number; resetAt: number }>();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function clamp(str: string, max: number) {
  const s = String(str ?? "");
  return s.length > max ? s.slice(0, max) : s;
}

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimit(key: string) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX) return false;

  current.count += 1;
  return true;
}

function getResend() {
  const key = readEnv(ENV.resendApiKey);
  return key ? new Resend(key) : null;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 },
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

  const name = clamp(String(payload.name ?? "").trim(), MAX_NAME);
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
