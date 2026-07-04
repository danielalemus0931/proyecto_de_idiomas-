import type { AvatarConfig } from '../types'

// Avatar de cuerpo entero dibujado con SVG (estilo caricatura).
// viewBox 240x380. Capas de atrás hacia adelante.

type Props = { config: AvatarConfig; size?: number; showBackground?: boolean }

const OUTLINE = '#3a2e2e'

export default function BodyAvatar({ config, size = 240, showBackground = true }: Props) {
  const { skin, hair, hairColor, top, topColor, bottom, bottomColor, shoes, shoesColor } = config
  const isDress = top === 'dress'
  const darker = shade(topColor, -18)

  return (
    <svg
      viewBox="0 0 240 380"
      width={size}
      height={(size * 380) / 240}
      role="img"
      aria-label="Avatar"
      style={{ display: 'block' }}
    >
      {showBackground && <rect x="0" y="0" width="240" height="380" rx="24" fill={config.background} />}

      {/* Alas detrás del cuerpo (recompensa máxima, bien visibles) */}
      {config.accessory === 'wings' && (
        <g stroke="#d9c9f2" strokeWidth="2">
          <path
            d="M100,192 C52,150 8,168 20,214 C30,204 40,210 42,222 C50,210 60,216 62,228 C70,216 82,222 84,234 C92,224 100,230 100,240 Z"
            fill="#ffffff"
          />
          <path
            d="M140,192 C188,150 232,168 220,214 C210,204 200,210 198,222 C190,210 180,216 178,228 C170,216 158,222 156,234 C148,224 140,230 140,240 Z"
            fill="#ffffff"
          />
          <path d="M96,200 C64,178 34,186 32,206" fill="none" stroke="#efe7fb" strokeWidth="3" />
          <path d="M144,200 C176,178 206,186 208,206" fill="none" stroke="#efe7fb" strokeWidth="3" />
        </g>
      )}

      {/* Piernas (piel) */}
      <line x1="106" y1="264" x2="106" y2="338" stroke={skin} strokeWidth="24" strokeLinecap="round" />
      <line x1="134" y1="264" x2="134" y2="338" stroke={skin} strokeWidth="24" strokeLinecap="round" />

      {/* Ropa inferior (si no es vestido) */}
      {!isDress && renderBottom(bottom, bottomColor)}

      {/* Zapatos */}
      {renderShoes(shoes, shoesColor)}

      {/* Brazos (piel) */}
      <line x1="80" y1="200" x2="62" y2="256" stroke={skin} strokeWidth="20" strokeLinecap="round" />
      <line x1="160" y1="200" x2="178" y2="256" stroke={skin} strokeWidth="20" strokeLinecap="round" />

      {/* Ropa superior */}
      {isDress ? renderDress(topColor, darker) : renderTop(top, topColor, darker)}

      {/* Cabello (parte trasera) — DETRÁS de la cabeza */}
      {renderHairBack(hair, hairColor)}

      {/* Cuello + cabeza + orejas (piel) */}
      <rect x="108" y="156" width="24" height="36" rx="10" fill={skin} />
      <circle cx="66" cy="120" r="10" fill={skin} />
      <circle cx="174" cy="120" r="10" fill={skin} />
      <circle cx="120" cy="116" r="58" fill={skin} />

      {/* Cara (emoción completa: cejas + ojos + boca + detalles) */}
      {renderExpression(config.expression)}

      {/* Cabello (parte frontal) */}
      {renderHairFront(hair, hairColor)}

      {/* Accesorios frontales */}
      {renderAccessory(config.accessory)}
    </svg>
  )
}

/* ------------------------- Ropa inferior ------------------------- */
function renderBottom(style: string, color: string) {
  if (style === 'skirt') {
    return <path d="M92,262 L148,262 L166,312 L74,312 Z" fill={color} stroke={OUTLINE} strokeWidth="1.5" />
  }
  const legBottom = style === 'shorts' ? 300 : 336
  return (
    <g stroke={OUTLINE} strokeWidth="1.5">
      <rect x="92" y="256" width="56" height="34" rx="12" fill={color} />
      <line x1="106" y1="278" x2="106" y2={legBottom} stroke={color} strokeWidth="24" strokeLinecap="round" />
      <line x1="134" y1="278" x2="134" y2={legBottom} stroke={color} strokeWidth="24" strokeLinecap="round" />
    </g>
  )
}

/* ------------------------- Zapatos ------------------------- */
function renderShoes(style: string, color: string) {
  const accent = shade(color, -22)
  // Un zapato centrado en cx (vista frontal, moderno).
  const sneaker = (cx: number) => (
    <g stroke={OUTLINE} strokeWidth="1.5">
      {/* parte superior */}
      <path d={`M${cx - 15},340 Q${cx - 15},322 ${cx},322 Q${cx + 15},322 ${cx + 15},340 Z`} fill={color} />
      {/* lengüeta / cordones */}
      <path d={`M${cx - 6},326 Q${cx},322 ${cx + 6},326 L${cx + 5},340 L${cx - 5},340 Z`} fill="#ffffff" />
      <line x1={cx - 5} y1="330" x2={cx + 5} y2="330" stroke={accent} strokeWidth="1.6" />
      <line x1={cx - 5} y1="335" x2={cx + 5} y2="335" stroke={accent} strokeWidth="1.6" />
      {/* franja lateral */}
      <path d={`M${cx - 14},339 Q${cx - 4},332 ${cx + 6},339`} fill="none" stroke={accent} strokeWidth="3" />
      {/* suela gruesa */}
      <path d={`M${cx - 18},339 L${cx + 18},339 Q${cx + 20},350 ${cx + 8},351 L${cx - 12},351 Q${cx - 20},350 ${cx - 18},339 Z`} fill="#ffffff" />
    </g>
  )
  if (style === 'boots') {
    const boot = (cx: number) => (
      <g stroke={OUTLINE} strokeWidth="1.5">
        <path d={`M${cx - 12},308 L${cx + 12},308 L${cx + 13},342 L${cx - 13},342 Z`} fill={color} />
        <path d={`M${cx - 15},340 L${cx + 17},340 Q${cx + 20},352 ${cx + 6},352 L${cx - 14},352 Q${cx - 18},350 ${cx - 15},340 Z`} fill={accent} />
      </g>
    )
    return (
      <g>
        {boot(104)}
        {boot(136)}
      </g>
    )
  }
  if (style === 'sandals') {
    const sandal = (cx: number) => (
      <g stroke={OUTLINE} strokeWidth="1.5">
        <path d={`M${cx - 16},344 L${cx + 16},344 Q${cx + 18},351 ${cx + 8},351 L${cx - 10},351 Q${cx - 18},351 ${cx - 16},344 Z`} fill={color} />
        <path d={`M${cx - 10},338 Q${cx},332 ${cx + 10},338`} fill="none" stroke={color} strokeWidth="4" />
      </g>
    )
    return (
      <g>
        {sandal(104)}
        {sandal(136)}
      </g>
    )
  }
  return (
    <g>
      {sneaker(104)}
      {sneaker(136)}
    </g>
  )
}

/* ------------------------- Ropa superior ------------------------- */
// Torso entallado con hombros y cintura ligera.
function torsoPath(color: string) {
  return (
    <path
      d="M80,196 Q120,190 160,196 L157,260 Q154,272 120,274 Q86,272 83,260 Z"
      fill={color}
      stroke={OUTLINE}
      strokeWidth="1.5"
    />
  )
}
function sleeves(color: string) {
  return (
    <g stroke={OUTLINE} strokeWidth="1.5">
      <path d="M80,197 Q64,200 60,220 Q74,218 84,206 Z" fill={color} />
      <path d="M160,197 Q176,200 180,220 Q166,218 156,206 Z" fill={color} />
    </g>
  )
}

function renderTop(style: string, color: string, darker: string) {
  if (style === 'tank') {
    return (
      <g stroke={OUTLINE} strokeWidth="1.5">
        {/* tirantes */}
        <path d="M100,192 L104,214 L98,216 L94,196 Z" fill={color} />
        <path d="M140,192 L136,214 L142,216 L146,196 Z" fill={color} />
        <path d="M88,208 Q120,200 152,208 L155,260 Q152,272 120,274 Q88,272 85,260 Z" fill={color} />
        <path d="M100,208 Q120,220 140,208" fill="none" stroke={darker} strokeWidth="2.5" />
      </g>
    )
  }

  return (
    <g>
      {sleeves(color)}
      {torsoPath(color)}
      {/* cuello redondo */}
      <path d="M104,196 Q120,208 136,196" fill="none" stroke={darker} strokeWidth="3" />

      {style === 'striped' && (
        <g fill="#ffffff" opacity="0.85">
          <rect x="82" y="212" width="76" height="7" />
          <rect x="82" y="228" width="76" height="7" />
          <rect x="82" y="244" width="76" height="7" />
        </g>
      )}

      {style === 'hoodie' && (
        <g stroke={OUTLINE} strokeWidth="1.5">
          {/* capucha */}
          <path d="M96,190 Q120,210 144,190 Q150,198 146,208 Q120,222 94,208 Q90,198 96,190 Z" fill={darker} />
          {/* cordones */}
          <line x1="114" y1="212" x2="112" y2="240" stroke="#ffffff" strokeWidth="3" />
          <line x1="126" y1="212" x2="128" y2="240" stroke="#ffffff" strokeWidth="3" />
          {/* bolsillo canguro */}
          <path d="M96,242 L144,242 L140,260 L100,260 Z" fill={darker} />
        </g>
      )}

      {style === 'jacket' && (
        <g stroke={OUTLINE} strokeWidth="1.5">
          {/* cuello bomber */}
          <path d="M98,198 L120,208 L142,198 L138,206 L120,216 L102,206 Z" fill={darker} />
          {/* cremallera */}
          <line x1="120" y1="208" x2="120" y2="266" stroke={darker} strokeWidth="4" />
          <circle cx="120" cy="212" r="2.4" fill="#ffffff" />
          {/* puño / dobladillo elástico */}
          <rect x="84" y="260" width="72" height="8" rx="3" fill={darker} />
        </g>
      )}
    </g>
  )
}

function renderDress(color: string, darker: string) {
  return (
    <g stroke={OUTLINE} strokeWidth="1.5">
      {sleeves(color)}
      {/* corpiño entallado + falda acampanada */}
      <path d="M82,196 Q120,190 158,196 L156,238 L184,300 Q120,320 56,300 L84,238 Z" fill={color} />
      <path d="M104,196 Q120,208 136,196" fill="none" stroke={darker} strokeWidth="3" />
      {/* cinturón */}
      <rect x="84" y="236" width="72" height="7" rx="2" fill={darker} />
      {/* borde inferior */}
      <path d="M56,300 Q120,320 184,300 L181,308 Q120,328 59,308 Z" fill={darker} />
    </g>
  )
}

/* ------------------------- Cabello ------------------------- */
function renderHairBack(style: string, color: string) {
  // Corona trasera (queda oculta tras la cabeza) + mechones a los lados.
  const crown = <path d="M58,110 Q120,66 182,110 L182,138 Q120,116 58,138 Z" fill={color} />
  switch (style) {
    case 'longStraight':
      return (
        <g fill={color}>
          {crown}
          <path d="M60,116 Q46,204 80,242 Q92,214 76,150 Z" />
          <path d="M180,116 Q194,204 160,242 Q148,214 164,150 Z" />
        </g>
      )
    case 'curlyLong':
      return (
        <g fill={color}>
          {crown}
          {/* mechones largos ondulados */}
          <path d="M60,116 Q42,170 58,220 Q66,214 62,198 Q72,210 66,190 Q76,202 70,180 Q80,190 74,166 Q66,150 60,140 Z" />
          <path d="M180,116 Q198,170 182,220 Q174,214 178,198 Q168,210 174,190 Q164,202 170,180 Q160,190 166,166 Q174,150 180,140 Z" />
        </g>
      )
    case 'ponytail':
      return (
        <g fill={color}>
          {crown}
          <path d="M164,96 Q210,122 190,200 Q176,208 172,182 Q184,132 150,116 Z" />
        </g>
      )
    case 'twinTails':
      return (
        <g fill={color}>
          {crown}
          <path d="M60,122 Q32,150 44,210 Q60,216 64,190 Q54,150 78,132 Z" />
          <path d="M180,122 Q208,150 196,210 Q180,216 176,190 Q186,150 162,132 Z" />
        </g>
      )
    case 'bob':
      return (
        <g fill={color}>
          {crown}
          <path d="M60,116 Q56,172 76,186 Q84,160 76,140 Z" />
          <path d="M180,116 Q184,172 164,186 Q156,160 164,140 Z" />
        </g>
      )
    case 'manBun':
      return <circle cx="120" cy="52" r="15" fill={color} />
    default:
      return null
  }
}

function renderHairFront(style: string, color: string) {
  const hi = shade(color, 26)
  // Base que cubre la coronilla (evita el aspecto de "gorro" delgado).
  const cap = <path d="M60,110 Q58,54 120,50 Q182,54 180,110 Q178,90 120,94 Q62,90 60,110 Z" fill={color} />
  switch (style) {
    case 'longStraight':
      return (
        <g fill={color}>
          {cap}
          <path d="M60,110 Q56,152 68,170 Q76,124 88,100 Q68,106 60,110 Z" />
          <path d="M180,110 Q184,152 172,170 Q164,124 152,100 Q172,106 180,110 Z" />
        </g>
      )
    case 'curlyLong':
      return (
        <g fill={color}>
          {cap}
          <path d="M60,108 Q52,150 66,172 Q70,152 62,140 Q74,150 68,130 Q80,142 74,118 Z" />
          <path d="M180,108 Q188,150 174,172 Q170,152 178,140 Q166,150 172,130 Q160,142 166,118 Z" />
        </g>
      )
    case 'ponytail':
    case 'twinTails':
      return <g fill={color}>{cap}</g>
    case 'bun':
      return (
        <g fill={color}>
          {cap}
          <circle cx="120" cy="50" r="15" />
          <circle cx="120" cy="50" r="8" fill={hi} />
        </g>
      )
    case 'bob':
      return (
        <g fill={color}>
          {cap}
          <path d="M60,104 Q52,152 70,162 Q80,138 72,110 Z" />
          <path d="M180,104 Q188,152 170,162 Q160,138 168,110 Z" />
        </g>
      )
    case 'shortMessy':
      return (
        <g fill={color}>
          {cap}
          <path d="M62,106 Q76,122 88,104 Q96,120 106,102 Q116,118 124,102 Q134,120 144,104 Q152,122 164,104 Q174,112 178,106 Q178,86 120,82 Q62,86 62,106 Z" />
          <path d="M76,96 Q88,90 100,96" stroke={hi} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )
    case 'buzz':
      return (
        <g fill={color} opacity="0.9">
          {cap}
        </g>
      )
    case 'sidePart':
      return (
        <g fill={color}>
          {cap}
          <path d="M110,66 Q70,72 60,110 Q58,82 110,76 Q152,78 164,98 Q142,68 110,66 Z" />
          <path d="M114,74 L118,104" stroke={hi} strokeWidth="2" strokeLinecap="round" />
        </g>
      )
    case 'spiky':
      return (
        <g fill={color}>
          {cap}
          <path d="M62,94 L78,64 L92,90 L104,60 L116,88 L120,58 L128,88 L140,62 L150,90 L164,66 L178,94 Q120,80 62,94 Z" />
        </g>
      )
    case 'curlyShort':
      return (
        <g fill={color}>
          <circle cx="78" cy="84" r="15" />
          <circle cx="100" cy="72" r="16" />
          <circle cx="122" cy="70" r="16" />
          <circle cx="144" cy="76" r="15" />
          <circle cx="164" cy="90" r="14" />
          <path d="M62,108 Q64,90 82,88 L160,88 Q176,92 176,108 Q176,92 120,86 Q62,92 62,108 Z" />
        </g>
      )
    case 'manBun':
      return (
        <g fill={color}>
          {cap}
          <circle cx="120" cy="48" r="13" />
          <circle cx="120" cy="48" r="7" fill={hi} />
        </g>
      )
    case 'afro':
      return (
        <g fill={color}>
          <circle cx="120" cy="68" r="48" />
          <circle cx="74" cy="90" r="24" />
          <circle cx="166" cy="90" r="24" />
        </g>
      )
    default:
      return null
  }
}

/* ------------------------- Cara / Emociones ------------------------- */
const EL = 100 // ojo izquierdo x
const ER = 140 // ojo derecho x
const EYE = 120 // ojos y
const MO = 146 // boca y

function blush(op = 0.5) {
  return (
    <g fill="#ff9db0" opacity={op}>
      <ellipse cx="84" cy="133" rx="9" ry="5.5" />
      <ellipse cx="156" cy="133" rx="9" ry="5.5" />
    </g>
  )
}
function pupil(cx: number, r = 7) {
  return (
    <g key={cx}>
      <circle cx={cx} cy={EYE} r={r} fill={OUTLINE} />
      <circle cx={cx - 2} cy={EYE - 2} r={r * 0.34} fill="#fff" />
    </g>
  )
}
function sparkleAt(cx: number, cy: number, s: number, fill: string) {
  return (
    <path
      d={`M${cx},${cy - s} l${s * 0.28},${s * 0.62} l${s * 0.62},${s * 0.28} l${-s * 0.62},${s * 0.28} l${-s * 0.28},${s * 0.62} l${-s * 0.28},${-s * 0.62} l${-s * 0.62},${-s * 0.28} l${s * 0.62},${-s * 0.28} Z`}
      fill={fill}
    />
  )
}
const smileMouth = (
  <path d={`M110,${MO} Q120,${MO + 11} 130,${MO}`} fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
)

function renderExpression(id: string) {
  switch (id) {
    case 'joyful':
      return (
        <g>
          {blush(0.55)}
          <g stroke={OUTLINE} strokeWidth="4" fill="none" strokeLinecap="round">
            <path d={`M${EL - 8},${EYE + 2} Q${EL},${EYE - 8} ${EL + 8},${EYE + 2}`} />
            <path d={`M${ER - 8},${EYE + 2} Q${ER},${EYE - 8} ${ER + 8},${EYE + 2}`} />
          </g>
          <path d={`M106,${MO} Q120,${MO + 16} 134,${MO} Z`} fill="#c93a4a" stroke={OUTLINE} strokeWidth="2" />
          <path d={`M108,${MO} Q120,${MO + 4} 132,${MO}`} fill="#fff" />
        </g>
      )
    case 'wink':
      return (
        <g>
          {blush()}
          {pupil(EL)}
          <path d={`M${ER - 8},${EYE + 2} Q${ER},${EYE - 8} ${ER + 8},${EYE + 2}`} stroke={OUTLINE} strokeWidth="4" fill="none" strokeLinecap="round" />
          {smileMouth}
        </g>
      )
    case 'cute':
      return (
        <g>
          {blush(0.7)}
          <ellipse cx={EL} cy={EYE} rx="8" ry="10" fill={OUTLINE} />
          <ellipse cx={ER} cy={EYE} rx="8" ry="10" fill={OUTLINE} />
          <circle cx={EL - 3} cy={EYE - 4} r="3" fill="#fff" />
          <circle cx={ER - 3} cy={EYE - 4} r="3" fill="#fff" />
          <path d={`M113,${MO} Q120,${MO + 7} 127,${MO}`} fill="none" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    case 'wow':
      return (
        <g>
          {blush()}
          <path d={`M${EL - 9},${EYE - 12} q9,-5 18,0`} fill="none" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <path d={`M${ER - 9},${EYE - 12} q9,-5 18,0`} fill="none" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={EL} cy={EYE} r="9" fill="#fff" stroke={OUTLINE} strokeWidth="2" />
          <circle cx={ER} cy={EYE} r="9" fill="#fff" stroke={OUTLINE} strokeWidth="2" />
          <circle cx={EL} cy={EYE} r="4" fill={OUTLINE} />
          <circle cx={ER} cy={EYE} r="4" fill={OUTLINE} />
          <ellipse cx="120" cy={MO + 3} rx="7" ry="9" fill="#c93a4a" stroke={OUTLINE} strokeWidth="2" />
        </g>
      )
    case 'silly':
      return (
        <g>
          {blush(0.6)}
          <path d={`M${EL - 8},${EYE + 2} Q${EL},${EYE - 8} ${EL + 8},${EYE + 2}`} stroke={OUTLINE} strokeWidth="4" fill="none" strokeLinecap="round" />
          {pupil(ER)}
          <path d={`M108,${MO} Q120,${MO + 12} 132,${MO} Z`} fill="#c93a4a" stroke={OUTLINE} strokeWidth="2" />
          <path d="M116,150 Q116,164 124,164 Q132,164 132,150 Z" fill="#ff7a90" stroke={OUTLINE} strokeWidth="1.5" />
        </g>
      )
    case 'cool':
      return (
        <g>
          {/* gafas de sol integradas */}
          <g stroke={OUTLINE} strokeWidth="2">
            <path d="M86,113 h26 a4,4 0 0 1 4,4 v3 a10,10 0 0 1 -20,0 v-4 Z" fill="#20304a" />
            <path d="M128,113 h26 a4,4 0 0 1 0,7 v0 a10,10 0 0 1 -20,0 v-3 a4,4 0 0 1 -6,-4 Z" fill="#20304a" />
            <line x1="116" y1="116" x2="124" y2="116" />
          </g>
          <path d={`M110,${MO + 1} Q122,${MO + 8} 132,${MO - 3}`} fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )
    case 'angry':
      return (
        <g>
          <path d={`M${EL - 9},${EYE - 9} L${EL + 8},${EYE - 4}`} stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
          <path d={`M${ER + 9},${EYE - 9} L${ER - 8},${EYE - 4}`} stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
          {pupil(EL, 6)}
          {pupil(ER, 6)}
          <path d={`M110,${MO + 5} Q120,${MO - 4} 130,${MO + 5}`} fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )
    case 'sad':
      return (
        <g>
          <path d={`M${EL - 8},${EYE - 6} L${EL + 8},${EYE - 10}`} stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          <path d={`M${ER + 8},${EYE - 6} L${ER - 8},${EYE - 10}`} stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          {pupil(EL, 6)}
          {pupil(ER, 6)}
          <path d="M92,126 q-3,10 3,15 q6,-5 3,-15 Z" fill="#6ec1ff" stroke="#4dabf7" strokeWidth="1" />
          <path d={`M110,${MO + 5} Q120,${MO - 3} 130,${MO + 5}`} fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )
    case 'love':
      return (
        <g>
          {blush(0.85)}
          <path d={`M${EL},${EYE + 5} C${EL - 8},${EYE - 5} ${EL - 10},${EYE + 2} ${EL},${EYE + 7} C${EL + 10},${EYE + 2} ${EL + 8},${EYE - 5} ${EL},${EYE + 5} Z`} fill="#ff4d6d" />
          <path d={`M${ER},${EYE + 5} C${ER - 8},${EYE - 5} ${ER - 10},${EYE + 2} ${ER},${EYE + 7} C${ER + 10},${EYE + 2} ${ER + 8},${EYE - 5} ${ER},${EYE + 5} Z`} fill="#ff4d6d" />
          <path d={`M108,${MO} Q120,${MO + 12} 132,${MO}`} fill="none" stroke={OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )
    case 'sleepy':
      return (
        <g>
          {blush(0.4)}
          <path d={`M${EL - 8},${EYE} q8,6 16,0`} fill="none" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          <path d={`M${ER - 8},${EYE} q8,6 16,0`} fill="none" stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="120" cy={MO + 2} rx="4" ry="5" fill="#c93a4a" />
          <text x="156" y="96" fontSize="16" fontWeight="700" fill={OUTLINE} fontFamily="sans-serif">z</text>
          <text x="166" y="84" fontSize="12" fontWeight="700" fill={OUTLINE} fontFamily="sans-serif">z</text>
        </g>
      )
    case 'starstruck':
      return (
        <g>
          {blush(0.7)}
          <circle cx={EL} cy={EYE} r="9" fill={OUTLINE} />
          <circle cx={ER} cy={EYE} r="9" fill={OUTLINE} />
          {sparkleAt(EL, EYE, 8, '#ffd43b')}
          {sparkleAt(ER, EYE, 8, '#ffd43b')}
          {sparkleAt(76, 104, 6, '#ffd43b')}
          {sparkleAt(164, 108, 5, '#ff6b6b')}
          <path d={`M106,${MO} Q120,${MO + 15} 134,${MO} Z`} fill="#c93a4a" stroke={OUTLINE} strokeWidth="2" />
          <path d={`M108,${MO} Q120,${MO + 4} 132,${MO}`} fill="#fff" />
        </g>
      )
    default: // happy
      return (
        <g>
          {blush()}
          {pupil(EL)}
          {pupil(ER)}
          {smileMouth}
        </g>
      )
  }
}

/* ------------------------- Accesorios ------------------------- */
function renderAccessory(style: string) {
  switch (style) {
    case 'glasses':
      return (
        <g stroke={OUTLINE} strokeWidth="3" fill="none">
          <circle cx="102" cy="120" r="12" />
          <circle cx="138" cy="120" r="12" />
          <line x1="114" y1="120" x2="126" y2="120" />
        </g>
      )
    case 'sunglasses':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <rect x="88" y="112" width="26" height="16" rx="6" fill="#20304a" />
          <rect x="126" y="112" width="26" height="16" rx="6" fill="#20304a" />
          <line x1="114" y1="118" x2="126" y2="118" />
        </g>
      )
    case 'partyHat':
      return (
        <g stroke={OUTLINE} strokeWidth="1.5">
          <path d="M120,10 L100,64 L140,64 Z" fill="#ff6b6b" />
          <circle cx="120" cy="10" r="6" fill="#ffd43b" />
          <circle cx="110" cy="40" r="3" fill="#fff" />
          <circle cx="128" cy="52" r="3" fill="#fff" />
        </g>
      )
    case 'wizardHat':
      return (
        <g stroke={OUTLINE} strokeWidth="1.5">
          <path d="M120,6 Q128,44 150,66 L90,66 Q112,44 120,6 Z" fill="#5f3dc4" />
          <path d="M82,64 L158,64 L158,72 L82,72 Z" fill="#7048e8" />
          <path d="M116,30 l2,5 l5,2 l-5,2 l-2,5 l-2,-5 l-5,-2 l5,-2 Z" fill="#ffd43b" />
        </g>
      )
    case 'crown':
      return (
        <g stroke={OUTLINE} strokeWidth="1.5">
          <path d="M88,64 L92,36 L108,54 L120,30 L132,54 L148,36 L152,64 Z" fill="#ffd43b" />
          <rect x="88" y="62" width="64" height="8" fill="#f4b400" />
          <circle cx="120" cy="46" r="3.5" fill="#ff6b6b" />
          <circle cx="98" cy="52" r="3" fill="#4dabf7" />
          <circle cx="142" cy="52" r="3" fill="#4dabf7" />
        </g>
      )
    case 'flowerCrown':
      return (
        <g stroke={OUTLINE} strokeWidth="1">
          {[74, 92, 112, 132, 150, 166].map((x, i) => (
            <g key={i} transform={`translate(${x},${58 - (i % 2) * 6})`}>
              <circle r="6" fill={['#ff6b6b', '#ffd43b', '#f783ac', '#74c0fc', '#ffd43b', '#ff6b6b'][i]} />
              <circle r="2.5" fill="#fff" />
            </g>
          ))}
        </g>
      )
    case 'halo':
      return <ellipse cx="120" cy="44" rx="30" ry="8" fill="none" stroke="#ffe066" strokeWidth="5" />
    case 'headphones':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <path d="M74,120 Q74,58 120,58 Q166,58 166,120" fill="none" strokeWidth="6" />
          <rect x="62" y="112" width="16" height="26" rx="6" fill="#ff6b6b" />
          <rect x="162" y="112" width="16" height="26" rx="6" fill="#ff6b6b" />
        </g>
      )
    case 'backpack':
      return (
        <g stroke={OUTLINE} strokeWidth="1.5">
          <path d="M84,206 Q82,196 92,196" fill="none" strokeWidth="4" />
          <path d="M156,206 Q158,196 148,196" fill="none" strokeWidth="4" />
        </g>
      )
    default:
      return null
  }
}

/* ------------------------- utilidades de color ------------------------- */
function shade(hex: string, percent: number): string {
  const h = hex.replace('#', '')
  if (h.length !== 6) return hex
  const num = parseInt(h, 16)
  const amt = Math.round(2.55 * percent)
  const clamp = (v: number) => Math.max(0, Math.min(255, v))
  const r = clamp((num >> 16) + amt)
  const g = clamp(((num >> 8) & 0xff) + amt)
  const b = clamp((num & 0xff) + amt)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
