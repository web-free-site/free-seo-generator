import { FC, useMemo, useState } from 'react'
import { generateHtmlMeta, type MetaFields } from '../lib/vendor/metacraft-generator'
import { SerpPreview } from '../components/SerpPreview'
import { CodeOutput, ToolChrome } from '../components/ToolChrome'

const defaults: MetaFields = {
  title: 'Free SEO Generator — Meta tags for every page',
  description:
    'Generate meta tags, Open Graph, and Twitter cards with a live SERP preview. Free, client-side, no sign-up required.',
  canonical: 'https://example.com/your-page',
  robots: 'index, follow',
  ogType: 'website',
  ogSiteName: 'Your Site',
  ogImage: 'https://example.com/og-image.jpg',
  twitterCard: 'summary_large_image',
}

export const MetaTagTool: FC<{ focus?: 'all' | 'og' | 'twitter' }> = ({ focus = 'all' }) => {
  const [meta, setMeta] = useState<MetaFields>({ ...defaults })

  const html = useMemo(() => {
    const synced: MetaFields = {
      ...meta,
      ogTitle: meta.title,
      ogDescription: meta.description,
      ogUrl: meta.canonical,
      twitterTitle: meta.title,
      twitterDescription: meta.description,
      twitterImage: meta.ogImage,
    }
    const full = generateHtmlMeta(synced)
    if (focus === 'og') {
      return full
        .split('\n')
        .filter((line) => line.includes('og:') || line.includes('Open Graph') || line.trim() === '')
        .join('\n')
    }
    if (focus === 'twitter') {
      return full
        .split('\n')
        .filter((line) => line.includes('twitter:') || line.includes('Twitter') || line.trim() === '')
        .join('\n')
    }
    return full
  }, [meta, focus])

  const set = (key: keyof MetaFields, value: string) => setMeta((m) => ({ ...m, [key]: value }))

  return (
    <ToolChrome
      title={focus === 'og' ? 'Open Graph tags' : focus === 'twitter' ? 'Twitter / X card tags' : 'Meta tag generator'}
      lead="Live SERP preview and copy-ready HTML from the MetaCraft engine (MIT)."
    >
      <div className="tool-grid">
        <div className="tool-form">
          <label>
            Title
            <input value={meta.title || ''} onChange={(e) => set('title', e.target.value)} maxLength={120} />
            <span className="counter">{(meta.title || '').length} / 60</span>
          </label>
          <label>
            Meta description
            <textarea value={meta.description || ''} onChange={(e) => set('description', e.target.value)} rows={3} />
            <span className="counter">{(meta.description || '').length} / 160</span>
          </label>
          <label>
            Canonical URL
            <input value={meta.canonical || ''} onChange={(e) => set('canonical', e.target.value)} />
          </label>
          {focus === 'all' ? (
            <>
              <label>
                Robots
                <input value={meta.robots || ''} onChange={(e) => set('robots', e.target.value)} />
              </label>
              <label>
                Keywords
                <input value={meta.keywords || ''} onChange={(e) => set('keywords', e.target.value)} />
              </label>
            </>
          ) : null}
          <label>
            OG / Twitter image URL
            <input value={meta.ogImage || ''} onChange={(e) => set('ogImage', e.target.value)} />
          </label>
          <label>
            OG site name
            <input value={meta.ogSiteName || ''} onChange={(e) => set('ogSiteName', e.target.value)} />
          </label>
          <label>
            Twitter @site
            <input value={meta.twitterSite || ''} onChange={(e) => set('twitterSite', e.target.value)} placeholder="@brand" />
          </label>
        </div>
        <SerpPreview title={meta.title || ''} description={meta.description || ''} url={meta.canonical || ''} />
      </div>
      <CodeOutput code={html} label="HTML meta tags" />
    </ToolChrome>
  )
}
