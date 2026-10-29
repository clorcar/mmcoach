# TODO

Pending work agreed during the CLAUDE.md review. Remove items as they are done.

## SEO

- [ ] **Make SEO dynamic.** Add `seoTitle`, `seoDescription` and `seoImage` fields in Contentful (content model change: agree first) and pass them to `usePageSeo`. Today titles and descriptions are static in the pages, and the workshop description falls back to the rich text excerpt.
- [ ] **Real site identity.** Replace the placeholder `site.name` ("MM Coach") and `site.description` in `nuxt.config.ts`.
- [ ] **Site URL.** Set `NUXT_PUBLIC_SITE_URL` in `.env` and in the Cloudflare Pages build environment (canonical URLs, sitemap, robots.txt and JSON-LD depend on it).
- [ ] **Default Open Graph image** for pages without their own image.
- [ ] **Custom 404 page** (`app/error.vue`) with `noindex`, once there is a design.
- [ ] **Home page.** `/` currently redirects to `/talleres`; it needs real content (the `*Section` components are ready for it).
- [ ] **Fonts.** Self-host the design fonts with `@nuxt/fonts` (`font-display: swap`) and update `$font-family-*` in `_tokens.scss`.

## Routes

- [ ] **Prerender all dynamic routes** from Contentful slugs (`nitro.prerender.routes` or a build hook). Today detail pages are only found by the crawler through links.
- [ ] **Detail pages** for `/articulos/[slug]` and `/servicios/[slug]` (the sections already link to them).

## GEO

- [ ] **Person identity**: real name, description, image and `sameAs` social profiles in `schemaOrg.identity` (`nuxt.config.ts`). Must match the visible content.
- [ ] **Articles**: `Article`/`BlogPosting` JSON-LD with `author`, `datePublished`, `dateModified`, plus visible author and "last updated" date on the article page.
- [ ] **Workshop `Event` details**: `eventAttendanceMode` (online vs in person), `endDate`, `eventStatus`, `organizer`, and a structured address. `localizacion` is free text today, so this may need a content model change.
- [ ] **Answer-first content**: each page should open with a short factual summary, ideally a Contentful field.
- [ ] **FAQPage** structured data if real FAQs are added.
- [ ] **llms.txt**: add articles and services once their pages exist; consider `llms-full.txt`.

## Accessibility

- [ ] **Nav and footer** (`<nav>`, `<footer>`) in the default layout, once there is a design.
- [ ] **Dark theme** (optional): remap the `--color-*` properties under `prefers-color-scheme: dark` and check contrast.

## Content and data

- [ ] **Articles page size.** Articulos rich text still costs ~1000 query complexity per item: the 5-asset limit isn't applied to the `contenido` field's "Embedded asset" blocks. Once fixed, raise `pageSize` in `useArticles` from 10 to 50.
- [ ] **Verify images with real content.** No test entry has an image yet, so the `<picture>` (AVIF/WebP) output from `@nuxt/image` hasn't been checked against real Contentful assets.
- [ ] **Confirm assumptions**: prices in EUR and dates in the `Europe/Madrid` time zone.
