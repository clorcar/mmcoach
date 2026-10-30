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
    <PageHeader
      eyebrow="Talleres"
      title="Aprender en grupo, a un ritmo amable"
      summary="Encuentros prácticos para entender tu exigencia, escuchar tus emociones y llevarte herramientas para el día a día."
    />

    <section class="talleres__list" aria-label="Próximos talleres">
      <div v-if="workshops.length" class="talleres__items">
        <WorkshopListCard v-for="workshop in workshops" :key="workshop.id" :workshop="workshop" />
      </div>
      <p v-else class="talleres__empty">
        Actualmente no hay talleres programados. Vuelve pronto para nuevas fechas.
      </p>
    </section>

    <PageCta
      title="¿Quieres un taller para tu grupo o empresa?"
      summary="Diseño talleres a medida según las necesidades de cada equipo."
      action="Hablemos"
      reason="talleres"
    />
  </div>
</template>

<style lang="scss" scoped>
.talleres {
  padding-bottom: $space-10;
}

.talleres__list {
  @include container;
  padding-block: $space-8 $space-5;
}

.talleres__items {
  display: flex;
  flex-direction: column;
  gap: $space-6;
}

.talleres__empty {
  color: $color-text-muted;
}
</style>
