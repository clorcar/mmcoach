<script setup lang="ts">
const { articles } = await useArticles({ order: 'fechaPublicacion_DESC' })

usePageSeo({
  title: 'Artículos',
  description:
    'Artículos sobre autoexigencia, gestión emocional y cómo construir un ritmo más amable contigo.',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: 'Inicio', item: '/' }, { name: 'Artículos' }],
  }),
])
</script>

<template>
  <div class="articles-page">
    <header class="articles-page__header">
      <p class="articles-page__eyebrow">Del blog</p>
      <h1 class="articles-page__title">Artículos</h1>
      <p class="articles-page__summary">
        Reflexiones y prácticas sencillas sobre autoexigencia y gestión emocional.
      </p>
    </header>

    <div v-if="articles.length" class="articles-page__grid">
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
        heading-level="h2"
      />
    </div>
    <p v-else class="articles-page__empty">Muy pronto publicaré los primeros artículos.</p>
  </div>
</template>

<style lang="scss" scoped>
.articles-page {
  @include container;
  padding-block: $space-7 $space-10;

  @include bp(tablet-portrait) {
    padding-top: $space-9;
  }
}

.articles-page__header {
  display: flex;
  flex-direction: column;
  gap: $space-2;
  margin-bottom: $space-7;
}

.articles-page__eyebrow {
  @include eyebrow;
}

.articles-page__title {
  @include f-32-500;

  @include bp(tablet-portrait) {
    @include f-40-500;
  }
}

.articles-page__summary {
  max-width: $text-measure;
  color: $color-text-muted;
}

.articles-page__grid {
  @include auto-grid($card-min-width-wide);
}

.articles-page__empty {
  color: $color-text-muted;
}
</style>
