# Portfolio - mathiashuque.dev

![Portfolio preview](public/og/default.png)

Personal portfolio website for **Mathias Huque**.

Live site: [https://www.mathiashuque.dev/](https://www.mathiashuque.dev/)

## Quick Memory Refresh

This is a **Next.js App Router** portfolio with:

- A one-page landing experience: home, about, experience, projects, stack, contact, and footer.
- English and Spanish routes powered by `next-intl`.
- A floating chatbot that answers questions about the portfolio using OpenAI Agents.
- A contact form that sends email through Resend.
- Light/dark theme styling through CSS variables and Tailwind utility classes.
- SEO assets: metadata, Open Graph image, sitemap, robots config, favicon, and CV PDFs.

If you come back to this project after months away, start here:

1. Run `npm install`.
2. Create or verify `.env.local`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.
5. Edit content mostly in `messages/`, `components/**/data.ts`, and `app/api/chatbot/portfolioContext.ts`.

## Tech Stack

- **Next.js 16** with the App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **next-intl** for localization
- **Motion / Framer Motion** for animations
- **OpenAI Agents SDK** for the chatbot
- **Upstash Redis** for chatbot rate limiting and short session history
- **Resend** for contact form email delivery
- **Vercel** for deployment

## Requirements

- Node.js LTS
- npm
- API keys for production-like chatbot/contact behavior:
  - OpenAI
  - Upstash Redis
  - Resend

This repo has a `package-lock.json`, so prefer npm unless you intentionally migrate package managers.

## Setup

Install dependencies:

```bash
npm install
```

Create `.env.local` in the project root. Use `.env.example` as the template:

```env
# Contact form
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_email@example.com
CONTACT_FROM_EMAIL=Portfolio <no-reply@mathiashuque.dev>

# Chatbot
OPENAI_API_KEY=your_openai_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token

# Optional health endpoint protection
HEALTHCHECK_TOKEN=choose_a_private_token
```

Notes:

- `CONTACT_FROM_EMAIL` is optional in code, but should be set in production to a Resend-verified sender/domain.
- `HEALTHCHECK_TOKEN` is optional. If set, `/api/health` requires `Authorization: Bearer <token>` or `?token=<token>`.
- Never commit `.env.local` or real secrets.
- The chatbot API imports `Redis.fromEnv()`, so missing Upstash variables can break chatbot requests even if the page itself loads.

## Common Commands

```bash
# Start local development server
npm run dev

# TypeScript check
npm run typecheck

# ESLint
npm run lint

# Production build
npm run build

# Run production build locally
npm run start

# Deploy to Vercel production through CLI
npm run deploy
```

Local URL:

```txt
http://localhost:3000
```

## Project Structure

```txt
.
|-- app/
|   |-- [locale]/
|   |   |-- layout.tsx       # Locale layout, metadata, message loading
|   |   `-- page.tsx         # Renders the main App component
|   |-- api/
|   |   |-- chatbot/         # Chatbot endpoint, OpenAI Agent, Redis history/rate limits
|   |   `-- contact/         # Contact form email endpoint
|   |-- App.tsx              # Main one-page section composition
|   |-- globals.css          # Tailwind import, global CSS, marquee/chat scrollbar
|   |-- robots.ts            # robots.txt route
|   `-- sitemap.ts           # sitemap.xml route
|-- components/
|   |-- about/               # About section
|   |-- chat/                # Floating chatbot UI
|   |-- contact/             # Contact form and links
|   |-- experience/          # Experience timeline
|   |-- footer/              # Footer
|   |-- home/                # Hero/home section
|   |-- navbar/              # Navigation, mobile menu, language/theme controls
|   |-- projects/            # Project section and project data
|   `-- Stack/               # Tech stack marquee/icons
|-- i18n/
|   `-- request.ts           # next-intl request config
|-- lib/
|   |-- env.ts               # Environment variable names/read helpers
|   `-- site.ts              # Site URL, metadata, and locale constants
|-- messages/
|   |-- en.json              # English UI copy
|   `-- es.json              # Spanish UI copy
|-- public/
|   |-- Mathias_Huque_CV_en.pdf
|   |-- Mathias_Huque_CV_es.pdf
|   |-- og/default.png
|   |-- projects/
|   `-- logos/
|-- styles/
|   `-- theme.css            # Light/dark CSS variables
|-- proxy.ts                 # next-intl locale middleware
|-- next.config.ts           # next-intl plugin wiring
|-- tailwind.config.js
|-- .env.example             # Local env template
`-- package.json
```

## Runtime Flow

The page route is locale-based:

- `/` is handled by `proxy.ts` and defaults to English.
- `/en` renders the English site.
- `/es` renders the Spanish site.

Main render path:

```txt
app/[locale]/page.tsx
  -> app/App.tsx
    -> Navbar
    -> Home
    -> About
    -> Experience
    -> Projects
    -> Stack
    -> Contact
    -> Footer
    -> ChatWidget
```

Localization path:

```txt
proxy.ts
  -> i18n/request.ts
  -> messages/en.json or messages/es.json
  -> next-intl hooks/components inside sections
```

## Where To Edit Common Things

| Goal | Main files |
| --- | --- |
| Change homepage/hero text | `messages/en.json`, `messages/es.json`, `components/home/*` |
| Change about content | `messages/en.json`, `messages/es.json`, `components/about/*` |
| Change experience items | `components/experience/getExperiences.ts`, `messages/*.json` |
| Change projects | `components/projects/data.ts`, `messages/*.json`, `public/projects/*` |
| Change tech stack | `components/Stack/tech/stackData.ts`, `public/logos/*` |
| Change navbar links | `components/navbar/constants.ts` |
| Change contact links/form UI | `components/contact/*` |
| Change contact email behavior | `app/api/contact/route.ts` |
| Change chatbot UI | `components/chat/*` |
| Change chatbot knowledge | `app/api/chatbot/portfolioContext.ts` |
| Change chatbot limits/history | `app/api/chatbot/route.ts`, `app/api/chatbot/history.ts` |
| Change health checks | `app/api/health/route.ts` |
| Change shared env names | `lib/env.ts`, `.env.example`, README env sections |
| Change shared site URL/locales | `lib/site.ts`, `proxy.ts` matcher if locales change |
| Change profanity lists | `app/api/chatbot/profanity/en.txt`, `app/api/chatbot/profanity/es.txt` |
| Change site metadata | `app/[locale]/layout.tsx` |
| Change colors/theme tokens | `styles/theme.css`, `tailwind.config.js` |
| Change global animations/scrollbar | `app/globals.css` |
| Change CV files | `public/Mathias_Huque_CV_en.pdf`, `public/Mathias_Huque_CV_es.pdf` |

## Chatbot Notes

The chatbot lives in two parts:

- UI: `components/chat/*`
- API/agent: `app/api/chatbot/*`

Important behavior:

- The endpoint accepts `message` or `input`.
- Max input length is currently 100 characters.
- Session rate limit is 10 messages per session.
- IP rate limit is 30 messages per hour.
- Redis stores the last 3 Q&A pairs for short session memory.
- If Redis is unavailable, the chatbot returns `503` with `error: "redis_unavailable"` instead of silently continuing.
- The agent uses `gpt-5-nano` with low reasoning effort.
- It uses a deterministic profanity blocklist plus OpenAI moderation.
- It should answer in the same language as the user, using only portfolio context for personal questions.

If the chatbot gives outdated or incomplete answers, update:

```txt
app/api/chatbot/portfolioContext.ts
```

If the chatbot UI breaks, inspect:

```txt
components/chat/ChatWidget.tsx
components/chat/ChatPanel.tsx
components/chat/ChatMessages.tsx
components/chat/ChatInputBar.tsx
```

## Contact Form Notes

The contact endpoint is:

```txt
app/api/contact/route.ts
```

It includes:

- Required `name`, `email`, and `message`.
- `website` honeypot field for bots.
- Basic in-memory burst protection: 5 requests per IP per minute.
- Resend email delivery.
- Generic error responses to avoid leaking configuration state.

Production needs these Vercel environment variables:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

## Health Check Notes

The health endpoint is:

```txt
GET /api/health
```

It checks:

- Upstash Redis using `PING`.
- OpenAI by calling the models endpoint with `OPENAI_API_KEY`.
- Resend by calling the domains endpoint with `RESEND_API_KEY`.

It does not send email, create Redis keys, or run a chatbot completion.

Local check:

```bash
curl http://localhost:3000/api/health
```

Check one service:

```bash
curl "http://localhost:3000/api/health?service=redis"
curl "http://localhost:3000/api/health?service=openai"
curl "http://localhost:3000/api/health?service=resend"
```

Production check with a token:

```bash
curl -H "Authorization: Bearer $HEALTHCHECK_TOKEN" \
  https://www.mathiashuque.dev/api/health
```

Expected healthy response shape:

```json
{
  "ok": true,
  "checkedAt": "2026-04-28T00:00:00.000Z",
  "environment": "production",
  "services": {
    "redis": { "status": "ok", "latencyMs": 42 },
    "openai": { "status": "ok", "latencyMs": 220 },
    "resend": { "status": "ok", "latencyMs": 180 }
  }
}
```

If any service is missing or fails, the endpoint returns HTTP `503` with that service marked as `missing_env` or `error`.

## Styling Notes

Theme colors are CSS variables in:

```txt
styles/theme.css
```

Those variables are consumed through Tailwind classes such as `bg-bg`, `text-text`, `bg-panel`, and accent utilities configured in `tailwind.config.js`.

Global styles and animations are in:

```txt
app/globals.css
```

## Localization Notes

Supported locales:

```txt
en
es
```

Locale routing is configured in:

```txt
proxy.ts
i18n/request.ts
app/[locale]/layout.tsx
```

When adding or renaming UI copy, keep both files in sync:

```txt
messages/en.json
messages/es.json
```

## SEO And Public Assets

- Metadata is in `app/[locale]/layout.tsx`.
- Sitemap is generated by `app/sitemap.ts`.
- Robots config is generated by `app/robots.ts`.
- Open Graph image is `public/og/default.png`.
- Project screenshots live in `public/projects/`.
- Tech logos live in `public/logos/`.
- CV PDFs live in `public/`.

Current canonical base URL in code:

```txt
https://mathiashuque.dev
```

The canonical URL is defined in:

```txt
lib/site.ts
```

Live README URL uses:

```txt
https://www.mathiashuque.dev/
```

If you standardize one domain, update metadata, sitemap, robots, Vercel domains, and README together.

## Deployment

This project is intended for Vercel.

Before deploying:

```bash
npm run lint
npm run typecheck
npm run build
```

Deploy through Vercel Git integration or:

```bash
npm run deploy
```

Make sure production environment variables are set in Vercel:

```txt
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
OPENAI_API_KEY
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
HEALTHCHECK_TOKEN
```

## Troubleshooting

### The page loads but the chatbot fails

Check:

- `OPENAI_API_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- Browser/network response from `/api/chatbot`
- Server logs for `Chatbot error`

### Contact form returns "Service not configured"

Check:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- Resend sender/domain verification

### Locale route returns 404

Only `en` and `es` are supported. Check:

- `proxy.ts`
- `i18n/request.ts`
- `app/[locale]/layout.tsx`
- `messages/<locale>.json`

### Styling looks wrong after editing colors

Check:

- `styles/theme.css` for CSS variable values.
- `tailwind.config.js` for variable-backed color names.
- Whether the `.dark` class is being toggled as expected.

### Build fails after changing translated copy

Check both message files for missing keys or invalid JSON:

```txt
messages/en.json
messages/es.json
```

## License

This project is source-available for educational and personal review only.

See [LICENSE](LICENSE) for the full terms.
