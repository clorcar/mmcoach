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
   * Sort order (e.g. 'sys_firstPublishedAt_DESC', 'valoracion_DESC').
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
