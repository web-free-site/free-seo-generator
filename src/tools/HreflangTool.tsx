import { FC, useMemo, useState } from 'react'
import { generateHreflangTags, type HreflangEntry } from '../lib/vendor/hreflang-generator'
import { CodeOutput, ToolChrome } from '../components/ToolChrome'

const defaultRows =
  'en|https://example.com/\nen-GB|https://example.com/en-gb/\nfr|https://example.com/fr/'

export const HreflangTool: FC = () => {
  const [rows, setRows] = useState(defaultRows)
  const [xDefault, setXDefault] = useState('https://example.com/')
  const [error, setError] = useState<string | null>(null)

  const html = useMemo(() => {
    const entries: HreflangEntry[] = rows
      .split(/\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [lang, ...rest] = line.split('|')
        return { lang: lang.trim(), href: rest.join('|').trim() }
      })
    try {
      const out = generateHreflangTags(entries, { xDefaultHref: xDefault })
      setError(null)
      return out
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid hreflang rows')
      return ''
    }
  }, [rows, xDefault])

  return (
    <ToolChrome title="Hreflang generator" lead="Alternate link tags (MIT vite-react-hreflang pattern).">
      <label>
        Rows: <code>language-code|absolute-url</code> (one per line)
        <textarea value={rows} onChange={(e) => setRows(e.target.value)} rows={5} className="mono" />
      </label>
      <label>
        x-default URL
        <input value={xDefault} onChange={(e) => setXDefault(e.target.value)} />
      </label>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <CodeOutput code={html} label="Hreflang link tags" />
    </ToolChrome>
  )
}
