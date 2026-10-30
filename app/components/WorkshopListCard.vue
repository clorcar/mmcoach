<script setup lang="ts">
import type { Workshop } from '~/types/content'

const props = defineProps<{ workshop: Workshop }>()

const day = computed(() => formatDate(props.workshop.date, { day: 'numeric' }))
// Spanish short months may carry a trailing dot ("nov.")
const month = computed(() => formatDate(props.workshop.date, { month: 'short' }).replace('.', ''))
</script>

<template>
  <article class="workshop-list-card">
    <div class="workshop-list-card__image">
      <ContentImage
        :image="workshop.image"
        placeholder="workshop"
        sizes="100vw tablet-portrait:50vw laptop:480px"
      />
      <p class="workshop-list-card__badge" aria-hidden="true">
        <span class="workshop-list-card__day">{{ day }}</span>
        <span class="workshop-list-card__month">{{ month }}</span>
      </p>
    </div>

    <div class="workshop-list-card__body">
      <p class="workshop-list-card__chips">
        <span class="workshop-list-card__chip workshop-list-card__chip--date">
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
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
          <time :datetime="workshop.date">{{ formatDateTime(workshop.date) }}</time>
        </span>
        <span class="workshop-list-card__chip workshop-list-card__chip--location">
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
            <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {{ workshop.location.name }}
        </span>
      </p>

      <h2 class="workshop-list-card__title">
        <NuxtLink :to="`/talleres/${workshop.slug}`" class="workshop-list-card__title-link">
          {{ workshop.title }}
        </NuxtLink>
      </h2>

      <MarkdownContent :source="workshop.summary" class="workshop-list-card__description" />

      <footer class="workshop-list-card__footer">
        <p v-if="workshop.price !== null" class="workshop-list-card__price">
          {{ formatPrice(workshop.price) }}
        </p>
        <div class="workshop-list-card__actions">
          <NuxtLink :to="`/talleres/${workshop.slug}`" class="workshop-list-card__details">
            Ver detalles<span class="workshop-list-card__context"> de {{ workshop.title }}</span>
          </NuxtLink>
          <NuxtLink :to="contactLink('talleres')" class="workshop-list-card__cta">
            Reservar plaza<span class="workshop-list-card__context"> en {{ workshop.title }}</span>
          </NuxtLink>
        </div>
      </footer>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.workshop-list-card {
  @include card;
  display: flex;
  flex-wrap: wrap;
}

.workshop-list-card__image {
  position: relative;
  flex: 1 1 $workshop-list-image-basis;
  min-height: $workshop-list-image-min-height;
  background-color: $color-primary-soft;

  :deep(.content-image) {
    position: absolute;
    inset: 0;
  }
}

.workshop-list-card__badge {
  position: absolute;
  top: $space-4;
  left: $space-4;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: $date-badge-width;
  padding-block: $space-3;
  line-height: 1.1;
  background-color: $color-surface;
  border-radius: $radius-xl;
}

.workshop-list-card__day {
  @include f-24-500;
  font-family: var(--font-family-heading);
  color: $color-heading;
}

.workshop-list-card__month {
  @include eyebrow;
  @include f-13-600;
}

.workshop-list-card__body {
  display: flex;
  flex: 999 1 $workshop-list-body-basis;
  flex-direction: column;
  gap: $space-4;
  min-width: 0;
  padding: $space-6;
}

.workshop-list-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
}

.workshop-list-card__chip--date {
  @include chip(soft);
}

.workshop-list-card__chip--location {
  @include chip(outline);
}

.workshop-list-card__title {
  @include f-24-500;
  color: $color-heading;
}

.workshop-list-card__title-link {
  color: inherit;
}

.workshop-list-card__description {
  flex-grow: 1;
  color: $color-text-muted;
}

.workshop-list-card__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: $space-3;
  padding-top: $space-4;
  border-top: $border-width solid $color-border;
}

.workshop-list-card__price {
  @include f-24-500;
  color: $color-heading;
}

.workshop-list-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
  margin-left: auto;
}

.workshop-list-card__details {
  @include button(outline);
}

.workshop-list-card__cta {
  @include button(primary);
}

.workshop-list-card__context {
  @include visually-hidden;
}
</style>
