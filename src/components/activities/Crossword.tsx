import { useEffect, useMemo, useState } from 'react'
import type { VocabularyItem } from '../../types'
import { generateCrossword } from '../../utils/crosswordGenerator'
import SpeakButton from '../SpeakButton'

type Props = {
  items: VocabularyItem[]
  clueCount?: number
  speechLang: string
  onComplete?: () => void
}

export default function Crossword({ items, clueCount = 5, speechLang, onComplete }: Props) {
  const puzzle = useMemo(() => generateCrossword(items, clueCount), [items, clueCount])
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [checked, setChecked] = useState(false)

  const updateAnswer = (id: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value.toUpperCase().replace(/[^A-ZÁÉÍÓÚÜÑ]/gi, ''),
    }))
    setChecked(false)
  }

  const handleCheck = () => setChecked(true)

  const correctCount = puzzle.clues.filter((clue) => {
    const normalized = (answers[clue.id] ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
    return normalized === clue.answer
  }).length

  const allCorrect = correctCount === puzzle.clues.length

  useEffect(() => {
    if (checked && allCorrect) onComplete?.()
  }, [checked, allCorrect, onComplete])

  return (
    <section className="activity-section">
      <h3>Crucigrama</h3>
      <p className="activity-hint">
        Lee cada pista en español y escribe la palabra en el idioma que estás aprendiendo.
      </p>

      <div className="crossword-list">
        {puzzle.clues.map((clue) => {
          const userAnswer = answers[clue.id] ?? ''
          const normalized = userAnswer.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
          const isCorrect = checked && normalized === clue.answer
          const isWrong = checked && userAnswer && normalized !== clue.answer

          return (
            <div key={clue.id} className="crossword-row">
              <span className="crossword-number">{clue.id}.</span>
              <div className="crossword-clue-block">
                <p className="crossword-clue">{clue.clue}</p>
                <div className="crossword-inputs">
                  {Array.from({ length: clue.answer.length }).map((_, i) => (
                    <input
                      key={i}
                      className={`crossword-cell ${isCorrect ? 'correct' : ''} ${isWrong ? 'incorrect' : ''}`}
                      maxLength={1}
                      value={userAnswer[i] ?? ''}
                      onChange={(e) => {
                        const char = e.target.value.slice(-1)
                        const next = (userAnswer.slice(0, i) + char + userAnswer.slice(i + 1)).slice(
                          0,
                          clue.answer.length,
                        )
                        updateAnswer(clue.id, next)
                      }}
                      aria-label={`Letra ${i + 1} de pista ${clue.id}`}
                    />
                  ))}
                </div>
                {checked && (
                  <p className="crossword-answer-hint">
                    {isWrong ? `Respuesta: ${clue.display}` : clue.display}
                    <SpeakButton text={clue.display} lang={speechLang} />
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button type="button" className="activity-button" onClick={handleCheck}>
        Comprobar respuestas
      </button>

      {checked && (
        <p className={`activity-feedback ${allCorrect ? 'success' : ''}`}>
          {allCorrect
            ? '¡Perfecto! Todas las respuestas son correctas.'
            : `Tienes ${correctCount} de ${puzzle.clues.length} correctas. ¡Inténtalo de nuevo!`}
        </p>
      )}
    </section>
  )
}
