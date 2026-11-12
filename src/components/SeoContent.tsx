import { FC } from 'react'
import { SeoPage } from '../seo/pages'
import { JsonLd } from './JsonLd'

export const SeoContent: FC<{ page: SeoPage }> = ({ page }) => (
  <article className="content-article">
    <JsonLd page={page} />
    {page.paragraphs.map((p, i) => (
      <p key={i}>{p}</p>
    ))}
    <h2>How to use</h2>
    <ol>
      {page.howTo.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ol>
    <h2>FAQ</h2>
    <dl className="faq">
      {page.faq.map((f) => (
        <div key={f.q}>
          <dt>{f.q}</dt>
          <dd>{f.a}</dd>
        </div>
      ))}
    </dl>
  </article>
)
