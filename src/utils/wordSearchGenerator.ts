import { normalizeWord, shuffle } from './activityHelpers'

export type WordSearchWord = {
  display: string
  normalized: string
}

export type WordSearchPuzzle = {
  grid: string[][]
  words: WordSearchWord[]
  size: number
}

const DIRECTIONS: [number, number][] = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
]

function randomLetter(): string {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26))
}

function canPlace(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  dr: number,
  dc: number,
): boolean {
  for (let i = 0; i < word.length; i += 1) {
    const r = row + dr * i
    const c = col + dc * i
    if (r < 0 || c < 0 || r >= grid.length || c >= grid.length) return false
    const cell = grid[r][c]
    if (cell !== '' && cell !== word[i]) return false
  }
  return true
}

function placeWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  dr: number,
  dc: number,
): void {
  for (let i = 0; i < word.length; i += 1) {
    grid[row + dr * i][col + dc * i] = word[i]
  }
}

export function generateWordSearch(rawWords: string[], size = 12): WordSearchPuzzle {
  const words: WordSearchWord[] = rawWords
    .map((display) => ({ display, normalized: normalizeWord(display) }))
    .filter((w) => w.normalized.length >= 3 && w.normalized.length <= size)
    .sort((a, b) => b.normalized.length - a.normalized.length)

  const grid: string[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ''),
  )

  const placedWords: WordSearchWord[] = []

  for (const word of words) {
    let placed = false
    const attempts = shuffle(
      DIRECTIONS.flatMap(([dr, dc]) =>
        Array.from({ length: 80 }, (_, i) => ({
          row: i % size,
          col: Math.floor(i / size) % size,
          dr,
          dc,
        })),
      ),
    )

    for (const attempt of attempts) {
      if (canPlace(grid, word.normalized, attempt.row, attempt.col, attempt.dr, attempt.dc)) {
        placeWord(grid, word.normalized, attempt.row, attempt.col, attempt.dr, attempt.dc)
        placedWords.push(word)
        placed = true
        break
      }
    }

    void placed
  }

  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      if (grid[r][c] === '') grid[r][c] = randomLetter()
    }
  }

  return { grid, words: placedWords.length > 0 ? placedWords : words.slice(0, 4), size }
}
