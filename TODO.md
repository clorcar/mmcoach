# TODO

Pending work agreed during the CLAUDE.md review. Remove items as they are done.

## SEO

- [ ] **Real site identity.** Set `NUXT_PUBLIC_WEBSITE_NAME`, `NUXT_PUBLIC_COACH_FULL_NAME` (still a placeholder in `.env`) and `NUXT_PUBLIC_COACH_FIRST_NAME` in the Cloudflare Pages build environment, and replace `SITE_DESCRIPTION` in `nuxt.config.ts` if needed.
- [ ] **Social profiles.** Define the profiles, then set `NUXT_PUBLIC_INSTAGRAM_URL` and `NUXT_PUBLIC_FACEBOOK_URL` in `.env` and in the Cloudflare Pages build environment (they still hold placeholder URLs).
- [ ] **Site URL.** Set `NUXT_PUBLIC_SITE_URL` (the production domain) in `.env` and in the Cloudflare Pages build environment (canonical URLs, sitemap, robots.txt and JSON-LD depend on it).
- [ ] **Default Open Graph image** for pages without their own image (waiting for the image; then add it to `public/` and use it as the fallback in `usePageSeo`).
