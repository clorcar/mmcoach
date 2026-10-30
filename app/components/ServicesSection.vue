<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 6 })

const { services } = await useServices({ limit: props.limit, order: 'titulo_ASC' })
</script>

<template>
  <section id="servicios" class="services" aria-labelledby="services-title">
    <SectionHeader title-id="services-title" eyebrow="Servicios" title="Cómo puedo acompañarte" />

    <div v-if="services.length" class="services__grid">
      <article v-for="service in services" :key="service.id" class="service-card">
        <p class="service-card__meta">
          {{ service.modality }} · {{ formatDuration(service.durationMinutes) }}
        </p>
        <h3 class="service-card__title">{{ service.title }}</h3>
        <p class="service-card__subtitle">{{ service.subtitle }}</p>
        <p class="service-card__description">{{ service.description }}</p>
      </article>
    </div>
    <p v-else class="services__empty">
      Muy pronto encontrarás aquí mis servicios. Mientras tanto, escríbeme y lo hablamos.
    </p>
  </section>
</template>

<style lang="scss" scoped>
.services {
  @include container;
  padding-block: $space-8 $space-5;
}

.services__grid {
  @include auto-grid;
}

.services__empty {
  color: $color-text-muted;
}

.service-card {
  @include card;
  display: flex;
  flex-direction: column;
  gap: $space-2;
  padding: $space-5;
}

.service-card__meta {
  @include f-14-400;
  color: $color-text-subtle;
}

.service-card__title {
  @include f-22-500;
}

.service-card__subtitle {
  @include f-17-600;
  color: $color-text;
}

.service-card__description {
  color: $color-text-muted;
}
</style>
