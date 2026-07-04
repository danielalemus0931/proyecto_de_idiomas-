export type Language = {
  id: string
  name: string
  flag: string
  code: string
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

// Roles: 'staff' agrupa a docentes y administrativos (mismo rol).
export type Role = 'staff' | 'student'

export type User = {
  id: string
  name: string
  email: string
  role: Role
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
