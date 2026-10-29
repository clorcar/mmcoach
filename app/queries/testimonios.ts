import { IMAGE_FIELDS } from './fragments'

export const GET_TESTIMONIOS_QUERY = `
  query GetTestimonios($limit: Int = 10, $skip: Int, $order: [TestimoniosOrder]) {
    testimoniosCollection(limit: $limit, skip: $skip, order: $order) {
      total
      limit
      skip
      items {
        sys {
          id
        }
        nombre
        contexto
        foto {
          ${IMAGE_FIELDS}
        }
        opinion
        valoracion
      }
    }
  }
`
