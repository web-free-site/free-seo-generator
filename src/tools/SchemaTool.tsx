import { FC, useMemo, useState } from 'react'
import { buildSchemaJson, toScriptTag, type LocalBusinessInput, type SchemaType } from '../lib/vendor/local-schema'
import { CodeOutput, ToolChrome } from '../components/ToolChrome'

export const SchemaTool: FC = () => {
  const [input, setInput] = useState<LocalBusinessInput>({
    type: 'WebSite',
    name: 'Example Company',
    url: 'https://example.com',
    description: 'Short description of your site or business.',
  })
  const [faqRows, setFaqRows] = useState('What are your hours?|Mon–Fri 9–5\nDo you ship internationally?|Yes, worldwide.')

  const { json, errors } = useMemo(() => {
    const faq =
      input.type === 'FAQPage'
        ? faqRows
            .split(/\n/)
            .map((line) => line.split('|'))
            .filter((p) => p.length >= 2)
            .map(([question, answer]) => ({ question: question.trim(), answer: answer.trim() }))
        : undefined
    return buildSchemaJson({ ...input, faq })
  }, [input, faqRows])

  const script = toScriptTag(json)

  const set = <K extends keyof LocalBusinessInput>(key: K, value: LocalBusinessInput[K]) =>
    setInput((v) => ({ ...v, [key]: value }))

  return (
    <ToolChrome title="JSON-LD schema generator" lead="Schema.org output from Local Schema Generator (MIT).">
      <label>
        Schema type
        <select value={input.type} onChange={(e) => set('type', e.target.value as SchemaType)}>
          <option value="WebSite">WebSite</option>
          <option value="Organization">Organization</option>
          <option value="LocalBusiness">LocalBusiness</option>
          <option value="Article">Article</option>
          <option value="FAQPage">FAQPage</option>
        </select>
      </label>
      <label>
        Name
        <input value={input.name} onChange={(e) => set('name', e.target.value)} />
      </label>
      <label>
        URL
        <input value={input.url || ''} onChange={(e) => set('url', e.target.value)} />
      </label>
      <label>
        Description
        <textarea value={input.description || ''} onChange={(e) => set('description', e.target.value)} rows={2} />
      </label>
      {(input.type === 'LocalBusiness' || input.type === 'Organization') && (
        <div className="inline-fields">
          <label>
            City
            <input value={input.city || ''} onChange={(e) => set('city', e.target.value)} />
          </label>
          <label>
            Country
            <input value={input.country || ''} onChange={(e) => set('country', e.target.value)} />
          </label>
        </div>
      )}
      {input.type === 'Article' && (
        <>
          <label>
            Headline
            <input value={input.headline || ''} onChange={(e) => set('headline', e.target.value)} />
          </label>
          <label>
            Author
            <input value={input.author || ''} onChange={(e) => set('author', e.target.value)} />
          </label>
        </>
      )}
      {input.type === 'FAQPage' && (
        <label>
          FAQ rows (question|answer per line)
          <textarea value={faqRows} onChange={(e) => setFaqRows(e.target.value)} rows={4} className="mono" />
        </label>
      )}
      {errors.length ? (
        <ul className="form-error">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      ) : null}
      <CodeOutput code={script} label="JSON-LD script tag" />
    </ToolChrome>
  )
}
