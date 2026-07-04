import type { LessonActivityId } from '../types'

export type TopicTheme = {
  label: string
  emoji: string
  image: string
  gradient: string
}

export type ActivityVisual = {
  label: string
  emoji: string
  image: string
  gradient: string
}

const TOPIC_MAP: Record<string, TopicTheme> = {
  Conversación: {
    label: 'Conversación',
    emoji: '💬',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    gradient: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
  },
  Gramática: {
    label: 'Gramática',
    emoji: '📚',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    gradient: 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)',
  },
  Familia: {
    label: 'Familia',
    emoji: '👨‍👩‍👧',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
    gradient: 'linear-gradient(135deg, #e17055 0%, #fab1a0 100%)',
  },
  Descripción: {
    label: 'Descripción',
    emoji: '🎨',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    gradient: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
  },
  Compras: {
    label: 'Compras',
    emoji: '🛒',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    gradient: 'linear-gradient(135deg, #00b894 0%, #55efc4 100%)',
  },
  Comida: {
    label: 'Comida',
    emoji: '🍽️',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
  },
  Hogar: {
    label: 'Hogar',
    emoji: '🏠',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    gradient: 'linear-gradient(135deg, #636e72 0%, #b2bec3 100%)',
  },
  Movilidad: {
    label: 'Transporte',
    emoji: '🚌',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40f?w=800&q=80',
    gradient: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
  },
  Naturaleza: {
    label: 'Naturaleza',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    gradient: 'linear-gradient(135deg, #00b894 0%, #81ecec 100%)',
  },
  Viajes: {
    label: 'Viajes',
    emoji: '✈️',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    gradient: 'linear-gradient(135deg, #0984e3 0%, #6c5ce7 100%)',
  },
  Salud: {
    label: 'Salud',
    emoji: '🏥',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    gradient: 'linear-gradient(135deg, #00cec9 0%, #81ecec 100%)',
  },
  Trabajo: {
    label: 'Trabajo',
    emoji: '💼',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    gradient: 'linear-gradient(135deg, #2d3436 0%, #0984e3 100%)',
  },
  Ocio: {
    label: 'Ocio',
    emoji: '🎸',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    gradient: 'linear-gradient(135deg, #6c5ce7 0%, #fd79a8 100%)',
  },
  Emociones: {
    label: 'Emociones',
    emoji: '😊',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd2a56?w=800&q=80',
    gradient: 'linear-gradient(135deg, #fdcb6e 0%, #fd79a8 100%)',
  },
  Tecnología: {
    label: 'Tecnología',
    emoji: '💻',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    gradient: 'linear-gradient(135deg, #0984e3 0%, #2d3436 100%)',
  },
  'Medio ambiente': {
    label: 'Medio ambiente',
    emoji: '🌍',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    gradient: 'linear-gradient(135deg, #00b894 0%, #0984e3 100%)',
  },
  Opinión: {
    label: 'Opinión',
    emoji: '🗣️',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    gradient: 'linear-gradient(135deg, #636e72 0%, #6c5ce7 100%)',
  },
  Eventos: {
    label: 'Eventos',
    emoji: '🎉',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    gradient: 'linear-gradient(135deg, #e84393 0%, #fd79a8 100%)',
  },
  Estudios: {
    label: 'Estudios',
    emoji: '🎓',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    gradient: 'linear-gradient(135deg, #0984e3 0%, #6c5ce7 100%)',
  },
  Comunicación: {
    label: 'Comunicación',
    emoji: '📱',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    gradient: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
  },
  Negocios: {
    label: 'Negocios',
    emoji: '📈',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    gradient: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
  },
  Cultura: {
    label: 'Cultura',
    emoji: '🎭',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    gradient: 'linear-gradient(135deg, #e17055 0%, #6c5ce7 100%)',
  },
  Sociedad: {
    label: 'Sociedad',
    emoji: '🏛️',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    gradient: 'linear-gradient(135deg, #636e72 0%, #0984e3 100%)',
  },
  Ciencia: {
    label: 'Ciencia',
    emoji: '🔬',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    gradient: 'linear-gradient(135deg, #0984e3 0%, #00cec9 100%)',
  },
  Arte: {
    label: 'Arte',
    emoji: '🖼️',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a2b?w=800&q=80',
    gradient: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
  },
  Debate: {
    label: 'Debate',
    emoji: '⚖️',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    gradient: 'linear-gradient(135deg, #2d3436 0%, #6c5ce7 100%)',
  },
}

const DEFAULT_TOPIC: TopicTheme = {
  label: 'Aprendizaje',
  emoji: '🌍',
  image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
  gradient: 'linear-gradient(135deg, #6c5ce7 0%, #00b894 100%)',
}

const ACTIVITY_VISUALS: Record<LessonActivityId, Omit<ActivityVisual, 'image' | 'gradient'>> = {
  grammar: { label: 'Gramática', emoji: '📝' },
  vocab: { label: 'Vocabulario', emoji: '📖' },
  quiz: { label: 'Quiz escrito', emoji: '✍️' },
  wordsearch: { label: 'Sopa de letras', emoji: '🔍' },
  crossword: { label: 'Crucigrama', emoji: '🧩' },
  matching: { label: 'Emparejar', emoji: '🔗' },
  scramble: { label: 'Ordenar letras', emoji: '🔤' },
  stop: { label: 'Stop competitivo', emoji: '⚡' },
}

export function getTopicTheme(topic: string): TopicTheme {
  return TOPIC_MAP[topic] ?? DEFAULT_TOPIC
}

export function getActivityVisual(
  activityId: LessonActivityId,
  topic: string,
  lessonTitle?: string,
): ActivityVisual {
  const topicTheme = getTopicTheme(topic)
  const base = ACTIVITY_VISUALS[activityId]
  return {
    label: base.label,
    emoji: base.emoji,
    image: topicTheme.image,
    gradient: topicTheme.gradient,
    ...(lessonTitle ? {} : {}),
  }
}
