import { useEffect, useState } from 'react'
import { createIsolatedClient, supabase } from '../lib/supabase'
import { languages } from '../data/content'
import type { Gender, Grade } from '../types'

type StudentRow = {
  id: string
  name: string
  email: string
  assigned_language: string | null
}

type ProgressRow = {
  student_id: string | null
  name: string
  language: string
  lessons_completed: number
  total_lessons: number
  last_active: string | null
}

function AdminDashboard() {
  const [students, setStudents] = useState<StudentRow[]>([])
  const [progress, setProgress] = useState<ProgressRow[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Formulario: subir notas
  const [gradeStudent, setGradeStudent] = useState('')
  const [gradeActivity, setGradeActivity] = useState('')
  const [gradeScore, setGradeScore] = useState('')

  // Formulario: agregar estudiante
  const [showNewStudent, setShowNewStudent] = useState(false)
  const [nsName, setNsName] = useState('')
  const [nsEmail, setNsEmail] = useState('')
  const [nsPass, setNsPass] = useState('')
  const [nsGender, setNsGender] = useState<Gender>('female')
  const [nsLang, setNsLang] = useState('')
  const [nsBusy, setNsBusy] = useState(false)
  const [nsMsg, setNsMsg] = useState<string | null>(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    const [studentsRes, progressRes, gradesRes] = await Promise.all([
      supabase.from('profiles').select('id, name, email, assigned_language').eq('role', 'student').order('name'),
      supabase.from('student_progress').select('*').order('name'),
      supabase.from('grades').select('*').order('created_at', { ascending: false }),
    ])
    const firstError = studentsRes.error || progressRes.error || gradesRes.error
    if (firstError) {
      setError('No se pudieron cargar los datos: ' + firstError.message)
      setLoading(false)
      return
    }
    const studentRows = (studentsRes.data ?? []) as StudentRow[]
    setStudents(studentRows)
    setProgress((progressRes.data ?? []) as ProgressRow[])
    setGrades((gradesRes.data ?? []) as Grade[])
    if (studentRows[0]) setGradeStudent(studentRows[0].name)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const assignLanguage = async (studentId: string, langId: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ assigned_language: langId || null })
      .eq('id', studentId)
    if (error) {
      setError('No se pudo asignar el idioma: ' + error.message)
      return
    }
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, assigned_language: langId || null } : s)),
    )
  }

  const handleAddStudent = async (event: React.FormEvent) => {
    event.preventDefault()
    setNsMsg(null)
    if (!nsName.trim() || !nsEmail.trim() || nsPass.length < 6) {
      setNsMsg('Completa nombre, correo y una contraseña de al menos 6 caracteres.')
      return
    }
    setNsBusy(true)
    // Cliente aislado: crea la cuenta sin cerrar la sesión del docente.
    const temp = createIsolatedClient()
    const { data, error } = await temp.auth.signUp({
      email: nsEmail.trim().toLowerCase(),
      password: nsPass,
      options: { data: { name: nsName.trim(), role: 'student', gender: nsGender } },
    })
    if (error) {
      setNsMsg('No se pudo crear el estudiante: ' + error.message)
      setNsBusy(false)
      return
    }
    // Asigna idioma (si se eligió) usando la sesión del docente.
    const newId = data.user?.id
    if (newId && nsLang) {
      await supabase.from('profiles').update({ assigned_language: nsLang }).eq('id', newId)
    }
    await temp.auth.signOut()
    if (data.session) {
      setNsMsg(`✓ Estudiante "${nsName.trim()}" creado. Ya puede iniciar sesión con su correo y contraseña.`)
    } else {
      setNsMsg(
        `✓ Estudiante "${nsName.trim()}" creado, pero la confirmación por correo está activada en Supabase, así que aún no puede entrar. Desactívala en Authentication → Sign In / Providers → Email → "Confirm email".`,
      )
    }
    setNsName('')
    setNsEmail('')
    setNsPass('')
    setNsLang('')
    setNsBusy(false)
    loadData()
  }

  const handleAddGrade = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!gradeStudent || !gradeActivity.trim() || !gradeScore.trim()) return
    const student = students.find((s) => s.name === gradeStudent)
    const { data: userData } = await supabase.auth.getUser()
    const { error } = await supabase.from('grades').insert({
      student_id: student?.id ?? null,
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

  const progressByStudent = new Map<string, ProgressRow[]>()
  progress.forEach((p) => {
    if (!p.student_id) return
    const list = progressByStudent.get(p.student_id) ?? []
    list.push(p)
    progressByStudent.set(p.student_id, list)
  })

  const totalStudents = students.length
  const withLanguage = students.filter((s) => s.assigned_language).length
  const avgProgress = Math.round(
    (progress.reduce(
      (sum, p) => sum + (p.total_lessons > 0 ? (p.lessons_completed / p.total_lessons) * 100 : 0),
      0,
    ) /
      (progress.length || 1)) || 0,
  )

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <h2>Panel administrativo</h2>
        <p>Asigna el idioma de cada estudiante, sigue su progreso real y sube sus notas.</p>
      </header>

      {error && <p className="login-error">{error}</p>}
      {loading && <p>Cargando datos…</p>}

      <div className="dashboard-summary">
        <div className="summary-card">
          <span className="summary-value">{totalStudents}</span>
          <span className="summary-label">Estudiantes</span>
        </div>
        <div className="summary-card">
          <span className="summary-value">{withLanguage}</span>
          <span className="summary-label">Con idioma asignado</span>
        </div>
        <div className="summary-card">
          <span className="summary-value">{avgProgress}%</span>
          <span className="summary-label">Progreso promedio</span>
        </div>
        <div className="summary-card">
          <span className="summary-value">{grades.length}</span>
          <span className="summary-label">Notas registradas</span>
        </div>
      </div>

      {/* --- Agregar estudiante --- */}
      <div className="admin-section-head">
        <h3 className="dashboard-section-title">Estudiantes: idioma y progreso</h3>
        <button
          type="button"
          className="form-button"
          onClick={() => {
            setShowNewStudent((v) => !v)
            setNsMsg(null)
          }}
        >
          {showNewStudent ? 'Cerrar' : '➕ Agregar estudiante'}
        </button>
      </div>

      {showNewStudent && (
        <form className="admin-form" onSubmit={handleAddStudent}>
          <div className="form-row">
            <label className="form-field">
              Nombre
              <input
                type="text"
                value={nsName}
                onChange={(e) => setNsName(e.target.value)}
                placeholder="Nombre del estudiante"
                required
              />
            </label>
            <label className="form-field">
              Correo
              <input
                type="email"
                value={nsEmail}
                onChange={(e) => setNsEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                required
              />
            </label>
            <label className="form-field">
              Contraseña
              <input
                type="text"
                value={nsPass}
                onChange={(e) => setNsPass(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
              />
            </label>
            <label className="form-field">
              Personaje
              <select value={nsGender} onChange={(e) => setNsGender(e.target.value as Gender)}>
                <option value="female">Femenino</option>
                <option value="male">Masculino</option>
              </select>
            </label>
            <label className="form-field">
              Idioma
              <select value={nsLang} onChange={(e) => setNsLang(e.target.value)}>
                <option value="">Sin asignar</option>
                {languages.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="form-button" disabled={nsBusy}>
              {nsBusy ? 'Creando…' : 'Crear estudiante'}
            </button>
          </div>
          {nsMsg && (
            <p className={nsMsg.startsWith('✓') ? 'activity-feedback success' : 'login-error'}>
              {nsMsg}
            </p>
          )}
          <p className="activity-hint">
            El estudiante podrá iniciar sesión con ese correo y contraseña. (Requiere que la
            confirmación por correo esté desactivada en Supabase.)
          </p>
        </form>
      )}

      {students.length === 0 && !loading && (
        <p className="activity-hint">Aún no hay estudiantes registrados.</p>
      )}
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Correo</th>
              <th>Idioma asignado</th>
              <th>Progreso</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const rows = progressByStudent.get(s.id) ?? []
              return (
                <tr key={s.id}>
                  <td>{s.name || '(sin nombre)'}</td>
                  <td>{s.email}</td>
                  <td>
                    <select
                      className="admin-inline-select"
                      value={s.assigned_language ?? ''}
                      onChange={(e) => assignLanguage(s.id, e.target.value)}
                    >
                      <option value="">Sin asignar (libre)</option>
                      {languages.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {rows.length === 0 ? (
                      <span className="progress-text">Sin actividad</span>
                    ) : (
                      <div className="progress-langs">
                        {rows.map((r) => {
                          const percent =
                            r.total_lessons > 0
                              ? Math.round((r.lessons_completed / r.total_lessons) * 100)
                              : 0
                          return (
                            <div key={r.language} className="progress-lang-row">
                              <span className="progress-lang-name">{r.language}</span>
                              <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${percent}%` }} />
                              </div>
                              <span className="progress-text">
                                {r.lessons_completed}/{r.total_lessons}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* --- Subir notas --- */}
      <h3 className="dashboard-section-title">Subir notas</h3>
      <form className="admin-form" onSubmit={handleAddGrade}>
        <div className="form-row">
          <label className="form-field">
            Estudiante
            <select value={gradeStudent} onChange={(e) => setGradeStudent(e.target.value)}>
              {students.map((s) => (
                <option key={s.id}>{s.name}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            Actividad / evaluación
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
          <button type="submit" className="form-button" disabled={students.length === 0}>
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
    </section>
  )
}

export default AdminDashboard
