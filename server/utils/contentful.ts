import type { H3Event } from 'h3'

export interface ContentfulGraphQLRequest {
  query: string
  variables?: Record<string, unknown>
}

/**
 * Sends a GraphQL request to Contentful with the server-only credentials.
 * Returns the raw response so callers can forward Contentful's status and errors.
 */
export async function fetchContentful(event: H3Event, request: ContentfulGraphQLRequest) {
  const { contentfulSpaceId, contentfulEnvironment, contentfulDeliveryToken } =
    useRuntimeConfig(event)

  if (!contentfulSpaceId || !contentfulDeliveryToken) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'Contentful credentials missing: Ensure CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN are defined in your environment.',
    })
  }

  return $fetch.raw(
    `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceId}/environments/${contentfulEnvironment}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${contentfulDeliveryToken}`,
        'Content-Type': 'application/json',
      },
      body: request,
      ignoreResponseError: true,
    },
  )
}
