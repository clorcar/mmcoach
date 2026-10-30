<script setup lang="ts">
import type { Testimonial } from '~/types/content'

defineProps<{ testimonial: Testimonial }>()

const MAX_RATING = 5
</script>

<template>
  <figure class="testimonial-card">
    <figcaption class="testimonial-card__author">
      <NuxtImg
        v-if="testimonial.photo"
        :src="testimonial.photo.url"
        :alt="testimonial.photo.alt"
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
        {{ testimonial.name.charAt(0).toUpperCase() }}
      </span>

      <span class="testimonial-card__author-info">
        <span class="testimonial-card__name">{{ testimonial.name }}</span>
        <span class="testimonial-card__context">{{ testimonial.context }}</span>
      </span>
    </figcaption>

    <p class="testimonial-card__rating">
      <span aria-hidden="true">
        <span
          v-for="star in MAX_RATING"
          :key="star"
          class="testimonial-card__star"
          :class="{ 'testimonial-card__star--active': star <= testimonial.rating }"
        >
          ★
        </span>
      </span>
      <span class="testimonial-card__rating-text">
        Valoración: {{ testimonial.rating }} de {{ MAX_RATING }}
      </span>
    </p>

    <blockquote class="testimonial-card__opinion">
      <p>«{{ testimonial.opinion }}»</p>
    </blockquote>
  </figure>
</template>

<style lang="scss" scoped>
.testimonial-card {
  @include card;
  display: flex;
  flex-direction: column;
  padding: $space-5;
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
