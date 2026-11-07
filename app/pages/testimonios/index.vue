<script setup lang="ts">
const { testimonials } = await useTestimonials({ order: 'sys_firstPublishedAt_DESC' })

const count = computed(() => {
  const total = testimonials.value.length
  return `${total} ${total === 1 ? 'opinión' : 'opiniones'}`
})

usePageSeo({
  title: 'Testimonios',
  description:
    'Lo que dicen las personas que han trabajado conmigo: opiniones sobre mis talleres y sesiones de coaching en autoexigencia y gestión emocional.',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: 'Inicio', item: '/' }, { name: 'Testimonios' }],
  }),
])
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Testimonios"
      title="Lo que dicen quienes han trabajado conmigo"
      summary="Opiniones de personas que han pasado por mis talleres y sesiones."
    />

    <section class="testimonials" aria-labelledby="testimonials-title">
      <div class="testimonials__content">
        <div class="testimonials__heading">
          <h2 id="testimonials-title" class="testimonials__title">
            Palabras de quienes estuvieron
          </h2>
          <p v-if="testimonials.length" class="testimonials__count">{{ count }}</p>
        </div>

        <div v-if="testimonials.length" class="testimonials__grid">
          <TestimonialCard v-for="item in testimonials" :key="item.id" :testimonial="item" />
        </div>
        <p v-else class="testimonials__empty">Muy pronto compartiré los primeros testimonios.</p>
      </div>
    </section>

    <PageCta
      title="¿Te apetece empezar tu propio camino?"
      summary="Cuéntame qué te está pasando y te recomiendo el formato que mejor puede ayudarte."
      action="Escríbeme"
      flush
    />
  </div>
</template>

<style lang="scss" scoped>
.testimonials {
  background-color: $color-surface-sage;
}

.testimonials__content {
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

.testimonials__heading {
  display: flex;
  flex-direction: column;
  gap: $space-3;

  @include bp(tablet-landscape) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.testimonials__title {
  @include f-30-400;
  letter-spacing: $letter-spacing-tight;

  @include bp(tablet-portrait) {
    @include f-36-400;
  }
}

.testimonials__count {
  @include f-14-400;
  color: $color-primary;
}

.testimonials__grid {
  @include auto-grid;
}

.testimonials__empty {
  color: $color-text-muted;
}
</style>
