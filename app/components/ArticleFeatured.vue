<script setup lang="ts">
import type { Article } from '~/types/content'

defineProps<{
  article: Article
  /** Shows the "Nuevo" pill */
  isNew: boolean
}>()
</script>

<template>
  <article class="article-featured">
    <div class="article-featured__image">
      <ContentImage
        :image="article.image"
        placeholder="article"
        sizes="100vw tablet-portrait:50vw laptop:560px"
      />
    </div>

    <div class="article-featured__body">
      <p class="article-featured__meta">
        <span v-if="isNew" class="article-featured__pill">Nuevo</span>
        <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
      </p>
      <h2 class="article-featured__title">
        <NuxtLink :to="`/articulos/${article.slug}`" class="article-featured__title-link">
          {{ article.title }}
        </NuxtLink>
      </h2>
      <MarkdownContent :source="article.summary" class="article-featured__summary" />
      <NuxtLink :to="`/articulos/${article.slug}`" class="article-featured__cta">
        Leer artículo<span class="article-featured__cta-context">: {{ article.title }}</span>
      </NuxtLink>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.article-featured {
  @include card;
  display: flex;
  flex-wrap: wrap;
  border-radius: $radius-3xl;
}

.article-featured__image {
  position: relative;
  flex: 1 1 $featured-basis;
  min-height: $featured-image-min-height;
  background-color: $color-primary-soft;

  :deep(.content-image) {
    position: absolute;
    inset: 0;
  }
}

.article-featured__body {
  display: flex;
  flex: 999 1 $featured-basis;
  flex-direction: column;
  gap: $space-4;
  justify-content: center;
  min-width: 0;
  padding: $space-6;

  @include bp(tablet-portrait) {
    padding: $space-7;
  }
}

.article-featured__meta {
  @include f-14-400;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $space-3;
  color: $color-text-subtle;
}

.article-featured__pill {
  @include f-14-600;
  padding: $space-1 $space-3;
  color: $color-on-primary;
  background-color: $color-primary;
  border-radius: $radius-full;
}

.article-featured__title {
  @include f-32-500;
  color: $color-heading;
}

.article-featured__title-link {
  color: inherit;
}

.article-featured__summary {
  @include f-18-400;
  color: $color-text-muted;
}

.article-featured__cta {
  @include button(primary);
  align-self: flex-start;
}

.article-featured__cta-context {
  @include visually-hidden;
}
</style>
