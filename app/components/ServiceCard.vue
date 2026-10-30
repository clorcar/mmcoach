<script setup lang="ts">
import type { Service } from '~/types/content'

defineProps<{ service: Service }>()
</script>

<template>
  <article class="service-card">
    <p class="service-card__meta">
      {{ service.modality }} · {{ formatDuration(service.durationMinutes) }}
    </p>
    <h2 class="service-card__title">{{ service.title }}</h2>
    <p class="service-card__subtitle">{{ service.subtitle }}</p>
    <p class="service-card__description">{{ service.description }}</p>
    <p v-if="service.price !== null" class="service-card__price">
      {{ formatPrice(service.price) }}
    </p>
  </article>
</template>

<style lang="scss" scoped>
.service-card {
  @include card;
  display: flex;
  flex-direction: column;
  gap: $space-2;
  padding: $space-5;
}

.service-card__meta {
  @include f-14-400;
  color: $color-text-subtle;
}

.service-card__title {
  @include f-22-500;
}

.service-card__subtitle {
  @include f-17-600;
  color: $color-text;
}

.service-card__description {
  flex-grow: 1;
  color: $color-text-muted;
}

.service-card__price {
  @include f-20-500;
  color: $color-heading;
}
</style>
