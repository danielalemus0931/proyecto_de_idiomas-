import { formatGradeLabel } from '../lib/courses'
import { countGradeTopics, getGradeSyllabus, type SchoolSubjectId } from '../data/subjects'
import type { StudentGrade } from '../types'

type Props = {
  grade: StudentGrade
  onBack: () => void
  onOpenSubject: (subjectId: SchoolSubjectId) => void
}

export default function GradeSyllabusView({ grade, onBack, onOpenSubject }: Props) {
  const syllabus = getGradeSyllabus(grade)
  const total = countGradeTopics(grade)

  return (
    <section className="syllabus-view">
      <button type="button" className="back-button" onClick={onBack}>
        ← Volver
      </button>

      <header className="syllabus-header">
        <p className="syllabus-kicker">Módulo de temario</p>
        <h2>Temas de {formatGradeLabel(grade)}</h2>
        <p>
          Aquí están todos los temas que se van a ver en este curso: {total} temas en{' '}
          {syllabus.length} materias, según la malla del Ministerio de Educación Nacional.
        </p>
      </header>

      <div className="syllabus-sections">
        {syllabus.map((section, sectionIndex) => (
          <article
            key={section.subject.id}
            className="syllabus-section"
            style={{ ['--subject-accent' as string]: section.subject.accent }}
          >
            <header className="syllabus-section-head">
              <div className="syllabus-section-title">
                <span className="syllabus-section-icon" aria-hidden="true">
                  {section.subject.icon}
                </span>
                <div>
                  <h3>{section.subject.name}</h3>
                  <p>{section.lessons.length} temas</p>
                </div>
              </div>
              <button
                type="button"
                className="syllabus-open-btn"
                onClick={() => onOpenSubject(section.subject.id)}
              >
                Abrir materia
              </button>
            </header>

            <ol className="syllabus-topic-list">
              {section.lessons.map((lesson, index) => (
                <li key={lesson.id} className="syllabus-topic-item">
                  <span className="syllabus-topic-num">
                    {sectionIndex + 1}.{index + 1}
                  </span>
                  <div className="syllabus-topic-body">
                    <strong>{lesson.title}</strong>
                    <span className="syllabus-topic-meta">{lesson.topic}</span>
                    <p>{lesson.summary}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  )
}
