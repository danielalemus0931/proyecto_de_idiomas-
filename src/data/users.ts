import type { TeacherActivity } from '../types'

// Actividad de gestión de los docentes (dato de muestra para el panel).
// La lista real de docentes/estudiantes y el progreso viven en Supabase.
export const teacherActivity: TeacherActivity[] = [
  {
    teacherId: 'staff-1',
    name: 'Docente Demo',
    lessonsManaged: 9,
    studentsAssigned: 4,
    lastAction: 'Actualizó la lección "En el café"',
  },
  {
    teacherId: 'staff-2',
    name: 'Laura Ramírez',
    lessonsManaged: 5,
    studentsAssigned: 3,
    lastAction: 'Revisó el quiz de Francés',
  },
  {
    teacherId: 'staff-3',
    name: 'Pedro Martín',
    lessonsManaged: 4,
    studentsAssigned: 2,
    lastAction: 'Creó la lección "No mercado"',
  },
]
