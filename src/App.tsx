import { useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ToolPage } from './pages/ToolPage'
import { LegalPage } from './pages/LegalPage'
import { Locale } from './i18n/messages'
import { RouteMeta } from './seo/Helmet'
import { SEO_PAGES } from './seo/pages'

function localeFromPath(path: string): Locale {
  return path.startsWith('/fr') ? 'fr' : 'en'
}

function App() {
  const location = useLocation()
  const locale = useMemo(() => localeFromPath(location.pathname), [location.pathname])

  const setLocale = (l: Locale) => {
    try {
      window.localStorage.setItem('freeSeoLocale', l)
    } catch {
      /* ignore */
    }
  }

  const toolPaths = SEO_PAGES.filter((p) => p.tool && p.tool !== 'hub').map((p) => p.path)
  const allToolRoutes = ['/', '/fr', '/fr/generateur-seo-gratuit', ...toolPaths]

  return (
    <Layout locale={locale} onLocale={setLocale}>
      <RouteMeta />
      <Routes>
        <Route path="/" element={<ToolPage />} />
        <Route path="/fr" element={<ToolPage />} />
        <Route path="/fr/generateur-seo-gratuit" element={<ToolPage />} />
        {toolPaths.map((path) => (
          <Route key={path} path={path} element={<ToolPage />} />
        ))}
        <Route path="/privacy" element={<LegalPage locale={locale} kind="privacy" />} />
        <Route path="/terms" element={<LegalPage locale={locale} kind="terms" />} />
        <Route path="/about" element={<LegalPage locale={locale} kind="about" />} />
        <Route path="/contact" element={<LegalPage locale={locale} kind="contact" />} />
        <Route
          path="*"
          element={allToolRoutes.includes(location.pathname.replace(/\/$/, '') || '/') ? <ToolPage /> : <ToolPage />}
        />
      </Routes>
    </Layout>
  )
}

export default App
