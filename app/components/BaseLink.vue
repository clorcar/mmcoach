<script setup lang="ts">
defineProps<{ to: string }>()
</script>

<template>
  <NuxtLink :to="to" class="base-link">
    <slot />
    <BaseArrow />
  </NuxtLink>
</template>

<style lang="scss" scoped>
.base-link {
  @include link-arrow;
}
</style>
