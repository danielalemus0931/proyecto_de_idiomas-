import type { VocabularyItem } from '../types'
import { normalizeWord } from './activityHelpers'

export type CrosswordClue = {
  id: number
  clue: string
  answer: string
  display: string
}

export type CrosswordPuzzle = {
  clues: CrosswordClue[]
}

export function generateCrossword(items: VocabularyItem[], max = 5): CrosswordPuzzle {
  const clues = items
    .map((item, index) => ({
      id: index + 1,
      clue: item.translation,
      answer: normalizeWord(item.word),
      display: item.word,
    }))
    .filter((item) => item.answer.length >= 3 && item.answer.length <= 10)
    .slice(0, max)

  return { clues }
}
