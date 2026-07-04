import { useRef, useState } from 'react'
import {
  checkSpelling,
  comparePronunciation,
  getRecognition,
  recognitionSupported,
  speak,
  speechSupported,
} from '../lib/speech'

type Props = {
  text: string
  lang: string
  compact?: boolean
  mode?: 'word' | 'spell'
  onResult?: (ok: boolean) => void
}

type Status = 'idle' | 'listening' | 'ok' | 'fail' | 'error'

export default function Pronunciation({ text, lang, compact = false, mode = 'word', onResult }: Props) {
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
    rec.maxAlternatives = mode === 'spell' ? 6 : 3
    setHeard('')
    setStatus('listening')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (event: any) => {
      const alternatives = Array.from(event.results[0]).map((r: any) => r.transcript as string)
      const result = (mode === 'spell' ? checkSpelling : comparePronunciation)(alternatives, text)
      setHeard(result.heard)
      setStatus(result.ok ? 'ok' : 'fail')
      onResult?.(result.ok)
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

      {status === 'listening' && (
        <span className="pron-msg pron-listening">
          Escuchando… {mode === 'spell' ? 'deletrea letra por letra' : 'habla ahora'}
        </span>
      )}
      {status === 'ok' && mode === 'spell' && (
        <span className="pron-msg pron-ok">✓ ¡Bien deletreado! Se escribe "{text}". 🎉</span>
      )}
      {status === 'ok' && mode === 'word' && (
        <span className="pron-msg pron-ok">✓ ¡Correcto! Dijiste "{text}" muy bien. 🎉</span>
      )}
      {status === 'fail' && mode === 'spell' && (
        <span className="pron-msg pron-fail">
          ✗ Aún no. {heard ? `Escuché "${heard}". ` : ''}Deletrea letra por letra:{' '}
          {text.toUpperCase().split('').join('-')}.
        </span>
      )}
      {status === 'fail' && mode === 'word' && (
        <span className="pron-msg pron-fail">
          ✗ Incorrecto. {heard ? `Escuché "${heard}", ` : ''}la palabra correcta es "{text}".
          Escúchala con 🔊 e intenta de nuevo.
        </span>
      )}
      {status === 'error' && (
        <span className="pron-msg pron-hint">Micrófono no disponible en este navegador (usa Chrome o Edge).</span>
      )}
    </div>
  )
}
