<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 22 })
</script>

<template>
  <svg
    aria-hidden="true"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <template v-if="name === 'instagram'">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </template>
    <template v-else>
      <path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9 8.5c-.3 3.2 2.3 6.2 5.5 6.5l1.2-1.5-2-1-.9.9c-.9-.4-1.6-1.1-2-2l.9-.9-1-2z" />
    </template>
  </svg>
</template>
