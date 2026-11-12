import { FC, useMemo, useState } from 'react'
import { SitemapGenerationError, generateXmlSitemap } from '../lib/vendor/sitemap-generator'
import { CodeOutput, ToolChrome } from '../components/ToolChrome'

const sample = `https://example.com/
https://example.com/about
https://example.com/pricing`

export const SitemapTool: FC = () => {
  const [urls, setUrls] = useState(sample)
  const [changefreq, setChangefreq] = useState('weekly')
  const [priority, setPriority] = useState('0.8')
  const result = useMemo(() => {
    try {
      return {
        error: null as string | null,
        data: generateXmlSitemap(urls, {
          changefreq: changefreq || undefined,
          defaultPriority: priority || undefined,
          includeLastmod: true,
        }),
      }
    } catch (e) {
      const msg = e instanceof SitemapGenerationError || e instanceof Error ? e.message : 'Invalid input'
      return { error: msg, data: { xml: '', count: 0 } }
    }
  }, [urls, changefreq, priority])

  return (
    <ToolChrome title="XML sitemap generator" lead="Paste URLs (MIT browser-sitemap-generator rules) and download sitemap.xml.">
      <label>
        Page URLs (one per line)
        <textarea value={urls} onChange={(e) => setUrls(e.target.value)} rows={8} className="mono" />
      </label>
      <div className="inline-fields">
        <label>
          changefreq
          <select value={changefreq} onChange={(e) => setChangefreq(e.target.value)}>
            <option value="">(omit)</option>
            <option value="always">always</option>
            <option value="hourly">hourly</option>
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="yearly">yearly</option>
          </select>
        </label>
        <label>
          priority
          <input value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="0.8" />
        </label>
      </div>
      {result.error ? <p className="form-error" role="alert">{result.error}</p> : null}
      {!result.error && result.data.count > 0 ? <p className="muted">{result.data.count} unique URLs in sitemap.</p> : null}
      <CodeOutput code={result.data.xml} filename="sitemap.xml" label="XML sitemap" />
    </ToolChrome>
  )
}
