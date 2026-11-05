<script setup lang="ts">
defineProps<{
  eyebrow: string
  /** The page's <h1> */
  title: string
  summary: string
}>()
</script>

<template>
  <header class="page-header">
    <p class="page-header__eyebrow">{{ eyebrow }}</p>
    <h1 class="page-header__title">{{ title }}</h1>
    <p class="page-header__summary">{{ summary }}</p>
  </header>
</template>

<style lang="scss" scoped>
.page-header {
  @include container;
  display: flex;
  flex-direction: column;
  gap: $space-4;
  padding-block: $space-8;

  @include bp(tablet-landscape) {
    gap: $space-5;
    padding-block: $space-9;
  }
}

.page-header__eyebrow {
  @include eyebrow;
}

.page-header__title {
  @include f-44-400;
  letter-spacing: $letter-spacing-tight;
  max-width: $text-measure;

  @include bp(tablet-landscape) {
    @include f-56-400;
    max-width: $page-title-measure;
  }
}

.page-header__summary {
  max-width: $text-measure;
  color: $color-text-muted;
}
</style>
