# OWASP Top 10 (2021) Security Analysis

**Project:** portfolio_project (Next.js 16 portfolio site with chatbot + contact form)
**Scope:** `app/api/*` routes, `lib/env.ts`, `proxy.ts` (middleware), `components/chat/*`, `next.config.ts`, CI workflows, dependency manifest.
**Method:** Manual source review of all API routes, middleware, environment handling, and client-rendered chat output; `npm audit --audit-level=high`; git history check for committed secrets.
**Date:** 2026-07-25

---

## Summary

| # | Category | Result | Highest Severity |
|---|----------|--------|-------------------|
| A01 | Broken Access Control | Findings | Low |
| A02 | Cryptographic Failures | Findings | Low |
| A03 | Injection | Findings | Low |
| A04 | Insecure Design | Findings | **Medium** |
| A05 | Security Misconfiguration | Findings | **Medium** |
| A06 | Vulnerable and Outdated Components | Clean (advisory) | Info |
| A07 | Identification and Authentication Failures | Findings | Low |
| A08 | Software and Data Integrity Failures | Findings | Low |
| A09 | Security Logging and Monitoring Failures | Findings | Info |
| A10 | Server-Side Request Forgery (SSRF) | No findings | — |

No secrets are committed to git (`.env` is gitignored and absent from history — only `.env.example` is tracked), `npm audit --audit-level=high` reports 0 vulnerabilities, and there is no use of `dangerouslySetInnerHTML`, `eval`, or shell exec anywhere in the codebase. The chat UI renders all model/user text through React (auto-escaped) and a safe link-parsing helper, so no classic reflected/stored XSS was found.

---

## A01:2021 – Broken Access Control

**Finding: `/api/health` fails open when `HEALTHCHECK_TOKEN` is unset**
`app/api/health/route.ts:28-37`
```ts
function isAuthorized(req: NextRequest) {
  const token = readEnv(ENV.healthcheckToken);
  if (!token) return true;      // <-- no token configured = public endpoint
  ...
}
```
If the operator forgets to set `HEALTHCHECK_TOKEN` in production, the endpoint silently becomes public rather than silently becoming *inaccessible*. It exposes `process.env.NODE_ENV`, per-service latency, and raw error strings from Redis/OpenAI/Resend (see A05).

*Severity:* Low (documented behavior in `.env.example`, and the data exposed is limited).
*Recommendation:* Default to closed (deny) when the token is not configured, or explicitly document/alert on this at deploy time.

---

## A02:2021 – Cryptographic Failures

**Finding: Non-constant-time token comparison**
`app/api/health/route.ts:36`
```ts
return bearer === token || queryToken === token;
```
Plain `===` comparison of a bearer token is subject to timing side-channels. Impact is low here (low-value target, network jitter dominates), but it's the textbook anti-pattern.

*Recommendation:* Use `crypto.timingSafeEqual` on fixed-length buffers.

**Positive note:** the chat session ID (`sid`) is generated with `crypto.randomUUID()` (`app/api/chatbot/route.ts:30`) — cryptographically strong, appropriate for its purpose.

---

## A03:2021 – Injection

**Finding: Unsanitized user input in email subject line**
`app/api/contact/route.ts:79,108`
```ts
const name = clamp(String(payload.name ?? "").trim(), MAX_NAME);
...
subject: `Portfolio message from ${name}`,
```
`name` is length-clamped but not stripped of control characters (`\r`, `\n`). Resend's HTTP/JSON API makes classic SMTP header injection unlikely to be exploitable end-to-end, but the app has no defense-in-depth against a malformed/injected subject line if Resend's handling ever changes, and it's cheap to fix.

*Severity:* Low.
*Recommendation:* Strip `\r`/`\n` from `name` (and any other header-bound fields) before interpolating into `subject`.

**No findings:** no SQL/NoSQL query building from user input (Redis is accessed via typed SDK calls with app-controlled key prefixes, e.g. `rl:ip:${encodeURIComponent(ip)}`), no template/`eval` injection, and the profanity-regex builder only compiles server-owned wordlists, not user input.

---

## A04:2021 – Insecure Design

**Finding: In-memory rate limiter is ineffective on serverless deployments**
`app/api/contact/route.ts:20,37-50`
```ts
const buckets = new Map<string, { count: number; resetAt: number }>();
```
This rate limiter lives in process memory. On Vercel (or any serverless/multi-instance platform), each cold start / concurrent instance gets its own empty `Map`, so an attacker can trivially bypass the 5-requests/minute limit by triggering new instances (or simply hitting the app during natural horizontal scaling). Compare this with `app/api/chatbot/route.ts`, which correctly uses Redis-backed counters — the contact endpoint should use the same pattern.

*Severity:* Medium (enables spam/abuse of the Resend-backed contact form, and by extension your email sending quota).
*Recommendation:* Back the contact-form rate limiter with the same Upstash Redis instance already used for the chatbot.

**Finding: Rate limiting trusts the first `X-Forwarded-For` hop as the client IP**
`app/api/chatbot/route.ts:20-25`, `app/api/contact/route.ts:31-35`
```ts
function getIP(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  ...
}
```
`X-Forwarded-For` is a client-suppliable header. Unless the deployment platform is guaranteed to overwrite (not append to) it before the app sees it, an attacker can set an arbitrary value as the first entry and get a fresh IP-based rate-limit bucket on every request, fully bypassing the `IP_LIMIT` / contact-form throttle.

*Severity:* Medium — directly undermines the abuse controls that gate a paid OpenAI-backed endpoint.
*Recommendation:* On Vercel, prefer the platform-injected `x-vercel-forwarded-for` header (or `req.ip` conventions specific to the hosting platform) instead of the client-controllable `x-forwarded-for`, or explicitly document/verify that the edge proxy strips inbound `x-forwarded-for` before appending its own value.

---

## A05:2021 – Security Misconfiguration

**Finding: No security response headers configured anywhere**
Checked `next.config.ts` and `proxy.ts` (the only middleware) — neither sets `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`, or `Permissions-Policy`. `proxy.ts` only wraps `next-intl`'s locale middleware and its `matcher` doesn't even cover `/api/*`.

*Severity:* Medium — a missing CSP/X-Frame-Options is a standard, cheap-to-close gap that provides defense-in-depth against clickjacking and reduces XSS blast radius even though no active XSS was found.
*Recommendation:* Add a `headers()` block in `next.config.ts` (or a headers step in `proxy.ts`) setting at minimum `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (or `frame-ancestors 'none'` via CSP), `Referrer-Policy: strict-origin-when-cross-origin`, and `Strict-Transport-Security`.

**Finding: Verbose internal error detail returned to clients**
`app/api/chatbot/route.ts:63-76`
```ts
return NextResponse.json({
  error: "redis_unavailable",
  message: "Chatbot storage is temporarily unavailable. Check the Upstash Redis configuration and try again.",
  detail: message,   // raw error string from the Redis client
}, { status: 503 });
```
And `app/api/health/route.ts:69-75` returns raw `error.message` for each service check. Combined with the fail-open health-check auth (A01), this can leak internal infrastructure detail (timeouts, connection errors, occasionally hostnames) to unauthenticated callers.

*Severity:* Low-Medium.
*Recommendation:* Log full error detail server-side only; return a generic message to the client.

---

## A06:2021 – Vulnerable and Outdated Components

`npm audit --audit-level=high` → **0 vulnerabilities** at time of review, and CI (`dependency-audit` job in `.github/workflows/ci.yml`) runs this on every PR/push — good practice.

*Advisory (informational, not a vulnerability):* audit-on-CI only catches issues at PR time; consider enabling Dependabot/Renovate for proactive patch PRs between merges.

**Finding: Install scripts allowed for three packages**
`package.json`
```json
"allowScripts": {
  "@parcel/watcher@2.5.6": true,
  "@swc/core@1.15.11": true,
  "unrs-resolver@1.12.2": true
}
```
This opts specific packages back into running lifecycle/install scripts, which npm otherwise blocks by default as a supply-chain hardening measure. These are common, pinned-version build tooling dependencies (transitive to Next.js tooling) so risk is low, but it's worth periodically re-verifying these pins still point at the expected upstream packages.

*Severity:* Info/Low.

---

## A07:2021 – Identification and Authentication Failures

**Finding: Chat session cookie (`sid`) has no server-side identity binding**
`app/api/chatbot/route.ts:27-41`
The `sid` cookie is `httpOnly`, `sameSite: lax`, and `secure` in production — good baseline hygiene. However it is a bare random token with a 1-year `maxAge` and nothing else verifies it belongs to the presenting browser. Anyone who obtains another user's `sid` value (e.g., via a shared/leaked link, browser history sync, or an XSS elsewhere in the future) can replay it to read/append to that person's stored chat history and consume their remaining per-session quota.

*Severity:* Low (impact is limited to a low-sensitivity chatbot transcript and rate-limit budget, not account takeover — there's no authentication system in this app).
*Recommendation:* Acceptable for the current low-stakes use case; if the chat history ever contains anything sensitive, consider shortening `maxAge` and rotating the session periodically.

(See A02 for the health-check token comparison, also filed under authentication.)

---

## A08:2021 – Software and Data Integrity Failures

**Finding: Build pipeline injects production secrets into a public-repo CI build**
`.github/workflows/ci.yml` (build job) passes `RESEND_API_KEY`, `OPENAI_API_KEY`, `UPSTASH_REDIS_REST_*`, and `CONTACT_TO_EMAIL` as env vars to `npm run build`. This is standard for Next.js (env vars are needed at build time for route handlers), and none of these are `NEXT_PUBLIC_`-prefixed so they won't be inlined into the client bundle. No action needed, but flagging as something to keep an eye on if new env vars are ever added with a `NEXT_PUBLIC_` prefix by mistake — that would leak the secret into the shipped JS bundle.

*Severity:* Info (no active issue found; process note only).

See A06 for the `allowScripts` supply-chain note, which also falls under this category (trusting third-party install scripts).

---

## A09:2021 – Security Logging and Monitoring Failures

**Finding: Errors are logged with `console.error` only, no structured/alerting layer**
`app/api/chatbot/route.ts:65,217`. This is adequate for a small personal portfolio site, but there is no visibility into patterns like repeated rate-limit violations from a single spoofed-IP pattern (related to the A04 finding above), repeated moderation-guardrail trips, or repeated health-check auth failures.

*Severity:* Info — proportionate to the size/criticality of the project. Worth revisiting if traffic or abuse increases.

---

## A10:2021 – Server-Side Request Forgery (SSRF)

No findings. The only server-side outbound `fetch` calls are to hardcoded, trusted hosts (`api.openai.com`, `api.resend.com` in `app/api/health/route.ts`) — no user-supplied URLs are ever fetched server-side.

---

## Prioritized Recommendations

1. **Move the contact-form rate limiter to Redis** (shared state) — closes the most concrete abuse vector (A04).
2. **Stop trusting the raw first hop of `X-Forwarded-For`** for rate-limit keys on both API routes (A04).
3. **Add baseline security headers** (CSP, X-Frame-Options, X-Content-Type-Options, HSTS) via `next.config.ts` (A05).
4. **Fail closed, not open, on `/api/health` when `HEALTHCHECK_TOKEN` is unset**, and stop returning raw error strings to unauthenticated callers (A01, A05).
5. Minor hardening: constant-time token comparison (A02/A07), strip CR/LF from the contact-form `name` before it reaches the email subject (A03).

Everything else reviewed — dependency audit, secret handling, XSS surfaces, SSRF, injection into Redis keys — came back clean.
