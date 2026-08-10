# Análisis y propuestas de mejora — Portfolio (mathiashuque.dev)

Fecha del análisis: 2026-08-10.

Este documento resume el estado actual del proyecto y una lista priorizada de mejoras concretas, con archivos y líneas de referencia. No es una crítica del proyecto: la base ya tiene buenas prácticas (headers de seguridad, rate limiting con Redis, health checks, guardrails de moderación en el chatbot, tests para las partes críticas de backend). Las mejoras abajo son para llevarlo del "muy bueno" al "pulido".

## Resumen de fortalezas actuales

- CSP y security headers configurados en [next.config.ts](../next.config.ts) (HSTS, X-Frame-Options, Permissions-Policy, etc.).
- Rate limiting con Redis tanto en `/api/contact` como en `/api/chatbot`, con timeouts explícitos y fail-closed cuando Redis no responde.
- `/api/health` con token, chequeo de Redis/OpenAI/Resend y workflow de GitHub Actions post-deploy.
- Chatbot con guardrails de input/output moderation + blocklist determinístico de profanidad, y honeypot + validación server-side en el formulario de contacto.
- CI con audit de dependencias, lint, typecheck y build en cada PR.
- `getClientIp` distingue correctamente entre Vercel (`x-vercel-forwarded-for`) y desarrollo local, evitando spoofing de IP en producción.

## Prioridad alta

### 1. Seis dependencias sin usar en `package.json`

`franc-all`, `compromise`, `fuse.js`, `handlebars`, `tinyld` y `translate` están en `dependencies` pero no aparecen importadas en ningún archivo `.ts`/`.tsx` del repo (verificado con grep sobre `app/`, `components/`, `lib/`, `i18n/`).

**Por qué importa:** aumentan el tamaño de `node_modules`, el ruido en `npm audit`, la superficie de la cadena de suministro y el tiempo de instalación/CI, sin aportar nada. `handlebars`, en particular, ha tenido CVEs de RCE por prototype pollution en el pasado — mantenerlo sin usarlo es riesgo puro sin beneficio.

**Acción:** confirmar que no se usan (¿tal vez planeadas para una búsqueda difusa de proyectos o detección de idioma del chatbot que nunca se implementó?) y correr `npm uninstall franc-all compromise fuse.js handlebars tinyld translate`.

### 2. Imágenes de proyectos sin optimizar en origen

`public/projects/algorithm-visualizer.png` (2.3 MB), `interview-forge.png` (1.7 MB) y `portfolio.png` (2.1 MB) son PNG pesados para capturas de pantalla de UI. `ml-playground.png` (120 KB) muestra que sí es posible bajar el peso ~15-20x.

**Por qué importa:** Next/Image las optimiza al servir, pero igual parte de un origen pesado (más tiempo de build/transformación, más costo en Vercel Image Optimization, peor Core Web Vitals en la primera visita antes de que el CDN cachee la versión optimizada).

**Acción:** recomprimir a WebP/AVIF con `sharp-cli`/`squoosh` apuntando a <300 KB, o generar las capturas ya optimizadas.

### 3. Mensajes de rate-limit del chat inconsistentes con el idioma

En [app/api/chatbot/route.ts:148](../app/api/chatbot/route.ts#L148) y línea 166, los mensajes de límite de tasa están hardcodeados en español ("Demasiadas consultas...", "Límite: 10 preguntas..."), pero en [components/chat/ChatWidget.tsx:130-131](../components/chat/ChatWidget.tsx#L130-L131) el frontend **ignora completamente** ese `message` del backend cuando el status es 429 y muestra siempre un texto fijo en inglés ("You've reached the question limit for now...").

**Resultado real:** un usuario navegando en `/es` que llega al límite de mensajes ve un aviso en inglés, y el mensaje en español que el backend sí genera nunca se usa (código muerto). Esto rompe la promesa del README de que "el chatbot responde en el mismo idioma que el usuario".

**Acción:** usar `useTranslations`/`useLocale` en `ChatWidget.tsx` para el mensaje de 429 (o directamente reenviar el `data.message` del backend, que ya viaja en la respuesta), y generar ese mensaje en el idioma correcto en el backend en vez de fijarlo en español.

### 4. Metadata y sitemap no reflejan que el sitio es bilingüe

- [app/[locale]/layout.tsx:18](../app/%5Blocale%5D/layout.tsx#L18): el comentario mismo lo admite — "Keep metadata for now in English; localize later". `openGraph.locale` está fijo en `"en_US"` incluso al visitar `/es`, y no hay `alternates.languages` (hreflang) apuntando a las versiones `en`/`es` de cada página.
- [app/sitemap.ts](../app/sitemap.ts) solo lista `/` y anclas (`/#about`, `/#projects`, etc.) de la raíz, sin URLs por locale (`/en`, `/es`) ni bloques `alternates` con hreflang recíproco.

**Por qué importa:** Google no puede saber que `/en` y `/es` son versiones del mismo contenido en otro idioma, lo que diluye el SEO de la versión en español y puede generar contenido duplicado percibido.

**Acción:** mover `metadata` a `generateMetadata(params)` en el layout para setear `openGraph.locale`, `alternates.canonical` y `alternates.languages: { en: '/en', es: '/es' }` según el locale actual; expandir `sitemap.ts` para emitir entradas por locale con `alternates.languages`.

## Prioridad media

### 5. Flash de tema (FOUC) en la primera carga

En [components/navbar/Navbar.tsx:12-19](../components/navbar/Navbar.tsx#L12-L19), `getInitialDark()` devuelve `true` durante el render en servidor (no hay `window`), y recién en un `useLayoutEffect` posterior a la hidratación se lee `localStorage` y se aplica la clase `.dark` real. Un usuario con preferencia de tema claro guardada verá un parpadeo oscuro→claro en cada carga.

**Acción:** el patrón estándar es un `<script>` inline (sin `unsafe-inline` extra si ya está permitido en CSP, o con nonce) en el `<head>`, ejecutado antes del primer paint, que lee `localStorage`/`prefers-color-scheme` y aplica la clase `dark` al `<html>` de forma síncrona — así SSR y primer render de cliente ya coinciden.

### 6. Textos de accesibilidad no localizados

- `aria-label="Toggle menu"` en [components/navbar/Navbar.tsx:176](../components/navbar/Navbar.tsx#L176) está fijo en inglés aunque el sitio esté en `/es`.
- `aria-label="Chat widget"` en `components/chat/ChatPanel.tsx:32` — mismo caso.
- `LanguageSwitcher.tsx:37` arma el label con template string en inglés ("Switch language to ES/EN"), también sin traducción.

**Acción:** mover estos labels a `messages/en.json` / `messages/es.json` y consumirlos con `useTranslations`, igual que ya se hace en el resto de la UI.

### 7. `prefers-reduced-motion` solo cubre el marquee

[app/globals.css:41-45](../app/globals.css#L41-L45) desactiva la animación del marquee bajo `prefers-reduced-motion: reduce`, pero las animaciones de Framer/Motion (hero, `MobileMenu` con springs, `DragBadge`, transiciones de `TypingParagraph`) no respetan esa preferencia. Para usuarios con vestibular disorders o que simplemente prefieren menos movimiento, gran parte de la página sigue animando.

**Acción:** usar el hook `useReducedMotion` de `motion/react` (o `MotionConfig reducedMotion="user"` envolviendo `App.tsx`) para que todas las animaciones lo respeten de forma centralizada.

### 8. CSP permite `script-src 'unsafe-inline'` en producción

[next.config.ts:9](../next.config.ts#L9) incluye `'unsafe-inline'` en `script-src` siempre (no solo en dev), lo que anula buena parte del valor del CSP contra XSS — cualquier inyección de `<script>` inline se ejecutaría igual.

**Acción:** evaluar migrar a CSP basada en nonces (Next.js App Router lo soporta vía middleware que genera un nonce por request y lo inyecta en `<script nonce>` y en el header `Content-Security-Policy`). Es más trabajo, pero cierra el hueco más grande del CSP actual.

### 9. Sin datos estructurados (JSON-LD) ni manifest/PWA

- No hay `application/ld+json` con schema `Person` (nombre, rol, sameAs a GitHub/LinkedIn) — barato de agregar y mejora cómo Google muestra el resultado (rich snippet).
- No hay `site.webmanifest`/`manifest.json` ni iconos `apple-touch-icon` — solo `favicon.ico`. Esto afecta "Add to Home Screen" en móvil y quita puntos en auditorías Lighthouse/PWA.

**Acción:** agregar un componente `<script type="application/ld+json">` con schema.org `Person` en el layout, y un `app/manifest.ts` (soportado nativamente por Next) con nombre, íconos y `theme_color`.

### 10. Sin tests de componentes ni E2E

Los tests actuales (`Agent.test.ts`, `blockedReply.test.ts`, `history.test.ts`, `serverSecurity.test.ts`) cubren bien la lógica de backend/seguridad, pero no hay ningún test de UI: ni render de componentes (React Testing Library) ni flujo end-to-end (Playwright) que verifique, por ejemplo, que el formulario de contacto muestra error con email inválido, o que el chatbot widget abre/cierra y respeta el límite de caracteres.

**Acción:** al menos un smoke test E2E con Playwright cubriendo: cambio de idioma, envío del formulario de contacto (mockeando `/api/contact`), y apertura del chat — se puede correr en CI como job aparte sin bloquear el build.

## Prioridad baja

### 11. `sitemap.ts` usa anclas (`/#about`) como URLs indexables

Las entradas `/#about`, `/#projects`, etc. en [app/sitemap.ts](../app/sitemap.ts) no son rutas reales distintas — son la misma página con distinto fragmento, y los motores de búsqueda generalmente ignoran el fragmento para indexación. Tienen valor casi nulo en el sitemap tal como están.

**Acción:** si el objetivo es que aparezcan sitelinks en Google, es mejor confiar en los `id`/`aria-label` semánticos de cada `<section>` y dejar el sitemap solo con las URLs reales (`/`, `/en`, `/es`), o usar datos estructurados de tipo `SiteNavigationElement`.

### 12. `npm run deploy` hace push directo a producción sin gate

[package.json:10](../package.json#L10): `"deploy": "npx vercel --prod"` no corre lint/typecheck/test antes. El README sí documenta correr esos comandos manualmente antes de deployar, pero nada lo fuerza.

**Acción:** encadenar `npm test && npm run lint && npm run typecheck && npm run build && vercel --prod`, o simplemente confiar en el pipeline de CI de Vercel/GitHub Actions y eliminar el script para evitar un deploy manual que se salte los checks.

### 13. Transición global de CSS en `*`

[app/globals.css:8-13](../app/globals.css#L8-L13) aplica `transition-property` a **todos** los elementos del DOM. Es cómodo para el toggle de tema, pero es más costoso de lo necesario (el navegador evalúa la transición en cada elemento) y puede introducir transiciones no deseadas en elementos que no lo necesitan (inputs, íconos SVG dentro de animaciones de Framer Motion).

**Acción:** acotar el selector a los elementos que realmente cambian con el tema (`body`, `.bg-panel`, `.border`, etc.) en vez de `*`, o usar una clase utilitaria explícita.

### 14. Sin analítica/monitoreo de errores en cliente

No hay ninguna herramienta de analítica (aunque sea privacy-friendly como Plausible/Umami) ni captura de errores de cliente (Sentry u otro). Para un portfolio esto es opcional, pero ayuda a saber si el chatbot o el formulario están fallando silenciosamente para visitantes reales, y qué proyectos generan más clics.

**Acción:** opcional — considerar Vercel Analytics (gratis en el plan usado) como primer paso de bajo esfuerzo.

## Tabla resumen

| # | Mejora | Impacto | Esfuerzo |
|---|---|---|---|
| 1 | Quitar 6 dependencias sin usar | Seguridad/mantenibilidad | Bajo |
| 2 | Optimizar imágenes de proyectos | Performance | Bajo |
| 3 | Arreglar mensaje de rate-limit del chat según idioma | Corrección/i18n | Bajo |
| 4 | hreflang + sitemap por locale | SEO | Medio |
| 5 | Eliminar flash de tema (FOUC) | UX | Bajo |
| 6 | Localizar `aria-label`s | Accesibilidad/i18n | Bajo |
| 7 | Respetar `prefers-reduced-motion` en Framer Motion | Accesibilidad | Bajo |
| 8 | CSP con nonces en vez de `unsafe-inline` | Seguridad | Alto |
| 9 | JSON-LD `Person` + manifest/PWA | SEO/PWA | Medio |
| 10 | Tests de componentes/E2E | Calidad | Medio |
| 11 | Revisar anclas en sitemap | SEO (menor) | Bajo |
| 12 | Gate de checks antes de `npm run deploy` | Proceso | Bajo |
| 13 | Acotar transición CSS global | Performance (menor) | Bajo |
| 14 | Analítica/monitoreo de errores | Observabilidad | Bajo (opcional) |

Recomendación de orden de trabajo: empezar por 1, 2 y 3 (rápidos y de impacto directo en usuarios reales), seguir con 4 y 6 (SEO/i18n, coherentes con que el sitio ya está bilingüe), y dejar 8 y 10 para cuando haya más tiempo disponible por ser los de mayor esfuerzo.
