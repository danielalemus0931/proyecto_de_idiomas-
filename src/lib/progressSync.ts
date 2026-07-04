import { supabase } from './supabase'

// Sincroniza el progreso real del estudiante a Supabase (una fila por idioma)
// para que el docente lo vea en el panel administrativo.
export async function syncStudentProgress(params: {
  studentId: string
  name: string
  languageName: string
  lessonsCompleted: number
  totalLessons: number
}): Promise<void> {
  const { studentId, name, languageName, lessonsCompleted, totalLessons } = params
  const today = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
  })
  await supabase.from('student_progress').upsert(
    {
      student_id: studentId,
      name,
      language: languageName,
      lessons_completed: lessonsCompleted,
      total_lessons: totalLessons,
      last_active: today,
    },
    { onConflict: 'student_id,language' },
  )
}
