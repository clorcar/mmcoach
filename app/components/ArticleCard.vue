<script setup lang="ts">
import type { Article } from '~/types/content'

defineProps<{
  article: Article
  /** Image beside the text on tablets (home list); stacked everywhere else */
  inline?: boolean
}>()
</script>

<template>
  <article class="article-card" :class="{ 'article-card--inline': inline }">
    <div class="article-card__image">
      <ContentImage
        :image="article.image"
        placeholder="article"
        sizes="100vw tablet-portrait:264px laptop:390px"
      />
    </div>

    <div class="article-card__body">
      <p class="article-card__meta">
        <time :datetime="article.publishedAt">{{
          formatDate(article.publishedAt, { day: 'numeric', month: 'short', year: 'numeric' })
        }}</time>
        · {{ article.readingMinutes }} min de lectura
      </p>
      <h3 class="article-card__title">{{ article.title }}</h3>
      <MarkdownContent :source="article.summary" class="article-card__summary" />
      <BaseLink :to="`/articulos/${article.slug}`">
        Leer artículo<span class="article-card__link-context">: {{ article.title }}</span>
      </BaseLink>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.article-card {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.article-card__image {
  flex: none;
  height: $card-image-height;
  overflow: hidden;
  background-color: $color-surface-alt;
  border-radius: $radius-sm;

  @include bp(laptop) {
    height: $card-image-height-wide;
  }
}

.article-card__body {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: $space-3;
  align-items: flex-start;
}

.article-card__meta {
  @include eyebrow;
}

.article-card__title {
  @include f-26-400;
  letter-spacing: $letter-spacing-tight;
}

.article-card__summary {
  flex-grow: 1;
  color: $color-text-muted;
}

.article-card__link-context {
  @include visually-hidden;
}

@include bp(tablet-portrait) {
  .article-card--inline {
    flex-direction: row;
    gap: $space-6;
    align-items: center;

    .article-card__image {
      width: $article-inline-image-width;
      height: $article-inline-image-height;
    }
  }
}

@include bp(tablet-landscape) {
  .article-card--inline {
    flex-direction: column;
    gap: $space-4;
    align-items: stretch;

    .article-card__image {
      width: auto;
      height: $card-image-height-wide;
    }
  }
}
</style>
