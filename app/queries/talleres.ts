import { IMAGE_FIELDS, RICH_TEXT_IMAGE_LINKS } from './fragments'

const TALLER_FIELDS = `
  sys {
    id
  }
  titulo
  url
  fecha
  duracion
  direccion {
    titulo
    direccion
    ciudad
    codigoPostal
    pais
    coordenadas {
      lat
      lon
    }
  }
  precio
  imagen {
    ${IMAGE_FIELDS}
  }
  resumen
  descripcion {
    json
    ${RICH_TEXT_IMAGE_LINKS}
  }
`

export const GET_TALLERES_QUERY = `
  query GetTalleres($limit: Int = 10, $skip: Int, $order: [TalleresOrder], $where: TalleresFilter) {
    talleresCollection(limit: $limit, skip: $skip, order: $order, where: $where) {
      total
      limit
      skip
      items {
        ${TALLER_FIELDS}
      }
    }
  }
`

export const GET_TALLER_BY_URL_QUERY = `
  query GetTallerByUrl($url: String!) {
    talleresCollection(where: { url: $url }, limit: 1) {
      total
      limit
      skip
      items {
        ${TALLER_FIELDS}
      }
    }
  }
`
