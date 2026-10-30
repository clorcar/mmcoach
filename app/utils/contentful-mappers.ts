import {
  BLOCKS,
  type Block,
  type Document,
  type Inline,
  type Text,
} from '@contentful/rich-text-types'
import type { ContentfulAsset, ContentfulRichText } from '~/types/contentful'
import type { Articulos } from '~/types/articles'
import type { Servicios } from '~/types/services'
import type { Talleres } from '~/types/talleres'
import type { Testimonio } from '~/types/testimonios'
import type {
  Article,
  Image,
  RichTextContent,
  Service,
  Testimonial,
  Workshop,
} from '~/types/content'

/**
 * Alt text is the asset description; the entry title is the fallback when the editor left it empty.
 */
export function mapImage(
  asset: ContentfulAsset | null | undefined,
  fallbackAlt: string,
): Image | null {
  if (!asset?.url) return null

  return {
    // Contentful returns protocol-relative URLs; meta tags and JSON-LD need absolute ones
    url: asset.url.startsWith('//') ? `https:${asset.url}` : asset.url,
    alt: asset.description || fallbackAlt,
    width: asset.width ?? undefined,
    height: asset.height ?? undefined,
  }
}

export function mapRichText(field: ContentfulRichText | null | undefined): RichTextContent {
  const images: Record<string, Image> = {}
  for (const asset of field?.links?.assets?.block ?? []) {
    const image = asset.contentType?.startsWith('image/') ? mapImage(asset, '') : null
    if (image) images[asset.sys.id] = image
  }

  return {
    document: field?.json ?? { nodeType: BLOCKS.DOCUMENT, data: {}, content: [] },
    images,
  }
}

/**
 * Plain text of a rich text document, with blocks separated by spaces.
 */
export function richTextToPlainText(document: Document): string {
  const collect = (node: Block | Inline | Text): string =>
    node.nodeType === 'text' ? node.value : node.content.map(collect).join(' ')

  return document.content.map(collect).join(' ').replace(/\s+/g, ' ').trim()
}

export function mapWorkshop(entry: Talleres): Workshop {
  const description = mapRichText(entry.descripcion)

  return {
    id: entry.sys.id,
    title: entry.titulo,
    slug: entry.url,
    date: entry.fecha,
    location: entry.localizacion,
    price: entry.precio ?? null,
    image: mapImage(entry.imagen, entry.titulo),
    summary: entry.resumen ?? '',
    description,
    descriptionText: richTextToPlainText(description.document),
  }
}

const READING_WORDS_PER_MINUTE = 200

export function mapArticle(entry: Articulos): Article {
  const content = mapRichText(entry.contenido)
  const wordCount = richTextToPlainText(content.document).split(' ').filter(Boolean).length

  return {
    id: entry.sys.id,
    title: entry.titulo,
    slug: entry.url,
    publishedAt: entry.fechaPublicacion,
    updatedAt: entry.sys.publishedAt ?? null,
    summary: entry.resumen,
    image: mapImage(entry.imagenPrincipal, entry.titulo),
    content,
    readingMinutes: Math.max(1, Math.round(wordCount / READING_WORDS_PER_MINUTE)),
  }
}

export function mapService(entry: Servicios): Service {
  return {
    id: entry.sys.id,
    title: entry.titulo,
    subtitle: entry.subtitulo,
    durationMinutes: entry.duracion ?? null,
    price: entry.precio ?? null,
    modality: entry.modalidad,
    description: entry.descripcion,
  }
}

export function mapTestimonial(entry: Testimonio): Testimonial {
  return {
    id: entry.sys.id,
    name: entry.nombre,
    context: entry.contexto,
    photo: mapImage(entry.foto, entry.nombre),
    opinion: entry.opinion,
    rating: entry.valoracion,
  }
}
