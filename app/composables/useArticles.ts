import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'
import { GET_ARTICLES_QUERY, GET_ARTICLE_BY_URL_QUERY } from '~/queries/articles'
import type { GetContentfulOptions } from '~/types/contentful'
import type { Articulos, ArticulosQueryResponse } from '~/types/articles'

export { GET_ARTICLES_QUERY, GET_ARTICLE_BY_URL_QUERY } from '~/queries/articles'

export interface UseArticlesReturn {
  data: ComputedRef<ArticulosQueryResponse | null>
  articles: ComputedRef<Articulos[]>
  total: ComputedRef<number>
  errors: ComputedRef<any[] | null>
  pending: ComputedRef<boolean>
  refresh: () => Promise<any>
}

export type AsyncUseArticlesReturn = UseArticlesReturn & Promise<UseArticlesReturn>

export interface UseArticleReturn {
  data: ComputedRef<ArticulosQueryResponse | null>
  article: ComputedRef<Articulos | null>
  errors: ComputedRef<any[] | null>
  pending: ComputedRef<boolean>
  refresh: () => Promise<any>
}

export type AsyncUseArticleReturn = UseArticleReturn & Promise<UseArticleReturn>

/**
 * Composable to fetch a list of articles from Contentful.
 *
 * Items are fetched in pages of 10 (rich text links cost ~1000 query complexity per article)
 * and capped at 100.
 *
 * @param options Optional query options (limit, skip, order, where).
 * @returns Clean reactive articles list, total count, error state, and refresh action.
 */
export function useArticles(options?: GetContentfulOptions): AsyncUseArticlesReturn {
  const queryResult = useContentfulCollection<ArticulosQueryResponse>(
    GET_ARTICLES_QUERY,
    'articulosCollection',
    options,
    { pageSize: 10 },
  )

  const articles = computed<Articulos[]>(
    () => queryResult.data.value?.articulosCollection?.items ?? [],
  )

  const total = computed<number>(() => queryResult.data.value?.articulosCollection?.total ?? 0)

  const result: UseArticlesReturn = {
    data: queryResult.data,
    articles,
    total,
    errors: queryResult.errors,
    pending: queryResult.pending,
    refresh: queryResult.refresh,
  }

  const resultPromise = Promise.resolve(queryResult).then(() => result)
  Object.assign(resultPromise, result)

  return resultPromise as AsyncUseArticlesReturn
}

/**
 * Composable to fetch a single article by its unique URL slug.
 *
 * @param url The unique URL slug of the article.
 * @returns Clean reactive article item, error state, and refresh action.
 */
export function useArticleByUrl(url: MaybeRefOrGetter<string>): AsyncUseArticleReturn {
  const resolvedUrl = toValue(url)

  const queryResult = useContentfulQuery<ArticulosQueryResponse>(GET_ARTICLE_BY_URL_QUERY, {
    url: resolvedUrl,
  })

  const article = computed<Articulos | null>(
    () => queryResult.data.value?.articulosCollection?.items?.[0] ?? null,
  )

  const result: UseArticleReturn = {
    data: queryResult.data,
    article,
    errors: queryResult.errors,
    pending: queryResult.pending,
    refresh: queryResult.refresh,
  }

  const resultPromise = Promise.resolve(queryResult).then(() => result)
  Object.assign(resultPromise, result)

  return resultPromise as AsyncUseArticleReturn
}
