/**
 * Pattern from vite-react-hreflang-generator (MIT) — github.com/cksmct/vite-react-hreflang-generator
 * Client-side hreflang link tag generator for alternate URLs.
 */

export interface HreflangEntry {
  lang: string
  href: string
}

export interface HreflangOptions {
  xDefaultHref?: string
}

const LANG_RE = /^([a-z]{2,3})(-[a-z0-9]{2,8})*$|^x-default$/i

export function validateHreflangEntry(entry: HreflangEntry): string | null {
  if (!LANG_RE.test(entry.lang.trim())) return `Invalid hreflang code: ${entry.lang}`
  if (!/^https?:\/\//i.test(entry.href.trim())) return `URL must be absolute: ${entry.href}`
  return null
}

export function generateHreflangTags(entries: HreflangEntry[], options: HreflangOptions = {}): string {
  const lines: string[] = []
  for (const entry of entries) {
    const err = validateHreflangEntry(entry)
    if (err) throw new Error(err)
    lines.push(`<link rel="alternate" hreflang="${entry.lang.trim()}" href="${escapeAttr(entry.href.trim())}" />`)
  }
  const xDefault = options.xDefaultHref?.trim()
  if (xDefault) {
    if (!/^https?:\/\//i.test(xDefault)) throw new Error('x-default href must be absolute')
    lines.push(`<link rel="alternate" hreflang="x-default" href="${escapeAttr(xDefault)}" />`)
  }
  return lines.join('\n')
}

function escapeAttr(str: string) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}
