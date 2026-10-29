// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Enable SSR for Nuxt 4 Static Site Generation (SSG) mode compatibility
  ssr: true,

  // Server-only: Contentful is queried through /api/contentful, so credentials never reach the client
  runtimeConfig: {
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID || '',
    contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  },
})
