<script setup lang="ts">
import type { Article } from '~/types/content'

defineProps<{ article: Article }>()
</script>

<template>
  <article class="article-card">
    <div class="article-card__image">
      <ContentImage
        :image="article.image"
        placeholder="article"
        sizes="100vw tablet-portrait:50vw laptop:380px"
      />
    </div>

    <div class="article-card__body">
      <p class="article-card__meta">
        <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
        · {{ article.readingMinutes }} min de lectura
      </p>
      <h3 class="article-card__title">{{ article.title }}</h3>
      <MarkdownContent :source="article.summary" class="article-card__summary" />
      <NuxtLink :to="`/articulos/${article.slug}`" class="article-card__link">
        Leer artículo<span class="article-card__link-context">: {{ article.title }}</span>
        <span aria-hidden="true"> →</span>
      </NuxtLink>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.article-card {
  @include card;
  display: flex;
  flex-direction: column;
}

.article-card__image {
  height: $card-image-height;
  background-color: $color-surface-alt;
}

.article-card__body {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: $space-2;
  padding: $space-5;
}

.article-card__meta {
  @include f-14-400;
  color: $color-text-subtle;
}

.article-card__title {
  @include f-22-500;
}

.article-card__summary {
  flex-grow: 1;
  color: $color-text-muted;
}

.article-card__link {
  @include link-arrow;
}

.article-card__link-context {
  @include visually-hidden;
}
</style>
