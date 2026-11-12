import { SITE } from '../site'

export interface SeoPage {
  path: string
  locale: 'en' | 'fr'
  title: string
  description: string
  h1: string
  keywords: string
  paragraphs: string[]
  howTo: string[]
  faq: { q: string; a: string }[]
  tool?: 'hub' | 'meta' | 'robots' | 'sitemap' | 'schema' | 'hreflang' | 'og' | 'twitter'
}

const sharedFaq = [
  {
    q: 'Is Free SEO Generator really free?',
    a: 'Yes. There is no account and no paid API. Generators run entirely in your browser.',
  },
  {
    q: 'Do you store my URLs or meta tags?',
    a: 'No. Data stays on your device unless you copy or download the output yourself.',
  },
]

export const SEO_PAGES: SeoPage[] = [
  {
    path: '/',
    locale: 'en',
    title: 'Free SEO Generator — Meta tags, robots.txt, sitemap, schema & hreflang',
    description:
      'All-in-one free SEO tag generator: meta tags with SERP preview, robots.txt, XML sitemap from a URL list, JSON-LD schema, and hreflang tags. Client-side, no sign-up.',
    h1: 'Free SEO Generator — all-in-one tags for search and social',
    keywords: 'free seo generator, meta tag generator, robots.txt generator, xml sitemap, json-ld, hreflang',
    paragraphs: [
      'Free SEO Generator bundles the markup tasks developers and marketers repeat on every launch: title and description meta tags, Open Graph and Twitter cards, robots.txt, XML sitemaps, Schema.org JSON-LD, and hreflang alternates.',
      'Each tool has its own focused page so you can bookmark what you need. Everything processes locally in your browser — no API keys and no uploads.',
      'Use the SERP preview when tuning titles and descriptions, export copy-ready HTML, and download sitemap.xml or robots.txt in one click.',
    ],
    howTo: [
      'Pick a tool from the navigation (meta tags, robots, sitemap, schema, or hreflang).',
      'Fill in your page details or URL list.',
      'Copy the generated HTML, XML, or JSON-LD into your site or CMS.',
    ],
    faq: [
      ...sharedFaq,
      {
        q: 'Which open-source projects power this site?',
        a: 'MetaCraft, OpenRobots, Local Schema Generator, browser-sitemap-generator, and vite-react-hreflang-generator (all MIT). See About for links.',
      },
    ],
    tool: 'hub',
  },
  {
    path: '/meta-tag-generator',
    locale: 'en',
    title: 'Free Meta Tag Generator — SERP & Open Graph preview',
    description:
      'Generate HTML meta tags, Open Graph, and Twitter cards with a live Google SERP preview. Free, browser-based, no sign-up.',
    h1: 'Meta tag generator with SERP preview',
    keywords: 'meta tag generator, serp preview, open graph generator, twitter card tags',
    paragraphs: [
      'Build a complete head tag block: title, description, canonical, robots, Open Graph, and Twitter/X cards. The SERP preview shows how your snippet may look in Google results.',
      'Output is adapted from the MIT MetaCraft generator engine, formatted for pasting into static HTML, WordPress, or any CMS custom head field.',
      'Character counters highlight when titles or descriptions exceed common SEO length guidelines.',
    ],
    howTo: [
      'Enter your page title, meta description, and canonical URL.',
      'Add an OG image URL and Twitter handle if you use social cards.',
      'Copy the HTML output into your page <head> section.',
    ],
    faq: [
      ...sharedFaq,
      { q: 'What is a good meta title length?', a: 'Aim for about 50–60 visible characters; longer titles may truncate in search results.' },
    ],
    tool: 'meta',
  },
  {
    path: '/robots-txt-generator',
    locale: 'en',
    title: 'Free robots.txt Generator — AI crawlers & sitemap line',
    description:
      'Create robots.txt with AI crawler presets, custom disallow paths, and Sitemap directives. Based on OpenRobots (MIT).',
    h1: 'Robots.txt generator',
    keywords: 'robots.txt generator, block gptbot, ai crawler robots',
    paragraphs: [
      'robots.txt tells crawlers what they may fetch. This generator uses OpenRobots presets to block or allow known AI agents, plus standard rules for your whole site.',
      'Add one or more Sitemap: URLs so search engines discover your XML sitemap quickly.',
      'Review the file before upload — robots.txt is authoritative for polite crawlers that respect it.',
    ],
    howTo: [
      'Choose a preset (allow all, block training bots, etc.) or toggle individual AI user-agents.',
      'Optionally list extra Disallow paths and your sitemap URL.',
      'Download robots.txt and place it at your site root.',
    ],
    faq: [
      ...sharedFaq,
      { q: 'Does robots.txt block bad bots?', a: 'Only well-behaved bots honor robots.txt. Combine with server rules for sensitive areas.' },
    ],
    tool: 'robots',
  },
  {
    path: '/xml-sitemap-generator',
    locale: 'en',
    title: 'Free XML Sitemap Generator — URL list to sitemap.xml',
    description:
      'Paste a list of page URLs and download a valid XML sitemap. Same-host URLs only. MIT browser-sitemap-generator logic.',
    h1: 'XML sitemap generator from URL list',
    keywords: 'xml sitemap generator, sitemap.xml creator, free sitemap tool',
    paragraphs: [
      'Search engines use XML sitemaps to discover URLs. Paste one absolute HTTPS URL per line; the tool validates host consistency and escapes XML entities.',
      'Optional changefreq and priority fields help you match your CMS defaults. Up to 50,000 URLs per file (sitemap protocol limit).',
      'Reference your sitemap in robots.txt with a Sitemap: directive.',
    ],
    howTo: [
      'Paste full URLs (one per line) for a single hostname.',
      'Set changefreq or priority if needed.',
      'Download sitemap.xml and upload to your site root.',
    ],
    faq: [
      ...sharedFaq,
      { q: 'Can I mix multiple domains?', a: 'Each sitemap file should list URLs on one hostname. Create separate files per domain.' },
    ],
    tool: 'sitemap',
  },
  {
    path: '/schema-json-ld-generator',
    locale: 'en',
    title: 'Free JSON-LD Schema Generator — LocalBusiness, Article, FAQ',
    description:
      'Build Schema.org JSON-LD for LocalBusiness, Organization, WebSite, Article, and FAQPage. MIT Local Schema Generator core.',
    h1: 'Schema.org JSON-LD generator',
    keywords: 'json-ld generator, schema.org, structured data generator',
    paragraphs: [
      'Structured data helps search engines understand your content. Generate JSON-LD plus a ready-to-paste script tag.',
      'The form adapts fields by schema type — address fields for local businesses, headline and author for articles, Q&A pairs for FAQPage.',
      'Validate output in Google Rich Results Test before publishing.',
    ],
    howTo: [
      'Select a schema type and fill required fields.',
      'Fix any validation messages shown inline.',
      'Copy the script tag into your HTML template.',
    ],
    faq: [
      ...sharedFaq,
      { q: 'JSON-LD or microdata?', a: 'JSON-LD in a script tag is the most common approach for new sites because it keeps markup separate from visible HTML.' },
    ],
    tool: 'schema',
  },
  {
    path: '/hreflang-generator',
    locale: 'en',
    title: 'Free Hreflang Tag Generator — alternate language links',
    description:
      'Generate <link rel="alternate" hreflang> tags for multilingual SEO, including x-default. MIT hreflang pattern.',
    h1: 'Hreflang generator',
    keywords: 'hreflang generator, alternate language tags, multilingual seo',
    paragraphs: [
      'Hreflang tags tell search engines which URL serves each language or region. Add one row per locale with a valid BCP 47 language code and absolute URL.',
      'Include x-default for users whose language you do not target explicitly.',
      'Place tags in the <head> of every localized page, reciprocally linked.',
    ],
    howTo: [
      'Add language code and full URL for each alternate version.',
      'Set x-default to your fallback URL (often English).',
      'Copy the link tags into each localized page head.',
    ],
    faq: [
      ...sharedFaq,
      { q: 'Do hreflang tags replace a sitemap?', a: 'No. Use both: hreflang in HTML and hreflang annotations in an international XML sitemap when possible.' },
    ],
    tool: 'hreflang',
  },
  {
    path: '/open-graph-tag-generator',
    locale: 'en',
    title: 'Free Open Graph Tag Generator — Facebook & LinkedIn cards',
    description:
      'Generate Open Graph meta tags (og:title, og:image, og:description) for link previews on Facebook, LinkedIn, and Slack.',
    h1: 'Open Graph tag generator',
    keywords: 'open graph generator, og tags, facebook link preview',
    paragraphs: [
      'Open Graph tags control how your URL appears when shared on social networks. This page focuses on og:* properties from the same MetaCraft engine as our full meta tag tool.',
      'Use 1200×630 images when possible for crisp large previews.',
    ],
    howTo: ['Enter title, description, URL, and image.', 'Copy the Open Graph section from the output.', 'Test with your platform sharing debugger.'],
    faq: [...sharedFaq],
    tool: 'og',
  },
  {
    path: '/twitter-card-generator',
    locale: 'en',
    title: 'Free Twitter Card Generator — X summary large image',
    description: 'Create twitter:card meta tags for X (Twitter) link previews. Works with summary and summary_large_image cards.',
    h1: 'Twitter / X card meta tag generator',
    keywords: 'twitter card generator, x card meta tags',
    paragraphs: [
      'Twitter cards use meta name="twitter:*" tags. Pair them with Open Graph tags for consistent previews across platforms.',
      'Set twitter:site and twitter:creator when you have brand and author handles.',
    ],
    howTo: ['Choose card type and fill title, description, and image.', 'Copy twitter meta tags into your head.', 'Validate with the X Card Validator if available.'],
    faq: [...sharedFaq],
    tool: 'twitter',
  },
  {
    path: '/fr/generateur-seo-gratuit',
    locale: 'fr',
    title: 'Générateur SEO gratuit — Balises meta, robots.txt, sitemap',
    description:
      'Générateur SEO tout-en-un : balises meta, robots.txt, sitemap XML, JSON-LD et hreflang. Gratuit, dans le navigateur, sans inscription.',
    h1: 'Générateur SEO gratuit pour développeurs et marketeurs',
    keywords: 'générateur seo gratuit, balises meta, robots.txt',
    paragraphs: [
      'Créez vos balises SEO sans compte : meta titres et descriptions, Open Graph, robots.txt, sitemaps XML, données structurées JSON-LD et balises hreflang.',
      'Chaque outil dispose d’une page dédiée. Les données restent sur votre appareil.',
      'Basculez entre l’anglais et le français via le sélecteur de langue.',
    ],
    howTo: [
      'Choisissez un outil dans le menu.',
      'Renseignez les champs de la page.',
      'Copiez le HTML ou XML généré dans votre site.',
    ],
    faq: [
      {
        q: 'Le générateur est-il vraiment gratuit ?',
        a: 'Oui, sans abonnement. Tout s’exécute dans votre navigateur.',
      },
      {
        q: 'Stockez-vous mes données ?',
        a: 'Non. Rien n’est envoyé à nos serveurs.',
      },
    ],
    tool: 'hub',
  },
  {
    path: '/privacy',
    locale: 'en',
    title: 'Privacy — Free SEO Generator',
    description: 'Privacy policy for Free SEO Generator.',
    h1: 'Privacy',
    keywords: 'privacy',
    paragraphs: ['Generators run client-side. Ad networks may set cookies when enabled.'],
    howTo: [],
    faq: [],
  },
  {
    path: '/terms',
    locale: 'en',
    title: 'Terms — Free SEO Generator',
    description: 'Terms of use.',
    h1: 'Terms of use',
    keywords: 'terms',
    paragraphs: ['Provided as-is; you are responsible for SEO accuracy on your site.'],
    howTo: [],
    faq: [],
  },
  {
    path: '/about',
    locale: 'en',
    title: 'About — Free SEO Generator',
    description: 'About this tool and open-source credits.',
    h1: 'About',
    keywords: 'about',
    paragraphs: ['Built by Gentil M. using MIT open-source SEO generator libraries.'],
    howTo: [],
    faq: [],
  },
  {
    path: '/contact',
    locale: 'en',
    title: 'Contact — Free SEO Generator',
    description: 'Contact email.',
    h1: 'Contact',
    keywords: 'contact',
    paragraphs: [`Email ${SITE.contactEmail}`],
    howTo: [],
    faq: [],
  },
]

export function canonicalFor(path: string): string {
  const p = path === '/' ? '' : path.replace(/\/$/, '')
  return `${SITE.canonicalHost}${p || '/'}`
}

export function pageForPath(pathname: string): SeoPage {
  const path = pathname.replace(/\/$/, '') || '/'
  return (
    SEO_PAGES.find((p) => p.path === path) ??
    (path === '/fr' ? SEO_PAGES.find((p) => p.path === '/fr/generateur-seo-gratuit') : undefined) ??
    SEO_PAGES[0]
  )
}
