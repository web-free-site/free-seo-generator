/**
 * Adapted from Local Schema Generator (MIT) — github.com/tommytbomar-dot/local-schema-generator
 */

export type SchemaType = 'LocalBusiness' | 'Organization' | 'WebSite' | 'Article' | 'FAQPage'

export interface LocalBusinessInput {
  type: SchemaType
  name: string
  url?: string
  image?: string
  phone?: string
  email?: string
  description?: string
  street?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  headline?: string
  author?: string
  datePublished?: string
  faq?: { question: string; answer: string }[]
}

export function buildSchemaJson(input: LocalBusinessInput): { json: string; errors: string[] } {
  const errors: string[] = []
  if (!input.name?.trim()) errors.push('Name is required.')

  const o: Record<string, unknown> = { '@context': 'https://schema.org', '@type': input.type || 'WebSite' }
  o.name = input.name.trim()

  if (input.url) {
    if (!/^https?:\/\//i.test(input.url)) errors.push('URL must start with http:// or https://')
    else o.url = input.url.trim()
  }
  if (input.image) o.image = input.image.trim()
  if (input.phone) o.telephone = input.phone.trim()
  if (input.email) o.email = input.email.trim()
  if (input.description) o.description = input.description.trim()

  if (input.type === 'Article') {
    if (input.headline) o.headline = input.headline.trim()
    if (input.author) o.author = { '@type': 'Person', name: input.author.trim() }
    if (input.datePublished) o.datePublished = input.datePublished.trim()
  }

  if (input.type === 'LocalBusiness' || input.type === 'Organization') {
    const a: Record<string, string> = {}
    if (input.street) a.streetAddress = input.street.trim()
    if (input.city) a.addressLocality = input.city.trim()
    if (input.state) a.addressRegion = input.state.trim()
    if (input.zip) a.postalCode = input.zip.trim()
    if (Object.keys(a).length) {
      a['@type'] = 'PostalAddress'
      a.addressCountry = (input.country || 'US').trim()
      o.address = a
    }
  }

  if (input.type === 'FAQPage' && input.faq?.length) {
    o.mainEntity = input.faq.map((f) => ({
      '@type': 'Question',
      name: f.question.trim(),
      acceptedAnswer: { '@type': 'Answer', text: f.answer.trim() },
    }))
  }

  return { json: JSON.stringify(o, null, 2), errors }
}

export function toScriptTag(json: string): string {
  return `<script type="application/ld+json">\n${json}\n</script>`
}
