import type { User } from '../types'

const DEMO_KEY = 'langflow-demo-user'

export const DEMO_USER: User = {
  id: 'demo-daniela',
  name: 'Daniela',
  email: 'daniela.demo@langflow.local',
  role: 'student',
  gender: 'female',
  assignedLanguage: null,
}

/** Demo masculino para probar el avatar de chico. */
export const DEMO_USER_MALE: User = {
  id: 'demo-mateo',
  name: 'Mateo',
  email: 'mateo.demo@langflow.local',
  role: 'student',
  gender: 'male',
  assignedLanguage: null,
}

export function getDemoUser(): User | null {
  try {
    const raw = localStorage.getItem(DEMO_KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function startDemoSession(user: User = DEMO_USER): void {
  localStorage.setItem(DEMO_KEY, JSON.stringify(user))
}

export function clearDemoSession(): void {
  localStorage.removeItem(DEMO_KEY)
}
