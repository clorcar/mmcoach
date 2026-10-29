import type { Document } from '@contentful/rich-text-types'

/**
 * Raw Contentful GraphQL shapes. Only composables and mappers use these;
 * components consume the lean types in `~/types/content`.
 */
export interface ContentfulSys {
  id: string
  publishedAt?: string
  firstPublishedAt?: string
}

export interface ContentfulAsset {
  title?: string | null
  description?: string | null
  contentType?: string | null
  fileName?: string | null
  size?: number | null
  url: string
  width?: number | null
  height?: number | null
}

/**
 * Contentful RichText field data structure returned by GraphQL.
 */
export interface ContentfulRichText {
  json: Document
  links?: {
    assets?: {
      block?: (ContentfulAsset & { sys: { id: string } })[]
    }
  }
}

/**
 * Generic Contentful Collection wrapper representing Contentful's GraphQL collection schema.
 */
export interface ContentfulCollection<T> {
  total: number
  limit: number
  skip: number
  items: T[]
}

/**
 * Common query options for Contentful GraphQL collections.
 */
export interface GetContentfulOptions {
  /**
   * Maximum number of items to return (capped at 100).
   */
  limit?: number
  /**
   * Number of items to skip for pagination.
   */
  skip?: number
  /**
   * Sort order (e.g. 'sys_firstPublishedAt_DESC', 'valoracion_DESC', 'fecha_ASC').
   */
  order?: string[] | string
  /**
   * Optional filter object.
   */
  where?: Record<string, unknown>
}
