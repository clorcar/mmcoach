import type { Document } from '@contentful/rich-text-types'

/**
 * Lean content types consumed by components. Built from Contentful responses
 * in `~/utils/contentful-mappers`.
 */
export interface Image {
  url: string
  alt: string
  width?: number
  height?: number
}

export interface RichTextContent {
  document: Document
  /** Embedded images keyed by asset id */
  images: Record<string, Image>
}

export interface Workshop {
  id: string
  title: string
  slug: string
  /** ISO 8601 date-time */
  date: string
  location: string
  price: number | null
  image: Image | null
  description: RichTextContent
  /** Plain-text description, for meta descriptions and structured data */
  descriptionText: string
}

export interface Article {
  id: string
  title: string
  slug: string
  /** ISO 8601 date */
  publishedAt: string
  /** ISO 8601 date-time of the last published change */
  updatedAt: string | null
  summary: string
  image: Image | null
  content: RichTextContent
}

export type ServiceModality = 'Presencial' | 'Online'

export interface Service {
  id: string
  title: string
  slug: string
  subtitle: string
  durationMinutes: number | null
  modality: ServiceModality
  description: string
}

export interface Testimonial {
  id: string
  name: string
  context: string
  photo: Image | null
  opinion: string
  rating: number
}
