<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)

const title = computed(() =>
  isNotFound.value ? 'Respira: esto no es el fin del mundo' : 'Algo no ha ido como esperábamos',
)
const summary = computed(() =>
  isNotFound.value
    ? 'La página que buscas no existe o ha cambiado de sitio. Un desvío no es un fracaso: vuelve al inicio y retomamos el camino desde ahí, sin exigirte nada.'
    : 'Ha habido un problema al cargar esta página. Respira, inténtalo de nuevo en unos minutos o escríbeme y lo resolvemos.',
)

usePageSeo({ title: isNotFound.value ? 'Página no encontrada' : 'Error' })
useHead({ meta: [{ name: 'robots', content: 'noindex' }] })

const goHome = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div class="error-page">
      <PageHeader :eyebrow="isNotFound ? 'Error 404' : 'Error'" :title="title" :summary="summary" />

      <div class="error-page__actions">
        <button type="button" class="error-page__home" @click="goHome">Volver al inicio</button>
        <NuxtLink :to="contactLink()" class="error-page__contact" @click="clearError()"
          >Escríbeme</NuxtLink
        >
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.error-page {
  padding-bottom: $space-10;
}

.error-page__actions {
  @include container;
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
  padding-top: $space-7;
}

.error-page__home {
  @include button(primary);
}

.error-page__contact {
  @include button(outline);
}
</style>
