<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 3 })

// Upcoming at build time; a fixed key keeps the prerendered payload valid on later visits
const today = new Date().toISOString().slice(0, 10)
const { workshops } = await useWorkshops(
  { limit: props.limit, order: 'fecha_ASC', where: { fecha_gte: today } },
  'home-upcoming-workshops',
)
</script>

<template>
  <section id="talleres" class="workshops" aria-labelledby="workshops-title">
    <SectionHeader
      title-id="workshops-title"
      eyebrow="Próximos talleres"
      title="Espacios para bajar el ritmo"
      :link="{ to: '/talleres', label: 'Ver todos los talleres' }"
    />

    <div v-if="workshops.length" class="workshops__grid">
      <WorkshopCard v-for="workshop in workshops" :key="workshop.id" :workshop="workshop" />
    </div>
    <p v-else class="workshops__empty">
      No hay talleres programados ahora mismo. Vuelve pronto para nuevas fechas.
    </p>
  </section>
</template>

<style lang="scss" scoped>
.workshops {
  @include container;
  padding-block: $space-8 $space-5;
}

.workshops__grid {
  @include auto-grid;
}

.workshops__empty {
  color: $color-text-muted;
}
</style>
