/** Parámetros de dificultad según el orden del nivel (1–5). */
export type ActivityDifficulty = {
  levelOrder: number
  wordSearchCount: number
  crosswordClues: number
  matchingPairs: number
  scrambleWords: number
  scramblePassRatio: number
  vocabRecallCount: number
  grammarCheckRequired: boolean
}

export function parseLevelOrder(levelId: string): number {
  const match = levelId.match(/-lv(\d+)$/)
  return match ? Number.parseInt(match[1], 10) : 1
}

export function getActivityDifficulty(levelId: string): ActivityDifficulty {
  const levelOrder = parseLevelOrder(levelId)
  return {
    levelOrder,
    wordSearchCount: Math.min(10, 5 + levelOrder),
    crosswordClues: Math.min(9, 4 + levelOrder),
    matchingPairs: Math.min(10, 5 + levelOrder),
    scrambleWords: Math.min(9, 4 + levelOrder),
    scramblePassRatio: levelOrder >= 5 ? 0.85 : levelOrder >= 3 ? 0.75 : 0.65,
    vocabRecallCount: Math.min(5, 2 + levelOrder),
    grammarCheckRequired: levelOrder >= 2,
  }
}
