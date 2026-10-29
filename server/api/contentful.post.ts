/**
 * Proxy for Contentful's GraphQL API so the token never reaches the browser.
 * Only used while prerendering (`nuxt generate`) and by the dev server; the static site doesn't ship it.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<ContentfulGraphQLRequest>(event)
  if (!body?.query) {
    throw createError({ statusCode: 400, statusMessage: 'Missing GraphQL query' })
  }

  // Forward Contentful's status and body as-is so GraphQL errors (e.g. 400 complexity) reach the caller
  const response = await fetchContentful(event, { query: body.query, variables: body.variables })

  setResponseStatus(event, response.status)
  return response._data
})
