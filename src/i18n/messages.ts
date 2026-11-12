export type Locale = 'en' | 'fr'

const en = {
  siteName: 'Free SEO Generator',
  tagline: 'Meta tags, robots.txt, sitemaps, schema & hreflang — in your browser',
  home: 'Home',
  metaTags: 'Meta tags',
  robots: 'Robots.txt',
  sitemap: 'XML sitemap',
  schema: 'JSON-LD schema',
  hreflang: 'Hreflang',
  language: 'Language',
  privacy: 'Privacy',
  terms: 'Terms',
  about: 'About',
  contact: 'Contact',
  byGentil: 'Gentil M.',
  clientSideOnly: 'All generators run client-side. Nothing is uploaded to our servers.',
  copyCode: 'Copy',
  copied: 'Copied',
  download: 'Download',
}

const fr: typeof en = {
  siteName: 'Générateur SEO gratuit',
  tagline: 'Balises meta, robots.txt, sitemaps, schéma et hreflang — dans le navigateur',
  home: 'Accueil',
  metaTags: 'Balises meta',
  robots: 'Robots.txt',
  sitemap: 'Sitemap XML',
  schema: 'Schéma JSON-LD',
  hreflang: 'Hreflang',
  language: 'Langue',
  privacy: 'Confidentialité',
  terms: 'Conditions',
  about: 'À propos',
  contact: 'Contact',
  byGentil: 'Gentil M.',
  clientSideOnly: 'Tous les outils s’exécutent côté client. Rien n’est envoyé à nos serveurs.',
  copyCode: 'Copier',
  copied: 'Copié',
  download: 'Télécharger',
}

const dict = { en, fr }

export function t(locale: Locale, key: keyof typeof en): string {
  return dict[locale][key]
}
