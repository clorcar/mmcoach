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

export interface Address {
  /** Venue name, shown on cards */
  name: string
  street: string
  city: string
  postalCode: string
  country: string
  coordinates: { latitude: number; longitude: number } | null
}

export interface Workshop {
  id: string
  title: string
  slug: string
  /** ISO 8601 date-time */
  date: string
  /** Length in minutes */
  durationMinutes: number | null
  location: Address
  price: number | null
  image: Image | null
  /** Markdown, shown on cards */
  summary: string
  /** Full rich text, shown on the detail page */
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
  /** Plain-text summary, for meta descriptions and structured data */
  summaryText: string
  image: Image | null
  content: RichTextContent
  readingMinutes: number
}

export type ServiceModality = 'Presencial' | 'Online'

export interface Service {
  id: string
  title: string
  subtitle: string
  durationMinutes: number | null
  price: number | null
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

export interface MarkdownInline {
  text: string
  bold: boolean
  italic: boolean
}

export type MarkdownBlock =
  { type: 'paragraph'; content: MarkdownInline[] } | { type: 'list'; items: MarkdownInline[][] }
