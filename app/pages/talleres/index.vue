<script setup lang="ts">
const { workshops } = await useWorkshops({ order: 'fecha_ASC' })

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
      <p class="talleres__eyebrow">Próximos talleres</p>
      <h1 class="talleres__title">Talleres</h1>
      <p class="talleres__summary">
        Espacios para bajar el ritmo: descubre los próximos talleres y actividades de formación.
      </p>
    </header>

    <div v-if="workshops.length" class="talleres__grid">
      <WorkshopCard
        v-for="workshop in workshops"
        :key="workshop.id"
        :workshop="workshop"
        heading-level="h2"
      />
    </div>
    <p v-else class="talleres__empty">
      Actualmente no hay talleres programados. Vuelve pronto para nuevas fechas.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.talleres {
  @include container;
  padding-block: $space-7 $space-10;

  @include bp(tablet-portrait) {
    padding-top: $space-9;
  }
}

.talleres__header {
  display: flex;
  flex-direction: column;
  gap: $space-2;
  margin-bottom: $space-7;
}

.talleres__eyebrow {
  @include eyebrow;
}

.talleres__title {
  @include f-32-500;

  @include bp(tablet-portrait) {
    @include f-40-500;
  }
}

.talleres__summary {
  max-width: $text-measure;
  color: $color-text-muted;
}

.talleres__grid {
  @include auto-grid;
}

.talleres__empty {
  color: $color-text-muted;
}
</style>
