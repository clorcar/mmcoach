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
    <div class="page-header__content">
      <p class="page-header__eyebrow">{{ eyebrow }}</p>
      <h1 class="page-header__title">{{ title }}</h1>
      <p class="page-header__summary">{{ summary }}</p>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.page-header {
  display: flex;
  align-items: center;
  // Same height as the home banner; grows only when the text needs more room
  min-height: $site-banner-height;
  background-color: $color-primary-soft;
}

.page-header__content {
  @include container;
  display: flex;
  flex-direction: column;
  gap: $space-3;
  width: 100%;
  padding-block: $space-6;
}

.page-header__eyebrow {
  @include eyebrow;
}

.page-header__title {
  @include f-32-500;
  max-width: $text-measure;
  color: $color-heading;

  @include bp(tablet-portrait) {
    @include f-40-500;
  }
}

.page-header__summary {
  max-width: $text-measure;
  color: $color-text-muted;
}
</style>
