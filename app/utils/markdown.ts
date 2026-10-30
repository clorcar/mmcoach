import type { MarkdownBlock, MarkdownInline } from '~/types/content'

const LIST_ITEM = /^\s*[-*+]\s+(.*)$/
// Contentful's Markdown editor writes __bold__ and _italic_; * and ** are accepted too.
// Underscores only count at word edges so snake_case text stays untouched.
const INLINE_TOKEN = /(\*\*[^*]+\*\*|(?<!\w)__[^_]+__(?!\w)|\*[^*]+\*|(?<!\w)_[^_]+_(?!\w))/

function parseInline(text: string): MarkdownInline[] {
  return text
    .split(INLINE_TOKEN)
    .filter(Boolean)
    .map((part) => {
      if (part.length > 4 && (part.startsWith('**') || part.startsWith('__'))) {
        const marker = part.slice(0, 2)
        if (part.endsWith(marker)) return { text: part.slice(2, -2), bold: true, italic: false }
      }
      if (part.length > 2 && (part.startsWith('*') || part.startsWith('_'))) {
        const marker = part[0]!
        if (part.endsWith(marker)) return { text: part.slice(1, -1), bold: false, italic: true }
      }
      return { text: part, bold: false, italic: false }
    })
}

/**
 * Parses the small Markdown subset used in Contentful long text fields: paragraphs, bullet lists
 * and **bold** / *italic* text (also __bold__ and _italic_). Returns blocks so components render them without `v-html`.
 */
export function parseMarkdown(source: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = []
  let paragraph: string[] = []
  let list: MarkdownInline[][] = []

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', content: parseInline(paragraph.join(' ')) })
      paragraph = []
    }
  }
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: 'list', items: list })
      list = []
    }
  }

  for (const line of source.split(/\r?\n/)) {
    const item = LIST_ITEM.exec(line)
    if (item) {
      flushParagraph()
      list.push(parseInline(item[1]!.trim()))
    } else if (line.trim()) {
      flushList()
      paragraph.push(line.trim())
    } else {
      flushParagraph()
      flushList()
    }
  }
  flushParagraph()
  flushList()

  return blocks
}

/**
 * Plain text of a Markdown string, with blocks separated by spaces.
 */
export function markdownToPlainText(source: string): string {
  const text = (parts: MarkdownInline[]) => parts.map((part) => part.text).join('')

  return parseMarkdown(source)
    .map((block) =>
      block.type === 'paragraph' ? text(block.content) : block.items.map(text).join(' '),
    )
    .join(' ')
}
