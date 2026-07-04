import type { LanguageLevel, Lesson, QuizOption, VocabularyItem } from '../types'
import type { LevelBank } from './wordBanks/helpers'

export const LESSONS_PER_LEVEL = 6
export const LEVEL_ORDER = ['Principiante', 'Elemental', 'Intermedio', 'Avanzado', 'Experto'] as const

export const LEVEL_META: Record<
  (typeof LEVEL_ORDER)[number],
  { difficulty: string; description: string }
> = {
  Principiante: {
    difficulty: 'A1',
    description: 'Saludos, números y vocabulario esencial del día a día.',
  },
  Elemental: {
    difficulty: 'A2',
    description: 'Compras, casa, comida y rutinas cotidianas.',
  },
  Intermedio: {
    difficulty: 'B1',
    description: 'Viajes, trabajo, salud y conversaciones más largas.',
  },
  Avanzado: {
    difficulty: 'B2',
    description: 'Opiniones, medios, tecnología y situaciones formales.',
  },
  Experto: {
    difficulty: 'C1',
    description: 'Negocios, cultura, debate y expresiones avanzadas.',
  },
}

type Pair = [string, string]

function toWords(pairs: Pair[]): { word: string; translation: string }[] {
  return pairs.map(([word, translation]) => ({ word, translation }))
}

function theme(title: string, topic: string, pairs: Pair[]) {
  return { title, topic, words: toWords(pairs) }
}

/** Genera 5 niveles × 6 lecciones con vocabulario extenso por idioma. */
export function buildLevelBanks(
  _lang: 'en' | 'fr' | 'pt' | 'it',
  packs: Pair[][][],
): LevelBank[] {
  const levelTitles = [
    ['Saludos básicos', 'Presentaciones', 'Números y tiempo', 'Familia', 'Colores', 'Preguntas útiles'],
    ['En la tienda', 'Comida y bebida', 'En casa', 'Ropa y cuerpo', 'Transporte', 'Clima'],
    ['Viajes', 'En el hotel', 'Salud', 'Trabajo', 'Hobbies', 'Sentimientos'],
    ['Medios y tecnología', 'Medio ambiente', 'Opiniones', 'Eventos', 'Educación', 'Comunicación'],
    ['Negocios', 'Cultura', 'Política y sociedad', 'Ciencia', 'Arte y literatura', 'Debate avanzado'],
  ]
  const topics = [
    ['Conversación', 'Conversación', 'Gramática', 'Familia', 'Descripción', 'Conversación'],
    ['Compras', 'Comida', 'Hogar', 'Descripción', 'Movilidad', 'Naturaleza'],
    ['Viajes', 'Viajes', 'Salud', 'Trabajo', 'Ocio', 'Emociones'],
    ['Tecnología', 'Medio ambiente', 'Opinión', 'Eventos', 'Estudios', 'Comunicación'],
    ['Negocios', 'Cultura', 'Sociedad', 'Ciencia', 'Arte', 'Debate'],
  ]

  return LEVEL_ORDER.map((levelName, levelIndex) => ({
    levelName,
    difficulty: LEVEL_META[levelName].difficulty,
    description: LEVEL_META[levelName].description,
    themes: packs[levelIndex].map((pairs, lessonIndex) =>
      theme(
        levelTitles[levelIndex][lessonIndex],
        topics[levelIndex][lessonIndex],
        pairs,
      ),
    ),
  }))
}

export function buildLanguageContent(languageId: string, banks: LevelBank[]) {
  const levels: LanguageLevel[] = []
  const lessonList: Lesson[] = []
  const vocabulary: Record<string, VocabularyItem[]> = {}
  const quizQuestions: Record<string, QuizOption[]> = {}
  const quizPrompts: Record<string, string> = {}

  banks.forEach((bank, levelIndex) => {
    const levelId = `${languageId}-lv${levelIndex + 1}`
    levels.push({
      id: levelId,
      languageId,
      order: levelIndex + 1,
      name: bank.levelName,
      difficulty: bank.difficulty,
      description: bank.description,
    })

    bank.themes.forEach((t, lessonIndex) => {
      const lessonId = `${languageId}-lv${levelIndex + 1}-le${lessonIndex + 1}`
      const items = t.words.map((w) => ({
        word: w.word,
        translation: w.translation,
        example:
          langExample(languageId, w.word) ??
          `${w.word} — ${w.translation}`,
      }))

      lessonList.push({
        id: lessonId,
        levelId,
        order: lessonIndex + 1,
        title: t.title,
        topic: t.topic,
        duration: `${5 + levelIndex} min`,
        words: items.length,
      })

      vocabulary[lessonId] = items

      const first = items[0]
      if (first) {
        quizPrompts[lessonId] = `¿Qué significa "${first.word}"?`
        quizQuestions[lessonId] = buildQuiz(first, items)
      }
    })
  })

  return { levels, lessons: lessonList, vocabulary, quizQuestions, quizPrompts }
}

function langExample(languageId: string, word: string): string | null {
  const templates: Record<string, string> = {
    en: `Example: "${word}" is useful in daily conversation.`,
    fr: `Exemple : « ${word} » est utile au quotidien.`,
    pt: `Exemplo: "${word}" é útil no dia a dia.`,
    it: `Esempio: "${word}" è utile ogni giorno.`,
  }
  return templates[languageId] ?? null
}

function buildQuiz(correct: VocabularyItem, pool: VocabularyItem[]): QuizOption[] {
  const distractors = pool
    .filter((w) => w.translation !== correct.translation)
    .slice(0, 3)
    .map((w, i) => ({ id: String.fromCharCode(98 + i), text: w.translation, correct: false }))

  while (distractors.length < 3) {
    distractors.push({
      id: String.fromCharCode(98 + distractors.length),
      text: ['Otra opción', 'Alternativa', 'Distinto'][distractors.length],
      correct: false,
    })
  }

  return [{ id: 'a', text: correct.translation, correct: true }, ...distractors.slice(0, 3)]
}

export function countVocabulary(vocabulary: Record<string, VocabularyItem[]>): number {
  return Object.values(vocabulary).reduce((sum, list) => sum + list.length, 0)
}
