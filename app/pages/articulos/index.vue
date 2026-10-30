<script setup lang="ts">
// Days an article keeps the "Nuevo" pill
const NEW_ARTICLE_DAYS = 15

const { articles } = await useArticles({ order: 'fechaPublicacion_DESC' })

// Fixed at build time and kept in the payload: the pill must not change between the static HTML
// and hydration (a rebuild is triggered whenever content is published)
const now = useState('articles-build-time', () => Date.now())

const featured = computed(() => articles.value[0])
const others = computed(() => articles.value.slice(1))
const isFeaturedNew = computed(() =>
  featured.value ? isRecent(featured.value.publishedAt, now.value, NEW_ARTICLE_DAYS) : false,
)

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
    <PageHeader
      eyebrow="Artículos"
      title="Lecturas para tratarte con más calma"
      summary="Reflexiones y herramientas sobre autoexigencia, emociones y descanso, para leer sin prisa."
    />

    <section v-if="featured" class="articles-page__featured" aria-label="Último artículo">
      <ArticleFeatured :article="featured" :is-new="isFeaturedNew" />
    </section>
    <p v-else class="articles-page__empty">Muy pronto publicaré los primeros artículos.</p>

    <section v-if="others.length" class="articles-page__more" aria-labelledby="more-articles-title">
      <h2 id="more-articles-title" class="articles-page__more-title">Más artículos</h2>
      <div class="articles-page__grid">
        <ArticleCard v-for="article in others" :key="article.id" :article="article" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.articles-page {
  padding-bottom: $space-10;
}

.articles-page__featured {
  @include container;
  padding-block: $space-8 $space-5;
}

.articles-page__more {
  @include container;
  padding-block: $space-7 $space-5;
}

.articles-page__more-title {
  @include f-24-500;
  margin-bottom: $space-5;
  color: $color-heading;

  @include bp(tablet-portrait) {
    @include f-32-500;
  }
}

.articles-page__grid {
  @include auto-grid;
}

.articles-page__empty {
  @include container;
  padding-block: $space-8;
  color: $color-text-muted;
}
</style>
