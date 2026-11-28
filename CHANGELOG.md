# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/). The site is continuously deployed
(Netlify rebuilds on every merge to `main`), so entries are grouped by date instead of version.

Add every user-visible or editor-visible change under `Unreleased` in the same commit or PR,
with the Jira key when there is one. Move it under a dated heading when it is merged to `main`.

## [Unreleased]

### Added

- MC-2: Editor preview of drafts for workshops, services and articles. Contentful's content
  preview URL (`?preview=<token>`) refetches each page from the Preview API in the browser;
  the token is kept in `sessionStorage` and removed from the URL, and previewed pages are `noindex`.

### Changed

- `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ENVIRONMENT` are now public runtime config (the browser
  needs them to query the preview). Only `CONTENTFUL_DELIVERY_TOKEN` stays server-only.
- CSP: `connect-src` allows `https://graphql.contentful.com`.

## 2026-11-25

### Added

- MC-4: Logo and favicon.
- `work-on-ticket` skill for working on Jira MC tickets.

## 2026-11-07

### Added

- Sage background for the home testimonials section.

### Changed

- Redesigned the article, workshop, services and contact pages and the footer.
- Redesigned the testimonials page with the shared listing pattern.
- Replaced the Facebook link with WhatsApp contact.
- Updated the coach photo.
- Shared the article prose styles with the legal pages.

### Removed

- Reminder section from the workshop page.

### Performance

- Contentful image sources are capped and converted before the Netlify Image CDN.

## 2026-11-05

### Added

- Articles list with a "fresh from the journal" section.

### Changed

- Rebranded the foundation and home page to the new Figma design.

### Fixed

- Contentful images load straight from Contentful in dev.

## 2026-10-31

### Added

- Legal pages (aviso legal, política de privacidad), privacy-consent checkbox on the contact form and security headers.
- Full-screen mobile menu panel sliding in from the right.

### Fixed

- Contentful images are served from our own origin to avoid a third-party cookie.

## 2026-10-30

### Added

- Netlify configuration for static generation and the secrets scan.
- Services and testimonials pages, error page, contact page with Web3Forms.
- Home page, articles pages and site layout, home banner photo.
- Articles in `llms.txt`.
- SCSS design tokens, mixins, base styles and fonts.

### Changed

- Redesigned the list and detail pages; article cards show the image on top.
- Services moved off the home page.

### Fixed

- Pinned the Nitro static preset so Netlify outputs to `.output/public`.

## 2026-10-29

### Added

- Project setup: Nuxt 4 static site with Contentful (workshops, services, articles), paginated
  collections, workshop detail page and server-side token.
- Lint and typecheck tooling, `CLAUDE.md` and `TODO.md`.
- SEO and GEO basics.
