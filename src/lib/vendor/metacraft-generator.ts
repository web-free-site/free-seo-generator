/**
 * Adapted from MetaCraft (MIT) — github.com/mahdyarmonfared/meta-craft
 * Core HTML / JSON-LD meta tag generation.
 */

export interface MetaFields {
  title?: string
  description?: string
  keywords?: string
  author?: string
  canonical?: string
  favicon?: string
  themeColor?: string
  robots?: string
  viewport?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageAlt?: string
  ogImageWidth?: string
  ogImageHeight?: string
  ogUrl?: string
  ogType?: string
  ogSiteName?: string
  ogLocale?: string
  twitterCard?: string
  twitterSite?: string
  twitterCreator?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  twitterImageAlt?: string
}

export function generateHtmlMeta(meta: MetaFields = {}): string {
  const lines: string[] = []
  lines.push('<!-- Primary Meta Tags -->')
  if (meta.title) {
    lines.push(`<title>${escapeHtml(meta.title)}</title>`)
    lines.push(`<meta name="title" content="${escapeAttr(meta.title)}" />`)
  }
  if (meta.description) {
    lines.push(`<meta name="description" content="${escapeAttr(meta.description)}" />`)
  }
  if (meta.keywords) lines.push(`<meta name="keywords" content="${escapeAttr(meta.keywords)}" />`)
  if (meta.author) lines.push(`<meta name="author" content="${escapeAttr(meta.author)}" />`)
  if (meta.robots) lines.push(`<meta name="robots" content="${escapeAttr(meta.robots)}" />`)
  if (meta.viewport) lines.push(`<meta name="viewport" content="${escapeAttr(meta.viewport)}" />`)
  if (meta.themeColor) lines.push(`<meta name="theme-color" content="${escapeAttr(meta.themeColor)}" />`)
  if (meta.canonical) lines.push(`<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`)
  if (meta.favicon) lines.push(`<link rel="icon" type="image/x-icon" href="${escapeAttr(meta.favicon)}" />`)

  lines.push('', '<!-- Open Graph / Facebook -->')
  lines.push(`<meta property="og:type" content="${escapeAttr(meta.ogType || 'website')}" />`)
  const ogUrl = meta.ogUrl || meta.canonical
  if (ogUrl) lines.push(`<meta property="og:url" content="${escapeAttr(ogUrl)}" />`)
  const ogTitle = meta.ogTitle || meta.title
  if (ogTitle) lines.push(`<meta property="og:title" content="${escapeAttr(ogTitle)}" />`)
  const ogDesc = meta.ogDescription || meta.description
  if (ogDesc) lines.push(`<meta property="og:description" content="${escapeAttr(ogDesc)}" />`)
  const ogImage = meta.ogImage || meta.twitterImage
  if (ogImage) {
    lines.push(`<meta property="og:image" content="${escapeAttr(ogImage)}" />`)
    if (meta.ogImageAlt) lines.push(`<meta property="og:image:alt" content="${escapeAttr(meta.ogImageAlt)}" />`)
    lines.push(`<meta property="og:image:width" content="${escapeAttr(meta.ogImageWidth || '1200')}" />`)
    lines.push(`<meta property="og:image:height" content="${escapeAttr(meta.ogImageHeight || '630')}" />`)
  }
  if (meta.ogSiteName) lines.push(`<meta property="og:site_name" content="${escapeAttr(meta.ogSiteName)}" />`)
  if (meta.ogLocale) lines.push(`<meta property="og:locale" content="${escapeAttr(meta.ogLocale)}" />`)

  lines.push('', '<!-- Twitter / X -->')
  lines.push(`<meta name="twitter:card" content="${escapeAttr(meta.twitterCard || 'summary_large_image')}" />`)
  if (ogUrl) lines.push(`<meta name="twitter:url" content="${escapeAttr(ogUrl)}" />`)
  const twTitle = meta.twitterTitle || ogTitle
  if (twTitle) lines.push(`<meta name="twitter:title" content="${escapeAttr(twTitle)}" />`)
  const twDesc = meta.twitterDescription || ogDesc
  if (twDesc) lines.push(`<meta name="twitter:description" content="${escapeAttr(twDesc)}" />`)
  const twImage = meta.twitterImage || ogImage
  if (twImage) {
    lines.push(`<meta name="twitter:image" content="${escapeAttr(twImage)}" />`)
    const alt = meta.twitterImageAlt || meta.ogImageAlt
    if (alt) lines.push(`<meta name="twitter:image:alt" content="${escapeAttr(alt)}" />`)
  }
  if (meta.twitterSite) lines.push(`<meta name="twitter:site" content="${escapeAttr(meta.twitterSite)}" />`)
  if (meta.twitterCreator) lines.push(`<meta name="twitter:creator" content="${escapeAttr(meta.twitterCreator)}" />`)

  return lines.join('\n')
}

export function generateJsonLdScript(meta: MetaFields = {}): string {
  const title = meta.title || meta.ogTitle || ''
  const desc = meta.description || meta.ogDescription || ''
  const url = meta.canonical || meta.ogUrl || 'https://example.com'
  const image = meta.ogImage || meta.twitterImage || ''
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': meta.ogType === 'article' ? 'Article' : 'WebSite',
    name: meta.ogSiteName || title,
    headline: title,
    description: desc,
    url,
  }
  if (image) schema.image = image
  if (meta.author) {
    schema.author = { '@type': 'Person', name: meta.author }
  }
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeAttr(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
