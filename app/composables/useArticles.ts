import type { ComputedRef } from 'vue'
import { GET_ARTICLES_QUERY, GET_ARTICLE_BY_URL_QUERY } from '~/queries/articles'
import type { Articulos, ArticulosQueryResponse } from '~/types/articles'
import type { GetContentfulOptions } from '~/types/contentful'
import type { Article } from '~/types/content'

/**
 * Fetches a list of articles from Contentful (capped at 100).
 * Items are fetched in pages of 10 (rich text links cost ~1000 query complexity per article).
 *
 * @param options Optional query options (limit, skip, order, where).
 */
export async function useArticles(options?: GetContentfulOptions) {
  const { items, total } = await useContentfulCollection<Articulos>(
    GET_ARTICLES_QUERY,
    'articulosCollection',
    options,
    { pageSize: 10 },
  )

  return {
    articles: computed(() => items.value.map(mapArticle)),
    total,
  }
}

/**
 * Fetches a single article by its unique URL slug.
 *
 * @param url The unique URL slug of the article.
 */
export async function useArticleByUrl(
  url: string,
): Promise<{ article: ComputedRef<Article | null> }> {
  const data = await useContentfulQuery<ArticulosQueryResponse>(GET_ARTICLE_BY_URL_QUERY, { url })

  return {
    article: computed(() => {
      const entry = data.value?.articulosCollection?.items[0]
      return entry ? mapArticle(entry) : null
    }),
  }
}
