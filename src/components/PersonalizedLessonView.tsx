import { useMemo, useState } from 'react'
import type { SubjectLesson, SchoolSubjectId } from '../data/subjects'
import {
  defaultLearnerProfile,
  type LearnerProfile,
  type NeuroNeed,
  type LearningLevel,
} from '../lib/learnerProfile'
import {
  buildPersonalizedLesson,
  normalizeAnswer,
  type GeneratedActivity,
  type CardVisual,
  type PersonalizedLesson,
} from '../lib/personalizedLessonEngine'
import type { StudentGrade } from '../types'
import KawaiiAvatar from './KawaiiAvatar'
import ConfettiBurst from './ConfettiBurst'
import { DEFAULT_KAWAII } from '../lib/kawaiiAvatar'

type Screen = 'lesson' | 'activities' | 'done'

type Props = {
  lesson: SubjectLesson
  subjectId: SchoolSubjectId
  grade: StudentGrade
  onBack: () => void
  onComplete?: (result: { correct: number; total: number }) => void
}

/**
 * Pantalla de lección (solo contenido) y pantalla aparte de actividades.
 */
export default function PersonalizedLessonView({
  lesson,
  subjectId,
  grade,
  onBack,
  onComplete,
}: Props) {
  const [profile, setProfile] = useState<LearnerProfile>(() => defaultLearnerProfile(grade))
  const [screen, setScreen] = useState<Screen>('lesson')
  const [activityIndex, setActivityIndex] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [textAnswer, setTextAnswer] = useState('')
  const [checkLocked, setCheckLocked] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  const personalized: PersonalizedLesson = useMemo(
    () => buildPersonalizedLesson(lesson, subjectId, { ...profile, grade }),
    [lesson, subjectId, profile, grade],
  )

  const activity: GeneratedActivity | undefined = personalized.activities[activityIndex]
  const ui = personalized.ui
  const accent =
    subjectId === 'math' ? '#74c0fc' : subjectId === 'science' ? '#8ce99a' : '#f8a5c2'

  const bumpProfile = (ok: boolean, kind: string) => {
    setProfile((p) => ({
      ...p,
      correctStreak: ok ? p.correctStreak + 1 : 0,
      missStreak: ok ? 0 : p.missStreak + 1,
      recentActivityTypes: [kind, ...p.recentActivityTypes].slice(0, 8),
      topicProgress: Math.min(100, p.topicProgress + (ok ? 10 : 3)),
    }))
  }

  const onCheckAnswer = (ok: boolean, act: GeneratedActivity) => {
    if (checkLocked) return
    setCheckLocked(true)
    const next = { correct: score.correct + (ok ? 1 : 0), total: score.total + 1 }
    setScore(next)
    bumpProfile(ok, act.kind)
    setFeedback(ok ? `¡Genial! ${act.reward}` : act.hint ? `Casi… ${act.hint}` : 'Revisa la lección y reintenta.')
    if (!ok) setShowHint(true)
  }

  const startActivities = () => {
    setScreen('activities')
    setActivityIndex(0)
    setFeedback(null)
    setShowHint(false)
    setCheckLocked(false)
    setTextAnswer('')
    setScore({ correct: 0, total: 0 })
  }

  const nextPractice = () => {
    setFeedback(null)
    setShowHint(false)
    setCheckLocked(false)
    setTextAnswer('')
    if (activityIndex >= personalized.activities.length - 1) {
      onComplete?.(score)
      setScreen('done')
      setCelebrate(true)
      return
    }
    setActivityIndex((i) => i + 1)
  }

  const backFromActivities = () => {
    setScreen('lesson')
    setFeedback(null)
    setShowHint(false)
    setCheckLocked(false)
    setTextAnswer('')
  }

  return (
    <section className={`visual-lesson ${ui.largeType ? 'visual-lesson--large' : ''}`}>
      <button
        type="button"
        className="back-button"
        onClick={screen === 'activities' ? backFromActivities : onBack}
      >
        {screen === 'activities' ? '← Volver a la lección' : '← Volver'}
      </button>

      {screen === 'lesson' && (
        <>
          <div className="vl-top">
            <div className="vl-toolbar">
              <label className="pl-field">
                Nivel
                <select
                  value={profile.learningLevel}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, learningLevel: e.target.value as LearningLevel }))
                  }
                >
                  <option value="emerging">En inicio</option>
                  <option value="developing">En desarrollo</option>
                  <option value="proficient">Sólido</option>
                  <option value="advanced">Avanzado</option>
                </select>
              </label>
              <label className="pl-field">
                Apoyo
                <select
                  value={profile.neuroNeed}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, neuroNeed: e.target.value as NeuroNeed }))
                  }
                >
                  <option value="none">Sin ajuste</option>
                  <option value="adhd">TDAH</option>
                  <option value="autism">Autismo</option>
                  <option value="dyslexia">Dislexia</option>
                  <option value="dyscalculia">Discalculia</option>
                  <option value="mixed">Combinado</option>
                </select>
              </label>
            </div>
            <p className="vl-adaptive">{personalized.adaptiveNote}</p>
          </div>

          <article className="lesson-content" style={{ borderColor: accent }}>
            <header className="lesson-content-hero">
              <p className="lesson-content-kicker">📚 Lección</p>
              <h1>{personalized.title}</h1>
            </header>

            <section className="lesson-block">
              <h2>🎯 Objetivo de aprendizaje</h2>
              <p>{personalized.objective}</p>
            </section>

            <section className="lesson-block">
              <h2>📖 Explicación</h2>
              {personalized.explanation.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </section>

            <section className="lesson-block lesson-block--visual">
              <h2>🖼️ Ilustración</h2>
              <VisualStage visual={subjectVisual(subjectId)} subjectId={subjectId} accent={accent} />
              <p className="lesson-visual-caption">{personalized.visualSuggestion}</p>
            </section>

            <section className="lesson-block">
              <h2>💡 Ejemplos cotidianos</h2>
              <ul className="lesson-examples">
                {personalized.everydayExamples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            </section>

            <section className="lesson-block lesson-block--fun">
              <h2>🌟 Dato curioso</h2>
              <p className="lesson-fun-fact">{personalized.funFact}</p>
              {personalized.didYouKnow && (
                <p className="lesson-did-you-know">{personalized.didYouKnow}</p>
              )}
            </section>

            <section className="lesson-block">
              <h2>📝 Resumen</h2>
              <p>{personalized.summary}</p>
            </section>

            <section className="lesson-block">
              <h2>📚 Palabras clave</h2>
              <div className="vl-keywords">
                {personalized.keywords.slice(0, 8).map((k) => (
                  <span key={k}>{k}</span>
                ))}
              </div>
            </section>

            <div className="lesson-start-activity">
              <p>Cuando termines de leer, practica lo aprendido en una pantalla aparte.</p>
              <button type="button" className="vl-btn lesson-start-btn" onClick={startActivities}>
                ➡️ Comenzar actividad
              </button>
            </div>
          </article>
        </>
      )}

      {screen === 'activities' && activity && (
        <article className="vl-card vl-card--practice" style={{ borderColor: '#9b8cff' }}>
          <p className="vl-step">
            Actividad {activityIndex + 1}/{personalized.activities.length}
          </p>
          <div className="vl-icon-bubble" aria-hidden="true">
            🏆
          </div>
          <h2>{activity.title}</h2>
          <p className="vl-lines">{activity.instruction}</p>
          <p className="vl-prompt">{activity.prompt}</p>

          {(activity.kind === 'multiple_choice' ||
            activity.kind === 'observe' ||
            activity.kind === 'true_false') && (
            <div className="vl-options">
              {activity.kind === 'true_false' ? (
                <>
                  <button
                    type="button"
                    className="vl-option"
                    disabled={!!feedback}
                    onClick={() => onCheckAnswer(activity.correctBool === true, activity)}
                  >
                    Verdadero
                  </button>
                  <button
                    type="button"
                    className="vl-option"
                    disabled={!!feedback}
                    onClick={() => onCheckAnswer(activity.correctBool === false, activity)}
                  >
                    Falso
                  </button>
                </>
              ) : (
                activity.options?.map((opt, idx) => (
                  <button
                    key={opt}
                    type="button"
                    className="vl-option"
                    disabled={!!feedback}
                    onClick={() => onCheckAnswer(idx === activity.correctIndex, activity)}
                  >
                    {opt}
                  </button>
                ))
              )}
            </div>
          )}

          {(activity.kind === 'fill_blank' || activity.kind === 'math_problem') && activity.blanks && (
            <div className="vl-fill">
              <p>
                {activity.blanks.before}{' '}
                <input
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  disabled={!!feedback}
                />{' '}
                {activity.blanks.after}
              </p>
              <button
                type="button"
                className="vl-btn"
                disabled={!!feedback}
                onClick={() =>
                  onCheckAnswer(
                    normalizeAnswer(textAnswer) === normalizeAnswer(activity.blanks!.answer),
                    activity,
                  )
                }
              >
                Comprobar
              </button>
            </div>
          )}

          {activity.kind === 'short_write' && (
            <div className="vl-fill">
              <textarea
                rows={2}
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                disabled={!!feedback}
                placeholder="Escribe 1 o 2 frases…"
              />
              <button
                type="button"
                className="vl-btn"
                disabled={!!feedback}
                onClick={() =>
                  onCheckAnswer(textAnswer.trim().split(/\s+/).filter(Boolean).length >= 2, activity)
                }
              >
                Enviar
              </button>
            </div>
          )}

          {(activity.kind === 'match' || activity.kind === 'sequence') && (
            <div className="vl-options">
              <p className="vl-lines">Elige la opción que mejor completa la idea.</p>
              {(activity.sequence ?? activity.pairs?.map((p) => p.left) ?? ['Primero', 'Después'])
                .slice(0, 3)
                .map((opt, idx) => (
                  <button
                    key={opt}
                    type="button"
                    className="vl-option"
                    disabled={!!feedback}
                    onClick={() => onCheckAnswer(idx === 0, activity)}
                  >
                    {opt}
                  </button>
                ))}
            </div>
          )}

          {showHint && activity.hint && !feedback?.startsWith('¡') && (
            <p className="vl-hint">💡 {activity.hint}</p>
          )}

          {feedback && (
            <div className={`vl-feedback ${feedback.startsWith('¡') ? 'ok' : 'retry'}`}>
              <p>{feedback}</p>
              <button type="button" className="vl-btn" onClick={nextPractice}>
                {activityIndex >= personalized.activities.length - 1
                  ? 'Ver cierre'
                  : 'Siguiente actividad'}
              </button>
            </div>
          )}
        </article>
      )}

      {screen === 'done' && (
        <article className="vl-card vl-card--done">
          <ConfettiBurst active={celebrate} onDone={() => setCelebrate(false)} />
          <div className="vl-visual vl-visual--mascot">
            <KawaiiAvatar
              config={{ ...DEFAULT_KAWAII, name: 'Luna', expression: 'happy', mouth: 'open' }}
              size={140}
              motion={celebrate ? 'celebrate' : 'idle'}
            />
          </div>
          <h2>¡Actividades completadas!</h2>
          <p className="vl-lines">
            Aciertos: {score.correct}/{score.total || 1}
          </p>
          <div className="vl-keywords">
            {personalized.keywords.slice(0, 5).map((k) => (
              <span key={k}>{k}</span>
            ))}
          </div>
          <div className="lesson-done-actions">
            <button type="button" className="vl-btn vl-btn--ghost" onClick={() => setScreen('lesson')}>
              Revisar lección
            </button>
            <button type="button" className="vl-btn" onClick={onBack}>
              Volver a la materia
            </button>
          </div>
        </article>
      )}
    </section>
  )
}

function subjectVisual(subjectId: SchoolSubjectId): CardVisual {
  if (subjectId === 'math') return 'blocks'
  if (subjectId === 'science') return 'nature'
  return 'words'
}

function VisualStage({
  visual,
  subjectId,
  accent,
}: {
  visual: CardVisual
  subjectId: SchoolSubjectId
  accent: string
}) {
  if (visual === 'mascot') {
    return (
      <div className="vl-visual vl-visual--mascot">
        <KawaiiAvatar
          config={{
            ...DEFAULT_KAWAII,
            outfit:
              subjectId === 'math'
                ? 'overalls'
                : subjectId === 'science'
                  ? 'greenTunic'
                  : 'hoodieSkirt',
          }}
          size={150}
        />
      </div>
    )
  }

  if (visual === 'blocks') {
    return (
      <div className="vl-visual vl-visual--blocks" aria-hidden="true">
        <span style={{ background: accent }}>1</span>
        <span style={{ background: '#ffe066' }}>2</span>
        <span style={{ background: '#8ce99a' }}>3</span>
        <span className="vl-plus">+</span>
        <span style={{ background: '#74c0fc' }}>?</span>
      </div>
    )
  }

  if (visual === 'nature') {
    return (
      <div className="vl-visual vl-visual--nature" aria-hidden="true">
        <span>🌱</span>
        <span>☀️</span>
        <span>💧</span>
        <span>🦋</span>
      </div>
    )
  }

  if (visual === 'words') {
    return (
      <div className="vl-visual vl-visual--words" aria-hidden="true">
        <span>A</span>
        <span>á</span>
        <span>📖</span>
      </div>
    )
  }

  if (visual === 'stars') {
    return (
      <div className="vl-visual vl-visual--stars" aria-hidden="true">
        <span className="vl-bounce">⭐</span>
        <span className="vl-bounce vl-bounce--delay">✨</span>
        <span className="vl-bounce">🌟</span>
      </div>
    )
  }

  return (
    <div className="vl-visual vl-visual--chart" aria-hidden="true">
      <i style={{ height: '40%' }} />
      <i style={{ height: '70%' }} />
      <i style={{ height: '55%' }} />
    </div>
  )
}
