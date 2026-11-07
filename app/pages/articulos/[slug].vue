<script setup lang="ts">
const MORE_ARTICLES = 2

const route = useRoute()
const site = useSiteConfig()
const { coachFullName } = useRuntimeConfig().public
const { article } = await useArticleByUrl(route.params.slug as string)

// Unknown slugs render a 404 (and fail prerendering instead of shipping an empty page)
if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado', fatal: true })
}

const { articles: moreArticles } = await useArticles({
  limit: MORE_ARTICLES,
  order: 'fechaPublicacion_DESC',
  where: { url_not: route.params.slug },
})

const pageUrl = computed(() => `${site.url ?? ''}${route.path}`)

// sys.publishedAt changes on every republish: only show it when it falls on a later day
const updatedAt = computed(() => {
  const updated = article.value?.updatedAt
  if (!updated || !article.value) return null
  return updated.slice(0, 10) > article.value.publishedAt.slice(0, 10) ? updated : null
})

usePageSeo(() => ({
  title: article.value?.title ?? 'Artículo',
  description: article.value?.summaryText,
  image: article.value?.image,
  type: 'article',
}))

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Inicio', item: '/' },
      { name: 'Artículos', item: '/articulos' },
      { name: article.value.title },
    ],
  }),
  // Author is the site identity (Person) from nuxt.config.ts
  defineArticle({
    '@type': 'BlogPosting',
    headline: article.value.title,
    description: article.value.summaryText,
    image: article.value.image?.url,
    datePublished: article.value.publishedAt,
    dateModified: updatedAt.value ?? article.value.publishedAt,
  }),
])
</script>

<template>
  <div v-if="article" class="article-page">
    <article>
      <div class="article__opening">
        <BaseBackLink to="/articulos">Volver a artículos</BaseBackLink>

        <header class="article__intro">
          <p class="article__eyebrow">{{ article.readingMinutes }} min de lectura</p>
          <h1 class="article__title">{{ article.title }}</h1>
          <MarkdownContent :source="article.summary" class="article__summary" />

          <p class="article__meta">
            <span class="article__author">Por {{ coachFullName }}</span>
            <span aria-hidden="true">·</span>
            <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
            <template v-if="updatedAt">
              <span aria-hidden="true">·</span>
              <span>
                Actualizado el <time :datetime="updatedAt">{{ formatDate(updatedAt) }}</time>
              </span>
            </template>
          </p>
        </header>

        <figure class="article__hero">
          <div class="article__image">
            <ContentImage
              :image="article.image"
              placeholder="article"
              sizes="100vw tablet-portrait:700px laptop:1040px"
              priority
            />
          </div>
          <figcaption v-if="article.image?.alt" class="article__caption">
            {{ article.image.alt }}
          </figcaption>
        </figure>
      </div>

      <div class="article__content">
        <RichText :content="article.content" />
        <footer class="article__end">
          <ArticleShare :url="pageUrl" />
          <BaseBackLink to="/articulos">Volver a artículos</BaseBackLink>
        </footer>
      </div>
    </article>

    <section v-if="moreArticles.length" class="article__more" aria-labelledby="more-title">
      <div class="article__more-content">
        <div class="article__more-heading">
          <h2 id="more-title" class="article__more-title">Sigue leyendo</h2>
          <p class="article__more-summary">
            Algunas lecturas más para llevarte contigo, a tu ritmo.
          </p>
        </div>
        <div class="article__more-grid">
          <ArticleEntry v-for="more in moreArticles" :key="more.id" :article="more" featured />
        </div>
      </div>
    </section>

    <PageCta
      title="¿No sabes por dónde empezar?"
      summary="Cuéntame qué te está pasando y te recomiendo el formato que mejor puede ayudarte."
      action="Escríbeme"
      flush
    />
  </div>
</template>

<style lang="scss" scoped>
.article__opening {
  @include container;
  display: flex;
  flex-direction: column;
  gap: $space-6;
  padding-block: $space-5 $space-7;

  @include bp(tablet-portrait) {
    gap: $space-section;
    padding-block: $space-7 $space-9;
  }
}

.article__intro {
  display: flex;
  flex-direction: column;
  gap: $space-5;
  width: 100%;
  max-width: $article-intro-width;
  margin-inline: auto;
}

.article__eyebrow {
  @include eyebrow;
}

.article__title {
  @include f-38-400;
  letter-spacing: $letter-spacing-tight;

  @include bp(tablet-portrait) {
    @include f-46-400;
  }

  @include bp(laptop) {
    @include f-56-400;
  }
}

.article__summary {
  @include f-20-400;
  color: $color-text-muted;
}

.article__meta {
  @include f-14-400;
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
  align-items: center;
  color: $color-text-muted;
}

.article__author {
  @include f-16-500;
  color: $color-text;
}

.article__hero {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  width: 100%;
  max-width: $article-hero-width;
  margin-inline: auto;
}

.article__image {
  height: $article-hero-height;
  overflow: hidden;
  background-color: $color-surface-alt;
  border-radius: $radius-sm;

  @include bp(tablet-portrait) {
    height: $article-hero-height-tablet;
  }

  @include bp(laptop) {
    height: $article-hero-height-laptop;
  }
}

.article__caption {
  @include f-14-400;
  color: $color-text-muted;
}

.article__content {
  @include container;
  padding-bottom: $space-8;

  > * {
    max-width: $article-body-width;
    margin-inline: auto;
  }

  @include bp(tablet-portrait) {
    padding-bottom: $space-10;
  }
}

.article__end {
  display: flex;
  flex-direction: column;
  gap: $space-5;
  padding-top: $space-5-5;
  margin-top: $space-section-sm;
  border-top: $border-width solid $color-border;

  @include bp(tablet-portrait) {
    margin-top: $space-section;
  }
}

.article__more {
  background-color: $color-surface-sage;
}

.article__more-content {
  @include container;
  display: flex;
  flex-direction: column;
  gap: $space-section-sm;
  padding-block: $space-section;

  @include bp(laptop) {
    padding-block: $space-9;
  }
}

.article__more-heading {
  display: flex;
  flex-direction: column;
  gap: $space-3;
}

.article__more-title {
  @include f-28-400;
  letter-spacing: $letter-spacing-tight;

  @include bp(tablet-portrait) {
    @include f-34-400;
  }
}

.article__more-summary {
  color: $color-text-muted;
}

.article__more-grid {
  display: flex;
  flex-direction: column;
  gap: $space-7;

  @include bp(tablet-portrait) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-6;
  }
}
</style>
