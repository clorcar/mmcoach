export interface ContentfulSys {
  id: string
  publishedAt?: string
  firstPublishedAt?: string
}

export interface ContentfulAsset {
  title?: string
  description?: string
  contentType?: string
  fileName?: string
  size?: number
  url: string
  width?: number
  height?: number
}

/**
 * Contentful RichText field data structure returned by GraphQL.
 */
export interface ContentfulRichText {
  json: Record<string, any>
  links?: {
    assets?: {
      block?: (ContentfulAsset & { sys: { id: string } })[]
    }
    entries?: {
      inline?: any[]
      block?: any[]
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
   * Maximum number of items to return.
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
  where?: Record<string, any>
  /**
   * Whether to fetch from preview API (draft content).
   */
  preview?: boolean
}
