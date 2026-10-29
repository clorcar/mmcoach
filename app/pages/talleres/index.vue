<script setup lang="ts">
const { workshops, total } = await useWorkshops({ order: 'fecha_ASC' })

usePageSeo({
  title: 'Talleres',
  description:
    'Próximos talleres y actividades de formación: fechas, lugares y toda la información para apuntarte.',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: 'Inicio', item: '/' }, { name: 'Talleres' }],
  }),
])
</script>

<template>
  <div class="talleres">
    <header class="talleres__header">
      <h1 class="talleres__title">Talleres</h1>
      <p class="talleres__summary">
        Descubre los próximos talleres y actividades de formación
        <span v-if="total"> ({{ total }})</span>
      </p>
    </header>

    <section v-if="workshops.length" class="talleres__list" aria-label="Próximos talleres">
      <article v-for="workshop in workshops" :key="workshop.id" class="workshop-card">
        <div class="workshop-card__image">
          <WorkshopImage :image="workshop.image" sizes="100vw tablet-portrait:280px" />
        </div>

        <div class="workshop-card__content">
          <div class="workshop-card__meta">
            <time :datetime="workshop.date" class="workshop-card__date">
              <span aria-hidden="true">📅 </span>{{ formatLongDate(workshop.date) }}
            </time>
            <span class="workshop-card__location">
              <span aria-hidden="true">📍 </span>{{ workshop.location }}
            </span>
          </div>

          <h2 class="workshop-card__title">{{ workshop.title }}</h2>

          <NuxtLink :to="`/talleres/${workshop.slug}`" class="workshop-card__link">
            Ver detalles de {{ workshop.title }}
            <span aria-hidden="true" class="workshop-card__arrow">&rarr;</span>
          </NuxtLink>
        </div>
      </article>
    </section>

    <p v-else class="talleres__empty">
      Actualmente no hay talleres programados. Vuelve pronto para nuevas fechas.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.talleres {
  @include container($container-width-narrow);
  padding-block: $space-6;

  @include bp(tablet-portrait) {
    padding-block: $space-7;
  }
}

.talleres__header {
  margin-bottom: $space-6;
  text-align: center;

  @include bp(tablet-portrait) {
    margin-bottom: $space-7;
  }
}

.talleres__title {
  @include f-32-700;
  margin-bottom: $space-2;

  @include bp(tablet-portrait) {
    @include f-40-700;
  }
}

.talleres__summary {
  @include f-18-400;
  color: $color-text-muted;
}

.talleres__list {
  display: flex;
  flex-direction: column;
  gap: $space-5;
}

.talleres__empty {
  padding: $space-8 $space-6;
  text-align: center;
  background-color: $color-surface-alt;
  border: $border-width dashed $color-border;
  border-radius: $radius-xl;
}

.workshop-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: $color-surface;
  border: $border-width solid $color-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;

  @include motion-safe {
    transition:
      transform $duration-base ease,
      box-shadow $duration-base ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: $shadow-md;
    }
  }

  @include bp(tablet-portrait) {
    flex-direction: row;
  }
}

.workshop-card__image {
  flex-shrink: 0;
  height: 180px;
  background-color: $color-surface-alt;

  @include bp(tablet-portrait) {
    width: 280px;
    height: auto;
    min-height: 200px;
  }
}

.workshop-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: $space-5;
}

.workshop-card__meta {
  @include f-14-500;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $space-3 $space-5;
  margin-bottom: $space-3;
}

.workshop-card__date {
  padding: $space-1 $space-3;
  color: $color-primary-hover;
  background-color: $color-primary-soft;
  border-radius: $radius-full;
}

.workshop-card__location {
  color: $color-text-muted;
}

.workshop-card__title {
  @include f-20-700;
  margin-bottom: $space-5;
}

.workshop-card__link {
  @include f-14-600;
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: $space-2;
  padding: $space-2 $space-4;
  color: $color-on-primary;
  text-decoration: none;
  background-color: $color-heading;
  border-radius: $radius-md;

  &:hover {
    background-color: $color-primary;
  }
}

.workshop-card__arrow {
  @include motion-safe {
    transition: transform $duration-base ease;

    .workshop-card__link:hover & {
      transform: translateX(3px);
    }
  }
}
</style>
