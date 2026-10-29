<script setup lang="ts">
/**
 * Default placeholder image when a workshop doesn't have an image assigned in Contentful.
 * Can be customized or replaced with another asset path as needed.
 */
const DEFAULT_IMAGE = '/images/default-workshop.svg'

// Fetch workshops from Contentful (ordered by date ascending)
const { workshops, total, pending, errors, refresh } = await useWorkshops({
  order: 'fecha_ASC',
})

// Format ISO date to human-readable Spanish locale string
function formatDate(isoDate: string): string {
  if (!isoDate) return ''
  try {
    const formatted = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(isoDate))

    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  } catch {
    return isoDate
  }
}
</script>

<template>
  <main class="hub-container">
    <header class="hub-header">
      <h1 class="hub-title">Talleres</h1>
      <p class="hub-subtitle">
        Descubre nuestros próximos talleres y actividades de formación
        <span v-if="total"> ({{ total }})</span>
      </p>
    </header>

    <!-- Loading State -->
    <div v-if="pending" class="state-box loading">
      <div class="spinner" />
      <p>Cargando talleres...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errors && errors.length" class="state-box error">
      <h2>No se pudieron cargar los talleres</h2>
      <ul>
        <li v-for="(err, index) in errors" :key="index">
          {{ err.message }}
        </li>
      </ul>
      <button class="retry-btn" @click="() => refresh()">Reintentar</button>
    </div>

    <!-- Workshops List -->
    <section v-else-if="workshops.length" class="workshops-list">
      <article v-for="workshop in workshops" :key="workshop.sys.id" class="workshop-card">
        <!-- Left: Image (Contentful image or default fallback) -->
        <div class="card-image-wrapper">
          <img
            :src="workshop.imagen?.url || DEFAULT_IMAGE"
            :alt="workshop.imagen?.title || workshop.titulo"
            class="card-image"
            loading="lazy"
          />
        </div>

        <!-- Right: Workshop Data -->
        <div class="card-content">
          <div class="meta-row">
            <span class="meta-item date"> 📅 {{ formatDate(workshop.fecha) }} </span>
            <span class="meta-item location"> 📍 {{ workshop.localizacion }} </span>
          </div>

          <h2 class="card-title">
            {{ workshop.titulo }}
          </h2>

          <!-- Link to Details Page: talleres/[slug] -->
          <NuxtLink :to="`/talleres/${workshop.url}`" class="details-link">
            <span>Ver detalles del taller</span>
            <span aria-hidden="true" class="arrow">&rarr;</span>
          </NuxtLink>
        </div>
      </article>
    </section>

    <!-- Empty State -->
    <div v-else class="state-box empty">
      <p>Actualmente no hay talleres programados. Vuelve pronto para nuevas fechas.</p>
    </div>
  </main>
</template>

<style scoped>
.hub-container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  color: #1f2937;
}

.hub-header {
  text-align: center;
  margin-bottom: 3rem;
}

.hub-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.025em;
}

.hub-subtitle {
  font-size: 1.125rem;
  color: #4b5563;
  margin: 0;
}

/* Card List Layout */
.workshops-list {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* Horizontal Card: Image on Left, Content on Right */
.workshop-card {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.workshop-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-color: #cbd5e1;
}

/* Left Image Section */
.card-image-wrapper {
  flex-shrink: 0;
  width: 280px;
  min-height: 200px;
  background-color: #f3f4f6;
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Right Content Section */
.card-content {
  flex: 1;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.meta-item.date {
  color: #1d4ed8;
  background-color: #eff6ff;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
}

.meta-item.location {
  color: #4b5563;
}

.card-title {
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.35;
  color: #111827;
  margin: 0 0 1.25rem 0;
}

/* Link to Details */
.details-link {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #1f2937;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease;
}

.details-link:hover {
  background-color: #2563eb;
}

.details-link .arrow {
  transition: transform 0.2s ease;
}

.details-link:hover .arrow {
  transform: translateX(3px);
}

/* States */
.state-box {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 1rem;
}

.state-box.error {
  background-color: #fef2f2;
  border-color: #fca5a5;
  color: #991b1b;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.25rem;
  background-color: #ef4444;
  color: #ffffff;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
}

.retry-btn:hover {
  background-color: #dc2626;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive: Stack vertically on small screens */
@media (max-width: 640px) {
  .workshop-card {
    flex-direction: column;
  }

  .card-image-wrapper {
    width: 100%;
    height: 180px;
    min-height: unset;
  }

  .card-content {
    padding: 1.25rem;
  }

  .hub-title {
    font-size: 2rem;
  }
}
</style>
