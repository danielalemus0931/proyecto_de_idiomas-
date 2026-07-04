import { useEffect, useMemo, useState } from 'react'
import type { VocabularyItem } from '../../types'
import { scrambleWord } from '../../utils/activityHelpers'
import Pronunciation from '../Pronunciation'

type Props = {
  items: VocabularyItem[]
  speechLang: string
  wordCount?: number
  passRatio?: number
  onComplete?: () => void
}

export default function WordScramble({
  items,
  speechLang,
  wordCount = 5,
  passRatio = 0.65,
  onComplete,
}: Props) {
  const words = useMemo(
    () => items.filter((item) => item.word.replace(/\s/g, '').length >= 3).slice(0, wordCount),
    [items, wordCount],
  )
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [passed, setPassed] = useState(false)

  const minScore = Math.ceil(words.length * passRatio)
  const current = words[index]
  const scrambled = useMemo(
    () => (current ? scrambleWord(current.word.replace(/\s/g, '')) : ''),
    [current],
  )

  const isCorrect =
    !!current &&
    answer.trim().toLowerCase().replace(/\s/g, '') ===
      current.word.toLowerCase().replace(/\s/g, '')

  useEffect(() => {
    if (passed) onComplete?.()
  }, [passed, onComplete])

  const resetGame = () => {
    setIndex(0)
    setAnswer('')
    setChecked(false)
    setScore(0)
    setPassed(false)
  }

  if (!current) {
    return (
      <section className="activity-section">
        <h3>Ordena las letras</h3>
        <p className="activity-hint">No hay suficientes palabras para esta actividad.</p>
      </section>
    )
  }

  const handleCheck = () => {
    setChecked(true)
    const nextScore = isCorrect ? score + 1 : score
    if (isCorrect) setScore(nextScore)

    if (index >= words.length - 1 && nextScore >= minScore) {
      setPassed(true)
    }
  }

  const handleNext = () => {
    if (index < words.length - 1) {
      setIndex((i) => i + 1)
      setAnswer('')
      setChecked(false)
    }
  }

  const lastAttemptFailed = checked && index >= words.length - 1 && score + (isCorrect ? 1 : 0) < minScore

  return (
    <section className="activity-section">
      <h3>Ordena las letras</h3>
      <p className="activity-hint">
        Pista: {current.translation}. Escribe la palabra correcta. Necesitas al menos{' '}
        <strong>{minScore}</strong> de {words.length} aciertos.
      </p>

      <div className="scramble-box">
        <p className="scramble-letters">{scrambled.split('').join(' · ')}</p>
        <input
          className="scramble-input"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value)
            setChecked(false)
          }}
          placeholder="Escribe la palabra…"
          aria-label="Tu respuesta"
          disabled={passed}
        />
      </div>

      <div className="activity-actions">
        {!passed && (
          <button type="button" className="activity-button" onClick={handleCheck} disabled={!answer.trim()}>
            Comprobar
          </button>
        )}
        {checked && !passed && index < words.length - 1 && (
          <button type="button" className="activity-button secondary" onClick={handleNext}>
            Siguiente palabra
          </button>
        )}
        {lastAttemptFailed && (
          <button type="button" className="activity-button secondary" onClick={resetGame}>
            Reintentar desde el inicio
          </button>
        )}
      </div>

      <p className="activity-progress">
        Palabra {index + 1} de {words.length} · Aciertos: {score}/{words.length}
      </p>

      {checked && (
        <>
          <p className={`activity-feedback ${isCorrect ? 'success' : 'error'}`}>
            {isCorrect
              ? `¡Correcto! La palabra es "${current.word}".`
              : `Casi. La respuesta correcta es "${current.word}".`}
          </p>
          <Pronunciation text={current.word} lang={speechLang} />
        </>
      )}

      {lastAttemptFailed && (
        <p className="activity-feedback error">
          Obtuviste {score + (isCorrect ? 1 : 0)} de {words.length}. Necesitas {minScore} para
          completar la actividad.
        </p>
      )}

      {passed && (
        <p className="activity-feedback success">
          ¡Excelente! Alcanzaste {score} aciertos (mínimo {minScore}).
        </p>
      )}
    </section>
  )
}
