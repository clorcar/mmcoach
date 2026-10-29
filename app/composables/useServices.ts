import type { ComputedRef } from 'vue'
import { GET_SERVICES_QUERY, GET_SERVICE_BY_URL_QUERY } from '~/queries/services'
import type { GetContentfulOptions } from '~/types/contentful'
import type { Service } from '~/types/content'
import type { Servicios, ServiciosQueryResponse } from '~/types/services'

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

/**
 * Fetches a single service by its unique URL slug.
 *
 * @param url The unique URL slug of the service.
 */
export async function useServiceByUrl(
  url: string,
): Promise<{ service: ComputedRef<Service | null> }> {
  const data = await useContentfulQuery<ServiciosQueryResponse>(GET_SERVICE_BY_URL_QUERY, { url })

  return {
    service: computed(() => {
      const entry = data.value?.serviciosCollection?.items[0]
      return entry ? mapService(entry) : null
    }),
  }
}
