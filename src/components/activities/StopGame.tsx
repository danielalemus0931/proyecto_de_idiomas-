import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  POINTS_PER_CATEGORY,
  STOP_CATEGORIES,
  STOP_TIME_SECONDS,
  type StopAnswers,
  type StopScoreEntry,
} from '../../data/stopGame'
import { supabase } from '../../lib/supabase'
import type { User } from '../../types'
import {
  emptyStopAnswers,
  getDailyLetter,
  languageInputHint,
  scoreStopAnswers,
} from '../../utils/stopGameHelpers'

type Props = {
  languageId: string
  languageName: string
  currentUser: User
  embedded?: boolean
  onComplete?: () => void
}

type Phase = 'ready' | 'playing' | 'finished'

const LOCAL_KEY = 'langflow-stop-scores'

function loadLocalScores(languageId: string, letter: string): StopScoreEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return []
    const all = JSON.parse(raw) as Record<string, StopScoreEntry[]>
    return (all[`${languageId}-${letter}`] ?? []).sort((a, b) => b.score - a.score)
  } catch {
    return []
  }
}

function saveLocalScore(
  languageId: string,
  letter: string,
  entry: StopScoreEntry,
): StopScoreEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    const all: Record<string, StopScoreEntry[]> = raw ? JSON.parse(raw) : {}
    const key = `${languageId}-${letter}`
    const list = [...(all[key] ?? []), entry].sort((a, b) => b.score - a.score).slice(0, 20)
    all[key] = list
    localStorage.setItem(LOCAL_KEY, JSON.stringify(all))
    return list
  } catch {
    return [entry]
  }
}

export default function StopGame({
  languageId,
  languageName,
  currentUser,
  embedded = false,
  onComplete,
}: Props) {
  const letter = useMemo(() => getDailyLetter(languageId), [languageId])
  const [phase, setPhase] = useState<Phase>('ready')
  const [timeLeft, setTimeLeft] = useState(STOP_TIME_SECONDS)
  const [answers, setAnswers] = useState<StopAnswers>(() => emptyStopAnswers())
  const [leaderboard, setLeaderboard] = useState<StopScoreEntry[]>([])
  const [lastScore, setLastScore] = useState<number | null>(null)
  const [loadingBoard, setLoadingBoard] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const loadLeaderboard = useCallback(async () => {
    setLoadingBoard(true)
    const { data, error } = await supabase
      .from('stop_scores')
      .select('id, student_name, score, categories_filled, time_remaining, created_at')
      .eq('language_id', languageId)
      .eq('letter', letter)
      .order('score', { ascending: false })
      .limit(10)

    if (error || !data) {
      setLeaderboard(loadLocalScores(languageId, letter))
    } else {
      setLeaderboard(data as StopScoreEntry[])
    }
    setLoadingBoard(false)
  }, [languageId, letter])

  useEffect(() => {
    loadLeaderboard()
  }, [loadLeaderboard])

  const finishGame = useCallback(async () => {
    if (submitted) return
    setSubmitted(true)

    const remaining = timeLeft
    const result = scoreStopAnswers(answers, letter, remaining)
    setLastScore(result.totalScore)
    setPhase('finished')
    setSubmitting(true)

    const entry: StopScoreEntry = {
      student_name: currentUser.name || currentUser.email,
      score: result.totalScore,
      categories_filled: result.categoriesFilled,
      time_remaining: remaining,
    }

    const { error } = await supabase.from('stop_scores').insert({
      student_id: currentUser.id,
      student_name: entry.student_name,
      language_id: languageId,
      letter,
      score: entry.score,
      categories_filled: entry.categories_filled,
      time_remaining: entry.time_remaining,
    })

    if (error) {
      setLeaderboard(saveLocalScore(languageId, letter, entry))
    } else {
      await loadLeaderboard()
    }
    setSubmitting(false)
    onComplete?.()
  }, [submitted, timeLeft, answers, letter, currentUser, languageId, loadLeaderboard, onComplete])

  useEffect(() => {
    if (phase !== 'playing') return undefined
    const timer = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) {
      finishGame()
    }
  }, [phase, timeLeft, finishGame])

  const startGame = () => {
    setAnswers(emptyStopAnswers())
    setTimeLeft(STOP_TIME_SECONDS)
    setLastScore(null)
    setSubmitted(false)
    setPhase('playing')
  }

  const updateAnswer = (id: keyof StopAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const result =
    phase === 'finished' ? scoreStopAnswers(answers, letter, timeLeft) : null

  return (
    <div className={`stop-game ${embedded ? 'stop-game--embedded' : ''}`}>
      <header className="stop-header">
        <span className="stop-badge">Competitivo · {languageName} · 1:00</span>
        <h2>{embedded ? 'Stop — dentro de la lección' : 'Stop — Tutti frutti'}</h2>
        <p className="activity-hint">{languageInputHint(languageId)}</p>
      </header>

      <div className="stop-letter-box">
        <span className="stop-letter-label">Letra del día</span>
        <span className="stop-letter">{letter}</span>
        <span className="stop-letter-note">Todos los estudiantes juegan con la misma letra hoy.</span>
      </div>

      {phase === 'ready' && (
        <section className="stop-section">
          <h3>Reglas</h3>
          <ul className="stop-rules">
            <li>
              Tienes <strong>1 minuto ({STOP_TIME_SECONDS}s)</strong> para completar las categorías.
            </li>
            <li>Cada respuesta debe empezar con la letra <strong>{letter}</strong>.</li>
            <li>
              Categorías: palabra, país, color, animal, alimento y objeto.
            </li>
            <li>Ganas <strong>{POINTS_PER_CATEGORY} pts</strong> por categoría válida + segundos restantes.</li>
            <li>Tu puntuación compite en el ranking de {languageName} de hoy.</li>
          </ul>
          <div className="activity-actions">
            <button type="button" className="activity-button stop-start" onClick={startGame}>
              ¡Empezar!
            </button>
          </div>
        </section>
      )}

      {phase === 'playing' && (
        <section className="stop-section">
          <div className="stop-timer" aria-live="polite">
            <span className="stop-timer-value">{timeLeft}s</span>
            <span className="stop-timer-label">Tiempo restante</span>
          </div>

          <form
            className="stop-form"
            onSubmit={(e) => {
              e.preventDefault()
              finishGame()
            }}
          >
            {STOP_CATEGORIES.map((cat) => (
              <label key={cat.id} className="stop-field">
                <span className="stop-field-label">
                  <span className="stop-field-icon" aria-hidden="true">{cat.icon}</span>
                  {cat.label}
                </span>
                <input
                  type="text"
                  value={answers[cat.id]}
                  onChange={(e) => updateAnswer(cat.id, e.target.value)}
                  placeholder={cat.placeholder}
                  autoComplete="off"
                />
              </label>
            ))}
            <button type="submit" className="activity-button stop-submit">
              ¡Stop! Enviar respuestas
            </button>
          </form>
        </section>
      )}

      {phase === 'finished' && result && (
        <section className="stop-section">
          <div className="stop-result">
            <p className="stop-result-score">{lastScore ?? result.totalScore} pts</p>
            <p>
              {result.categoriesFilled} de {STOP_CATEGORIES.length} categorías válidas
              {result.categoriesFilled < STOP_CATEGORIES.length &&
                ' — revisa que empiecen con la letra correcta.'}
            </p>
          </div>
          <div className="activity-actions">
            <button type="button" className="activity-button secondary" onClick={startGame}>
              Jugar de nuevo
            </button>
            <button type="button" className="activity-button" onClick={() => setPhase('ready')}>
              Volver a reglas
            </button>
          </div>
        </section>
      )}

      <section className="stop-section stop-leaderboard">
        <h3>Ranking de hoy — {languageName}</h3>
        {loadingBoard || submitting ? (
          <p className="activity-hint">Actualizando ranking…</p>
        ) : leaderboard.length === 0 ? (
          <p className="activity-hint">Sé el primero en aparecer en el ranking de hoy.</p>
        ) : (
          <ol className="stop-ranking">
            {leaderboard.map((row, index) => (
              <li key={row.id ?? `${row.student_name}-${index}`}>
                <span className="stop-rank">#{index + 1}</span>
                <span className="stop-rank-name">{row.student_name}</span>
                <span className="stop-rank-meta">
                  {row.categories_filled} cat. · +{row.time_remaining}s
                </span>
                <span className="stop-rank-score">{row.score} pts</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}
