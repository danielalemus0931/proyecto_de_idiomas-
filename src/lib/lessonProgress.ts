import { LESSONS_PER_LEVEL } from '../data/content'
import type { LessonActivityId } from '../types'

const STORAGE_KEY = 'langflow-lesson-progress'

export const ALL_LESSON_ACTIVITIES: LessonActivityId[] = [
  'grammar',
  'vocab',
  'quiz',
  'wordsearch',
  'crossword',
  'matching',
  'scramble',
]

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
    return ALL_LESSON_ACTIVITIES.every((a) => list.includes(a))
  }

  const updated = [...list, activity]
  current.activities[lessonId] = updated

  const allDone = ALL_LESSON_ACTIVITIES.every((a) => updated.includes(a))
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
  return ALL_LESSON_ACTIVITIES.every((a) => done.includes(a))
}

/** @deprecated Usar markActivityComplete */
export function completeLesson(userId: string, languageId: string, lessonId: string): void {
  ALL_LESSON_ACTIVITIES.forEach((activity) => {
    markActivityComplete(userId, languageId, lessonId, activity)
  })
}

export function lessonActivityProgress(
  userId: string,
  languageId: string,
  lessonId: string,
): { completed: number; total: number } {
  const done = getCompletedActivities(userId, languageId, lessonId)
  return { completed: done.length, total: ALL_LESSON_ACTIVITIES.length }
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
    ALL_LESSON_ACTIVITIES.every((a) => (state.activities[lessonId] ?? []).includes(a)),
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
}
