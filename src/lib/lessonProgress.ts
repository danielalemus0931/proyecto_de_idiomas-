import { LESSONS_PER_LEVEL } from '../data/content'
import type { LessonActivityId } from '../types'

const STORAGE_KEY = 'langflow-lesson-progress'

export const QUIZ_ACTIVITY: LessonActivityId = 'quiz'
export const STOP_ACTIVITY: LessonActivityId = 'stop'

/** Actividades que varían al azar por nivel (quiz y stop siempre fijas). */
export const RANDOM_ACTIVITY_POOL: LessonActivityId[] = [
  'grammar',
  'vocab',
  'wordsearch',
  'crossword',
  'matching',
  'scramble',
]

export const FIXED_ACTIVITIES: LessonActivityId[] = [QUIZ_ACTIVITY, STOP_ACTIVITY]

/** Todas las actividades posibles (referencia para etiquetas y tipos). */
export const ALL_LESSON_ACTIVITIES: LessonActivityId[] = [
  ...RANDOM_ACTIVITY_POOL,
  ...FIXED_ACTIVITIES,
]

function hashString(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items]
  let state = seed
  for (let i = arr.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0
    const j = state % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function levelIdFromLesson(lessonId: string): string {
  const match = lessonId.match(/^(.+-lv\d+)/)
  return match?.[1] ?? lessonId
}

function levelOrderFromId(levelId: string): number {
  const match = levelId.match(/-lv(\d+)$/)
  return match ? Number.parseInt(match[1], 10) : 1
}

/**
 * Actividades del nivel: subconjunto aleatorio (cambia al avanzar de nivel) + quiz y stop siempre.
 * A mayor nivel, más actividades del pool aleatorio.
 */
export function getActivitiesForLevel(levelId: string): LessonActivityId[] {
  const seed = hashString(levelId)
  const shuffled = seededShuffle(RANDOM_ACTIVITY_POOL, seed)
  const levelOrder = levelOrderFromId(levelId)
  const pickCount = Math.min(RANDOM_ACTIVITY_POOL.length, 2 + levelOrder)
  const picked = shuffled.slice(0, pickCount)
  return [...picked, QUIZ_ACTIVITY, STOP_ACTIVITY]
}

/** Actividades requeridas para una lección (heredan el conjunto de su nivel). */
export function getActivitiesForLesson(lessonId: string, levelId?: string): LessonActivityId[] {
  return getActivitiesForLevel(levelId ?? levelIdFromLesson(lessonId))
}

function isLessonFullyComplete(
  completed: LessonActivityId[],
  lessonId: string,
): boolean {
  return getActivitiesForLesson(lessonId).every((a) => completed.includes(a))
}

export type LessonProgressState = {
  completedLessons: string[]
  activities: Record<string, LessonActivityId[]>
}

function readAll(): Record<string, LessonProgressState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, LessonProgressState>
    Object.values(parsed).forEach((state) => {
      if (!state.activities) state.activities = {}
      if (!state.completedLessons) state.completedLessons = []
    })
    return parsed
  } catch {
    return {}
  }
}

function writeAll(data: Record<string, LessonProgressState>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function userKey(userId: string, languageId: string): string {
  return `${userId}:${languageId}`
}

function emptyState(): LessonProgressState {
  return { completedLessons: [], activities: {} }
}

export function getLessonProgress(userId: string, languageId: string): LessonProgressState {
  const all = readAll()
  return all[userKey(userId, languageId)] ?? emptyState()
}

export function getCompletedActivities(
  userId: string,
  languageId: string,
  lessonId: string,
): LessonActivityId[] {
  return getLessonProgress(userId, languageId).activities[lessonId] ?? []
}

export function isActivityComplete(
  userId: string,
  languageId: string,
  lessonId: string,
  activity: LessonActivityId,
): boolean {
  return getCompletedActivities(userId, languageId, lessonId).includes(activity)
}

export function markActivityComplete(
  userId: string,
  languageId: string,
  lessonId: string,
  activity: LessonActivityId,
): boolean {
  const key = userKey(userId, languageId)
  const all = readAll()
  const current = all[key] ?? emptyState()
  const list = current.activities[lessonId] ?? []

  if (list.includes(activity)) {
    return isLessonFullyComplete(list, lessonId)
  }

  const updated = [...list, activity]
  current.activities[lessonId] = updated

  const allDone = isLessonFullyComplete(updated, lessonId)
  if (allDone && !current.completedLessons.includes(lessonId)) {
    current.completedLessons = [...current.completedLessons, lessonId]
  }

  all[key] = current
  writeAll(all)
  return allDone
}

export function isLessonCompleted(
  userId: string,
  languageId: string,
  lessonId: string,
): boolean {
  const done = getCompletedActivities(userId, languageId, lessonId)
  return isLessonFullyComplete(done, lessonId)
}

/** @deprecated Usar markActivityComplete */
export function completeLesson(userId: string, languageId: string, lessonId: string): void {
  getActivitiesForLesson(lessonId).forEach((activity) => {
    markActivityComplete(userId, languageId, lessonId, activity)
  })
}

export function lessonActivityProgress(
  userId: string,
  languageId: string,
  lessonId: string,
): { completed: number; total: number } {
  const required = getActivitiesForLesson(lessonId)
  const done = getCompletedActivities(userId, languageId, lessonId)
  const completed = required.filter((a) => done.includes(a)).length
  return { completed, total: required.length }
}

export function isLessonUnlocked(
  userId: string,
  languageId: string,
  lessonId: string,
  orderedLessonIds: string[],
): boolean {
  const index = orderedLessonIds.indexOf(lessonId)
  if (index <= 0) return true
  const previousId = orderedLessonIds[index - 1]
  return isLessonCompleted(userId, languageId, previousId)
}

export function isLevelUnlocked(
  userId: string,
  languageId: string,
  levelOrder: number,
  lessonsByLevel: Record<string, string[]>,
): boolean {
  if (levelOrder <= 1) return true
  const previousLevelKey = `${languageId}-lv${levelOrder - 1}`
  const previousLessons = lessonsByLevel[previousLevelKey] ?? []
  if (previousLessons.length === 0) return true
  return previousLessons.every((lessonId) =>
    isLessonCompleted(userId, languageId, lessonId),
  )
}

export function countCompletedInLanguage(userId: string, languageId: string): number {
  const state = getLessonProgress(userId, languageId)
  return state.completedLessons.filter((lessonId) =>
    isLessonFullyComplete(state.activities[lessonId] ?? [], lessonId),
  ).length
}

export function levelProgress(
  userId: string,
  languageId: string,
  _levelId: string,
  lessonIds: string[],
): { completed: number; total: number } {
  const completed = lessonIds.filter((id) => isLessonCompleted(userId, languageId, id)).length
  return { completed, total: lessonIds.length }
}

export function lessonsPerLevel(): number {
  return LESSONS_PER_LEVEL
}

export const ACTIVITY_LABELS: Record<LessonActivityId, string> = {
  grammar: 'Gramática',
  vocab: 'Vocabulario',
  quiz: 'Quiz escrito',
  wordsearch: 'Sopa de letras',
  crossword: 'Crucigrama',
  matching: 'Emparejar',
  scramble: 'Ordenar letras',
  stop: 'Stop competitivo',
}
