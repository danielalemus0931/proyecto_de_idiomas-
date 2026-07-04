import type { GrammarBlock } from '../../types'

type Props = {
  blocks: GrammarBlock[]
  completed?: boolean
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

export default function GrammarSection({ blocks, completed = false, onConfirmRead }: Props) {
  if (blocks.length === 0) {
    return <p className="activity-hint">No hay gramática para esta lección.</p>
  }

  return (
    <div className="grammar-section">
      <h3 className="section-title">Gramática y estructuras</h3>
      <p className="grammar-intro">
        Lee cada punto con calma: explicación, reglas clave, patrones, ejemplos y práctica. Debes
        confirmar esta sección para avanzar.
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

      {completed ? (
        <p className="activity-feedback success">✓ Gramática confirmada</p>
      ) : (
        <button type="button" className="activity-button activity-confirm-btn" onClick={onConfirmRead}>
          Confirmar que leí la gramática
        </button>
      )}
    </div>
  )
}
