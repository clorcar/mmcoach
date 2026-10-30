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
    <PageHeader
      eyebrow="Servicios"
      title="Formas de acompañarte, a tu ritmo"
      summary="Elige el formato que mejor encaje contigo. Si tienes dudas, escríbeme y lo vemos juntas sin compromiso."
    />

    <section class="services-page__list" aria-label="Listado de servicios">
      <div v-if="services.length" class="services-page__grid">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" />
      </div>
      <p v-else class="services-page__empty">
        Muy pronto encontrarás aquí mis servicios. Mientras tanto, escríbeme y lo hablamos.
      </p>
    </section>

    <PageCta
      title="¿No sabes por dónde empezar?"
      summary="Cuéntame qué te está pasando y te recomiendo el formato que mejor puede ayudarte."
      action="Escríbeme"
      reason="servicios"
    />
  </div>
</template>

<style lang="scss" scoped>
.services-page {
  padding-bottom: $space-10;
}

.services-page__list {
  @include container;
  padding-block: $space-8 $space-5;
}

.services-page__grid {
  @include auto-grid($card-min-width-wide);
}

.services-page__empty {
  color: $color-text-muted;
}
</style>
