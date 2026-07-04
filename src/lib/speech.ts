// Utilidades de pronunciación con la Web Speech API del navegador.
// - Síntesis de voz (escuchar) → funciona en la mayoría de navegadores.
// - Reconocimiento de voz (micrófono) → Chrome/Edge (webkit). Requiere internet y permiso de micrófono.

// Idioma de cada curso en formato BCP-47 (por id de idioma).
export const LANG_BCP47: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  pt: 'pt-PT',
  it: 'it-IT',
}

export const speechSupported =
  typeof window !== 'undefined' && 'speechSynthesis' in window

// Reproduce el texto en voz alta con el idioma indicado.
export function speak(text: string, lang: string) {
  if (!speechSupported) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = lang
  utter.rate = 0.9
  const voices = window.speechSynthesis.getVoices()
  const match = voices.find((v) => v.lang.toLowerCase().startsWith(lang.slice(0, 2)))
  if (match) utter.voice = match
  window.speechSynthesis.speak(utter)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function getRecognition(): any | null {
  if (typeof window === 'undefined') return null
  const w = window as any
  const SR = w.SpeechRecognition || w.webkitSpeechRecognition
  return SR ? new SR() : null
}

export const recognitionSupported = getRecognition() !== null

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
}

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  if (!m) return n
  if (!n) return m
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)])
  for (let j = 0; j <= n; j += 1) dp[0][j] = j
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }
  return dp[m][n]
}

// Nombres de las letras en inglés → letra (para el deletreo por voz).
const NAME_TO_LETTER: Record<string, string> = {
  ay: 'a', eh: 'a',
  be: 'b', bee: 'b',
  see: 'c', cee: 'c', sea: 'c',
  de: 'd', dee: 'd',
  ee: 'e',
  ef: 'f', eff: 'f',
  ge: 'g', gee: 'g', jee: 'g',
  aitch: 'h', haitch: 'h', ache: 'h', hache: 'h',
  eye: 'i', ai: 'i',
  jay: 'j', jai: 'j',
  kay: 'k', ka: 'k',
  el: 'l', ell: 'l',
  em: 'm', emm: 'm',
  en: 'n', enn: 'n',
  oh: 'o', ou: 'o',
  pe: 'p', pee: 'p',
  cue: 'q', queue: 'q', kew: 'q', kju: 'q',
  ar: 'r', are: 'r', arr: 'r',
  es: 's', ess: 's',
  te: 't', tee: 't', tea: 't',
  you: 'u', yu: 'u', ewe: 'u',
  ve: 'v', vee: 'v',
  'double u': 'w', doubleu: 'w', doubleyou: 'w', dub: 'w',
  ex: 'x', eks: 'x',
  why: 'y', wai: 'y',
  zed: 'z', zee: 'z', zet: 'z', zeta: 'z',
}

function tokenToLetter(tok: string): string {
  const t = tok.toLowerCase().replace(/[^a-z ]/g, '').trim()
  if (!t) return ''
  if (NAME_TO_LETTER[t]) return NAME_TO_LETTER[t]
  // una sola letra o (posible) palabra ya concatenada: se conservan sus letras
  return t.replace(/\s/g, '')
}

// Verifica que el estudiante haya DELETREADO la palabra (letra por letra).
export function checkSpelling(
  heardList: string[],
  target: string,
): { ok: boolean; heard: string; score: number } {
  const t = normalize(target).replace(/\s/g, '')
  let best = { ok: false, heard: heardList[0] ?? '', score: 0 }
  for (const h of heardList) {
    const candidate = h
      .split(/[\s.,\-_]+/)
      .map(tokenToLetter)
      .join('')
    const c = normalize(candidate).replace(/\s/g, '')
    if (!c) continue
    const dist = levenshtein(c, t)
    const score = 1 - dist / Math.max(t.length, c.length, 1)
    const ok = c === t || (t.length >= 6 && dist <= 1)
    if (ok) return { ok: true, heard: h, score }
    if (score > best.score) best = { ok: false, heard: h, score }
  }
  return best
}

// Compara lo que se escuchó contra la palabra objetivo. Devuelve si coincide.
export function comparePronunciation(
  heardList: string[],
  target: string,
): { ok: boolean; heard: string; score: number } {
  const t = normalize(target)
  let best = { ok: false, heard: heardList[0] ?? '', score: 0 }
  for (const h of heardList) {
    const nh = normalize(h)
    if (!nh) continue
    const dist = levenshtein(nh, t)
    const score = 1 - dist / Math.max(t.length, nh.length, 1)
    const ok = nh === t || nh.includes(t) || t.includes(nh) || score >= 0.7
    if (ok) return { ok: true, heard: h, score }
    if (score > best.score) best = { ok: false, heard: h, score }
  }
  return best
}
