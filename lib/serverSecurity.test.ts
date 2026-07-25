import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getClientIp,
  sanitizeEmailHeaderValue,
  tokensEqual,
} from "./serverSecurity";

afterEach(() => {
  vi.unstubAllEnvs();
});

function requestWithHeaders(headers: HeadersInit) {
  return new Request("https://example.test", { headers });
}

describe("getClientIp", () => {
  it("prefers Vercel's trusted forwarded address", () => {
    vi.stubEnv("VERCEL", "1");
    const req = requestWithHeaders({
      "x-forwarded-for": "198.51.100.8",
      "x-vercel-forwarded-for": "203.0.113.4",
    });

    expect(getClientIp(req)).toBe("203.0.113.4");
  });

  it("does not trust client-supplied forwarding headers in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    const req = requestWithHeaders({
      "x-forwarded-for": "198.51.100.8",
      "x-real-ip": "198.51.100.9",
    });

    expect(getClientIp(req)).toBe("unknown");
  });

  it("does not trust a Vercel header outside Vercel in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    const req = requestWithHeaders({
      "x-vercel-forwarded-for": "203.0.113.4",
    });

    expect(getClientIp(req)).toBe("unknown");
  });

  it("supports local proxy headers outside production", () => {
    vi.stubEnv("NODE_ENV", "development");
    const req = requestWithHeaders({
      "x-forwarded-for": "198.51.100.8, 10.0.0.1",
    });

    expect(getClientIp(req)).toBe("198.51.100.8");
  });
});

describe("sanitizeEmailHeaderValue", () => {
  it("removes line breaks from email header values", () => {
    expect(sanitizeEmailHeaderValue("Alice\r\nBcc: victim@example.com")).toBe(
      "Alice  Bcc: victim@example.com",
    );
  });
});

describe("tokensEqual", () => {
  it("accepts equal tokens and rejects unequal tokens of any length", () => {
    expect(tokensEqual("same-secret", "same-secret")).toBe(true);
    expect(tokensEqual("wrong", "same-secret")).toBe(false);
    expect(tokensEqual("", "same-secret")).toBe(false);
  });
});
