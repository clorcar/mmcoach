<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 2 })

const { articles } = await useArticles({ limit: props.limit, order: 'fechaPublicacion_DESC' })
</script>

<template>
  <section id="articulos" class="articles" aria-labelledby="articles-title">
    <SectionHeader
      title-id="articles-title"
      eyebrow="Del blog"
      title="Últimos artículos"
      :link="{ to: '/articulos', label: 'Leer todos' }"
    />

    <div v-if="articles.length" class="articles__grid">
      <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
    </div>
    <p v-else class="articles__empty">Muy pronto publicaré los primeros artículos.</p>
  </section>
</template>

<style lang="scss" scoped>
.articles {
  @include container;
  padding-block: $space-8 $space-5;
}

.articles__grid {
  @include auto-grid;
}

.articles__empty {
  color: $color-text-muted;
}
</style>
