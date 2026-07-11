import type {
  StickerAccessory,
  StickerBg,
  StickerExpression,
  StickerOutfit,
  StickerMouth,
  StickerEyes,
} from './kawaiiAvatar'

/** Rango de progresión del avatar según nivel del estudiante. */
export type AvatarTier = 1 | 2 | 3 | 4

export function avatarTierFromLevel(level: number): AvatarTier {
  if (level >= 21) return 4
  if (level >= 11) return 3
  if (level >= 6) return 2
  return 1
}

export function tierLabel(tier: AvatarTier): string {
  if (tier === 1) return 'Explorador · ropa sencilla'
  if (tier === 2) return 'Aventurero · nuevas prendas'
  if (tier === 3) return 'Estrella · accesorios exclusivos'
  return 'Leyenda · efectos y mascota'
}

/** Nivel mínimo para desbloquear cada ítem. */
export const OUTFIT_UNLOCK: Record<StickerOutfit, number> = {
  hoodieSkirt: 1,
  yellowHoodie: 1,
  pinkDress: 6,
  overalls: 6,
  greenTunic: 8,
}

export const ACCESSORY_UNLOCK: Record<StickerAccessory, number> = {
  none: 1,
  purpleBow: 1,
  pinkBow: 3,
  cap: 6,
  glasses: 8,
  backpack: 11,
}

export const EXPRESSION_UNLOCK: Record<StickerExpression, number> = {
  happy: 1,
  calm: 1,
  wink: 6,
}

export const EYE_UNLOCK: Record<StickerEyes, number> = {
  round: 1,
  soft: 1,
  sparkle: 6,
}

export const MOUTH_UNLOCK: Record<StickerMouth, number> = {
  smile: 1,
  tiny: 1,
  open: 6,
}

export const BG_UNLOCK: Record<StickerBg, number> = {
  cloudsPink: 1,
  cloudsBlue: 1,
  hills: 6,
  stripes: 8,
  stars: 11,
}

export type CompanionId = 'none' | 'starBuddy' | 'heartBuddy' | 'sparkBuddy'

export const COMPANIONS: { id: CompanionId; label: string; minLevel: number; emoji: string }[] = [
  { id: 'none', label: 'Sin mascota', minLevel: 1, emoji: '' },
  { id: 'starBuddy', label: 'Estrellita', minLevel: 21, emoji: '⭐' },
  { id: 'heartBuddy', label: 'Corazoncito', minLevel: 21, emoji: '💗' },
  { id: 'sparkBuddy', label: 'Chispita', minLevel: 25, emoji: '✨' },
]

export function isUnlocked(minLevel: number, level: number): boolean {
  return level >= minLevel
}

export function unlockedOutfits(level: number) {
  return (Object.keys(OUTFIT_UNLOCK) as StickerOutfit[]).filter((id) => isUnlocked(OUTFIT_UNLOCK[id], level))
}

export function unlockedAccessories(level: number) {
  return (Object.keys(ACCESSORY_UNLOCK) as StickerAccessory[]).filter((id) =>
    isUnlocked(ACCESSORY_UNLOCK[id], level),
  )
}

/** Si un ítem guardado ya no está disponible para el nivel, vuelve a uno básico. */
export function clampKawaiiForLevel<T extends {
  outfit: StickerOutfit
  accessory: StickerAccessory
  expression: StickerExpression
  eyes: StickerEyes
  mouth: StickerMouth
  background: StickerBg
  companion: CompanionId
  aura: boolean
}>(config: T, level: number): T {
  const next = { ...config }
  if (!isUnlocked(OUTFIT_UNLOCK[next.outfit], level)) next.outfit = 'hoodieSkirt'
  if (!isUnlocked(ACCESSORY_UNLOCK[next.accessory], level)) next.accessory = 'none'
  if (!isUnlocked(EXPRESSION_UNLOCK[next.expression], level)) next.expression = 'happy'
  if (!isUnlocked(EYE_UNLOCK[next.eyes], level)) next.eyes = 'round'
  if (!isUnlocked(MOUTH_UNLOCK[next.mouth], level)) next.mouth = 'smile'
  if (!isUnlocked(BG_UNLOCK[next.background], level)) next.background = 'cloudsPink'
  const companionMeta = COMPANIONS.find((c) => c.id === next.companion)
  if (!companionMeta || !isUnlocked(companionMeta.minLevel, level)) next.companion = 'none'
  if (level < 21) next.aura = false
  return next
}
