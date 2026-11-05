<script setup lang="ts">
import type { Workshop } from '~/types/content'

const props = defineProps<{ workshop: Workshop }>()

const meta = computed(() => {
  const { date, durationMinutes, location, price } = props.workshop
  const time = formatDate(date, { hour: '2-digit', minute: '2-digit' })
  const end = addMinutes(date, durationMinutes)
  const schedule = end ? `${time}–${formatDate(end, { hour: '2-digit', minute: '2-digit' })}` : time

  return [formatDate(date, { weekday: 'long' }), schedule, location.name, formatPrice(price)]
    .filter(Boolean)
    .join(' · ')
})
</script>

<template>
  <article class="workshop-row">
    <time :datetime="workshop.date" class="workshop-row__date">
      <span class="workshop-row__month">{{
        formatDate(workshop.date, { month: 'short', year: 'numeric' })
      }}</span>
      <span class="workshop-row__day">{{ formatDate(workshop.date, { day: '2-digit' }) }}</span>
    </time>

    <div class="workshop-row__body">
      <h3 class="workshop-row__title">{{ workshop.title }}</h3>
      <MarkdownContent :source="workshop.summary" class="workshop-row__summary" />
      <p class="workshop-row__meta">{{ meta }}</p>
      <BaseLink :to="`/talleres/${workshop.slug}`">
        Más información<span class="workshop-row__link-context"> sobre {{ workshop.title }}</span>
      </BaseLink>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.workshop-row {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  padding-block: $space-5 $space-2;
  border-top: $border-width solid $color-primary;

  @include bp(tablet-landscape) {
    flex-direction: row;
    gap: $space-6;
    padding-block: $space-5;
  }
}

.workshop-row__date {
  display: flex;
  flex: none;
  gap: $space-3;
  align-items: baseline;
  flex-direction: row-reverse;
  justify-content: flex-end;

  @include bp(tablet-portrait) {
    flex-direction: row;
  }

  @include bp(tablet-landscape) {
    flex-direction: column;
    gap: 0.1875rem;
    align-items: flex-start;
    justify-content: flex-start;
    width: $date-badge-width;
  }
}

.workshop-row__month {
  @include eyebrow;
  white-space: nowrap;

  @include bp(tablet-landscape) {
    order: -1;
  }
}

.workshop-row__day {
  @include f-22-400;
  font-family: var(--font-family-heading);
  color: $color-heading;
}

.workshop-row__body {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: $space-3;
  align-items: flex-start;
  min-width: 0;
}

.workshop-row__title {
  @include f-26-400;
  letter-spacing: $letter-spacing-tight;
}

.workshop-row__summary {
  color: $color-text-muted;
}

.workshop-row__meta {
  @include f-14-400;
  color: $color-primary;
}

.workshop-row__link-context {
  @include visually-hidden;
}
</style>
