<script setup lang="ts">
defineProps<{
  /** id of the <h2>, referenced by the section's aria-labelledby */
  titleId: string
  eyebrow?: string
  title: string
  link?: { to: string; label: string }
}>()
</script>

<template>
  <div class="section-header">
    <div class="section-header__text">
      <p v-if="eyebrow" class="section-header__eyebrow">{{ eyebrow }}</p>
      <h2 :id="titleId" class="section-header__title">{{ title }}</h2>
    </div>
    <NuxtLink v-if="link" :to="link.to" class="section-header__link">
      {{ link.label }} <span aria-hidden="true">→</span>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.section-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: $space-3;
  margin-bottom: $space-6;
}

.section-header__text {
  display: flex;
  flex-direction: column;
  gap: $space-1;
}

.section-header__eyebrow {
  @include eyebrow;
}

.section-header__title {
  @include f-32-500;
}

.section-header__link {
  @include f-17-600;
  padding-block: $space-3;
}
</style>
