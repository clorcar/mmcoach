export const GET_TALLERES_QUERY = `
  query GetTalleres($limit: Int, $skip: Int, $order: [TalleresOrder], $where: TalleresFilter) {
    talleresCollection(limit: $limit, skip: $skip, order: $order, where: $where) {
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
        fecha
        localizacion
        precio
        imagen {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        descripcion {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                title
                description
                contentType
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

export const GET_TALLER_BY_URL_QUERY = `
  query GetTallerByUrl($url: String!) {
    talleresCollection(where: { url: $url }, limit: 1) {
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        titulo
        url
        fecha
        localizacion
        precio
        imagen {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        descripcion {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                title
                description
                contentType
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`
