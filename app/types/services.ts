import type { ContentfulCollection, ContentfulSys } from './contentful'

/**
 * Contentful Content Type "Servicios".
 */
export interface Servicios {
  sys: ContentfulSys
  titulo: string
  url: string
  subtitulo: string
  duracion?: number | null
  modalidad: 'Presencial' | 'Online'
  descripcion: string
}

export interface ServiciosQueryResponse {
  serviciosCollection: ContentfulCollection<Servicios> | null
}
