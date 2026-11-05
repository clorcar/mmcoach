<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 3 })

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

    <div v-if="articles.length" class="articles__list">
      <ArticleCard v-for="article in articles" :key="article.id" :article="article" inline />
    </div>
    <p v-else class="articles__empty">Muy pronto publicaré los primeros artículos.</p>
  </section>
</template>

<style lang="scss" scoped>
.articles {
  @include container;
  padding-block: $space-8;

  @include bp(tablet-landscape) {
    padding-block: $space-10;
  }
}

.articles__list {
  display: flex;
  flex-direction: column;
  gap: $space-7;

  @include bp(tablet-portrait) {
    gap: $space-6;
  }

  @include bp(tablet-landscape) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: $space-6;
  }
}

.articles__empty {
  color: $color-text-muted;
}
</style>
