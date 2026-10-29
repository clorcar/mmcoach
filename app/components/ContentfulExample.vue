<script setup lang="ts">
interface HomepageItem {
  title: string
  subtitle?: string
  heroImage?: {
    title?: string
    url: string
  }
}

interface HomepageCollectionData {
  homepageCollection: {
    items: HomepageItem[]
  }
}

const HOMEPAGE_QUERY = `
  query GetHomepage {
    homepageCollection(limit: 1) {
      items {
        title
        subtitle
        heroImage {
          title
          url
        }
      }
    }
  }
`

// Invoke the composable (compatible with both `await` and direct invocation)
const { data, errors, pending, refresh } =
  await useContentfulQuery<HomepageCollectionData>(HOMEPAGE_QUERY)

// Extract the first homepage entry reactively
const homepage = computed(() => data.value?.homepageCollection?.items?.[0] ?? null)
</script>

<template>
  <section class="contentful-section">
    <!-- Pending / Loading State -->
    <div v-if="pending" class="loading">
      <p>Loading homepage content...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errors" class="error-container">
      <h3>GraphQL Errors:</h3>
      <ul>
        <li v-for="(err, index) in errors" :key="index">
          {{ err.message }}
        </li>
      </ul>
      <button @click="() => refresh()">Retry</button>
    </div>

    <!-- Data Loaded State -->
    <article v-else-if="homepage" class="homepage-content">
      <h1>{{ homepage.title }}</h1>
      <p v-if="homepage.subtitle">{{ homepage.subtitle }}</p>
      <img
        v-if="homepage.heroImage"
        :src="homepage.heroImage.url"
        :alt="homepage.heroImage.title || homepage.title"
      />
      <div class="actions">
        <button @click="() => refresh()">Refresh Content</button>
      </div>
    </article>

    <!-- Empty State -->
    <div v-else class="empty">
      <p>No homepage entries found.</p>
    </div>
  </section>
</template>

<style scoped>
.contentful-section {
  padding: 1.5rem;
  font-family: sans-serif;
}

.error-container {
  color: #dc2626;
  border: 1px solid #fecaca;
  background-color: #fef2f2;
  padding: 1rem;
  border-radius: 0.5rem;
}

.loading {
  color: #6b7280;
  font-style: italic;
}

.homepage-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
  margin-top: 1rem;
}

.actions {
  margin-top: 1rem;
}

button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #f9fafb;
}

button:hover {
  background-color: #f3f4f6;
}
</style>
