import { FC } from 'react'
import { SeoContent } from '../components/SeoContent'
import { pageForPath } from '../seo/pages'
import { useLocation } from 'react-router-dom'
import { MetaTagTool } from '../tools/MetaTagTool'
import { RobotsTool } from '../tools/RobotsTool'
import { SitemapTool } from '../tools/SitemapTool'
import { SchemaTool } from '../tools/SchemaTool'
import { HreflangTool } from '../tools/HreflangTool'
import { Link } from 'react-router-dom'

export const ToolPage: FC = () => {
  const { pathname } = useLocation()
  const page = pageForPath(pathname)

  const tool = (() => {
    switch (page.tool) {
      case 'meta':
        return <MetaTagTool />
      case 'robots':
        return <RobotsTool />
      case 'sitemap':
        return <SitemapTool />
      case 'schema':
        return <SchemaTool />
      case 'hreflang':
        return <HreflangTool />
      case 'og':
        return <MetaTagTool focus="og" />
      case 'twitter':
        return <MetaTagTool focus="twitter" />
      default:
        return null
    }
  })()

  if (page.tool === 'hub') {
    return <HomeHub locale={page.locale} />
  }

  return (
    <>
      {tool}
      <SeoContent page={page} />
    </>
  )
}

const cards = [
  { path: '/meta-tag-generator', title: 'Meta tags', desc: 'SERP preview, OG & Twitter' },
  { path: '/robots-txt-generator', title: 'Robots.txt', desc: 'AI presets & sitemap line' },
  { path: '/xml-sitemap-generator', title: 'XML sitemap', desc: 'URL list → sitemap.xml' },
  { path: '/schema-json-ld-generator', title: 'JSON-LD', desc: 'Schema.org structured data' },
  { path: '/hreflang-generator', title: 'Hreflang', desc: 'Multilingual alternates' },
]

const HomeHub: FC<{ locale: 'en' | 'fr' }> = ({ locale }) => {
  const page = pageForPath('/')
  const frPage = locale === 'fr'
  return (
    <>
      <header className="hero">
        <h1>{frPage ? 'Générateur SEO gratuit' : page.h1}</h1>
        <p className="hero__lead">{frPage ? pageForPath('/fr/generateur-seo-gratuit').description : page.description}</p>
      </header>
      <div className="card-grid">
        {cards.map((c) => (
          <Link key={c.path} to={c.path} className="tool-card">
            <strong>{c.title}</strong>
            <span>{c.desc}</span>
          </Link>
        ))}
      </div>
      <SeoContent page={frPage ? pageForPath('/fr/generateur-seo-gratuit') : page} />
    </>
  )
}
