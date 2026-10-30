import type { ComputedRef } from 'vue'
import type { ContentfulCollection, GetContentfulOptions } from '~/types/contentful'

/**
 * Hard cap on the number of items a list composable returns.
 */
export const CONTENTFUL_MAX_ITEMS = 100

export interface UseContentfulCollectionOptions {
  /**
   * Items requested per GraphQL call. Keep `pageSize * itemComplexity` below Contentful's
   * 11000 complexity limit (rich text with `links` costs ~1000 per item, so use 10 there).
   */
  pageSize?: number
  /**
   * Fixed payload key. Required when variables change between builds and visits (e.g. a date
   * filter), so the client finds the prerendered data instead of fetching again.
   */
  key?: string
}

export interface ContentfulCollectionResult<TItem> {
  items: ComputedRef<TItem[]>
  total: ComputedRef<number>
}

type CollectionResponse<TItem> = Record<string, ContentfulCollection<TItem> | null>

/**
 * Fetches a Contentful collection in pages at build time and merges the items.
 * Returns up to `options.limit` items (capped at CONTENTFUL_MAX_ITEMS) starting at `options.skip`.
 * Errors are rethrown as fatal so prerendering fails instead of shipping a broken page.
 *
 * @param query GraphQL query accepting `$limit`, `$skip`, `$order` and `$where` variables
 * @param collectionKey Root collection field in the response (e.g. 'talleresCollection')
 * @param options Query options (limit, skip, order, where)
 * @param collectionOptions Paging configuration
 */
export async function useContentfulCollection<TItem>(
  query: string,
  collectionKey: string,
  options?: GetContentfulOptions,
  collectionOptions?: UseContentfulCollectionOptions,
): Promise<ContentfulCollectionResult<TItem>> {
  const maxItems = Math.min(options?.limit ?? CONTENTFUL_MAX_ITEMS, CONTENTFUL_MAX_ITEMS)
  const startSkip = options?.skip ?? 0
  const pageSize = Math.min(collectionOptions?.pageSize ?? CONTENTFUL_MAX_ITEMS, maxItems)

  const baseVariables: Record<string, unknown> = {}
  if (options?.order !== undefined) {
    baseVariables.order = Array.isArray(options.order) ? options.order : [options.order]
  }
  if (options?.where !== undefined) {
    baseVariables.where = options.where
  }

  const fetchPage = async (skip: number, limit: number) => {
    const data = await fetchContentfulData<CollectionResponse<TItem>>(query, {
      ...baseVariables,
      skip,
      limit,
    })
    return data[collectionKey] ?? { total: 0, limit, skip, items: [] }
  }

  const cacheKey =
    collectionOptions?.key ??
    createQueryKey(query, { ...baseVariables, skip: startSkip, maxItems, pageSize })

  const { data, error } = await useAsyncData(cacheKey, async () => {
    const firstPage = await fetchPage(startSkip, pageSize)

    const lastIndex = Math.min(firstPage.total, startSkip + maxItems)
    const remainingPages: Promise<ContentfulCollection<TItem>>[] = []
    for (let skip = startSkip + pageSize; pageSize > 0 && skip < lastIndex; skip += pageSize) {
      remainingPages.push(fetchPage(skip, Math.min(pageSize, lastIndex - skip)))
    }

    const pages = [firstPage, ...(await Promise.all(remainingPages))]
    return {
      total: firstPage.total,
      items: pages.flatMap((page) => page.items),
    }
  })

  if (error.value) {
    throw createError({ ...error.value, fatal: true })
  }

  return {
    items: computed(() => data.value?.items ?? []),
    total: computed(() => data.value?.total ?? 0),
  }
}
