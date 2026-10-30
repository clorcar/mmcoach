// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

// Absolute so the styles resolve the same way when this project is used as a Nuxt layer
const scssDir = fileURLToPath(new URL('./app/assets/scss', import.meta.url))

// Identity values come from the environment (see .env.example). The name defaults to the design
// placeholders so the site still builds without them; social profiles are omitted when empty.
const COACH_NAME = process.env.NUXT_PUBLIC_COACH_NAME || '[Nombre Apellido]'
const COACH_FIRST_NAME = process.env.NUXT_PUBLIC_COACH_FIRST_NAME || '[Nombre]'
const INSTAGRAM_URL = process.env.NUXT_PUBLIC_INSTAGRAM_URL || ''
const FACEBOOK_URL = process.env.NUXT_PUBLIC_FACEBOOK_URL || ''

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
  // `url` comes from NUXT_PUBLIC_SITE_URL; static values until SEO data comes from Contentful (see TODO.md)
  site: {
    name: COACH_NAME,
    description: SITE_DESCRIPTION,
    defaultLocale: 'es',
  },

  schemaOrg: {
    identity: {
      type: 'Person',
      name: COACH_NAME,
      description: SITE_DESCRIPTION,
      sameAs: [INSTAGRAM_URL, FACEBOOK_URL].filter(Boolean),
    },
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
    provider: 'contentful',
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
      coachFirstName: COACH_FIRST_NAME,
      instagramUrl: INSTAGRAM_URL,
      facebookUrl: FACEBOOK_URL,
    },
  },
})
