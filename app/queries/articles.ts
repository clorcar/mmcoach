import { IMAGE_FIELDS, RICH_TEXT_IMAGE_LINKS } from './fragments'

const ARTICULO_FIELDS = `
  sys {
    id
    publishedAt
  }
  titulo
  url
  fechaPublicacion
  imagenPrincipal {
    ${IMAGE_FIELDS}
  }
  resumen
  contenido {
    json
    ${RICH_TEXT_IMAGE_LINKS}
  }
`

export const GET_ARTICLES_QUERY = `
  query GetArticles($limit: Int = 50, $skip: Int, $order: [ArticulosOrder], $where: ArticulosFilter) {
    articulosCollection(limit: $limit, skip: $skip, order: $order, where: $where) {
      total
      limit
      skip
      items {
        ${ARTICULO_FIELDS}
      }
    }
  }
`

export const GET_ARTICLE_BY_URL_QUERY = `
  query GetArticleByUrl($url: String!) {
    articulosCollection(where: { url: $url }, limit: 1) {
      total
      limit
      skip
      items {
        ${ARTICULO_FIELDS}
      }
    }
  }
`
