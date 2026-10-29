import type {
  ContentfulSys,
  ContentfulAsset,
  ContentfulCollection,
  GetContentfulOptions,
} from './contentful'

export interface Testimonio {
  sys: ContentfulSys
  nombre: string
  contexto: string
  foto?: ContentfulAsset | null
  opinion: string
  valoracion: number
}

export type TestimoniosCollection = ContentfulCollection<Testimonio>

export interface TestimoniosQueryResponse {
  testimoniosCollection: TestimoniosCollection | null
}

export type GetTestimonialsOptions = GetContentfulOptions
