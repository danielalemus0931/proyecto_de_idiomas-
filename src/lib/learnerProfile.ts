import type { StudentGrade } from '../types'
import type { SchoolSubjectId } from '../data/subjects'

/** Necesidades educativas que adaptan ritmo, texto y formato. */
export type NeuroNeed =
  | 'none'
  | 'adhd'
  | 'autism'
  | 'dyslexia'
  | 'dyscalculia'
  | 'mixed'

export type LearningLevel = 'emerging' | 'developing' | 'proficient' | 'advanced'

export type LearnerProfile = {
  grade: StudentGrade
  /** Edad aproximada según el grado (se puede ajustar). */
  age: number
  subjectId?: SchoolSubjectId
  learningLevel: LearningLevel
  neuroNeed: NeuroNeed
  /** 0–100 progreso estimado en el tema actual. */
  topicProgress: number
  /** Errores recientes (palabras o conceptos). */
  frequentErrors: string[]
  /** Segundos promedio de respuesta (si se conoce). */
  avgResponseSeconds: number | null
  /** Actividades completadas recientemente (ids o tipos). */
  recentActivityTypes: string[]
  /** Racha de aciertos seguidos (para subir dificultad). */
  correctStreak: number
  /** Fallos seguidos (para bajar dificultad / dar pistas). */
  missStreak: number
}

export type GradeBand = 'preschool' | 'primary' | 'secondary' | 'media'

export function gradeBand(grade: StudentGrade): GradeBand {
  if (grade === 0) return 'preschool'
  if (grade <= 5) return 'primary'
  if (grade <= 9) return 'secondary'
  return 'media'
}

export function ageFromGrade(grade: StudentGrade): number {
  const map: Record<StudentGrade, number> = {
    0: 5,
    1: 6,
    2: 7,
    3: 8,
    4: 9,
    5: 10,
    6: 11,
    7: 12,
    8: 13,
    9: 14,
    10: 15,
    11: 16,
  }
  return map[grade]
}

export function defaultLearnerProfile(grade: StudentGrade): LearnerProfile {
  return {
    grade,
    age: ageFromGrade(grade),
    learningLevel: grade <= 2 ? 'emerging' : grade <= 6 ? 'developing' : 'proficient',
    neuroNeed: 'none',
    topicProgress: 0,
    frequentErrors: [],
    avgResponseSeconds: null,
    recentActivityTypes: [],
    correctStreak: 0,
    missStreak: 0,
  }
}

/** Ajustes de presentación según necesidades. */
export type InclusiveUiHints = {
  shortBlocks: boolean
  oneTaskAtATime: boolean
  largeType: boolean
  highlightKeywords: boolean
  stepByStep: boolean
  extraExamples: boolean
  suggestBreaks: boolean
  concreteLanguage: boolean
  visualSupport: boolean
  immediateFeedback: boolean
  maxActivities: number
}

export function inclusiveHints(profile: LearnerProfile): InclusiveUiHints {
  const need = profile.neuroNeed
  const band = gradeBand(profile.grade)
  const struggling = profile.missStreak >= 2 || profile.learningLevel === 'emerging'
  const flying = profile.correctStreak >= 3 || profile.learningLevel === 'advanced'

  return {
    shortBlocks: need === 'adhd' || need === 'dyslexia' || need === 'mixed' || band === 'preschool',
    oneTaskAtATime: need === 'adhd' || need === 'autism' || need === 'mixed' || band === 'preschool',
    largeType: need === 'dyslexia' || need === 'mixed' || band === 'preschool',
    highlightKeywords: true,
    stepByStep: need === 'autism' || need === 'dyscalculia' || need === 'mixed' || struggling,
    extraExamples: struggling || need === 'dyscalculia' || need === 'dyslexia',
    suggestBreaks: need === 'adhd' || need === 'mixed',
    concreteLanguage: need === 'autism' || band === 'preschool' || band === 'primary',
    visualSupport: band === 'preschool' || band === 'primary' || need !== 'none',
    immediateFeedback: true,
    maxActivities: band === 'preschool' ? 3 : flying ? 6 : struggling ? 3 : 4,
  }
}
