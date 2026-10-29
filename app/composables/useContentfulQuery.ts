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

export type AsyncContentfulQueryResult<T> = ContentfulQueryResult<T> & Promise<ContentfulQueryResult<T>>

/**
 * Generates a stable deterministic cache key for Nuxt SSG hydration and payload deduplication.
 */
function createQueryKey(spaceId?: string, query?: string, variables?: Record<string, any>): string {
  const serialized = `${spaceId || ''}:${query || ''}:${JSON.stringify(variables ?? {})}`
  let hash = 0
  for (let i = 0; i < serialized.length; i++) {
    const char = serialized.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return `contentful-${Math.abs(hash).toString(36)}`
}

/**
 * Nuxt 4 composable for querying Contentful's GraphQL API.
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
  options?: UseContentfulQueryOptions
): AsyncContentfulQueryResult<T> {
  const config = useRuntimeConfig()
  const spaceId = config.public.contentfulSpaceId as string | undefined
  const accessToken = config.public.contentfulAccessToken as string | undefined

  if (!spaceId || !accessToken) {
    console.warn(
      '[useContentfulQuery] Contentful credentials missing: Ensure CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN are defined in your environment.'
    )
  }

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId || ''}`
  const cacheKey = options?.key || createQueryKey(spaceId, query, variables)

  const fetchResult = useFetch<GraphQLResponse<T>>(endpoint, {
    key: cacheKey,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken || ''}`,
      'Content-Type': 'application/json',
    },
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

    // 2. Errors returned with HTTP 4xx error payloads (e.g., query validation failure)
    const errPayload = fetchError.value?.data as GraphQLResponse<T> | undefined
    if (errPayload?.errors && errPayload.errors.length > 0) {
      return errPayload.errors
    }

    // 3. Network, authorization (401), or unexpected server errors
    if (fetchError.value) {
      const errDetails = fetchError.value.data as Record<string, any> | undefined
      return [
        {
          message:
            errDetails?.message ||
            fetchError.value.message ||
            'An unexpected error occurred while querying Contentful.',
          extensions: {
            statusCode: fetchError.value.statusCode,
            statusMessage: fetchError.value.statusMessage,
            details: errDetails,
          },
        },
      ]
    }

    return null
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
