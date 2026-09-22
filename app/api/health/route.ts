import { NextRequest, NextResponse } from "next/server";
import { ENV, readEnv, type EnvName } from "@/lib/env";
import { getRedis } from "@/lib/redis";
import { tokensEqual } from "@/lib/serverSecurity";
import { withTimeout } from "@/lib/timeout";

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
  if (!token) return false;

  const auth = req.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice("Bearer ".length) : "";

  return tokensEqual(bearer, token);
}

async function measure(
  service: ServiceName,
  work: () => Promise<void>,
): Promise<ServiceHealth> {
  const startedAt = Date.now();

  try {
    await work();
    return {
      status: "ok",
      latencyMs: Date.now() - startedAt,
    };
  } catch (error) {
    console.error(`[health] ${service} check failed`, error);
    return {
      status: "error",
      latencyMs: Date.now() - startedAt,
      message: "Service check failed",
    };
  }
}

function missingEnv(names: EnvName[]): ServiceHealth {
  console.error(`[health] Missing required environment: ${names.join(", ")}`);
  return {
    status: "missing_env",
    message: "Required service configuration is missing",
  };
}

async function checkRedis(): Promise<ServiceHealth> {
  const requiredEnv = [ENV.upstashRedisRestUrl, ENV.upstashRedisRestToken];
  if (requiredEnv.some((name) => !readEnv(name))) {
    return missingEnv(requiredEnv);
  }

  return measure("redis", async () => {
    await withTimeout(getRedis().ping(), "redis.ping", CHECK_TIMEOUT_MS);
  });
}

async function checkOpenAI(): Promise<ServiceHealth> {
  const apiKey = readEnv(ENV.openaiApiKey);
  if (!apiKey) {
    return missingEnv([ENV.openaiApiKey]);
  }

  return measure("openai", async () => {
    const response = await withTimeout(
      fetch("https://api.openai.com/v1/models", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        cache: "no-store",
      }),
      "openai.models",
      CHECK_TIMEOUT_MS,
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

  return measure("resend", async () => {
    const response = await withTimeout(
      fetch("https://api.resend.com/domains", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        cache: "no-store",
      }),
      "resend.domains",
      CHECK_TIMEOUT_MS,
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
  if (!readEnv(ENV.healthcheckToken)) {
    console.error("[health] HEALTHCHECK_TOKEN is not configured");
    return json(503, { ok: false, error: "Health check unavailable" });
  }

  if (!isAuthorized(req)) {
    console.warn("[health] Unauthorized health check request");
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
