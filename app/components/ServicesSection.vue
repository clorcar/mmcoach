<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    limit?: number
  }>(),
  {
    limit: 6,
  },
)

// Fetch services using the dedicated composable
const { services, total, pending, errors, refresh } = await useServices({
  limit: props.limit,
  order: 'titulo_ASC',
})

// Helper to format duration
function formatDuration(minutes?: number | null): string {
  if (!minutes) return 'Duración personalizada'
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const remainingMins = minutes % 60
    return remainingMins > 0 ? `${hours}h ${remainingMins}min` : `${hours}h`
  }
  return `${minutes} min`
}
</script>

<template>
  <section class="services-container">
    <header class="services-header">
      <h2>Nuestros Servicios ({{ total }})</h2>
      <p class="subtitle">Acompañamiento personalizado para alcanzar tus metas</p>
    </header>

    <!-- Loading State -->
    <div v-if="pending" class="state-message">
      <p>Cargando servicios...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errors && errors.length" class="error-box">
      <p>Ocurrió un error al cargar los servicios.</p>
      <ul>
        <li v-for="(err, index) in errors" :key="index">
          {{ err.message }}
        </li>
      </ul>
      <button class="btn" @click="() => refresh()">Reintentar</button>
    </div>

    <!-- Services Grid -->
    <div v-else-if="services.length" class="grid">
      <article v-for="service in services" :key="service.sys.id" class="card">
        <div class="card-header">
          <div class="badges">
            <span class="badge modality" :class="service.modalidad.toLowerCase()">
              {{ service.modalidad }}
            </span>
            <span v-if="service.duracion" class="badge duration">
              ⏱ {{ formatDuration(service.duracion) }}
            </span>
          </div>

          <h3 class="title">{{ service.titulo }}</h3>
          <p class="subtitle-card">{{ service.subtitulo }}</p>
        </div>

        <p class="description">{{ service.descripcion }}</p>

        <NuxtLink :to="`/servicios/${service.url}`" class="link-btn"> Más detalles </NuxtLink>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="state-message">
      <p>No hay servicios disponibles actualmente.</p>
    </div>
  </section>
</template>

<style scoped>
.services-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.services-header {
  text-align: center;
  margin-bottom: 2rem;
}

.services-header h2 {
  font-size: 2rem;
  margin: 0;
  color: #111827;
}

.subtitle {
  color: #6b7280;
  margin-top: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.card-header {
  margin-bottom: 1rem;
}

.badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.badge.modality.online {
  background-color: #ecfdf5;
  color: #047857;
}

.badge.modality.presencial {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.badge.duration {
  background-color: #f3f4f6;
  color: #374151;
}

.title {
  font-size: 1.25rem;
  margin: 0 0 0.25rem 0;
  color: #111827;
}

.subtitle-card {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.description {
  color: #4b5563;
  line-height: 1.5;
  margin: 0 0 1.25rem 0;
  flex: 1;
}

.link-btn {
  margin-top: auto;
  display: inline-block;
  text-align: center;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: #ffffff;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 500;
}

.link-btn:hover {
  background-color: #1d4ed8;
}

.state-message {
  text-align: center;
  color: #6b7280;
  padding: 3rem 0;
}

.error-box {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}

.btn {
  margin-top: 0.5rem;
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
}
</style>
