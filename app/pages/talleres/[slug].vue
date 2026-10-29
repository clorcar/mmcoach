<script setup lang="ts">
/**
 * Default placeholder image when a workshop doesn't have an image assigned in Contentful.
 */
const DEFAULT_IMAGE = '/images/default-workshop.svg'

const route = useRoute()
const slug = route.params.slug as string

const { workshop, errors } = await useWorkshopByUrl(slug)

// Unknown slugs render a 404 (and fail prerendering instead of shipping an empty page)
if (!workshop.value && !errors.value?.length) {
  throw createError({ statusCode: 404, statusMessage: 'Taller no encontrado', fatal: true })
}

useSeoMeta({
  title: () => workshop.value?.titulo ?? 'Taller',
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
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(isoDate))

    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  } catch {
    return isoDate
  }
}

function formatPrice(price?: number | null): string {
  if (price === null || price === undefined) return ''
  if (price === 0) return 'Gratuito'
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}
</script>

<template>
  <main class="detail-container">
    <NuxtLink to="/talleres" class="back-link">
      <span aria-hidden="true">&larr;</span> Volver a talleres
    </NuxtLink>

    <!-- Error State -->
    <div v-if="errors && errors.length" class="state-box error">
      <h2>No se pudo cargar el taller</h2>
      <ul>
        <li v-for="(err, index) in errors" :key="index">
          {{ err.message }}
        </li>
      </ul>
    </div>

    <article v-else-if="workshop" class="workshop-detail">
      <img
        :src="workshop.imagen?.url || DEFAULT_IMAGE"
        :alt="workshop.imagen?.title || workshop.titulo"
        class="hero-image"
      />

      <header class="detail-header">
        <h1 class="detail-title">{{ workshop.titulo }}</h1>
        <div class="meta-row">
          <span class="meta-item date">📅 {{ formatDate(workshop.fecha) }}</span>
          <span class="meta-item location">📍 {{ workshop.localizacion }}</span>
          <span v-if="formatPrice(workshop.precio)" class="meta-item price">
            💶 {{ formatPrice(workshop.precio) }}
          </span>
        </div>
      </header>

      <ContentfulRichTextRenderer :content="workshop.descripcion" />
    </article>
  </main>
</template>

<style scoped>
.detail-container {
  max-width: 800px;
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

.back-link {
  display: inline-flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: #4b5563;
  font-weight: 500;
  text-decoration: none;
}

.back-link:hover {
  color: #2563eb;
}

.hero-image {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 1rem;
  background-color: #f3f4f6;
  display: block;
}

.detail-header {
  margin: 2rem 0 1.5rem 0;
}

.detail-title {
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.2;
  color: #111827;
  margin: 0 0 1rem 0;
  letter-spacing: -0.025em;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.meta-item.date {
  color: #1d4ed8;
  background-color: #eff6ff;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
}

.meta-item.location,
.meta-item.price {
  color: #4b5563;
}

.state-box.error {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #fef2f2;
  border: 1px dashed #fca5a5;
  border-radius: 1rem;
  color: #991b1b;
}

@media (max-width: 640px) {
  .detail-title {
    font-size: 1.75rem;
  }
}
</style>
