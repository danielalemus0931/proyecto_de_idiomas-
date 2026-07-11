// Sistema de puntos, niveles e insignias.

export const POINTS_PER_CORRECT = 10

// Puntos acumulados necesarios para cada nivel (índice 0 => nivel 1).
// Escala extendida para progresión del avatar (hasta 25+).
export const LEVEL_THRESHOLDS = [
  0, 40, 100, 180, 280, 400, 550, 720, 920, 1150, 1400, 1700, 2050, 2450, 2900, 3400, 4000, 4700,
  5500, 6400, 7400, 8600, 10000, 11600, 13400,
]
export const MAX_LEVEL = LEVEL_THRESHOLDS.length

export function levelFromPoints(points: number): number {
  let level = 1
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i += 1) {
    if (points >= LEVEL_THRESHOLDS[i]) level = i + 1
  }
  return level
}

// Umbral del siguiente nivel (o null si ya está al máximo).
export function nextLevelThreshold(points: number): number | null {
  for (const t of LEVEL_THRESHOLDS) {
    if (points < t) return t
  }
  return null
}

// Progreso (0-1) hacia el siguiente nivel.
export function levelProgress(points: number): number {
  const level = levelFromPoints(points)
  if (level >= MAX_LEVEL) return 1
  const base = LEVEL_THRESHOLDS[level - 1]
  const next = LEVEL_THRESHOLDS[level]
  return (points - base) / (next - base)
}

export type Badge = {
  id: string
  name: string
  desc: string
  icon: string
  threshold: number // puntos necesarios
}

export const BADGES: Badge[] = [
  { id: 'start', name: 'Primeros pasos', desc: 'Gana tus primeros 10 puntos', icon: '🌱', threshold: 10 },
  { id: 'learner', name: 'Aprendiz', desc: 'Alcanza 40 puntos', icon: '📘', threshold: 40 },
  { id: 'steady', name: 'Constante', desc: 'Alcanza 100 puntos', icon: '🔥', threshold: 100 },
  { id: 'star', name: 'Destacado', desc: 'Alcanza 180 puntos', icon: '⭐', threshold: 180 },
  { id: 'master', name: 'Maestro', desc: 'Alcanza 280 puntos', icon: '🏆', threshold: 280 },
  { id: 'legend', name: 'Leyenda', desc: 'Alcanza 400 puntos', icon: '👑', threshold: 400 },
]

export function earnedBadges(points: number): Badge[] {
  return BADGES.filter((b) => points >= b.threshold)
}
