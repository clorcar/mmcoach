<script setup lang="ts">
import type { Image } from '~/types/content'

const props = withDefaults(
  defineProps<{
    image: Image | null
    /** @nuxt/image `sizes`, using the screens in nuxt.config.ts */
    sizes: string
    /** Above-the-fold image (LCP): load eagerly with high priority and preload it */
    priority?: boolean
  }>(),
  {
    priority: false,
  },
)

const DEFAULT_IMAGE = '/images/default-workshop.svg'
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
    class="workshop-image"
  />
  <!-- Decorative placeholder: the workshop title is already next to it -->
  <img
    v-else
    :src="DEFAULT_IMAGE"
    alt=""
    width="600"
    height="400"
    :loading="props.priority ? 'eager' : 'lazy'"
    class="workshop-image"
  />
</template>

<style lang="scss" scoped>
.workshop-image,
.workshop-image :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
