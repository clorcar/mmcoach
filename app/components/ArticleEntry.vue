<script setup lang="ts">
import type { Article } from '~/types/content'

defineProps<{
  article: Article
  /** Image beside the text from tablets up; stacked on phones */
  row?: boolean
  /** Larger image and title, for the highlighted articles */
  featured?: boolean
}>()
</script>

<template>
  <article class="entry" :class="{ 'entry--row': row, 'entry--featured': featured }">
    <div class="entry__image">
      <ContentImage
        :image="article.image"
        placeholder="article"
        :sizes="
          featured ? '100vw tablet-portrait:340px laptop:604px' : '100vw tablet-portrait:220px'
        "
      />
    </div>

    <div class="entry__body">
      <p class="entry__eyebrow">{{ article.readingMinutes }} min de lectura</p>
      <h3 class="entry__title">{{ article.title }}</h3>
      <time :datetime="article.publishedAt" class="entry__date">{{
        formatDate(article.publishedAt)
      }}</time>
      <MarkdownContent :source="article.summary" class="entry__summary" />
      <BaseLink :to="`/articulos/${article.slug}`">
        Leer artículo<span class="entry__link-context">: {{ article.title }}</span>
      </BaseLink>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.entry {
  display: flex;
  flex-direction: column;
  gap: $space-5;
}

.entry__image {
  flex: none;
  height: $card-image-height;
  overflow: hidden;
  background-color: $color-surface-alt;
  border-radius: $radius-sm;
}

.entry__body {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: $space-3;
  align-items: flex-start;
  min-width: 0;
}

.entry__eyebrow {
  @include eyebrow;
}

.entry__title {
  @include f-24-400;
  letter-spacing: $letter-spacing-tight;
}

.entry__date {
  @include f-14-400;
  color: $color-text-muted;
}

.entry__summary {
  color: $color-text-muted;
}

.entry__link-context {
  @include visually-hidden;
}

.entry--featured {
  .entry__title {
    @include f-26-400;

    @include bp(tablet-portrait) {
      @include f-30-400;
    }
  }
}

.entry--featured:not(.entry--row) .entry__image {
  @include bp(laptop) {
    height: $article-featured-image-height;
  }
}

@include bp(tablet-portrait) {
  .entry--row {
    flex-direction: row;
    align-items: flex-start;

    .entry__image {
      width: $article-row-image-width;
      height: $article-row-image-height;
    }
  }

  .entry--row.entry--featured {
    align-items: center;

    .entry__image {
      flex: 0 0 48%;
      width: auto;
      height: $article-featured-image-height;
    }
  }
}
</style>
