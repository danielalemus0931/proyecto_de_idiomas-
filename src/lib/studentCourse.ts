import { isStudentGrade } from './courses'
import type { StudentGrade } from '../types'

const STORAGE_KEY = 'langflow-student-course'

export function getStudentCourse(userId: string): StudentGrade | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as Record<string, StudentGrade>
    const grade = data[userId]
    return isStudentGrade(grade) ? grade : null
  } catch {
    return null
  }
}

export function setStudentCourse(userId: string, grade: StudentGrade): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const data = raw ? (JSON.parse(raw) as Record<string, StudentGrade>) : {}
    data[userId] = grade
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ [userId]: grade }))
  }
}
