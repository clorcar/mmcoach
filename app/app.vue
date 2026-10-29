<script setup lang="ts">
const site = useSiteConfig()

useHead({
  titleTemplate: (title) => (title ? `${title} · ${site.name}` : site.name),
})

// WebSite + the site identity (Person, see schemaOrg.identity in nuxt.config.ts)
useSchemaOrg([defineWebSite({ inLanguage: 'es-ES' }), defineWebPage()])
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
