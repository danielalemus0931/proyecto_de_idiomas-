import { useMemo, useState } from 'react'
import { getCourse, quizPassThreshold } from '../../lib/courses'
import { scoreWrittenQuiz } from '../../lib/lessonQuiz'
import type { StudentGrade, WrittenQuizQuestion } from '../../types'
import SpeakButton from '../SpeakButton'

type Props = {
  questions: WrittenQuizQuestion[]
  grade: StudentGrade
  speechLang: string
  lessonCompleted?: boolean
  onVerify: (passed: boolean, score: number, total: number) => void
}

export default function WrittenQuiz({
  questions,
  grade,
  speechLang,
  lessonCompleted = false,
  onVerify,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [verified, setVerified] = useState(false)
  const [results, setResults] = useState<Record<string, boolean>>({})

  const threshold = quizPassThreshold(grade)

  const score = useMemo(() => {
    if (!verified) return null
    return scoreWrittenQuiz(questions, answers)
  }, [verified, questions, answers])

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    if (verified) setVerified(false)
  }

  const handleVerify = () => {
    const result = scoreWrittenQuiz(questions, answers)
    setResults(result.results)
    setVerified(true)
    const ratio = result.total ? result.correct / result.total : 0
    const passed = ratio >= threshold
    onVerify(passed, result.correct, result.total)
  }

  const passed =
    score !== null && score.total > 0 && score.correct / score.total >= threshold

  return (
    <section className="written-quiz">
      <header className="written-quiz-header">
        <h3>Quiz escrito</h3>
        <p className="written-quiz-meta">
          {getCourse(grade).label} · {questions.length} preguntas nuevas (no repetidas de gramática, vocabulario ni
          juegos) · Necesitas {Math.ceil(threshold * 100)}% para aprobar
        </p>
      </header>

      <div className="written-quiz-questions">
        {questions.map((q, index) => {
          const ok = verified ? results[q.id] : undefined
          const promptLines = q.prompt.split('\n')
          const sentenceLine = promptLines[promptLines.length - 1]
          const headerLines = promptLines.slice(0, -1).filter(Boolean)
          return (
            <div
              key={q.id}
              className={`written-question ${verified ? (ok ? 'correct' : 'incorrect') : ''}`}
            >
              <div className="written-question-header">
                <span className="written-question-num">{index + 1}.</span>
                <span className="written-question-kind">{kindLabel(q.kind)}</span>
              </div>
              {headerLines.map((line) => (
                <p key={line} className="written-question-meta-line">
                  {line}
                </p>
              ))}
              <p className="written-question-sentence">{sentenceLine}</p>
              <label className="sr-only" htmlFor={q.id}>
                Tu respuesta
              </label>
              <textarea
                id={q.id}
                className="written-answer-input"
                rows={q.minWords && q.minWords >= 7 ? 3 : 2}
                placeholder="Escribe la traducción completa…"
                value={answers[q.id] ?? ''}
                disabled={verified && passed}
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
              {verified && (
                <p className={`written-question-feedback ${ok ? 'success' : 'error'}`}>
                  {ok ? '✓ Correcto' : '✗ Revisa tu traducción'}
                  {!ok && q.modelAnswer && (
                    <>
                      {' '}
                      — Respuesta esperada: <strong>{q.modelAnswer}</strong>
                    </>
                  )}
                  {ok && q.modelAnswer && <> — {q.explanation}</>}
                  {q.modelAnswer && (
                    <SpeakButton
                      text={q.modelAnswer}
                      lang={speechLang}
                      title="Escuchar la respuesta correcta"
                    />
                  )}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {!verified && (
        <button type="button" className="written-quiz-verify" onClick={handleVerify}>
          Verificar respuestas
        </button>
      )}

      {verified && score && (
        <div className={`written-quiz-summary ${passed ? 'success' : 'error'}`}>
          <p>
            Obtuviste <strong>{score.correct}</strong> de <strong>{score.total}</strong>{' '}
            ({Math.round((score.correct / score.total) * 100)}%)
          </p>
          {passed ? (
            <p>
              {lessonCompleted
                ? '¡Aprobaste! Lección completada — la siguiente ya está desbloqueada.'
                : '¡Aprobaste! Lección completada.'}
            </p>
          ) : (
            <p>
              Necesitas al menos {Math.ceil(threshold * 100)}%. Revisa gramática y vocabulario,
              corrige tus respuestas e intenta de nuevo.
            </p>
          )}
          {!passed && (
            <button
              type="button"
              className="written-quiz-retry"
              onClick={() => {
                setVerified(false)
                setResults({})
              }}
            >
              Intentar de nuevo
            </button>
          )}
        </div>
      )}
    </section>
  )
}

function kindLabel(kind: WrittenQuizQuestion['kind']): string {
  const labels: Record<WrittenQuizQuestion['kind'], string> = {
    translate: 'Traducción',
    complete: 'Completar',
    conjugate: 'Verbo',
    conditional: 'Condicional',
    structure: 'Estructura',
  }
  return labels[kind]
}
