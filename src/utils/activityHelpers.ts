import type { VocabularyItem } from '../types'

export function normalizeWord(word: string): string {
  return word
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z]/g, '')
}

export function getActivityWords(items: VocabularyItem[], max = 6): string[] {
  const words = items
    .map((item) => item.word)
    .filter((word) => normalizeWord(word).length >= 3)
  return [...new Set(words)].slice(0, max)
}

export function shuffle<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function scrambleWord(word: string): string {
  const letters = word.split('')
  let scrambled = shuffle(letters)
  while (scrambled.join('') === word && letters.length > 1) {
    scrambled = shuffle(letters)
  }
  return scrambled.join('')
}
