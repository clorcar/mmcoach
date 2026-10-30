import type {
  ContentfulAsset,
  ContentfulCollection,
  ContentfulRichText,
  ContentfulSys,
} from './contentful'

/**
 * Contentful Content Type "Talleres".
 */
export interface Talleres {
  sys: ContentfulSys
  titulo: string
  url: string
  fecha: string
  localizacion: string
  precio?: number | null
  imagen?: ContentfulAsset | null
  resumen?: string | null
  descripcion: ContentfulRichText
}

export interface TalleresQueryResponse {
  talleresCollection: ContentfulCollection<Talleres> | null
}
