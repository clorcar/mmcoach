<script setup lang="ts">
const { services } = await useServices({ order: 'titulo_ASC' })

const count = computed(() => {
  const total = services.value.length
  return `${total} ${total === 1 ? 'servicio' : 'servicios'}`
})

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
  <div>
    <PageHeader
      eyebrow="Servicios"
      title="Formas de acompañarte, a tu ritmo"
      summary="Elige el formato que mejor encaje contigo. Si tienes dudas, escríbeme y lo vemos juntas sin compromiso."
    />

    <section class="services" aria-labelledby="services-title">
      <div class="services__content">
        <div class="services__heading">
          <h2 id="services-title" class="services__title">Formas de trabajar juntas</h2>
          <p v-if="services.length" class="services__count">{{ count }} · Coaching individual</p>
        </div>

        <div v-if="services.length" class="services__list">
          <ServiceCard v-for="service in services" :key="service.id" :service="service" />
        </div>
        <p v-else class="services__empty">
          Muy pronto encontrarás aquí mis servicios. Mientras tanto, escríbeme y lo hablamos.
        </p>
      </div>
    </section>

    <PageCta
      eyebrow="¿Te apetece explorarlo?"
      title="Haz espacio para tu siguiente paso."
      summary="Si no sabes qué servicio encaja contigo, o quieres hablar de lo que tienes en mente, me encantará leerte."
      action="Consultar sobre coaching"
      note="Cuéntame brevemente qué buscas y te responderé con el siguiente paso."
      reason="servicios"
      flush
    />
  </div>
</template>

<style lang="scss" scoped>
.services {
  background-color: $color-surface-sage;
}

.services__content {
  @include container;
  display: flex;
  flex-direction: column;
  gap: $space-5-5;
  padding-block: $space-section;

  @include bp(tablet-landscape) {
    gap: $space-section-sm;
    padding-block: $space-9;
  }
}

.services__heading {
  display: flex;
  flex-direction: column;
  gap: $space-3;

  @include bp(tablet-landscape) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.services__title {
  @include f-30-400;
  letter-spacing: $letter-spacing-tight;

  @include bp(tablet-portrait) {
    @include f-36-400;
  }
}

.services__count {
  @include f-14-400;
  color: $color-primary;
}

.services__list {
  border-bottom: $border-width solid $color-primary;
}

.services__empty {
  color: $color-text-muted;
}
</style>
