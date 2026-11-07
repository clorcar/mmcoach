<script setup lang="ts">
import type { Workshop } from '~/types/content'

defineProps<{ workshop: Workshop }>()
</script>

<template>
  <article class="workshop-list-card">
    <time :datetime="workshop.date" class="workshop-list-card__date">
      <span class="workshop-list-card__month">{{
        formatDate(workshop.date, { month: 'long', year: 'numeric' })
      }}</span>
      <span class="workshop-list-card__day">{{
        formatDate(workshop.date, { day: '2-digit' })
      }}</span>
    </time>

    <div class="workshop-list-card__overview">
      <h3 class="workshop-list-card__title">{{ workshop.title }}</h3>
      <MarkdownContent :source="workshop.summary" class="workshop-list-card__summary" />
    </div>

    <div class="workshop-list-card__practical">
      <p class="workshop-list-card__location">{{ workshop.location.name }}</p>
      <p v-if="workshop.price !== null" class="workshop-list-card__price">
        {{ formatPrice(workshop.price) }}
      </p>
      <p class="workshop-list-card__schedule">
        <span>{{ formatDate(workshop.date, { weekday: 'long' }) }}</span>
        <span>{{ formatTimeRange(workshop.date, workshop.durationMinutes) }}</span>
        <span v-if="workshop.durationMinutes">{{ formatDuration(workshop.durationMinutes) }}</span>
      </p>
    </div>

    <BaseLink :to="`/talleres/${workshop.slug}`" class="workshop-list-card__link">
      Ver taller<span class="workshop-list-card__context">: {{ workshop.title }}</span>
    </BaseLink>
  </article>
</template>

<style lang="scss" scoped>
.workshop-list-card {
  display: grid;
  grid-template-areas:
    'date'
    'overview'
    'practical'
    'link';
  gap: $space-4-5;
  padding-block: $space-5-5;
  border-top: $border-width solid $color-primary;

  @include bp(tablet-portrait) {
    grid-template-areas:
      'date overview'
      'date practical'
      'date link';
    grid-template-columns: 8rem minmax(0, 1fr);
    column-gap: $space-6;
    padding-block: $space-6;
  }

  @include bp(tablet-landscape) {
    grid-template-areas:
      'date overview practical'
      'date link practical';
    grid-template-columns: 10rem minmax(0, 1fr) 15rem;
    column-gap: $space-7;
    row-gap: $space-4;
    padding-block: $space-section-sm;
  }
}

.workshop-list-card__date {
  display: flex;
  flex-direction: column;
  gap: $space-2;
  grid-area: date;
}

.workshop-list-card__month {
  @include eyebrow;
}

.workshop-list-card__day {
  @include f-48-400;
  font-family: var(--font-family-heading);
  color: $color-heading;
}

.workshop-list-card__overview {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  grid-area: overview;
}

.workshop-list-card__title {
  @include f-28-400;
  letter-spacing: $letter-spacing-tight;

  @include bp(tablet-landscape) {
    @include f-30-400;
  }
}

.workshop-list-card__summary {
  color: $color-text-muted;
}

.workshop-list-card__practical {
  display: grid;
  grid-area: practical;
  grid-template-areas:
    'location price'
    'schedule price';
  grid-template-columns: minmax(0, 1fr) auto;
  gap: $space-2 $space-4;
  align-content: start;

  @include bp(tablet-landscape) {
    grid-template-areas:
      'location price'
      'schedule schedule';
    row-gap: $space-3;
  }
}

.workshop-list-card__location {
  @include f-16-600;
  grid-area: location;
  color: $color-primary;
}

.workshop-list-card__price {
  @include f-22-400;
  grid-area: price;
  font-family: var(--font-family-heading);
  color: $color-heading;
}

.workshop-list-card__schedule {
  @include f-16-500;
  display: flex;
  flex-direction: column;
  gap: $space-1;
  grid-area: schedule;
  color: $color-primary;
}

.workshop-list-card__link {
  grid-area: link;
  justify-self: start;
}

.workshop-list-card__context {
  @include visually-hidden;
}
</style>
