import { questionCountForGrade } from './courses'
import {
  buildApplicationPair,
  buildQuizPairs,
  detectGrammarMode,
  type QuizPair,
} from './quizSentenceBank'
import type { GrammarBlock, Lesson, StudentGrade, VocabularyItem, WrittenQuizQuestion } from '../types'

function normalize(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?;:'"«»]/g, '')
    .replace(/\s+/g, ' ')
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(' ')
    .filter((t) => t.length > 1)
}

function tokenOverlap(a: string, b: string): number {
  const ta = new Set(tokenize(a))
  const tb = tokenize(b)
  if (tb.length === 0) return 0
  return tb.filter((t) => ta.has(t)).length / tb.length
}

type MatchOptions = {
  requiredTerms?: string[]
  minWords?: number
}

export function answersMatch(
  userAnswer: string,
  acceptable: string[],
  options: MatchOptions = {},
): boolean {
  const normalized = normalize(userAnswer)
  if (!normalized || normalized.length < 2) return false

  const wordCount = normalized.split(' ').filter(Boolean).length
  if (options.minWords && wordCount < options.minWords) return false

  if (options.requiredTerms?.length) {
    const hasAll = options.requiredTerms.every((term) => normalized.includes(normalize(term)))
    if (!hasAll) return false
  }

  return acceptable.some((a) => {
    const target = normalize(a)
    if (!target) return false
    if (normalized === target) return true
    if (target.length >= 14 && tokenOverlap(normalized, target) >= 0.68) return true
    if (target.length >= 10 && normalized.includes(target)) return true
    return false
  })
}

function levelOrder(lesson: Lesson): number {
  const match = lesson.levelId.match(/-lv(\d+)$/)
  return match ? Number.parseInt(match[1], 10) : 1
}

function hashString(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items]
  let state = seed
  for (let i = arr.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0
    const j = state % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function langLabel(languageId: string): string {
  return (
    { en: 'inglés', fr: 'francés', pt: 'portugués', it: 'italiano' }[languageId] ?? 'el idioma'
  )
}

function isValidExample(ex: { phrase: string; translation: string }): boolean {
  if (!ex.phrase || ex.phrase === '…' || ex.phrase.length < 3) return false
  const t = ex.translation.trim()
  return !(!t || t.startsWith('Combina') || t.startsWith('Usa conectores') || t.startsWith('Añade'))
}

function kindFromBlock(kind: GrammarBlock['kind']): WrittenQuizQuestion['kind'] {
  if (kind === 'conditional') return 'conditional'
  if (kind === 'verb') return 'conjugate'
  if (kind === 'structure') return 'structure'
  return 'complete'
}

function acceptVariants(phrase: string): string[] {
  const trimmed = phrase.trim()
  return [...new Set([trimmed, trimmed.replace(/\.$/, ''), `${trimmed.replace(/\.$/, '')}.`])]
}

function blockTag(block: GrammarBlock): string {
  return block.title
}

type ReservedQuizContent = {
  targetPhrases: Set<string>
  spanishCues: Set<string>
}

function collectReservedContent(grammar: GrammarBlock[], words: VocabularyItem[]): ReservedQuizContent {
  const targetPhrases = new Set<string>()
  const spanishCues = new Set<string>()

  for (const block of grammar) {
    spanishCues.add(normalize(block.practice))
    for (const ex of block.examples) {
      if (!isValidExample(ex)) continue
      targetPhrases.add(normalize(ex.phrase))
      spanishCues.add(normalize(ex.translation))
    }
  }

  for (const word of words) {
    targetPhrases.add(normalize(word.word))
    spanishCues.add(normalize(word.translation))
    if (word.example) targetPhrases.add(normalize(word.example))
  }

  return { targetPhrases, spanishCues }
}

function isReservedTarget(answer: string, reserved: ReservedQuizContent): boolean {
  const n = normalize(answer)
  if (reserved.targetPhrases.has(n)) return true
  for (const phrase of reserved.targetPhrases) {
    if (phrase.length > 10 && (n === phrase || n.includes(phrase))) return true
  }
  return false
}

function isReservedSpanishCue(cue: string, reserved: ReservedQuizContent): boolean {
  const n = normalize(cue)
  if (reserved.spanishCues.has(n)) return true
  for (const existing of reserved.spanishCues) {
    if (existing.length > 14 && (n === existing || n.includes(existing))) return true
  }
  return false
}

function wordsNotInExamples(
  words: VocabularyItem[],
  examples: { phrase: string; translation: string }[],
): VocabularyItem[] {
  return words.filter((w) => !examples.some((ex) => normalize(ex.phrase).includes(normalize(w.word))))
}

function taskLabel(kind: WrittenQuizQuestion['kind']): string {
  const labels: Record<WrittenQuizQuestion['kind'], string> = {
    translate: 'Traducción',
    complete: 'Completar',
    conjugate: 'Verbo y tiempo',
    conditional: 'Condicional',
    structure: 'Estructura',
  }
  return labels[kind]
}

function pairToQuestion(
  block: GrammarBlock,
  pair: QuizPair,
  suffix: string,
  lang: string,
): WrittenQuizQuestion {
  const kind = kindFromBlock(block.kind)
  const acceptable = [
    ...acceptVariants(pair.target),
    ...(pair.alternates?.flatMap(acceptVariants) ?? []),
  ]

  const lines = [
    `Tema: ${blockTag(block)}`,
    `Tarea: ${taskLabel(kind)} al ${lang}`,
    pair.instruction ? `Indicación: ${pair.instruction}` : null,
    '',
    `«${pair.spanish}»`,
  ].filter((line) => line !== null)

  return {
    id: `q-${block.id}-${suffix}`,
    kind,
    prompt: lines.join('\n'),
    acceptableAnswers: acceptable,
    requiredTerms: pair.requiredTerms,
    minWords: pair.minWords,
    modelAnswer: pair.target,
    instruction: pair.instruction,
    explanation: `Respuesta modelo: ${pair.target}`,
  }
}

function generateBlockQuestions(
  block: GrammarBlock,
  words: VocabularyItem[],
  lesson: Lesson,
  languageId: string,
  lang: string,
  reserved: ReservedQuizContent,
  anchorBlock?: GrammarBlock,
): WrittenQuizQuestion[] {
  if (block.title.startsWith('Profundización:')) return []

  const examples = block.examples.filter(isValidExample)
  const fresh = wordsNotInExamples(words, examples)
  const pool = fresh.length >= 2 ? fresh : words
  if (pool.length === 0) return []

  const results: WrittenQuizQuestion[] = []
  const baseSeed = hashString(`${lesson.id}-${block.id}-${languageId}`)
  const mode = block.title.startsWith('Aplicación:')
    ? detectGrammarMode(anchorBlock ?? block)
    : detectGrammarMode(block)

  for (let v = 0; v < 4; v++) {
    const w1 = pool[(baseSeed + v) % pool.length]
    const w2 = pool[(baseSeed + v + 2) % pool.length]
    const pair = block.title.startsWith('Aplicación:')
      ? buildApplicationPair(languageId, w1, w2, anchorBlock ?? block, lesson, v)
      : buildQuizPairs(mode, languageId, v, w1, w1.word !== w2.word ? w2 : undefined, lesson)

    if (!pair) continue
    if (isReservedSpanishCue(pair.spanish, reserved)) continue
    if (isReservedTarget(pair.target, reserved)) continue

    const question = pairToQuestion(block, pair, `p-${v}`, lang)
    if (results.some((q) => normalize(q.prompt) === normalize(question.prompt))) continue
    results.push(question)
  }

  return results
}

function blockKeyFromQuestionId(id: string): string {
  const match = id.match(/^q-(.+?)-p-/)
  return match?.[1] ?? id
}

function filterByGrade(questions: WrittenQuizQuestion[], grade: StudentGrade): WrittenQuizQuestion[] {
  return questions.filter((q) => {
    if (q.kind === 'conditional' && grade < 10) return false
    if (q.kind === 'conjugate' && grade < 9) return false
    return true
  })
}

export function buildWrittenQuiz(
  languageId: string,
  lesson: Lesson,
  words: VocabularyItem[],
  grammar: GrammarBlock[],
  grade: StudentGrade,
): WrittenQuizQuestion[] {
  const lv = levelOrder(lesson)
  const count = questionCountForGrade(grade) + Math.min(2, lv - 1)
  const reserved = collectReservedContent(grammar, words)
  const lang = langLabel(languageId)

  const coreBlocks = grammar.filter(
    (b) => !b.title.startsWith('Aplicación:') && !b.title.startsWith('Profundización:'),
  )
  const anchor = coreBlocks[0]

  const pool: WrittenQuizQuestion[] = []
  for (const block of grammar) {
    pool.push(
      ...generateBlockQuestions(block, words, lesson, languageId, lang, reserved, anchor),
    )
  }

  const filtered = filterByGrade(pool, grade)
  const seed = hashString(`${lesson.id}-quiz-v3-${languageId}`)
  const shuffled = seededShuffle(filtered.length > 0 ? filtered : pool, seed)

  const selected: WrittenQuizQuestion[] = []
  const usedBlocks = new Set<string>()

  for (const q of shuffled) {
    if (selected.length >= count) break
    const blockKey = blockKeyFromQuestionId(q.id)
    if (usedBlocks.has(blockKey) && selected.length < count - 1) continue
    selected.push(q)
    usedBlocks.add(blockKey)
  }

  if (selected.length < count) {
    for (const q of shuffled) {
      if (selected.length >= count) break
      if (!selected.some((s) => s.id === q.id)) selected.push(q)
    }
  }

  return selected.slice(0, count)
}

export function scoreWrittenQuiz(
  questions: WrittenQuizQuestion[],
  answers: Record<string, string>,
): { correct: number; total: number; results: Record<string, boolean> } {
  const results: Record<string, boolean> = {}
  let correct = 0
  questions.forEach((q) => {
    const ok = answersMatch(answers[q.id] ?? '', q.acceptableAnswers, {
      requiredTerms: q.requiredTerms,
      minWords: q.minWords,
    })
    results[q.id] = ok
    if (ok) correct += 1
  })
  return { correct, total: questions.length, results }
}
