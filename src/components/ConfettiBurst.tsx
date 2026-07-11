import { useEffect, useState } from 'react'

type Props = {
  active: boolean
  /** Duración en ms antes de ocultar. */
  durationMs?: number
  onDone?: () => void
}

/** Confeti ligero CSS (sin librerías). */
export default function ConfettiBurst({ active, durationMs = 2200, onDone }: Props) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!active) return
    setShow(true)
    const t = window.setTimeout(() => {
      setShow(false)
      onDone?.()
    }, durationMs)
    return () => window.clearTimeout(t)
  }, [active, durationMs, onDone])

  if (!show) return null

  const pieces = Array.from({ length: 28 }, (_, i) => i)

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${(i * 17) % 100}%`,
            animationDelay: `${(i % 8) * 0.05}s`,
            background: ['#ff8fab', '#9b8cff', '#ffe066', '#74c0fc', '#8ce99a'][i % 5],
          }}
        />
      ))}
    </div>
  )
}
