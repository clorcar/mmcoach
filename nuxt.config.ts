// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

// Absolute so the styles resolve the same way when this project is used as a Nuxt layer
const scssDir = fileURLToPath(new URL('./app/assets/scss', import.meta.url))

// Identity values come from the environment (see .env.example). Names default to placeholders so
// the site still builds without them; social profiles are omitted when empty.
const WEBSITE_NAME = process.env.NUXT_PUBLIC_WEBSITE_NAME || 'MM Coach'
const COACH_FULL_NAME = process.env.NUXT_PUBLIC_COACH_FULL_NAME || '[Nombre Apellido]'
const COACH_FIRST_NAME = process.env.NUXT_PUBLIC_COACH_FIRST_NAME || '[Nombre]'
const COACH_DESCRIPTION =
  process.env.NUXT_PUBLIC_COACH_DESCRIPTION ||
  'Coach personal especializada en autoexigencia y gestión emocional. Acompaño a personas que sienten que nada es suficiente a construir un ritmo más amable consigo mismas.'
const INSTAGRAM_URL = process.env.NUXT_PUBLIC_INSTAGRAM_URL || ''
const FACEBOOK_URL = process.env.NUXT_PUBLIC_FACEBOOK_URL || ''

// Owner details for the legal pages; each one is left out of the page when empty
const LEGAL_TAX_ID = process.env.NUXT_PUBLIC_LEGAL_TAX_ID || ''
const LEGAL_ADDRESS = process.env.NUXT_PUBLIC_LEGAL_ADDRESS || ''
const CONTACT_EMAIL = process.env.NUXT_PUBLIC_CONTACT_EMAIL || ''

// Contact form endpoint (Web3Forms). The access key is meant to be public: it only identifies the form
const WEB3FORMS_URL = process.env.NUXT_PUBLIC_WEB3FORMS_URL || 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = process.env.NUXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ''

const SITE_DESCRIPTION = 'Coaching personal en autoexigencia y gestión emocional.'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/image', '@nuxtjs/sitemap', 'nuxt-schema-org'],

  // Enable SSR for Nuxt 4 Static Site Generation (SSG) mode compatibility
  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/icon.png', type: 'image/png', sizes: '192x192' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  // Site identity shared by sitemap, Schema.org and SEO meta.
  // `url` comes from NUXT_PUBLIC_SITE_URL
  site: {
    name: WEBSITE_NAME,
    description: SITE_DESCRIPTION,
    defaultLocale: 'es',
  },

  schemaOrg: {
    identity: {
      type: 'Person',
      name: COACH_FULL_NAME,
      description: COACH_DESCRIPTION,
      image: '/images/coach.webp',
      sameAs: [INSTAGRAM_URL, FACEBOOK_URL].filter(Boolean),
    },
  },

  // Workshop and article detail pages come from Contentful (see server/api/__sitemap__/urls.ts)
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  // Self-hosted at build time (no requests to Google from the browser)
  fonts: {
    defaults: {
      subsets: ['latin', 'latin-ext'],
    },
    families: [
      {
        name: 'Lora',
        provider: 'google',
        weights: [400, 500, 600, 700],
        styles: ['normal', 'italic'],
      },
      { name: 'Karla', provider: 'google', weights: [300, 400, 500, 600, 700], styles: ['normal'] },
    ],
  },

  image: {
    provider: 'netlify',
    format: ['avif', 'webp'],
    // Same breakpoints as $breakpoints in app/assets/scss/abstracts/_tokens.scss (keep in sync)
    screens: {
      mobile: 480,
      'tablet-portrait': 768,
      'tablet-landscape': 1024,
      laptop: 1280,
      desktop: 1440,
    },
  },

  css: [`${scssDir}/main.scss`],

  vite: {
    css: {
      preprocessorOptions: {
        // Tokens and mixins are available in every component <style lang="scss"> without imports
        scss: {
          loadPaths: [scssDir],
          additionalData: '@use "abstracts" as *;\n',
        },
      },
    },
  },

  nitro: {
    // Netlify would otherwise auto-select netlify-static and write to dist/ instead of .output/public
    preset: 'static',
    prerender: {
      routes: ['/robots.txt', '/llms.txt'],
      failOnError: true,
    },
  },

  runtimeConfig: {
    // Server-only: Contentful is queried through /api/contentful, so credentials never reach the client
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID || '',
    contentfulEnvironment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    contentfulDeliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN || '',

    // Public, non-secret values rendered into the static pages
    public: {
      coachFullName: COACH_FULL_NAME,
      coachFirstName: COACH_FIRST_NAME,
      coachDescription: COACH_DESCRIPTION,
      instagramUrl: INSTAGRAM_URL,
      facebookUrl: FACEBOOK_URL,
      legalTaxId: LEGAL_TAX_ID,
      legalAddress: LEGAL_ADDRESS,
      contactEmail: CONTACT_EMAIL,
      web3formsUrl: WEB3FORMS_URL,
      web3formsAccessKey: WEB3FORMS_ACCESS_KEY,
    },
  },
})
