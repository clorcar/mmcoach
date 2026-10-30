<script setup lang="ts">
const { testimonials } = await useTestimonials({ order: 'sys_firstPublishedAt_DESC' })

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
  <div class="testimonials-page">
    <header class="testimonials-page__header">
      <p class="testimonials-page__eyebrow">Testimonios</p>
      <h1 class="testimonials-page__title">Lo que dicen quienes han trabajado conmigo</h1>
      <p class="testimonials-page__summary">
        Opiniones de personas que han pasado por mis talleres y sesiones.
      </p>
    </header>

    <div v-if="testimonials.length" class="testimonials-page__grid">
      <TestimonialCard v-for="item in testimonials" :key="item.id" :testimonial="item" />
    </div>
    <p v-else class="testimonials-page__empty">Muy pronto compartiré los primeros testimonios.</p>
  </div>
</template>

<style lang="scss" scoped>
.testimonials-page {
  @include container;
  padding-block: $space-7 $space-10;

  @include bp(tablet-portrait) {
    padding-top: $space-9;
  }
}

.testimonials-page__header {
  display: flex;
  flex-direction: column;
  gap: $space-2;
  margin-bottom: $space-7;
}

.testimonials-page__eyebrow {
  @include eyebrow;
}

.testimonials-page__title {
  @include f-32-500;

  @include bp(tablet-portrait) {
    @include f-40-500;
  }
}

.testimonials-page__summary {
  max-width: $text-measure;
  color: $color-text-muted;
}

.testimonials-page__grid {
  @include auto-grid;
}

.testimonials-page__empty {
  color: $color-text-muted;
}
</style>
