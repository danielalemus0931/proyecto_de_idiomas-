import { useEffect, useMemo, useState } from 'react'
import type { VocabularyItem } from '../../types'
import { scrambleWord } from '../../utils/activityHelpers'
import Pronunciation from '../Pronunciation'

type Props = {
  items: VocabularyItem[]
  speechLang: string
  onComplete?: () => void
}

export default function WordScramble({ items, speechLang, onComplete }: Props) {
  const words = useMemo(
    () => items.filter((item) => item.word.replace(/\s/g, '').length >= 3).slice(0, 5),
    [items],
  )
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)

  const current = words[index]
  const scrambled = useMemo(
    () => (current ? scrambleWord(current.word.replace(/\s/g, '')) : ''),
    [current],
  )

  if (!current) {
    return (
      <section className="activity-section">
        <h3>Ordena las letras</h3>
        <p className="activity-hint">No hay suficientes palabras para esta actividad.</p>
      </section>
    )
  }

  const isCorrect =
    answer.trim().toLowerCase().replace(/\s/g, '') ===
    current.word.toLowerCase().replace(/\s/g, '')
  const finished = index >= words.length - 1 && checked && isCorrect

  useEffect(() => {
    if (finished) onComplete?.()
  }, [finished, onComplete])

  const handleCheck = () => {
    setChecked(true)
    if (isCorrect) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (index < words.length - 1) {
      setIndex((i) => i + 1)
      setAnswer('')
      setChecked(false)
    }
  }

  return (
    <section className="activity-section">
      <h3>Ordena las letras</h3>
      <p className="activity-hint">
        Pista: {current.translation}. Escribe la palabra correcta usando las letras mezcladas.
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
        />
      </div>

      <div className="activity-actions">
        <button type="button" className="activity-button" onClick={handleCheck}>
          Comprobar
        </button>
        {checked && isCorrect && index < words.length - 1 && (
          <button type="button" className="activity-button secondary" onClick={handleNext}>
            Siguiente palabra
          </button>
        )}
      </div>

      <p className="activity-progress">
        Palabra {index + 1} de {words.length} · Aciertos: {score}
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

      {finished && (
        <p className="activity-feedback success">
          ¡Completaste todas las palabras! Puntuación: {score}/{words.length}
        </p>
      )}
    </section>
  )
}
