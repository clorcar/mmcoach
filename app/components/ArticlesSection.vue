<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    limit?: number
  }>(),
  {
    limit: 6,
  },
)

// Fetch articles sorted by publication date descending
const { articles, total, pending, errors, refresh } = await useArticles({
  limit: props.limit,
  order: 'fechaPublicacion_DESC',
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
</script>

<template>
  <section class="articles-container">
    <header class="articles-header">
      <h2>Artículos y Noticias ({{ total }})</h2>
      <p class="subtitle">Consejos, reflexiones y recursos sobre coaching y desarrollo</p>
    </header>

    <!-- Loading State -->
    <div v-if="pending" class="state-message">
      <p>Cargando artículos...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errors && errors.length" class="error-box">
      <p>Ocurrió un error al cargar los artículos.</p>
      <ul>
        <li v-for="(err, index) in errors" :key="index">
          {{ err.message }}
        </li>
      </ul>
      <button class="btn" @click="() => refresh()">Reintentar</button>
    </div>

    <!-- Articles Grid -->
    <div v-else-if="articles.length" class="grid">
      <article v-for="article in articles" :key="article.sys.id" class="card">
        <div v-if="article.imagenPrincipal" class="image-wrapper">
          <img
            :src="article.imagenPrincipal.url"
            :alt="article.imagenPrincipal.title || article.titulo"
            class="cover-image"
          />
        </div>

        <div class="card-body">
          <time class="publish-date">{{ formatDate(article.fechaPublicacion) }}</time>
          <h3 class="title">{{ article.titulo }}</h3>
          <p class="summary">{{ article.resumen }}</p>

          <NuxtLink :to="`/articulos/${article.url}`" class="link-btn"> Leer artículo </NuxtLink>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="state-message">
      <p>No hay artículos publicados todavía.</p>
    </div>
  </section>
</template>

<style scoped>
.articles-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.articles-header {
  text-align: center;
  margin-bottom: 2rem;
}

.articles-header h2 {
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

.publish-date {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: #111827;
}

.summary {
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
