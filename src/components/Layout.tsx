import { FC, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Locale, t } from '../i18n/messages'
import { AdSlot, SponsoredSmartlink, useAdScripts } from './ads/AdSlot'
import { SITE, OSS_CREDITS } from '../site'

interface Props {
  locale: Locale
  onLocale: (l: Locale) => void
  children: ReactNode
}

const navTools = [
  { path: '/meta-tag-generator', key: 'metaTags' as const },
  { path: '/robots-txt-generator', key: 'robots' as const },
  { path: '/xml-sitemap-generator', key: 'sitemap' as const },
  { path: '/schema-json-ld-generator', key: 'schema' as const },
  { path: '/hreflang-generator', key: 'hreflang' as const },
]

export const Layout: FC<Props> = ({ locale, onLocale, children }) => {
  const location = useLocation()
  useAdScripts()

  const switchEn = location.pathname.startsWith('/fr') ? '/' : location.pathname
  const switchFr =
    location.pathname.startsWith('/fr')
      ? location.pathname
      : location.pathname === '/'
        ? '/fr/generateur-seo-gratuit'
        : `/fr${location.pathname}`

  return (
    <div className="site">
      <header className="site-header">
        <AdSlot slot="header728x90" className="ad-header" label="Sponsored" />
        <div className="site-header__inner">
          <Link to={locale === 'fr' ? '/fr/generateur-seo-gratuit' : '/'} className="brand">
            <span className="brand__mark">Se</span>
            <span className="brand__text">
              <strong>{t(locale, 'siteName')}</strong>
              <small>{t(locale, 'tagline')}</small>
            </span>
          </Link>
          <nav className="nav" aria-label="Main">
            <Link to={locale === 'fr' ? '/fr/generateur-seo-gratuit' : '/'}>{t(locale, 'home')}</Link>
            {navTools.map((item) => (
              <Link key={item.path} to={item.path}>
                {t(locale, item.key)}
              </Link>
            ))}
            <div className="lang-switch" aria-label={t(locale, 'language')}>
              <Link className={locale === 'en' ? 'active' : ''} to={switchEn} onClick={() => onLocale('en')}>
                EN
              </Link>
              <Link className={locale === 'fr' ? 'active' : ''} to={switchFr} onClick={() => onLocale('fr')}>
                FR
              </Link>
            </div>
          </nav>
        </div>
        {location.pathname === '/' || location.pathname === '/fr/generateur-seo-gratuit' ? (
          <AdSlot slot="homeTop728x90" className="ad-home-top" />
        ) : null}
      </header>

      <div className="site-body">
        <main className="site-main">{children}</main>
        <aside className="site-sidebar" aria-label="Sidebar">
          <AdSlot slot="sidebar160x600" className="ad-sidebar" />
          <AdSlot slot="sidebar160x300" className="ad-sidebar" />
        </aside>
      </div>

      <AdSlot slot="mobileSticky320x50" className="ad-mobile-sticky" label="Sponsored" />

      <footer className="site-footer">
        <p>
          <a href={SITE.gentilUrl} rel="noopener noreferrer">
            {t(locale, 'byGentil')}
          </a>
          {' · '}
          <a href={OSS_CREDITS[0].url} rel="noopener noreferrer">
            MIT {OSS_CREDITS[0].name}
          </a>
        </p>
        <p>
          <Link to="/privacy">{t(locale, 'privacy')}</Link>
          {' · '}
          <Link to="/terms">{t(locale, 'terms')}</Link>
          {' · '}
          <Link to="/about">{t(locale, 'about')}</Link>
          {' · '}
          <Link to="/contact">{t(locale, 'contact')}</Link>
        </p>
        <p className="muted">{t(locale, 'clientSideOnly')}</p>
        <SponsoredSmartlink />
      </footer>
    </div>
  )
}
