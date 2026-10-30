<script setup lang="ts">
const route = useRoute()
const { workshop } = await useWorkshopByUrl(route.params.slug as string)

// Unknown slugs render a 404 (and fail prerendering instead of shipping an empty page)
if (!workshop.value) {
  throw createError({ statusCode: 404, statusMessage: 'Taller no encontrado', fatal: true })
}

usePageSeo(() => ({
  title: workshop.value?.title ?? 'Taller',
  description: workshop.value?.descriptionText,
  image: workshop.value?.image,
}))

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Inicio', item: '/' },
      { name: 'Talleres', item: '/talleres' },
      { name: workshop.value.title },
    ],
  }),
  defineEvent({
    name: workshop.value.title,
    description: workshop.value.descriptionText,
    startDate: workshop.value.date,
    image: workshop.value.image?.url,
    location: { '@type': 'Place', name: workshop.value.location },
    offers:
      workshop.value.price === null
        ? undefined
        : { price: workshop.value.price, priceCurrency: 'EUR', url: route.path },
  }),
])
</script>

<template>
  <article v-if="workshop" class="workshop">
    <NuxtLink to="/talleres" class="workshop__back">
      <span aria-hidden="true">&larr;</span> Volver a talleres
    </NuxtLink>

    <div class="workshop__image">
      <ContentImage
        placeholder="workshop"
        :image="workshop.image"
        sizes="100vw tablet-portrait:800px"
        priority
      />
    </div>

    <header class="workshop__header">
      <h1 class="workshop__title">{{ workshop.title }}</h1>
      <dl class="workshop__meta">
        <div class="workshop__meta-item workshop__meta-item--date">
          <dt><span aria-hidden="true">📅</span><span class="workshop__label">Fecha</span></dt>
          <dd>
            <time :datetime="workshop.date">{{ formatDateTime(workshop.date) }}</time>
          </dd>
        </div>
        <div class="workshop__meta-item">
          <dt><span aria-hidden="true">📍</span><span class="workshop__label">Lugar</span></dt>
          <dd>{{ workshop.location }}</dd>
        </div>
        <div v-if="workshop.price !== null" class="workshop__meta-item">
          <dt><span aria-hidden="true">💶</span><span class="workshop__label">Precio</span></dt>
          <dd>{{ formatPrice(workshop.price) }}</dd>
        </div>
      </dl>
    </header>

    <RichText :content="workshop.description" />
  </article>
</template>

<style lang="scss" scoped>
.workshop {
  @include container($container-width-narrow);
  padding-block: $space-6 $space-10;

  @include bp(tablet-portrait) {
    padding-top: $space-8;
  }
}

.workshop__back {
  @include f-16-500;
  display: inline-flex;
  gap: $space-2;
  margin-bottom: $space-6;
}

.workshop__image {
  overflow: hidden;
  aspect-ratio: 3 / 2;
  background-color: $color-primary-soft;
  border-radius: $radius-2xl;

  @include bp(tablet-portrait) {
    aspect-ratio: 16 / 9;
  }
}

.workshop__header {
  margin: $space-6 0 $space-5;
}

.workshop__title {
  @include f-32-500;
  margin-bottom: $space-4;

  @include bp(tablet-portrait) {
    @include f-40-500;
  }
}

.workshop__meta {
  @include f-14-500;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $space-3 $space-5;
}

.workshop__meta-item {
  display: flex;
  gap: $space-1;
  color: $color-text-muted;

  dd {
    margin: 0;
  }
}

.workshop__meta-item--date {
  padding: $space-1 $space-3;
  color: $color-primary-hover;
  background-color: $color-primary-soft;
  border-radius: $radius-full;
}

.workshop__label {
  @include visually-hidden;
}
</style>
