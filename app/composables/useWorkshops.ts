import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'
import { GET_TALLERES_QUERY, GET_TALLER_BY_URL_QUERY } from '~/queries/talleres'
import type { GetContentfulOptions } from '~/types/contentful'
import type { Talleres, TalleresQueryResponse } from '~/types/talleres'

export { GET_TALLERES_QUERY, GET_TALLER_BY_URL_QUERY } from '~/queries/talleres'

export interface UseWorkshopsReturn {
  data: ComputedRef<TalleresQueryResponse | null>
  workshops: ComputedRef<Talleres[]>
  total: ComputedRef<number>
  errors: ComputedRef<any[] | null>
  pending: ComputedRef<boolean>
  refresh: () => Promise<any>
}

export type AsyncUseWorkshopsReturn = UseWorkshopsReturn & Promise<UseWorkshopsReturn>

export interface UseWorkshopReturn {
  data: ComputedRef<TalleresQueryResponse | null>
  workshop: ComputedRef<Talleres | null>
  errors: ComputedRef<any[] | null>
  pending: ComputedRef<boolean>
  refresh: () => Promise<any>
}

export type AsyncUseWorkshopReturn = UseWorkshopReturn & Promise<UseWorkshopReturn>

/**
 * Composable to fetch a list of workshops from Contentful.
 *
 * Items are capped at 100.
 *
 * @param options Optional query options (limit, skip, order, where).
 * @returns Clean reactive workshops list, total count, error state, and refresh action.
 */
export function useWorkshops(options?: GetContentfulOptions): AsyncUseWorkshopsReturn {
  const queryResult = useContentfulCollection<TalleresQueryResponse>(
    GET_TALLERES_QUERY,
    'talleresCollection',
    options,
  )

  const workshops = computed<Talleres[]>(
    () => queryResult.data.value?.talleresCollection?.items ?? [],
  )

  const total = computed<number>(() => queryResult.data.value?.talleresCollection?.total ?? 0)

  const result: UseWorkshopsReturn = {
    data: queryResult.data,
    workshops,
    total,
    errors: queryResult.errors,
    pending: queryResult.pending,
    refresh: queryResult.refresh,
  }

  const resultPromise = Promise.resolve(queryResult).then(() => result)
  Object.assign(resultPromise, result)

  return resultPromise as AsyncUseWorkshopsReturn
}

/**
 * Composable to fetch a single workshop by its unique URL slug.
 *
 * @param url The unique URL slug of the workshop.
 * @returns Clean reactive workshop item, error state, and refresh action.
 */
export function useWorkshopByUrl(url: MaybeRefOrGetter<string>): AsyncUseWorkshopReturn {
  const resolvedUrl = toValue(url)

  const queryResult = useContentfulQuery<TalleresQueryResponse>(GET_TALLER_BY_URL_QUERY, {
    url: resolvedUrl,
  })

  const workshop = computed<Talleres | null>(
    () => queryResult.data.value?.talleresCollection?.items?.[0] ?? null,
  )

  const result: UseWorkshopReturn = {
    data: queryResult.data,
    workshop,
    errors: queryResult.errors,
    pending: queryResult.pending,
    refresh: queryResult.refresh,
  }

  const resultPromise = Promise.resolve(queryResult).then(() => result)
  Object.assign(resultPromise, result)

  return resultPromise as AsyncUseWorkshopReturn
}
