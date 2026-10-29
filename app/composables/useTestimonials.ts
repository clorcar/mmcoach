import { computed, type ComputedRef } from 'vue'
import { GET_TESTIMONIOS_QUERY } from '~/queries/testimonios'
import type { GetContentfulOptions } from '~/types/contentful'
import type { Testimonio, TestimoniosQueryResponse } from '~/types/testimonios'

export { GET_TESTIMONIOS_QUERY } from '~/queries/testimonios'

export interface UseTestimonialsReturn {
  data: ComputedRef<TestimoniosQueryResponse | null>
  testimonials: ComputedRef<Testimonio[]>
  total: ComputedRef<number>
  errors: ComputedRef<any[] | null>
  pending: ComputedRef<boolean>
  refresh: () => Promise<any>
}

export type AsyncUseTestimonialsReturn = UseTestimonialsReturn & Promise<UseTestimonialsReturn>

/**
 * Composable to fetch testimonials ("Testimonios") from Contentful.
 *
 * Items are capped at 100.
 *
 * @param options Optional filters: limit, skip, and sort order.
 * @returns Clean reactive testimonials, total count, error state, and refresh action.
 */
export function useTestimonials(options?: GetContentfulOptions): AsyncUseTestimonialsReturn {
  // The testimonios query has no $where variable
  const { where: _where, ...collectionOptions } = options ?? {}

  const queryResult = useContentfulCollection<TestimoniosQueryResponse>(
    GET_TESTIMONIOS_QUERY,
    'testimoniosCollection',
    collectionOptions,
  )

  const testimonials = computed<Testimonio[]>(
    () => queryResult.data.value?.testimoniosCollection?.items ?? [],
  )

  const total = computed<number>(() => queryResult.data.value?.testimoniosCollection?.total ?? 0)

  const result: UseTestimonialsReturn = {
    data: queryResult.data,
    testimonials,
    total,
    errors: queryResult.errors,
    pending: queryResult.pending,
    refresh: queryResult.refresh,
  }

  const resultPromise = Promise.resolve(queryResult).then(() => result)
  Object.assign(resultPromise, result)

  return resultPromise as AsyncUseTestimonialsReturn
}
