<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    limit?: number
  }>(),
  {
    limit: 6,
  },
)

// Fetch upcoming workshops sorted by date ascending
const { workshops, total, pending, errors, refresh } = await useWorkshops({
  limit: props.limit,
  order: 'fecha_ASC',
})

// Date formatter helper
function formatDate(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(isoDate))
  } catch {
    return isoDate
  }
}

// Price formatter helper
function formatPrice(precio?: number | null): string {
  if (precio === undefined || precio === null || precio === 0) {
    return 'Gratuito'
  }
  return `${precio} €`
}
</script>

<template>
  <section class="talleres-container">
    <header class="talleres-header">
      <h2>Próximos Talleres ({{ total }})</h2>
      <p class="subtitle">Formación y talleres presenciales y online</p>
    </header>

    <!-- Loading State -->
    <div v-if="pending" class="state-message">
      <p>Cargando talleres...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errors && errors.length" class="error-box">
      <p>Error al cargar los talleres.</p>
      <ul>
        <li v-for="(err, index) in errors" :key="index">
          {{ err.message }}
        </li>
      </ul>
      <button class="btn" @click="() => refresh()">Reintentar</button>
    </div>

    <!-- Workshops Grid -->
    <div v-else-if="workshops.length" class="grid">
      <article v-for="workshop in workshops" :key="workshop.sys.id" class="card">
        <div v-if="workshop.imagen" class="image-wrapper">
          <img
            :src="workshop.imagen.url"
            :alt="workshop.imagen.title || workshop.titulo"
            class="cover-image"
          />
        </div>

        <div class="card-body">
          <div class="meta">
            <span class="badge date">{{ formatDate(workshop.fecha) }}</span>
            <span class="badge price">{{ formatPrice(workshop.precio) }}</span>
          </div>

          <h3 class="title">{{ workshop.titulo }}</h3>

          <p class="location">📍 {{ workshop.localizacion }}</p>

          <NuxtLink :to="`/talleres/${workshop.url}`" class="link-btn"> Más información </NuxtLink>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="state-message">
      <p>No hay talleres programados próximamente.</p>
    </div>
  </section>
</template>

<style scoped>
.talleres-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.talleres-header {
  text-align: center;
  margin-bottom: 2rem;
}

.talleres-header h2 {
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
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.meta {
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

.badge.date {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.badge.price {
  background-color: #ecfdf5;
  color: #047857;
}

.title {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: #111827;
}

.location {
  color: #4b5563;
  font-size: 0.875rem;
  margin: 0 0 1rem 0;
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
