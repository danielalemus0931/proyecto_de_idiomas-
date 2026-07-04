import { createAvatar } from '@dicebear/core'
import * as avataaars from '@dicebear/avataaars'
import type { AvatarConfig } from '../types'

// Opción de personalización. `level` = nivel mínimo para desbloquearla.
export type AvatarOption = {
  value: string
  label: string
  level: number
  color?: string // para categorías de color (muestra un swatch)
}

export type AvatarCategory = {
  key: keyof AvatarConfig
  label: string
  icon: string
  kind: 'style' | 'color'
  allowNone?: boolean // permite "ninguno" (accesorios, vello facial)
  options: AvatarOption[]
}

// Paletas de color (hex sin #, como espera DiceBear)
const SKIN = ['ffdbb4', 'edb98a', 'd08b5b', 'ae5d29', '614335', 'fd9841', 'f8d25c']
const HAIR = ['2c1b18', '724133', 'a55728', 'b58143', 'd6b370', 'c93305', 'e8e1e1', 'ecdcbf', 'f59797']
const CLOTHES = ['65c9ff', '5199e4', '25557c', '262e33', '929598', 'ff5c5c', 'ff488e', 'a7ffc4', 'ffdeb5', 'ffffff']

const colorOptions = (colors: string[]): AvatarOption[] =>
  colors.map((c) => ({ value: c, label: c, level: 1, color: `#${c}` }))

export const AVATAR_CATEGORIES: AvatarCategory[] = [
  {
    key: 'top',
    label: 'Cabello',
    icon: '💇',
    kind: 'style',
    options: [
      { value: 'shortFlat', label: 'Corto liso', level: 1 },
      { value: 'shortCurly', label: 'Corto rizado', level: 1 },
      { value: 'bob', label: 'Bob', level: 1 },
      { value: 'bun', label: 'Moño', level: 1 },
      { value: 'straight01', label: 'Lacio', level: 1 },
      { value: 'curly', label: 'Rizado', level: 1 },
      { value: 'longButNotTooLong', label: 'Largo', level: 2 },
      { value: 'sides', label: 'Con raya', level: 2 },
      { value: 'fro', label: 'Afro', level: 2 },
      { value: 'dreads01', label: 'Rastas', level: 2 },
      { value: 'bigHair', label: 'Melena', level: 3 },
      { value: 'miaWallace', label: 'Flequillo', level: 3 },
      { value: 'froBand', label: 'Afro + banda', level: 3 },
      { value: 'hat', label: 'Gorro', level: 4 },
      { value: 'winterHat02', label: 'Gorro de invierno', level: 4 },
      { value: 'turban', label: 'Turbante', level: 4 },
      { value: 'hijab', label: 'Hiyab', level: 4 },
    ],
  },
  { key: 'hairColor', label: 'Color de cabello', icon: '🎨', kind: 'color', options: colorOptions(HAIR) },
  {
    key: 'clothing',
    label: 'Ropa',
    icon: '👕',
    kind: 'style',
    options: [
      { value: 'shirtCrewNeck', label: 'Camiseta', level: 1 },
      { value: 'shirtVNeck', label: 'Cuello en V', level: 1 },
      { value: 'shirtScoopNeck', label: 'Cuello redondo', level: 1 },
      { value: 'hoodie', label: 'Sudadera', level: 1 },
      { value: 'collarAndSweater', label: 'Suéter con cuello', level: 2 },
      { value: 'graphicShirt', label: 'Estampada', level: 2 },
      { value: 'blazerAndShirt', label: 'Blazer y camisa', level: 3 },
      { value: 'blazerAndSweater', label: 'Blazer y suéter', level: 3 },
      { value: 'overall', label: 'Overol', level: 3 },
    ],
  },
  { key: 'clothesColor', label: 'Color de ropa', icon: '🎨', kind: 'color', options: colorOptions(CLOTHES) },
  {
    key: 'accessories',
    label: 'Accesorios',
    icon: '👓',
    kind: 'style',
    allowNone: true,
    options: [
      { value: 'round', label: 'Redondas', level: 2 },
      { value: 'prescription01', label: 'Graduadas', level: 2 },
      { value: 'prescription02', label: 'Graduadas 2', level: 2 },
      { value: 'wayfarers', label: 'Wayfarer', level: 3 },
      { value: 'sunglasses', label: 'De sol', level: 3 },
      { value: 'kurt', label: 'Estilo Kurt', level: 4 },
      { value: 'eyepatch', label: 'Parche', level: 4 },
    ],
  },
  {
    key: 'eyes',
    label: 'Ojos',
    icon: '👀',
    kind: 'style',
    options: [
      { value: 'default', label: 'Normal', level: 1 },
      { value: 'happy', label: 'Feliz', level: 1 },
      { value: 'wink', label: 'Guiño', level: 1 },
      { value: 'squint', label: 'Entrecerrados', level: 1 },
      { value: 'side', label: 'De lado', level: 1 },
      { value: 'surprised', label: 'Sorpresa', level: 2 },
      { value: 'closed', label: 'Cerrados', level: 2 },
      { value: 'eyeRoll', label: 'En blanco', level: 2 },
      { value: 'hearts', label: 'Corazones', level: 3 },
      { value: 'winkWacky', label: 'Guiño loco', level: 3 },
      { value: 'cry', label: 'Llorando', level: 4 },
      { value: 'xDizzy', label: 'Mareado', level: 4 },
    ],
  },
  {
    key: 'eyebrows',
    label: 'Cejas',
    icon: '〰️',
    kind: 'style',
    options: [
      { value: 'default', label: 'Normal', level: 1 },
      { value: 'defaultNatural', label: 'Natural', level: 1 },
      { value: 'raisedExcited', label: 'Levantadas', level: 1 },
      { value: 'flatNatural', label: 'Planas', level: 1 },
      { value: 'angry', label: 'Enojadas', level: 2 },
      { value: 'sadConcerned', label: 'Preocupadas', level: 2 },
      { value: 'upDown', label: 'Asimétricas', level: 2 },
    ],
  },
  {
    key: 'mouth',
    label: 'Boca',
    icon: '👄',
    kind: 'style',
    options: [
      { value: 'smile', label: 'Sonrisa', level: 1 },
      { value: 'default', label: 'Normal', level: 1 },
      { value: 'serious', label: 'Seria', level: 1 },
      { value: 'twinkle', label: 'Pícara', level: 1 },
      { value: 'tongue', label: 'Lengua', level: 2 },
      { value: 'eating', label: 'Comiendo', level: 2 },
      { value: 'grimace', label: 'Mueca', level: 2 },
      { value: 'disbelief', label: 'Incrédula', level: 3 },
      { value: 'screamOpen', label: 'Grito', level: 3 },
      { value: 'sad', label: 'Triste', level: 4 },
    ],
  },
  {
    key: 'facialHair',
    label: 'Vello facial',
    icon: '🧔',
    kind: 'style',
    allowNone: true,
    options: [
      { value: 'beardLight', label: 'Barba ligera', level: 2 },
      { value: 'moustacheFancy', label: 'Bigote elegante', level: 2 },
      { value: 'beardMedium', label: 'Barba media', level: 3 },
      { value: 'moustacheMagnum', label: 'Bigote Magnum', level: 3 },
      { value: 'beardMajestic', label: 'Barba majestuosa', level: 4 },
    ],
  },
  { key: 'skinColor', label: 'Color de piel', icon: '🎨', kind: 'color', options: colorOptions(SKIN) },
]

export const DEFAULT_AVATAR: AvatarConfig = {
  skinColor: 'edb98a',
  top: 'shortFlat',
  hairColor: '2c1b18',
  clothing: 'shirtCrewNeck',
  clothesColor: '65c9ff',
  eyes: 'default',
  eyebrows: 'default',
  mouth: 'smile',
  accessories: '',
  facialHair: '',
}

// Convierte una config en un data-URI SVG listo para <img src=...>
export function buildAvatarDataUri(config: AvatarConfig): string {
  const opts = {
    seed: 'langflow',
    backgroundColor: ['transparent'],
    skinColor: [config.skinColor],
    top: [config.top],
    topProbability: 100,
    hairColor: [config.hairColor],
    clothing: [config.clothing],
    clothesColor: [config.clothesColor],
    eyes: [config.eyes],
    eyebrows: [config.eyebrows],
    mouth: [config.mouth],
    accessories: config.accessories ? [config.accessories] : [],
    accessoriesProbability: config.accessories ? 100 : 0,
    facialHair: config.facialHair ? [config.facialHair] : [],
    facialHairProbability: config.facialHair ? 100 : 0,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createAvatar(avataaars as any, opts as any).toDataUri()
}

export function mergeAvatar(config: AvatarConfig): AvatarConfig {
  return { ...DEFAULT_AVATAR, ...config }
}
