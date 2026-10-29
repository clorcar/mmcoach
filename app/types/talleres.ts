import type {
  ContentfulSys,
  ContentfulAsset,
  ContentfulCollection,
  ContentfulRichText,
  GetContentfulOptions,
} from './contentful'

/**
 * Contentful Content Type interface for "Talleres".
 */
export interface Talleres {
  sys: ContentfulSys
  titulo: string
  url: string
  fecha: string
  localizacion: string
  precio?: number | null
  imagen?: ContentfulAsset | null
  descripcion: ContentfulRichText
}

// Convenient alias for singular usage
export type Taller = Talleres

export type TalleresCollection = ContentfulCollection<Talleres>

export interface TalleresQueryResponse {
  talleresCollection: TalleresCollection | null
}

export type GetTalleresOptions = GetContentfulOptions
