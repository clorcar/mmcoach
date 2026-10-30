<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 6 })

const { testimonials } = await useTestimonials({
  limit: props.limit,
  order: 'sys_firstPublishedAt_DESC',
})

const MAX_RATING = 5
</script>

<template>
  <section class="testimonials" aria-labelledby="testimonials-title">
    <header class="testimonials__header">
      <h2 id="testimonials-title" class="testimonials__title">Testimonios</h2>
      <p class="testimonials__subtitle">Lo que dicen nuestros clientes y atletas</p>
    </header>

    <div v-if="testimonials.length" class="testimonials__grid">
      <figure v-for="item in testimonials" :key="item.id" class="testimonial-card">
        <figcaption class="testimonial-card__author">
          <NuxtImg
            v-if="item.photo"
            :src="item.photo.url"
            :alt="item.photo.alt"
            width="48"
            height="48"
            fit="thumb"
            loading="lazy"
            class="testimonial-card__avatar"
          />
          <span
            v-else
            class="testimonial-card__avatar testimonial-card__avatar--initial"
            aria-hidden="true"
          >
            {{ item.name.charAt(0).toUpperCase() }}
          </span>

          <span class="testimonial-card__author-info">
            <span class="testimonial-card__name">{{ item.name }}</span>
            <span class="testimonial-card__context">{{ item.context }}</span>
          </span>
        </figcaption>

        <p class="testimonial-card__rating">
          <span aria-hidden="true">
            <span
              v-for="star in MAX_RATING"
              :key="star"
              class="testimonial-card__star"
              :class="{ 'testimonial-card__star--active': star <= item.rating }"
            >
              ★
            </span>
          </span>
          <span class="testimonial-card__rating-text">
            Valoración: {{ item.rating }} de {{ MAX_RATING }}
          </span>
        </p>

        <blockquote class="testimonial-card__opinion">
          <p>«{{ item.opinion }}»</p>
        </blockquote>
      </figure>
    </div>

    <p v-else class="testimonials__empty">No hay testimonios disponibles en este momento.</p>
  </section>
</template>

<style lang="scss" scoped>
.testimonials {
  @include container;
  padding-block: $space-6;
}

.testimonials__header {
  margin-bottom: $space-6;
  text-align: center;
}

.testimonials__title {
  @include f-32-500;
}

.testimonials__subtitle {
  margin-top: $space-2;
  color: $color-text-muted;
}

.testimonials__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-5;

  @include bp(tablet-portrait) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include bp(laptop) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.testimonials__empty {
  padding-block: $space-7;
  text-align: center;
  color: $color-text-muted;
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  padding: $space-5;
  background-color: $color-surface;
  border: $border-width solid $color-border;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: $space-4;
  margin-bottom: $space-4;
}

.testimonial-card__avatar {
  flex-shrink: 0;
  width: $avatar-size-sm;
  height: $avatar-size-sm;
  object-fit: cover;
  border-radius: $radius-full;
}

.testimonial-card__avatar--initial {
  @include f-20-600;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-on-primary;
  background-color: $color-primary;
}

.testimonial-card__author-info {
  display: flex;
  flex-direction: column;
}

.testimonial-card__name {
  @include f-18-600;
  color: $color-heading;
}

.testimonial-card__context {
  @include f-14-400;
  color: $color-text-muted;
}

.testimonial-card__rating {
  @include f-20-400;
  display: flex;
  align-items: center;
  gap: $space-2;
  margin-bottom: $space-3;
}

.testimonial-card__star {
  color: $color-border;
}

.testimonial-card__star--active {
  color: $color-rating;
}

.testimonial-card__rating-text {
  @include visually-hidden;
}

.testimonial-card__opinion {
  font-style: italic;
}
</style>
