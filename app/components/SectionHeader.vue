<script setup lang="ts">
defineProps<{
  /** id of the <h2>, referenced by the section's aria-labelledby */
  titleId: string
  eyebrow?: string
  title: string
  /** Supporting sentence under the title */
  summary?: string
  link?: { to: string; label: string }
}>()
</script>

<template>
  <div class="section-header">
    <div class="section-header__text">
      <p v-if="eyebrow" class="section-header__eyebrow">{{ eyebrow }}</p>
      <h2 :id="titleId" class="section-header__title">{{ title }}</h2>
      <p v-if="summary" class="section-header__summary">{{ summary }}</p>
    </div>
    <BaseLink v-if="link" :to="link.to">{{ link.label }}</BaseLink>
  </div>
</template>

<style lang="scss" scoped>
.section-header {
  display: flex;
  flex-direction: column;
  gap: $space-5;
  align-items: flex-start;
  margin-bottom: $space-6;

  @include bp(tablet-landscape) {
    flex-direction: row;
    gap: $space-3;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: $space-8;
  }
}

.section-header__text {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.section-header__eyebrow {
  @include eyebrow;
}

.section-header__title {
  @include f-32-400;
  letter-spacing: $letter-spacing-tight;

  @include bp(tablet-portrait) {
    @include f-38-400;
  }

  @include bp(tablet-landscape) {
    @include f-42-400;
  }
}

.section-header__summary {
  max-width: $text-measure;
  color: $color-text-muted;
}
</style>
