import type { ContentfulSys } from './contentful'

/**
 * Contentful Content Type "Servicios".
 */
export interface Servicios {
  sys: ContentfulSys
  titulo: string
  subtitulo: string
  duracion?: number | null
  precio?: number | null
  modalidad: 'Presencial' | 'Online'
  descripcion: string
}
