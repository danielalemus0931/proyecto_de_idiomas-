import { useState } from 'react'
import type { StudentGrade } from '../types'
import {
  getSchoolSubject,
  getSubjectLessons,
  type SchoolSubjectId,
  type SubjectLesson,
} from '../data/subjects'
import { formatGradeLabel } from '../lib/courses'
import PersonalizedLessonView from './PersonalizedLessonView'

type Props = {
  subjectId: SchoolSubjectId
  grade: StudentGrade
  onBack: () => void
  onLessonComplete?: (result: { correct: number; total: number }) => void
}

export default function SubjectView({ subjectId, grade, onBack, onLessonComplete }: Props) {
  const subject = getSchoolSubject(subjectId)
  const lessons = getSubjectLessons(subjectId, grade)
  const [active, setActive] = useState<SubjectLesson | null>(lessons[0] ?? null)
  const [playing, setPlaying] = useState(false)

  if (playing && active) {
    return (
      <PersonalizedLessonView
        lesson={active}
        subjectId={subjectId}
        grade={grade}
        onBack={() => setPlaying(false)}
        onComplete={onLessonComplete}
      />
    )
  }

  return (
    <section className="subject-view">
      <button type="button" className="back-button" onClick={onBack}>
        ← Volver
      </button>

      <header className="subject-view-header" style={{ borderColor: subject.accent }}>
        <span className="subject-view-icon" aria-hidden="true">
          {subject.icon}
        </span>
        <div>
          <h2>{subject.name}</h2>
          <p>
            {formatGradeLabel(grade)} · {subject.description}
          </p>
        </div>
      </header>

      <div className="subject-view-layout">
        <aside className="subject-lesson-list" aria-label="Lecciones de la materia">
          <h3 className="section-title">Lecciones</h3>
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              type="button"
              className={`subject-lesson-item ${active?.id === lesson.id ? 'subject-lesson-item--active' : ''}`}
              onClick={() => setActive(lesson)}
            >
              <span className="subject-lesson-topic">{lesson.topic}</span>
              <strong>{lesson.title}</strong>
            </button>
          ))}
        </aside>

        {active && (
          <article className="subject-lesson-detail">
            <p className="subject-lesson-kicker">{active.topic}</p>
            <h3>{active.title}</h3>
            <p className="subject-lesson-summary">{active.summary}</p>

            <h4>Conceptos clave</h4>
            <ul className="subject-concept-list">
              {active.concepts.map((concept) => (
                <li key={concept}>{concept}</li>
              ))}
            </ul>

            <h4>Vocabulario</h4>
            <ul className="subject-term-list">
              {active.terms.map((item) => (
                <li key={item.term}>
                  <strong>{item.term}</strong>
                  <span>{item.meaning}</span>
                </li>
              ))}
            </ul>

            <div className="subject-practice-box">
              <h4>Práctica</h4>
              <p>{active.practice}</p>
            </div>

            <button
              type="button"
              className="subject-start-personalized"
              onClick={() => setPlaying(true)}
            >
              📚 Abrir lección
            </button>

            <p className="subject-source">Fuente curricular: {active.source}</p>
          </article>
        )}
      </div>
    </section>
  )
}
