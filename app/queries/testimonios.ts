export const GET_TESTIMONIOS_QUERY = `
  query GetTestimonios($limit: Int = 10, $skip: Int, $order: [TestimoniosOrder]) {
    testimoniosCollection(limit: $limit, skip: $skip, order: $order) {
      total
      limit
      skip
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        nombre
        contexto
        foto {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        opinion
        valoracion
      }
    }
  }
`
