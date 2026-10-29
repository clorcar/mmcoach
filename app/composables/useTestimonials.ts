import { GET_TESTIMONIOS_QUERY } from '~/queries/testimonios'
import type { GetContentfulOptions } from '~/types/contentful'
import type { Testimonio } from '~/types/testimonios'

/**
 * Fetches testimonials from Contentful (capped at 100).
 *
 * @param options Optional limit, skip and sort order (the query does not support `where`).
 */
export async function useTestimonials(options?: Omit<GetContentfulOptions, 'where'>) {
  const { items, total } = await useContentfulCollection<Testimonio>(
    GET_TESTIMONIOS_QUERY,
    'testimoniosCollection',
    options,
  )

  return {
    testimonials: computed(() => items.value.map(mapTestimonial)),
    total,
  }
}
