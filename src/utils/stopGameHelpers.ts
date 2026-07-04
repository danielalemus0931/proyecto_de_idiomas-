import type { StopAnswers, StopCategoryId } from '../data/stopGame'
import { POINTS_PER_CATEGORY, STOP_CATEGORIES } from '../data/stopGame'

export function normalizeForLetterCheck(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function startsWithLetter(value: string, letter: string): boolean {
  const normalized = normalizeForLetterCheck(value)
  if (!normalized) return false
  const target = normalizeForLetterCheck(letter)
  return normalized.startsWith(target)
}

/** Misma letra del día para todos los estudiantes de un idioma (competencia justa). */
export function getDailyLetter(languageId: string, date = new Date()): string {
  const day = date.toISOString().slice(0, 10)
  const seed = `${day}-${languageId}`
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return String.fromCharCode(65 + (hash % 26))
}

export function emptyStopAnswers(): StopAnswers {
  return STOP_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.id] = ''
      return acc
    },
    {} as StopAnswers,
  )
}

export function scoreStopAnswers(answers: StopAnswers, letter: string, timeRemaining: number) {
  const validCategories: StopCategoryId[] = []

  for (const category of STOP_CATEGORIES) {
    if (startsWithLetter(answers[category.id], letter)) {
      validCategories.push(category.id)
    }
  }

  const categoriesScore = validCategories.length * POINTS_PER_CATEGORY
  const totalScore = categoriesScore + timeRemaining

  return {
    validCategories,
    categoriesFilled: validCategories.length,
    categoriesScore,
    totalScore,
  }
}

export function languageInputHint(languageId: string): string {
  const hints: Record<string, string> = {
    en: 'Escribe todas las respuestas en inglés.',
    fr: 'Escribe todas las respuestas en francés.',
    pt: 'Escribe todas las respuestas en portugués.',
    it: 'Escribe todas las respuestas en italiano.',
  }
  return hints[languageId] ?? 'Escribe las respuestas en el idioma del curso.'
}
