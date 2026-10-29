<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    limit?: number
  }>(),
  {
    limit: 6,
  }
)

// Fetch testimonials using the dedicated composable
const { testimonials, total, pending, errors, refresh } = await useTestimonials({
  limit: props.limit,
  order: 'sys_firstPublishedAt_DESC',
})
</script>

<template>
  <section class="testimonios-container">
    <header class="testimonios-header">
      <h2>Testimonios ({{ total }})</h2>
      <p class="subtitle">Lo que dicen nuestros clientes y atletas</p>
    </header>

    <!-- Loading State -->
    <div v-if="pending" class="state-message">
      <p>Cargando testimonios...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errors && errors.length" class="error-box">
      <p>Ocurrió un error al cargar los testimonios.</p>
      <ul>
        <li v-for="(err, index) in errors" :key="index">
          {{ err.message }}
        </li>
      </ul>
      <button class="btn" @click="() => refresh()">Reintentar</button>
    </div>

    <!-- Testimonials Grid -->
    <div v-else-if="testimonials.length" class="grid">
      <article
        v-for="item in testimonials"
        :key="item.sys.id"
        class="card"
      >
        <div class="card-header">
          <img
            v-if="item.foto"
            :src="item.foto.url"
            :alt="item.foto.title || item.nombre"
            class="avatar"
          />
          <div v-else class="avatar-placeholder">
            {{ item.nombre.charAt(0).toUpperCase() }}
          </div>

          <div class="author-info">
            <h3 class="author-name">{{ item.nombre }}</h3>
            <span class="author-context">{{ item.contexto }}</span>
          </div>
        </div>

        <div class="rating">
          <span
            v-for="star in 5"
            :key="star"
            class="star"
            :class="{ active: star <= item.valoracion }"
          >
            ★
          </span>
          <span class="rating-number">({{ item.valoracion }}/5)</span>
        </div>

        <p class="opinion">"{{ item.opinion }}"</p>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="state-message">
      <p>No hay testimonios disponibles en este momento.</p>
    </div>
  </section>
</template>

<style scoped>
.testimonios-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.testimonios-header {
  text-align: center;
  margin-bottom: 2rem;
}

.testimonios-header h2 {
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
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 1.1rem;
  margin: 0;
  color: #1f2937;
}

.author-context {
  font-size: 0.875rem;
  color: #6b7280;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.star {
  color: #d1d5db;
  font-size: 1.25rem;
}

.star.active {
  color: #f59e0b;
}

.rating-number {
  font-size: 0.75rem;
  color: #6b7280;
  margin-left: 0.25rem;
}

.opinion {
  color: #374151;
  line-height: 1.5;
  font-style: italic;
  margin: 0;
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
