<script setup lang="ts">
const props = defineProps<{ url: string }>()

const COPIED_MESSAGE_MS = 2500

const copied = ref(false)
const facebookUrl = computed(
  () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.url)}`,
)

async function copyLink() {
  await navigator.clipboard.writeText(props.url)
  copied.value = true
  setTimeout(() => (copied.value = false), COPIED_MESSAGE_MS)
}
</script>

<template>
  <div class="share">
    <p class="share__label">Compartir:</p>
    <a :href="facebookUrl" class="share__button" rel="noopener">
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z"
        />
      </svg>
      Facebook
    </a>
    <button type="button" class="share__button" @click="copyLink">
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
        <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
      </svg>
      Copiar enlace
    </button>
    <p class="share__status" role="status">{{ copied ? 'Enlace copiado' : '' }}</p>
  </div>
</template>

<style lang="scss" scoped>
.share {
  @include f-16-400;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $space-3;
  padding-top: $space-5;
  border-top: $border-width solid $color-border;
}

.share__label {
  color: $color-text-muted;
}

.share__button {
  @include button(outline);
  @include f-16-500;
  gap: $space-2;
  padding: $space-2 $space-4;
  font-family: inherit;
  cursor: pointer;
  background: none;
}

.share__status {
  @include f-14-400;
  color: $color-text-subtle;
}
</style>
