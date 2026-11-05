<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 2 })

// Upcoming at build time; a fixed key keeps the prerendered payload valid on later visits
const today = new Date().toISOString().slice(0, 10)
const { workshops } = await useWorkshops(
  { limit: props.limit, order: 'fecha_ASC', where: { fecha_gte: today } },
  'home-upcoming-workshops',
)
</script>

<template>
  <section id="talleres" class="workshops" aria-labelledby="workshops-title">
    <div class="workshops__content">
      <SectionHeader
        title-id="workshops-title"
        eyebrow="Próximos talleres"
        title="Espacios para bajar el ritmo"
        :link="{ to: '/talleres', label: 'Ver todos los talleres' }"
      />

      <div class="workshops__layout">
        <img
          src="/images/workshops.webp"
          alt=""
          width="1152"
          height="928"
          loading="lazy"
          class="workshops__image"
        />

        <div v-if="workshops.length" class="workshops__list">
          <WorkshopRow v-for="workshop in workshops" :key="workshop.id" :workshop="workshop" />
        </div>
        <p v-else class="workshops__empty">
          No hay talleres programados ahora mismo. Vuelve pronto para nuevas fechas.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.workshops {
  background-color: $color-surface-sage;
}

.workshops__content {
  @include container;
  padding-block: $space-8;

  @include bp(tablet-landscape) {
    padding-block: $space-10;
  }
}

.workshops__layout {
  display: flex;
  flex-direction: column;
  gap: $space-6;

  @include bp(tablet-landscape) {
    flex-direction: row;
    gap: $space-9;
    align-items: flex-start;
  }
}

.workshops__image {
  flex: none;
  width: 100%;
  height: $workshops-image-height;
  object-fit: cover;
  border-radius: $radius-sm;

  @include bp(tablet-landscape) {
    width: $workshops-image-width;
    height: $workshops-image-height-wide;
  }
}

.workshops__list {
  display: grid;
  flex: 1 1 0;
  gap: $space-5;
  min-width: 0;

  @include bp(tablet-portrait) {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
    gap: $space-6;
  }

  @include bp(tablet-landscape) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
}

.workshops__empty {
  color: $color-text-muted;
}
</style>
