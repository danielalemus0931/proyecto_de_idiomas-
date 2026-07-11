import { BACKGROUNDS, OUTFITS, shade, type KawaiiConfig } from '../lib/kawaiiAvatar'
import { COMPANIONS } from '../lib/avatarProgress'

export type AvatarMotion = 'idle' | 'wink' | 'jump' | 'celebrate'

type Props = {
  config: KawaiiConfig
  size?: number
  className?: string
  headOnly?: boolean
  /** Animaciones especiales puntuales. */
  motion?: AvatarMotion
  /** Nivel alto: brillo / aura. */
  showAura?: boolean
}

const LINE = '#5c4a3a'

/**
 * Avatar sticker/mascota por capas, con animaciones suaves.
 */
export default function KawaiiAvatar({
  config,
  size = 280,
  className,
  headOnly = false,
  motion = 'idle',
  showAura = false,
}: Props) {
  const fur = config.fur
  const furSoft = shade(fur, -8)
  const outfitColor = OUTFITS.find((o) => o.id === config.outfit)?.color ?? '#c5b3f5'
  const bg = BACKGROUNDS.find((b) => b.id === config.background)?.css ?? BACKGROUNDS[0].css
  const isPanda = config.species === 'panda'
  const bodyFur = isPanda ? '#f8f9fa' : fur
  const accentFur = isPanda ? '#2f2f2f' : furSoft
  const auraOn = showAura || config.aura
  const companion = COMPANIONS.find((c) => c.id === config.companion)

  const motionClass =
    motion === 'wink'
      ? 'avatar-motion-wink'
      : motion === 'jump'
        ? 'avatar-motion-jump'
        : motion === 'celebrate'
          ? 'avatar-motion-celebrate'
          : 'avatar-motion-idle'

  return (
    <div
      className={`kawaii-avatar sticker-avatar ${motionClass} ${auraOn ? 'avatar-has-aura' : ''} ${className ?? ''}`}
      style={{ width: size, height: size, background: headOnly ? 'transparent' : bg }}
    >
      {!headOnly && <BgDecor id={config.background} />}
      {auraOn && !headOnly && <div className="avatar-aura" aria-hidden="true" />}
      <svg
        viewBox={headOnly ? '40 10 160 150' : '0 0 240 280'}
        width={size}
        height={size}
        role="img"
        aria-label={`Avatar ${config.name}`}
        className="sticker-svg avatar-breathe-sway"
      >
        {!headOnly && (
          <g className="layer-body avatar-body-breathe">
            <ellipse cx="98" cy="248" rx="18" ry="14" fill={bodyFur} stroke={LINE} strokeWidth="2.5" />
            <ellipse cx="142" cy="248" rx="18" ry="14" fill={bodyFur} stroke={LINE} strokeWidth="2.5" />
            <ellipse cx="120" cy="200" rx="48" ry="42" fill={bodyFur} stroke={LINE} strokeWidth="2.5" />
            <ellipse cx="72" cy="198" rx="14" ry="22" fill={bodyFur} stroke={LINE} strokeWidth="2.5" transform="rotate(-18 72 198)" />
            <ellipse cx="168" cy="198" rx="14" ry="22" fill={bodyFur} stroke={LINE} strokeWidth="2.5" transform="rotate(18 168 198)" />
            <OutfitLayer outfit={config.outfit} color={outfitColor} />
            {config.accessory === 'backpack' && (
              <g>
                <rect x="148" y="176" width="28" height="34" rx="10" fill="#f8a5c2" stroke={LINE} strokeWidth="2.2" />
                <rect x="154" y="184" width="16" height="12" rx="4" fill="#ffe0ec" />
              </g>
            )}
          </g>
        )}

        <g className="layer-head">
          <Ears species={config.species} fur={bodyFur} accent={accentFur} />
          <ellipse cx="120" cy="108" rx="62" ry="58" fill={bodyFur} stroke={LINE} strokeWidth="2.8" />
          {config.species === 'panda' && (
            <>
              <ellipse cx="88" cy="100" rx="22" ry="18" fill={accentFur} opacity="0.95" />
              <ellipse cx="152" cy="100" rx="22" ry="18" fill={accentFur} opacity="0.95" />
            </>
          )}
          {config.species === 'fox' && (
            <path d="M120,118 L108,138 L132,138 Z" fill="#fff" stroke={LINE} strokeWidth="2" />
          )}
          <ellipse cx="78" cy="120" rx="12" ry="8" fill="#ffb3c6" opacity="0.7" />
          <ellipse cx="162" cy="120" rx="12" ry="8" fill="#ffb3c6" opacity="0.7" />
          <Face
            eyes={config.eyes}
            mouth={config.mouth}
            expression={config.expression}
            forceWink={motion === 'wink'}
          />
          <AccessoryLayer accessory={config.accessory} />
        </g>
      </svg>

      {!headOnly && companion && companion.id !== 'none' && companion.emoji && (
        <span className="avatar-companion" aria-hidden="true">
          {companion.emoji}
        </span>
      )}
    </div>
  )
}

function BgDecor({ id }: { id: KawaiiConfig['background'] }) {
  if (id === 'stars') {
    return (
      <div className="sticker-bg-decor" aria-hidden="true">
        <span>✦</span>
        <span>☾</span>
        <span>★</span>
      </div>
    )
  }
  if (id === 'cloudsPink' || id === 'cloudsBlue') {
    return <div className={`sticker-bg-clouds sticker-bg-clouds--${id}`} aria-hidden="true" />
  }
  return null
}

function Ears({
  species,
  fur,
  accent,
}: {
  species: KawaiiConfig['species']
  fur: string
  accent: string
}) {
  if (species === 'rabbit') {
    return (
      <g>
        <ellipse cx="78" cy="38" rx="16" ry="40" fill={fur} stroke={LINE} strokeWidth="2.5" transform="rotate(-8 78 38)" />
        <ellipse cx="162" cy="38" rx="16" ry="40" fill={fur} stroke={LINE} strokeWidth="2.5" transform="rotate(8 162 38)" />
        <ellipse cx="78" cy="40" rx="7" ry="24" fill="#ffc9d9" transform="rotate(-8 78 40)" />
        <ellipse cx="162" cy="40" rx="7" ry="24" fill="#ffc9d9" transform="rotate(8 162 40)" />
      </g>
    )
  }
  if (species === 'cat' || species === 'fox') {
    return (
      <g>
        <path d="M68,88 L62,38 L100,72 Z" fill={fur} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M172,88 L178,38 L140,72 Z" fill={fur} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M72,78 L70,52 L90,70 Z" fill="#ffc9d9" />
        <path d="M168,78 L170,52 L150,70 Z" fill="#ffc9d9" />
      </g>
    )
  }
  if (species === 'dog') {
    return (
      <g>
        <ellipse cx="58" cy="108" rx="20" ry="28" fill={accent} stroke={LINE} strokeWidth="2.4" transform="rotate(-20 58 108)" />
        <ellipse cx="182" cy="108" rx="20" ry="28" fill={accent} stroke={LINE} strokeWidth="2.4" transform="rotate(20 182 108)" />
      </g>
    )
  }
  if (species === 'bear' || species === 'panda') {
    return (
      <g>
        <circle cx="68" cy="62" r="20" fill={species === 'panda' ? accent : fur} stroke={LINE} strokeWidth="2.5" />
        <circle cx="172" cy="62" r="20" fill={species === 'panda' ? accent : fur} stroke={LINE} strokeWidth="2.5" />
        <circle cx="68" cy="62" r="10" fill="#ffc9d9" opacity="0.55" />
        <circle cx="172" cy="62" r="10" fill="#ffc9d9" opacity="0.55" />
      </g>
    )
  }
  return null
}

function Face({
  eyes,
  mouth,
  expression,
  forceWink,
}: {
  eyes: KawaiiConfig['eyes']
  mouth: KawaiiConfig['mouth']
  expression: KawaiiConfig['expression']
  forceWink?: boolean
}) {
  const eyeR = eyes === 'soft' ? 11 : 13
  const sparkle = eyes !== 'soft'
  const wink = forceWink || expression === 'wink'

  return (
    <g className="layer-face">
      {wink ? (
        <>
          <path d="M88,104 Q98,96 108,104" fill="none" stroke={LINE} strokeWidth="3.2" strokeLinecap="round" />
          <Eye cx={148} cy={104} r={eyeR} sparkle={sparkle} blink />
        </>
      ) : (
        <>
          <Eye cx={96} cy={104} r={eyeR} sparkle={sparkle} blink />
          <Eye cx={144} cy={104} r={eyeR} sparkle={sparkle} blink delay />
        </>
      )}
      <ellipse cx="120" cy="118" rx="5" ry="3.5" fill="#ff8fab" />
      {mouth === 'open' && (
        <path d="M112,128 Q120,138 128,128" fill="#ff8fab" stroke={LINE} strokeWidth="2" />
      )}
      {mouth === 'smile' && (
        <path d="M110,128 Q120,136 130,128" fill="none" stroke={LINE} strokeWidth="2.6" strokeLinecap="round" />
      )}
      {mouth === 'tiny' && <circle cx="120" cy="130" r="2.2" fill={LINE} />}
      {expression === 'calm' && (
        <path d="M100,92 Q110,88 118,92" fill="none" stroke={LINE} strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      )}
    </g>
  )
}

function Eye({
  cx,
  cy,
  r,
  sparkle,
  blink,
  delay,
}: {
  cx: number
  cy: number
  r: number
  sparkle: boolean
  blink?: boolean
  delay?: boolean
}) {
  return (
    <g className={blink ? `avatar-eye-blink ${delay ? 'avatar-eye-blink--delay' : ''}` : undefined}>
      <circle cx={cx} cy={cy} r={r} fill="#3a2e2e" />
      <circle cx={cx + r * 0.28} cy={cy - r * 0.28} r={r * 0.28} fill="#fff" />
      {sparkle && <circle cx={cx - r * 0.25} cy={cy + r * 0.15} r={r * 0.14} fill="#fff" opacity="0.9" />}
    </g>
  )
}

function OutfitLayer({ outfit, color }: { outfit: KawaiiConfig['outfit']; color: string }) {
  const dark = shade(color, -12)
  if (outfit === 'pinkDress') {
    return (
      <g className="layer-clothes">
        <path d="M78,168 Q120,158 162,168 L170,230 Q120,248 70,230 Z" fill={color} stroke={LINE} strokeWidth="2.4" />
        <ellipse cx="120" cy="168" rx="40" ry="10" fill={dark} opacity="0.2" />
      </g>
    )
  }
  if (outfit === 'overalls') {
    return (
      <g className="layer-clothes">
        <path d="M86,170 L154,170 L158,236 L82,236 Z" fill={color} stroke={LINE} strokeWidth="2.4" />
        <path d="M96,150 L96,176 M144,150 L144,176" stroke={dark} strokeWidth="5" strokeLinecap="round" />
        <circle cx="104" cy="188" r="4" fill="#ffe066" stroke={LINE} strokeWidth="1.5" />
        <circle cx="136" cy="188" r="4" fill="#ffe066" stroke={LINE} strokeWidth="1.5" />
      </g>
    )
  }
  if (outfit === 'greenTunic') {
    return (
      <g className="layer-clothes">
        <path d="M80,166 Q120,156 160,166 L164,228 Q120,240 76,228 Z" fill={color} stroke={LINE} strokeWidth="2.4" />
        <path d="M90,190 H150" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      </g>
    )
  }
  return (
    <g className="layer-clothes">
      <path d="M78,168 Q120,156 162,168 L166,220 Q120,232 74,220 Z" fill={color} stroke={LINE} strokeWidth="2.4" />
      <path d="M88,164 Q120,176 152,164" fill="none" stroke={dark} strokeWidth="3" />
      <line x1="110" y1="176" x2="106" y2="208" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <line x1="130" y1="176" x2="134" y2="208" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      {outfit === 'hoodieSkirt' && (
        <path d="M82,214 Q120,228 158,214 L162,238 Q120,250 78,238 Z" fill="#f8a5c2" stroke={LINE} strokeWidth="2.2" />
      )}
    </g>
  )
}

function AccessoryLayer({ accessory }: { accessory: KawaiiConfig['accessory'] }) {
  if (accessory === 'purpleBow' || accessory === 'pinkBow') {
    const c = accessory === 'purpleBow' ? '#b197fc' : '#f8a5c2'
    return (
      <g className="layer-accessory" transform="translate(158,48)">
        <ellipse cx="-9" cy="0" rx="12" ry="9" fill={c} stroke={LINE} strokeWidth="2" />
        <ellipse cx="9" cy="0" rx="12" ry="9" fill={c} stroke={LINE} strokeWidth="2" />
        <circle cx="0" cy="0" r="5" fill={shade(c, -15)} stroke={LINE} strokeWidth="1.8" />
      </g>
    )
  }
  if (accessory === 'cap') {
    return (
      <g className="layer-accessory">
        <ellipse cx="120" cy="58" rx="48" ry="16" fill="#f8a5c2" stroke={LINE} strokeWidth="2.3" />
        <path d="M120,42 Q160,48 168,62 L72,62 Q80,48 120,42 Z" fill="#ff8fab" stroke={LINE} strokeWidth="2.3" />
      </g>
    )
  }
  if (accessory === 'glasses') {
    return (
      <g className="layer-accessory" fill="none" stroke={LINE} strokeWidth="2.6">
        <circle cx="96" cy="104" r="16" />
        <circle cx="144" cy="104" r="16" />
        <path d="M112,104 H128" />
      </g>
    )
  }
  return null
}
