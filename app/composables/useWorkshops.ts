import type { ComputedRef } from 'vue'
import { GET_TALLERES_QUERY, GET_TALLER_BY_URL_QUERY } from '~/queries/talleres'
import type { GetContentfulOptions } from '~/types/contentful'
import type { Workshop } from '~/types/content'
import type { Talleres, TalleresQueryResponse } from '~/types/talleres'

/**
 * Fetches a list of workshops from Contentful (capped at 100).
 *
 * @param options Optional query options (limit, skip, order, where).
 * @param key Fixed payload key, needed when `where` depends on the build date.
 */
export async function useWorkshops(options?: GetContentfulOptions, key?: string) {
  const { items, total } = await useContentfulCollection<Talleres>(
    GET_TALLERES_QUERY,
    'talleresCollection',
    options,
    { key },
  )

  return {
    workshops: computed(() => items.value.map(mapWorkshop)),
    total,
  }
}

/**
 * Fetches a single workshop by its unique URL slug.
 *
 * @param url The unique URL slug of the workshop.
 */
export async function useWorkshopByUrl(
  url: string,
): Promise<{ workshop: ComputedRef<Workshop | null> }> {
  const data = await useContentfulQuery<TalleresQueryResponse>(GET_TALLER_BY_URL_QUERY, { url })

  return {
    workshop: computed(() => {
      const entry = data.value?.talleresCollection?.items[0]
      return entry ? mapWorkshop(entry) : null
    }),
  }
}
