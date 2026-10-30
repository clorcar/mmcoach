import { GET_SERVICES_QUERY } from '~/queries/services'
import type { GetContentfulOptions } from '~/types/contentful'
import type { Servicios } from '~/types/services'

/**
 * Fetches a list of services from Contentful (capped at 100).
 *
 * @param options Optional query options (limit, skip, order, where).
 */
export async function useServices(options?: GetContentfulOptions) {
  const { items, total } = await useContentfulCollection<Servicios>(
    GET_SERVICES_QUERY,
    'serviciosCollection',
    options,
  )

  return {
    services: computed(() => items.value.map(mapService)),
    total,
  }
}
