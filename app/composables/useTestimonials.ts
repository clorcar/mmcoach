import { computed, type ComputedRef } from 'vue'
import { GET_TESTIMONIOS_QUERY } from '~/queries/testimonios'
import type { GetContentfulOptions } from '~/types/contentful'
import type {
  Testimonio,
  TestimoniosQueryResponse,
} from '~/types/testimonios'

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
 * @param options Optional filters: limit, skip, and sort order.
 * @returns Clean reactive testimonials, total count, error state, and refresh action.
 */
export function useTestimonials(options?: GetContentfulOptions): AsyncUseTestimonialsReturn {
  const variables: Record<string, any> = {}

  if (options?.limit !== undefined) {
    variables.limit = options.limit
  }
  if (options?.skip !== undefined) {
    variables.skip = options.skip
  }
  if (options?.order !== undefined) {
    variables.order = Array.isArray(options.order) ? options.order : [options.order]
  }

  const queryResult = useContentfulQuery<TestimoniosQueryResponse>(
    GET_TESTIMONIOS_QUERY,
    variables
  )

  const testimonials = computed<Testimonio[]>(
    () => queryResult.data.value?.testimoniosCollection?.items ?? []
  )

  const total = computed<number>(
    () => queryResult.data.value?.testimoniosCollection?.total ?? 0
  )

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
