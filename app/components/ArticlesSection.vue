<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 6 })

const { articles } = await useArticles({ limit: props.limit, order: 'fechaPublicacion_DESC' })
</script>

<template>
  <section class="articles" aria-labelledby="articles-title">
    <header class="articles__header">
      <h2 id="articles-title" class="articles__title">Artículos</h2>
      <p class="articles__subtitle">Consejos, reflexiones y recursos sobre coaching y desarrollo</p>
    </header>

    <div v-if="articles.length" class="articles__grid">
      <article v-for="article in articles" :key="article.id" class="article-card">
        <NuxtImg
          v-if="article.image"
          :src="article.image.url"
          :alt="article.image.alt"
          :width="article.image.width"
          :height="article.image.height"
          sizes="100vw tablet-portrait:50vw laptop:400px"
          loading="lazy"
          class="article-card__image"
        />

        <div class="article-card__body">
          <time :datetime="article.publishedAt" class="article-card__date">
            {{ formatDate(article.publishedAt) }}
          </time>
          <h3 class="article-card__title">{{ article.title }}</h3>
          <p class="article-card__summary">{{ article.summary }}</p>

          <NuxtLink :to="`/articulos/${article.slug}`" class="article-card__link">
            Leer «{{ article.title }}»
          </NuxtLink>
        </div>
      </article>
    </div>

    <p v-else class="articles__empty">No hay artículos publicados todavía.</p>
  </section>
</template>

<style lang="scss" scoped>
.articles {
  @include container;
  padding-block: $space-6;
}

.articles__header {
  margin-bottom: $space-6;
  text-align: center;
}

.articles__title {
  @include f-32-700;
}

.articles__subtitle {
  margin-top: $space-2;
  color: $color-text-muted;
}

.articles__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-5;

  @include bp(tablet-portrait) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include bp(laptop) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.articles__empty {
  padding-block: $space-7;
  text-align: center;
  color: $color-text-muted;
}

.article-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: $color-surface;
  border: $border-width solid $color-border;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
}

.article-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.article-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: $space-5;
}

.article-card__date {
  @include f-12-500;
  margin-bottom: $space-2;
  color: $color-text-muted;
}

.article-card__title {
  @include f-20-700;
  margin-bottom: $space-2;
}

.article-card__summary {
  flex: 1;
  margin-bottom: $space-5;
}

.article-card__link {
  @include f-16-500;
  padding: $space-2 $space-4;
  text-align: center;
  text-decoration: none;
  color: $color-on-primary;
  background-color: $color-primary;
  border-radius: $radius-md;

  &:hover {
    background-color: $color-primary-hover;
  }
}
</style>
