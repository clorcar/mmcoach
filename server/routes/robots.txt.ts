// AI crawlers are explicitly allowed so answer engines can read and cite the site (GEO).
const AI_CRAWLERS = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']

/**
 * robots.txt, prerendered at build time so the sitemap URL uses the configured site URL.
 */
export default defineEventHandler((event) => {
  const { url } = getSiteConfig(event)

  const rules = ['*', ...AI_CRAWLERS].map((agent) => `User-agent: ${agent}\nAllow: /`)

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return [...rules, `Sitemap: ${url}/sitemap.xml`].join('\n\n') + '\n'
})
