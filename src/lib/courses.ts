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

export const ALL_GRADES: StudentGrade[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

export function isStudentGrade(value: unknown): value is StudentGrade {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 11
}

export const COURSES: CourseInfo[] = [
  {
    grade: 0,
    label: 'Prescolar',
    shortLabel: 'Pre',
    description: 'Palabras básicas, sonidos y saludos muy simples.',
    maxLevel: 1,
    difficultyLabel: 'Inicio lúdico',
    cefrRange: 'Pre-A1',
  },
  {
    grade: 1,
    label: '1° grado',
    shortLabel: '1°',
    description: 'Vocabulario cotidiano y frases cortas.',
    maxLevel: 1,
    difficultyLabel: 'Principiante',
    cefrRange: 'Pre-A1',
  },
  {
    grade: 2,
    label: '2° grado',
    shortLabel: '2°',
    description: 'Saludos, colores, familia y presente muy simple.',
    maxLevel: 1,
    difficultyLabel: 'Principiante',
    cefrRange: 'A1',
  },
  {
    grade: 3,
    label: '3° grado',
    shortLabel: '3°',
    description: 'Oraciones simples y vocabulario escolar.',
    maxLevel: 2,
    difficultyLabel: 'Principiante+',
    cefrRange: 'A1',
  },
  {
    grade: 4,
    label: '4° grado',
    shortLabel: '4°',
    description: 'Presente simple y descripciones básicas.',
    maxLevel: 2,
    difficultyLabel: 'Elemental',
    cefrRange: 'A1 – A2',
  },
  {
    grade: 5,
    label: '5° grado',
    shortLabel: '5°',
    description: 'Preguntas, rutinas y vocabulario ampliado.',
    maxLevel: 2,
    difficultyLabel: 'Elemental',
    cefrRange: 'A1 – A2',
  },
  {
    grade: 6,
    label: '6° grado',
    shortLabel: '6°',
    description: 'Pasado cercano y estructuras cotidianas.',
    maxLevel: 3,
    difficultyLabel: 'Elemental+',
    cefrRange: 'A2',
  },
  {
    grade: 7,
    label: '7° grado',
    shortLabel: '7°',
    description: 'Narración simple y más precisión gramatical.',
    maxLevel: 3,
    difficultyLabel: 'Pre-intermedio',
    cefrRange: 'A2 – B1',
  },
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
  if (grade <= 2) return 0.55
  if (grade <= 5) return 0.6
  if (grade <= 7) return 0.65
  if (grade === 8) return 0.65
  if (grade === 9) return 0.7
  if (grade === 10) return 0.75
  return 0.8
}

export function questionCountForGrade(grade: StudentGrade): number {
  if (grade <= 2) return 3
  if (grade <= 5) return 3
  if (grade <= 7) return 4
  if (grade === 8) return 4
  if (grade === 9) return 5
  return 6
}

export function formatGradeLabel(grade: StudentGrade): string {
  return getCourse(grade).label
}
