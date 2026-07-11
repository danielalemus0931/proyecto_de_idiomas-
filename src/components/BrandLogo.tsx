type Props = {
  size?: 'sm' | 'md' | 'lg'
  showWordmark?: boolean
}

const SIZES = {
  sm: 40,
  md: 88,
  lg: 160,
}

export default function BrandLogo({ size = 'md', showWordmark = false }: Props) {
  const px = SIZES[size]
  return (
    <div className={`brand-logo brand-logo--${size}`}>
      <img
        src="/langflow-logo.png"
        alt="Langflow"
        width={px}
        height={px}
        className="brand-logo-img"
      />
      {showWordmark && <span className="brand-logo-text">Langflow</span>}
    </div>
  )
}
