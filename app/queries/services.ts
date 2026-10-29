export const GET_SERVICES_QUERY = `
  query GetServices($limit: Int, $skip: Int, $order: [ServiciosOrder], $where: ServiciosFilter) {
    serviciosCollection(limit: $limit, skip: $skip, order: $order, where: $where) {
      total
      limit
      skip
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        titulo
        url
        subtitulo
        duracion
        modalidad
        descripcion
      }
    }
  }
`

export const GET_SERVICE_BY_URL_QUERY = `
  query GetServiceByUrl($url: String!) {
    serviciosCollection(where: { url: $url }, limit: 1) {
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        titulo
        url
        subtitulo
        duracion
        modalidad
        descripcion
      }
    }
  }
`
