export const GET_ARTICLES_QUERY = `
  query GetArticles($limit: Int = 50, $skip: Int, $order: [ArticulosOrder], $where: ArticulosFilter) {
    articulosCollection(limit: $limit, skip: $skip, order: $order, where: $where) {
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
        fechaPublicacion
        imagenPrincipal {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        resumen
        contenido {
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

export const GET_ARTICLE_BY_URL_QUERY = `
  query GetArticleByUrl($url: String!) {
    articulosCollection(where: { url: $url }, limit: 1) {
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        titulo
        url
        fechaPublicacion
        imagenPrincipal {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        resumen
        contenido {
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
