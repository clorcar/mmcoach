# TODO

Pending work agreed during the CLAUDE.md review. Remove items as they are done.

## Launch

- [ ] **Legal pages data.** Set `NUXT_PUBLIC_LEGAL_TAX_ID`, `NUXT_PUBLIC_LEGAL_ADDRESS` and `NUXT_PUBLIC_CONTACT_EMAIL` in `.env` and in the Netlify build environment (the aviso legal and privacy policy omit what is empty, but the LSSI requires the owner's identity, tax ID and address). Have the texts reviewed before launch, and update them (and `updated` on both pages) if analytics or cookies are ever added.
- [ ] **Search Console and Bing Webmaster Tools.** Verify the domain and submit `sitemap.xml` after launch (Bing feeds several AI assistants).

## SEO

- [ ] **Default Open Graph image** for pages without their own image (waiting for the image; then add it to `public/` and use it as the fallback in `usePageSeo`).
