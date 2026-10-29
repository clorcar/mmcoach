import type { Ref } from 'vue'

export interface GraphQLError {
  message: string
}

export interface GraphQLResponse<T> {
  data?: T | null
  errors?: GraphQLError[]
}

/**
 * Server route that proxies Contentful's GraphQL API (see server/api/contentful.post.ts).
 */
export const CONTENTFUL_API_ROUTE = '/api/contentful'

/**
 * Generates a stable deterministic cache key for Nuxt SSG hydration and payload deduplication.
 */
export function createQueryKey(query: string, variables: Record<string, unknown> = {}): string {
  const serialized = `${query}:${JSON.stringify(variables)}`
  let hash = 0
  for (let i = 0; i < serialized.length; i++) {
    hash = (hash << 5) - hash + serialized.charCodeAt(i)
    hash |= 0
  }
  return `contentful-${Math.abs(hash).toString(36)}`
}

/**
 * Sends one GraphQL request through the proxy and returns its data.
 * Throws on network, HTTP or GraphQL errors (including 4xx payloads such as complexity errors).
 */
export async function fetchContentfulData<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  let response: GraphQLResponse<T>
  try {
    response = await $fetch<GraphQLResponse<T>>(CONTENTFUL_API_ROUTE, {
      method: 'POST',
      body: { query, variables },
    })
  } catch (error) {
    const payload = (error as { data?: GraphQLResponse<T> }).data
    const message = payload?.errors?.map((e) => e.message).join('; ')
    throw createError({
      statusCode: 502,
      statusMessage: `Contentful request failed: ${message || (error as Error).message}`,
    })
  }

  if (response.errors?.length || !response.data) {
    const message = response.errors?.map((e) => e.message).join('; ') || 'empty response'
    throw createError({ statusCode: 502, statusMessage: `Contentful query failed: ${message}` })
  }

  return response.data
}

/**
 * Runs a Contentful GraphQL query at build time (SSG) and returns its data.
 * Errors are rethrown as fatal so prerendering fails instead of shipping a broken page.
 *
 * @param query GraphQL query string
 * @param variables Optional GraphQL variables
 */
export async function useContentfulQuery<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<Ref<T | undefined>> {
  const { data, error } = await useAsyncData(createQueryKey(query, variables), () =>
    fetchContentfulData<T>(query, variables),
  )

  if (error.value) {
    throw createError({ ...error.value, fatal: true })
  }

  return data
}
