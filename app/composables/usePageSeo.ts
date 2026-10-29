import { toValue, type MaybeRefOrGetter } from 'vue'
import type { Image } from '~/types/content'

export interface PageSeoOptions {
  title: string
  /** Falls back to the site description */
  description?: string
  image?: Image | null
  type?: 'website' | 'article'
}

const DESCRIPTION_MAX_LENGTH = 160

/**
 * Sets title, description, canonical, Open Graph and Twitter meta for a page.
 * The only place SEO meta is defined; every page calls it.
 */
export function usePageSeo(options: MaybeRefOrGetter<PageSeoOptions>) {
  const site = useSiteConfig()
  const route = useRoute()

  const canonicalUrl = computed(() => `${site.url}${route.path === '/' ? '' : route.path}`)
  const description = computed(() =>
    truncate(toValue(options).description || site.description || '', DESCRIPTION_MAX_LENGTH),
  )
  // Open Graph needs an absolute URL in a widely supported format and size
  const imageUrl = computed(() => {
    const image = toValue(options).image
    return image ? `${image.url}?w=1200&h=630&fit=fill&fm=jpg` : undefined
  })

  useSeoMeta({
    title: () => toValue(options).title,
    description,
    ogTitle: () => toValue(options).title,
    ogDescription: description,
    ogType: () => toValue(options).type ?? 'website',
    ogUrl: canonicalUrl,
    ogSiteName: site.name,
    ogLocale: 'es_ES',
    ogImage: imageUrl,
    ogImageAlt: () => toValue(options).image?.alt,
    twitterCard: () => (imageUrl.value ? 'summary_large_image' : 'summary'),
    twitterTitle: () => toValue(options).title,
    twitterDescription: description,
    twitterImage: imageUrl,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
  })
}
