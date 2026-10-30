<script setup lang="ts">
const { services } = await useServices({ order: 'titulo_ASC' })

usePageSeo({
  title: 'Servicios',
  description:
    'Servicios de coaching personal para exigirte menos y vivirte mejor: sesiones individuales y acompañamiento en autoexigencia y gestión emocional.',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: 'Inicio', item: '/' }, { name: 'Servicios' }],
  }),
])
</script>

<template>
  <div class="services-page">
    <header class="services-page__header">
      <p class="services-page__eyebrow">Servicios</p>
      <h1 class="services-page__title">Cómo puedo acompañarte</h1>
      <p class="services-page__summary">
        Formas de trabajar juntas la autoexigencia y la gestión emocional, a tu ritmo.
      </p>
    </header>

    <div v-if="services.length" class="services-page__grid">
      <ServiceCard v-for="service in services" :key="service.id" :service="service" />
    </div>
    <p v-else class="services-page__empty">
      Muy pronto encontrarás aquí mis servicios. Mientras tanto, escríbeme y lo hablamos.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.services-page {
  @include container;
  padding-block: $space-7 $space-10;

  @include bp(tablet-portrait) {
    padding-top: $space-9;
  }
}

.services-page__header {
  display: flex;
  flex-direction: column;
  gap: $space-2;
  margin-bottom: $space-7;
}

.services-page__eyebrow {
  @include eyebrow;
}

.services-page__title {
  @include f-32-500;

  @include bp(tablet-portrait) {
    @include f-40-500;
  }
}

.services-page__summary {
  max-width: $text-measure;
  color: $color-text-muted;
}

.services-page__grid {
  @include auto-grid;
}

.services-page__empty {
  color: $color-text-muted;
}
</style>
