import { computed, type ComputedRef } from 'vue'

export interface GraphQLErrorLocation {
  line: number
  column: number
}

export interface GraphQLError {
  message: string
  locations?: GraphQLErrorLocation[]
  path?: (string | number)[]
  extensions?: Record<string, any>
  [key: string]: any
}

export interface GraphQLResponse<T = any> {
  data?: T | null
  errors?: GraphQLError[]
}

export interface UseContentfulQueryOptions {
  /**
   * Optional custom cache key for Nuxt payload caching and SSG hydration.
   * If omitted, a stable deterministic key is generated from the query and variables.
   */
  key?: string
}

export interface ContentfulQueryResult<T> {
  data: ComputedRef<T | null>
  errors: ComputedRef<GraphQLError[] | null>
  pending: ComputedRef<boolean>
  refresh: () => Promise<any>
}

export type AsyncContentfulQueryResult<T> = ContentfulQueryResult<T> &
  Promise<ContentfulQueryResult<T>>

/**
 * Server route that proxies Contentful's GraphQL API (see server/api/contentful.post.ts).
 */
export const CONTENTFUL_API_ROUTE = '/api/contentful'

/**
 * Generates a stable deterministic cache key for Nuxt SSG hydration and payload deduplication.
 */
export function createQueryKey(query?: string, variables?: Record<string, any>): string {
  const serialized = `${query || ''}:${JSON.stringify(variables ?? {})}`
  let hash = 0
  for (let i = 0; i < serialized.length; i++) {
    const char = serialized.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return `contentful-${Math.abs(hash).toString(36)}`
}

/**
 * Normalizes a fetch error into GraphQL errors: either the GraphQL errors returned with
 * an HTTP 4xx payload (e.g. query validation failure), or a single network/HTTP error.
 */
export function toGraphQLErrors(fetchError: any): GraphQLError[] {
  const errPayload = fetchError?.data as GraphQLResponse | undefined
  if (errPayload?.errors && errPayload.errors.length > 0) {
    return errPayload.errors
  }

  const errDetails = fetchError?.data as Record<string, any> | undefined
  return [
    {
      message:
        errDetails?.message ||
        fetchError?.message ||
        'An unexpected error occurred while querying Contentful.',
      extensions: {
        statusCode: fetchError?.statusCode,
        statusMessage: fetchError?.statusMessage,
        details: errDetails,
      },
    },
  ]
}

/**
 * Nuxt 4 composable for querying Contentful's GraphQL API through the server proxy route.
 * Compatible with SSR and SSG prerendering.
 *
 * @param query GraphQL query string
 * @param variables Optional GraphQL variables dictionary
 * @param options Optional configuration (e.g., custom cache key)
 * @returns Clean reactive object `{ data, errors, pending, refresh }`
 */
export function useContentfulQuery<T = any>(
  query: string,
  variables?: Record<string, any>,
  options?: UseContentfulQueryOptions,
): AsyncContentfulQueryResult<T> {
  const cacheKey = options?.key || createQueryKey(query, variables)

  const fetchResult = useFetch<GraphQLResponse<T>>(CONTENTFUL_API_ROUTE, {
    key: cacheKey,
    method: 'POST',
    body: {
      query,
      variables,
    },
  })

  const { data: responseData, error: fetchError, pending, refresh } = fetchResult

  // Clean, reactive unwrapped GraphQL data
  const data = computed<T | null>(() => responseData.value?.data ?? null)

  // Clean, reactive error array extracted from GraphQL body or network/HTTP errors
  const errors = computed<GraphQLError[] | null>(() => {
    // 1. Errors returned in the GraphQL JSON response body
    if (responseData.value?.errors && responseData.value.errors.length > 0) {
      return responseData.value.errors
    }

    // 2. HTTP 4xx GraphQL payloads, network, authorization (401), or unexpected server errors
    return fetchError.value ? toGraphQLErrors(fetchError.value) : null
  })

  const isPending = computed<boolean>(() => pending.value)

  const result: ContentfulQueryResult<T> = {
    data,
    errors,
    pending: isPending,
    refresh,
  }

  // Support both `await useContentfulQuery(...)` and `const { ... } = useContentfulQuery(...)`
  const resultPromise = Promise.resolve(fetchResult).then(() => result)
  Object.assign(resultPromise, result)

  return resultPromise as AsyncContentfulQueryResult<T>
}
