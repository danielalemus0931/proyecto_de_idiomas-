import type { AvatarConfig, Gender } from '../types'

/** Retrato ilustrado según género y ropa (mismo estilo que las capturas). */
export function portraitSrc(gender: Gender, config: AvatarConfig): string {
  if (gender === 'male') {
    if (config.top === 'denim' || config.top === 'jacket') return '/avatars/male-denim.png'
    if (config.top === 'hoodie') return '/avatars/male-hoodie.png'
    return '/avatars/male-tshirt.png'
  }
  if (config.top === 'cardigan') return '/avatars/female-cardigan.png'
  if (config.top === 'hoodie') return '/avatars/female-hoodie.png'
  return '/avatars/female-tank.png'
}

export const HAIR_COLORS = [
  '#1a1a1a',
  '#2c1b18',
  '#4a312c',
  '#6b4423',
  '#a55728',
  '#c19a6b',
  '#e6be8a',
  '#b33b3b',
]

export const CLOTH_COLORS_MALE = ['#f8f9fa', '#212529', '#0ca678', '#d4a574', '#845ef7', '#e03131', '#4dabf7']
export const CLOTH_COLORS_FEMALE = ['#f06595', '#f8f9fa', '#212529', '#845ef7', '#4dabf7', '#51cf66', '#ffd43b']

export type StudioNavId = 'hair' | 'face' | 'eyes' | 'clothes' | 'accessories' | 'background'

export const STUDIO_NAV: { id: StudioNavId; label: string; icon: string }[] = [
  { id: 'hair', label: 'Cabello', icon: '💇' },
  { id: 'face', label: 'Rostro', icon: '🙂' },
  { id: 'eyes', label: 'Ojos', icon: '👁️' },
  { id: 'clothes', label: 'Ropa', icon: '👕' },
  { id: 'accessories', label: 'Accesorios', icon: '💎' },
  { id: 'background', label: 'Fondo', icon: '🖼️' },
]

export type TopTab = 'hair' | 'clothes' | 'accessories' | 'colors'

export const TOP_TABS: { id: TopTab; label: string }[] = [
  { id: 'hair', label: 'Cabello' },
  { id: 'clothes', label: 'Ropa' },
  { id: 'accessories', label: 'Accesorios' },
  { id: 'colors', label: 'Colores' },
]

/** Estilos de cabello con índice en la hoja de miniaturas (0–7). */
export const HAIR_STYLES: {
  value: string
  label: string
  gender: Gender
  spriteIndex: number
}[] = [
  { value: 'shortMessy', label: 'Despeinado', gender: 'male', spriteIndex: 0 },
  { value: 'buzz', label: 'Rapado', gender: 'male', spriteIndex: 1 },
  { value: 'sidePart', label: 'Con raya', gender: 'male', spriteIndex: 2 },
  { value: 'spiky', label: 'En picos', gender: 'male', spriteIndex: 3 },
  { value: 'curlyShort', label: 'Rizado', gender: 'male', spriteIndex: 4 },
  { value: 'manBun', label: 'Moño', gender: 'male', spriteIndex: 5 },
  { value: 'afro', label: 'Afro', gender: 'male', spriteIndex: 6 },
  { value: 'slick', label: 'Peinado', gender: 'male', spriteIndex: 7 },
  { value: 'longWavy', label: 'Ondulado', gender: 'female', spriteIndex: 0 },
  { value: 'bun', label: 'Moño', gender: 'female', spriteIndex: 1 },
  { value: 'longStraight', label: 'Largo liso', gender: 'female', spriteIndex: 2 },
  { value: 'bob', label: 'Bob', gender: 'female', spriteIndex: 3 },
  { value: 'twinTails', label: 'Coletas', gender: 'female', spriteIndex: 4 },
  { value: 'ponytail', label: 'Cola', gender: 'female', spriteIndex: 5 },
  { value: 'curlyLong', label: 'Rizado', gender: 'female', spriteIndex: 6 },
  { value: 'bangs', label: 'Con flequillo', gender: 'female', spriteIndex: 7 },
]

export const CLOTHES_MALE: { value: string; label: string; emoji: string; color: string }[] = [
  { value: 'hoodie', label: 'Sudadera azul', emoji: '🧥', color: '#4dabf7' },
  { value: 'tshirt', label: 'Camiseta', emoji: '👕', color: '#f8f9fa' },
  { value: 'jacket', label: 'Sudadera negra', emoji: '🖤', color: '#212529' },
  { value: 'denim', label: 'Chaqueta denim', emoji: '👖', color: '#3b5bdb' },
  { value: 'striped', label: 'Suéter', emoji: '🧶', color: '#d4a574' },
]

export const CLOTHES_FEMALE: { value: string; label: string; emoji: string; color: string }[] = [
  { value: 'hoodie', label: 'Sudadera rosa', emoji: '🧥', color: '#f06595' },
  { value: 'tank', label: 'Top blanco', emoji: '👚', color: '#f8f9fa' },
  { value: 'tshirt', label: 'Camiseta', emoji: '🦋', color: '#212529' },
  { value: 'cardigan', label: 'Cárdigan', emoji: '💜', color: '#845ef7' },
  { value: 'striped', label: 'Sudadera azul', emoji: '💙', color: '#4dabf7' },
]

export const ACCESSORIES_MALE: { value: string; label: string; emoji: string }[] = [
  { value: '', label: 'Ninguno', emoji: '🚫' },
  { value: 'chain', label: 'Cadena', emoji: '⛓️' },
  { value: 'headphones', label: 'Audífonos', emoji: '🎧' },
  { value: 'cap', label: 'Gorra', emoji: '🧢' },
  { value: 'heart', label: 'Collar', emoji: '❤️' },
  { value: 'watch', label: 'Reloj', emoji: '⌚' },
  { value: 'glasses', label: 'Gafas', emoji: '👓' },
]

export const ACCESSORIES_FEMALE: { value: string; label: string; emoji: string }[] = [
  { value: '', label: 'Ninguno', emoji: '🚫' },
  { value: 'earrings', label: 'Aretes', emoji: '💫' },
  { value: 'heart', label: 'Collar', emoji: '❤️' },
  { value: 'cap', label: 'Gorra', emoji: '🧢' },
  { value: 'headphones', label: 'Audífonos', emoji: '🎧' },
  { value: 'glasses', label: 'Gafas', emoji: '🕶️' },
  { value: 'scrunchie', label: 'Scrunchie', emoji: '🎀' },
]

export const BG_PRESETS = [
  { value: '#e8e0ff', label: 'Lila' },
  { value: '#d0ebff', label: 'Azul' },
  { value: '#fff0f6', label: 'Rosa' },
  { value: '#ebfbee', label: 'Menta' },
  { value: '#fff9db', label: 'Crema' },
]
