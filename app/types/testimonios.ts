import type { ContentfulAsset, ContentfulCollection, ContentfulSys } from './contentful'

/**
 * Contentful Content Type "Testimonios".
 */
export interface Testimonio {
  sys: ContentfulSys
  nombre: string
  contexto: string
  foto?: ContentfulAsset | null
  opinion: string
  valoracion: number
}

export interface TestimoniosQueryResponse {
  testimoniosCollection: ContentfulCollection<Testimonio> | null
}
