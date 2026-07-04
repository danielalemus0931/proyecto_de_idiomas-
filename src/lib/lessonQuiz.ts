import { questionCountForGrade } from './courses'
import type { GrammarBlock, Lesson, StudentGrade, VocabularyItem, WrittenQuizQuestion } from '../types'

function normalize(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?;:'"]/g, '')
    .replace(/\s+/g, ' ')
}

export function answersMatch(userAnswer: string, acceptable: string[]): boolean {
  const normalized = normalize(userAnswer)
  if (!normalized) return false
  return acceptable.some((a) => {
    const target = normalize(a)
    return normalized === target || normalized.includes(target) || target.includes(normalized)
  })
}

function levelOrder(lesson: Lesson): number {
  const match = lesson.levelId.match(/-lv(\d+)$/)
  return match ? Number.parseInt(match[1], 10) : 1
}

function pickWords(words: VocabularyItem[], count: number): VocabularyItem[] {
  return words.slice(0, Math.max(count, Math.min(words.length, count)))
}

export function buildWrittenQuiz(
  languageId: string,
  lesson: Lesson,
  words: VocabularyItem[],
  grammar: GrammarBlock[],
  grade: StudentGrade,
): WrittenQuizQuestion[] {
  const lv = levelOrder(lesson)
  const pool = pickWords(words, 6)
  const w0 = pool[0]
  const w1 = pool[1] ?? pool[0]
  const w2 = pool[2] ?? pool[0]
  const g0 = grammar[0]
  const gCond = grammar.find((g) => g.kind === 'conditional') ?? grammar[grammar.length - 1]
  const count = questionCountForGrade(grade)
  const questions: WrittenQuizQuestion[] = []

  if (w0) {
    questions.push({
      id: 'q-translate',
      kind: 'translate',
      prompt: `Escribe en español el significado de "${w0.word}".`,
      hint: `Aparece en la lección "${lesson.title}".`,
      acceptableAnswers: [w0.translation, w0.translation.split('/')[0]?.trim() ?? w0.translation],
      explanation: `"${w0.word}" significa ${w0.translation}.`,
    })
  }

  if (grade >= 8 && w1) {
    questions.push({
      id: 'q-complete',
      kind: 'complete',
      prompt: `Completa la oración (en ${langLabel(languageId)}): "${w1.example.replace(w1.word, '____')}"`,
      hint: `La palabra empieza con "${w1.word.charAt(0)}".`,
      acceptableAnswers: [w1.word, w1.word.toLowerCase()],
      explanation: `La respuesta es "${w1.word}".`,
    })
  }

  if (grade >= 9 && g0) {
    questions.push({
      id: 'q-structure',
      kind: 'structure',
      prompt: `Escribe en ${langLabel(languageId)} una oración usando: ${g0.pattern}`,
      hint: g0.explanation,
      acceptableAnswers: buildStructureAcceptables(languageId, g0, w0?.word),
      explanation: `Ejemplo: ${g0.examples[0]?.phrase ?? g0.pattern}`,
    })
  }

  if (grade >= 9 && w2) {
    questions.push({
      id: 'q-conjugate',
      kind: 'conjugate',
      prompt: conjugatePrompt(languageId, lv, w2.word),
      hint: 'Usa el tiempo verbal del nivel de tu curso.',
      acceptableAnswers: conjugateAcceptables(languageId, lv, w2.word),
      explanation: conjugateExplanation(languageId, lv, w2.word),
    })
  }

  if (grade >= 10 && gCond) {
    questions.push({
      id: 'q-conditional',
      kind: 'conditional',
      prompt: `Escribe en ${langLabel(languageId)} un condicional usando: ${gCond.pattern}`,
      hint: gCond.examples[0]?.translation ?? gCond.explanation,
      acceptableAnswers: conditionalAcceptables(languageId, lv, gCond),
      explanation: `Modelo: ${gCond.examples[0]?.phrase ?? gCond.pattern}`,
    })
  }

  if (grade >= 11 && w0 && w1) {
    questions.push({
      id: 'q-advanced',
      kind: 'structure',
      prompt: `Combina "${w0.word}" y "${w1.word}" en una oración completa en ${langLabel(languageId)}.`,
      hint: 'Incluye sujeto + verbo + complemento.',
      acceptableAnswers: advancedAcceptables(languageId, w0.word, w1.word),
      explanation: 'Debe ser una oración gramatical con ambas palabras.',
    })
  }

  return questions.slice(0, count)
}

function langLabel(languageId: string): string {
  return (
    { en: 'inglés', fr: 'francés', pt: 'portugués', it: 'italiano' }[languageId] ?? 'el idioma'
  )
}

function buildStructureAcceptables(
  _languageId: string,
  block: GrammarBlock,
  word?: string,
): string[] {
  const answers = block.examples.map((e) => e.phrase)
  if (word) {
    answers.push(`${block.pattern.split('·')[0]?.trim()} ${word}`.trim())
  }
  return answers.length ? answers : [block.pattern]
}

function conjugatePrompt(languageId: string, level: number, word: string): string {
  const tense =
    level <= 2 ? 'presente' : level === 3 ? 'pasado' : level === 4 ? 'futuro' : 'condicional'
  return `Conjuga o usa "${word}" en ${tense} (1ª persona, ${langLabel(languageId)}).`
}

function conjugateAcceptables(languageId: string, level: number, word: string): string[] {
  const w = word.toLowerCase()
  const maps: Record<string, Record<number, string[]>> = {
    en: {
      1: [`I ${w}`, `I am ${w}`, `I ${w}s`],
      2: [`I am ${w}ing`, `I ${w}`, `There is ${w}`],
      3: [`I ${w}ed`, `I ${w}`, `I studied`],
      4: [`I will ${w}`, `I ${w}`],
      5: [`I would ${w}`, `If I ${w}`],
    },
    fr: {
      1: [`Je suis ${w}`, `Je ${w}`],
      2: [`Je ${w}`, `J'${w}`],
      3: [`J'ai ${w}`, `Je ${w}`],
      4: [`Je ${w}rai`, `Je ${w}`],
      5: [`Je ${w}rais`, `Si je ${w}`],
    },
    pt: {
      1: [`Eu sou ${w}`, `Eu ${w}`],
      2: [`Eu ${w}`, `Há ${w}`],
      3: [`Eu ${w}`, `Eu comprei`],
      4: [`Eu ${w}rei`, `Eu ${w}`],
      5: [`Se eu ${w}`, `Eu ${w}ria`],
    },
    it: {
      1: [`Io sono ${w}`, `Io ${w}`],
      2: [`Io ${w}`, `C'è ${w}`],
      3: [`Ho ${w}`, `Io ${w}`],
      4: [`Io ${w}rò`, `Io ${w}`],
      5: [`Se io ${w}`, `Io ${w}rei`],
    },
  }
  return maps[languageId]?.[Math.min(level, 5)] ?? [`I ${w}`, word]
}

function conjugateExplanation(languageId: string, level: number, word: string): string {
  return `Forma esperada según nivel ${level} en ${langLabel(languageId)} con "${word}".`
}

function conditionalAcceptables(
  languageId: string,
  _level: number,
  block: GrammarBlock,
): string[] {
  const fromExamples = block.examples.map((e) => e.phrase)
  const extras: Record<string, string[]> = {
    en: ['If I study, I will pass', 'If it rains, we will stay home', 'If I were rich, I would travel'],
    fr: ['Si tu travailles, tu réussiras', 'Si j\'étais riche, je voyagerais'],
    pt: ['Se eu estudar, passarei', 'Se eu fosse rico, viajaria'],
    it: ['Se studio, passerò', 'Se fossi ricco, viaggerei'],
  }
  return [...fromExamples, ...(extras[languageId] ?? extras.en)]
}

function advancedAcceptables(_languageId: string, w0: string, w1: string): string[] {
  return [
    `${w0} ${w1}`,
    `I ${w0} and ${w1}`,
    `Je ${w0} et ${w1}`,
    `Eu ${w0} e ${w1}`,
    `Io ${w0} e ${w1}`,
    `${w0}, ${w1}`,
  ]
}

export function scoreWrittenQuiz(
  questions: WrittenQuizQuestion[],
  answers: Record<string, string>,
): { correct: number; total: number; results: Record<string, boolean> } {
  const results: Record<string, boolean> = {}
  let correct = 0
  questions.forEach((q) => {
    const ok = answersMatch(answers[q.id] ?? '', q.acceptableAnswers)
    results[q.id] = ok
    if (ok) correct += 1
  })
  return { correct, total: questions.length, results }
}
