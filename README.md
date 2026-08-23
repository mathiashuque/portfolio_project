# Mathias Huque — Portfolio

[![Production health checks](https://github.com/mathiashuque/portfolio_project/actions/workflows/production-healthcheck.yml/badge.svg)](https://github.com/mathiashuque/portfolio_project/actions/workflows/production-healthcheck.yml)

A bilingual portfolio showcasing my work as a full-stack developer. It combines a responsive, animated interface with an AI portfolio assistant, a production-ready contact flow, and automated service health checks.

**[View the live site](https://www.mathiashuque.dev/)**

## Highlights

- English and Spanish experiences with locale-aware routing
- Accessible responsive UI, dark mode, and reduced-motion support
- OpenAI-powered assistant grounded in portfolio content
- Redis-backed rate limiting and short-term chat history
- Resend contact form with validation, bot protection, and generic error responses
- SEO metadata, sitemap, Open Graph assets, and protected health checks

## Built with

Next.js 16, React 19, TypeScript, Tailwind CSS, Motion, next-intl, OpenAI Agents SDK, Upstash Redis, Resend, Vitest, and Vercel.

## Run locally

Requirements: Node.js LTS and npm.

```bash
git clone https://github.com/mathiashuque/portfolio_project.git
cd portfolio_project
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The interface works without third-party credentials; chatbot, contact, and health-check endpoints require the corresponding values documented in `.env.example`.

## Quality checks

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

## Architecture

```text
app/          Routes, layouts, API endpoints, and global styles
components/   Feature-oriented React components
messages/     English and Spanish translations
lib/          Shared environment, site, and security utilities
public/       Project media, icons, social assets, and résumés
styles/       Theme tokens
```

The app uses the Next.js App Router. Requests are localized through `next-intl`; server-only API routes integrate OpenAI, Upstash Redis, and Resend. Tests cover the chatbot guardrails and shared server-security behavior.

## License

This is proprietary, source-available software. You may review the repository,
but reuse, redistribution, modification, and deployment are not permitted. See
[LICENSE](LICENSE) for the full terms.
