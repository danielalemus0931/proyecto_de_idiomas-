import { useEffect, useMemo, useState } from 'react'
import type { VocabularyItem } from '../../types'
import { getActivityWords } from '../../utils/activityHelpers'
import { generateWordSearch } from '../../utils/wordSearchGenerator'

type Props = {
  items: VocabularyItem[]
  onComplete?: () => void
}

type Cell = { row: number; col: number }

export default function WordSearch({ items, onComplete }: Props) {
  const words = useMemo(() => getActivityWords(items, 6), [items])
  const puzzle = useMemo(() => generateWordSearch(words), [words])
  const [found, setFound] = useState<Set<string>>(new Set())
  const [selecting, setSelecting] = useState(false)
  const [selected, setSelected] = useState<Cell[]>([])
  const [message, setMessage] = useState<string | null>(null)

  const selectedKeys = new Set(selected.map((c) => `${c.row},${c.col}`))

  const isAdjacent = (a: Cell, b: Cell) =>
    Math.abs(a.row - b.row) <= 1 && Math.abs(a.col - b.col) <= 1

  const startSelection = (row: number, col: number) => {
    setSelecting(true)
    setSelected([{ row, col }])
    setMessage(null)
  }

  const extendSelection = (row: number, col: number) => {
    if (!selecting) return
    const cell = { row, col }
    const last = selected[selected.length - 1]
    if (!last || !isAdjacent(last, cell)) return
    if (selected.some((c) => c.row === row && c.col === col)) return
    setSelected((prev) => [...prev, cell])
  }

  const finishSelection = () => {
    if (!selecting || selected.length < 2) {
      setSelecting(false)
      setSelected([])
      return
    }

    const chosen = selected.map((c) => puzzle.grid[c.row][c.col]).join('')
    const reversed = chosen.split('').reverse().join('')
    const match = puzzle.words.find(
      (w) =>
        !found.has(w.normalized) &&
        (w.normalized === chosen || w.normalized === reversed),
    )

    if (match) {
      setFound((prev) => new Set([...prev, match.normalized]))
      setMessage(`¡Encontraste "${match.display}"!`)
    } else {
      setMessage('Esa palabra no está en la lista. ¡Sigue buscando!')
    }

    setSelecting(false)
    setSelected([])
  }

  const allFound = puzzle.words.every((w) => found.has(w.normalized))

  useEffect(() => {
    if (allFound) onComplete?.()
  }, [allFound, onComplete])

  return (
    <section className="activity-section">
      <h3>Sopa de letras</h3>
      <p className="activity-hint">
        Haz clic y arrastra sobre las letras para marcar cada palabra. Busca en horizontal,
        vertical o diagonal.
      </p>

      <div className="word-search-layout">
        <div
          className="word-search-grid"
          onMouseLeave={finishSelection}
          onMouseUp={finishSelection}
        >
          {puzzle.grid.map((row, r) =>
            row.map((letter, c) => {
              const key = `${r},${c}`
              const isSelected = selectedKeys.has(key)
              return (
                <button
                  key={key}
                  type="button"
                  className={`ws-cell ${isSelected ? 'selected' : ''}`}
                  onMouseDown={() => startSelection(r, c)}
                  onMouseEnter={() => extendSelection(r, c)}
                >
                  {letter}
                </button>
              )
            }),
          )}
        </div>

        <ul className="word-search-list">
          {puzzle.words.map((word) => (
            <li key={word.normalized} className={found.has(word.normalized) ? 'found' : ''}>
              {found.has(word.normalized) ? '✓ ' : '○ '}
              {word.display}
            </li>
          ))}
        </ul>
      </div>

      {message && <p className="activity-feedback">{message}</p>}
      {allFound && (
        <p className="activity-feedback success">¡Excelente! Encontraste todas las palabras.</p>
      )}
    </section>
  )
}
