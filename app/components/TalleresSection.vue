<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 6 })

const { workshops } = await useWorkshops({ limit: props.limit, order: 'fecha_ASC' })
</script>

<template>
  <section class="workshops" aria-labelledby="workshops-title">
    <header class="workshops__header">
      <h2 id="workshops-title" class="workshops__title">Próximos talleres</h2>
      <p class="workshops__subtitle">Formación y talleres presenciales y online</p>
    </header>

    <div v-if="workshops.length" class="workshops__grid">
      <article v-for="workshop in workshops" :key="workshop.id" class="workshop-card">
        <div class="workshop-card__image">
          <WorkshopImage :image="workshop.image" sizes="100vw tablet-portrait:50vw laptop:400px" />
        </div>

        <div class="workshop-card__body">
          <div class="workshop-card__badges">
            <time :datetime="workshop.date" class="workshop-card__badge workshop-card__badge--date">
              {{ formatDate(workshop.date) }}
            </time>
            <span
              v-if="workshop.price !== null"
              class="workshop-card__badge workshop-card__badge--price"
            >
              {{ formatPrice(workshop.price) }}
            </span>
          </div>

          <h3 class="workshop-card__title">{{ workshop.title }}</h3>
          <p class="workshop-card__location">
            <span aria-hidden="true">📍 </span>{{ workshop.location }}
          </p>

          <NuxtLink :to="`/talleres/${workshop.slug}`" class="workshop-card__link">
            Más sobre {{ workshop.title }}
          </NuxtLink>
        </div>
      </article>
    </div>

    <p v-else class="workshops__empty">No hay talleres programados próximamente.</p>
  </section>
</template>

<style lang="scss" scoped>
.workshops {
  @include container;
  padding-block: $space-6;
}

.workshops__header {
  margin-bottom: $space-6;
  text-align: center;
}

.workshops__title {
  @include f-32-700;
}

.workshops__subtitle {
  margin-top: $space-2;
  color: $color-text-muted;
}

.workshops__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-5;

  @include bp(tablet-portrait) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include bp(laptop) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.workshops__empty {
  padding-block: $space-7;
  text-align: center;
  color: $color-text-muted;
}

.workshop-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: $color-surface;
  border: $border-width solid $color-border;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
}

.workshop-card__image {
  height: 200px;
  background-color: $color-surface-alt;
}

.workshop-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: $space-5;
}

.workshop-card__badges {
  display: flex;
  gap: $space-2;
  margin-bottom: $space-3;
}

.workshop-card__badge {
  @include f-12-600;
  padding: $space-1 $space-2;
  border-radius: $radius-sm;
}

.workshop-card__badge--date {
  color: $color-primary-hover;
  background-color: $color-primary-soft;
}

.workshop-card__badge--price {
  color: $color-success;
  background-color: $color-success-soft;
}

.workshop-card__title {
  @include f-20-700;
  margin-bottom: $space-2;
}

.workshop-card__location {
  @include f-14-400;
  margin-bottom: $space-4;
  color: $color-text-muted;
}

.workshop-card__link {
  @include f-16-500;
  margin-top: auto;
  padding: $space-2 $space-4;
  text-align: center;
  text-decoration: none;
  color: $color-on-primary;
  background-color: $color-primary;
  border-radius: $radius-md;

  &:hover {
    background-color: $color-primary-hover;
  }
}
</style>
