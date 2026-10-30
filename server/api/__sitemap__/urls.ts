import type { SitemapUrlInput } from '#sitemap/types'

const SITEMAP_QUERY = `
  query SitemapUrls {
    talleresCollection(limit: 100) {
      items {
        url
        sys { publishedAt }
      }
    }
    articulosCollection(limit: 100) {
      items {
        url
        sys { publishedAt }
      }
    }
  }
`

interface SitemapItems {
  items: { url: string; sys: { publishedAt: string } }[]
}

interface SitemapResponse {
  data?: {
    talleresCollection: SitemapItems | null
    articulosCollection: SitemapItems | null
  }
  errors?: { message: string }[]
}

/**
 * Detail page URLs for @nuxtjs/sitemap (declared in `sitemap.sources`), fetched at build time.
 */
export default defineEventHandler(async (event): Promise<SitemapUrlInput[]> => {
  const response = await fetchContentful(event, { query: SITEMAP_QUERY })
  const body = response._data as SitemapResponse | undefined
  if (!response.ok || body?.errors?.length) {
    throw createError({
      statusCode: 502,
      statusMessage: `Contentful query failed: ${body?.errors?.map((e) => e.message).join('; ') ?? response.status}`,
    })
  }

  const toUrls = (section: string, collection: SitemapItems | null | undefined) =>
    (collection?.items ?? []).map((item) => ({
      loc: `/${section}/${item.url}`,
      lastmod: item.sys.publishedAt,
    }))

  return [
    ...toUrls('talleres', body?.data?.talleresCollection),
    ...toUrls('articulos', body?.data?.articulosCollection),
  ]
})
