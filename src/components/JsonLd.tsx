import { FC } from 'react'
import { SeoPage, canonicalFor } from '../seo/pages'
import { SITE } from '../site'

interface Props {
  page: SeoPage
}

export const JsonLd: FC<Props> = ({ page }) => {
  const url = canonicalFor(page.path)
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: SITE.name,
        url,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        inLanguage: [page.locale === 'fr' ? 'fr' : 'en', 'en'],
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
