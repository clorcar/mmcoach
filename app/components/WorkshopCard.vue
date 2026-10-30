<script setup lang="ts">
import type { Workshop } from '~/types/content'

defineProps<{ workshop: Workshop }>()
</script>

<template>
  <article class="workshop-card">
    <div class="workshop-card__image">
      <ContentImage
        :image="workshop.image"
        placeholder="workshop"
        sizes="100vw tablet-portrait:50vw laptop:380px"
      />
    </div>

    <div class="workshop-card__body">
      <p class="workshop-card__meta">
        <time :datetime="workshop.date">{{ formatDate(workshop.date) }}</time>
        · {{ workshop.location }}
      </p>
      <h3 class="workshop-card__title">{{ workshop.title }}</h3>
      <MarkdownContent :source="workshop.summary" class="workshop-card__excerpt" />
      <NuxtLink :to="`/talleres/${workshop.slug}`" class="workshop-card__link">
        Más información<span class="workshop-card__link-context"> sobre {{ workshop.title }}</span>
        <span aria-hidden="true"> →</span>
      </NuxtLink>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.workshop-card {
  @include card;
  display: flex;
  flex-direction: column;
}

.workshop-card__image {
  height: $card-image-height;
  background-color: $color-primary-soft;
}

.workshop-card__body {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: $space-2;
  padding: $space-5;
}

.workshop-card__meta {
  @include f-14-400;
  color: $color-text-subtle;
}

.workshop-card__title {
  @include f-22-500;
}

.workshop-card__excerpt {
  flex-grow: 1;
  color: $color-text-muted;
}

.workshop-card__link {
  @include link-arrow;
}

.workshop-card__link-context {
  @include visually-hidden;
}
</style>
