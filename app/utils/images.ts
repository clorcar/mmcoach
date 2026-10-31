const CONTENTFUL_IMAGES_ORIGIN = 'https://images.ctfassets.net/'

/**
 * @nuxt/image never transforms SVGs, so it would leave them pointing at Contentful's CDN, which
 * sets a third-party cookie. Serve them from our own origin through the `/ctf/*` rewrite in
 * netlify.toml instead. Not for SEO/JSON-LD URLs, which must stay absolute.
 */
export function toRenderableImageUrl(url: string): string {
  const isSvg = new URL(url, CONTENTFUL_IMAGES_ORIGIN).pathname.endsWith('.svg')
  return isSvg && url.startsWith(CONTENTFUL_IMAGES_ORIGIN)
    ? `/ctf/${url.slice(CONTENTFUL_IMAGES_ORIGIN.length)}`
    : url
}
