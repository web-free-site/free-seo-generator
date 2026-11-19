import fs from 'node:fs'
import path from 'node:path'
import { HOST, pages } from './seo-paths.mjs'

const dist = path.resolve('dist')
const baseHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

function buildPage(page) {
  const url = HOST + (page.path === '/' ? '/' : page.path)
  let html = baseHtml
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${page.locale}"`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${page.description}" />`,
  )
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
  } else {
    html = html.replace('<script src="https://ref.web-free.site/r.js" defer></script>
</head>', `    <link rel="canonical" href="${url}" />\n  </head>`)
  }
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`)
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${page.title}" />`)
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${page.description}" />`,
  )
  const seoBlock = `<section id="seo-prerender" class="seo-prerender"><h1>${page.h1}</h1>${page.snippet}</section>`
  html = html.replace('<div id="root"></div>', `${seoBlock}<div id="root"></div>`)
  return html
}

for (const page of pages) {
  const dir = path.join(dist, page.path.replace(/^\//, ''))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(page))
}

console.log('Prerendered', pages.length, 'route shells')
