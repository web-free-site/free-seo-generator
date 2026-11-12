# Free SEO Generator

All-in-one client-side SEO toolkit for [free-seo-generator.web-free.site](https://free-seo-generator.web-free.site): meta tags (SERP preview), robots.txt, XML sitemap, JSON-LD schema, and hreflang.

## Open-source bases (MIT)

- [MetaCraft](https://github.com/mahdyarmonfared/meta-craft) — meta tag HTML generation
- [OpenRobots](https://github.com/rorshopping/openrobots) — robots.txt + AI agent presets
- [local-schema-generator](https://github.com/tommytbomar-dot/local-schema-generator) — JSON-LD builder
- [browser-sitemap-generator](https://github.com/RadhaJivanadas/browser-sitemap-generator) — XML sitemap from URL list
- [vite-react-hreflang-generator](https://github.com/cksmct/vite-react-hreflang-generator) — hreflang tag pattern

## Develop

```bash
npm install
npm run dev
npm run build
npm test
```

Deploy is handled outside this repo (`wrangler.toml` included; do not deploy from the agent).
