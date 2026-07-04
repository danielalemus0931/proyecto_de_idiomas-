import { Flag, flagCodes } from './flags'

// Fondo decorativo: mosaico con las banderas reales de los países
// cuyos idiomas se enseñan. Sobrio y elegante (ver estilos en App.css).

const TILES = 260
const tiles = Array.from({ length: TILES }, (_, i) => flagCodes[(i * 5) % flagCodes.length])

function FlagMosaic() {
  return (
    <div className="flag-mosaic" aria-hidden="true">
      {tiles.map((code, i) => (
        <span key={i} className="flag-mosaic-tile">
          <Flag code={code} className="flag-svg" />
        </span>
      ))}
    </div>
  )
}

export default FlagMosaic
