import { FC } from 'react'
import { Locale, t } from '../i18n/messages'
import { SITE, OSS_CREDITS } from '../site'
import { AdSlot } from '../components/ads/AdSlot'

interface Props {
  locale: Locale
  kind: 'privacy' | 'terms' | 'about' | 'contact'
}

export const LegalPage: FC<Props> = ({ kind }) => {
  return (
    <article className="legal-page">
      {kind === 'privacy' && (
        <>
          <h1>{t('en', 'privacy')}</h1>
          <p>Free SEO Generator runs generators in your browser. We do not collect or store your URLs, meta tags, or exports.</p>
          <p>Adsterra ad codes may set cookies when ads are enabled. See their policy for details.</p>
          <p>Contact: {SITE.contactEmail}</p>
        </>
      )}
      {kind === 'terms' && (
        <>
          <h1>{t('en', 'terms')}</h1>
          <p>This site is provided as-is without warranty. You are responsible for the accuracy of SEO files you publish.</p>
          <p>Do not use the tools for unlawful content.</p>
        </>
      )}
      {kind === 'about' && (
        <>
          <h1>{t('en', 'about')}</h1>
          <p>
            Free SEO Generator is an all-in-one client-side toolkit for meta tags, robots.txt, XML sitemaps, JSON-LD, and
            hreflang. Built for {SITE.gentilUrl.replace('https://', '')} by Gentil M.
          </p>
          <h2>Open-source credits (MIT unless noted)</h2>
          <ul>
            {OSS_CREDITS.map((c) => (
              <li key={c.url}>
                <a href={c.url} rel="noopener noreferrer">
                  {c.name}
                </a>{' '}
                ({c.license})
              </li>
            ))}
          </ul>
        </>
      )}
      {kind === 'contact' && (
        <>
          <h1>{t('en', 'contact')}</h1>
          <p>
            Email <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> for support or corrections.
          </p>
          <p>
            Operator:{' '}
            <a href={SITE.gentilUrl} rel="noopener noreferrer">
              Gentil M.
            </a>
          </p>
        </>
      )}
      <AdSlot slot="content300x250" className="ad-content" />
    </article>
  )
}
