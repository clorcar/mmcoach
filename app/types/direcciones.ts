/**
 * Contentful Content Type "Direcciones".
 */
export interface Direcciones {
  titulo: string
  direccion: string
  ciudad: string
  codigoPostal: string
  pais: string
  coordenadas?: { lat: number; lon: number } | null
}
