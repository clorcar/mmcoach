import { computed } from 'vue'
import type { ContentfulCollection, GetContentfulOptions } from '~/types/contentful'
import {
  CONTENTFUL_API_ROUTE,
  createQueryKey,
  toGraphQLErrors,
  type AsyncContentfulQueryResult,
  type ContentfulQueryResult,
  type GraphQLError,
  type GraphQLResponse,
} from './useContentfulQuery'

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
   * Optional custom cache key for Nuxt payload caching and SSG hydration.
   */
  key?: string
}

/**
 * Fetches a Contentful collection in pages and merges them into a single collection response.
 * Returns up to `options.limit` items (capped at CONTENTFUL_MAX_ITEMS) starting at `options.skip`.
 *
 * @param query GraphQL query accepting `$limit`, `$skip`, `$order` and `$where` variables
 * @param collectionKey Root collection field in the response (e.g. 'talleresCollection')
 * @param options Query options (limit, skip, order, where)
 * @param collectionOptions Paging configuration (page size, cache key)
 * @returns Clean reactive object `{ data, errors, pending, refresh }`
 */
export function useContentfulCollection<
  T extends { [K in keyof T]: ContentfulCollection<any> | null },
>(
  query: string,
  collectionKey: keyof T & string,
  options?: GetContentfulOptions,
  collectionOptions?: UseContentfulCollectionOptions,
): AsyncContentfulQueryResult<T> {
  const maxItems = Math.min(options?.limit ?? CONTENTFUL_MAX_ITEMS, CONTENTFUL_MAX_ITEMS)
  const startSkip = options?.skip ?? 0
  const pageSize = Math.min(collectionOptions?.pageSize ?? CONTENTFUL_MAX_ITEMS, maxItems)

  const baseVariables: Record<string, any> = {}
  if (options?.order !== undefined) {
    baseVariables.order = Array.isArray(options.order) ? options.order : [options.order]
  }
  if (options?.where !== undefined) {
    baseVariables.where = options.where
  }

  const cacheKey =
    collectionOptions?.key ||
    createQueryKey(query, { ...baseVariables, skip: startSkip, maxItems, pageSize })

  async function fetchPage(skip: number, limit: number): Promise<GraphQLResponse<T>> {
    try {
      return await $fetch<GraphQLResponse<T>>(CONTENTFUL_API_ROUTE, {
        method: 'POST',
        body: {
          query,
          variables: { ...baseVariables, skip, limit },
        },
      })
    } catch (error) {
      return { data: null, errors: toGraphQLErrors(error) }
    }
  }

  // Errors are returned (not thrown) so they survive SSG payload serialization intact
  const asyncResult = useAsyncData<GraphQLResponse<T>>(cacheKey, async () => {
    const firstPage = await fetchPage(startSkip, pageSize)
    const firstCollection = firstPage.data?.[collectionKey]
    if (!firstCollection) {
      return firstPage
    }

    const lastIndex = Math.min(firstCollection.total, startSkip + maxItems)
    const remainingPages: Promise<GraphQLResponse<T>>[] = []
    for (let skip = startSkip + pageSize; pageSize > 0 && skip < lastIndex; skip += pageSize) {
      remainingPages.push(fetchPage(skip, Math.min(pageSize, lastIndex - skip)))
    }

    const pages = [firstPage, ...(await Promise.all(remainingPages))]
    const items = pages.flatMap((page) => page.data?.[collectionKey]?.items ?? [])
    const errors = pages.flatMap((page) => page.errors ?? [])

    const collection: ContentfulCollection<any> = {
      total: firstCollection.total,
      limit: maxItems,
      skip: startSkip,
      items,
    }

    return {
      data: { [collectionKey]: collection } as T,
      errors: errors.length > 0 ? errors : undefined,
    }
  })

  const { data: responseData, error: asyncError, pending, refresh } = asyncResult

  const data = computed<T | null>(() => responseData.value?.data ?? null)

  const errors = computed<GraphQLError[] | null>(() => {
    if (responseData.value?.errors && responseData.value.errors.length > 0) {
      return responseData.value.errors
    }
    return asyncError.value ? toGraphQLErrors(asyncError.value) : null
  })

  const isPending = computed<boolean>(() => pending.value)

  const result: ContentfulQueryResult<T> = {
    data,
    errors,
    pending: isPending,
    refresh,
  }

  // Support both `await useContentfulCollection(...)` and `const { ... } = useContentfulCollection(...)`
  const resultPromise = Promise.resolve(asyncResult).then(() => result)
  Object.assign(resultPromise, result)

  return resultPromise as AsyncContentfulQueryResult<T>
}
