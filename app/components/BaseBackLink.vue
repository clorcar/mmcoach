<script setup lang="ts">
defineProps<{ to: string }>()
</script>

<template>
  <NuxtLink :to="to" class="back-link">
    <BaseArrow direction="left" />
    <slot />
  </NuxtLink>
</template>

<style lang="scss" scoped>
.back-link {
  @include link-arrow;
}
</style>
