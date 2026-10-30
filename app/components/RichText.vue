<script setup lang="ts">
import { h, type Component, type VNodeChild } from 'vue'
import {
  BLOCKS,
  INLINES,
  MARKS,
  type Block,
  type Inline,
  type Text,
} from '@contentful/rich-text-types'
import { NuxtImg } from '#components'
import type { RichTextContent } from '~/types/content'

const props = defineProps<{
  content: RichTextContent
}>()

// Pages own the only <h1>, so content headings start at <h2>
const HEADING_TAGS: Record<string, string> = {
  [BLOCKS.HEADING_1]: 'h2',
  [BLOCKS.HEADING_2]: 'h2',
  [BLOCKS.HEADING_3]: 'h3',
  [BLOCKS.HEADING_4]: 'h4',
  [BLOCKS.HEADING_5]: 'h5',
  [BLOCKS.HEADING_6]: 'h6',
}

const BLOCK_TAGS: Record<string, string> = {
  [BLOCKS.PARAGRAPH]: 'p',
  [BLOCKS.UL_LIST]: 'ul',
  [BLOCKS.OL_LIST]: 'ol',
  [BLOCKS.LIST_ITEM]: 'li',
  [BLOCKS.QUOTE]: 'blockquote',
  [BLOCKS.TABLE]: 'table',
  [BLOCKS.TABLE_ROW]: 'tr',
  [BLOCKS.TABLE_CELL]: 'td',
  [BLOCKS.TABLE_HEADER_CELL]: 'th',
  ...HEADING_TAGS,
}

const MARK_TAGS: Record<string, string> = {
  [MARKS.BOLD]: 'strong',
  [MARKS.ITALIC]: 'em',
  [MARKS.UNDERLINE]: 'u',
  [MARKS.CODE]: 'code',
  [MARKS.SUPERSCRIPT]: 'sup',
  [MARKS.SUBSCRIPT]: 'sub',
}

function renderText(node: Text): VNodeChild {
  return node.marks.reduce<VNodeChild>(
    (child, mark) => (MARK_TAGS[mark.type] ? h(MARK_TAGS[mark.type]!, [child]) : child),
    node.value,
  )
}

function renderEmbeddedImage(node: Block): VNodeChild {
  const image = props.content.images[node.data.target?.sys?.id]
  if (!image) return null

  // The caption carries the alt text, so the image itself stays empty to avoid reading it twice.
  // NuxtImg's generic provider typing doesn't fit h()'s overloads; the props below are valid
  return h('figure', { class: 'rich-text__figure' }, [
    h(NuxtImg as Component, {
      src: image.url,
      alt: '',
      width: image.width,
      height: image.height,
      sizes: '100vw tablet-portrait:800px',
      loading: 'lazy',
      class: 'rich-text__image',
    }),
    image.alt ? h('figcaption', { class: 'rich-text__caption' }, image.alt) : null,
  ])
}

function renderNode(node: Block | Inline | Text): VNodeChild {
  if (node.nodeType === 'text') return renderText(node)

  const children = () => node.content.map(renderNode)

  switch (node.nodeType) {
    case BLOCKS.HR:
      return h('hr')
    case BLOCKS.EMBEDDED_ASSET:
      return renderEmbeddedImage(node)
    case INLINES.HYPERLINK:
      return h('a', { href: node.data.uri }, children())
  }

  const tag = BLOCK_TAGS[node.nodeType]
  // Embedded/linked entries are not queried yet: keep their text, drop the wrapper
  return tag ? h(tag, children()) : children()
}

const RichTextContent = () => props.content.document.content.map(renderNode)
</script>

<template>
  <div class="rich-text">
    <RichTextContent />
  </div>
</template>

<style lang="scss" scoped>
.rich-text {
  @include f-18-400;
  color: $color-text-muted;

  :deep(:where(p, ul, ol, blockquote, table)) {
    margin-bottom: $space-4;
  }

  :deep(:where(h2, h3, h4, h5, h6)) {
    margin: $space-6 0 $space-3;
  }

  :deep(h2) {
    @include f-24-500;
    color: $color-heading;
  }

  :deep(h3) {
    @include f-22-500;
    color: $color-heading;
  }

  :deep(:where(ul, ol)) {
    padding-left: $space-5;
  }

  :deep(strong) {
    font-weight: 600;
    color: $color-heading;
  }

  :deep(a) {
    text-decoration: underline;
  }

  :deep(blockquote) {
    @include f-20-400;
    padding: $space-5 $space-6;
    font-family: var(--font-family-heading);
    font-style: italic;
    color: $color-heading;
    background-color: $color-primary-soft;
    border-radius: $radius-xl;
  }

  :deep(hr) {
    margin-block: $space-5;
    border: 0;
    border-top: $border-width solid $color-border;
  }

  :deep(.rich-text__figure) {
    margin: $space-5 0;
  }

  :deep(.rich-text__image) {
    width: 100%;
    height: auto;
    border-radius: $radius-lg;
  }

  :deep(.rich-text__caption) {
    @include f-14-400;
    margin-top: $space-2;
    color: $color-text-subtle;
    text-align: center;
  }
}
</style>
