import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/site";

const isDevelopment = process.env.NODE_ENV === "development";
const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

function buildCsp(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'${isDevelopment ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self'${isDevelopment ? " ws: wss:" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export default function middleware(req: NextRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  req.headers.set("x-nonce", nonce);

  const res = intlMiddleware(req);
  res.headers.set("Content-Security-Policy", buildCsp(nonce));
  return res;
}

export const config = {
  matcher: ["/", "/(en|es)/:path*"],
};
