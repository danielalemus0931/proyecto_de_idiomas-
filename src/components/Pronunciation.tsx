import { useRef, useState } from 'react'
import {
  comparePronunciation,
  getRecognition,
  recognitionSupported,
  speak,
  speechSupported,
} from '../lib/speech'

type Props = { text: string; lang: string; compact?: boolean }

type Status = 'idle' | 'listening' | 'ok' | 'fail' | 'error'

export default function Pronunciation({ text, lang, compact = false }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [heard, setHeard] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null)

  const handleListen = () => {
    if (status === 'listening') {
      recRef.current?.stop()
      return
    }
    const rec = getRecognition()
    if (!rec) {
      setStatus('error')
      return
    }
    recRef.current = rec
    rec.lang = lang
    rec.interimResults = false
    rec.maxAlternatives = 3
    setHeard('')
    setStatus('listening')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (event: any) => {
      const alternatives = Array.from(event.results[0]).map((r: any) => r.transcript as string)
      const result = comparePronunciation(alternatives, text)
      setHeard(result.heard)
      setStatus(result.ok ? 'ok' : 'fail')
    }
    rec.onerror = () => setStatus('error')
    rec.onend = () => setStatus((s) => (s === 'listening' ? 'idle' : s))
    rec.start()
  }

  return (
    <div className={`pron ${compact ? 'pron-compact' : ''}`}>
      {speechSupported && (
        <button type="button" className="pron-btn" onClick={() => speak(text, lang)} title="Escuchar pronunciación">
          🔊
        </button>
      )}
      {recognitionSupported && (
        <button
          type="button"
          className={`pron-btn ${status === 'listening' ? 'pron-rec' : ''}`}
          onClick={handleListen}
          title="Practicar con el micrófono"
        >
          🎤
        </button>
      )}

      {status === 'listening' && <span className="pron-msg pron-listening">Escuchando… habla ahora</span>}
      {status === 'ok' && <span className="pron-msg pron-ok">✓ ¡Muy bien! Lo pronunciaste correctamente.</span>}
      {status === 'fail' && (
        <span className="pron-msg pron-fail">
          ✗ Escuché "{heard}". Vuelve a intentarlo.
        </span>
      )}
      {status === 'error' && (
        <span className="pron-msg pron-hint">Micrófono no disponible en este navegador (usa Chrome o Edge).</span>
      )}
    </div>
  )
}
