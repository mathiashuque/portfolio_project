# Portfolio — mathiashuque.dev

![alt text](public/og-image-2.png)

Personal portfolio website for **Mathias Huque**.

Live: [https://www.mathiashuque.dev/](https://www.mathiashuque.dev/)

---

## Overview

A single-page portfolio featuring sections for **About**, **Experience**, **Projects**, **Stack**, and **Contact**.

Includes:

* Theme toggle (light/dark)
* CV access
* Animated UI elements using Motion
* Contact section with direct email + social links

---

## Tech Stack

* **Next.js 16** (App Router)
* **React 19**
* **TypeScript**
* **Tailwind CSS v4** (+ `tailwindcss-animated`)
* **Motion / Framer Motion**
* **Lucide React / React Icons**
* **Resend** (email handling)

---

## Getting Started

### Prerequisites

* Node.js (LTS recommended)
* npm (or pnpm/yarn/bun)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Typecheck

```bash
npm run typecheck
```

### Lint

```bash
npm run lint
```

### Production Build

```bash
npm run build
npm run start
```

---

## Deployment

This project is deployed using **Vercel**.

Deploy via CLI:

```bash
npm run deploy
```

Or connect the repository directly in Vercel and use the default Next.js build configuration.

---

## Environment Variables

Create a `.env.local` file in the project root and define the following variables:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_email@example.com
OPENAI_API_KEY=your_openai_api_key
CHATBOT_API_KEY=your_internal_chatbot_api_key
NEXT_PUBLIC_CHATBOT_API_KEY=your_public_chatbot_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

> ⚠️ Never commit real API keys or tokens to your repository. Always use environment variables and keep sensitive credentials private.

Ensure these variables are also configured in your Vercel project settings for production deployments.

---

## Project Structure (Typical)

```txt
.
├─ public/            # Static assets
├─ src/
│  ├─ app/            # App Router pages and layout
│  ├─ components/     # Reusable UI components
│  ├─ lib/            # Utilities and helpers
│  └─ styles/         # Global styles
├─ package.json
└─ README.md
```

---

## License

Choose one:

* MIT License (recommended for open portfolio code)
* Or "All rights reserved" if you prefer restricted usage
