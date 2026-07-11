import type { AvatarConfig } from '../types'

/** Sistema de avatar sticker/mascota por capas (estilo Toca Boca / Pusheen). */

export type StickerSpecies = 'rabbit' | 'cat' | 'dog' | 'panda' | 'bear' | 'fox'
export type StickerEyes = 'round' | 'sparkle' | 'soft'
export type StickerMouth = 'smile' | 'open' | 'tiny'
export type StickerExpression = 'happy' | 'wink' | 'calm'
export type StickerOutfit = 'hoodieSkirt' | 'yellowHoodie' | 'pinkDress' | 'overalls' | 'greenTunic'
export type StickerAccessory = 'none' | 'purpleBow' | 'pinkBow' | 'cap' | 'glasses' | 'backpack'
export type StickerBg = 'stars' | 'cloudsPink' | 'cloudsBlue' | 'hills' | 'stripes'

export type KawaiiConfig = {
  species: StickerSpecies
  fur: string
  eyes: StickerEyes
  mouth: StickerMouth
  expression: StickerExpression
  outfit: StickerOutfit
  accessory: StickerAccessory
  background: StickerBg
  name: string
  /** Mascota acompañante (nivel 21+). */
  companion: 'none' | 'starBuddy' | 'heartBuddy' | 'sparkBuddy'
  /** Efecto visual legendario. */
  aura: boolean
}

/** Alias para compatibilidad con imports existentes. */
export type KawaiiSpecies = StickerSpecies
export type KawaiiOutfit = StickerOutfit
export type KawaiiAccessory = StickerAccessory
export type KawaiiBg = StickerBg

export const SPECIES: { id: StickerSpecies; label: string }[] = [
  { id: 'rabbit', label: 'Conejo' },
  { id: 'cat', label: 'Gato' },
  { id: 'dog', label: 'Perro' },
  { id: 'panda', label: 'Panda' },
  { id: 'bear', label: 'Oso' },
  { id: 'fox', label: 'Zorro' },
]

export const FUR_COLORS = ['#fff6f0', '#ffd6c9', '#cfd4da', '#e8c4a2', '#b08968', '#7c5c45']

export const EYES: { id: StickerEyes; label: string }[] = [
  { id: 'round', label: 'Redondos' },
  { id: 'sparkle', label: 'Brillo' },
  { id: 'soft', label: 'Suaves' },
]

export const MOUTHS: { id: StickerMouth; label: string }[] = [
  { id: 'smile', label: 'Sonrisa' },
  { id: 'open', label: 'Abierta' },
  { id: 'tiny', label: 'Chiquita' },
]

export const EXPRESSIONS: { id: StickerExpression; label: string }[] = [
  { id: 'happy', label: 'Feliz' },
  { id: 'wink', label: 'Guiño' },
  { id: 'calm', label: 'Tranquilo' },
]

export const OUTFITS: { id: StickerOutfit; label: string; color: string }[] = [
  { id: 'hoodieSkirt', label: 'Sudadera + falda', color: '#c5b3f5' },
  { id: 'yellowHoodie', label: 'Sudadera amarilla', color: '#ffe066' },
  { id: 'pinkDress', label: 'Vestido rosa', color: '#f8a5c2' },
  { id: 'overalls', label: 'Overol azul', color: '#74c0fc' },
  { id: 'greenTunic', label: 'Túnica verde', color: '#8ce99a' },
]

export const ACCESSORIES: { id: StickerAccessory; label: string }[] = [
  { id: 'none', label: 'Ninguno' },
  { id: 'purpleBow', label: 'Moño lila' },
  { id: 'pinkBow', label: 'Moño rosa' },
  { id: 'cap', label: 'Gorra' },
  { id: 'glasses', label: 'Gafas' },
  { id: 'backpack', label: 'Mochila' },
]

export const BACKGROUNDS: { id: StickerBg; label: string; css: string }[] = [
  { id: 'stars', label: 'Estrellas', css: 'linear-gradient(180deg, #e9e0ff 0%, #d5c7ff 100%)' },
  { id: 'cloudsPink', label: 'Nubes rosa', css: 'linear-gradient(180deg, #ffe4ec 0%, #ffd0df 100%)' },
  { id: 'cloudsBlue', label: 'Nubes azul', css: 'linear-gradient(180deg, #d0ebff 0%, #a5d8ff 100%)' },
  { id: 'hills', label: 'Colinas', css: 'linear-gradient(180deg, #ebfbee 0%, #b2f2bb 100%)' },
  { id: 'stripes', label: 'Rayas', css: 'repeating-linear-gradient(90deg, #fff3bf 0 18px, #ffe8a3 18px 36px)' },
]

export const DEFAULT_KAWAII: KawaiiConfig = {
  species: 'rabbit',
  fur: '#fff6f0',
  eyes: 'round',
  mouth: 'smile',
  expression: 'happy',
  outfit: 'hoodieSkirt',
  accessory: 'purpleBow',
  background: 'cloudsPink',
  name: 'Luna',
  companion: 'none',
  aura: false,
}

const SPECIES_SET = new Set(SPECIES.map((s) => s.id))
const OUTFIT_SET = new Set(OUTFITS.map((o) => o.id))
const ACC_SET = new Set(ACCESSORIES.map((a) => a.id))
const BG_SET = new Set(BACKGROUNDS.map((b) => b.id))
const EYE_SET = new Set(EYES.map((e) => e.id))
const MOUTH_SET = new Set(MOUTHS.map((m) => m.id))
const EXPR_SET = new Set(EXPRESSIONS.map((e) => e.id))

const NAME_KEY = 'langflow-avatar-name'
const COMPANION_KEY = 'langflow-avatar-companion'
const AURA_KEY = 'langflow-avatar-aura'

export function loadAvatarName(fallback = 'Luna'): string {
  try {
    return localStorage.getItem(NAME_KEY) || fallback
  } catch {
    return fallback
  }
}

export function saveAvatarName(name: string) {
  try {
    localStorage.setItem(NAME_KEY, name.trim() || 'Luna')
  } catch {
    /* ignore */
  }
}

function loadCompanion(): KawaiiConfig['companion'] {
  try {
    const v = localStorage.getItem(COMPANION_KEY)
    if (v === 'starBuddy' || v === 'heartBuddy' || v === 'sparkBuddy') return v
  } catch {
    /* ignore */
  }
  return 'none'
}

function loadAura(): boolean {
  try {
    return localStorage.getItem(AURA_KEY) === '1'
  } catch {
    return false
  }
}

/** Persistencia en AvatarConfig existente. */
export function toAvatarConfig(k: KawaiiConfig): AvatarConfig {
  saveAvatarName(k.name)
  try {
    localStorage.setItem(COMPANION_KEY, k.companion)
    localStorage.setItem(AURA_KEY, k.aura ? '1' : '0')
  } catch {
    /* ignore */
  }
  return {
    skin: k.fur,
    hair: k.species,
    hairColor: k.fur,
    top: 'hoodie',
    topColor: OUTFITS.find((o) => o.id === k.outfit)?.color ?? '#c5b3f5',
    bottom: k.outfit,
    bottomColor: k.eyes,
    shoes: k.mouth,
    shoesColor: '#ffffff',
    expression: k.expression,
    accessory: k.accessory === 'none' ? '' : k.accessory,
    background: k.background,
  }
}

export function fromAvatarConfig(config: Partial<AvatarConfig> | null): KawaiiConfig {
  const c = config ?? {}
  const species = SPECIES_SET.has(c.hair as StickerSpecies)
    ? (c.hair as StickerSpecies)
    : DEFAULT_KAWAII.species
  const fur = typeof c.hairColor === 'string' && FUR_COLORS.includes(c.hairColor)
    ? c.hairColor
    : typeof c.skin === 'string' && FUR_COLORS.includes(c.skin)
      ? c.skin
      : DEFAULT_KAWAII.fur
  const outfit = OUTFIT_SET.has(c.bottom as StickerOutfit)
    ? (c.bottom as StickerOutfit)
    : OUTFITS.find((o) => o.color === c.topColor)?.id ?? DEFAULT_KAWAII.outfit
  const rawAcc = c.accessory
  const accessory: StickerAccessory =
    rawAcc === '' || rawAcc == null
      ? 'none'
      : ACC_SET.has(rawAcc as StickerAccessory)
        ? (rawAcc as StickerAccessory)
        : DEFAULT_KAWAII.accessory
  const background = BG_SET.has(c.background as StickerBg)
    ? (c.background as StickerBg)
    : DEFAULT_KAWAII.background
  const eyes = EYE_SET.has(c.bottomColor as StickerEyes)
    ? (c.bottomColor as StickerEyes)
    : DEFAULT_KAWAII.eyes
  const mouth = MOUTH_SET.has(c.shoes as StickerMouth) ? (c.shoes as StickerMouth) : DEFAULT_KAWAII.mouth
  const expression = EXPR_SET.has(c.expression as StickerExpression)
    ? (c.expression as StickerExpression)
    : DEFAULT_KAWAII.expression

  return {
    species,
    fur,
    eyes,
    mouth,
    expression,
    outfit,
    accessory,
    background,
    name: loadAvatarName(DEFAULT_KAWAII.name),
    companion: loadCompanion(),
    aura: loadAura(),
  }
}

export function defaultKawaiiAvatar(): AvatarConfig {
  return toAvatarConfig(DEFAULT_KAWAII)
}

export function mergeKawaiiAvatar(config: Partial<AvatarConfig> | null): AvatarConfig {
  return toAvatarConfig(fromAvatarConfig(config))
}

export const EXAMPLES: KawaiiConfig[] = [
  { ...DEFAULT_KAWAII, name: 'Luna' },
  { species: 'cat', fur: '#cfd4da', eyes: 'sparkle', mouth: 'smile', expression: 'wink', outfit: 'yellowHoodie', accessory: 'pinkBow', background: 'cloudsPink', name: 'Michi', companion: 'none', aura: false },
  { species: 'dog', fur: '#e8c4a2', eyes: 'round', mouth: 'open', expression: 'happy', outfit: 'overalls', accessory: 'cap', background: 'cloudsBlue', name: 'Coco', companion: 'none', aura: false },
  { species: 'panda', fur: '#fff6f0', eyes: 'soft', mouth: 'tiny', expression: 'calm', outfit: 'greenTunic', accessory: 'none', background: 'hills', name: 'Bambú', companion: 'none', aura: false },
  { species: 'bear', fur: '#b08968', eyes: 'round', mouth: 'smile', expression: 'happy', outfit: 'pinkDress', accessory: 'backpack', background: 'stripes', name: 'Miel', companion: 'none', aura: false },
  { species: 'fox', fur: '#ffd6c9', eyes: 'sparkle', mouth: 'open', expression: 'happy', outfit: 'hoodieSkirt', accessory: 'purpleBow', background: 'stars', name: 'Nube', companion: 'none', aura: false },
]

/** Compat: ya no usamos hojas PNG hiperdetalladas. */
export function resolveKawaiiSprite(_config: KawaiiConfig): string {
  return ''
}

export function shade(hex: string, percent: number): string {
  const n = hex.replace('#', '')
  const full = n.length === 3 ? n.split('').map((c) => c + c).join('') : n
  const num = parseInt(full, 16)
  if (Number.isNaN(num)) return hex
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(2.55 * percent)))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + Math.round(2.55 * percent)))
  const b = Math.min(255, Math.max(0, (num & 0xff) + Math.round(2.55 * percent)))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
