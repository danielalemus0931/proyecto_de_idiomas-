import { useState } from 'react'
import type { AvatarConfig, Gender } from '../types'
import { AVATAR_CATEGORIES } from '../lib/avatar'
import BodyAvatar from './BodyAvatar'
import {
  BADGES,
  earnedBadges,
  levelFromPoints,
  levelProgress,
  MAX_LEVEL,
  nextLevelThreshold,
} from '../lib/gamification'

type Props = {
  config: AvatarConfig
  points: number
  gender: Gender
  onChange: (config: AvatarConfig) => void
}

export default function AvatarStudio({ config, points, gender, onChange }: Props) {
  const [activeCat, setActiveCat] = useState(AVATAR_CATEGORIES[0].key)

  const level = levelFromPoints(points)
  const progress = levelProgress(points)
  const next = nextLevelThreshold(points)
  const badges = earnedBadges(points)
  const earnedIds = new Set(badges.map((b) => b.id))

  const category = AVATAR_CATEGORIES.find((c) => c.key === activeCat)!
  // Opciones válidas para el género del estudiante.
  const options = category.options.filter((o) => !o.gender || o.gender === gender)

  const setValue = (value: string) => onChange({ ...config, [category.key]: value })

  return (
    <section className="avatar-studio">
      <header className="dashboard-header">
        <h2>Mi avatar</h2>
        <p>Gana puntos, sube de nivel y desbloquea nuevos estilos y accesorios para tu personaje.</p>
      </header>

      <div className="studio-grid">
        {/* Columna izquierda: avatar + progreso + insignias */}
        <aside className="studio-side">
          <div className="avatar-preview-big">
            <BodyAvatar config={config} size={220} />
          </div>

          <div className="level-box">
            <div className="level-row">
              <span className="level-badge">Nivel {level}</span>
              <span className="points-label">{points} pts</span>
            </div>
            <div className="progress-bar level-progress">
              <div className="progress-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
            <p className="level-hint">
              {level >= MAX_LEVEL || next === null
                ? '¡Nivel máximo alcanzado! 🎉'
                : `Faltan ${next - points} pts para el nivel ${level + 1}`}
            </p>
          </div>

          <div className="badges-box">
            <h3 className="studio-subtitle">
              Insignias ({badges.length}/{BADGES.length})
            </h3>
            <div className="badges-grid">
              {BADGES.map((b) => {
                const got = earnedIds.has(b.id)
                return (
                  <div
                    key={b.id}
                    className={`badge-chip ${got ? 'earned' : 'locked'}`}
                    title={`${b.name} — ${b.desc}`}
                  >
                    <span className="badge-icon">{got ? b.icon : '🔒'}</span>
                    <span className="badge-name">{b.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Columna derecha: personalización */}
        <div className="studio-main">
          <div className="cat-tabs">
            {AVATAR_CATEGORIES.map((c) => (
              <button
                key={c.key}
                className={`cat-tab ${activeCat === c.key ? 'active' : ''}`}
                onClick={() => setActiveCat(c.key)}
              >
                <span aria-hidden="true">{c.icon}</span> {c.label}
              </button>
            ))}
          </div>

          <div className="options-grid">
            {category.allowNone && (
              <button
                className={`option-tile ${config[category.key] === '' ? 'selected' : ''}`}
                onClick={() => setValue('')}
              >
                <span className="option-none">🚫</span>
                <span className="option-label">Ninguno</span>
              </button>
            )}

            {options.map((opt) => {
              const locked = level < opt.level
              const selected = config[category.key] === opt.value

              if (category.kind === 'color') {
                return (
                  <button
                    key={opt.value}
                    className={`option-tile color-tile ${selected ? 'selected' : ''}`}
                    onClick={() => setValue(opt.value)}
                  >
                    <span className="color-swatch" style={{ background: opt.color }} />
                  </button>
                )
              }

              return (
                <button
                  key={opt.value}
                  className={`option-tile ${selected ? 'selected' : ''} ${locked ? 'locked' : ''}`}
                  disabled={locked}
                  onClick={() => setValue(opt.value)}
                  title={locked ? `Se desbloquea en el nivel ${opt.level}` : opt.label}
                >
                  <span className="option-avatar-wrap">
                    <BodyAvatar
                      config={{ ...config, [category.key]: opt.value }}
                      size={58}
                      showBackground={false}
                    />
                  </span>
                  <span className="option-label">{opt.label}</span>
                  {locked && <span className="option-lock">🔒 Nv {opt.level}</span>}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
