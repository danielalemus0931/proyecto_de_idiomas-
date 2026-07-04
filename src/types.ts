export type Language = {
  id: string
  name: string
  flag: string
  description: string
  level: string
}

export type Lesson = {
  id: string
  title: string
  topic: string
  duration: string
  words: number
}

export type VocabularyItem = {
  word: string
  translation: string
  example: string
}

export type QuizOption = {
  id: string
  text: string
  correct: boolean
}
