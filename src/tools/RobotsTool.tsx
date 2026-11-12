import { FC, useMemo, useState } from 'react'
import { generateRobots } from '../lib/vendor/openrobots-robots'
import { AI_AGENTS, PRESETS, applyPreset, type PresetId } from '../lib/openrobots-presets'
import { CodeOutput, ToolChrome } from '../components/ToolChrome'
import { SITE } from '../site'

export const RobotsTool: FC = () => {
  const [blocked, setBlocked] = useState<string[]>([])
  const [sitemapUrls, setSitemapUrls] = useState('https://example.com/sitemap.xml')
  const [disallowPaths, setDisallowPaths] = useState('/admin/\n/private/')

  const output = useMemo(
    () =>
      generateRobots({
        blockedAgents: blocked,
        sitemapUrls: sitemapUrls.split(/\n/).map((s) => s.trim()).filter(Boolean),
        customDisallowPaths: disallowPaths.split(/\n/).map((s) => s.trim()).filter(Boolean),
        siteCredit: SITE.name,
      }),
    [blocked, sitemapUrls, disallowPaths],
  )

  const apply = (id: PresetId) => setBlocked(applyPreset(id, AI_AGENTS))

  return (
    <ToolChrome title="Robots.txt generator" lead="AI crawler presets from OpenRobots (MIT) plus standard allow/disallow rules.">
      <div className="preset-row">
        {PRESETS.map((p) => (
          <button key={p.id} type="button" className="preset-btn" onClick={() => apply(p.id)} title={p.description}>
            {p.label}
          </button>
        ))}
      </div>
      <p className="muted small">Blocked AI agents: {blocked.length > 0 ? blocked.length : 'none'}</p>
      <details className="agents-panel">
        <summary>Toggle individual AI user-agents ({AI_AGENTS.length})</summary>
        <button type="button" onClick={() => setBlocked([])}>
          Clear all
        </button>
        <button type="button" onClick={() => setBlocked(AI_AGENTS.map((a) => a.name))}>
          Block all
        </button>
        <div className="agents-list">
          {AI_AGENTS.map((agent) => (
            <label key={agent.name} className="agent-check">
              <input
                type="checkbox"
                checked={blocked.includes(agent.name)}
                onChange={() =>
                  setBlocked((prev) =>
                    prev.includes(agent.name) ? prev.filter((n) => n !== agent.name) : [...prev, agent.name],
                  )
                }
              />
              <span>{agent.name}</span>
              <small>{agent.category}</small>
            </label>
          ))}
        </div>
      </details>
      <label>
        Sitemap URLs (one per line)
        <textarea value={sitemapUrls} onChange={(e) => setSitemapUrls(e.target.value)} rows={2} />
      </label>
      <label>
        Extra Disallow paths (one per line)
        <textarea value={disallowPaths} onChange={(e) => setDisallowPaths(e.target.value)} rows={3} />
      </label>
      <CodeOutput code={output} filename="robots.txt" label="robots.txt" />
    </ToolChrome>
  )
}
