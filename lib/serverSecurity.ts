import { createHash, timingSafeEqual } from "node:crypto";

const MAX_IP_LENGTH = 64;

function firstForwardedAddress(value: string | null) {
  const address = value?.split(",", 1)[0]?.trim();
  if (!address || address.length > MAX_IP_LENGTH) return undefined;
  return address;
}

export function getClientIp(req: Pick<Request, "headers">) {
  if (process.env.VERCEL === "1") {
    return (
      firstForwardedAddress(req.headers.get("x-vercel-forwarded-for")) ??
      "unknown"
    );
  }

  // Vercel supplies x-vercel-forwarded-for in production. Only trust generic
  // proxy headers during local development, where the application controls the
  // proxy in front of Next.js.
  if (process.env.NODE_ENV !== "production") {
    return (
      firstForwardedAddress(req.headers.get("x-forwarded-for")) ??
      firstForwardedAddress(req.headers.get("x-real-ip")) ??
      "unknown"
    );
  }

  return "unknown";
}

export function sanitizeEmailHeaderValue(value: string) {
  return value.replaceAll("\r", " ").replaceAll("\n", " ");
}

export function tokensEqual(candidate: string, expected: string) {
  const candidateDigest = createHash("sha256").update(candidate).digest();
  const expectedDigest = createHash("sha256").update(expected).digest();
  return timingSafeEqual(candidateDigest, expectedDigest);
}
