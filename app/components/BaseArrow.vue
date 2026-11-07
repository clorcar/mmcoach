<script setup lang="ts">
withDefaults(defineProps<{ direction?: 'right' | 'left' | 'up-right' | 'down' }>(), {
  direction: 'right',
})

const PATHS = {
  right: 'M5 12h14M13 6l6 6-6 6',
  left: 'M19 12H5M11 6l-6 6 6 6',
  'up-right': 'M7 17L17 7M8 7h9v9',
  down: 'M12 5v14M6 13l6 6 6-6',
} as const
</script>

<template>
  <svg
    aria-hidden="true"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="base-arrow"
  >
    <path :d="PATHS[direction]" />
  </svg>
</template>

<style lang="scss" scoped>
.base-arrow {
  flex: none;
}
</style>
