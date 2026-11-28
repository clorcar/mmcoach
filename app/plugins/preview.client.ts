/**
 * Editor preview: Contentful's "Content preview URL" opens a page with `?preview=<token>`.
 * The token is kept for the tab session and removed from the URL; every page then refetches
 * its data from the Preview API, so drafts replace the prerendered content.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const isPreview = useIsPreview()

  const { preview, ...query } = router.currentRoute.value.query
  if (typeof preview === 'string' && preview) {
    setPreviewToken(preview)
    router.replace({ query })
  }

  if (!getPreviewToken()) return

  isPreview.value = true
  nuxtApp.hook('page:finish', () => refreshNuxtData())
})
