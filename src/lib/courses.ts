import type { StudentGrade } from '../types'

export type CourseInfo = {
  grade: StudentGrade
  label: string
  shortLabel: string
  description: string
  maxLevel: number
  difficultyLabel: string
  cefrRange: string
}

export const COURSES: CourseInfo[] = [
  {
    grade: 8,
    label: '8° grado',
    shortLabel: '8°',
    description: 'Vocabulario esencial, saludos y presente simple.',
    maxLevel: 2,
    difficultyLabel: 'Principiante – Elemental',
    cefrRange: 'A1 – A2',
  },
  {
    grade: 9,
    label: '9° grado',
    shortLabel: '9°',
    description: 'Pasado simple, preguntas y estructuras cotidianas.',
    maxLevel: 3,
    difficultyLabel: 'Hasta Intermedio',
    cefrRange: 'A2 – B1',
  },
  {
    grade: 10,
    label: '10° grado',
    shortLabel: '10°',
    description: 'Futuro, modales y primer condicional.',
    maxLevel: 4,
    difficultyLabel: 'Hasta Avanzado',
    cefrRange: 'B1 – B2',
  },
  {
    grade: 11,
    label: '11° grado',
    shortLabel: '11°',
    description: 'Condicionales avanzados, verbos compuestos y debate.',
    maxLevel: 5,
    difficultyLabel: 'Experto completo',
    cefrRange: 'B2 – C1',
  },
]

export function getCourse(grade: StudentGrade): CourseInfo {
  return COURSES.find((c) => c.grade === grade) ?? COURSES[0]
}

export function maxLevelForGrade(grade: StudentGrade): number {
  return getCourse(grade).maxLevel
}

export function isLevelAvailableForGrade(levelOrder: number, grade: StudentGrade): boolean {
  return levelOrder <= maxLevelForGrade(grade)
}

export function quizPassThreshold(grade: StudentGrade): number {
  if (grade === 8) return 0.6
  if (grade === 9) return 0.65
  if (grade === 10) return 0.7
  return 0.75
}

export function questionCountForGrade(grade: StudentGrade): number {
  if (grade === 8) return 3
  if (grade === 9) return 4
  return 5
}
