<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 3 })

const { testimonials, total } = await useTestimonials({
  limit: props.limit,
  order: 'sys_firstPublishedAt_DESC',
})
</script>

<template>
  <section v-if="testimonials.length" class="testimonials" aria-labelledby="testimonials-title">
    <SectionHeader
      title-id="testimonials-title"
      eyebrow="Testimonios"
      title="Lo que dicen quienes han trabajado conmigo"
      :link="total > limit ? { to: '/testimonios', label: 'Ver más testimonios' } : undefined"
    />

    <div class="testimonials__grid">
      <TestimonialCard v-for="item in testimonials" :key="item.id" :testimonial="item" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.testimonials {
  @include container;
  padding-block: $space-8 $space-5;
}

.testimonials__grid {
  @include auto-grid;
}
</style>
