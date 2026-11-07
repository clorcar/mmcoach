<script setup lang="ts">
const { workshops } = await useUpcomingWorkshops('upcoming-workshops')

// Workshops arrive sorted by date, so the period runs from the first to the last one
const period = computed(() => {
  const first = workshops.value[0]
  const last = workshops.value.at(-1)
  if (!first || !last) return ''

  const monthYear = { month: 'long', year: 'numeric' } as const
  const start = formatDate(first.date, monthYear)
  const end = formatDate(last.date, monthYear)
  if (start === end) return end.toLowerCase()

  const year = { year: 'numeric' } as const
  const sameYear = formatDate(first.date, year) === formatDate(last.date, year)
  const from = sameYear ? formatDate(first.date, { month: 'long' }) : start
  return `${from}–${end}`.toLowerCase()
})

const count = computed(() => {
  const total = workshops.value.length
  return `${total} ${total === 1 ? 'taller' : 'talleres'}`
})

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
  <div>
    <PageHeader
      eyebrow="Talleres"
      title="Aprender en grupo, a un ritmo amable"
      summary="Encuentros prácticos para entender tu exigencia, escuchar tus emociones y llevarte herramientas para el día a día."
    />

    <section class="talleres" aria-labelledby="talleres-title">
      <div class="talleres__content">
        <div class="talleres__heading">
          <h2 id="talleres-title" class="talleres__title">Próximos talleres</h2>
          <p v-if="workshops.length" class="talleres__count">{{ count }} · {{ period }}</p>
        </div>

        <template v-if="workshops.length">
          <div class="talleres__list">
            <WorkshopListCard
              v-for="workshop in workshops"
              :key="workshop.id"
              :workshop="workshop"
            />
          </div>
          <p class="talleres__note">
            Todas las horas se muestran en horario de Madrid. Elige un taller para conocer más
            detalles y reservar tu plaza.
          </p>
        </template>
        <p v-else class="talleres__empty">
          Actualmente no hay talleres programados. Vuelve pronto para nuevas fechas.
        </p>
      </div>
    </section>

    <PageCta
      title="¿Quieres un taller para tu grupo o empresa?"
      summary="Diseño talleres a medida según las necesidades de cada equipo."
      action="Hablemos"
      reason="talleres"
      flush
    />
  </div>
</template>

<style lang="scss" scoped>
.talleres {
  background-color: $color-surface-sage;
}

.talleres__content {
  @include container;
  display: flex;
  flex-direction: column;
  gap: $space-5-5;
  padding-block: $space-section;

  @include bp(tablet-landscape) {
    gap: $space-section-sm;
    padding-block: $space-9;
  }
}

.talleres__heading {
  display: flex;
  flex-direction: column;
  gap: $space-3;

  @include bp(tablet-landscape) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.talleres__title {
  @include f-30-400;
  letter-spacing: $letter-spacing-tight;

  @include bp(tablet-portrait) {
    @include f-36-400;
  }
}

.talleres__count,
.talleres__note {
  @include f-14-400;
  color: $color-primary;
}

.talleres__list {
  border-bottom: $border-width solid $color-primary;
}

.talleres__empty {
  color: $color-text-muted;
}
</style>
