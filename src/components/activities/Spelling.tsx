import { useMemo, useState } from 'react'
import type { StudentGrade, VocabularyItem } from '../../types'
import { shuffle } from '../../utils/activityHelpers'
import Pronunciation from '../Pronunciation'
import { recognitionSupported } from '../../lib/speech'

type Props = {
  items: VocabularyItem[]
  speechLang: string
  grade: StudentGrade
  completed?: boolean
  onComplete: (points: number) => void
}

// La dificultad aumenta con el curso: más palabras, más largas y más puntos.
const DIFFICULTY: Record<StudentGrade, { count: number; min: number; max: number; points: number }> = {
  8: { count: 3, min: 5, max: 6, points: 10 },
  9: { count: 4, min: 5, max: 7, points: 15 },
  10: { count: 5, min: 5, max: 8, points: 20 },
  11: { count: 6, min: 5, max: 10, points: 25 },
}

function letters(word: string): string {
  return word
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z]/g, '')
}
function norm(word: string): string {
  return letters(word).toLowerCase()
}

export default function Spelling({ items, speechLang, grade, completed = false, onComplete }: Props) {
  const cfg = DIFFICULTY[grade] ?? DIFFICULTY[8]

  const words = useMemo(() => {
    const seen = new Set<string>()
    const pool = items.filter((it) => {
      const len = letters(it.word).length
      if (len < cfg.min || len > cfg.max) return false
      const k = norm(it.word)
      if (seen.has(k)) return false
      seen.add(k)
      return true
    })
    return shuffle(pool).slice(0, cfg.count)
  }, [items, cfg])

  const [index, setIndex] = useState(0)
  const [passed, setPassed] = useState(false) // palabra actual dicha correctamente
  const [solved, setSolved] = useState(0)
  const [awarded, setAwarded] = useState(false)

  if (words.length === 0) {
    return (
      <section className="activity-section">
        <h3>Deletreo</h3>
        <p className="activity-hint">
          Esta lección no tiene palabras de {cfg.min}–{cfg.max} letras para deletrear.
        </p>
      </section>
    )
  }

  if (!recognitionSupported) {
    return (
      <section className="activity-section">
        <h3>Deletreo</h3>
        <p className="activity-hint">
          El deletreo por voz necesita micrófono y funciona en <strong>Chrome o Edge</strong>. Abre
          la app en uno de esos navegadores para practicar esta actividad.
        </p>
      </section>
    )
  }

  const current = words[index]
  const isLast = index >= words.length - 1
  const finished = isLast && passed

  const handleResult = (ok: boolean) => {
    if (ok && !passed) {
      setPassed(true)
      setSolved((s) => s + 1)
      if (isLast && !awarded) {
        setAwarded(true)
        onComplete(cfg.points)
      }
    }
  }

  const handleNext = () => {
    setIndex((i) => i + 1)
    setPassed(false)
  }

  return (
    <section className="activity-section spelling">
      <h3>Deletreo · Curso {grade}°</h3>
      <p className="activity-hint">
        Escucha la palabra con 🔊 y <strong>deletréala en voz alta con 🎤</strong>: di el nombre de
        cada letra en inglés (por ejemplo <em>cat</em> → &quot;C - A - T&quot;). No digas la palabra
        completa. Solo avanzas cuando la deletreas correctamente. Al terminar ganas{' '}
        <strong>{cfg.points} puntos</strong>.
      </p>

      <p className="activity-progress">
        Palabra {index + 1} de {words.length} · Correctas: {solved}
      </p>

      <div className="spelling-card">
        <p className="spelling-hint">
          Pista: <strong>{current.translation}</strong> · {letters(current.word).length} letras
        </p>

        <Pronunciation
          key={index}
          text={current.word}
          lang={speechLang}
          mode="spell"
          onResult={handleResult}
        />

        {passed && (
          <>
            <p className="activity-feedback success">
              ✓ ¡Bien deletreado! La palabra es &quot;{current.word}&quot; (
              {letters(current.word).toUpperCase().split('').join('-')}).
            </p>
            {!isLast && (
              <button type="button" className="activity-button secondary" onClick={handleNext}>
                Siguiente palabra →
              </button>
            )}
          </>
        )}
      </div>

      {(finished || completed) && (
        <p className="activity-feedback success">
          🏆 ¡Completaste el deletreo! Ganaste {cfg.points} puntos.
        </p>
      )}
    </section>
  )
}
