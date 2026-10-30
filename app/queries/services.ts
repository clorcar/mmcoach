const SERVICIO_FIELDS = `
  sys {
    id
  }
  titulo
  url
  subtitulo
  duracion
  precio
  modalidad
  descripcion
`

export const GET_SERVICES_QUERY = `
  query GetServices($limit: Int = 50, $skip: Int, $order: [ServiciosOrder], $where: ServiciosFilter) {
    serviciosCollection(limit: $limit, skip: $skip, order: $order, where: $where) {
      total
      limit
      skip
      items {
        ${SERVICIO_FIELDS}
      }
    }
  }
`

export const GET_SERVICE_BY_URL_QUERY = `
  query GetServiceByUrl($url: String!) {
    serviciosCollection(where: { url: $url }, limit: 1) {
      total
      limit
      skip
      items {
        ${SERVICIO_FIELDS}
      }
    }
  }
`
