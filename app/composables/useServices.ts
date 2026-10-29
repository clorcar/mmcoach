import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'
import { GET_SERVICES_QUERY, GET_SERVICE_BY_URL_QUERY } from '~/queries/services'
import type { GetContentfulOptions } from '~/types/contentful'
import type { Servicios, ServiciosQueryResponse } from '~/types/services'

export { GET_SERVICES_QUERY, GET_SERVICE_BY_URL_QUERY } from '~/queries/services'

export interface UseServicesReturn {
  data: ComputedRef<ServiciosQueryResponse | null>
  services: ComputedRef<Servicios[]>
  total: ComputedRef<number>
  errors: ComputedRef<any[] | null>
  pending: ComputedRef<boolean>
  refresh: () => Promise<any>
}

export type AsyncUseServicesReturn = UseServicesReturn & Promise<UseServicesReturn>

export interface UseServiceReturn {
  data: ComputedRef<ServiciosQueryResponse | null>
  service: ComputedRef<Servicios | null>
  errors: ComputedRef<any[] | null>
  pending: ComputedRef<boolean>
  refresh: () => Promise<any>
}

export type AsyncUseServiceReturn = UseServiceReturn & Promise<UseServiceReturn>

/**
 * Composable to fetch a list of services from Contentful.
 *
 * Items are capped at 100.
 *
 * @param options Optional query options (limit, skip, order, where).
 * @returns Clean reactive services list, total count, error state, and refresh action.
 */
export function useServices(options?: GetContentfulOptions): AsyncUseServicesReturn {
  const queryResult = useContentfulCollection<ServiciosQueryResponse>(
    GET_SERVICES_QUERY,
    'serviciosCollection',
    options,
  )

  const services = computed<Servicios[]>(
    () => queryResult.data.value?.serviciosCollection?.items ?? [],
  )

  const total = computed<number>(() => queryResult.data.value?.serviciosCollection?.total ?? 0)

  const result: UseServicesReturn = {
    data: queryResult.data,
    services,
    total,
    errors: queryResult.errors,
    pending: queryResult.pending,
    refresh: queryResult.refresh,
  }

  const resultPromise = Promise.resolve(queryResult).then(() => result)
  Object.assign(resultPromise, result)

  return resultPromise as AsyncUseServicesReturn
}

/**
 * Composable to fetch a single service by its unique URL slug.
 *
 * @param url The unique URL slug of the service.
 * @returns Clean reactive service item, error state, and refresh action.
 */
export function useServiceByUrl(url: MaybeRefOrGetter<string>): AsyncUseServiceReturn {
  const resolvedUrl = toValue(url)

  const queryResult = useContentfulQuery<ServiciosQueryResponse>(GET_SERVICE_BY_URL_QUERY, {
    url: resolvedUrl,
  })

  const service = computed<Servicios | null>(
    () => queryResult.data.value?.serviciosCollection?.items?.[0] ?? null,
  )

  const result: UseServiceReturn = {
    data: queryResult.data,
    service,
    errors: queryResult.errors,
    pending: queryResult.pending,
    refresh: queryResult.refresh,
  }

  const resultPromise = Promise.resolve(queryResult).then(() => result)
  Object.assign(resultPromise, result)

  return resultPromise as AsyncUseServiceReturn
}
