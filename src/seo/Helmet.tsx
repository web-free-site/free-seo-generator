import { FC, ReactNode, createContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SEO_PAGES, canonicalFor } from './pages'

const Ctx = createContext({})

export const HelmetProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <Ctx.Provider value={{}}>{children}</Ctx.Provider>
)

export function usePageMeta() {
  const location = useLocation()
  const path = location.pathname.replace(/\/$/, '') || '/'
  const page =
    SEO_PAGES.find((p) => p.path === path) ??
    (path === '/fr' ? SEO_PAGES.find((p) => p.path === '/fr/generateur-seo-gratuit') : undefined) ??
    SEO_PAGES[0]

  useEffect(() => {
  document.title = page.title
  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', page.description)
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  const canonicalPath = page.path === '/fr/generateur-seo-gratuit' && path === '/fr' ? '/fr/generateur-seo-gratuit' : page.path
  canonical.href = canonicalFor(canonicalPath)
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', page.title)
  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', page.description)
  const ogUrl = document.querySelector('meta[property="og:url"]')
  if (ogUrl) ogUrl.setAttribute('content', canonical.href)
  document.documentElement.lang = page.locale
  }, [page, path])
}

export const RouteMeta: FC = () => {
  usePageMeta()
  return null
}
