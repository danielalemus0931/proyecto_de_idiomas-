import type { AvatarConfig, Gender } from '../types'

// Opción de personalización. `level` = nivel mínimo para desbloquear.
// `gender` limita la opción a un género (sin gender = para ambos).
export type AvatarOption = {
  value: string
  label: string
  level: number
  gender?: Gender
  color?: string // para categorías de color
}

export type AvatarCategory = {
  key: keyof AvatarConfig
  label: string
  icon: string
  kind: 'style' | 'color'
  allowNone?: boolean
  options: AvatarOption[]
}

// ---- Paletas de color (hex con #) ----
const SKIN = ['#ffe0bd', '#f1c27d', '#e0ac69', '#c68642', '#8d5524']
const HAIR = ['#2c1b18', '#4a312c', '#6b4423', '#a55728', '#c19a6b', '#e6be8a', '#b33b3b', '#e8e1e1', '#7b4bc4', '#2f9e44']
const CLOTH = ['#ff6b6b', '#ff922b', '#ffd43b', '#51cf66', '#22b8cf', '#4dabf7', '#845ef7', '#f06595', '#f8f9fa', '#495057']
const SHOES = ['#212529', '#ffffff', '#ff6b6b', '#4dabf7', '#51cf66', '#f06595']
const BG = ['#e7f5ff', '#fff0f6', '#ebfbee', '#fff9db', '#f3f0ff', '#e5dbff', '#ffe8cc', '#d0ebff']

const colorOptions = (colors: string[]): AvatarOption[] =>
  colors.map((c) => ({ value: c, label: c, level: 1, color: c }))

export const AVATAR_CATEGORIES: AvatarCategory[] = [
  {
    key: 'hair',
    label: 'Cabello',
    icon: '💇',
    kind: 'style',
    options: [
      // Femeninos
      { value: 'longStraight', label: 'Largo liso', level: 1, gender: 'female' },
      { value: 'ponytail', label: 'Cola de caballo', level: 1, gender: 'female' },
      { value: 'bun', label: 'Moño', level: 1, gender: 'female' },
      { value: 'twinTails', label: 'Dos coletas', level: 2, gender: 'female' },
      { value: 'curlyLong', label: 'Rizado largo', level: 2, gender: 'female' },
      { value: 'bob', label: 'Bob', level: 3, gender: 'female' },
      // Masculinos
      { value: 'shortMessy', label: 'Corto despeinado', level: 1, gender: 'male' },
      { value: 'buzz', label: 'Rapado', level: 1, gender: 'male' },
      { value: 'sidePart', label: 'Con raya', level: 1, gender: 'male' },
      { value: 'spiky', label: 'En picos', level: 2, gender: 'male' },
      { value: 'curlyShort', label: 'Rizado corto', level: 2, gender: 'male' },
      { value: 'manBun', label: 'Moño alto', level: 3, gender: 'male' },
      // Unisex
      { value: 'afro', label: 'Afro', level: 3 },
    ],
  },
  { key: 'hairColor', label: 'Color de cabello', icon: '🎨', kind: 'color', options: colorOptions(HAIR) },
  {
    key: 'top',
    label: 'Ropa (arriba)',
    icon: '👕',
    kind: 'style',
    options: [
      { value: 'tshirt', label: 'Camiseta', level: 1 },
      { value: 'striped', label: 'Rayas', level: 1 },
      { value: 'tank', label: 'Sin mangas', level: 1 },
      { value: 'hoodie', label: 'Sudadera', level: 2 },
      { value: 'jacket', label: 'Chaqueta', level: 2 },
      { value: 'dress', label: 'Vestido', level: 1, gender: 'female' },
    ],
  },
  { key: 'topColor', label: 'Color (arriba)', icon: '🎨', kind: 'color', options: colorOptions(CLOTH) },
  {
    key: 'bottom',
    label: 'Ropa (abajo)',
    icon: '👖',
    kind: 'style',
    options: [
      { value: 'pants', label: 'Pantalón', level: 1 },
      { value: 'shorts', label: 'Shorts', level: 1 },
      { value: 'skirt', label: 'Falda', level: 1, gender: 'female' },
    ],
  },
  { key: 'bottomColor', label: 'Color (abajo)', icon: '🎨', kind: 'color', options: colorOptions(CLOTH) },
  {
    key: 'shoes',
    label: 'Zapatos',
    icon: '👟',
    kind: 'style',
    options: [
      { value: 'sneakers', label: 'Tenis', level: 1 },
      { value: 'boots', label: 'Botas', level: 2 },
      { value: 'sandals', label: 'Sandalias', level: 1 },
    ],
  },
  { key: 'shoesColor', label: 'Color de zapatos', icon: '🎨', kind: 'color', options: colorOptions(SHOES) },
  {
    key: 'expression',
    label: 'Emoción',
    icon: '😀',
    kind: 'style',
    options: [
      { value: 'happy', label: 'Feliz', level: 1 },
      { value: 'joyful', label: 'Alegre', level: 1 },
      { value: 'wink', label: 'Guiño', level: 1 },
      { value: 'cute', label: 'Tierno', level: 2 },
      { value: 'wow', label: 'Asombro', level: 2 },
      { value: 'silly', label: 'Travieso', level: 2 },
      { value: 'cool', label: 'Genial 😎', level: 3 },
      { value: 'angry', label: 'Enojado', level: 3 },
      { value: 'sad', label: 'Triste', level: 3 },
      { value: 'love', label: 'Enamorado 😍', level: 4 },
      { value: 'sleepy', label: 'Dormido', level: 4 },
      { value: 'starstruck', label: 'Estrella 🤩', level: 5 },
    ],
  },
  {
    key: 'accessory',
    label: 'Accesorios',
    icon: '✨',
    kind: 'style',
    allowNone: true,
    options: [
      { value: 'glasses', label: 'Gafas', level: 1 },
      { value: 'partyHat', label: 'Gorro de fiesta', level: 2 },
      { value: 'sunglasses', label: 'Gafas de sol', level: 2 },
      { value: 'backpack', label: 'Mochila', level: 2 },
      { value: 'headphones', label: 'Audífonos', level: 3 },
      { value: 'flowerCrown', label: 'Corona de flores', level: 3 },
      { value: 'halo', label: 'Aureola', level: 3 },
      { value: 'wizardHat', label: 'Sombrero de mago', level: 4 },
      { value: 'crown', label: 'Corona real 👑', level: 4 },
      { value: 'wings', label: 'Alas ✨', level: 5 },
    ],
  },
  { key: 'skin', label: 'Color de piel', icon: '🎨', kind: 'color', options: colorOptions(SKIN) },
  { key: 'background', label: 'Fondo', icon: '🎨', kind: 'color', options: colorOptions(BG) },
]

export const DEFAULT_FEMALE: AvatarConfig = {
  skin: '#f1c27d',
  hair: 'longStraight',
  hairColor: '#4a312c',
  top: 'tshirt',
  topColor: '#f06595',
  bottom: 'skirt',
  bottomColor: '#845ef7',
  shoes: 'sneakers',
  shoesColor: '#ff6b6b',
  expression: 'happy',
  accessory: '',
  background: '#fff0f6',
}

export const DEFAULT_MALE: AvatarConfig = {
  skin: '#e0ac69',
  hair: 'shortMessy',
  hairColor: '#2c1b18',
  top: 'tshirt',
  topColor: '#4dabf7',
  bottom: 'pants',
  bottomColor: '#495057',
  shoes: 'sneakers',
  shoesColor: '#212529',
  expression: 'happy',
  accessory: '',
  background: '#e7f5ff',
}

export function defaultAvatar(gender: Gender): AvatarConfig {
  return gender === 'male' ? { ...DEFAULT_MALE } : { ...DEFAULT_FEMALE }
}

export function mergeAvatar(gender: Gender, config: Partial<AvatarConfig> | null): AvatarConfig {
  return { ...defaultAvatar(gender), ...(config ?? {}) }
}
