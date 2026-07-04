import { useEffect, useRef, useState } from 'react'

// Barra de escritura para practicar. Si recibe `target`, valida que coincida;
// si no, solo exige un mínimo de caracteres (respuesta abierta).
function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
}

type Props = {
  target?: string
  minLength?: number
  placeholder?: string
  onValidChange?: (valid: boolean) => void
}

export default function WritingPractice({
  target,
  minLength = 3,
  placeholder = 'Escribe aquí para practicar…',
  onValidChange,
}: Props) {
  const [value, setValue] = useState('')
  const valid = target ? norm(value) === norm(target) : norm(value).length >= minLength
  const prev = useRef<boolean | null>(null)

  useEffect(() => {
    if (prev.current !== valid) {
      prev.current = valid
      onValidChange?.(valid)
    }
  }, [valid, onValidChange])

  const touched = value.trim().length > 0
  const stateClass = touched ? (valid ? 'valid' : 'invalid') : ''

  return (
    <div className="writing-practice">
      <input
        className={`writing-input ${stateClass}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Práctica de escritura"
      />
      {touched && target && (
        <span className={valid ? 'writing-ok' : 'writing-bad'}>
          {valid ? '✓' : '✗'}
        </span>
      )}
      {touched && !target && valid && <span className="writing-ok">✓</span>}
    </div>
  )
}
