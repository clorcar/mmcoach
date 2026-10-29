// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

// Absolute so the styles resolve the same way when this project is used as a Nuxt layer
const scssDir = fileURLToPath(new URL('./app/assets/scss', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxtjs/sitemap', 'nuxt-schema-org'],

  // Enable SSR for Nuxt 4 Static Site Generation (SSG) mode compatibility
  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
    },
  },

  // Site identity shared by sitemap, Schema.org and SEO meta.
  // `url` comes from NUXT_PUBLIC_SITE_URL; static values until SEO data comes from Contentful (see TODO.md)
  site: {
    name: 'MM Coach',
    description: 'Coaching, talleres y acompañamiento personalizado para alcanzar tus metas.',
    defaultLocale: 'es',
  },

  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'MM Coach',
    },
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

  // Server-only: Contentful is queried through /api/contentful, so credentials never reach the client
  runtimeConfig: {
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID || '',
    contentfulEnvironment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    contentfulDeliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN || '',
  },
})
