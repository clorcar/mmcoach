import type {
  ContentfulSys,
  ContentfulAsset,
  ContentfulCollection,
  ContentfulRichText,
  GetContentfulOptions,
} from './contentful'

/**
 * Contentful Content Type interface for "Articulos".
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

// English alias
export type Article = Articulos

export type ArticulosCollection = ContentfulCollection<Articulos>

export interface ArticulosQueryResponse {
  articulosCollection: ArticulosCollection | null
}

export type GetArticlesOptions = GetContentfulOptions
