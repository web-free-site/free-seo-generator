import { describe, expect, it } from 'vitest'
import { generateXmlSitemap, SitemapGenerationError } from './sitemap-generator'

describe('generateXmlSitemap', () => {
  it('builds xml for same-host urls', () => {
    const { xml, count } = generateXmlSitemap('https://example.com/\nhttps://example.com/about')
    expect(count).toBe(2)
    expect(xml).toContain('<loc>https://example.com/</loc>')
    expect(xml).toContain('urlset')
  })

  it('rejects mixed hostnames', () => {
    expect(() => generateXmlSitemap('https://a.com/\nhttps://b.com/')).toThrow(SitemapGenerationError)
  })
})
