# Add SILO as the featured portfolio project

## Mission

Implement SILO in the existing Projects section as the first and clearly featured project in both English and Spanish. Preserve the portfolio's current visual language and one-page structure. SILO must communicate that it is Mathias Huque's substantial, in-progress Systems Engineering capstone with SONDA Uruguay, while working correctly without a public URL, source repository, or fake interactive affordance.

## Read first

- `README.md`
- `package.json`
- `components/projects/types.ts`
- `components/projects/data.ts`
- `components/projects/ProjectsSection.tsx`
- `components/projects/ProjectGrid.tsx`
- `components/projects/ProjectTile.tsx`
- `components/projects/ProjectsHeader.tsx`
- `messages/en.json`
- `messages/es.json`
- `styles/theme.css`
- `app/globals.css`
- `app/api/chatbot/portfolioContext.ts`
- `app/[locale]/layout.tsx`

There is currently no `AGENTS.md` in the repository. If one is added before implementation, read the root file and any applicable nested files before editing. Treat the listed files and the current worktree as the source of truth, and preserve unrelated changes. In particular, do not overwrite or revert the existing modified CV PDFs.

## Current state

- The localized one-page site serves English at `/en` and Spanish at `/es` through `next-intl`; project descriptions and the shared `view` CTA live under `Projects` in `messages/en.json` and `messages/es.json`.
- `components/projects/data.ts` defines six projects. `components/projects/types.ts` currently requires every project to have a `link`, and `ProjectTile.tsx` always renders the entire card as an `<a>` plus a localized “View/Ver” CTA. This cannot represent SILO accurately because SILO has no public destination.
- `ProjectGrid.tsx` renders a one-column grid below `sm` and three equal columns from `sm` upward. Every wrapper and tile is fixed to a 4:3 aspect ratio. There is no featured-project model or layout.
- Cards use `next/image`, rounded borders, theme tokens, a restrained hover lift/zoom, and a bottom gradient overlay. The section already inherits light/dark colors from `styles/theme.css` and global reduced-motion handling from the app's `MotionConfig`.
- Existing assets are 4:3 project screenshots under `public/projects/`, mostly 1920×1440 WebP files. No SILO screenshot, mockup, or other SILO asset exists in the repository as of 2026-08-22.
- `app/api/chatbot/portfolioContext.ts` manually enumerates portfolio projects and must be kept consistent with the visible project list.
- Site metadata and JSON-LD in `app/[locale]/layout.tsx` describe the person/profile generally and do not enumerate individual projects, so this feature does not require metadata or structured-data changes.

## Decisions and required behavior

1. Add SILO as the first entry in `PROJECTS`. Extend the project model with the smallest explicit fields needed to represent a featured project, optional link, localized supporting metadata, and meaningful image alt text. Do not infer clickability from a placeholder URL.
2. Render SILO as the sole featured item. On desktop/laptop, give it more hierarchy than ordinary tiles—prefer spanning two columns in the existing three-column grid and giving its copy more room while staying aligned to the same grid, radii, borders, colors, shadow treatment, and restrained motion. On mobile, it must be first, one column wide, and naturally sized without horizontal overflow or an excessively tall wall of text. Tablet behavior should remain coherent rather than forcing three cramped columns.
3. A project with a real link must remain an accessible anchor with the existing hover/focus behavior and localized CTA. A project without a link must render as a non-interactive semantic container: no `<a>`, empty `href`, `#`, `javascript:void(0)`, disabled button/icon, fake route, CTA, pointer cursor, link focus ring, or link-only hover cue. Preserve the behavior and destinations of all six existing projects; do not remove them or rewrite their copy.
4. Keep SILO's visible copy concise. Use the following facts, adapting line breaks and field placement to the established component rather than creating a case-study layout:
   - Display title: `SILO` with `Integrated Bidding & Opportunity Management Platform` as compact secondary English text where space allows. In Spanish, use `Sistema Integral de Licitaciones y Oportunidades` as the secondary text. Do not turn the expanded name into an oversized title.
   - Status/context label: English `Capstone Project · In Development`; Spanish `Proyecto de grado · En desarrollo`. A separate subtle `Featured/Destacado` label is allowed only if it improves hierarchy without badge clutter.
   - English description: `A full-stack platform designed to centralize SONDA's end-to-end bidding process, improve decision traceability, and make historical knowledge easier to reuse. Developed as my Systems Engineering capstone with SONDA Uruguay, from stakeholder discovery and AS IS analysis through backlog definition, prototype validation, and C4 architecture design.`
   - Spanish description: `Una plataforma full-stack diseñada para centralizar el ciclo completo de licitaciones de SONDA, mejorar la trazabilidad de decisiones y facilitar la reutilización del conocimiento histórico. Desarrollada como mi proyecto de grado de Ingeniería en Sistemas con SONDA Uruguay, desde el discovery con referentes y el análisis AS IS hasta la definición del backlog, la validación del prototipo y el diseño de arquitectura C4.`
   - Technology tags: `TypeScript`, `Next.js`, `NestJS`, and `PostgreSQL`. Add `Docker` only if five tags remain visually clean at all supported widths. Do not present tags as links.
5. Keep English and Spanish semantically equivalent and use the existing `next-intl` message architecture. Do not hard-code locale-dependent SILO copy in React components or duplicate entire project data arrays per locale.
6. Use a real SILO interface/prototype screenshot if one is present at implementation time. The canonical requested path is `public/projects/silo.webp`, exposed to `next/image` as `/projects/silo.webp`; prefer a 4:3 WebP asset consistent with the existing 1920×1440 screenshots and keep it reasonably compressed. Use localized, meaningful alt text equivalent to `SILO bidding and opportunity management platform interface` / `Interfaz de la plataforma de gestión de licitaciones y oportunidades SILO`.
7. If `public/projects/silo.webp` is still absent, do not fabricate a dashboard, copy an unrelated image, add stock imagery, or commit a generated placeholder. The implementation must not reference a missing file at runtime. Make the featured, non-interactive card render cleanly without an image using the existing panel/theme treatment, and report the exact asset path to the user. Structure the model/component so adding the file and its image value later is a small data-only change. The no-image state is a temporary content fallback, not a fake clickable placeholder.
8. Update `app/api/chatbot/portfolioContext.ts` so the assistant can accurately describe SILO in either language: it is an in-development Systems Engineering capstone at Universidad ORT Uruguay, developed with SONDA Uruguay, using an architecture based on TypeScript, Next.js, NestJS, and PostgreSQL. It has no public deployment or repository. Keep this addition brief and consistent with the visible copy.
9. Preserve accurate claims. SILO is progressing from validated discovery/prototype work into delivery. Docker/containerized deployment, CI/CD, automated testing, advanced search, and AI-assisted workflows may be described only as planned or designed-for capabilities if they are mentioned at all. Do not claim production deployment, completed AI/Elasticsearch functionality, user counts, customers, savings, revenue, benchmarks, or other unsupported impact.
10. Preserve heading hierarchy, sufficient contrast in both themes, keyboard behavior for linked cards, useful image alt text, and reduced-motion behavior. Do not introduce dependencies, a new UI framework, a new animation library, or a standalone `/projects/silo` route.

## Scope boundaries

In scope:

- Project data/type changes needed for optional links, localized supporting fields, featured layout, and an optional image.
- Reusable Projects grid/tile changes needed to render linked ordinary cards and a non-linked featured SILO card cleanly.
- Complete English and Spanish SILO copy.
- The SILO entry in the chatbot's manually maintained portfolio knowledge.
- Responsive, light/dark, keyboard, and reduced-motion verification for the affected section.

Out of scope:

- A standalone SILO case-study page or any new route.
- A public link, source-code link, link to SONDA/ORT presented as the project destination, or “private repository” control.
- Creating or generating a SILO screenshot, logo, mockup, or stock illustration.
- Redesigning the Projects section or unrelated sections, rewriting other projects, or changing their URLs.
- Adding project-specific metadata/JSON-LD; the current SEO implementation does not enumerate projects.
- Implementing SILO itself or any of its planned search, AI, deployment, CI/CD, or testing capabilities.
- Adding a component/E2E testing framework solely for this change. There is currently no UI test setup.

## Implementation constraints

- Favor a small extension of the existing `Project`, `ProjectGrid`, and `ProjectTile` abstractions over a separate one-off visual system. It is acceptable for the tile to branch semantically between an anchor and a non-interactive container, but shared visual content should not be duplicated unnecessarily.
- Keep current theme variables and component conventions. Visual prominence must come from grid span, content space, ordering, and subtle labels—not unrelated gradients, glow, oversized badges, new typography, or flashy animation.
- Ensure the featured grid treatment does not leave SILO or ordinary projects awkwardly stretched. Revisit fixed wrapper/tile aspect-ratio assumptions where needed, while preserving sensible image cropping with `object-cover` and responsive `sizes` values.
- Do not mark all project images `loading="eager"`. SILO may be prioritized only if justified by its actual initial viewport position; otherwise preserve Next.js image optimization and allow below-the-fold images to load lazily.
- Keep `PROJECTS` as the canonical ordering/data source and translation files as the canonical locale copy source.
- Follow permanent project rules in any `AGENTS.md` added before execution; do not duplicate or weaken them.

## Acceptance criteria

- `/en` and `/es` show SILO first and with clearly greater but restrained visual prominence than every existing project.
- Within a few seconds, a visitor can understand what SILO is, its relationship to SONDA Uruguay and the capstone, its in-development status, and its primary technologies.
- SILO has no link or CTA and exposes no misleading pointer, hover, focus, or keyboard interaction. Existing projects remain linked and retain usable keyboard focus and CTA text.
- English and Spanish render complete, semantically equivalent SILO content through `next-intl`, with no missing-message errors.
- The layout has no horizontal overflow and keeps the same project order at mobile, tablet, laptop, and desktop widths. Text remains readable, labels/tags wrap cleanly, and any screenshot is not distorted.
- Light and dark modes maintain the existing card language and sufficient text/border contrast. Reduced-motion preference does not introduce new motion regressions.
- If `public/projects/silo.webp` exists, it is rendered through `next/image` with meaningful localized alt text and responsive sizing. If it does not exist, the page builds and renders a deliberate non-image featured state with no broken request, and the handoff names that exact missing path.
- All six pre-existing projects, their descriptions, images, ordering relative to each other, and destinations are preserved after SILO.
- The chatbot context can answer accurately about SILO without claiming a public URL, completed delivery, production use, or implemented future capabilities.
- No unrelated section, metadata, dependency, generated asset, or route is changed.

## Verification

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
git diff --check
```

If `npm run build` is blocked by absent environment configuration, record the exact error and verify the other commands; do not add, expose, or weaken environment/security configuration to make the build pass.

Manually verify:

- `/en#projects` and `/es#projects` at representative mobile (approximately 375 px), tablet (approximately 768 px), laptop (approximately 1024 px), and wide desktop (1440 px or greater) widths.
- SILO is first at every width, its card is non-interactive, and Tab navigation reaches only cards with real destinations.
- Light and dark themes, plus `prefers-reduced-motion: reduce`.
- The with-image state if `public/projects/silo.webp` is available; otherwise confirm no missing-image request or broken visual and record the requested path.
- Existing project links still point to their original destinations.

## Handoff

Summarize how SILO was integrated, list every changed file, describe any reusable project model/tile/grid changes, state whether `public/projects/silo.webp` was found and used, and—if absent—tell the user to place the real screenshot at that exact path. Report the exact result of each automated and manual check, plus any remaining risk or unavailable verification. Do not claim checks that were not run, modify the existing CV PDFs, or create a commit unless explicitly asked.
