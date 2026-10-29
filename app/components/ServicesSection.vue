<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 6 })

const { services } = await useServices({ limit: props.limit, order: 'titulo_ASC' })
</script>

<template>
  <section class="services" aria-labelledby="services-title">
    <header class="services__header">
      <h2 id="services-title" class="services__title">Servicios</h2>
      <p class="services__subtitle">Acompañamiento personalizado para alcanzar tus metas</p>
    </header>

    <div v-if="services.length" class="services__grid">
      <article v-for="service in services" :key="service.id" class="service-card">
        <div class="service-card__badges">
          <span
            class="service-card__badge"
            :class="`service-card__badge--${service.modality.toLowerCase()}`"
          >
            {{ service.modality }}
          </span>
          <span v-if="service.durationMinutes" class="service-card__badge">
            <span aria-hidden="true">⏱ </span>{{ formatDuration(service.durationMinutes) }}
          </span>
        </div>

        <h3 class="service-card__title">{{ service.title }}</h3>
        <p class="service-card__subtitle">{{ service.subtitle }}</p>
        <p class="service-card__description">{{ service.description }}</p>

        <NuxtLink :to="`/servicios/${service.slug}`" class="service-card__link">
          Más sobre {{ service.title }}
        </NuxtLink>
      </article>
    </div>

    <p v-else class="services__empty">No hay servicios disponibles actualmente.</p>
  </section>
</template>

<style lang="scss" scoped>
.services {
  @include container;
  padding-block: $space-6;
}

.services__header {
  margin-bottom: $space-6;
  text-align: center;
}

.services__title {
  @include f-32-700;
}

.services__subtitle {
  margin-top: $space-2;
  color: $color-text-muted;
}

.services__grid {
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

.services__empty {
  padding-block: $space-7;
  text-align: center;
  color: $color-text-muted;
}

.service-card {
  display: flex;
  flex-direction: column;
  padding: $space-5;
  background-color: $color-surface;
  border: $border-width solid $color-border;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
}

.service-card__badges {
  display: flex;
  gap: $space-2;
  margin-bottom: $space-3;
}

.service-card__badge {
  @include f-12-600;
  padding: $space-1 $space-2;
  color: $color-text;
  background-color: $color-surface-alt;
  border-radius: $radius-sm;
}

.service-card__badge--online {
  color: $color-success;
  background-color: $color-success-soft;
}

.service-card__badge--presencial {
  color: $color-primary-hover;
  background-color: $color-primary-soft;
}

.service-card__title {
  @include f-20-700;
  margin-bottom: $space-1;
}

.service-card__subtitle {
  @include f-14-400;
  margin-bottom: $space-4;
  color: $color-text-muted;
}

.service-card__description {
  flex: 1;
  margin-bottom: $space-5;
}

.service-card__link {
  @include f-16-500;
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
