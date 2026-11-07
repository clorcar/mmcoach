const CONTENTFUL_IMAGES_ORIGIN = 'https://images.ctfassets.net/'

// Widest size any layout needs (2x of the 800px content column). Editors may upload originals of
// 4000-6000px, which the Netlify Image CDN would otherwise download in full before resizing.
const MAX_SOURCE_WIDTH = 1600
const SOURCE_QUALITY = 90

/**
 * URL to hand to @nuxt/image, which resizes and re-encodes it through the Netlify Image CDN.
 *
 * - Raster images are first reduced by the Contentful Images API (WebP, and capped to
 *   MAX_SOURCE_WIDTH when wider, never upscaled), so the CDN fetches a lighter source. The quality
 *   stays high because the CDN encodes the final AVIF/WebP from it. GIFs are left alone to keep
 *   their animation.
 * - @nuxt/image never transforms SVGs, so they would stay on Contentful's CDN, which sets a
 *   third-party cookie. Serve them from our own origin through the `/ctf/*` rewrite in
 *   netlify.toml instead. The rewrite only exists on Netlify, so in dev the absolute URL is kept.
 *
 * Not for SEO/JSON-LD URLs, which must stay absolute and untouched.
 *
 * @param width Width in pixels of the original image, when known.
 */
export function toRenderableImageUrl(url: string, width?: number): string {
  if (!url.startsWith(CONTENTFUL_IMAGES_ORIGIN)) return url

  const source = new URL(url)
  if (source.pathname.endsWith('.svg')) {
    return import.meta.dev ? url : `/ctf/${url.slice(CONTENTFUL_IMAGES_ORIGIN.length)}`
  }

  if (source.pathname.endsWith('.gif')) return url

  source.searchParams.set('fm', 'webp')
  source.searchParams.set('q', String(SOURCE_QUALITY))
  if (width && width > MAX_SOURCE_WIDTH) {
    source.searchParams.set('w', String(MAX_SOURCE_WIDTH))
  }
  return source.toString()
}
