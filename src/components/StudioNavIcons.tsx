import type { StudioNavId } from '../lib/avatarPortraits'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconSmile({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M8 14c1.2 1.5 2.8 2.2 4 2.2s2.8-.7 4-2.2" {...stroke} />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconDownload({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M12 4v10" {...stroke} />
      <path d="M8 10l4 4 4-4" {...stroke} />
      <path d="M5 18h14" {...stroke} />
    </svg>
  )
}

export function IconNav({ id, className }: { id: StudioNavId; className?: string }) {
  switch (id) {
    case 'hair':
      return (
        <svg className={className} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M7 14c0-4 2.2-7.5 5-8.5 2.8 1 5 4.5 5 8.5" {...stroke} />
          <path d="M8.5 13.5c.8 2.2 2 3.5 3.5 3.5s2.7-1.3 3.5-3.5" {...stroke} />
          <path d="M9 8.5c1-.8 2.2-1.2 3-1.2s2 .4 3 1.2" {...stroke} />
        </svg>
      )
    case 'face':
      return (
        <svg className={className} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <circle cx="12" cy="12" r="8" {...stroke} />
          <circle cx="9.5" cy="11" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="11" r="0.9" fill="currentColor" stroke="none" />
          <path d="M10 15c.7.7 1.4 1 2 1s1.3-.3 2-1" {...stroke} />
        </svg>
      )
    case 'eyes':
      return (
        <svg className={className} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M2.5 12s3.5-5.5 9.5-5.5S21.5 12 21.5 12s-3.5 5.5-9.5 5.5S2.5 12 2.5 12z" {...stroke} />
          <circle cx="12" cy="12" r="2.4" {...stroke} />
        </svg>
      )
    case 'clothes':
      return (
        <svg className={className} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M8 6l4 2.5L16 6l3 2-2 3v8H7v-8L5 8l3-2z"
            {...stroke}
          />
        </svg>
      )
    case 'accessories':
      return (
        <svg className={className} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <circle cx="12" cy="12" r="8" {...stroke} />
          <path
            d="M12 15.2l-2.6-2.4a1.7 1.7 0 012.4-2.4l.2.2.2-.2a1.7 1.7 0 012.4 2.4L12 15.2z"
            {...stroke}
          />
        </svg>
      )
    case 'background':
      return (
        <svg className={className} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="2" {...stroke} />
          <path d="M4 15l4.5-4.5 3.5 3.5 2.5-2.5L20 15" {...stroke} />
          <circle cx="9" cy="9" r="1.2" {...stroke} />
        </svg>
      )
    default:
      return null
  }
}
