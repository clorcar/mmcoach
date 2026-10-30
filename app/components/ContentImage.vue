<script setup lang="ts">
import type { Image } from '~/types/content'

const PLACEHOLDERS = {
  workshop: { src: '/images/default-workshop.svg', width: 400, height: 200 },
  article: { src: '/images/default-article.svg', width: 240, height: 240 },
} as const

const props = withDefaults(
  defineProps<{
    image: Image | null
    /** Illustration shown when the entry has no image */
    placeholder: keyof typeof PLACEHOLDERS
    /** @nuxt/image `sizes`, using the screens in nuxt.config.ts */
    sizes: string
    /** Above-the-fold image (LCP): load eagerly with high priority and preload it */
    priority?: boolean
  }>(),
  {
    priority: false,
  },
)

const fallback = computed(() => PLACEHOLDERS[props.placeholder])
</script>

<template>
  <NuxtPicture
    v-if="props.image"
    :src="props.image.url"
    :alt="props.image.alt"
    :width="props.image.width"
    :height="props.image.height"
    :sizes="props.sizes"
    :loading="props.priority ? 'eager' : 'lazy'"
    :fetchpriority="props.priority ? 'high' : 'auto'"
    :preload="props.priority"
    class="content-image"
  />
  <!-- Decorative placeholder: the entry title is already next to it -->
  <img
    v-else
    :src="fallback.src"
    alt=""
    :width="fallback.width"
    :height="fallback.height"
    :loading="props.priority ? 'eager' : 'lazy'"
    class="content-image"
  />
</template>

<style lang="scss" scoped>
.content-image,
.content-image :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
