import { FC, ReactNode } from 'react'
import { AdSlot } from './ads/AdSlot'

interface Props {
  title: string
  lead?: string
  children: ReactNode
}

export const ToolChrome: FC<Props> = ({ title, lead, children }) => (
  <>
    <header className="hero">
      <h1>{title}</h1>
      {lead ? <p className="hero__lead">{lead}</p> : null}
    </header>
    <AdSlot slot="betweenToolContent728x90" className="ad-between" />
    <div className="tool-panel">{children}</div>
    <AdSlot slot="content468x60" className="ad-content" />
    <AdSlot slot="nativeBelowResult" className="ad-native" />
    <AdSlot slot="content300x250" className="ad-content" />
  </>
)

export const CodeOutput: FC<{ code: string; filename?: string; label?: string }> = ({ code, filename, label = 'Output' }) => {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      /* ignore */
    }
  }
  const download = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename || 'export.txt'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div className="code-output">
      <div className="code-output__bar">
        <span>{label}</span>
        <div className="code-output__actions">
          <button type="button" onClick={copy}>
            Copy
          </button>
          {filename ? (
            <button type="button" onClick={download}>
              Download
            </button>
          ) : null}
        </div>
      </div>
      <textarea className="code-output__area" readOnly value={code} rows={14} aria-label={label} />
    </div>
  )
}
