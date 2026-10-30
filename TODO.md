# TODO

Pending work agreed during the CLAUDE.md review. Remove items as they are done.

## SEO

- [ ] **Make SEO dynamic.** Add `seoTitle`, `seoDescription` and `seoImage` fields in Contentful (content model change: agree first) and pass them to `usePageSeo`. Today titles and descriptions are static in the pages, and the workshop description falls back to the rich text excerpt.
- [ ] **Real site identity.** Set `NUXT_PUBLIC_COACH_NAME` and `NUXT_PUBLIC_COACH_FIRST_NAME` in `.env` and in the Cloudflare Pages build environment (they still hold the design placeholders), and replace `SITE_DESCRIPTION` in `nuxt.config.ts`.
- [ ] **Logo.** Replace the placeholder circle in `SiteHeader.vue`.
- [ ] **Photo in structured data.** Add `/images/coach.webp` (absolute URL) as `image` of the Person identity in `schemaOrg.identity`.
- [ ] **Social profiles.** Set `NUXT_PUBLIC_INSTAGRAM_URL` and `NUXT_PUBLIC_FACEBOOK_URL` in `.env` and in the Cloudflare Pages build environment (they still hold placeholder URLs).
- [ ] **Home copy from Contentful.** The intro text is static in `HomeIntro.vue`.
- [ ] **Site URL.** Set `NUXT_PUBLIC_SITE_URL` in `.env` and in the Cloudflare Pages build environment (canonical URLs, sitemap, robots.txt and JSON-LD depend on it).
- [ ] **Default Open Graph image** for pages without their own image.
- [ ] **Custom 404 page** (`app/error.vue`) with `noindex`, once there is a design.

## Routes

- [ ] **Prerender all dynamic routes** from Contentful slugs (`nitro.prerender.routes` or a build hook). Today detail pages are only found by the crawler through links.
- [ ] **Workshop modality.** The design shows "Online / Presencial" on workshop cards, but `Talleres` has no such field; the cards show the location instead (content model change: agree first).

## GEO

- [ ] **Person identity**: real name, description, image and `sameAs` social profiles in `schemaOrg.identity` (`nuxt.config.ts`). Must match the visible content.
- [ ] **Author bio** on article pages (name only today), matching the Person identity.
- [ ] **Workshop `Event` details**: `eventAttendanceMode` (online vs in person), `endDate`, `eventStatus`, `organizer`, and a structured address. `localizacion` is free text today, so this may need a content model change.
- [ ] **Answer-first content**: each page should open with a short factual summary, ideally a Contentful field.
- [ ] **FAQPage** structured data if real FAQs are added.
- [ ] **llms.txt**: list individual articles (and services once they have pages); consider `llms-full.txt`.

## Accessibility

- [ ] **Mobile navigation.** On phones the nav links wrap below the name; consider a menu button if more links are added.
- [ ] **Dark theme** (optional): remap the `--color-*` properties under `prefers-color-scheme: dark` and check contrast.

## Content and data

- [ ] **Articles page size.** Articulos rich text still costs ~1000 query complexity per item: the 5-asset limit isn't applied to the `contenido` field's "Embedded asset" blocks. Once fixed, raise `pageSize` in `useArticles` from 10 to 50.
- [ ] **Confirm assumptions**: prices in EUR and dates in the `Europe/Madrid` time zone.
