import type {
  ContentfulSys,
  ContentfulCollection,
  GetContentfulOptions,
} from './contentful'

export type ServiceModalidad = 'Presencial' | 'Online'

/**
 * Contentful Content Type interface for "Servicios".
 */
export interface Servicios {
  sys: ContentfulSys
  titulo: string
  url: string
  subtitulo: string
  duracion?: number | null
  modalidad: ServiceModalidad
  descripcion: string
}

// English alias
export type Service = Servicios

export type ServiciosCollection = ContentfulCollection<Servicios>

export interface ServiciosQueryResponse {
  serviciosCollection: ServiciosCollection | null
}

export type GetServicesOptions = GetContentfulOptions
