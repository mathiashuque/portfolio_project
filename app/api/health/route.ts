import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { ENV, missingEnvMessage, readEnv, type EnvName } from "@/lib/env";

export const dynamic = "force-dynamic";

type ServiceName = "redis" | "openai" | "resend";
type HealthStatus = "ok" | "missing_env" | "error";

type ServiceHealth = {
  status: HealthStatus;
  latencyMs?: number;
  message?: string;
};

const SERVICES: ServiceName[] = ["redis", "openai", "resend"];
const CHECK_TIMEOUT_MS = 5_000;

function json(status: number, body: unknown) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function isAuthorized(req: NextRequest) {
  const token = readEnv(ENV.healthcheckToken);
  if (!token) return true;

  const auth = req.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice("Bearer ".length) : "";
  const queryToken = req.nextUrl.searchParams.get("token") ?? "";

  return bearer === token || queryToken === token;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}

async function withTimeout<T>(label: string, work: Promise<T>): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeout = setTimeout(
      () => reject(new Error(`${label} health check timed out`)),
      CHECK_TIMEOUT_MS,
    );
  });

  try {
    return await Promise.race([work, timeoutPromise]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

async function measure(work: () => Promise<void>): Promise<ServiceHealth> {
  const startedAt = Date.now();

  try {
    await work();
    return {
      status: "ok",
      latencyMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      status: "error",
      latencyMs: Date.now() - startedAt,
      message: errorMessage(error),
    };
  }
}

function missingEnv(names: EnvName[]): ServiceHealth {
  return {
    status: "missing_env",
    message: missingEnvMessage(names),
  };
}

async function checkRedis(): Promise<ServiceHealth> {
  const requiredEnv = [ENV.upstashRedisRestUrl, ENV.upstashRedisRestToken];
  if (requiredEnv.some((name) => !readEnv(name))) {
    return missingEnv(requiredEnv);
  }

  return measure(async () => {
    const redis = Redis.fromEnv();
    await withTimeout("Redis", redis.ping());
  });
}

async function checkOpenAI(): Promise<ServiceHealth> {
  const apiKey = readEnv(ENV.openaiApiKey);
  if (!apiKey) {
    return missingEnv([ENV.openaiApiKey]);
  }

  return measure(async () => {
    const response = await withTimeout(
      "OpenAI",
      fetch("https://api.openai.com/v1/models", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        cache: "no-store",
      }),
    );

    if (!response.ok) {
      throw new Error(`OpenAI returned ${response.status}`);
    }
  });
}

async function checkResend(): Promise<ServiceHealth> {
  const apiKey = readEnv(ENV.resendApiKey);
  if (!apiKey) {
    return missingEnv([ENV.resendApiKey]);
  }

  return measure(async () => {
    const response = await withTimeout(
      "Resend",
      fetch("https://api.resend.com/domains", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        cache: "no-store",
      }),
    );

    if (!response.ok) {
      throw new Error(`Resend returned ${response.status}`);
    }
  });
}

async function runCheck(service: ServiceName): Promise<ServiceHealth> {
  if (service === "redis") return checkRedis();
  if (service === "openai") return checkOpenAI();
  return checkResend();
}

function requestedServices(req: NextRequest): ServiceName[] {
  const raw = req.nextUrl.searchParams.get("service");
  if (!raw) return SERVICES;

  const selected = raw
    .split(",")
    .map((service) => service.trim().toLowerCase())
    .filter((service): service is ServiceName =>
      SERVICES.includes(service as ServiceName),
    );

  return selected.length > 0 ? selected : SERVICES;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return json(401, { ok: false, error: "Unauthorized" });
  }

  const selectedServices = requestedServices(req);
  const entries = await Promise.all(
    selectedServices.map(async (service) => [service, await runCheck(service)]),
  );
  const services = Object.fromEntries(entries) as Partial<Record<
    ServiceName,
    ServiceHealth
  >>;
  const ok = Object.values(services).every((service) => service.status === "ok");

  return json(ok ? 200 : 503, {
    ok,
    checkedAt: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    services,
  });
}
