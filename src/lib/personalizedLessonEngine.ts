import type { SubjectLesson, SchoolSubjectId } from '../data/subjects'
import {
  gradeBand,
  inclusiveHints,
  type GradeBand,
  type InclusiveUiHints,
  type LearnerProfile,
} from './learnerProfile'

export type ActivityKind =
  | 'multiple_choice'
  | 'true_false'
  | 'fill_blank'
  | 'match'
  | 'sequence'
  | 'short_write'
  | 'math_problem'
  | 'observe'

export type GeneratedActivity = {
  id: string
  kind: ActivityKind
  title: string
  instruction: string
  /** Pista si falla (adaptativo). */
  hint?: string
  /** Datos según el tipo. */
  prompt: string
  options?: string[]
  correctIndex?: number
  correctBool?: boolean
  blanks?: { before: string; after: string; answer: string }
  pairs?: { left: string; right: string }[]
  sequence?: string[]
  sampleAnswer?: string
  reward: string
}

/** Tarjeta visual de la lección (solo contenido, sin quizzes). */
export type CardVisual = 'mascot' | 'blocks' | 'nature' | 'words' | 'stars' | 'chart'

export type LessonCard = {
  id: string
  kind: 'intro' | 'concept' | 'example' | 'fun' | 'summary'
  icon: string
  title: string
  /** Máx. 2–5 líneas cortas. */
  lines: string[]
  visual: CardVisual
  accent: string
}

export type PersonalizedLesson = {
  title: string
  objective: string
  explanation: string[]
  everydayExamples: string[]
  visualSuggestion: string
  funFact: string
  didYouKnow?: string
  summary: string
  keywords: string[]
  /** Secciones visuales de apoyo (sin actividades). */
  cards: LessonCard[]
  activities: GeneratedActivity[]
  ui: InclusiveUiHints
  band: GradeBand
  adaptiveNote: string
}

function pickActivityKinds(
  subjectId: SchoolSubjectId,
  band: GradeBand,
  profile: LearnerProfile,
  hints: InclusiveUiHints,
): ActivityKind[] {
  const recent = new Set(profile.recentActivityTypes)
  const pool: ActivityKind[] =
    subjectId === 'math'
      ? band === 'preschool'
        ? ['multiple_choice', 'sequence', 'observe', 'true_false']
        : ['math_problem', 'multiple_choice', 'fill_blank', 'true_false', 'sequence']
      : subjectId === 'science'
        ? band === 'preschool'
          ? ['observe', 'match', 'multiple_choice', 'true_false']
          : ['observe', 'multiple_choice', 'true_false', 'match', 'short_write', 'sequence']
        : band === 'preschool'
          ? ['match', 'multiple_choice', 'observe', 'sequence']
          : ['multiple_choice', 'fill_blank', 'true_false', 'match', 'short_write', 'sequence']

  // Evitar repetir el mismo tipo reciente; rotar variedad.
  const shuffled = [...pool].sort((a, b) => {
    const ra = recent.has(a) ? 1 : 0
    const rb = recent.has(b) ? 1 : 0
    return ra - rb || a.localeCompare(b)
  })

  return shuffled.slice(0, hints.maxActivities)
}

function simplifyText(text: string, hints: InclusiveUiHints, band: GradeBand): string {
  let t = text.trim()
  if (hints.concreteLanguage || band === 'preschool') {
    t = t
      .replace(/aproximadamente/gi, 'casi')
      .replace(/posteriormente/gi, 'después')
      .replace(/efectuar/gi, 'hacer')
      .replace(/analizar/gi, 'mirar con cuidado')
  }
  if (hints.shortBlocks && t.length > 140) {
    const cut = t.slice(0, 140)
    const last = Math.max(cut.lastIndexOf('.'), cut.lastIndexOf(','))
    t = (last > 60 ? cut.slice(0, last + 1) : cut) + (last > 60 ? '' : '…')
  }
  return t
}

function buildExplanation(
  lesson: SubjectLesson,
  band: GradeBand,
  hints: InclusiveUiHints,
): string[] {
  const base: string[] = []
  base.push(simplifyText(lesson.summary, hints, band))

  if (band === 'preschool') {
    base.push(`Hoy vamos a jugar y aprender sobre: ${lesson.topic}.`)
    base.push(`Mira, toca y prueba. ¡Tú puedes!`)
  } else if (band === 'primary') {
    base.push(`En esta lección aprenderás ideas importantes de ${lesson.topic}.`)
    lesson.concepts.slice(0, hints.extraExamples ? 4 : 3).forEach((c) => {
      base.push(`• ${simplifyText(c, hints, band)}`)
    })
  } else {
    base.push(`Objetivo del tema “${lesson.topic}”: comprender y aplicar los conceptos clave.`)
    lesson.concepts.forEach((c) => base.push(`• ${c}`))
    if (hints.extraExamples) {
      base.push(`Repasemos con calma: ${lesson.practice}`)
    }
  }

  if (hints.stepByStep) {
    return [
      'Paso 1: Lee con calma.',
      ...base.slice(0, 2),
      'Paso 2: Mira los ejemplos.',
      ...base.slice(2),
    ]
  }
  return base
}

function everydayExamples(subjectId: SchoolSubjectId, lesson: SubjectLesson, band: GradeBand): string[] {
  if (subjectId === 'math') {
    return band === 'preschool'
      ? ['Cuenta los lápices de tu cartuchera.', 'Compara quién tiene más galletas.']
      : [
          `Usa “${lesson.terms[0]?.term ?? 'números'}” cuando repartas algo en casa.`,
          'Mide o cuenta objetos reales antes de escribir la respuesta.',
        ]
  }
  if (subjectId === 'science') {
    return band === 'preschool'
      ? ['Observa una planta o un animal cerca de ti.', '¿Qué cambia con el sol o la lluvia?']
      : [
          'Relaciona el tema con algo que ves en tu barrio o en la cocina.',
          'Anota una observación simple: qué ves, qué pasa, por qué crees que pasa.',
        ]
  }
  return band === 'preschool'
    ? ['Nombra lo que ves en un cuento o dibujo.', 'Di una palabra nueva en voz alta.']
    : [
        `Escribe una frase usando la palabra “${lesson.terms[0]?.term ?? 'idea'}”.`,
        'Lee un párrafo corto y cuenta qué entendiste con tus palabras.',
      ]
}

function visualFor(subjectId: SchoolSubjectId, lesson: SubjectLesson): string {
  if (subjectId === 'math') {
    return `Diagrama o dibujo grande de “${lesson.topic}” con objetos concretos (bloques, frutas, figuras).`
  }
  if (subjectId === 'science') {
    return `Ilustración o foto clara de “${lesson.topic}” con etiquetas simples.`
  }
  return `Imagen o historieta corta sobre “${lesson.title}” con globos de texto grandes.`
}

function funBits(lesson: SubjectLesson, subjectId: SchoolSubjectId): { funFact: string; didYouKnow?: string } {
  if (subjectId === 'math') {
    return {
      funFact: 'Los números están en todas partes: en la hora, en los precios y en los juegos.',
      didYouKnow: '¿Sabías que…? Contar con los dedos es una estrategia inteligente, no un truco de “bebés”.',
    }
  }
  if (subjectId === 'science') {
    return {
      funFact: `La ciencia empieza con una pregunta curiosa sobre “${lesson.topic}”.`,
      didYouKnow: '¿Sabías que…? Observar con paciencia es el primer paso de un experimento.',
    }
  }
  return {
    funFact: 'Las palabras nos ayudan a contar historias, pedir ayuda y soñar en voz alta.',
    didYouKnow: '¿Sabías que…? Leer en voz alta fortalece la memoria y la confianza.',
  }
}

function makeActivities(
  lesson: SubjectLesson,
  subjectId: SchoolSubjectId,
  profile: LearnerProfile,
  hints: InclusiveUiHints,
  band: GradeBand,
): GeneratedActivity[] {
  const kinds = pickActivityKinds(subjectId, band, profile, hints)
  const term = lesson.terms[0]
  const concept = lesson.concepts[0] ?? lesson.topic
  const hard = profile.correctStreak >= 3 || profile.learningLevel === 'advanced'
  const easy = profile.missStreak >= 2 || hints.extraExamples

  return kinds.map((kind, i) => {
    const id = `${lesson.id}-act-${i}-${kind}`
    const reward = ['⭐', '🌟', '🎉', '🏅', '💎'][i % 5]
    const hint = easy
      ? `Pista: piensa en “${term?.term ?? concept}”.`
      : `Revisa la idea de ${lesson.topic}.`

    if (kind === 'multiple_choice') {
      const correct = term?.meaning ?? concept
      const options = hard
        ? [correct, 'Una idea sin relación', 'Solo un dibujo', 'Nada de lo anterior']
        : [correct, 'Algo que no tiene que ver', 'No lo sé']
      return {
        id,
        kind,
        title: 'Elige la mejor respuesta',
        instruction: hints.oneTaskAtATime ? 'Lee y elige una sola opción.' : 'Selecciona la respuesta correcta.',
        hint,
        prompt: term
          ? `¿Qué significa “${term.term}”?`
          : `¿Cuál idea pertenece a “${lesson.topic}”?`,
        options,
        correctIndex: 0,
        reward,
      }
    }

    if (kind === 'true_false') {
      const statement = `${concept} se relaciona con ${lesson.topic}.`
      return {
        id,
        kind,
        title: 'Verdadero o falso',
        instruction: 'Marca si la frase es verdadera o falsa.',
        hint,
        prompt: statement,
        correctBool: true,
        reward,
      }
    }

    if (kind === 'fill_blank') {
      const word = term?.term ?? 'tema'
      return {
        id,
        kind,
        title: 'Completa el espacio',
        instruction: 'Escribe la palabra que falta.',
        hint: `Empieza con “${word.slice(0, 1).toUpperCase()}…”`,
        prompt: '',
        blanks: {
          before: 'La palabra clave de esta lección es',
          after: '.',
          answer: word,
        },
        reward,
      }
    }

    if (kind === 'match') {
      const pairs = lesson.terms.slice(0, 3).map((t) => ({ left: t.term, right: t.meaning }))
      while (pairs.length < 2) {
        pairs.push({ left: lesson.topic, right: lesson.summary.slice(0, 40) })
      }
      return {
        id,
        kind,
        title: 'Relaciona columnas',
        instruction: 'Une cada palabra con su significado.',
        hint,
        prompt: 'Empareja los conceptos.',
        pairs,
        reward,
      }
    }

    if (kind === 'sequence') {
      const sequence =
        band === 'preschool'
          ? ['Mirar', 'Probar', 'Decir lo que pasó']
          : ['Leer la idea', 'Ver un ejemplo', 'Practicar', 'Repasar']
      return {
        id,
        kind,
        title: 'Ordena los pasos',
        instruction: 'Pon los pasos en el orden correcto.',
        hint: 'Empieza por leer o mirar.',
        prompt: '¿En qué orden aprendemos mejor?',
        sequence,
        reward,
      }
    }

    if (kind === 'math_problem') {
      const a = easy ? 2 + (profile.grade % 3) : 4 + profile.grade
      const b = easy ? 1 + (i % 2) : 3 + (i % 4)
      return {
        id,
        kind,
        title: 'Reto numérico',
        instruction: 'Resuelve el problema. Puedes dibujar.',
        hint: `Suma con calma: ${a} + ${b}.`,
        prompt: `Si tienes ${a} y ganas ${b} más, ¿cuántos tienes en total?`,
        blanks: { before: 'Respuesta:', after: '', answer: String(a + b) },
        reward,
      }
    }

    if (kind === 'observe') {
      return {
        id,
        kind,
        title: 'Observa y responde',
        instruction: 'Imagina la imagen sugerida y responde.',
        hint,
        prompt: `${visualFor(subjectId, lesson)} ¿Qué es lo más importante que notarías?`,
        options: [
          concept,
          'Solo el color de fondo',
          'Nada especial',
        ],
        correctIndex: 0,
        reward,
      }
    }

    // short_write
    return {
      id,
      kind: 'short_write',
      title: band === 'media' || band === 'secondary' ? 'Escribe y argumenta' : 'Escribe una frase',
      instruction:
        band === 'preschool'
          ? 'Di o escribe una palabra sobre el tema.'
          : 'Escribe con tus palabras (1 a 3 frases).',
      hint,
      prompt:
        band === 'preschool'
          ? `Di una palabra sobre “${lesson.topic}”.`
          : `Explica “${lesson.topic}” con un ejemplo de tu vida.`,
      sampleAnswer: lesson.practice,
      reward,
    }
  })
}

function shortLine(text: string, max = 90): string {
  const t = text.trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  const last = Math.max(cut.lastIndexOf('.'), cut.lastIndexOf(' '))
  return (last > 40 ? cut.slice(0, last) : cut).trim() + '…'
}

function subjectVisual(subjectId: SchoolSubjectId): CardVisual {
  if (subjectId === 'math') return 'blocks'
  if (subjectId === 'science') return 'nature'
  return 'words'
}

function subjectAccent(subjectId: SchoolSubjectId): string {
  if (subjectId === 'math') return '#74c0fc'
  if (subjectId === 'science') return '#8ce99a'
  return '#f8a5c2'
}

function buildVisualCards(
  lesson: SubjectLesson,
  subjectId: SchoolSubjectId,
  band: GradeBand,
  hints: InclusiveUiHints,
  funFact: string,
  didYouKnow: string | undefined,
  title: string,
  objective: string,
): LessonCard[] {
  const accent = subjectAccent(subjectId)
  const visual = subjectVisual(subjectId)
  const concepts = lesson.concepts.slice(0, hints.extraExamples ? 3 : 2)
  const examples = everydayExamples(subjectId, lesson, band)
  const cards: LessonCard[] = []

  cards.push({
    id: `${lesson.id}-intro`,
    kind: 'intro',
    icon: subjectId === 'math' ? '🔢' : subjectId === 'science' ? '🔬' : '📚',
    title,
    lines: [
      shortLine(objective, 100),
      band === 'preschool' ? '¡Vamos a aprender juntos!' : 'Lee con calma y mira los ejemplos.',
    ],
    visual: 'mascot',
    accent,
  })

  concepts.forEach((concept, i) => {
    cards.push({
      id: `${lesson.id}-concept-${i}`,
      kind: 'concept',
      icon: ['💡', '✨', '🎯'][i % 3],
      title: `Idea ${i + 1}`,
      lines: [
        shortLine(concept, 100),
        i === 0 ? shortLine(lesson.summary, 100) : 'Mira el dibujo y recuerda esta idea.',
      ].slice(0, hints.shortBlocks ? 2 : 3),
      visual,
      accent,
    })
  })

  cards.push({
    id: `${lesson.id}-example`,
    kind: 'example',
    icon: '🏠',
    title: 'En tu vida',
    lines: examples.slice(0, 2).map((e) => shortLine(e, 95)),
    visual,
    accent: '#b197fc',
  })

  cards.push({
    id: `${lesson.id}-fun`,
    kind: 'fun',
    icon: '🌟',
    title: 'Dato curioso',
    lines: [shortLine(funFact, 110), ...(didYouKnow ? [shortLine(didYouKnow, 110)] : [])].slice(
      0,
      3,
    ),
    visual: 'stars',
    accent: '#ffd6e7',
  })

  cards.push({
    id: `${lesson.id}-summary`,
    kind: 'summary',
    icon: '✅',
    title: 'Resumen express',
    lines: [
      shortLine(`Hoy: ${lesson.topic}.`, 80),
      shortLine(concepts.slice(0, 2).join(' · ') || lesson.title, 100),
      'Cuando termines de leer, podrás practicar en Actividades.',
    ].slice(0, 3),
    visual: 'chart',
    accent: '#8ce99a',
  })

  return cards
}

/**
 * Genera contenido educativo de la lección + actividades (pantalla aparte).
 */
export function buildPersonalizedLesson(
  lesson: SubjectLesson,
  subjectId: SchoolSubjectId,
  profile: LearnerProfile,
): PersonalizedLesson {
  const band = gradeBand(profile.grade)
  const hints = inclusiveHints(profile)
  const { funFact, didYouKnow } = funBits(lesson, subjectId)

  const adaptiveNote =
    profile.missStreak >= 2
      ? 'Modo apoyo: textos más cortos y claros.'
      : profile.correctStreak >= 3
        ? 'Modo desafío: ¡vas volando!'
        : 'Modo lectura: primero aprende, luego practica.'

  const title =
    band === 'preschool'
      ? `¡A aprender ${lesson.title}!`
      : band === 'primary'
        ? `Descubre: ${lesson.title}`
        : `${lesson.title}`

  const objective =
    band === 'preschool'
      ? `Explorar “${lesson.topic}” con ejemplos sencillos.`
      : `Comprender “${lesson.topic}” y reconocer sus ideas principales.`

  return {
    title,
    objective,
    explanation: buildExplanation(lesson, band, hints).slice(0, 5),
    everydayExamples: everydayExamples(subjectId, lesson, band),
    visualSuggestion: visualFor(subjectId, lesson),
    funFact,
    didYouKnow,
    summary: shortLine(
      `Lo importante de hoy: ${lesson.topic}. ${lesson.concepts.slice(0, 2).join(' · ')}`,
      160,
    ),
    keywords: [
      lesson.topic,
      ...lesson.terms.slice(0, 4).map((t) => t.term),
      ...lesson.concepts.slice(0, 2),
    ].filter(Boolean),
    cards: buildVisualCards(
      lesson,
      subjectId,
      band,
      hints,
      funFact,
      didYouKnow,
      title,
      objective,
    ),
    activities: makeActivities(lesson, subjectId, profile, hints, band),
    ui: hints,
    band,
    adaptiveNote,
  }
}

export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
}
