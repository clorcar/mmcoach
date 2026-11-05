<script setup lang="ts">
// Articles published in the last days are highlighted, up to MAX_FRESH
const FRESH_ARTICLE_DAYS = 15
const MAX_FRESH = 2

const { articles } = await useArticles({ order: 'fechaPublicacion_DESC' })

// Fixed at build time and kept in the payload: the highlighted list must not change between the
// static HTML and hydration (a rebuild is triggered whenever content is published)
const now = useState('articles-build-time', () => Date.now())

const fresh = computed(() =>
  articles.value
    .filter((article) => isRecent(article.publishedAt, now.value, FRESH_ARTICLE_DAYS))
    .slice(0, MAX_FRESH),
)
const older = computed(() => articles.value.filter((article) => !fresh.value.includes(article)))

const freshSummary = computed(() => {
  const count = fresh.value.length
  return `Publicados en los últimos ${FRESH_ARTICLE_DAYS} días · ${count} ${count === 1 ? 'artículo' : 'artículos'}`
})

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
  <div>
    <PageHeader
      eyebrow="Artículos"
      title="Lecturas para tratarte con más calma"
      summary="Reflexiones y herramientas sobre autoexigencia, emociones y descanso, para leer sin prisa."
    />

    <section v-if="fresh.length" class="fresh" aria-labelledby="fresh-articles-title">
      <div class="fresh__content">
        <div class="fresh__heading">
          <h2 id="fresh-articles-title" class="fresh__title">Recién publicado</h2>
          <p class="fresh__summary">{{ freshSummary }}</p>
        </div>

        <div class="fresh__list" :class="{ 'fresh__list--single': fresh.length === 1 }">
          <ArticleEntry
            v-for="article in fresh"
            :key="article.id"
            :article="article"
            :row="fresh.length === 1"
            featured
          />
        </div>
      </div>
    </section>

    <section v-if="older.length" class="older" aria-labelledby="older-articles-title">
      <div class="older__heading">
        <div class="older__text">
          <h2 id="older-articles-title" class="older__title">Más artículos</h2>
          <p class="older__summary">Lecturas anteriores, que merecen un poco de calma.</p>
        </div>
        <p class="older__count">
          {{ older.length }} {{ older.length === 1 ? 'artículo' : 'artículos' }}
        </p>
      </div>

      <div class="older__list">
        <ArticleEntry v-for="article in older" :key="article.id" :article="article" row />
      </div>

      <p class="older__end">Estás al día. Vuelve cuando tengas un momento.</p>
    </section>

    <p v-if="!articles.length" class="articles-empty">
      Muy pronto publicaré los primeros artículos.
    </p>

    <PageCta
      title="¿No sabes por dónde empezar?"
      summary="Cuéntame qué te está pasando y te recomiendo el formato que mejor puede ayudarte."
      action="Escríbeme"
    />
  </div>
</template>

<style lang="scss" scoped>
.fresh {
  background-color: $color-surface-sage;
}

.fresh__content {
  @include container;
  display: flex;
  flex-direction: column;
  gap: $space-6;
  padding-block: $space-8;

  @include bp(tablet-landscape) {
    gap: $space-7;
    padding-block: $space-9;
  }
}

.fresh__heading {
  display: flex;
  flex-direction: column;
  gap: $space-3;
}

.fresh__title,
.older__title {
  @include f-32-400;
  letter-spacing: $letter-spacing-tight;

  @include bp(tablet-portrait) {
    @include f-36-400;
  }
}

.fresh__summary {
  @include f-14-400;
  color: $color-primary;
}

.fresh__list {
  display: flex;
  flex-direction: column;
  gap: $space-7;

  @include bp(tablet-portrait) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-6;
  }
}

.fresh__list--single {
  @include bp(tablet-portrait) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.older {
  @include container;
  display: flex;
  flex-direction: column;
  gap: $space-7;
  padding-block: $space-8;

  @include bp(tablet-landscape) {
    padding-block: $space-9;
  }
}

.older__heading {
  display: flex;
  gap: $space-3;
  align-items: flex-end;
  justify-content: space-between;
}

.older__text {
  display: flex;
  flex-direction: column;
  gap: $space-3;
}

.older__summary {
  color: $color-text-muted;
}

.older__count,
.older__end {
  @include f-14-400;
  color: $color-text-muted;
}

.older__count {
  white-space: nowrap;
}

.older__end {
  text-align: center;
}

.older__list {
  display: grid;
  gap: $space-6;

  @include bp(laptop) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: $space-7;
  }
}

// Each entry sits under a fine rule, so the archive reads as rows
.older__list > :deep(.entry) {
  padding-top: $space-5;
  border-top: $border-width solid $color-border;
}

.articles-empty {
  @include container;
  padding-block: $space-8;
  color: $color-text-muted;
}
</style>
