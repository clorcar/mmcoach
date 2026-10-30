<script setup lang="ts">
import type { Service } from '~/types/content'

defineProps<{ service: Service }>()
</script>

<template>
  <article class="service-card">
    <header class="service-card__header">
      <h2 class="service-card__title">{{ service.title }}</h2>
      <p class="service-card__subtitle">{{ service.subtitle }}</p>
    </header>

    <p class="service-card__chips">
      <span class="service-card__chip service-card__chip--duration">
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        {{ formatDuration(service.durationMinutes) }}
      </span>
      <span class="service-card__chip service-card__chip--modality">
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <template v-if="service.modality === 'Online'">
            <rect x="3" y="4" width="18" height="12" rx="2" />
            <path d="M8 20h8M12 16v4" />
          </template>
          <template v-else>
            <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </template>
        </svg>
        {{ service.modality }}
      </span>
    </p>

    <MarkdownContent :source="service.description" class="service-card__description" />

    <footer class="service-card__footer">
      <p v-if="service.price !== null" class="service-card__price">
        {{ formatPrice(service.price) }}
      </p>
      <NuxtLink :to="contactLink('servicios')" class="service-card__cta">
        Reservar<span class="service-card__cta-context"> {{ service.title }}</span>
      </NuxtLink>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
.service-card {
  @include card;
  display: flex;
  flex-direction: column;
  gap: $space-4;
  padding: $space-6;
}

.service-card__header {
  display: flex;
  flex-direction: column;
  gap: $space-1;
}

.service-card__title {
  @include f-24-500;
  color: $color-heading;
}

.service-card__subtitle {
  @include f-18-400;
  font-family: var(--font-family-heading);
  font-style: italic;
  color: $color-text-subtle;
}

.service-card__chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $space-2;
}

.service-card__chip--duration {
  @include chip(soft);
}

.service-card__chip--modality {
  @include chip(outline);
}

.service-card__description {
  flex-grow: 1;
  color: $color-text-muted;
}

.service-card__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: $space-3;
  padding-top: $space-4;
  border-top: $border-width solid $color-border;
}

.service-card__price {
  @include f-24-500;
  color: $color-heading;
}

.service-card__cta {
  @include button(primary);
  margin-left: auto;
}

.service-card__cta-context {
  @include visually-hidden;
}
</style>
