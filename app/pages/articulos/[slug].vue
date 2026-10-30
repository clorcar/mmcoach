<script setup lang="ts">
const MORE_ARTICLES = 3

const route = useRoute()
const site = useSiteConfig()
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
  <div v-if="article" class="article-page">
    <article>
      <header class="article__header">
        <nav aria-label="Ruta de navegación">
          <ol class="article__breadcrumb">
            <li><NuxtLink to="/">Inicio</NuxtLink></li>
            <li><NuxtLink to="/articulos">Artículos</NuxtLink></li>
          </ol>
        </nav>

        <time :datetime="article.publishedAt" class="article__date">
          {{ formatDate(article.publishedAt) }}
        </time>
        <h1 class="article__title">{{ article.title }}</h1>
        <MarkdownContent :source="article.summary" class="article__summary" />

        <p class="article__author">
          <img
            src="/images/coach.webp"
            alt=""
            width="48"
            height="48"
            class="article__author-photo"
          />
          <span>
            Por <strong>{{ site.name }}</strong> · {{ article.readingMinutes }} min de lectura
            <template v-if="updatedAt">
              · Actualizado el <time :datetime="updatedAt">{{ formatDate(updatedAt) }}</time>
            </template>
          </span>
        </p>
      </header>

      <div class="article__media">
        <div class="article__image">
          <ContentImage
            :image="article.image"
            placeholder="article"
            sizes="100vw tablet-portrait:1000px"
            priority
          />
        </div>
      </div>

      <div class="article__content">
        <RichText :content="article.content" />
        <ArticleShare :url="pageUrl" />
      </div>
    </article>

    <section class="article__about" aria-label="Sobre la autoría">
      <div class="article__about-card">
        <img
          src="/images/coach.webp"
          alt=""
          width="96"
          height="96"
          loading="lazy"
          class="article__about-photo"
        />
        <div class="article__about-text">
          <p class="article__about-name">{{ site.name }}</p>
          <p class="article__about-bio">
            {{ site.description }} Si este artículo te ha resonado, podemos hablarlo con calma.
          </p>
          <NuxtLink to="/servicios" class="article__about-cta">Ver servicios</NuxtLink>
        </div>
      </div>
    </section>

    <section v-if="moreArticles.length" class="article__more" aria-labelledby="more-title">
      <SectionHeader
        title-id="more-title"
        title="Sigue leyendo"
        :link="{ to: '/articulos', label: 'Todos los artículos' }"
      />
      <div class="article__more-grid">
        <ArticleCard v-for="more in moreArticles" :key="more.id" :article="more" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.article-page {
  padding-bottom: $space-10;
}

.article__header {
  @include container($container-width-narrow);
  display: flex;
  flex-direction: column;
  gap: $space-4;
  padding-top: $space-6;
}

.article__breadcrumb {
  @include f-14-400;
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
  padding: 0;
  color: $color-text-subtle;
  list-style: none;

  li + li::before {
    margin-right: $space-2;
    content: '/';
  }
}

.article__date {
  @include eyebrow;
  margin-top: $space-4;
}

.article__title {
  @include f-32-500;
  color: $color-heading;

  @include bp(tablet-portrait) {
    @include f-40-500;
  }
}

.article__summary {
  @include f-20-400;
  font-family: var(--font-family-heading);
  color: $color-text-muted;
}

.article__author {
  @include f-16-400;
  display: flex;
  align-items: center;
  gap: $space-3;
  padding-top: $space-2;
  color: $color-text-muted;

  strong {
    font-weight: 600;
    color: $color-heading;
  }
}

.article__author-photo {
  flex: none;
  width: $avatar-size-sm;
  height: $avatar-size-sm;
  object-fit: cover;
  border-radius: $radius-full;
}

.article__media {
  @include container($container-width-narrow);
  margin-top: $space-7;
}

.article__image {
  height: $card-image-height;
  overflow: hidden;
  background-color: $color-surface-alt;
  border-radius: $radius-3xl;

  @include bp(tablet-portrait) {
    height: $article-image-height;
  }
}

.article__content {
  @include container($container-width-narrow);
  display: flex;
  flex-direction: column;
  gap: $space-5;
  padding-block: $space-8 $space-5;
}

.article__about {
  @include container($container-width-narrow);
  padding-top: $space-5;
}

.article__about-card {
  @include card;
  display: flex;
  flex-wrap: wrap;
  gap: $space-5;
  align-items: center;
  padding: $space-5;
}

.article__about-photo {
  flex: none;
  width: $avatar-size-md;
  height: $avatar-size-md;
  object-fit: cover;
  border-radius: $radius-full;
}

.article__about-text {
  display: flex;
  flex: 999 1 $card-min-width;
  flex-direction: column;
  gap: $space-2;
  min-width: 0;
}

.article__about-name {
  @include f-22-500;
  font-family: var(--font-family-heading);
  color: $color-heading;
}

.article__about-bio {
  color: $color-text-muted;
}

.article__about-cta {
  @include button(primary);
  align-self: flex-start;
  margin-top: $space-1;
}

.article__more {
  @include container;
  padding-top: $space-9;
}

.article__more-grid {
  @include auto-grid;
}
</style>
