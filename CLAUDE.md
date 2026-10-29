# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

Personal website built with **Nuxt 4** as a **static site (SSG)**, with **Contentful** as the headless CMS.
Main goals: excellent **SEO** and **GEO** (Generative Engine Optimization: being understood and cited by AI search/answer engines), fast performance, accessibility.

- Framework: Nuxt 4 (Vue 3, TypeScript, Composition API, `<script setup>`)
- Rendering: static generation (`nuxt generate`), no server runtime in production
- CMS: Contentful (GraphQL Content Delivery API at build time)
- Styling: SASS (SCSS syntax) with shared design tokens
- Language: Spanish (`es`). `<html lang="es">`, dates and prices formatted for `es-ES` in the `Europe/Madrid` time zone, SEO copy in Spanish
- Package manager: pnpm
- Formatting: Prettier (`.prettierrc.json`: no semicolons, single quotes, width 100). ESLint (`@nuxt/eslint`) handles code quality only, not formatting

## Commands

```bash
pnpm install          # install dependencies
pnpm dev              # dev server
pnpm generate         # build static site into .output/public
pnpm preview          # preview the generated site locally
pnpm typecheck        # nuxt typecheck (vue-tsc; TypeScript pinned to 5.9 until vue-tsc supports TS 7)
pnpm lint             # eslint
pnpm format           # prettier --write . (format:check to verify)
```

Always run `pnpm typecheck`, `pnpm lint` and `pnpm format:check` before saying a task is done. For anything touching routes, SEO or content fetching, also run `pnpm generate` to confirm the static build succeeds.

## Project structure (Nuxt 4)

Nuxt 4 uses the `app/` directory for application code. Do not put app code in the project root.

```
app/
  assets/scss/
    abstracts/
      _tokens.scss      # colors, font sizes, spacing, breakpoints (single source of truth)
      _mixins.scss      # reusable mixins (breakpoints, focus ring, visually-hidden...)
      _index.scss       # forwards tokens + mixins
    base/
      _reset.scss
      _typography.scss
      _root.scss        # exposes tokens as CSS custom properties on :root
    main.scss           # imports base styles (registered in nuxt.config.ts)
  components/           # auto-imported, PascalCase
  composables/          # useXxx.ts, auto-imported
  layouts/
  pages/                # file-based routing
  queries/              # GraphQL query strings (+ shared field selections in fragments.ts)
  utils/                # pure helper functions (contentful-mappers.ts, format.ts)
  types/                # contentful.ts + raw shape per content type; content.ts = lean types for components
public/                 # static files (favicon, placeholder images)
server/                 # only for build-time/prerender needs; no runtime APIs in production
  api/contentful.post.ts  # GraphQL proxy holding the token (used by prerender and the dev server only)
  routes/robots.txt.ts    # prerendered
  routes/llms.txt.ts      # prerendered
nuxt.config.ts
```

## Core principles

1. **Reuse before creating.** Before adding a component, composable, mixin or token, search the codebase for an existing one. Extend it if it is close enough.
2. **Keep it simple.** No abstraction until something is used at least twice. No extra libraries when Nuxt, Vue or the existing modules already cover the need.
3. **Small, focused files.** One component, one responsibility. Prefer composition over configuration flags.
4. **No dead code, no commented-out code, no `console.log` left behind.**
5. **Ask before** adding a new dependency, changing the folder structure, or changing the Contentful content model.

## Code style

- TypeScript everywhere. Avoid `any`; type Contentful entries in `app/types/`.
- Vue: `<script setup lang="ts">`, Composition API only. Order inside an SFC: `<script>`, `<template>`, `<style>`.
- Components: PascalCase filenames, multi-word names (`ArticleCard.vue`). Prefix base/generic components with `Base` (`BaseButton.vue`).
- Composables: `useXxx.ts`, return plain refs/functions, no hidden global state.
- Use `defineProps` / `defineEmits` with TypeScript types. Keep props minimal.
- Prefer `const`, early returns, and descriptive names over comments. Comment only the _why_.

## Styling (SASS)

- Use **SCSS syntax** with `@use` / `@forward`. **Never use `@import`** (deprecated).
- Tokens are defined **once** in `app/assets/scss/abstracts/_tokens.scss` and are the only place raw values live.
  - **Palette**: `$grey10` … `$grey50`, `$blue10` …: max 5 tones per color, `10` = lightest, higher = darker.
  - **Semantic colors** map palette tones to roles (`$color-primary`, `$color-text`, `$color-text-muted`, `$color-heading`, `$color-surface`, `$color-surface-alt`, `$color-border`, `$color-success`, `$color-danger`…). **Components use semantic colors**, not palette tones.
  - Every color variable points at a **CSS custom property** (`$color-text: var(--color-text)`), emitted in `base/_root.scss`. A theme (e.g. dark mode) only remaps `--color-*` to other palette tones.
  - **Typography**: use the `f-<size>-<weight>` mixins (`@include f-16-400`, `@include f-24-700`), which set font size, weight and line height. Sizes: 12, 14, 16, 18, 20, 24, 32, 40. Weights: 300–700. To add a size, extend `$font-scale` and add its mixins.
  - Also: spacing scale (`$space-1` … `$space-8`), radii, shadows, durations, container widths and z-index layers.
- Abstracts are injected globally through Vite `additionalData` (with `loadPaths`) in `nuxt.config.ts`, so component `<style lang="scss" scoped>` blocks can use tokens and mixins without importing them.
- **Never hard-code** colors, font sizes, spacing or breakpoints in components. If a value is missing, add a token first.
- Use `scoped` styles in components. Keep selectors flat (BEM-like class names, max 2 levels of nesting).
- Mobile-first. Mobile is the default (no media query); larger screens use `@include bp(tablet-portrait | tablet-landscape | laptop | desktop) { ... }`. The `@nuxt/image` `screens` in `nuxt.config.ts` use the same names and values: keep them in sync.
- Wrap transitions, animations and hover transforms in `@include motion-safe { ... }` (`prefers-reduced-motion`). Respect `prefers-color-scheme` once a dark theme exists. The global `:focus-visible` style lives in `base/_reset.scss`; never remove it.
- New color pairs must pass WCAG 2.2 AA (4.5:1 for text); check before adding tokens.

## Contentful

- **GraphQL** Content Delivery API, no SDK. Queries live in `app/queries/`; request only the fields the mappers use.
- Requests go through `server/api/contentful.post.ts` so the token stays server-side. With `nuxt generate` everything is fetched while prerendering; the static site only ships payloads.
- Credentials are **server-only** `runtimeConfig` (see `.env.example`): `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ENVIRONMENT` (default `master`), `CONTENTFUL_DELIVERY_TOKEN`. No preview API for now. `NUXT_PUBLIC_SITE_URL` sets the public site URL. Never commit secrets.
- Data access: `useContentfulQuery` (one query) and `useContentfulCollection` (lists, paginated, max 100 items) wrap `useAsyncData` with a stable key. Entity composables (`useWorkshops`, `useArticles`…) build on them and return mapped data.
- Errors are **fatal**: a failed Contentful request throws, so `nuxt generate` fails (`nitro.prerender.failOnError`) instead of shipping a broken page. Components have no loading, error or retry states.
- Query complexity limit is 11000. Rich text `links` cost ~1000 per item unless the field limits embedded assets; use `pageSize` in `useContentfulCollection` to stay under it.
- Map Contentful responses to our own lean TypeScript types in one place (`app/utils/contentful-mappers.ts`); components never consume raw Contentful responses.
- Prerender all dynamic routes: build the route list from Contentful slugs (e.g. in `nitro.prerender.routes` or a build hook) so every page is generated and included in the sitemap.
- Rich text: render with one shared component (`RichText.vue`, Vue render functions, no `v-html`). Content headings start at `<h2>`. Images: alt text is the asset's `description` (entry title as fallback, in `mapImage`); render with `@nuxt/image` (`contentful` provider, AVIF/WebP), always with width/height.
- Content updates: a Contentful webhook triggers a new build/deploy on the host. Do not rely on client-side fetching for content.

## SEO

- Every page must set, via `useSeoMeta()` and `useHead()`:
  - unique `title` (~50–60 chars) and `description` (~120–160 chars)
  - canonical URL, `og:*` and `twitter:*` tags, `lang`
- Titles/descriptions come from Contentful fields (`seoTitle`, `seoDescription`, `seoImage`) with sensible fallbacks. Keep this logic in **one** composable (`usePageSeo`) and reuse it in every page.
- Semantic HTML: one `<h1>` per page, logical heading order, `<main>`, `<nav>`, `<article>`, `<header>`, `<footer>`, `<time datetime>`.
- Use `<NuxtLink>` for internal links (descriptive anchor text, no "click here"). Every page reachable via internal links.
- `sitemap.xml` comes from `@nuxtjs/sitemap` (prerendered pages); `robots.txt` is a prerendered server route. Only indexable pages in the sitemap.
- Site identity (name, description, URL) lives in `site` in `nuxt.config.ts` (`useSiteConfig()` in the app, `getSiteConfig(event)` on the server). Static until SEO fields come from Contentful (see `TODO.md`).
- Performance is SEO: optimize LCP/CLS/INP. Use `@nuxt/image` (set width/height, lazy-load below the fold, preload the LCP image), self-host fonts (`@nuxt/fonts`) with `font-display: swap`, no render-blocking third-party scripts.
- Clean, lowercase, hyphenated URLs. No duplicate content; always set a canonical.
- Custom 404 page with `noindex`.

## GEO (Generative Engine Optimization)

The aim is for AI assistants and answer engines to understand, trust and cite the site.

- **Structured data (JSON-LD) on every relevant page**: `WebSite`, `Organization`/`Person`, `Article`/`BlogPosting` (with `author`, `datePublished`, `dateModified`), `BreadcrumbList`, `FAQPage` where real FAQs exist. Use the Schema.org module/composables rather than hand-written JSON strings. Data must match visible page content.
- **Clear, self-contained content**: start pages with a concise, factual summary (answer-first), use descriptive headings phrased as questions where natural, short paragraphs, lists and tables for facts.
- **Visible authorship and freshness**: author name/bio, publish and "last updated" dates in the HTML (also in JSON-LD). Update `dateModified` only on real content changes.
- **Consistent entity information**: same name, description and social profiles (`sameAs`) everywhere.
- **`llms.txt`** (and optionally `llms-full.txt`) generated at build time, listing key pages with one-line descriptions.
- **`robots.txt`**: AI crawlers **GPTBot, ClaudeBot, PerplexityBot and Google-Extended are explicitly allowed**, because being cited by answer engines is a goal. The list lives in `server/routes/robots.txt.ts`.
- Workshops use Schema.org `Event` (with `Place` and `Offer`) plus `BreadcrumbList`.
- Content must be present in the **static HTML** (no content that only appears after client-side JS).

## Accessibility

- Meets WCAG 2.2 AA: sufficient color contrast (check when adding color tokens), keyboard navigation, visible focus, meaningful `alt`, labelled form controls, `aria-*` only when native HTML is not enough.
- Skip-to-content link in the default layout.

## Git and workflow

- Small, focused commits. Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
- Branch per feature; never commit directly to `main`.
- Do not commit `.env`, `.nuxt/`, `.output/`, or `node_modules/`.
- When a task is non-trivial, outline the plan first and wait for approval before large changes.

## Things to avoid

- Hard-coded colors, font sizes, spacing or breakpoints
- `@import` in SCSS; global unscoped styles outside `assets/scss`
- Client-only fetching of CMS content
- Duplicating SEO/meta logic across pages
- New dependencies or abstractions without a clear need
- Disabling lint/type errors instead of fixing them
