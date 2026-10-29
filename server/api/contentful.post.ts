interface ContentfulRequestBody {
  query: string
  variables?: Record<string, any>
}

/**
 * Server-side proxy for Contentful's GraphQL API, so the access token never reaches the browser.
 * With `nuxt generate` it is only called while prerendering; the static site ships the payloads.
 */
export default defineEventHandler(async (event) => {
  const { contentfulSpaceId, contentfulAccessToken } = useRuntimeConfig(event)

  if (!contentfulSpaceId || !contentfulAccessToken) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'Contentful credentials missing: Ensure CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN are defined in your environment.',
    })
  }

  const body = await readBody<ContentfulRequestBody>(event)
  if (!body?.query) {
    throw createError({ statusCode: 400, statusMessage: 'Missing GraphQL query' })
  }

  // Forward Contentful's status and body as-is so GraphQL errors (e.g. 400 complexity) reach the client
  const response = await $fetch.raw(
    `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${contentfulAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: {
        query: body.query,
        variables: body.variables,
      },
      ignoreResponseError: true,
    },
  )

  setResponseStatus(event, response.status)
  return response._data
})
