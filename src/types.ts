export type Language = {
  id: string
  name: string
  flag: string
  code: string
  description: string
  level: string
}

export type LanguageLevel = {
  id: string
  languageId: string
  order: number
  name: string
  difficulty: string
  description: string
}

export type Lesson = {
  id: string
  levelId: string
  order: number
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

export type StudentGrade = 8 | 9 | 10 | 11

export type GrammarBlock = {
  id: string
  title: string
  kind: 'structure' | 'verb' | 'conditional'
  explanation: string
  detail: string
  pattern: string
  points: string[]
  examples: { phrase: string; translation: string }[]
  practice: string
}

export type LessonActivityId =
  | 'grammar'
  | 'vocab'
  | 'quiz'
  | 'wordsearch'
  | 'crossword'
  | 'matching'
  | 'scramble'
  | 'stop'

export type WrittenQuizQuestion = {
  id: string
  kind: 'translate' | 'complete' | 'conjugate' | 'conditional' | 'structure'
  prompt: string
  hint?: string
  acceptableAnswers: string[]
  explanation: string
  /** Palabras que la respuesta debe incluir (coherencia con la consigna). */
  requiredTerms?: string[]
  /** Mínimo de palabras en la respuesta del estudiante. */
  minWords?: number
  /** Respuesta modelo mostrada al corregir. */
  modelAnswer?: string
  /** Indicación breve sobre la tarea (sin revelar la respuesta). */
  instruction?: string
}

// Roles: 'staff' agrupa a docentes y administrativos (mismo rol).
export type Role = 'staff' | 'student'

export type Gender = 'male' | 'female'

export type User = {
  id: string
  name: string
  email: string
  role: Role
  gender: Gender
}

export type Activity = {
  id: string
  title: string
  language: string
  due_date: string | null
}

export type Grade = {
  id: string
  student_name: string
  activity: string
  score: string
}

export type StudentProgress = {
  studentId: string
  name: string
  language: string
  lessonsCompleted: number
  totalLessons: number
  quizAccuracy: number // porcentaje 0-100
  lastActive: string
}

export type TeacherActivity = {
  teacherId: string
  name: string
  lessonsManaged: number
  studentsAssigned: number
  lastAction: string
}

// Configuración del avatar de cuerpo entero (SVG propio).
export type AvatarConfig = {
  skin: string // hex
  hair: string // id de estilo
  hairColor: string // hex
  top: string // id de estilo (si es 'dress', cubre también el inferior)
  topColor: string // hex
  bottom: string // id de estilo
  bottomColor: string // hex
  shoes: string // id de estilo
  shoesColor: string // hex
  expression: string // id de emoción (ojos + cejas + boca + detalles)
  accessory: string // '' = ninguno
  background: string // hex
}
