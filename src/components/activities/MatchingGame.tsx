import { useEffect, useMemo, useState } from 'react'
import type { VocabularyItem } from '../../types'
import { shuffle } from '../../utils/activityHelpers'
import { speak } from '../../lib/speech'

type Props = {
  items: VocabularyItem[]
  speechLang: string
  onComplete?: () => void
}

export default function MatchingGame({ items, speechLang, onComplete }: Props) {
  const pairs = useMemo(
    () => items.slice(0, 6).map((item) => ({ id: item.word, word: item.word, translation: item.translation })),
    [items],
  )

  const shuffledWords = useMemo(() => shuffle(pairs.map((p) => p.word)), [pairs])
  const shuffledTranslations = useMemo(() => shuffle(pairs.map((p) => p.translation)), [pairs])

  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [message, setMessage] = useState<string | null>(null)

  const tryMatch = (word: string | null, translation: string | null) => {
    if (!word || !translation) return
    const pair = pairs.find((p) => p.word === word)
    if (pair?.translation === translation) {
      setMatched((prev) => new Set([...prev, word]))
      setMessage(`¡Correcto! "${word}" = "${translation}"`)
      speak(word, speechLang)
      setSelectedWord(null)
      setSelectedTranslation(null)
    } else {
      setMessage('Esa pareja no coincide. Prueba otra combinación.')
      setSelectedWord(null)
      setSelectedTranslation(null)
    }
  }

  const handleWordClick = (word: string) => {
    if (matched.has(word)) return
    setSelectedWord(word)
    if (selectedTranslation) tryMatch(word, selectedTranslation)
  }

  const handleTranslationClick = (translation: string) => {
    const alreadyMatched = pairs.some((p) => p.translation === translation && matched.has(p.word))
    if (alreadyMatched) return
    setSelectedTranslation(translation)
    if (selectedWord) tryMatch(selectedWord, translation)
  }

  const allMatched = matched.size === pairs.length

  useEffect(() => {
    if (allMatched) onComplete?.()
  }, [allMatched, onComplete])

  return (
    <section className="activity-section">
      <h3>Emparejar palabras</h3>
      <p className="activity-hint">
        Selecciona una palabra en el idioma y su traducción correcta en español.
      </p>

      <div className="matching-grid">
        <div className="matching-column">
          <h4>Palabras</h4>
          {shuffledWords.map((word) => (
            <button
              key={word}
              type="button"
              className={`matching-item ${selectedWord === word ? 'selected' : ''} ${matched.has(word) ? 'matched' : ''}`}
              onClick={() => handleWordClick(word)}
              disabled={matched.has(word)}
            >
              {word}
            </button>
          ))}
        </div>
        <div className="matching-column">
          <h4>Traducciones</h4>
          {shuffledTranslations.map((translation) => {
            const isMatched = pairs.some((p) => p.translation === translation && matched.has(p.word))
            return (
              <button
                key={translation}
                type="button"
                className={`matching-item ${selectedTranslation === translation ? 'selected' : ''} ${isMatched ? 'matched' : ''}`}
                onClick={() => handleTranslationClick(translation)}
                disabled={isMatched}
              >
                {translation}
              </button>
            )
          })}
        </div>
      </div>

      {message && <p className="activity-feedback">{message}</p>}
      {allMatched && (
        <p className="activity-feedback success">¡Genial! Emparejaste todas las palabras.</p>
      )}
    </section>
  )
}
