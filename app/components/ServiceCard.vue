<script setup lang="ts">
import type { Service } from '~/types/content'

defineProps<{ service: Service }>()
</script>

<template>
  <article class="service-card">
    <header class="service-card__intro">
      <h3 class="service-card__title">{{ service.title }}</h3>
      <p class="service-card__subtitle">{{ service.subtitle }}</p>
    </header>

    <MarkdownContent :source="service.description" class="service-card__description" />

    <dl class="service-card__practical">
      <div class="service-card__detail">
        <dt class="service-card__label">Modalidad</dt>
        <dd class="service-card__value">{{ service.modality }}</dd>
      </div>
      <div class="service-card__detail">
        <dt class="service-card__label">Duración</dt>
        <dd class="service-card__value">{{ formatDuration(service.durationMinutes) }}</dd>
      </div>
      <div v-if="service.price !== null" class="service-card__detail">
        <dt class="service-card__label">Precio</dt>
        <dd class="service-card__price">{{ formatPrice(service.price) }}</dd>
      </div>
    </dl>
  </article>
</template>

<style lang="scss" scoped>
.service-card {
  display: grid;
  grid-template-areas:
    'intro'
    'description'
    'practical';
  gap: $space-5;
  padding-block: $space-6;
  border-top: $border-width solid $color-primary;

  @include bp(tablet-portrait) {
    grid-template-areas:
      'intro intro'
      'description practical';
    grid-template-columns: minmax(0, 1fr) 13.5rem;
    column-gap: $space-7;
    padding-block: $space-7;
  }

  @include bp(tablet-landscape) {
    grid-template-areas: 'intro description practical';
    grid-template-columns: 20rem minmax(0, 1fr) 15rem;
    column-gap: $space-9;
    padding-block: $space-section;
  }
}

.service-card__intro {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  grid-area: intro;

  @include bp(tablet-landscape) {
    gap: $space-4;
  }
}

.service-card__title {
  @include f-28-400;
  letter-spacing: $letter-spacing-tight;

  @include bp(tablet-portrait) {
    @include f-30-400;
  }
}

.service-card__subtitle {
  @include f-20-400;
  color: $color-primary;
}

.service-card__description {
  grid-area: description;
  color: $color-text-muted;
}

.service-card__practical {
  display: flex;
  flex-direction: column;
  gap: $space-5;
  grid-area: practical;
  align-content: start;

  @include bp(tablet-portrait) {
    margin-top: 0;
  }
}

.service-card__detail {
  display: flex;
  flex-direction: column;
  gap: $space-1;
}

.service-card__label {
  @include eyebrow;
}

.service-card__value {
  @include f-16-600;
  margin: 0;
}

.service-card__price {
  @include f-30-400;
  margin: 0;
  font-family: var(--font-family-heading);
  color: $color-heading;
}
</style>
