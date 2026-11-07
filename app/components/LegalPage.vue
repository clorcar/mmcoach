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
  <div class="legal">
    <PageHeader eyebrow="Legal" :title="title" :summary="summary" />

    <article class="legal__article">
      <p class="legal__updated">
        Última actualización: <time :datetime="updated">{{ formatDate(updated) }}</time>
      </p>
      <div class="legal__text">
        <slot />
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.legal {
  border-bottom: $border-width solid $color-border;
}

.legal__article {
  @include container;
  padding-bottom: $space-8;

  @include bp(tablet-portrait) {
    padding-bottom: $space-10;
  }
}

.legal__updated {
  @include f-14-400;
  margin-bottom: $space-5-5;
  color: $color-text-muted;
}

.legal__text {
  @include prose;
  max-width: $article-body-width;

  // The first heading follows the "updated" line, which already leaves the space
  > :deep(:first-child) {
    margin-top: 0;
  }
}
</style>
