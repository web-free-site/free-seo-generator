import { FC } from 'react'

interface Props {
  title: string
  description: string
  url: string
}

export const SerpPreview: FC<Props> = ({ title, description, url }) => {
  const displayUrl = url || 'https://example.com/page'
  let host = 'example.com'
  try {
    host = new URL(displayUrl.startsWith('http') ? displayUrl : `https://${displayUrl}`).hostname
  } catch {
    /* keep default */
  }

  const trimmedTitle = title || 'Page title preview'
  const trimmedDesc =
    description ||
    'Meta description preview — write a compelling summary between about 70 and 160 characters for best results in search.'

  return (
    <div className="serp-preview" aria-label="Google SERP preview">
      <p className="serp-preview__label">SERP preview</p>
      <div className="serp-preview__card">
        <div className="serp-preview__url">
          <span className="serp-preview__favicon" aria-hidden />
          {host}
          <span className="serp-preview__breadcrumb"> › page</span>
        </div>
        <h2 className={`serp-preview__title${trimmedTitle.length > 60 ? ' serp-preview__title--warn' : ''}`}>
          {trimmedTitle}
        </h2>
        <p className={`serp-preview__desc${trimmedDesc.length > 160 ? ' serp-preview__desc--warn' : ''}`}>
          {trimmedDesc}
        </p>
      </div>
    </div>
  )
}
