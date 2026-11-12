/**
 * Adapted from browser-sitemap-generator (MIT) — github.com/RadhaJivanadas/browser-sitemap-generator
 */

export interface SitemapOptions {
  changefreq?: string
  defaultPriority?: string
  includeLastmod?: boolean
}

export class SitemapGenerationError extends Error {}

export function generateXmlSitemap(rawLines: string, options: SitemapOptions = {}): { xml: string; count: number } {
  const lines = rawLines
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean)
  if (!lines.length) throw new SitemapGenerationError('Enter at least one full website URL.')
  if (lines.length > 50000) throw new SitemapGenerationError('Use no more than 50,000 URLs.')

  const urls = new Set<string>()
  let hostname: string | undefined

  for (const [index, line] of lines.entries()) {
    if (!/^https?:\/\//i.test(line) || /[\s\u0000-\u001f\u007f\\]/.test(line)) {
      throw new SitemapGenerationError(`URL ${index + 1}: use a full HTTP or HTTPS address.`)
    }
    const url = new URL(line)
    if (url.username || url.password || url.port) {
      throw new SitemapGenerationError(`URL ${index + 1}: remove credentials and nonstandard ports.`)
    }
    if (hostname && url.hostname !== hostname) {
      throw new SitemapGenerationError(`URL ${index + 1}: use the same hostname throughout.`)
    }
    hostname = url.hostname
    url.hash = ''
    urls.add(url.href)
  }

  const esc = (url: string) =>
    url.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')

  const lastmod = options.includeLastmod ? `\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>` : ''
  const prio = options.defaultPriority ? `\n    <priority>${options.defaultPriority}</priority>` : ''
  const freq = options.changefreq ? `\n    <changefreq>${options.changefreq}</changefreq>` : ''

  const body = [...urls]
    .map((url) => `  <url>\n    <loc>${esc(url)}</loc>${lastmod}${freq}${prio}\n  </url>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  return { xml, count: urls.size }
}
