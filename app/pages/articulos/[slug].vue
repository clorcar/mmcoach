<script setup lang="ts">
const route = useRoute()
const site = useSiteConfig()
const { article } = await useArticleByUrl(route.params.slug as string)

// Unknown slugs render a 404 (and fail prerendering instead of shipping an empty page)
if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado', fatal: true })
}

// sys.publishedAt changes on every republish: only show it when it falls on a later day
const updatedAt = computed(() => {
  const updated = article.value?.updatedAt
  if (!updated || !article.value) return null
  return updated.slice(0, 10) > article.value.publishedAt.slice(0, 10) ? updated : null
})

usePageSeo(() => ({
  title: article.value?.title ?? 'Artículo',
  description: article.value?.summary,
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
    description: article.value.summary,
    image: article.value.image?.url,
    datePublished: article.value.publishedAt,
    dateModified: updatedAt.value ?? article.value.publishedAt,
  }),
])
</script>

<template>
  <article v-if="article" class="article">
    <NuxtLink to="/articulos" class="article__back">
      <span aria-hidden="true">←</span> Volver a artículos
    </NuxtLink>

    <header class="article__header">
      <h1 class="article__title">{{ article.title }}</h1>
      <p class="article__summary">{{ article.summary }}</p>
      <p class="article__meta">
        Por {{ site.name }} ·
        <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
        · {{ article.readingMinutes }} min de lectura
        <template v-if="updatedAt">
          · Actualizado el <time :datetime="updatedAt">{{ formatDate(updatedAt) }}</time>
        </template>
      </p>
    </header>

    <div class="article__image">
      <ContentImage
        :image="article.image"
        placeholder="article"
        sizes="100vw tablet-portrait:800px"
        priority
      />
    </div>

    <RichText :content="article.content" />
  </article>
</template>

<style lang="scss" scoped>
.article {
  @include container($container-width-narrow);
  padding-block: $space-6 $space-10;

  @include bp(tablet-portrait) {
    padding-top: $space-8;
  }
}

.article__back {
  @include f-16-500;
  display: inline-flex;
  gap: $space-2;
  margin-bottom: $space-6;
}

.article__header {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  margin-bottom: $space-6;
}

.article__title {
  @include f-32-500;

  @include bp(tablet-portrait) {
    @include f-40-500;
  }
}

.article__summary {
  @include f-20-400;
  color: $color-text-muted;
}

.article__meta {
  @include f-14-400;
  color: $color-text-subtle;
}

.article__image {
  overflow: hidden;
  aspect-ratio: 3 / 2;
  margin-bottom: $space-6;
  background-color: $color-surface-alt;
  border-radius: $radius-2xl;

  @include bp(tablet-portrait) {
    aspect-ratio: 16 / 9;
  }
}
</style>
