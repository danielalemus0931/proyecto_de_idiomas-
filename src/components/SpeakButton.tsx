import { speak, speechSupported } from '../lib/speech'

// Botón compacto de audio: reproduce la pronunciación del texto.
export default function SpeakButton({
  text,
  lang,
  title = 'Escuchar pronunciación',
}: {
  text: string
  lang: string
  title?: string
}) {
  if (!speechSupported) return null
  return (
    <button
      type="button"
      className="pron-btn pron-btn-sm"
      onClick={(e) => {
        e.stopPropagation()
        speak(text, lang)
      }}
      title={title}
      aria-label={title}
    >
      🔊
    </button>
  )
}
