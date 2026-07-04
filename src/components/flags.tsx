// Banderas oficiales descargadas de flagcdn.com (SVG, guardadas en /public/flags).
// Los emojis de bandera no se renderizan en Windows, por eso usamos imágenes reales.

const nombres: Record<string, string> = {
  gb: 'Reino Unido',
  fr: 'Francia',
  pt: 'Portugal',
  it: 'Italia',
  es: 'España',
  de: 'Alemania',
}

export const flagCodes = Object.keys(nombres)

// Componente principal: <Flag code="fr" />
export function Flag({ code, className }: { code: string; className?: string }) {
  const safe = nombres[code] ? code : 'fr'
  return (
    <img
      src={`/flags/${safe}.svg`}
      alt={`Bandera de ${nombres[safe]}`}
      className={className}
      loading="lazy"
      draggable={false}
    />
  )
}
