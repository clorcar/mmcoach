<script setup lang="ts">
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, type Document } from '@contentful/rich-text-types'
import type { ContentfulRichText } from '~/types/contentful'

const props = defineProps<{
  content: ContentfulRichText | null | undefined
}>()

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Text nodes are escaped by the renderer; embedded assets are resolved from `links.assets.block`
const html = computed(() => {
  if (!props.content?.json) return ''

  const assetsById = new Map(
    (props.content.links?.assets?.block ?? []).map((asset) => [asset.sys.id, asset]),
  )

  return documentToHtmlString(props.content.json as Document, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = assetsById.get(node.data.target.sys.id)
        if (!asset?.url || !asset.contentType?.startsWith('image/')) return ''

        const alt = escapeAttribute(asset.description || asset.title || '')
        const size =
          asset.width && asset.height ? ` width="${asset.width}" height="${asset.height}"` : ''
        return `<img src="${escapeAttribute(asset.url)}" alt="${alt}"${size} loading="lazy" />`
      },
    },
  })
})
</script>

<template>
  <div class="rich-text" v-html="html" />
</template>

<style scoped>
.rich-text {
  line-height: 1.7;
  color: #374151;
}

.rich-text :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
  margin: 1.5rem 0;
}

.rich-text :deep(a) {
  color: #2563eb;
}
</style>
