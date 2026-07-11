import { useEffect } from 'react'
import { COURSES } from '../lib/courses'
import type { StudentGrade } from '../types'

type Props = {
  selected: StudentGrade | null
  open: boolean
  onSelect: (grade: StudentGrade) => void
  onClose: () => void
}

const GROUPS: { id: string; title: string; grades: StudentGrade[] }[] = [
  { id: 'pre', title: 'Inicial', grades: [0] },
  { id: 'pri', title: 'Primaria', grades: [1, 2, 3, 4, 5] },
  { id: 'sec', title: 'Secundaria', grades: [6, 7, 8, 9] },
  { id: 'med', title: 'Media', grades: [10, 11] },
]

export default function GradeSidebar({ selected, open, onSelect, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      <div
        className={`grade-drawer-backdrop ${open ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`grade-sidebar ${open ? 'is-open' : ''}`}
        aria-label="Seleccionar grado"
        aria-hidden={!open}
      >
        <div className="grade-sidebar-header">
          <div className="grade-sidebar-header-row">
            <div>
              <p className="grade-sidebar-kicker">Tu curso</p>
              <h2 className="grade-sidebar-title">Grados</h2>
              <p className="grade-sidebar-hint">Prescolar a 11°</p>
            </div>
            <button
              type="button"
              className="grade-sidebar-close"
              onClick={onClose}
              aria-label="Cerrar menú de grados"
            >
              ✕
            </button>
          </div>
        </div>

        <nav className="grade-sidebar-nav">
          {GROUPS.map((group) => (
            <div key={group.id} className="grade-sidebar-group">
              <p className="grade-sidebar-group-title">{group.title}</p>
              <div className="grade-sidebar-group-list">
                {group.grades.map((grade) => {
                  const course = COURSES.find((c) => c.grade === grade)
                  if (!course) return null
                  const isActive = selected === course.grade
                  return (
                    <button
                      key={course.grade}
                      type="button"
                      className={`grade-sidebar-item ${isActive ? 'grade-sidebar-item--active' : ''}`}
                      onClick={() => onSelect(course.grade)}
                      aria-current={isActive ? 'page' : undefined}
                      title={course.description}
                    >
                      <span className="grade-sidebar-badge">{course.shortLabel}</span>
                      <span className="grade-sidebar-label">{course.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
