import fs from 'node:fs'
import path from 'node:path'
import { HOST, pages } from './seo-paths.mjs'

const GUIDE_PATHS = ["/how-to-write-a-meta-description", "/how-to-add-json-ld-schema-to-a-page"]
const paths = [...pages.map((p) => p.path), ...GUIDE_PATHS]

const urls = paths
  .map(
    (p) => `  <url>
    <loc>${HOST}${p === '/' ? '/' : p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

fs.writeFileSync(path.join('dist', 'sitemap.xml'), xml)
console.log('Wrote sitemap.xml')
