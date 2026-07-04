import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { teacherActivity } from '../data/users'
import type { Activity, Grade, StudentProgress } from '../types'

function AdminDashboard() {
  const [progress, setProgress] = useState<StudentProgress[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Formulario: agregar actividad
  const [actTitle, setActTitle] = useState('')
  const [actLanguage, setActLanguage] = useState('Inglés')
  const [actDueDate, setActDueDate] = useState('')

  // Formulario: subir notas
  const [gradeStudent, setGradeStudent] = useState('')
  const [gradeActivity, setGradeActivity] = useState('')
  const [gradeScore, setGradeScore] = useState('')

  const loadData = async () => {
    setLoading(true)
    setError(null)
    const [progressRes, activitiesRes, gradesRes] = await Promise.all([
      supabase.from('student_progress').select('*').order('name'),
      supabase.from('activities').select('*').order('created_at', { ascending: false }),
      supabase.from('grades').select('*').order('created_at', { ascending: false }),
    ])

    const firstError = progressRes.error || activitiesRes.error || gradesRes.error
    if (firstError) {
      setError(
        'No se pudieron cargar los datos. ¿Ya corriste el schema.sql en Supabase? Detalle: ' +
          firstError.message,
      )
      setLoading(false)
      return
    }

    const progressData = (progressRes.data ?? []).map((r) => ({
      studentId: r.student_id ?? r.id,
      name: r.name,
      language: r.language,
      lessonsCompleted: r.lessons_completed,
      totalLessons: r.total_lessons,
      quizAccuracy: r.quiz_accuracy,
      lastActive: r.last_active ?? '—',
    }))
    setProgress(progressData)
    setActivities(activitiesRes.data ?? [])
    setGrades(gradesRes.data ?? [])
    if (progressData[0]) setGradeStudent(progressData[0].name)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const totalStudents = progress.length
  const activeTeachers = teacherActivity.length
  const avgProgress = Math.round(
    progress.reduce(
      (sum, s) => sum + (s.totalLessons > 0 ? (s.lessonsCompleted / s.totalLessons) * 100 : 0),
      0,
    ) / (totalStudents || 1),
  )
  const avgAccuracy = Math.round(
    progress.reduce((sum, s) => sum + s.quizAccuracy, 0) / (totalStudents || 1),
  )

  const handleAddActivity = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!actTitle.trim()) return
    const { data: userData } = await supabase.auth.getUser()
    const { error } = await supabase.from('activities').insert({
      title: actTitle.trim(),
      language: actLanguage,
      due_date: actDueDate || null,
      created_by: userData.user?.id ?? null,
    })
    if (error) {
      setError('No se pudo guardar la actividad: ' + error.message)
      return
    }
    setActTitle('')
    setActDueDate('')
    loadData()
  }

  const handleAddGrade = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!gradeStudent || !gradeActivity.trim() || !gradeScore.trim()) return
    const student = progress.find((s) => s.name === gradeStudent)
    const { data: userData } = await supabase.auth.getUser()
    const { error } = await supabase.from('grades').insert({
      student_id: student && student.studentId !== student.name ? student.studentId : null,
      student_name: gradeStudent,
      activity: gradeActivity.trim(),
      score: gradeScore.trim(),
      created_by: userData.user?.id ?? null,
    })
    if (error) {
      setError('No se pudo guardar la nota: ' + error.message)
      return
    }
    setGradeActivity('')
    setGradeScore('')
    loadData()
  }

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <h2>Panel administrativo</h2>
        <p>Agrega actividades, sube notas y sigue el progreso de tus estudiantes.</p>
      </header>

      {error && <p className="login-error">{error}</p>}
      {loading && <p>Cargando datos…</p>}

      <div className="dashboard-summary">
        <div className="summary-card">
          <span className="summary-value">{totalStudents}</span>
          <span className="summary-label">Estudiantes</span>
        </div>
        <div className="summary-card">
          <span className="summary-value">{avgProgress}%</span>
          <span className="summary-label">Progreso promedio</span>
        </div>
        <div className="summary-card">
          <span className="summary-value">{avgAccuracy}%</span>
          <span className="summary-label">Aciertos promedio</span>
        </div>
        <div className="summary-card">
          <span className="summary-value">{activeTeachers}</span>
          <span className="summary-label">Docentes activos</span>
        </div>
      </div>

      {/* --- Agregar actividad --- */}
      <h3 className="dashboard-section-title">Agregar actividad</h3>
      <form className="admin-form" onSubmit={handleAddActivity}>
        <div className="form-row">
          <label className="form-field">
            Título
            <input
              type="text"
              value={actTitle}
              onChange={(e) => setActTitle(e.target.value)}
              placeholder="Ej. Vocabulario de viajes"
              required
            />
          </label>
          <label className="form-field">
            Idioma
            <select value={actLanguage} onChange={(e) => setActLanguage(e.target.value)}>
              <option>Inglés</option>
              <option>Francés</option>
              <option>Portugués</option>
              <option>Italiano</option>
            </select>
          </label>
          <label className="form-field">
            Fecha límite
            <input
              type="date"
              value={actDueDate}
              onChange={(e) => setActDueDate(e.target.value)}
            />
          </label>
          <button type="submit" className="form-button">
            Agregar
          </button>
        </div>
      </form>

      {activities.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Actividad</th>
                <th>Idioma</th>
                <th>Fecha límite</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.language}</td>
                  <td>{a.due_date ?? 'Sin fecha'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- Subir notas --- */}
      <h3 className="dashboard-section-title">Subir notas</h3>
      <form className="admin-form" onSubmit={handleAddGrade}>
        <div className="form-row">
          <label className="form-field">
            Estudiante
            <select value={gradeStudent} onChange={(e) => setGradeStudent(e.target.value)}>
              {progress.map((s) => (
                <option key={s.studentId}>{s.name}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            Actividad
            <input
              type="text"
              value={gradeActivity}
              onChange={(e) => setGradeActivity(e.target.value)}
              placeholder="Ej. Quiz de saludos"
              required
            />
          </label>
          <label className="form-field">
            Nota
            <input
              type="text"
              value={gradeScore}
              onChange={(e) => setGradeScore(e.target.value)}
              placeholder="Ej. 90"
              required
            />
          </label>
          <button type="submit" className="form-button">
            Subir nota
          </button>
        </div>
      </form>

      {grades.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Actividad</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g.id}>
                  <td>{g.student_name}</td>
                  <td>{g.activity}</td>
                  <td>{g.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- Progreso de estudiantes --- */}
      <h3 className="dashboard-section-title">Progreso de estudiantes</h3>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Idioma</th>
              <th>Lecciones</th>
              <th>Aciertos</th>
              <th>Última actividad</th>
            </tr>
          </thead>
          <tbody>
            {progress.map((s) => {
              const percent =
                s.totalLessons > 0 ? Math.round((s.lessonsCompleted / s.totalLessons) * 100) : 0
              return (
                <tr key={s.studentId}>
                  <td>{s.name}</td>
                  <td>{s.language}</td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="progress-text">
                        {s.lessonsCompleted}/{s.totalLessons}
                      </span>
                    </div>
                  </td>
                  <td>{s.quizAccuracy}%</td>
                  <td>{s.lastActive}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* --- Gestión de docentes --- */}
      <h3 className="dashboard-section-title">Gestión de docentes</h3>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Docente</th>
              <th>Lecciones gestionadas</th>
              <th>Estudiantes asignados</th>
              <th>Última acción</th>
            </tr>
          </thead>
          <tbody>
            {teacherActivity.map((t) => (
              <tr key={t.teacherId}>
                <td>{t.name}</td>
                <td>{t.lessonsManaged}</td>
                <td>{t.studentsAssigned}</td>
                <td>{t.lastAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminDashboard
