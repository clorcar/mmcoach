const SERVICIO_FIELDS = `
  sys {
    id
  }
  titulo
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
