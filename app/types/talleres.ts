import type {
  ContentfulAsset,
  ContentfulCollection,
  ContentfulRichText,
  ContentfulSys,
} from './contentful'
import type { Direcciones } from './direcciones'

/**
 * Contentful Content Type "Talleres".
 */
export interface Talleres {
  sys: ContentfulSys
  titulo: string
  url: string
  fecha: string
  duracion?: number | null
  direccion: Direcciones
  precio?: number | null
  imagen?: ContentfulAsset | null
  resumen?: string | null
  descripcion: ContentfulRichText
}

export interface TalleresQueryResponse {
  talleresCollection: ContentfulCollection<Talleres> | null
}
