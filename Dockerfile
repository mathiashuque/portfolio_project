# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────────────────────
# 1) deps — dependencias completas. El build las necesita todas (typescript,
#    tailwind, etc.), así que no vale la pena separar producción aquí.
# ─────────────────────────────────────────────────────────────────────────────
FROM node:26-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ─────────────────────────────────────────────────────────────────────────────
# 2) builder — compila Next. Con `output: "standalone"` el resultado incluye su
#    propio node_modules mínimo, así que la imagen final no lleva el árbol entero.
# ─────────────────────────────────────────────────────────────────────────────
FROM node:26-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# 3) runner — solo lo necesario para servir. Las variables de entorno se pasan
#    en runtime (`--env-file` / `env_file`), nunca quedan dentro de la imagen.
# ─────────────────────────────────────────────────────────────────────────────
FROM node:26-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN useradd --system --uid 1001 nextjs

# `public/` y `.next/static` no los copia el standalone: se copian a mano.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/en').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
