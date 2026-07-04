import { useMemo, useState } from 'react'
import type { GrammarBlock } from '../../types'

type Props = {
  blocks: GrammarBlock[]
  completed?: boolean
  requireCheck?: boolean
  onConfirmRead?: () => void
}

const KIND_LABELS: Record<GrammarBlock['kind'], string> = {
  structure: 'Estructura',
  verb: 'Verbo',
  conditional: 'Condicional',
}

const KIND_ICONS: Record<GrammarBlock['kind'], string> = {
  structure: '🧱',
  verb: '⚡',
  conditional: '🔀',
}

export default function GrammarSection({
  blocks,
  completed = false,
  requireCheck = false,
  onConfirmRead,
}: Props) {
  const checkQuestion = useMemo(() => {
    if (!requireCheck || blocks.length === 0) return null
    const block = blocks[0]
    const example = block.examples[0]
    if (!example) return null
    const phrase = example.phrase
    const words = phrase.split(/\s+/)
    const target = words.find((w) => w.length > 3) ?? words[words.length - 1]
    const blanked = phrase.replace(target, '____')
    return {
      prompt: `Según la lección, completa: "${blanked}"`,
      answer: target.replace(/[.,!?;:'"]/g, ''),
      explanation: `Respuesta: ${example.phrase} (${example.translation})`,
    }
  }, [blocks, requireCheck])

  const [checkAnswer, setCheckAnswer] = useState('')
  const [checkVerified, setCheckVerified] = useState(false)

  const normalize = (text: string) =>
    text
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,!?;:'"]/g, '')

  const checkCorrect =
    checkQuestion &&
    normalize(checkAnswer) === normalize(checkQuestion.answer)

  const canConfirm =
    !requireCheck || !checkQuestion || (checkVerified && checkCorrect)

  if (blocks.length === 0) {
    return <p className="activity-hint">No hay gramática para esta lección.</p>
  }

  return (
    <div className="grammar-section">
      <h3 className="section-title">Gramática y estructuras</h3>
      <p className="grammar-intro">
        Lee cada punto con calma: explicación, reglas clave, patrones, ejemplos y práctica.
        {requireCheck
          ? ' Al final responde la pregunta de comprensión para confirmar.'
          : ' Debes confirmar esta sección para avanzar.'}
      </p>
      <div className="grammar-list">
        {blocks.map((block) => (
          <article key={block.id} className={`grammar-card grammar-card--${block.kind}`}>
            <header className="grammar-card-header">
              <span className="grammar-kind-icon" aria-hidden="true">
                {KIND_ICONS[block.kind]}
              </span>
              <div>
                <span className="grammar-kind-label">{KIND_LABELS[block.kind]}</span>
                <h4>{block.title}</h4>
              </div>
            </header>
            <p className="grammar-explanation">{block.explanation}</p>
            <p className="grammar-detail">{block.detail}</p>
            <div className="grammar-points">
              <span className="grammar-pattern-label">Puntos clave</span>
              <ul>
                {block.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="grammar-pattern">
              <span className="grammar-pattern-label">Patrón</span>
              <code>{block.pattern}</code>
            </div>
            <ul className="grammar-examples">
              {block.examples.map((ex) => (
                <li key={ex.phrase}>
                  <strong>{ex.phrase}</strong>
                  <span>{ex.translation}</span>
                </li>
              ))}
            </ul>
            <p className="grammar-practice">
              <span>Practica:</span> {block.practice}
            </p>
          </article>
        ))}
      </div>

      {checkQuestion && !completed && (
        <div className="grammar-check-box">
          <h4>Comprueba tu comprensión</h4>
          <p>{checkQuestion.prompt}</p>
          <input
            className="grammar-check-input"
            value={checkAnswer}
            onChange={(e) => {
              setCheckAnswer(e.target.value)
              setCheckVerified(false)
            }}
            placeholder="Escribe la palabra que falta…"
          />
          <button
            type="button"
            className="activity-button secondary"
            onClick={() => setCheckVerified(true)}
            disabled={!checkAnswer.trim()}
          >
            Verificar respuesta
          </button>
          {checkVerified && (
            <p className={`activity-feedback ${checkCorrect ? 'success' : 'error'}`}>
              {checkCorrect ? '✓ Correcto' : '✗ Revisa el ejemplo'} — {checkQuestion.explanation}
            </p>
          )}
        </div>
      )}

      {completed ? (
        <p className="activity-feedback success">✓ Gramática confirmada</p>
      ) : (
        <button
          type="button"
          className="activity-button activity-confirm-btn"
          onClick={onConfirmRead}
          disabled={!canConfirm}
        >
          Confirmar que leí la gramática
        </button>
      )}
    </div>
  )
}
