import { useEffect, useMemo, useRef, useState } from 'react'
import type { AvatarConfig } from '../types'
import KawaiiAvatar, { type AvatarMotion } from './KawaiiAvatar'
import ConfettiBurst from './ConfettiBurst'
import {
  ACCESSORIES,
  BACKGROUNDS,
  EYES,
  EXAMPLES,
  EXPRESSIONS,
  FUR_COLORS,
  MOUTHS,
  OUTFITS,
  SPECIES,
  fromAvatarConfig,
  saveAvatarName,
  toAvatarConfig,
  type KawaiiConfig,
  type StickerAccessory,
  type StickerBg,
  type StickerEyes,
  type StickerExpression,
  type StickerMouth,
  type StickerOutfit,
  type StickerSpecies,
} from '../lib/kawaiiAvatar'
import { levelFromPoints } from '../lib/gamification'
import {
  ACCESSORY_UNLOCK,
  BG_UNLOCK,
  COMPANIONS,
  EYE_UNLOCK,
  EXPRESSION_UNLOCK,
  MOUTH_UNLOCK,
  OUTFIT_UNLOCK,
  avatarTierFromLevel,
  clampKawaiiForLevel,
  isUnlocked,
  tierLabel,
  type CompanionId,
} from '../lib/avatarProgress'

type Props = {
  config: AvatarConfig
  points?: number
  onChange: (config: AvatarConfig) => void
  onDone?: () => void
}

type Tab = 'species' | 'face' | 'clothes' | 'accessories' | 'background' | 'legend'

const SIDE_TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'species', label: 'Especie', icon: '🐾' },
  { id: 'clothes', label: 'Ropa', icon: '👕' },
  { id: 'accessories', label: 'Accesorios', icon: '🎀' },
  { id: 'background', label: 'Fondo', icon: '✨' },
  { id: 'face', label: 'Cara', icon: '😊' },
  { id: 'legend', label: 'Leyenda', icon: '🌟' },
]

export default function AvatarStudio({ config, points = 0, onChange, onDone }: Props) {
  const [tab, setTab] = useState<Tab>('species')
  const [motion, setMotion] = useState<AvatarMotion>('idle')
  const [confetti, setConfetti] = useState(false)
  const unlockToast = useRef<string | null>(null)
  const kawaiiRaw = useMemo(() => fromAvatarConfig(config), [config])
  const level = levelFromPoints(points)
  const tier = avatarTierFromLevel(level)
  const kawaii = useMemo(() => clampKawaiiForLevel(kawaiiRaw, level), [kawaiiRaw, level])

  useEffect(() => {
    if (motion === 'idle') return
    const ms = motion === 'jump' || motion === 'celebrate' ? 900 : 700
    const t = window.setTimeout(() => setMotion('idle'), ms)
    return () => window.clearTimeout(t)
  }, [motion])

  const celebrateUnlock = (label: string) => {
    unlockToast.current = label
    setMotion('jump')
    setConfetti(true)
  }

  const update = (patch: Partial<KawaiiConfig>, unlockLabel?: string) => {
    const next = clampKawaiiForLevel({ ...kawaii, ...patch }, level)
    if (patch.name !== undefined) saveAvatarName(patch.name)
    onChange(toAvatarConfig(next))
    if (unlockLabel) celebrateUnlock(unlockLabel)
  }

  const trySelect = (
    minLevel: number,
    alreadySelected: boolean,
    apply: () => void,
    label: string,
    celebrate = false,
  ) => {
    if (!isUnlocked(minLevel, level)) return
    apply()
    if (celebrate && !alreadySelected && minLevel > 1) celebrateUnlock(label)
  }

  const handleSave = () => {
    setMotion('wink')
    window.setTimeout(() => onDone?.(), 550)
  }

  return (
    <section className="sticker-studio">
      <ConfettiBurst active={confetti} onDone={() => setConfetti(false)} />
      <div className="sticker-studio-grid">
        <div className="sticker-preview-col">
          <aside className="sticker-side-nav" aria-label="Categorías">
            {SIDE_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`sticker-side-btn ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
                title={t.label}
              >
                <span aria-hidden="true">{t.icon}</span>
                <small>{t.label}</small>
              </button>
            ))}
            <button type="button" className="sticker-save-side" onClick={handleSave}>
              ✓ Guardar
            </button>
          </aside>

          <div className="sticker-preview-wrap">
            <h2 className="sticker-title">Crea tu avatar</h2>
            <div className="sticker-preview-frame">
              <KawaiiAvatar config={kawaii} size={300} motion={motion} showAura={kawaii.aura} />
            </div>
            <label className="sticker-name-field">
              <span className="sr-only">Nombre del avatar</span>
              <input
                value={kawaii.name}
                onChange={(e) => update({ name: e.target.value.slice(0, 16) })}
                maxLength={16}
                aria-label="Nombre"
              />
              <span aria-hidden="true">✏️</span>
            </label>
            <p className="sticker-tip">
              {unlockToast.current && motion === 'jump'
                ? `¡Desbloqueaste ${unlockToast.current}!`
                : '¡Puedes cambiar todo cuando quieras! Diviértete creando tu mejor versión.'}
            </p>
          </div>
        </div>

        <div className="sticker-panel">
          <header className="sticker-panel-head">
            <div>
              <p className="sticker-panel-kicker">⭐ Tu avatar</p>
              <h3>Personaliza por capas</h3>
              <p className="sticker-tier">{tierLabel(tier)}</p>
            </div>
            <div className="sticker-stats">
              <span>Nivel {level}</span>
              <span>{points} pts</span>
            </div>
          </header>

          <div className="sticker-tabs">
            {SIDE_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`sticker-tab ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <span aria-hidden="true">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {(tab === 'species' || tab === 'face') && (
            <>
              <h4 className="sticker-section-title">Elige tu especie</h4>
              <div className="sticker-row">
                {SPECIES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`sticker-chip ${kawaii.species === s.id ? 'selected' : ''}`}
                    onClick={() => update({ species: s.id as StickerSpecies })}
                    title={s.label}
                  >
                    <KawaiiAvatar
                      config={{ ...kawaii, species: s.id, accessory: 'none' }}
                      size={64}
                      headOnly
                    />
                  </button>
                ))}
              </div>

              <h4 className="sticker-section-title">Color</h4>
              <div className="sticker-row">
                {FUR_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`sticker-swatch ${kawaii.fur === c ? 'selected' : ''}`}
                    style={{ background: c }}
                    onClick={() => update({ fur: c })}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </>
          )}

          {tab === 'face' && (
            <>
              <h4 className="sticker-section-title">Ojos</h4>
              <div className="sticker-row">
                {EYES.map((e) => {
                  const locked = !isUnlocked(EYE_UNLOCK[e.id], level)
                  return (
                    <button
                      key={e.id}
                      type="button"
                      className={`sticker-pill ${kawaii.eyes === e.id ? 'selected' : ''} ${locked ? 'locked' : ''}`}
                      disabled={locked}
                      title={locked ? `Nivel ${EYE_UNLOCK[e.id]}` : e.label}
                      onClick={() =>
                        trySelect(EYE_UNLOCK[e.id], kawaii.eyes === e.id, () => update({ eyes: e.id as StickerEyes }), e.label)
                      }
                    >
                      {locked ? `🔒 ${e.label}` : e.label}
                    </button>
                  )
                })}
              </div>
              <h4 className="sticker-section-title">Boca</h4>
              <div className="sticker-row">
                {MOUTHS.map((m) => {
                  const locked = !isUnlocked(MOUTH_UNLOCK[m.id], level)
                  return (
                    <button
                      key={m.id}
                      type="button"
                      className={`sticker-pill ${kawaii.mouth === m.id ? 'selected' : ''} ${locked ? 'locked' : ''}`}
                      disabled={locked}
                      title={locked ? `Nivel ${MOUTH_UNLOCK[m.id]}` : m.label}
                      onClick={() =>
                        trySelect(MOUTH_UNLOCK[m.id], kawaii.mouth === m.id, () => update({ mouth: m.id as StickerMouth }), m.label)
                      }
                    >
                      {locked ? `🔒 ${m.label}` : m.label}
                    </button>
                  )
                })}
              </div>
              <h4 className="sticker-section-title">Expresión</h4>
              <div className="sticker-row">
                {EXPRESSIONS.map((e) => {
                  const locked = !isUnlocked(EXPRESSION_UNLOCK[e.id], level)
                  return (
                    <button
                      key={e.id}
                      type="button"
                      className={`sticker-pill ${kawaii.expression === e.id ? 'selected' : ''} ${locked ? 'locked' : ''}`}
                      disabled={locked}
                      title={locked ? `Nivel ${EXPRESSION_UNLOCK[e.id]}` : e.label}
                      onClick={() =>
                        trySelect(
                          EXPRESSION_UNLOCK[e.id],
                          kawaii.expression === e.id,
                          () => update({ expression: e.id as StickerExpression }),
                          e.label,
                        )
                      }
                    >
                      {locked ? `🔒 ${e.label}` : e.label}
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {(tab === 'clothes' || tab === 'species') && (
            <>
              <h4 className="sticker-section-title">Ropa</h4>
              <div className="sticker-row">
                {OUTFITS.map((o) => {
                  const locked = !isUnlocked(OUTFIT_UNLOCK[o.id], level)
                  return (
                    <button
                      key={o.id}
                      type="button"
                      className={`sticker-chip sticker-chip--outfit ${kawaii.outfit === o.id ? 'selected' : ''} ${locked ? 'locked' : ''}`}
                      disabled={locked}
                      onClick={() =>
                        trySelect(
                          OUTFIT_UNLOCK[o.id],
                          kawaii.outfit === o.id,
                          () => update({ outfit: o.id as StickerOutfit }),
                          o.label,
                          true,
                        )
                      }
                      title={locked ? `Desbloquea en nivel ${OUTFIT_UNLOCK[o.id]}` : o.label}
                    >
                      <span className="sticker-outfit-swatch" style={{ background: o.color }} />
                      {locked && <span className="sticker-lock">🔒</span>}
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {(tab === 'accessories' || tab === 'species') && (
            <>
              <h4 className="sticker-section-title">Accesorios</h4>
              <div className="sticker-row">
                {ACCESSORIES.map((a) => {
                  const locked = !isUnlocked(ACCESSORY_UNLOCK[a.id], level)
                  return (
                    <button
                      key={a.id}
                      type="button"
                      className={`sticker-pill ${kawaii.accessory === a.id ? 'selected' : ''} ${locked ? 'locked' : ''}`}
                      disabled={locked}
                      title={locked ? `Nivel ${ACCESSORY_UNLOCK[a.id]}` : a.label}
                      onClick={() =>
                        trySelect(
                          ACCESSORY_UNLOCK[a.id],
                          kawaii.accessory === a.id,
                          () => update({ accessory: a.id as StickerAccessory }),
                          a.label,
                          true,
                        )
                      }
                    >
                      {locked ? `🔒 ${a.label}` : a.label}
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {(tab === 'background' || tab === 'species') && (
            <>
              <h4 className="sticker-section-title">Fondo</h4>
              <div className="sticker-row">
                {BACKGROUNDS.map((b) => {
                  const locked = !isUnlocked(BG_UNLOCK[b.id], level)
                  return (
                    <button
                      key={b.id}
                      type="button"
                      className={`sticker-bg ${kawaii.background === b.id ? 'selected' : ''} ${locked ? 'locked' : ''}`}
                      style={{ background: b.css }}
                      disabled={locked}
                      onClick={() =>
                        trySelect(
                          BG_UNLOCK[b.id],
                          kawaii.background === b.id,
                          () => update({ background: b.id as StickerBg }),
                          b.label,
                          true,
                        )
                      }
                      title={locked ? `Nivel ${BG_UNLOCK[b.id]}` : b.label}
                      aria-label={b.label}
                    >
                      {locked && <span className="sticker-lock">🔒</span>}
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {tab === 'legend' && (
            <>
              <h4 className="sticker-section-title">Mascota (nivel 21+)</h4>
              <div className="sticker-row">
                {COMPANIONS.map((c) => {
                  const locked = !isUnlocked(c.minLevel, level)
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`sticker-pill ${kawaii.companion === c.id ? 'selected' : ''} ${locked ? 'locked' : ''}`}
                      disabled={locked}
                      title={locked ? `Nivel ${c.minLevel}` : c.label}
                      onClick={() =>
                        trySelect(
                          c.minLevel,
                          kawaii.companion === c.id,
                          () => update({ companion: c.id as CompanionId }),
                          c.label,
                          true,
                        )
                      }
                    >
                      {locked ? `🔒 ${c.label}` : `${c.emoji ? c.emoji + ' ' : ''}${c.label}`}
                    </button>
                  )
                })}
              </div>
              <h4 className="sticker-section-title">Aura brillante (nivel 21+)</h4>
              <div className="sticker-row">
                <button
                  type="button"
                  className={`sticker-pill ${!kawaii.aura ? 'selected' : ''} ${level < 21 ? 'locked' : ''}`}
                  disabled={level < 21}
                  onClick={() => update({ aura: false })}
                >
                  Sin aura
                </button>
                <button
                  type="button"
                  className={`sticker-pill ${kawaii.aura ? 'selected' : ''} ${level < 21 ? 'locked' : ''}`}
                  disabled={level < 21}
                  title={level < 21 ? 'Nivel 21' : 'Aura'}
                  onClick={() =>
                    trySelect(21, kawaii.aura, () => update({ aura: true }), 'Aura brillante', true)
                  }
                >
                  {level < 21 ? '🔒 Aura' : '✨ Aura'}
                </button>
              </div>
              {level < 21 && (
                <p className="sticker-tip">Sigue aprendiendo para desbloquear mascotas y efectos únicos.</p>
              )}
            </>
          )}

          <h4 className="sticker-section-title">Ejemplos</h4>
          <div className="sticker-examples">
            {EXAMPLES.map((ex) => {
              const clamped = clampKawaiiForLevel(ex, level)
              return (
                <button
                  key={ex.name}
                  type="button"
                  className="sticker-example"
                  onClick={() => onChange(toAvatarConfig(clamped))}
                  title={ex.name}
                >
                  <KawaiiAvatar config={clamped} size={88} />
                  <span>{ex.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
