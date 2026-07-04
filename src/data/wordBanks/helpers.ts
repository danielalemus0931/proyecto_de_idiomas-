export type WordBankEntry = {
  word: string
  translation: string
}

export type ThemeBank = {
  title: string
  topic: string
  words: WordBankEntry[]
}

export type LevelBank = {
  levelName: string
  difficulty: string
  description: string
  themes: ThemeBank[]
}

function ex(word: string, lang: 'en' | 'fr' | 'pt' | 'it'): string {
  const templates: Record<string, Record<string, string>> = {
    en: { default: `I use "${word}" every day.` },
    fr: { default: `J'utilise « ${word} » chaque jour.` },
    pt: { default: `Eu uso "${word}" todos os dias.` },
    it: { default: `Uso "${word}" ogni giorno.` },
  }
  return templates[lang].default
}

export function mapThemes(themes: ThemeBank[], lang: 'en' | 'fr' | 'pt' | 'it') {
  return themes.map((theme) => ({
    ...theme,
    words: theme.words.map((w) => ({
      word: w.word,
      translation: w.translation,
      example: ex(w.word, lang),
    })),
  }))
}

export { ex }
