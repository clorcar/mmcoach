<script setup lang="ts">
defineProps<{
  /** The page's <h1> */
  title: string
  summary: string
  /** ISO date of the last change to the text */
  updated: string
}>()
</script>

<template>
  <div>
    <PageHeader eyebrow="Legal" :title="title" :summary="summary" />

    <article class="legal-page">
      <p class="legal-page__updated">
        Última actualización: <time :datetime="updated">{{ formatDate(updated) }}</time>
      </p>
      <slot />
    </article>
  </div>
</template>

<style lang="scss" scoped>
.legal-page {
  @include container;
  @include f-17-400;
  padding-block: $space-8 $space-10;
  color: $color-text-muted;

  :deep(:where(p, ul)) {
    max-width: $text-measure;
    margin-bottom: $space-4;
  }

  :deep(h2) {
    @include f-24-500;
    max-width: $text-measure;
    margin: $space-7 0 $space-3;
    color: $color-heading;
  }

  :deep(ul) {
    padding-left: $space-5;
  }

  :deep(strong) {
    font-weight: 600;
    color: $color-heading;
  }

  :deep(a) {
    text-decoration: underline;
  }
}

.legal-page__updated {
  @include f-14-400;
  color: $color-text-subtle;
}
</style>
