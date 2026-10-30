<script setup lang="ts">
import type { MarkdownInline } from '~/types/content'

const props = defineProps<{ source: string }>()

const blocks = computed(() => parseMarkdown(props.source))

function inlineTag({ bold, italic }: MarkdownInline) {
  if (bold) return 'strong'
  return italic ? 'em' : 'span'
}
</script>

<template>
  <div class="markdown">
    <template v-for="(block, index) in blocks" :key="index">
      <p v-if="block.type === 'paragraph'">
        <component :is="inlineTag(part)" v-for="(part, i) in block.content" :key="i">{{
          part.text
        }}</component>
      </p>
      <ul v-else class="markdown__list">
        <li v-for="(item, i) in block.items" :key="i">
          <component :is="inlineTag(part)" v-for="(part, j) in item" :key="j">{{
            part.text
          }}</component>
        </li>
      </ul>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.markdown {
  display: flex;
  flex-direction: column;
  gap: $space-3;
}

.markdown__list {
  display: flex;
  flex-direction: column;
  gap: $space-1;
  padding-left: $space-5;
}
</style>
