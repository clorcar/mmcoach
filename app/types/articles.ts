import type {
  ContentfulAsset,
  ContentfulCollection,
  ContentfulRichText,
  ContentfulSys,
} from './contentful'

/**
 * Contentful Content Type "Articulos".
 */
export interface Articulos {
  sys: ContentfulSys
  titulo: string
  url: string
  fechaPublicacion: string
  imagenPrincipal?: ContentfulAsset | null
  resumen: string
  contenido: ContentfulRichText
}

export interface ArticulosQueryResponse {
  articulosCollection: ContentfulCollection<Articulos> | null
}
