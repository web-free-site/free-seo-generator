/**
 * Adapted from OpenRobots (MIT) — github.com/rorshopping/openrobots
 */

export interface RobotsOptions {
  blockedAgents: string[]
  sitemapUrls?: string[]
  crawlDelays?: Record<string, number>
  customDisallowPaths?: string[]
  siteCredit?: string
}

const DEFAULT_CREDIT = 'Free SEO Generator'

interface RuleGroup {
  agents: string[]
  rules: string[]
}

export function generateRobots(opts: RobotsOptions): string {
  const { blockedAgents, sitemapUrls = [], crawlDelays = {}, customDisallowPaths = [] } = opts
  const header = [
    `# robots.txt — ${opts.siteCredit || DEFAULT_CREDIT}`,
    '# Generated in your browser; review before upload.',
  ]

  const blocked = [...new Set(blockedAgents.map((name) => name.trim()).filter(Boolean))]
  const disallowPaths = [...new Set(customDisallowPaths.map((p) => p.trim()).filter(Boolean))]

  const groups: RuleGroup[] = []

  if (blocked.length === 0) {
    const rules = ['Allow: /']
    for (const path of disallowPaths) rules.push(`Disallow: ${path}`)
    groups.push({ agents: ['*'], rules })
  } else {
    const delayed: RuleGroup[] = []
    const rest: string[] = []
    for (const name of blocked) {
      const delay = crawlDelays[name]
      if (typeof delay === 'number' && Number.isFinite(delay) && delay > 0) {
        delayed.push({ agents: [name], rules: ['Disallow: /', `Crawl-delay: ${delay}`] })
      } else {
        rest.push(name)
      }
    }
    if (rest.length > 0) {
      const rules = ['Disallow: /']
      for (const path of disallowPaths) rules.push(`Disallow: ${path}`)
      groups.push({ agents: rest, rules })
    }
    groups.push(...delayed)
    if (disallowPaths.length) {
      groups.unshift({
        agents: ['*'],
        rules: ['Allow: /', ...disallowPaths.map((p) => `Disallow: ${p}`)],
      })
    }
  }

  const lines: string[] = [...header]
  groups.forEach((group, index) => {
    if (index > 0) lines.push('')
    for (const agent of group.agents) lines.push(`User-agent: ${agent}`)
    lines.push(...group.rules)
  })

  const sitemaps = sitemapUrls.map((url) => url.trim()).filter(Boolean)
  if (sitemaps.length > 0) {
    lines.push('')
    for (const url of sitemaps) lines.push(`Sitemap: ${url}`)
  }

  return lines.join('\n') + '\n'
}
