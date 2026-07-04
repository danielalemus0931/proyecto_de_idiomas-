// AUTO-GENERATED — 1200 palabras. Regenerar: node scripts/generate-vocabulary.mjs
import type { Language, LanguageLevel, Lesson, QuizOption, VocabularyItem } from '../types'

export const TOTAL_VOCABULARY_WORDS = 1200
export const LESSONS_PER_LEVEL = 6
export const LEVEL_COUNT = 5

export const languages: Language[] = [
  {
    "id": "en",
    "name": "Inglés",
    "flag": "🇬🇧",
    "code": "gb",
    "description": "Ruta completa de principiante a experto en inglés.",
    "level": "Multi-nivel"
  },
  {
    "id": "fr",
    "name": "Francés",
    "flag": "🇫🇷",
    "code": "fr",
    "description": "Ruta completa de principiante a experto en francés.",
    "level": "Multi-nivel"
  },
  {
    "id": "pt",
    "name": "Portugués",
    "flag": "🇵🇹",
    "code": "pt",
    "description": "Ruta completa de principiante a experto en portugués.",
    "level": "Multi-nivel"
  },
  {
    "id": "it",
    "name": "Italiano",
    "flag": "🇮🇹",
    "code": "it",
    "description": "Ruta completa de principiante a experto en italiano.",
    "level": "Multi-nivel"
  }
]

export const languageLevels: Record<string, LanguageLevel[]> = {
  "en": [
    {
      "id": "en-lv1",
      "languageId": "en",
      "order": 1,
      "name": "Principiante",
      "difficulty": "A1",
      "description": "Saludos, números y vocabulario esencial."
    },
    {
      "id": "en-lv2",
      "languageId": "en",
      "order": 2,
      "name": "Elemental",
      "difficulty": "A2",
      "description": "Compras, casa, comida y rutinas."
    },
    {
      "id": "en-lv3",
      "languageId": "en",
      "order": 3,
      "name": "Intermedio",
      "difficulty": "B1",
      "description": "Viajes, trabajo, salud y conversación."
    },
    {
      "id": "en-lv4",
      "languageId": "en",
      "order": 4,
      "name": "Avanzado",
      "difficulty": "B2",
      "description": "Opiniones, tecnología y situaciones formales."
    },
    {
      "id": "en-lv5",
      "languageId": "en",
      "order": 5,
      "name": "Experto",
      "difficulty": "C1",
      "description": "Negocios, cultura y expresiones avanzadas."
    }
  ],
  "fr": [
    {
      "id": "fr-lv1",
      "languageId": "fr",
      "order": 1,
      "name": "Principiante",
      "difficulty": "A1",
      "description": "Saludos, números y vocabulario esencial."
    },
    {
      "id": "fr-lv2",
      "languageId": "fr",
      "order": 2,
      "name": "Elemental",
      "difficulty": "A2",
      "description": "Compras, casa, comida y rutinas."
    },
    {
      "id": "fr-lv3",
      "languageId": "fr",
      "order": 3,
      "name": "Intermedio",
      "difficulty": "B1",
      "description": "Viajes, trabajo, salud y conversación."
    },
    {
      "id": "fr-lv4",
      "languageId": "fr",
      "order": 4,
      "name": "Avanzado",
      "difficulty": "B2",
      "description": "Opiniones, tecnología y situaciones formales."
    },
    {
      "id": "fr-lv5",
      "languageId": "fr",
      "order": 5,
      "name": "Experto",
      "difficulty": "C1",
      "description": "Negocios, cultura y expresiones avanzadas."
    }
  ],
  "pt": [
    {
      "id": "pt-lv1",
      "languageId": "pt",
      "order": 1,
      "name": "Principiante",
      "difficulty": "A1",
      "description": "Saludos, números y vocabulario esencial."
    },
    {
      "id": "pt-lv2",
      "languageId": "pt",
      "order": 2,
      "name": "Elemental",
      "difficulty": "A2",
      "description": "Compras, casa, comida y rutinas."
    },
    {
      "id": "pt-lv3",
      "languageId": "pt",
      "order": 3,
      "name": "Intermedio",
      "difficulty": "B1",
      "description": "Viajes, trabajo, salud y conversación."
    },
    {
      "id": "pt-lv4",
      "languageId": "pt",
      "order": 4,
      "name": "Avanzado",
      "difficulty": "B2",
      "description": "Opiniones, tecnología y situaciones formales."
    },
    {
      "id": "pt-lv5",
      "languageId": "pt",
      "order": 5,
      "name": "Experto",
      "difficulty": "C1",
      "description": "Negocios, cultura y expresiones avanzadas."
    }
  ],
  "it": [
    {
      "id": "it-lv1",
      "languageId": "it",
      "order": 1,
      "name": "Principiante",
      "difficulty": "A1",
      "description": "Saludos, números y vocabulario esencial."
    },
    {
      "id": "it-lv2",
      "languageId": "it",
      "order": 2,
      "name": "Elemental",
      "difficulty": "A2",
      "description": "Compras, casa, comida y rutinas."
    },
    {
      "id": "it-lv3",
      "languageId": "it",
      "order": 3,
      "name": "Intermedio",
      "difficulty": "B1",
      "description": "Viajes, trabajo, salud y conversación."
    },
    {
      "id": "it-lv4",
      "languageId": "it",
      "order": 4,
      "name": "Avanzado",
      "difficulty": "B2",
      "description": "Opiniones, tecnología y situaciones formales."
    },
    {
      "id": "it-lv5",
      "languageId": "it",
      "order": 5,
      "name": "Experto",
      "difficulty": "C1",
      "description": "Negocios, cultura y expresiones avanzadas."
    }
  ]
}

export const lessons: Record<string, Lesson[]> = {
  "en": [
    {
      "id": "en-lv1-le1",
      "levelId": "en-lv1",
      "order": 1,
      "title": "Saludos básicos",
      "topic": "Conversación",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "en-lv1-le2",
      "levelId": "en-lv1",
      "order": 2,
      "title": "Presentaciones",
      "topic": "Conversación",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "en-lv1-le3",
      "levelId": "en-lv1",
      "order": 3,
      "title": "Números y tiempo",
      "topic": "Gramática",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "en-lv1-le4",
      "levelId": "en-lv1",
      "order": 4,
      "title": "Familia",
      "topic": "Familia",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "en-lv1-le5",
      "levelId": "en-lv1",
      "order": 5,
      "title": "Colores",
      "topic": "Descripción",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "en-lv1-le6",
      "levelId": "en-lv1",
      "order": 6,
      "title": "Preguntas útiles",
      "topic": "Conversación",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "en-lv2-le1",
      "levelId": "en-lv2",
      "order": 1,
      "title": "En la tienda",
      "topic": "Compras",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "en-lv2-le2",
      "levelId": "en-lv2",
      "order": 2,
      "title": "Comida y bebida",
      "topic": "Comida",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "en-lv2-le3",
      "levelId": "en-lv2",
      "order": 3,
      "title": "En casa",
      "topic": "Hogar",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "en-lv2-le4",
      "levelId": "en-lv2",
      "order": 4,
      "title": "Ropa y cuerpo",
      "topic": "Descripción",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "en-lv2-le5",
      "levelId": "en-lv2",
      "order": 5,
      "title": "Transporte",
      "topic": "Movilidad",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "en-lv2-le6",
      "levelId": "en-lv2",
      "order": 6,
      "title": "Clima",
      "topic": "Naturaleza",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "en-lv3-le1",
      "levelId": "en-lv3",
      "order": 1,
      "title": "Viajes",
      "topic": "Viajes",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "en-lv3-le2",
      "levelId": "en-lv3",
      "order": 2,
      "title": "En el hotel",
      "topic": "Viajes",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "en-lv3-le3",
      "levelId": "en-lv3",
      "order": 3,
      "title": "Salud",
      "topic": "Salud",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "en-lv3-le4",
      "levelId": "en-lv3",
      "order": 4,
      "title": "Trabajo",
      "topic": "Trabajo",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "en-lv3-le5",
      "levelId": "en-lv3",
      "order": 5,
      "title": "Hobbies",
      "topic": "Ocio",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "en-lv3-le6",
      "levelId": "en-lv3",
      "order": 6,
      "title": "Sentimientos",
      "topic": "Emociones",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "en-lv4-le1",
      "levelId": "en-lv4",
      "order": 1,
      "title": "Medios y tecnología",
      "topic": "Tecnología",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "en-lv4-le2",
      "levelId": "en-lv4",
      "order": 2,
      "title": "Medio ambiente",
      "topic": "Medio ambiente",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "en-lv4-le3",
      "levelId": "en-lv4",
      "order": 3,
      "title": "Opiniones",
      "topic": "Opinión",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "en-lv4-le4",
      "levelId": "en-lv4",
      "order": 4,
      "title": "Eventos",
      "topic": "Eventos",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "en-lv4-le5",
      "levelId": "en-lv4",
      "order": 5,
      "title": "Educación",
      "topic": "Estudios",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "en-lv4-le6",
      "levelId": "en-lv4",
      "order": 6,
      "title": "Comunicación",
      "topic": "Comunicación",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "en-lv5-le1",
      "levelId": "en-lv5",
      "order": 1,
      "title": "Negocios",
      "topic": "Negocios",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "en-lv5-le2",
      "levelId": "en-lv5",
      "order": 2,
      "title": "Cultura",
      "topic": "Cultura",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "en-lv5-le3",
      "levelId": "en-lv5",
      "order": 3,
      "title": "Sociedad",
      "topic": "Sociedad",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "en-lv5-le4",
      "levelId": "en-lv5",
      "order": 4,
      "title": "Ciencia",
      "topic": "Ciencia",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "en-lv5-le5",
      "levelId": "en-lv5",
      "order": 5,
      "title": "Arte",
      "topic": "Arte",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "en-lv5-le6",
      "levelId": "en-lv5",
      "order": 6,
      "title": "Debate avanzado",
      "topic": "Debate",
      "duration": "9 min",
      "words": 10
    }
  ],
  "fr": [
    {
      "id": "fr-lv1-le1",
      "levelId": "fr-lv1",
      "order": 1,
      "title": "Saludos básicos",
      "topic": "Conversación",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "fr-lv1-le2",
      "levelId": "fr-lv1",
      "order": 2,
      "title": "Presentaciones",
      "topic": "Conversación",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "fr-lv1-le3",
      "levelId": "fr-lv1",
      "order": 3,
      "title": "Números y tiempo",
      "topic": "Gramática",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "fr-lv1-le4",
      "levelId": "fr-lv1",
      "order": 4,
      "title": "Familia",
      "topic": "Familia",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "fr-lv1-le5",
      "levelId": "fr-lv1",
      "order": 5,
      "title": "Colores",
      "topic": "Descripción",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "fr-lv1-le6",
      "levelId": "fr-lv1",
      "order": 6,
      "title": "Preguntas útiles",
      "topic": "Conversación",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "fr-lv2-le1",
      "levelId": "fr-lv2",
      "order": 1,
      "title": "En la tienda",
      "topic": "Compras",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "fr-lv2-le2",
      "levelId": "fr-lv2",
      "order": 2,
      "title": "Comida y bebida",
      "topic": "Comida",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "fr-lv2-le3",
      "levelId": "fr-lv2",
      "order": 3,
      "title": "En casa",
      "topic": "Hogar",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "fr-lv2-le4",
      "levelId": "fr-lv2",
      "order": 4,
      "title": "Ropa y cuerpo",
      "topic": "Descripción",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "fr-lv2-le5",
      "levelId": "fr-lv2",
      "order": 5,
      "title": "Transporte",
      "topic": "Movilidad",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "fr-lv2-le6",
      "levelId": "fr-lv2",
      "order": 6,
      "title": "Clima",
      "topic": "Naturaleza",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "fr-lv3-le1",
      "levelId": "fr-lv3",
      "order": 1,
      "title": "Viajes",
      "topic": "Viajes",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "fr-lv3-le2",
      "levelId": "fr-lv3",
      "order": 2,
      "title": "En el hotel",
      "topic": "Viajes",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "fr-lv3-le3",
      "levelId": "fr-lv3",
      "order": 3,
      "title": "Salud",
      "topic": "Salud",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "fr-lv3-le4",
      "levelId": "fr-lv3",
      "order": 4,
      "title": "Trabajo",
      "topic": "Trabajo",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "fr-lv3-le5",
      "levelId": "fr-lv3",
      "order": 5,
      "title": "Hobbies",
      "topic": "Ocio",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "fr-lv3-le6",
      "levelId": "fr-lv3",
      "order": 6,
      "title": "Sentimientos",
      "topic": "Emociones",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "fr-lv4-le1",
      "levelId": "fr-lv4",
      "order": 1,
      "title": "Medios y tecnología",
      "topic": "Tecnología",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "fr-lv4-le2",
      "levelId": "fr-lv4",
      "order": 2,
      "title": "Medio ambiente",
      "topic": "Medio ambiente",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "fr-lv4-le3",
      "levelId": "fr-lv4",
      "order": 3,
      "title": "Opiniones",
      "topic": "Opinión",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "fr-lv4-le4",
      "levelId": "fr-lv4",
      "order": 4,
      "title": "Eventos",
      "topic": "Eventos",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "fr-lv4-le5",
      "levelId": "fr-lv4",
      "order": 5,
      "title": "Educación",
      "topic": "Estudios",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "fr-lv4-le6",
      "levelId": "fr-lv4",
      "order": 6,
      "title": "Comunicación",
      "topic": "Comunicación",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "fr-lv5-le1",
      "levelId": "fr-lv5",
      "order": 1,
      "title": "Negocios",
      "topic": "Negocios",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "fr-lv5-le2",
      "levelId": "fr-lv5",
      "order": 2,
      "title": "Cultura",
      "topic": "Cultura",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "fr-lv5-le3",
      "levelId": "fr-lv5",
      "order": 3,
      "title": "Sociedad",
      "topic": "Sociedad",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "fr-lv5-le4",
      "levelId": "fr-lv5",
      "order": 4,
      "title": "Ciencia",
      "topic": "Ciencia",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "fr-lv5-le5",
      "levelId": "fr-lv5",
      "order": 5,
      "title": "Arte",
      "topic": "Arte",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "fr-lv5-le6",
      "levelId": "fr-lv5",
      "order": 6,
      "title": "Debate avanzado",
      "topic": "Debate",
      "duration": "9 min",
      "words": 10
    }
  ],
  "pt": [
    {
      "id": "pt-lv1-le1",
      "levelId": "pt-lv1",
      "order": 1,
      "title": "Saludos básicos",
      "topic": "Conversación",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "pt-lv1-le2",
      "levelId": "pt-lv1",
      "order": 2,
      "title": "Presentaciones",
      "topic": "Conversación",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "pt-lv1-le3",
      "levelId": "pt-lv1",
      "order": 3,
      "title": "Números y tiempo",
      "topic": "Gramática",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "pt-lv1-le4",
      "levelId": "pt-lv1",
      "order": 4,
      "title": "Familia",
      "topic": "Familia",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "pt-lv1-le5",
      "levelId": "pt-lv1",
      "order": 5,
      "title": "Colores",
      "topic": "Descripción",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "pt-lv1-le6",
      "levelId": "pt-lv1",
      "order": 6,
      "title": "Preguntas útiles",
      "topic": "Conversación",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "pt-lv2-le1",
      "levelId": "pt-lv2",
      "order": 1,
      "title": "En la tienda",
      "topic": "Compras",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "pt-lv2-le2",
      "levelId": "pt-lv2",
      "order": 2,
      "title": "Comida y bebida",
      "topic": "Comida",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "pt-lv2-le3",
      "levelId": "pt-lv2",
      "order": 3,
      "title": "En casa",
      "topic": "Hogar",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "pt-lv2-le4",
      "levelId": "pt-lv2",
      "order": 4,
      "title": "Ropa y cuerpo",
      "topic": "Descripción",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "pt-lv2-le5",
      "levelId": "pt-lv2",
      "order": 5,
      "title": "Transporte",
      "topic": "Movilidad",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "pt-lv2-le6",
      "levelId": "pt-lv2",
      "order": 6,
      "title": "Clima",
      "topic": "Naturaleza",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "pt-lv3-le1",
      "levelId": "pt-lv3",
      "order": 1,
      "title": "Viajes",
      "topic": "Viajes",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "pt-lv3-le2",
      "levelId": "pt-lv3",
      "order": 2,
      "title": "En el hotel",
      "topic": "Viajes",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "pt-lv3-le3",
      "levelId": "pt-lv3",
      "order": 3,
      "title": "Salud",
      "topic": "Salud",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "pt-lv3-le4",
      "levelId": "pt-lv3",
      "order": 4,
      "title": "Trabajo",
      "topic": "Trabajo",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "pt-lv3-le5",
      "levelId": "pt-lv3",
      "order": 5,
      "title": "Hobbies",
      "topic": "Ocio",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "pt-lv3-le6",
      "levelId": "pt-lv3",
      "order": 6,
      "title": "Sentimientos",
      "topic": "Emociones",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "pt-lv4-le1",
      "levelId": "pt-lv4",
      "order": 1,
      "title": "Medios y tecnología",
      "topic": "Tecnología",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "pt-lv4-le2",
      "levelId": "pt-lv4",
      "order": 2,
      "title": "Medio ambiente",
      "topic": "Medio ambiente",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "pt-lv4-le3",
      "levelId": "pt-lv4",
      "order": 3,
      "title": "Opiniones",
      "topic": "Opinión",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "pt-lv4-le4",
      "levelId": "pt-lv4",
      "order": 4,
      "title": "Eventos",
      "topic": "Eventos",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "pt-lv4-le5",
      "levelId": "pt-lv4",
      "order": 5,
      "title": "Educación",
      "topic": "Estudios",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "pt-lv4-le6",
      "levelId": "pt-lv4",
      "order": 6,
      "title": "Comunicación",
      "topic": "Comunicación",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "pt-lv5-le1",
      "levelId": "pt-lv5",
      "order": 1,
      "title": "Negocios",
      "topic": "Negocios",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "pt-lv5-le2",
      "levelId": "pt-lv5",
      "order": 2,
      "title": "Cultura",
      "topic": "Cultura",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "pt-lv5-le3",
      "levelId": "pt-lv5",
      "order": 3,
      "title": "Sociedad",
      "topic": "Sociedad",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "pt-lv5-le4",
      "levelId": "pt-lv5",
      "order": 4,
      "title": "Ciencia",
      "topic": "Ciencia",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "pt-lv5-le5",
      "levelId": "pt-lv5",
      "order": 5,
      "title": "Arte",
      "topic": "Arte",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "pt-lv5-le6",
      "levelId": "pt-lv5",
      "order": 6,
      "title": "Debate avanzado",
      "topic": "Debate",
      "duration": "9 min",
      "words": 10
    }
  ],
  "it": [
    {
      "id": "it-lv1-le1",
      "levelId": "it-lv1",
      "order": 1,
      "title": "Saludos básicos",
      "topic": "Conversación",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "it-lv1-le2",
      "levelId": "it-lv1",
      "order": 2,
      "title": "Presentaciones",
      "topic": "Conversación",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "it-lv1-le3",
      "levelId": "it-lv1",
      "order": 3,
      "title": "Números y tiempo",
      "topic": "Gramática",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "it-lv1-le4",
      "levelId": "it-lv1",
      "order": 4,
      "title": "Familia",
      "topic": "Familia",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "it-lv1-le5",
      "levelId": "it-lv1",
      "order": 5,
      "title": "Colores",
      "topic": "Descripción",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "it-lv1-le6",
      "levelId": "it-lv1",
      "order": 6,
      "title": "Preguntas útiles",
      "topic": "Conversación",
      "duration": "5 min",
      "words": 10
    },
    {
      "id": "it-lv2-le1",
      "levelId": "it-lv2",
      "order": 1,
      "title": "En la tienda",
      "topic": "Compras",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "it-lv2-le2",
      "levelId": "it-lv2",
      "order": 2,
      "title": "Comida y bebida",
      "topic": "Comida",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "it-lv2-le3",
      "levelId": "it-lv2",
      "order": 3,
      "title": "En casa",
      "topic": "Hogar",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "it-lv2-le4",
      "levelId": "it-lv2",
      "order": 4,
      "title": "Ropa y cuerpo",
      "topic": "Descripción",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "it-lv2-le5",
      "levelId": "it-lv2",
      "order": 5,
      "title": "Transporte",
      "topic": "Movilidad",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "it-lv2-le6",
      "levelId": "it-lv2",
      "order": 6,
      "title": "Clima",
      "topic": "Naturaleza",
      "duration": "6 min",
      "words": 10
    },
    {
      "id": "it-lv3-le1",
      "levelId": "it-lv3",
      "order": 1,
      "title": "Viajes",
      "topic": "Viajes",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "it-lv3-le2",
      "levelId": "it-lv3",
      "order": 2,
      "title": "En el hotel",
      "topic": "Viajes",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "it-lv3-le3",
      "levelId": "it-lv3",
      "order": 3,
      "title": "Salud",
      "topic": "Salud",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "it-lv3-le4",
      "levelId": "it-lv3",
      "order": 4,
      "title": "Trabajo",
      "topic": "Trabajo",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "it-lv3-le5",
      "levelId": "it-lv3",
      "order": 5,
      "title": "Hobbies",
      "topic": "Ocio",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "it-lv3-le6",
      "levelId": "it-lv3",
      "order": 6,
      "title": "Sentimientos",
      "topic": "Emociones",
      "duration": "7 min",
      "words": 10
    },
    {
      "id": "it-lv4-le1",
      "levelId": "it-lv4",
      "order": 1,
      "title": "Medios y tecnología",
      "topic": "Tecnología",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "it-lv4-le2",
      "levelId": "it-lv4",
      "order": 2,
      "title": "Medio ambiente",
      "topic": "Medio ambiente",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "it-lv4-le3",
      "levelId": "it-lv4",
      "order": 3,
      "title": "Opiniones",
      "topic": "Opinión",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "it-lv4-le4",
      "levelId": "it-lv4",
      "order": 4,
      "title": "Eventos",
      "topic": "Eventos",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "it-lv4-le5",
      "levelId": "it-lv4",
      "order": 5,
      "title": "Educación",
      "topic": "Estudios",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "it-lv4-le6",
      "levelId": "it-lv4",
      "order": 6,
      "title": "Comunicación",
      "topic": "Comunicación",
      "duration": "8 min",
      "words": 10
    },
    {
      "id": "it-lv5-le1",
      "levelId": "it-lv5",
      "order": 1,
      "title": "Negocios",
      "topic": "Negocios",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "it-lv5-le2",
      "levelId": "it-lv5",
      "order": 2,
      "title": "Cultura",
      "topic": "Cultura",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "it-lv5-le3",
      "levelId": "it-lv5",
      "order": 3,
      "title": "Sociedad",
      "topic": "Sociedad",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "it-lv5-le4",
      "levelId": "it-lv5",
      "order": 4,
      "title": "Ciencia",
      "topic": "Ciencia",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "it-lv5-le5",
      "levelId": "it-lv5",
      "order": 5,
      "title": "Arte",
      "topic": "Arte",
      "duration": "9 min",
      "words": 10
    },
    {
      "id": "it-lv5-le6",
      "levelId": "it-lv5",
      "order": 6,
      "title": "Debate avanzado",
      "topic": "Debate",
      "duration": "9 min",
      "words": 10
    }
  ]
}

export const vocabulary: Record<string, VocabularyItem[]> = {
  "en-lv1-le1": [
    {
      "word": "Hello",
      "translation": "Hola",
      "example": "Ejemplo con \"Hello\"."
    },
    {
      "word": "Goodbye",
      "translation": "Adiós",
      "example": "Ejemplo con \"Goodbye\"."
    },
    {
      "word": "Please",
      "translation": "Por favor",
      "example": "Ejemplo con \"Please\"."
    },
    {
      "word": "Thanks",
      "translation": "Gracias",
      "example": "Ejemplo con \"Thanks\"."
    },
    {
      "word": "Yes",
      "translation": "Sí",
      "example": "Ejemplo con \"Yes\"."
    },
    {
      "word": "No",
      "translation": "No",
      "example": "Ejemplo con \"No\"."
    },
    {
      "word": "Sorry",
      "translation": "Perdón",
      "example": "Ejemplo con \"Sorry\"."
    },
    {
      "word": "Welcome",
      "translation": "Bienvenido",
      "example": "Ejemplo con \"Welcome\"."
    },
    {
      "word": "Good",
      "translation": "Bueno",
      "example": "Ejemplo con \"Good\"."
    },
    {
      "word": "Morning",
      "translation": "Mañana",
      "example": "Ejemplo con \"Morning\"."
    }
  ],
  "en-lv1-le2": [
    {
      "word": "Name",
      "translation": "Nombre",
      "example": "Ejemplo con \"Name\"."
    },
    {
      "word": "Age",
      "translation": "Edad",
      "example": "Ejemplo con \"Age\"."
    },
    {
      "word": "Country",
      "translation": "País",
      "example": "Ejemplo con \"Country\"."
    },
    {
      "word": "City",
      "translation": "Ciudad",
      "example": "Ejemplo con \"City\"."
    },
    {
      "word": "Job",
      "translation": "Trabajo",
      "example": "Ejemplo con \"Job\"."
    },
    {
      "word": "Student",
      "translation": "Estudiante",
      "example": "Ejemplo con \"Student\"."
    },
    {
      "word": "Teacher",
      "translation": "Profesor/a",
      "example": "Ejemplo con \"Teacher\"."
    },
    {
      "word": "Friend",
      "translation": "Amigo/a",
      "example": "Ejemplo con \"Friend\"."
    },
    {
      "word": "Language",
      "translation": "Idioma",
      "example": "Ejemplo con \"Language\"."
    },
    {
      "word": "Address",
      "translation": "Dirección",
      "example": "Ejemplo con \"Address\"."
    }
  ],
  "en-lv1-le3": [
    {
      "word": "One",
      "translation": "Uno",
      "example": "Ejemplo con \"One\"."
    },
    {
      "word": "Two",
      "translation": "Dos",
      "example": "Ejemplo con \"Two\"."
    },
    {
      "word": "Three",
      "translation": "Tres",
      "example": "Ejemplo con \"Three\"."
    },
    {
      "word": "Four",
      "translation": "Cuatro",
      "example": "Ejemplo con \"Four\"."
    },
    {
      "word": "Five",
      "translation": "Cinco",
      "example": "Ejemplo con \"Five\"."
    },
    {
      "word": "Six",
      "translation": "Seis",
      "example": "Ejemplo con \"Six\"."
    },
    {
      "word": "Seven",
      "translation": "Siete",
      "example": "Ejemplo con \"Seven\"."
    },
    {
      "word": "Eight",
      "translation": "Ocho",
      "example": "Ejemplo con \"Eight\"."
    },
    {
      "word": "Nine",
      "translation": "Nueve",
      "example": "Ejemplo con \"Nine\"."
    },
    {
      "word": "Ten",
      "translation": "Diez",
      "example": "Ejemplo con \"Ten\"."
    }
  ],
  "en-lv1-le4": [
    {
      "word": "Mother",
      "translation": "Madre",
      "example": "Ejemplo con \"Mother\"."
    },
    {
      "word": "Father",
      "translation": "Padre",
      "example": "Ejemplo con \"Father\"."
    },
    {
      "word": "Sister",
      "translation": "Hermana",
      "example": "Ejemplo con \"Sister\"."
    },
    {
      "word": "Brother",
      "translation": "Hermano",
      "example": "Ejemplo con \"Brother\"."
    },
    {
      "word": "Baby",
      "translation": "Bebé",
      "example": "Ejemplo con \"Baby\"."
    },
    {
      "word": "Family",
      "translation": "Familia",
      "example": "Ejemplo con \"Family\"."
    },
    {
      "word": "Son",
      "translation": "Hijo",
      "example": "Ejemplo con \"Son\"."
    },
    {
      "word": "Daughter",
      "translation": "Hija",
      "example": "Ejemplo con \"Daughter\"."
    },
    {
      "word": "Uncle",
      "translation": "Tío",
      "example": "Ejemplo con \"Uncle\"."
    },
    {
      "word": "Aunt",
      "translation": "Tía",
      "example": "Ejemplo con \"Aunt\"."
    }
  ],
  "en-lv1-le5": [
    {
      "word": "Red",
      "translation": "Rojo",
      "example": "Ejemplo con \"Red\"."
    },
    {
      "word": "Blue",
      "translation": "Azul",
      "example": "Ejemplo con \"Blue\"."
    },
    {
      "word": "Green",
      "translation": "Verde",
      "example": "Ejemplo con \"Green\"."
    },
    {
      "word": "Yellow",
      "translation": "Amarillo",
      "example": "Ejemplo con \"Yellow\"."
    },
    {
      "word": "Black",
      "translation": "Negro",
      "example": "Ejemplo con \"Black\"."
    },
    {
      "word": "White",
      "translation": "Blanco",
      "example": "Ejemplo con \"White\"."
    },
    {
      "word": "Pink",
      "translation": "Rosa",
      "example": "Ejemplo con \"Pink\"."
    },
    {
      "word": "Brown",
      "translation": "Marrón",
      "example": "Ejemplo con \"Brown\"."
    },
    {
      "word": "Orange",
      "translation": "Naranja",
      "example": "Ejemplo con \"Orange\"."
    },
    {
      "word": "Purple",
      "translation": "Morado",
      "example": "Ejemplo con \"Purple\"."
    }
  ],
  "en-lv1-le6": [
    {
      "word": "What",
      "translation": "Qué",
      "example": "Ejemplo con \"What\"."
    },
    {
      "word": "Where",
      "translation": "Dónde",
      "example": "Ejemplo con \"Where\"."
    },
    {
      "word": "When",
      "translation": "Cuándo",
      "example": "Ejemplo con \"When\"."
    },
    {
      "word": "Why",
      "translation": "Por qué",
      "example": "Ejemplo con \"Why\"."
    },
    {
      "word": "How",
      "translation": "Cómo",
      "example": "Ejemplo con \"How\"."
    },
    {
      "word": "Who",
      "translation": "Quién",
      "example": "Ejemplo con \"Who\"."
    },
    {
      "word": "Which",
      "translation": "Cuál",
      "example": "Ejemplo con \"Which\"."
    },
    {
      "word": "How much",
      "translation": "Cuánto",
      "example": "Ejemplo con \"How much\"."
    },
    {
      "word": "How many",
      "translation": "Cuántos",
      "example": "Ejemplo con \"How many\"."
    },
    {
      "word": "Always",
      "translation": "Siempre",
      "example": "Ejemplo con \"Always\"."
    }
  ],
  "en-lv2-le1": [
    {
      "word": "Shop",
      "translation": "Tienda",
      "example": "Ejemplo con \"Shop\"."
    },
    {
      "word": "Price",
      "translation": "Precio",
      "example": "Ejemplo con \"Price\"."
    },
    {
      "word": "Bread",
      "translation": "Pan",
      "example": "Ejemplo con \"Bread\"."
    },
    {
      "word": "Water",
      "translation": "Agua",
      "example": "Ejemplo con \"Water\"."
    },
    {
      "word": "Market",
      "translation": "Mercado",
      "example": "Ejemplo con \"Market\"."
    },
    {
      "word": "Money",
      "translation": "Dinero",
      "example": "Ejemplo con \"Money\"."
    },
    {
      "word": "Cheap",
      "translation": "Barato",
      "example": "Ejemplo con \"Cheap\"."
    },
    {
      "word": "Expensive",
      "translation": "Caro",
      "example": "Ejemplo con \"Expensive\"."
    },
    {
      "word": "Coffee",
      "translation": "Café",
      "example": "Ejemplo con \"Coffee\"."
    },
    {
      "word": "Milk",
      "translation": "Leche",
      "example": "Ejemplo con \"Milk\"."
    }
  ],
  "en-lv2-le2": [
    {
      "word": "Sugar",
      "translation": "Azúcar",
      "example": "Ejemplo con \"Sugar\"."
    },
    {
      "word": "Salt",
      "translation": "Sal",
      "example": "Ejemplo con \"Salt\"."
    },
    {
      "word": "Rice",
      "translation": "Arroz",
      "example": "Ejemplo con \"Rice\"."
    },
    {
      "word": "Meat",
      "translation": "Carne",
      "example": "Ejemplo con \"Meat\"."
    },
    {
      "word": "Fish",
      "translation": "Pescado",
      "example": "Ejemplo con \"Fish\"."
    },
    {
      "word": "Fruit",
      "translation": "Fruta",
      "example": "Ejemplo con \"Fruit\"."
    },
    {
      "word": "Vegetable",
      "translation": "Verdura",
      "example": "Ejemplo con \"Vegetable\"."
    },
    {
      "word": "Breakfast",
      "translation": "Desayuno",
      "example": "Ejemplo con \"Breakfast\"."
    },
    {
      "word": "Lunch",
      "translation": "Almuerzo",
      "example": "Ejemplo con \"Lunch\"."
    },
    {
      "word": "Dinner",
      "translation": "Cena",
      "example": "Ejemplo con \"Dinner\"."
    }
  ],
  "en-lv2-le3": [
    {
      "word": "Kitchen",
      "translation": "Cocina",
      "example": "Ejemplo con \"Kitchen\"."
    },
    {
      "word": "Bedroom",
      "translation": "Dormitorio",
      "example": "Ejemplo con \"Bedroom\"."
    },
    {
      "word": "Bathroom",
      "translation": "Baño",
      "example": "Ejemplo con \"Bathroom\"."
    },
    {
      "word": "Window",
      "translation": "Ventana",
      "example": "Ejemplo con \"Window\"."
    },
    {
      "word": "Door",
      "translation": "Puerta",
      "example": "Ejemplo con \"Door\"."
    },
    {
      "word": "Table",
      "translation": "Mesa",
      "example": "Ejemplo con \"Table\"."
    },
    {
      "word": "Chair",
      "translation": "Silla",
      "example": "Ejemplo con \"Chair\"."
    },
    {
      "word": "House",
      "translation": "Casa",
      "example": "Ejemplo con \"House\"."
    },
    {
      "word": "Sun",
      "translation": "Sol",
      "example": "Ejemplo con \"Sun\"."
    },
    {
      "word": "Rain",
      "translation": "Lluvia",
      "example": "Ejemplo con \"Rain\"."
    }
  ],
  "en-lv2-le4": [
    {
      "word": "Shirt",
      "translation": "Camisa",
      "example": "Ejemplo con \"Shirt\"."
    },
    {
      "word": "Pants",
      "translation": "Pantalón",
      "example": "Ejemplo con \"Pants\"."
    },
    {
      "word": "Shoes",
      "translation": "Zapatos",
      "example": "Ejemplo con \"Shoes\"."
    },
    {
      "word": "Hat",
      "translation": "Sombrero",
      "example": "Ejemplo con \"Hat\"."
    },
    {
      "word": "Body",
      "translation": "Cuerpo",
      "example": "Ejemplo con \"Body\"."
    },
    {
      "word": "Head",
      "translation": "Cabeza",
      "example": "Ejemplo con \"Head\"."
    },
    {
      "word": "Hand",
      "translation": "Mano",
      "example": "Ejemplo con \"Hand\"."
    },
    {
      "word": "Foot",
      "translation": "Pie",
      "example": "Ejemplo con \"Foot\"."
    },
    {
      "word": "Heart",
      "translation": "Corazón",
      "example": "Ejemplo con \"Heart\"."
    },
    {
      "word": "Bus",
      "translation": "Autobús",
      "example": "Ejemplo con \"Bus\"."
    }
  ],
  "en-lv2-le5": [
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Airport",
      "translation": "Aeropuerto",
      "example": "Ejemplo con \"Airport\"."
    },
    {
      "word": "Ticket",
      "translation": "Boleto",
      "example": "Ejemplo con \"Ticket\"."
    },
    {
      "word": "Road",
      "translation": "Carretera",
      "example": "Ejemplo con \"Road\"."
    },
    {
      "word": "Bridge",
      "translation": "Puente",
      "example": "Ejemplo con \"Bridge\"."
    },
    {
      "word": "Cloud",
      "translation": "Nube",
      "example": "Ejemplo con \"Cloud\"."
    },
    {
      "word": "Wind",
      "translation": "Viento",
      "example": "Ejemplo con \"Wind\"."
    },
    {
      "word": "Snow",
      "translation": "Nieve",
      "example": "Ejemplo con \"Snow\"."
    },
    {
      "word": "Weather",
      "translation": "Clima",
      "example": "Ejemplo con \"Weather\"."
    }
  ],
  "en-lv2-le6": [
    {
      "word": "Hot",
      "translation": "Caliente",
      "example": "Ejemplo con \"Hot\"."
    },
    {
      "word": "Cold",
      "translation": "Frío",
      "example": "Ejemplo con \"Cold\"."
    },
    {
      "word": "Passport",
      "translation": "Pasaporte",
      "example": "Ejemplo con \"Passport\"."
    },
    {
      "word": "Hotel",
      "translation": "Hotel",
      "example": "Ejemplo con \"Hotel\"."
    },
    {
      "word": "Map",
      "translation": "Mapa",
      "example": "Ejemplo con \"Map\"."
    },
    {
      "word": "Luggage",
      "translation": "Equipaje",
      "example": "Ejemplo con \"Luggage\"."
    },
    {
      "word": "Doctor",
      "translation": "Médico",
      "example": "Ejemplo con \"Doctor\"."
    },
    {
      "word": "Nurse",
      "translation": "Enfermera",
      "example": "Ejemplo con \"Nurse\"."
    },
    {
      "word": "Medicine",
      "translation": "Medicina",
      "example": "Ejemplo con \"Medicine\"."
    },
    {
      "word": "Hospital",
      "translation": "Hospital",
      "example": "Ejemplo con \"Hospital\"."
    }
  ],
  "en-lv3-le1": [
    {
      "word": "Pain",
      "translation": "Dolor",
      "example": "Ejemplo con \"Pain\"."
    },
    {
      "word": "Meeting",
      "translation": "Reunión",
      "example": "Ejemplo con \"Meeting\"."
    },
    {
      "word": "Salary",
      "translation": "Salario",
      "example": "Ejemplo con \"Salary\"."
    },
    {
      "word": "Boss",
      "translation": "Jefe",
      "example": "Ejemplo con \"Boss\"."
    },
    {
      "word": "Team",
      "translation": "Equipo",
      "example": "Ejemplo con \"Team\"."
    },
    {
      "word": "Project",
      "translation": "Proyecto",
      "example": "Ejemplo con \"Project\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Office",
      "translation": "Oficina",
      "example": "Ejemplo con \"Office\"."
    },
    {
      "word": "Music",
      "translation": "Música",
      "example": "Ejemplo con \"Music\"."
    },
    {
      "word": "Happy",
      "translation": "Feliz",
      "example": "Ejemplo con \"Happy\"."
    }
  ],
  "en-lv3-le2": [
    {
      "word": "Guitar",
      "translation": "Guitarra",
      "example": "Ejemplo con \"Guitar\"."
    },
    {
      "word": "Sport",
      "translation": "Deporte",
      "example": "Ejemplo con \"Sport\"."
    },
    {
      "word": "Book",
      "translation": "Libro",
      "example": "Ejemplo con \"Book\"."
    },
    {
      "word": "Movie",
      "translation": "Película",
      "example": "Ejemplo con \"Movie\"."
    },
    {
      "word": "Dance",
      "translation": "Baile",
      "example": "Ejemplo con \"Dance\"."
    },
    {
      "word": "Game",
      "translation": "Juego",
      "example": "Ejemplo con \"Game\"."
    },
    {
      "word": "Sad",
      "translation": "Triste",
      "example": "Ejemplo con \"Sad\"."
    },
    {
      "word": "Angry",
      "translation": "Enojado",
      "example": "Ejemplo con \"Angry\"."
    },
    {
      "word": "Love",
      "translation": "Amor",
      "example": "Ejemplo con \"Love\"."
    },
    {
      "word": "Fear",
      "translation": "Miedo",
      "example": "Ejemplo con \"Fear\"."
    }
  ],
  "en-lv3-le3": [
    {
      "word": "Hope",
      "translation": "Esperanza",
      "example": "Ejemplo con \"Hope\"."
    },
    {
      "word": "Joy",
      "translation": "Alegría",
      "example": "Ejemplo con \"Joy\"."
    },
    {
      "word": "Internet",
      "translation": "Internet",
      "example": "Ejemplo con \"Internet\"."
    },
    {
      "word": "Computer",
      "translation": "Computadora",
      "example": "Ejemplo con \"Computer\"."
    },
    {
      "word": "Software",
      "translation": "Software",
      "example": "Ejemplo con \"Software\"."
    },
    {
      "word": "Website",
      "translation": "Sitio web",
      "example": "Ejemplo con \"Website\"."
    },
    {
      "word": "News",
      "translation": "Noticias",
      "example": "Ejemplo con \"News\"."
    },
    {
      "word": "Message",
      "translation": "Mensaje",
      "example": "Ejemplo con \"Message\"."
    },
    {
      "word": "Phone",
      "translation": "Teléfono",
      "example": "Ejemplo con \"Phone\"."
    },
    {
      "word": "Think",
      "translation": "Pensar",
      "example": "Ejemplo con \"Think\"."
    }
  ],
  "en-lv3-le4": [
    {
      "word": "Nature",
      "translation": "Naturaleza",
      "example": "Ejemplo con \"Nature\"."
    },
    {
      "word": "Pollution",
      "translation": "Contaminación",
      "example": "Ejemplo con \"Pollution\"."
    },
    {
      "word": "Forest",
      "translation": "Bosque",
      "example": "Ejemplo con \"Forest\"."
    },
    {
      "word": "River",
      "translation": "Río",
      "example": "Ejemplo con \"River\"."
    },
    {
      "word": "Ocean",
      "translation": "Océano",
      "example": "Ejemplo con \"Ocean\"."
    },
    {
      "word": "Energy",
      "translation": "Energía",
      "example": "Ejemplo con \"Energy\"."
    },
    {
      "word": "Climate",
      "translation": "Clima",
      "example": "Ejemplo con \"Climate\"."
    },
    {
      "word": "Party",
      "translation": "Fiesta",
      "example": "Ejemplo con \"Party\"."
    },
    {
      "word": "University",
      "translation": "Universidad",
      "example": "Ejemplo con \"University\"."
    },
    {
      "word": "Conversation",
      "translation": "Conversación",
      "example": "Ejemplo con \"Conversation\"."
    }
  ],
  "en-lv3-le5": [
    {
      "word": "Opinion",
      "translation": "Opinión",
      "example": "Ejemplo con \"Opinion\"."
    },
    {
      "word": "Agree",
      "translation": "De acuerdo",
      "example": "Ejemplo con \"Agree\"."
    },
    {
      "word": "Disagree",
      "translation": "En desacuerdo",
      "example": "Ejemplo con \"Disagree\"."
    },
    {
      "word": "Perhaps",
      "translation": "Quizás",
      "example": "Ejemplo con \"Perhaps\"."
    },
    {
      "word": "Certainly",
      "translation": "Ciertamente",
      "example": "Ejemplo con \"Certainly\"."
    },
    {
      "word": "Wedding",
      "translation": "Boda",
      "example": "Ejemplo con \"Wedding\"."
    },
    {
      "word": "Festival",
      "translation": "Festival",
      "example": "Ejemplo con \"Festival\"."
    },
    {
      "word": "Concert",
      "translation": "Concierto",
      "example": "Ejemplo con \"Concert\"."
    },
    {
      "word": "Birthday",
      "translation": "Cumpleaños",
      "example": "Ejemplo con \"Birthday\"."
    },
    {
      "word": "Holiday",
      "translation": "Vacaciones",
      "example": "Ejemplo con \"Holiday\"."
    }
  ],
  "en-lv3-le6": [
    {
      "word": "History",
      "translation": "Historia",
      "example": "Ejemplo con \"History\"."
    },
    {
      "word": "Science",
      "translation": "Ciencia",
      "example": "Ejemplo con \"Science\"."
    },
    {
      "word": "Math",
      "translation": "Matemáticas",
      "example": "Ejemplo con \"Math\"."
    },
    {
      "word": "Exam",
      "translation": "Examen",
      "example": "Ejemplo con \"Exam\"."
    },
    {
      "word": "Homework",
      "translation": "Tarea",
      "example": "Ejemplo con \"Homework\"."
    },
    {
      "word": "Class",
      "translation": "Clase",
      "example": "Ejemplo con \"Class\"."
    },
    {
      "word": "Letter",
      "translation": "Carta",
      "example": "Ejemplo con \"Letter\"."
    },
    {
      "word": "Call",
      "translation": "Llamada",
      "example": "Ejemplo con \"Call\"."
    },
    {
      "word": "Answer",
      "translation": "Respuesta",
      "example": "Ejemplo con \"Answer\"."
    },
    {
      "word": "Question",
      "translation": "Pregunta",
      "example": "Ejemplo con \"Question\"."
    }
  ],
  "en-lv4-le1": [
    {
      "word": "Company",
      "translation": "Empresa",
      "example": "Ejemplo con \"Company\"."
    },
    {
      "word": "Tradition",
      "translation": "Tradición",
      "example": "Ejemplo con \"Tradition\"."
    },
    {
      "word": "Policy",
      "translation": "Política",
      "example": "Ejemplo con \"Policy\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Society",
      "translation": "Sociedad",
      "example": "Ejemplo con \"Society\"."
    },
    {
      "word": "Economy",
      "translation": "Economía",
      "example": "Ejemplo con \"Economy\"."
    },
    {
      "word": "Law",
      "translation": "Ley",
      "example": "Ejemplo con \"Law\"."
    },
    {
      "word": "Freedom",
      "translation": "Libertad",
      "example": "Ejemplo con \"Freedom\"."
    },
    {
      "word": "Market",
      "translation": "Mercado",
      "example": "Ejemplo con \"Market\"."
    },
    {
      "word": "Argument",
      "translation": "Argumento",
      "example": "Ejemplo con \"Argument\"."
    }
  ],
  "en-lv4-le2": [
    {
      "word": "Research",
      "translation": "Investigación",
      "example": "Ejemplo con \"Research\"."
    },
    {
      "word": "Discovery",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Discovery\"."
    },
    {
      "word": "Laboratory",
      "translation": "Laboratorio",
      "example": "Ejemplo con \"Laboratory\"."
    },
    {
      "word": "Theory",
      "translation": "Teoría",
      "example": "Ejemplo con \"Theory\"."
    },
    {
      "word": "Data",
      "translation": "Datos",
      "example": "Ejemplo con \"Data\"."
    },
    {
      "word": "Experiment",
      "translation": "Experimento",
      "example": "Ejemplo con \"Experiment\"."
    },
    {
      "word": "Poetry",
      "translation": "Poesía",
      "example": "Ejemplo con \"Poetry\"."
    },
    {
      "word": "Painting",
      "translation": "Pintura",
      "example": "Ejemplo con \"Painting\"."
    },
    {
      "word": "Sculpture",
      "translation": "Escultura",
      "example": "Ejemplo con \"Sculpture\"."
    },
    {
      "word": "Novel",
      "translation": "Novela",
      "example": "Ejemplo con \"Novel\"."
    }
  ],
  "en-lv4-le3": [
    {
      "word": "Theater",
      "translation": "Teatro",
      "example": "Ejemplo con \"Theater\"."
    },
    {
      "word": "Artist",
      "translation": "Artista",
      "example": "Ejemplo con \"Artist\"."
    },
    {
      "word": "Literature",
      "translation": "Literatura",
      "example": "Ejemplo con \"Literature\"."
    },
    {
      "word": "Debate",
      "translation": "Debate",
      "example": "Ejemplo con \"Debate\"."
    },
    {
      "word": "Negotiation",
      "translation": "Negociación",
      "example": "Ejemplo con \"Negotiation\"."
    },
    {
      "word": "Strategy",
      "translation": "Estrategia",
      "example": "Ejemplo con \"Strategy\"."
    },
    {
      "word": "Leadership",
      "translation": "Liderazgo",
      "example": "Ejemplo con \"Leadership\"."
    },
    {
      "word": "Innovation",
      "translation": "Innovación",
      "example": "Ejemplo con \"Innovation\"."
    },
    {
      "word": "Global",
      "translation": "Global",
      "example": "Ejemplo con \"Global\"."
    },
    {
      "word": "Challenge",
      "translation": "Desafío",
      "example": "Ejemplo con \"Challenge\"."
    }
  ],
  "en-lv4-le4": [
    {
      "word": "Achievement",
      "translation": "Logro",
      "example": "Ejemplo con \"Achievement\"."
    },
    {
      "word": "Perspective",
      "translation": "Perspectiva",
      "example": "Ejemplo con \"Perspective\"."
    },
    {
      "word": "Analysis",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analysis\"."
    },
    {
      "word": "Today",
      "translation": "Hoy",
      "example": "Ejemplo con \"Today\"."
    },
    {
      "word": "Tomorrow",
      "translation": "Mañana",
      "example": "Ejemplo con \"Tomorrow\"."
    },
    {
      "word": "Week",
      "translation": "Semana",
      "example": "Ejemplo con \"Week\"."
    },
    {
      "word": "Month",
      "translation": "Mes",
      "example": "Ejemplo con \"Month\"."
    },
    {
      "word": "Year",
      "translation": "Año",
      "example": "Ejemplo con \"Year\"."
    },
    {
      "word": "Hour",
      "translation": "Hora",
      "example": "Ejemplo con \"Hour\"."
    },
    {
      "word": "Minute",
      "translation": "Minuto",
      "example": "Ejemplo con \"Minute\"."
    }
  ],
  "en-lv4-le5": [
    {
      "word": "Grandmother",
      "translation": "Abuela",
      "example": "Ejemplo con \"Grandmother\"."
    },
    {
      "word": "Grandfather",
      "translation": "Abuelo",
      "example": "Ejemplo con \"Grandfather\"."
    },
    {
      "word": "Parents",
      "translation": "Padres",
      "example": "Ejemplo con \"Parents\"."
    },
    {
      "word": "Children",
      "translation": "Hijos",
      "example": "Ejemplo con \"Children\"."
    },
    {
      "word": "Husband",
      "translation": "Esposo",
      "example": "Ejemplo con \"Husband\"."
    },
    {
      "word": "Wife",
      "translation": "Esposa",
      "example": "Ejemplo con \"Wife\"."
    },
    {
      "word": "Cousin",
      "translation": "Primo/a",
      "example": "Ejemplo con \"Cousin\"."
    },
    {
      "word": "Ten",
      "translation": "Diez",
      "example": "Ejemplo con \"Ten\"."
    },
    {
      "word": "Second",
      "translation": "Segundo",
      "example": "Ejemplo con \"Second\"."
    },
    {
      "word": "Time",
      "translation": "Tiempo",
      "example": "Ejemplo con \"Time\"."
    }
  ],
  "en-lv4-le6": [
    {
      "word": "Gray",
      "translation": "Gris",
      "example": "Ejemplo con \"Gray\"."
    },
    {
      "word": "Gold",
      "translation": "Dorado",
      "example": "Ejemplo con \"Gold\"."
    },
    {
      "word": "Never",
      "translation": "Nunca",
      "example": "Ejemplo con \"Never\"."
    },
    {
      "word": "Bonjour",
      "translation": "Bonjour",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "News",
      "translation": "Noticias",
      "example": "Ejemplo con \"News\"."
    },
    {
      "word": "Policy",
      "translation": "Política",
      "example": "Ejemplo con \"Policy\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    }
  ],
  "en-lv5-le1": [
    {
      "word": "Bonjour",
      "translation": "Bonjour",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "News",
      "translation": "Noticias",
      "example": "Ejemplo con \"News\"."
    },
    {
      "word": "Policy",
      "translation": "Política",
      "example": "Ejemplo con \"Policy\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Research",
      "translation": "Investigación",
      "example": "Ejemplo con \"Research\"."
    },
    {
      "word": "Discovery",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Discovery\"."
    },
    {
      "word": "Analysis",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analysis\"."
    }
  ],
  "en-lv5-le2": [
    {
      "word": "Bonjour",
      "translation": "Bonjour",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "News",
      "translation": "Noticias",
      "example": "Ejemplo con \"News\"."
    },
    {
      "word": "Policy",
      "translation": "Política",
      "example": "Ejemplo con \"Policy\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Research",
      "translation": "Investigación",
      "example": "Ejemplo con \"Research\"."
    },
    {
      "word": "Discovery",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Discovery\"."
    },
    {
      "word": "Analysis",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analysis\"."
    }
  ],
  "en-lv5-le3": [
    {
      "word": "Bonjour",
      "translation": "Bonjour",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "News",
      "translation": "Noticias",
      "example": "Ejemplo con \"News\"."
    },
    {
      "word": "Policy",
      "translation": "Política",
      "example": "Ejemplo con \"Policy\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Research",
      "translation": "Investigación",
      "example": "Ejemplo con \"Research\"."
    },
    {
      "word": "Discovery",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Discovery\"."
    },
    {
      "word": "Analysis",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analysis\"."
    }
  ],
  "en-lv5-le4": [
    {
      "word": "Bonjour",
      "translation": "Bonjour",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "News",
      "translation": "Noticias",
      "example": "Ejemplo con \"News\"."
    },
    {
      "word": "Policy",
      "translation": "Política",
      "example": "Ejemplo con \"Policy\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Research",
      "translation": "Investigación",
      "example": "Ejemplo con \"Research\"."
    },
    {
      "word": "Discovery",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Discovery\"."
    },
    {
      "word": "Analysis",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analysis\"."
    }
  ],
  "en-lv5-le5": [
    {
      "word": "Bonjour",
      "translation": "Bonjour",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "News",
      "translation": "Noticias",
      "example": "Ejemplo con \"News\"."
    },
    {
      "word": "Policy",
      "translation": "Política",
      "example": "Ejemplo con \"Policy\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Research",
      "translation": "Investigación",
      "example": "Ejemplo con \"Research\"."
    },
    {
      "word": "Discovery",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Discovery\"."
    },
    {
      "word": "Analysis",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analysis\"."
    }
  ],
  "en-lv5-le6": [
    {
      "word": "Bonjour",
      "translation": "Bonjour",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "News",
      "translation": "Noticias",
      "example": "Ejemplo con \"News\"."
    },
    {
      "word": "Policy",
      "translation": "Política",
      "example": "Ejemplo con \"Policy\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Research",
      "translation": "Investigación",
      "example": "Ejemplo con \"Research\"."
    },
    {
      "word": "Discovery",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Discovery\"."
    },
    {
      "word": "Analysis",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analysis\"."
    }
  ],
  "fr-lv1-le1": [
    {
      "word": "Bonjour",
      "translation": "Hola",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Au revoir",
      "translation": "Adiós",
      "example": "Ejemplo con \"Au revoir\"."
    },
    {
      "word": "Merci",
      "translation": "Gracias",
      "example": "Ejemplo con \"Merci\"."
    },
    {
      "word": "S'il vous plaît",
      "translation": "Por favor",
      "example": "Ejemplo con \"S'il vous plaît\"."
    },
    {
      "word": "Oui",
      "translation": "Sí",
      "example": "Ejemplo con \"Oui\"."
    },
    {
      "word": "Non",
      "translation": "No",
      "example": "Ejemplo con \"Non\"."
    },
    {
      "word": "Pardon",
      "translation": "Perdón",
      "example": "Ejemplo con \"Pardon\"."
    },
    {
      "word": "Bienvenue",
      "translation": "Bienvenido",
      "example": "Ejemplo con \"Bienvenue\"."
    },
    {
      "word": "Bon",
      "translation": "Barato",
      "example": "Ejemplo con \"Bon\"."
    },
    {
      "word": "Matin",
      "translation": "Mañana",
      "example": "Ejemplo con \"Matin\"."
    }
  ],
  "fr-lv1-le2": [
    {
      "word": "Nom",
      "translation": "Nombre",
      "example": "Ejemplo con \"Nom\"."
    },
    {
      "word": "Âge",
      "translation": "Edad",
      "example": "Ejemplo con \"Âge\"."
    },
    {
      "word": "Pays",
      "translation": "País",
      "example": "Ejemplo con \"Pays\"."
    },
    {
      "word": "Ville",
      "translation": "Ciudad",
      "example": "Ejemplo con \"Ville\"."
    },
    {
      "word": "Travail",
      "translation": "Trabajo",
      "example": "Ejemplo con \"Travail\"."
    },
    {
      "word": "Étudiant",
      "translation": "Estudiante",
      "example": "Ejemplo con \"Étudiant\"."
    },
    {
      "word": "Professeur",
      "translation": "Profesor/a",
      "example": "Ejemplo con \"Professeur\"."
    },
    {
      "word": "Ami",
      "translation": "Amigo/a",
      "example": "Ejemplo con \"Ami\"."
    },
    {
      "word": "Langue",
      "translation": "Idioma",
      "example": "Ejemplo con \"Langue\"."
    },
    {
      "word": "Adresse",
      "translation": "Dirección",
      "example": "Ejemplo con \"Adresse\"."
    }
  ],
  "fr-lv1-le3": [
    {
      "word": "Un",
      "translation": "Uno",
      "example": "Ejemplo con \"Un\"."
    },
    {
      "word": "Deux",
      "translation": "Dos",
      "example": "Ejemplo con \"Deux\"."
    },
    {
      "word": "Trois",
      "translation": "Tres",
      "example": "Ejemplo con \"Trois\"."
    },
    {
      "word": "Quatre",
      "translation": "Cuatro",
      "example": "Ejemplo con \"Quatre\"."
    },
    {
      "word": "Cinq",
      "translation": "Cinco",
      "example": "Ejemplo con \"Cinq\"."
    },
    {
      "word": "Six",
      "translation": "Seis",
      "example": "Ejemplo con \"Six\"."
    },
    {
      "word": "Sept",
      "translation": "Siete",
      "example": "Ejemplo con \"Sept\"."
    },
    {
      "word": "Huit",
      "translation": "Ocho",
      "example": "Ejemplo con \"Huit\"."
    },
    {
      "word": "Neuf",
      "translation": "Nueve",
      "example": "Ejemplo con \"Neuf\"."
    },
    {
      "word": "Dix",
      "translation": "Diez",
      "example": "Ejemplo con \"Dix\"."
    }
  ],
  "fr-lv1-le4": [
    {
      "word": "Mère",
      "translation": "Madre",
      "example": "Ejemplo con \"Mère\"."
    },
    {
      "word": "Père",
      "translation": "Padre",
      "example": "Ejemplo con \"Père\"."
    },
    {
      "word": "Sœur",
      "translation": "Hermana",
      "example": "Ejemplo con \"Sœur\"."
    },
    {
      "word": "Frère",
      "translation": "Hermano",
      "example": "Ejemplo con \"Frère\"."
    },
    {
      "word": "Bébé",
      "translation": "Bebé",
      "example": "Ejemplo con \"Bébé\"."
    },
    {
      "word": "Famille",
      "translation": "Familia",
      "example": "Ejemplo con \"Famille\"."
    },
    {
      "word": "Fils",
      "translation": "Hijo",
      "example": "Ejemplo con \"Fils\"."
    },
    {
      "word": "Fille",
      "translation": "Hija",
      "example": "Ejemplo con \"Fille\"."
    },
    {
      "word": "Oncle",
      "translation": "Tío",
      "example": "Ejemplo con \"Oncle\"."
    },
    {
      "word": "Tante",
      "translation": "Tía",
      "example": "Ejemplo con \"Tante\"."
    }
  ],
  "fr-lv1-le5": [
    {
      "word": "Rouge",
      "translation": "Rojo",
      "example": "Ejemplo con \"Rouge\"."
    },
    {
      "word": "Bleu",
      "translation": "Azul",
      "example": "Ejemplo con \"Bleu\"."
    },
    {
      "word": "Vert",
      "translation": "Verde",
      "example": "Ejemplo con \"Vert\"."
    },
    {
      "word": "Jaune",
      "translation": "Amarillo",
      "example": "Ejemplo con \"Jaune\"."
    },
    {
      "word": "Noir",
      "translation": "Negro",
      "example": "Ejemplo con \"Noir\"."
    },
    {
      "word": "Blanc",
      "translation": "Blanco",
      "example": "Ejemplo con \"Blanc\"."
    },
    {
      "word": "Rose",
      "translation": "Rosa",
      "example": "Ejemplo con \"Rose\"."
    },
    {
      "word": "Marron",
      "translation": "Marrón",
      "example": "Ejemplo con \"Marron\"."
    },
    {
      "word": "Orange",
      "translation": "Naranja",
      "example": "Ejemplo con \"Orange\"."
    },
    {
      "word": "Violet",
      "translation": "Morado",
      "example": "Ejemplo con \"Violet\"."
    }
  ],
  "fr-lv1-le6": [
    {
      "word": "Quoi",
      "translation": "Qué",
      "example": "Ejemplo con \"Quoi\"."
    },
    {
      "word": "Où",
      "translation": "Dónde",
      "example": "Ejemplo con \"Où\"."
    },
    {
      "word": "Quand",
      "translation": "Cuándo",
      "example": "Ejemplo con \"Quand\"."
    },
    {
      "word": "Pourquoi",
      "translation": "Por qué",
      "example": "Ejemplo con \"Pourquoi\"."
    },
    {
      "word": "Comment",
      "translation": "Cómo",
      "example": "Ejemplo con \"Comment\"."
    },
    {
      "word": "Qui",
      "translation": "Quién",
      "example": "Ejemplo con \"Qui\"."
    },
    {
      "word": "Quel",
      "translation": "Cuál",
      "example": "Ejemplo con \"Quel\"."
    },
    {
      "word": "Combien",
      "translation": "Cuánto",
      "example": "Ejemplo con \"Combien\"."
    },
    {
      "word": "Toujours",
      "translation": "Siempre",
      "example": "Ejemplo con \"Toujours\"."
    },
    {
      "word": "Jamais",
      "translation": "Nunca",
      "example": "Ejemplo con \"Jamais\"."
    }
  ],
  "fr-lv2-le1": [
    {
      "word": "Magasin",
      "translation": "Tienda",
      "example": "Ejemplo con \"Magasin\"."
    },
    {
      "word": "Prix",
      "translation": "Precio",
      "example": "Ejemplo con \"Prix\"."
    },
    {
      "word": "Pain",
      "translation": "Pan",
      "example": "Ejemplo con \"Pain\"."
    },
    {
      "word": "Eau",
      "translation": "Agua",
      "example": "Ejemplo con \"Eau\"."
    },
    {
      "word": "Marché",
      "translation": "Mercado",
      "example": "Ejemplo con \"Marché\"."
    },
    {
      "word": "Argent",
      "translation": "Dinero",
      "example": "Ejemplo con \"Argent\"."
    },
    {
      "word": "Bon",
      "translation": "Barato",
      "example": "Ejemplo con \"Bon\"."
    },
    {
      "word": "Cher",
      "translation": "Caro",
      "example": "Ejemplo con \"Cher\"."
    },
    {
      "word": "Café",
      "translation": "Café",
      "example": "Ejemplo con \"Café\"."
    },
    {
      "word": "Lait",
      "translation": "Leche",
      "example": "Ejemplo con \"Lait\"."
    }
  ],
  "fr-lv2-le2": [
    {
      "word": "Sucre",
      "translation": "Azúcar",
      "example": "Ejemplo con \"Sucre\"."
    },
    {
      "word": "Sel",
      "translation": "Sal",
      "example": "Ejemplo con \"Sel\"."
    },
    {
      "word": "Riz",
      "translation": "Arroz",
      "example": "Ejemplo con \"Riz\"."
    },
    {
      "word": "Viande",
      "translation": "Carne",
      "example": "Ejemplo con \"Viande\"."
    },
    {
      "word": "Poisson",
      "translation": "Pescado",
      "example": "Ejemplo con \"Poisson\"."
    },
    {
      "word": "Fruit",
      "translation": "Fruta",
      "example": "Ejemplo con \"Fruit\"."
    },
    {
      "word": "Légume",
      "translation": "Verdura",
      "example": "Ejemplo con \"Légume\"."
    },
    {
      "word": "Petit",
      "translation": "Desayuno",
      "example": "Ejemplo con \"Petit\"."
    },
    {
      "word": "Déjeuner",
      "translation": "Almuerzo",
      "example": "Ejemplo con \"Déjeuner\"."
    },
    {
      "word": "Dîner",
      "translation": "Cena",
      "example": "Ejemplo con \"Dîner\"."
    }
  ],
  "fr-lv2-le3": [
    {
      "word": "Cuisine",
      "translation": "Cocina",
      "example": "Ejemplo con \"Cuisine\"."
    },
    {
      "word": "Chambre",
      "translation": "Dormitorio",
      "example": "Ejemplo con \"Chambre\"."
    },
    {
      "word": "Salle",
      "translation": "Baño",
      "example": "Ejemplo con \"Salle\"."
    },
    {
      "word": "Fenêtre",
      "translation": "Ventana",
      "example": "Ejemplo con \"Fenêtre\"."
    },
    {
      "word": "Porte",
      "translation": "Puerta",
      "example": "Ejemplo con \"Porte\"."
    },
    {
      "word": "Table",
      "translation": "Mesa",
      "example": "Ejemplo con \"Table\"."
    },
    {
      "word": "Chaise",
      "translation": "Silla",
      "example": "Ejemplo con \"Chaise\"."
    },
    {
      "word": "Maison",
      "translation": "Casa",
      "example": "Ejemplo con \"Maison\"."
    },
    {
      "word": "Soleil",
      "translation": "Sol",
      "example": "Ejemplo con \"Soleil\"."
    },
    {
      "word": "Pluie",
      "translation": "Lluvia",
      "example": "Ejemplo con \"Pluie\"."
    }
  ],
  "fr-lv2-le4": [
    {
      "word": "Chemise",
      "translation": "Camisa",
      "example": "Ejemplo con \"Chemise\"."
    },
    {
      "word": "Pantalon",
      "translation": "Pantalón",
      "example": "Ejemplo con \"Pantalon\"."
    },
    {
      "word": "Chaussures",
      "translation": "Zapatos",
      "example": "Ejemplo con \"Chaussures\"."
    },
    {
      "word": "Chapeau",
      "translation": "Sombrero",
      "example": "Ejemplo con \"Chapeau\"."
    },
    {
      "word": "Corps",
      "translation": "Cuerpo",
      "example": "Ejemplo con \"Corps\"."
    },
    {
      "word": "Tête",
      "translation": "Cabeza",
      "example": "Ejemplo con \"Tête\"."
    },
    {
      "word": "Main",
      "translation": "Mano",
      "example": "Ejemplo con \"Main\"."
    },
    {
      "word": "Pied",
      "translation": "Pie",
      "example": "Ejemplo con \"Pied\"."
    },
    {
      "word": "Cœur",
      "translation": "Corazón",
      "example": "Ejemplo con \"Cœur\"."
    },
    {
      "word": "Bus",
      "translation": "Autobús",
      "example": "Ejemplo con \"Bus\"."
    }
  ],
  "fr-lv2-le5": [
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Aéroport",
      "translation": "Aeropuerto",
      "example": "Ejemplo con \"Aéroport\"."
    },
    {
      "word": "Billet",
      "translation": "Boleto",
      "example": "Ejemplo con \"Billet\"."
    },
    {
      "word": "Route",
      "translation": "Carretera",
      "example": "Ejemplo con \"Route\"."
    },
    {
      "word": "Pont",
      "translation": "Puente",
      "example": "Ejemplo con \"Pont\"."
    },
    {
      "word": "Nuage",
      "translation": "Nube",
      "example": "Ejemplo con \"Nuage\"."
    },
    {
      "word": "Vent",
      "translation": "Viento",
      "example": "Ejemplo con \"Vent\"."
    },
    {
      "word": "Neige",
      "translation": "Nieve",
      "example": "Ejemplo con \"Neige\"."
    },
    {
      "word": "Météo",
      "translation": "Clima",
      "example": "Ejemplo con \"Météo\"."
    }
  ],
  "fr-lv2-le6": [
    {
      "word": "Chaud",
      "translation": "Caliente",
      "example": "Ejemplo con \"Chaud\"."
    },
    {
      "word": "Froid",
      "translation": "Frío",
      "example": "Ejemplo con \"Froid\"."
    },
    {
      "word": "Passeport",
      "translation": "Pasaporte",
      "example": "Ejemplo con \"Passeport\"."
    },
    {
      "word": "Hôtel",
      "translation": "Hotel",
      "example": "Ejemplo con \"Hôtel\"."
    },
    {
      "word": "Carte",
      "translation": "Mapa",
      "example": "Ejemplo con \"Carte\"."
    },
    {
      "word": "Bagage",
      "translation": "Equipaje",
      "example": "Ejemplo con \"Bagage\"."
    },
    {
      "word": "Médecin",
      "translation": "Médico",
      "example": "Ejemplo con \"Médecin\"."
    },
    {
      "word": "Infirmière",
      "translation": "Enfermera",
      "example": "Ejemplo con \"Infirmière\"."
    },
    {
      "word": "Médicament",
      "translation": "Medicina",
      "example": "Ejemplo con \"Médicament\"."
    },
    {
      "word": "Hôpital",
      "translation": "Hospital",
      "example": "Ejemplo con \"Hôpital\"."
    }
  ],
  "fr-lv3-le1": [
    {
      "word": "Douleur",
      "translation": "Dolor",
      "example": "Ejemplo con \"Douleur\"."
    },
    {
      "word": "Réunion",
      "translation": "Reunión",
      "example": "Ejemplo con \"Réunion\"."
    },
    {
      "word": "Salaire",
      "translation": "Salario",
      "example": "Ejemplo con \"Salaire\"."
    },
    {
      "word": "Chef",
      "translation": "Jefe",
      "example": "Ejemplo con \"Chef\"."
    },
    {
      "word": "Équipe",
      "translation": "Equipo",
      "example": "Ejemplo con \"Équipe\"."
    },
    {
      "word": "Projet",
      "translation": "Proyecto",
      "example": "Ejemplo con \"Projet\"."
    },
    {
      "word": "Courriel",
      "translation": "Correo",
      "example": "Ejemplo con \"Courriel\"."
    },
    {
      "word": "Bureau",
      "translation": "Oficina",
      "example": "Ejemplo con \"Bureau\"."
    },
    {
      "word": "Musique",
      "translation": "Música",
      "example": "Ejemplo con \"Musique\"."
    },
    {
      "word": "Heureux",
      "translation": "Feliz",
      "example": "Ejemplo con \"Heureux\"."
    }
  ],
  "fr-lv3-le2": [
    {
      "word": "Guitare",
      "translation": "Guitarra",
      "example": "Ejemplo con \"Guitare\"."
    },
    {
      "word": "Sport",
      "translation": "Deporte",
      "example": "Ejemplo con \"Sport\"."
    },
    {
      "word": "Livre",
      "translation": "Libro",
      "example": "Ejemplo con \"Livre\"."
    },
    {
      "word": "Film",
      "translation": "Película",
      "example": "Ejemplo con \"Film\"."
    },
    {
      "word": "Danse",
      "translation": "Baile",
      "example": "Ejemplo con \"Danse\"."
    },
    {
      "word": "Jeu",
      "translation": "Juego",
      "example": "Ejemplo con \"Jeu\"."
    },
    {
      "word": "Triste",
      "translation": "Triste",
      "example": "Ejemplo con \"Triste\"."
    },
    {
      "word": "Fâché",
      "translation": "Enojado",
      "example": "Ejemplo con \"Fâché\"."
    },
    {
      "word": "Amour",
      "translation": "Amor",
      "example": "Ejemplo con \"Amour\"."
    },
    {
      "word": "Peur",
      "translation": "Miedo",
      "example": "Ejemplo con \"Peur\"."
    }
  ],
  "fr-lv3-le3": [
    {
      "word": "Espoir",
      "translation": "Esperanza",
      "example": "Ejemplo con \"Espoir\"."
    },
    {
      "word": "Joie",
      "translation": "Alegría",
      "example": "Ejemplo con \"Joie\"."
    },
    {
      "word": "Internet",
      "translation": "Internet",
      "example": "Ejemplo con \"Internet\"."
    },
    {
      "word": "Ordinateur",
      "translation": "Computadora",
      "example": "Ejemplo con \"Ordinateur\"."
    },
    {
      "word": "Logiciel",
      "translation": "Software",
      "example": "Ejemplo con \"Logiciel\"."
    },
    {
      "word": "Site",
      "translation": "Sitio web",
      "example": "Ejemplo con \"Site\"."
    },
    {
      "word": "Nouvelles",
      "translation": "Noticias",
      "example": "Ejemplo con \"Nouvelles\"."
    },
    {
      "word": "Message",
      "translation": "Mensaje",
      "example": "Ejemplo con \"Message\"."
    },
    {
      "word": "Téléphone",
      "translation": "Teléfono",
      "example": "Ejemplo con \"Téléphone\"."
    },
    {
      "word": "Penser",
      "translation": "Pensar",
      "example": "Ejemplo con \"Penser\"."
    }
  ],
  "fr-lv3-le4": [
    {
      "word": "Nature",
      "translation": "Naturaleza",
      "example": "Ejemplo con \"Nature\"."
    },
    {
      "word": "Pollution",
      "translation": "Contaminación",
      "example": "Ejemplo con \"Pollution\"."
    },
    {
      "word": "Forêt",
      "translation": "Bosque",
      "example": "Ejemplo con \"Forêt\"."
    },
    {
      "word": "Rivière",
      "translation": "Río",
      "example": "Ejemplo con \"Rivière\"."
    },
    {
      "word": "Océan",
      "translation": "Océano",
      "example": "Ejemplo con \"Océan\"."
    },
    {
      "word": "Énergie",
      "translation": "Energía",
      "example": "Ejemplo con \"Énergie\"."
    },
    {
      "word": "Climat",
      "translation": "Clima",
      "example": "Ejemplo con \"Climat\"."
    },
    {
      "word": "Fête",
      "translation": "Fiesta",
      "example": "Ejemplo con \"Fête\"."
    },
    {
      "word": "Université",
      "translation": "Universidad",
      "example": "Ejemplo con \"Université\"."
    },
    {
      "word": "Conversation",
      "translation": "Conversación",
      "example": "Ejemplo con \"Conversation\"."
    }
  ],
  "fr-lv3-le5": [
    {
      "word": "Opinion",
      "translation": "Opinión",
      "example": "Ejemplo con \"Opinion\"."
    },
    {
      "word": "Accord",
      "translation": "De acuerdo",
      "example": "Ejemplo con \"Accord\"."
    },
    {
      "word": "Désaccord",
      "translation": "En desacuerdo",
      "example": "Ejemplo con \"Désaccord\"."
    },
    {
      "word": "Peut",
      "translation": "Quizás",
      "example": "Ejemplo con \"Peut\"."
    },
    {
      "word": "Certainement",
      "translation": "Ciertamente",
      "example": "Ejemplo con \"Certainement\"."
    },
    {
      "word": "Mariage",
      "translation": "Boda",
      "example": "Ejemplo con \"Mariage\"."
    },
    {
      "word": "Festival",
      "translation": "Festival",
      "example": "Ejemplo con \"Festival\"."
    },
    {
      "word": "Concert",
      "translation": "Concierto",
      "example": "Ejemplo con \"Concert\"."
    },
    {
      "word": "Anniversaire",
      "translation": "Cumpleaños",
      "example": "Ejemplo con \"Anniversaire\"."
    },
    {
      "word": "Vacances",
      "translation": "Vacaciones",
      "example": "Ejemplo con \"Vacances\"."
    }
  ],
  "fr-lv3-le6": [
    {
      "word": "Histoire",
      "translation": "Historia",
      "example": "Ejemplo con \"Histoire\"."
    },
    {
      "word": "Science",
      "translation": "Ciencia",
      "example": "Ejemplo con \"Science\"."
    },
    {
      "word": "Maths",
      "translation": "Matemáticas",
      "example": "Ejemplo con \"Maths\"."
    },
    {
      "word": "Examen",
      "translation": "Examen",
      "example": "Ejemplo con \"Examen\"."
    },
    {
      "word": "Devoir",
      "translation": "Tarea",
      "example": "Ejemplo con \"Devoir\"."
    },
    {
      "word": "Classe",
      "translation": "Clase",
      "example": "Ejemplo con \"Classe\"."
    },
    {
      "word": "Lettre",
      "translation": "Carta",
      "example": "Ejemplo con \"Lettre\"."
    },
    {
      "word": "Appel",
      "translation": "Llamada",
      "example": "Ejemplo con \"Appel\"."
    },
    {
      "word": "Réponse",
      "translation": "Respuesta",
      "example": "Ejemplo con \"Réponse\"."
    },
    {
      "word": "Question",
      "translation": "Pregunta",
      "example": "Ejemplo con \"Question\"."
    }
  ],
  "fr-lv4-le1": [
    {
      "word": "Entreprise",
      "translation": "Empresa",
      "example": "Ejemplo con \"Entreprise\"."
    },
    {
      "word": "Tradition",
      "translation": "Tradición",
      "example": "Ejemplo con \"Tradition\"."
    },
    {
      "word": "Politique",
      "translation": "Política",
      "example": "Ejemplo con \"Politique\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Société",
      "translation": "Sociedad",
      "example": "Ejemplo con \"Société\"."
    },
    {
      "word": "Économie",
      "translation": "Economía",
      "example": "Ejemplo con \"Économie\"."
    },
    {
      "word": "Loi",
      "translation": "Ley",
      "example": "Ejemplo con \"Loi\"."
    },
    {
      "word": "Liberté",
      "translation": "Libertad",
      "example": "Ejemplo con \"Liberté\"."
    },
    {
      "word": "Marché",
      "translation": "Mercado",
      "example": "Ejemplo con \"Marché\"."
    },
    {
      "word": "Argument",
      "translation": "Argumento",
      "example": "Ejemplo con \"Argument\"."
    }
  ],
  "fr-lv4-le2": [
    {
      "word": "Recherche",
      "translation": "Investigación",
      "example": "Ejemplo con \"Recherche\"."
    },
    {
      "word": "Découverte",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Découverte\"."
    },
    {
      "word": "Laboratoire",
      "translation": "Laboratorio",
      "example": "Ejemplo con \"Laboratoire\"."
    },
    {
      "word": "Théorie",
      "translation": "Teoría",
      "example": "Ejemplo con \"Théorie\"."
    },
    {
      "word": "Données",
      "translation": "Datos",
      "example": "Ejemplo con \"Données\"."
    },
    {
      "word": "Expérience",
      "translation": "Experimento",
      "example": "Ejemplo con \"Expérience\"."
    },
    {
      "word": "Poésie",
      "translation": "Poesía",
      "example": "Ejemplo con \"Poésie\"."
    },
    {
      "word": "Peinture",
      "translation": "Pintura",
      "example": "Ejemplo con \"Peinture\"."
    },
    {
      "word": "Sculpture",
      "translation": "Escultura",
      "example": "Ejemplo con \"Sculpture\"."
    },
    {
      "word": "Roman",
      "translation": "Novela",
      "example": "Ejemplo con \"Roman\"."
    }
  ],
  "fr-lv4-le3": [
    {
      "word": "Théâtre",
      "translation": "Teatro",
      "example": "Ejemplo con \"Théâtre\"."
    },
    {
      "word": "Artiste",
      "translation": "Artista",
      "example": "Ejemplo con \"Artiste\"."
    },
    {
      "word": "Littérature",
      "translation": "Literatura",
      "example": "Ejemplo con \"Littérature\"."
    },
    {
      "word": "Débat",
      "translation": "Debate",
      "example": "Ejemplo con \"Débat\"."
    },
    {
      "word": "Négociation",
      "translation": "Negociación",
      "example": "Ejemplo con \"Négociation\"."
    },
    {
      "word": "Stratégie",
      "translation": "Estrategia",
      "example": "Ejemplo con \"Stratégie\"."
    },
    {
      "word": "Leadership",
      "translation": "Liderazgo",
      "example": "Ejemplo con \"Leadership\"."
    },
    {
      "word": "Innovation",
      "translation": "Innovación",
      "example": "Ejemplo con \"Innovation\"."
    },
    {
      "word": "Global",
      "translation": "Global",
      "example": "Ejemplo con \"Global\"."
    },
    {
      "word": "Défi",
      "translation": "Desafío",
      "example": "Ejemplo con \"Défi\"."
    }
  ],
  "fr-lv4-le4": [
    {
      "word": "Réussite",
      "translation": "Logro",
      "example": "Ejemplo con \"Réussite\"."
    },
    {
      "word": "Perspective",
      "translation": "Perspectiva",
      "example": "Ejemplo con \"Perspective\"."
    },
    {
      "word": "Analyse",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analyse\"."
    },
    {
      "word": "Aujourd'hui",
      "translation": "Hoy",
      "example": "Ejemplo con \"Aujourd'hui\"."
    },
    {
      "word": "Demain",
      "translation": "Mañana",
      "example": "Ejemplo con \"Demain\"."
    },
    {
      "word": "Semaine",
      "translation": "Semana",
      "example": "Ejemplo con \"Semaine\"."
    },
    {
      "word": "Mois",
      "translation": "Mes",
      "example": "Ejemplo con \"Mois\"."
    },
    {
      "word": "Année",
      "translation": "Año",
      "example": "Ejemplo con \"Année\"."
    },
    {
      "word": "Heure",
      "translation": "Hora",
      "example": "Ejemplo con \"Heure\"."
    },
    {
      "word": "Minute",
      "translation": "Minuto",
      "example": "Ejemplo con \"Minute\"."
    }
  ],
  "fr-lv4-le5": [
    {
      "word": "Grandmère",
      "translation": "Abuela",
      "example": "Ejemplo con \"Grandmère\"."
    },
    {
      "word": "Grandpère",
      "translation": "Abuelo",
      "example": "Ejemplo con \"Grandpère\"."
    },
    {
      "word": "Parents",
      "translation": "Padres",
      "example": "Ejemplo con \"Parents\"."
    },
    {
      "word": "Enfants",
      "translation": "Hijos",
      "example": "Ejemplo con \"Enfants\"."
    },
    {
      "word": "Mari",
      "translation": "Esposo",
      "example": "Ejemplo con \"Mari\"."
    },
    {
      "word": "Femme",
      "translation": "Esposa",
      "example": "Ejemplo con \"Femme\"."
    },
    {
      "word": "Cousin",
      "translation": "Primo/a",
      "example": "Ejemplo con \"Cousin\"."
    },
    {
      "word": "Dix",
      "translation": "Diez",
      "example": "Ejemplo con \"Dix\"."
    },
    {
      "word": "Seconde",
      "translation": "Segundo",
      "example": "Ejemplo con \"Seconde\"."
    },
    {
      "word": "Temps",
      "translation": "Tiempo",
      "example": "Ejemplo con \"Temps\"."
    }
  ],
  "fr-lv4-le6": [
    {
      "word": "Gris",
      "translation": "Gris",
      "example": "Ejemplo con \"Gris\"."
    },
    {
      "word": "Or",
      "translation": "Dorado",
      "example": "Ejemplo con \"Or\"."
    },
    {
      "word": "Doit",
      "translation": "Debe",
      "example": "Ejemplo con \"Doit\"."
    },
    {
      "word": "Peut",
      "translation": "Quizás",
      "example": "Ejemplo con \"Peut\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Courriel",
      "translation": "Correo",
      "example": "Ejemplo con \"Courriel\"."
    },
    {
      "word": "Nouvelles",
      "translation": "Noticias",
      "example": "Ejemplo con \"Nouvelles\"."
    },
    {
      "word": "Politique",
      "translation": "Política",
      "example": "Ejemplo con \"Politique\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    }
  ],
  "fr-lv5-le1": [
    {
      "word": "Bonjour",
      "translation": "Hola",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Courriel",
      "translation": "Correo",
      "example": "Ejemplo con \"Courriel\"."
    },
    {
      "word": "Nouvelles",
      "translation": "Noticias",
      "example": "Ejemplo con \"Nouvelles\"."
    },
    {
      "word": "Politique",
      "translation": "Política",
      "example": "Ejemplo con \"Politique\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Recherche",
      "translation": "Investigación",
      "example": "Ejemplo con \"Recherche\"."
    },
    {
      "word": "Découverte",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Découverte\"."
    },
    {
      "word": "Analyse",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analyse\"."
    }
  ],
  "fr-lv5-le2": [
    {
      "word": "Bonjour",
      "translation": "Hola",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Courriel",
      "translation": "Correo",
      "example": "Ejemplo con \"Courriel\"."
    },
    {
      "word": "Nouvelles",
      "translation": "Noticias",
      "example": "Ejemplo con \"Nouvelles\"."
    },
    {
      "word": "Politique",
      "translation": "Política",
      "example": "Ejemplo con \"Politique\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Recherche",
      "translation": "Investigación",
      "example": "Ejemplo con \"Recherche\"."
    },
    {
      "word": "Découverte",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Découverte\"."
    },
    {
      "word": "Analyse",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analyse\"."
    }
  ],
  "fr-lv5-le3": [
    {
      "word": "Bonjour",
      "translation": "Hola",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Courriel",
      "translation": "Correo",
      "example": "Ejemplo con \"Courriel\"."
    },
    {
      "word": "Nouvelles",
      "translation": "Noticias",
      "example": "Ejemplo con \"Nouvelles\"."
    },
    {
      "word": "Politique",
      "translation": "Política",
      "example": "Ejemplo con \"Politique\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Recherche",
      "translation": "Investigación",
      "example": "Ejemplo con \"Recherche\"."
    },
    {
      "word": "Découverte",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Découverte\"."
    },
    {
      "word": "Analyse",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analyse\"."
    }
  ],
  "fr-lv5-le4": [
    {
      "word": "Bonjour",
      "translation": "Hola",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Courriel",
      "translation": "Correo",
      "example": "Ejemplo con \"Courriel\"."
    },
    {
      "word": "Nouvelles",
      "translation": "Noticias",
      "example": "Ejemplo con \"Nouvelles\"."
    },
    {
      "word": "Politique",
      "translation": "Política",
      "example": "Ejemplo con \"Politique\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Recherche",
      "translation": "Investigación",
      "example": "Ejemplo con \"Recherche\"."
    },
    {
      "word": "Découverte",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Découverte\"."
    },
    {
      "word": "Analyse",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analyse\"."
    }
  ],
  "fr-lv5-le5": [
    {
      "word": "Bonjour",
      "translation": "Hola",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Courriel",
      "translation": "Correo",
      "example": "Ejemplo con \"Courriel\"."
    },
    {
      "word": "Nouvelles",
      "translation": "Noticias",
      "example": "Ejemplo con \"Nouvelles\"."
    },
    {
      "word": "Politique",
      "translation": "Política",
      "example": "Ejemplo con \"Politique\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Recherche",
      "translation": "Investigación",
      "example": "Ejemplo con \"Recherche\"."
    },
    {
      "word": "Découverte",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Découverte\"."
    },
    {
      "word": "Analyse",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analyse\"."
    }
  ],
  "fr-lv5-le6": [
    {
      "word": "Bonjour",
      "translation": "Hola",
      "example": "Ejemplo con \"Bonjour\"."
    },
    {
      "word": "Train",
      "translation": "Tren",
      "example": "Ejemplo con \"Train\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Courriel",
      "translation": "Correo",
      "example": "Ejemplo con \"Courriel\"."
    },
    {
      "word": "Nouvelles",
      "translation": "Noticias",
      "example": "Ejemplo con \"Nouvelles\"."
    },
    {
      "word": "Politique",
      "translation": "Política",
      "example": "Ejemplo con \"Politique\"."
    },
    {
      "word": "Culture",
      "translation": "Cultura",
      "example": "Ejemplo con \"Culture\"."
    },
    {
      "word": "Recherche",
      "translation": "Investigación",
      "example": "Ejemplo con \"Recherche\"."
    },
    {
      "word": "Découverte",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Découverte\"."
    },
    {
      "word": "Analyse",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analyse\"."
    }
  ],
  "pt-lv1-le1": [
    {
      "word": "Olá",
      "translation": "Hola",
      "example": "Ejemplo con \"Olá\"."
    },
    {
      "word": "Adeus",
      "translation": "Adiós",
      "example": "Ejemplo con \"Adeus\"."
    },
    {
      "word": "Obrigado",
      "translation": "Gracias",
      "example": "Ejemplo con \"Obrigado\"."
    },
    {
      "word": "Por favor",
      "translation": "Por favor",
      "example": "Ejemplo con \"Por favor\"."
    },
    {
      "word": "Sim",
      "translation": "Sí",
      "example": "Ejemplo con \"Sim\"."
    },
    {
      "word": "Não",
      "translation": "No",
      "example": "Ejemplo con \"Não\"."
    },
    {
      "word": "Desculpe",
      "translation": "Perdón",
      "example": "Ejemplo con \"Desculpe\"."
    },
    {
      "word": "Bem-vindo",
      "translation": "Bienvenido",
      "example": "Ejemplo con \"Bem-vindo\"."
    },
    {
      "word": "Bom",
      "translation": "Bueno",
      "example": "Ejemplo con \"Bom\"."
    },
    {
      "word": "Manhã",
      "translation": "Mañana",
      "example": "Ejemplo con \"Manhã\"."
    }
  ],
  "pt-lv1-le2": [
    {
      "word": "Nome",
      "translation": "Nombre",
      "example": "Ejemplo con \"Nome\"."
    },
    {
      "word": "Idade",
      "translation": "Edad",
      "example": "Ejemplo con \"Idade\"."
    },
    {
      "word": "País",
      "translation": "País",
      "example": "Ejemplo con \"País\"."
    },
    {
      "word": "Cidade",
      "translation": "Ciudad",
      "example": "Ejemplo con \"Cidade\"."
    },
    {
      "word": "Trabalho",
      "translation": "Trabajo",
      "example": "Ejemplo con \"Trabalho\"."
    },
    {
      "word": "Estudante",
      "translation": "Estudiante",
      "example": "Ejemplo con \"Estudante\"."
    },
    {
      "word": "Professor",
      "translation": "Profesor/a",
      "example": "Ejemplo con \"Professor\"."
    },
    {
      "word": "Amigo",
      "translation": "Amigo/a",
      "example": "Ejemplo con \"Amigo\"."
    },
    {
      "word": "Língua",
      "translation": "Idioma",
      "example": "Ejemplo con \"Língua\"."
    },
    {
      "word": "Endereço",
      "translation": "Dirección",
      "example": "Ejemplo con \"Endereço\"."
    }
  ],
  "pt-lv1-le3": [
    {
      "word": "Um",
      "translation": "Uno",
      "example": "Ejemplo con \"Um\"."
    },
    {
      "word": "Dois",
      "translation": "Dos",
      "example": "Ejemplo con \"Dois\"."
    },
    {
      "word": "Três",
      "translation": "Tres",
      "example": "Ejemplo con \"Três\"."
    },
    {
      "word": "Quatro",
      "translation": "Cuatro",
      "example": "Ejemplo con \"Quatro\"."
    },
    {
      "word": "Cinco",
      "translation": "Cinco",
      "example": "Ejemplo con \"Cinco\"."
    },
    {
      "word": "Seis",
      "translation": "Seis",
      "example": "Ejemplo con \"Seis\"."
    },
    {
      "word": "Sete",
      "translation": "Siete",
      "example": "Ejemplo con \"Sete\"."
    },
    {
      "word": "Oito",
      "translation": "Oito",
      "example": "Ejemplo con \"Oito\"."
    },
    {
      "word": "Nove",
      "translation": "Nueve",
      "example": "Ejemplo con \"Nove\"."
    },
    {
      "word": "Dez",
      "translation": "Diez",
      "example": "Ejemplo con \"Dez\"."
    }
  ],
  "pt-lv1-le4": [
    {
      "word": "Mãe",
      "translation": "Madre",
      "example": "Ejemplo con \"Mãe\"."
    },
    {
      "word": "Pai",
      "translation": "Padre",
      "example": "Ejemplo con \"Pai\"."
    },
    {
      "word": "Irmã",
      "translation": "Hermana",
      "example": "Ejemplo con \"Irmã\"."
    },
    {
      "word": "Irmão",
      "translation": "Hermano",
      "example": "Ejemplo con \"Irmão\"."
    },
    {
      "word": "Bebê",
      "translation": "Bebé",
      "example": "Ejemplo con \"Bebê\"."
    },
    {
      "word": "Família",
      "translation": "Familia",
      "example": "Ejemplo con \"Família\"."
    },
    {
      "word": "Filho",
      "translation": "Hijo",
      "example": "Ejemplo con \"Filho\"."
    },
    {
      "word": "Filha",
      "translation": "Hija",
      "example": "Ejemplo con \"Filha\"."
    },
    {
      "word": "Tio",
      "translation": "Tío",
      "example": "Ejemplo con \"Tio\"."
    },
    {
      "word": "Tia",
      "translation": "Tía",
      "example": "Ejemplo con \"Tia\"."
    }
  ],
  "pt-lv1-le5": [
    {
      "word": "Vermelho",
      "translation": "Rojo",
      "example": "Ejemplo con \"Vermelho\"."
    },
    {
      "word": "Azul",
      "translation": "Azul",
      "example": "Ejemplo con \"Azul\"."
    },
    {
      "word": "Verde",
      "translation": "Verde",
      "example": "Ejemplo con \"Verde\"."
    },
    {
      "word": "Amarelo",
      "translation": "Amarillo",
      "example": "Ejemplo con \"Amarelo\"."
    },
    {
      "word": "Preto",
      "translation": "Negro",
      "example": "Ejemplo con \"Preto\"."
    },
    {
      "word": "Branco",
      "translation": "Blanco",
      "example": "Ejemplo con \"Branco\"."
    },
    {
      "word": "Rosa",
      "translation": "Rosa",
      "example": "Ejemplo con \"Rosa\"."
    },
    {
      "word": "Marrom",
      "translation": "Marrón",
      "example": "Ejemplo con \"Marrom\"."
    },
    {
      "word": "Laranja",
      "translation": "Naranja",
      "example": "Ejemplo con \"Laranja\"."
    },
    {
      "word": "Roxo",
      "translation": "Morado",
      "example": "Ejemplo con \"Roxo\"."
    }
  ],
  "pt-lv1-le6": [
    {
      "word": "O que",
      "translation": "Qué",
      "example": "Ejemplo con \"O que\"."
    },
    {
      "word": "Onde",
      "translation": "Dónde",
      "example": "Ejemplo con \"Onde\"."
    },
    {
      "word": "Quando",
      "translation": "Cuándo",
      "example": "Ejemplo con \"Quando\"."
    },
    {
      "word": "Por que",
      "translation": "Por qué",
      "example": "Ejemplo con \"Por que\"."
    },
    {
      "word": "Como",
      "translation": "Cómo",
      "example": "Ejemplo con \"Como\"."
    },
    {
      "word": "Quem",
      "translation": "Quién",
      "example": "Ejemplo con \"Quem\"."
    },
    {
      "word": "Qual",
      "translation": "Cuál",
      "example": "Ejemplo con \"Qual\"."
    },
    {
      "word": "Quanto",
      "translation": "Cuánto",
      "example": "Ejemplo con \"Quanto\"."
    },
    {
      "word": "Sempre",
      "translation": "Siempre",
      "example": "Ejemplo con \"Sempre\"."
    },
    {
      "word": "Nunca",
      "translation": "Nunca",
      "example": "Ejemplo con \"Nunca\"."
    }
  ],
  "pt-lv2-le1": [
    {
      "word": "Loja",
      "translation": "Tienda",
      "example": "Ejemplo con \"Loja\"."
    },
    {
      "word": "Preço",
      "translation": "Precio",
      "example": "Ejemplo con \"Preço\"."
    },
    {
      "word": "Pão",
      "translation": "Pan",
      "example": "Ejemplo con \"Pão\"."
    },
    {
      "word": "Água",
      "translation": "Agua",
      "example": "Ejemplo con \"Água\"."
    },
    {
      "word": "Mercado",
      "translation": "Mercado",
      "example": "Ejemplo con \"Mercado\"."
    },
    {
      "word": "Dinheiro",
      "translation": "Dinero",
      "example": "Ejemplo con \"Dinheiro\"."
    },
    {
      "word": "Barato",
      "translation": "Barato",
      "example": "Ejemplo con \"Barato\"."
    },
    {
      "word": "Caro",
      "translation": "Caro",
      "example": "Ejemplo con \"Caro\"."
    },
    {
      "word": "Café",
      "translation": "Desayuno",
      "example": "Ejemplo con \"Café\"."
    },
    {
      "word": "Leite",
      "translation": "Leche",
      "example": "Ejemplo con \"Leite\"."
    }
  ],
  "pt-lv2-le2": [
    {
      "word": "Açúcar",
      "translation": "Azúcar",
      "example": "Ejemplo con \"Açúcar\"."
    },
    {
      "word": "Sal",
      "translation": "Sal",
      "example": "Ejemplo con \"Sal\"."
    },
    {
      "word": "Arroz",
      "translation": "Arroz",
      "example": "Ejemplo con \"Arroz\"."
    },
    {
      "word": "Carne",
      "translation": "Carne",
      "example": "Ejemplo con \"Carne\"."
    },
    {
      "word": "Peixe",
      "translation": "Pescado",
      "example": "Ejemplo con \"Peixe\"."
    },
    {
      "word": "Fruta",
      "translation": "Fruta",
      "example": "Ejemplo con \"Fruta\"."
    },
    {
      "word": "Legume",
      "translation": "Verdura",
      "example": "Ejemplo con \"Legume\"."
    },
    {
      "word": "Café",
      "translation": "Desayuno",
      "example": "Ejemplo con \"Café\"."
    },
    {
      "word": "Almoço",
      "translation": "Almuerzo",
      "example": "Ejemplo con \"Almoço\"."
    },
    {
      "word": "Jantar",
      "translation": "Cena",
      "example": "Ejemplo con \"Jantar\"."
    }
  ],
  "pt-lv2-le3": [
    {
      "word": "Cozinha",
      "translation": "Cocina",
      "example": "Ejemplo con \"Cozinha\"."
    },
    {
      "word": "Quarto",
      "translation": "Dormitorio",
      "example": "Ejemplo con \"Quarto\"."
    },
    {
      "word": "Banheiro",
      "translation": "Baño",
      "example": "Ejemplo con \"Banheiro\"."
    },
    {
      "word": "Janela",
      "translation": "Ventana",
      "example": "Ejemplo con \"Janela\"."
    },
    {
      "word": "Porta",
      "translation": "Puerta",
      "example": "Ejemplo con \"Porta\"."
    },
    {
      "word": "Mesa",
      "translation": "Mesa",
      "example": "Ejemplo con \"Mesa\"."
    },
    {
      "word": "Cadeira",
      "translation": "Silla",
      "example": "Ejemplo con \"Cadeira\"."
    },
    {
      "word": "Casa",
      "translation": "Casa",
      "example": "Ejemplo con \"Casa\"."
    },
    {
      "word": "Sol",
      "translation": "Sol",
      "example": "Ejemplo con \"Sol\"."
    },
    {
      "word": "Chuva",
      "translation": "Lluvia",
      "example": "Ejemplo con \"Chuva\"."
    }
  ],
  "pt-lv2-le4": [
    {
      "word": "Camisa",
      "translation": "Camisa",
      "example": "Ejemplo con \"Camisa\"."
    },
    {
      "word": "Calça",
      "translation": "Pantalón",
      "example": "Ejemplo con \"Calça\"."
    },
    {
      "word": "Sapatos",
      "translation": "Zapatos",
      "example": "Ejemplo con \"Sapatos\"."
    },
    {
      "word": "Chapéu",
      "translation": "Sombrero",
      "example": "Ejemplo con \"Chapéu\"."
    },
    {
      "word": "Corpo",
      "translation": "Cuerpo",
      "example": "Ejemplo con \"Corpo\"."
    },
    {
      "word": "Cabeça",
      "translation": "Cabeza",
      "example": "Ejemplo con \"Cabeça\"."
    },
    {
      "word": "Mão",
      "translation": "Mano",
      "example": "Ejemplo con \"Mão\"."
    },
    {
      "word": "Pé",
      "translation": "Pie",
      "example": "Ejemplo con \"Pé\"."
    },
    {
      "word": "Coração",
      "translation": "Corazón",
      "example": "Ejemplo con \"Coração\"."
    },
    {
      "word": "Ônibus",
      "translation": "Autobús",
      "example": "Ejemplo con \"Ônibus\"."
    }
  ],
  "pt-lv2-le5": [
    {
      "word": "Trem",
      "translation": "Tren",
      "example": "Ejemplo con \"Trem\"."
    },
    {
      "word": "Táxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Táxi\"."
    },
    {
      "word": "Aeroporto",
      "translation": "Aeropuerto",
      "example": "Ejemplo con \"Aeroporto\"."
    },
    {
      "word": "Bilhete",
      "translation": "Boleto",
      "example": "Ejemplo con \"Bilhete\"."
    },
    {
      "word": "Estrada",
      "translation": "Carretera",
      "example": "Ejemplo con \"Estrada\"."
    },
    {
      "word": "Ponte",
      "translation": "Puente",
      "example": "Ejemplo con \"Ponte\"."
    },
    {
      "word": "Nuvem",
      "translation": "Nube",
      "example": "Ejemplo con \"Nuvem\"."
    },
    {
      "word": "Vento",
      "translation": "Viento",
      "example": "Ejemplo con \"Vento\"."
    },
    {
      "word": "Neve",
      "translation": "Nieve",
      "example": "Ejemplo con \"Neve\"."
    },
    {
      "word": "Clima",
      "translation": "Clima",
      "example": "Ejemplo con \"Clima\"."
    }
  ],
  "pt-lv2-le6": [
    {
      "word": "Quente",
      "translation": "Caliente",
      "example": "Ejemplo con \"Quente\"."
    },
    {
      "word": "Frio",
      "translation": "Frío",
      "example": "Ejemplo con \"Frio\"."
    },
    {
      "word": "Passaporte",
      "translation": "Pasaporte",
      "example": "Ejemplo con \"Passaporte\"."
    },
    {
      "word": "Hotel",
      "translation": "Hotel",
      "example": "Ejemplo con \"Hotel\"."
    },
    {
      "word": "Mapa",
      "translation": "Mapa",
      "example": "Ejemplo con \"Mapa\"."
    },
    {
      "word": "Bagagem",
      "translation": "Equipaje",
      "example": "Ejemplo con \"Bagagem\"."
    },
    {
      "word": "Médico",
      "translation": "Médico",
      "example": "Ejemplo con \"Médico\"."
    },
    {
      "word": "Enfermeira",
      "translation": "Enfermera",
      "example": "Ejemplo con \"Enfermeira\"."
    },
    {
      "word": "Remédio",
      "translation": "Medicina",
      "example": "Ejemplo con \"Remédio\"."
    },
    {
      "word": "Hospital",
      "translation": "Hospital",
      "example": "Ejemplo con \"Hospital\"."
    }
  ],
  "pt-lv3-le1": [
    {
      "word": "Dor",
      "translation": "Dolor",
      "example": "Ejemplo con \"Dor\"."
    },
    {
      "word": "Reunião",
      "translation": "Reunión",
      "example": "Ejemplo con \"Reunião\"."
    },
    {
      "word": "Salário",
      "translation": "Salario",
      "example": "Ejemplo con \"Salário\"."
    },
    {
      "word": "Chefe",
      "translation": "Jefe",
      "example": "Ejemplo con \"Chefe\"."
    },
    {
      "word": "Equipe",
      "translation": "Equipo",
      "example": "Ejemplo con \"Equipe\"."
    },
    {
      "word": "Projeto",
      "translation": "Proyecto",
      "example": "Ejemplo con \"Projeto\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Escritório",
      "translation": "Oficina",
      "example": "Ejemplo con \"Escritório\"."
    },
    {
      "word": "Música",
      "translation": "Música",
      "example": "Ejemplo con \"Música\"."
    },
    {
      "word": "Feliz",
      "translation": "Feliz",
      "example": "Ejemplo con \"Feliz\"."
    }
  ],
  "pt-lv3-le2": [
    {
      "word": "Guitarra",
      "translation": "Guitarra",
      "example": "Ejemplo con \"Guitarra\"."
    },
    {
      "word": "Esporte",
      "translation": "Deporte",
      "example": "Ejemplo con \"Esporte\"."
    },
    {
      "word": "Livro",
      "translation": "Libro",
      "example": "Ejemplo con \"Livro\"."
    },
    {
      "word": "Filme",
      "translation": "Película",
      "example": "Ejemplo con \"Filme\"."
    },
    {
      "word": "Dança",
      "translation": "Baile",
      "example": "Ejemplo con \"Dança\"."
    },
    {
      "word": "Jogo",
      "translation": "Juego",
      "example": "Ejemplo con \"Jogo\"."
    },
    {
      "word": "Triste",
      "translation": "Triste",
      "example": "Ejemplo con \"Triste\"."
    },
    {
      "word": "Bravo",
      "translation": "Enojado",
      "example": "Ejemplo con \"Bravo\"."
    },
    {
      "word": "Amor",
      "translation": "Amor",
      "example": "Ejemplo con \"Amor\"."
    },
    {
      "word": "Medo",
      "translation": "Miedo",
      "example": "Ejemplo con \"Medo\"."
    }
  ],
  "pt-lv3-le3": [
    {
      "word": "Esperança",
      "translation": "Esperanza",
      "example": "Ejemplo con \"Esperança\"."
    },
    {
      "word": "Alegria",
      "translation": "Alegría",
      "example": "Ejemplo con \"Alegria\"."
    },
    {
      "word": "Internet",
      "translation": "Internet",
      "example": "Ejemplo con \"Internet\"."
    },
    {
      "word": "Computador",
      "translation": "Computadora",
      "example": "Ejemplo con \"Computador\"."
    },
    {
      "word": "Software",
      "translation": "Software",
      "example": "Ejemplo con \"Software\"."
    },
    {
      "word": "Site",
      "translation": "Sitio web",
      "example": "Ejemplo con \"Site\"."
    },
    {
      "word": "Notícias",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notícias\"."
    },
    {
      "word": "Mensagem",
      "translation": "Mensaje",
      "example": "Ejemplo con \"Mensagem\"."
    },
    {
      "word": "Telefone",
      "translation": "Teléfono",
      "example": "Ejemplo con \"Telefone\"."
    },
    {
      "word": "Pensar",
      "translation": "Pensar",
      "example": "Ejemplo con \"Pensar\"."
    }
  ],
  "pt-lv3-le4": [
    {
      "word": "Natureza",
      "translation": "Naturaleza",
      "example": "Ejemplo con \"Natureza\"."
    },
    {
      "word": "Poluição",
      "translation": "Contaminación",
      "example": "Ejemplo con \"Poluição\"."
    },
    {
      "word": "Floresta",
      "translation": "Bosque",
      "example": "Ejemplo con \"Floresta\"."
    },
    {
      "word": "Rio",
      "translation": "Río",
      "example": "Ejemplo con \"Rio\"."
    },
    {
      "word": "Oceano",
      "translation": "Océano",
      "example": "Ejemplo con \"Oceano\"."
    },
    {
      "word": "Energia",
      "translation": "Energía",
      "example": "Ejemplo con \"Energia\"."
    },
    {
      "word": "Clima",
      "translation": "Clima",
      "example": "Ejemplo con \"Clima\"."
    },
    {
      "word": "Festa",
      "translation": "Fiesta",
      "example": "Ejemplo con \"Festa\"."
    },
    {
      "word": "Universidade",
      "translation": "Universidad",
      "example": "Ejemplo con \"Universidade\"."
    },
    {
      "word": "Conversa",
      "translation": "Conversación",
      "example": "Ejemplo con \"Conversa\"."
    }
  ],
  "pt-lv3-le5": [
    {
      "word": "Opinião",
      "translation": "Opinión",
      "example": "Ejemplo con \"Opinião\"."
    },
    {
      "word": "Concordo",
      "translation": "De acuerdo",
      "example": "Ejemplo con \"Concordo\"."
    },
    {
      "word": "Discordo",
      "translation": "En desacuerdo",
      "example": "Ejemplo con \"Discordo\"."
    },
    {
      "word": "Talvez",
      "translation": "Quizás",
      "example": "Ejemplo con \"Talvez\"."
    },
    {
      "word": "Certamente",
      "translation": "Ciertamente",
      "example": "Ejemplo con \"Certamente\"."
    },
    {
      "word": "Casamento",
      "translation": "Boda",
      "example": "Ejemplo con \"Casamento\"."
    },
    {
      "word": "Festival",
      "translation": "Festival",
      "example": "Ejemplo con \"Festival\"."
    },
    {
      "word": "Concerto",
      "translation": "Concierto",
      "example": "Ejemplo con \"Concerto\"."
    },
    {
      "word": "Aniversário",
      "translation": "Cumpleaños",
      "example": "Ejemplo con \"Aniversário\"."
    },
    {
      "word": "Férias",
      "translation": "Vacaciones",
      "example": "Ejemplo con \"Férias\"."
    }
  ],
  "pt-lv3-le6": [
    {
      "word": "História",
      "translation": "Historia",
      "example": "Ejemplo con \"História\"."
    },
    {
      "word": "Ciência",
      "translation": "Ciencia",
      "example": "Ejemplo con \"Ciência\"."
    },
    {
      "word": "Matemática",
      "translation": "Matemáticas",
      "example": "Ejemplo con \"Matemática\"."
    },
    {
      "word": "Prova",
      "translation": "Examen",
      "example": "Ejemplo con \"Prova\"."
    },
    {
      "word": "Tarefa",
      "translation": "Tarea",
      "example": "Ejemplo con \"Tarefa\"."
    },
    {
      "word": "Aula",
      "translation": "Clase",
      "example": "Ejemplo con \"Aula\"."
    },
    {
      "word": "Carta",
      "translation": "Carta",
      "example": "Ejemplo con \"Carta\"."
    },
    {
      "word": "Chamada",
      "translation": "Llamada",
      "example": "Ejemplo con \"Chamada\"."
    },
    {
      "word": "Resposta",
      "translation": "Respuesta",
      "example": "Ejemplo con \"Resposta\"."
    },
    {
      "word": "Pergunta",
      "translation": "Pregunta",
      "example": "Ejemplo con \"Pergunta\"."
    }
  ],
  "pt-lv4-le1": [
    {
      "word": "Empresa",
      "translation": "Empresa",
      "example": "Ejemplo con \"Empresa\"."
    },
    {
      "word": "Tradição",
      "translation": "Tradición",
      "example": "Ejemplo con \"Tradição\"."
    },
    {
      "word": "Política",
      "translation": "Política",
      "example": "Ejemplo con \"Política\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Sociedade",
      "translation": "Sociedad",
      "example": "Ejemplo con \"Sociedade\"."
    },
    {
      "word": "Economia",
      "translation": "Economía",
      "example": "Ejemplo con \"Economia\"."
    },
    {
      "word": "Lei",
      "translation": "Ley",
      "example": "Ejemplo con \"Lei\"."
    },
    {
      "word": "Liberdade",
      "translation": "Libertad",
      "example": "Ejemplo con \"Liberdade\"."
    },
    {
      "word": "Mercado",
      "translation": "Mercado",
      "example": "Ejemplo con \"Mercado\"."
    },
    {
      "word": "Argumento",
      "translation": "Argumento",
      "example": "Ejemplo con \"Argumento\"."
    }
  ],
  "pt-lv4-le2": [
    {
      "word": "Pesquisa",
      "translation": "Investigación",
      "example": "Ejemplo con \"Pesquisa\"."
    },
    {
      "word": "Descoberta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Descoberta\"."
    },
    {
      "word": "Laboratório",
      "translation": "Laboratorio",
      "example": "Ejemplo con \"Laboratório\"."
    },
    {
      "word": "Teoria",
      "translation": "Teoría",
      "example": "Ejemplo con \"Teoria\"."
    },
    {
      "word": "Dados",
      "translation": "Datos",
      "example": "Ejemplo con \"Dados\"."
    },
    {
      "word": "Experimento",
      "translation": "Experimento",
      "example": "Ejemplo con \"Experimento\"."
    },
    {
      "word": "Poesia",
      "translation": "Poesía",
      "example": "Ejemplo con \"Poesia\"."
    },
    {
      "word": "Pintura",
      "translation": "Pintura",
      "example": "Ejemplo con \"Pintura\"."
    },
    {
      "word": "Escultura",
      "translation": "Escultura",
      "example": "Ejemplo con \"Escultura\"."
    },
    {
      "word": "Romance",
      "translation": "Novela",
      "example": "Ejemplo con \"Romance\"."
    }
  ],
  "pt-lv4-le3": [
    {
      "word": "Teatro",
      "translation": "Teatro",
      "example": "Ejemplo con \"Teatro\"."
    },
    {
      "word": "Artista",
      "translation": "Artista",
      "example": "Ejemplo con \"Artista\"."
    },
    {
      "word": "Literatura",
      "translation": "Literatura",
      "example": "Ejemplo con \"Literatura\"."
    },
    {
      "word": "Debate",
      "translation": "Debate",
      "example": "Ejemplo con \"Debate\"."
    },
    {
      "word": "Negociação",
      "translation": "Negociación",
      "example": "Ejemplo con \"Negociação\"."
    },
    {
      "word": "Estratégia",
      "translation": "Estrategia",
      "example": "Ejemplo con \"Estratégia\"."
    },
    {
      "word": "Liderança",
      "translation": "Liderazgo",
      "example": "Ejemplo con \"Liderança\"."
    },
    {
      "word": "Inovação",
      "translation": "Innovación",
      "example": "Ejemplo con \"Inovação\"."
    },
    {
      "word": "Global",
      "translation": "Global",
      "example": "Ejemplo con \"Global\"."
    },
    {
      "word": "Desafio",
      "translation": "Desafío",
      "example": "Ejemplo con \"Desafio\"."
    }
  ],
  "pt-lv4-le4": [
    {
      "word": "Conquista",
      "translation": "Logro",
      "example": "Ejemplo con \"Conquista\"."
    },
    {
      "word": "Perspectiva",
      "translation": "Perspectiva",
      "example": "Ejemplo con \"Perspectiva\"."
    },
    {
      "word": "Análise",
      "translation": "Análisis",
      "example": "Ejemplo con \"Análise\"."
    },
    {
      "word": "Hoje",
      "translation": "Hoy",
      "example": "Ejemplo con \"Hoje\"."
    },
    {
      "word": "Amanhã",
      "translation": "Mañana",
      "example": "Ejemplo con \"Amanhã\"."
    },
    {
      "word": "Semana",
      "translation": "Semana",
      "example": "Ejemplo con \"Semana\"."
    },
    {
      "word": "Mês",
      "translation": "Mes",
      "example": "Ejemplo con \"Mês\"."
    },
    {
      "word": "Ano",
      "translation": "Año",
      "example": "Ejemplo con \"Ano\"."
    },
    {
      "word": "Hora",
      "translation": "Hora",
      "example": "Ejemplo con \"Hora\"."
    },
    {
      "word": "Minuto",
      "translation": "Minuto",
      "example": "Ejemplo con \"Minuto\"."
    }
  ],
  "pt-lv4-le5": [
    {
      "word": "Avó",
      "translation": "Abuela",
      "example": "Ejemplo con \"Avó\"."
    },
    {
      "word": "Avô",
      "translation": "Abuelo",
      "example": "Ejemplo con \"Avô\"."
    },
    {
      "word": "Pais",
      "translation": "Padres",
      "example": "Ejemplo con \"Pais\"."
    },
    {
      "word": "Filhos",
      "translation": "Hijos",
      "example": "Ejemplo con \"Filhos\"."
    },
    {
      "word": "Marido",
      "translation": "Esposo",
      "example": "Ejemplo con \"Marido\"."
    },
    {
      "word": "Esposa",
      "translation": "Esposa",
      "example": "Ejemplo con \"Esposa\"."
    },
    {
      "word": "Primo",
      "translation": "Primo/a",
      "example": "Ejemplo con \"Primo\"."
    },
    {
      "word": "Dez",
      "translation": "Diez",
      "example": "Ejemplo con \"Dez\"."
    },
    {
      "word": "Segundo",
      "translation": "Segundo",
      "example": "Ejemplo con \"Segundo\"."
    },
    {
      "word": "Tempo",
      "translation": "Tiempo",
      "example": "Ejemplo con \"Tempo\"."
    }
  ],
  "pt-lv4-le6": [
    {
      "word": "Cinza",
      "translation": "Gris",
      "example": "Ejemplo con \"Cinza\"."
    },
    {
      "word": "Ouro",
      "translation": "Dorado",
      "example": "Ejemplo con \"Ouro\"."
    },
    {
      "word": "Deve",
      "translation": "Debe",
      "example": "Ejemplo con \"Deve\"."
    },
    {
      "word": "Pode",
      "translation": "Puede",
      "example": "Ejemplo con \"Pode\"."
    },
    {
      "word": "Trem",
      "translation": "Tren",
      "example": "Ejemplo con \"Trem\"."
    },
    {
      "word": "Táxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Táxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notícias",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notícias\"."
    },
    {
      "word": "Política",
      "translation": "Política",
      "example": "Ejemplo con \"Política\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    }
  ],
  "pt-lv5-le1": [
    {
      "word": "Olá",
      "translation": "Hola",
      "example": "Ejemplo con \"Olá\"."
    },
    {
      "word": "Trem",
      "translation": "Tren",
      "example": "Ejemplo con \"Trem\"."
    },
    {
      "word": "Táxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Táxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notícias",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notícias\"."
    },
    {
      "word": "Política",
      "translation": "Política",
      "example": "Ejemplo con \"Política\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Pesquisa",
      "translation": "Investigación",
      "example": "Ejemplo con \"Pesquisa\"."
    },
    {
      "word": "Descoberta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Descoberta\"."
    },
    {
      "word": "Análise",
      "translation": "Análisis",
      "example": "Ejemplo con \"Análise\"."
    }
  ],
  "pt-lv5-le2": [
    {
      "word": "Olá",
      "translation": "Hola",
      "example": "Ejemplo con \"Olá\"."
    },
    {
      "word": "Trem",
      "translation": "Tren",
      "example": "Ejemplo con \"Trem\"."
    },
    {
      "word": "Táxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Táxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notícias",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notícias\"."
    },
    {
      "word": "Política",
      "translation": "Política",
      "example": "Ejemplo con \"Política\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Pesquisa",
      "translation": "Investigación",
      "example": "Ejemplo con \"Pesquisa\"."
    },
    {
      "word": "Descoberta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Descoberta\"."
    },
    {
      "word": "Análise",
      "translation": "Análisis",
      "example": "Ejemplo con \"Análise\"."
    }
  ],
  "pt-lv5-le3": [
    {
      "word": "Olá",
      "translation": "Hola",
      "example": "Ejemplo con \"Olá\"."
    },
    {
      "word": "Trem",
      "translation": "Tren",
      "example": "Ejemplo con \"Trem\"."
    },
    {
      "word": "Táxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Táxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notícias",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notícias\"."
    },
    {
      "word": "Política",
      "translation": "Política",
      "example": "Ejemplo con \"Política\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Pesquisa",
      "translation": "Investigación",
      "example": "Ejemplo con \"Pesquisa\"."
    },
    {
      "word": "Descoberta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Descoberta\"."
    },
    {
      "word": "Análise",
      "translation": "Análisis",
      "example": "Ejemplo con \"Análise\"."
    }
  ],
  "pt-lv5-le4": [
    {
      "word": "Olá",
      "translation": "Hola",
      "example": "Ejemplo con \"Olá\"."
    },
    {
      "word": "Trem",
      "translation": "Tren",
      "example": "Ejemplo con \"Trem\"."
    },
    {
      "word": "Táxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Táxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notícias",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notícias\"."
    },
    {
      "word": "Política",
      "translation": "Política",
      "example": "Ejemplo con \"Política\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Pesquisa",
      "translation": "Investigación",
      "example": "Ejemplo con \"Pesquisa\"."
    },
    {
      "word": "Descoberta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Descoberta\"."
    },
    {
      "word": "Análise",
      "translation": "Análisis",
      "example": "Ejemplo con \"Análise\"."
    }
  ],
  "pt-lv5-le5": [
    {
      "word": "Olá",
      "translation": "Hola",
      "example": "Ejemplo con \"Olá\"."
    },
    {
      "word": "Trem",
      "translation": "Tren",
      "example": "Ejemplo con \"Trem\"."
    },
    {
      "word": "Táxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Táxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notícias",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notícias\"."
    },
    {
      "word": "Política",
      "translation": "Política",
      "example": "Ejemplo con \"Política\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Pesquisa",
      "translation": "Investigación",
      "example": "Ejemplo con \"Pesquisa\"."
    },
    {
      "word": "Descoberta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Descoberta\"."
    },
    {
      "word": "Análise",
      "translation": "Análisis",
      "example": "Ejemplo con \"Análise\"."
    }
  ],
  "pt-lv5-le6": [
    {
      "word": "Olá",
      "translation": "Hola",
      "example": "Ejemplo con \"Olá\"."
    },
    {
      "word": "Trem",
      "translation": "Tren",
      "example": "Ejemplo con \"Trem\"."
    },
    {
      "word": "Táxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Táxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notícias",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notícias\"."
    },
    {
      "word": "Política",
      "translation": "Política",
      "example": "Ejemplo con \"Política\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Pesquisa",
      "translation": "Investigación",
      "example": "Ejemplo con \"Pesquisa\"."
    },
    {
      "word": "Descoberta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Descoberta\"."
    },
    {
      "word": "Análise",
      "translation": "Análisis",
      "example": "Ejemplo con \"Análise\"."
    }
  ],
  "it-lv1-le1": [
    {
      "word": "Ciao",
      "translation": "Hola",
      "example": "Ejemplo con \"Ciao\"."
    },
    {
      "word": "Arrivederci",
      "translation": "Adiós",
      "example": "Ejemplo con \"Arrivederci\"."
    },
    {
      "word": "Grazie",
      "translation": "Gracias",
      "example": "Ejemplo con \"Grazie\"."
    },
    {
      "word": "Per favore",
      "translation": "Por favor",
      "example": "Ejemplo con \"Per favore\"."
    },
    {
      "word": "Sì",
      "translation": "Sí",
      "example": "Ejemplo con \"Sì\"."
    },
    {
      "word": "No",
      "translation": "No",
      "example": "Ejemplo con \"No\"."
    },
    {
      "word": "Scusa",
      "translation": "Perdón",
      "example": "Ejemplo con \"Scusa\"."
    },
    {
      "word": "Benvenuto",
      "translation": "Bienvenido",
      "example": "Ejemplo con \"Benvenuto\"."
    },
    {
      "word": "Buono",
      "translation": "Bueno",
      "example": "Ejemplo con \"Buono\"."
    },
    {
      "word": "Mattina",
      "translation": "Mañana",
      "example": "Ejemplo con \"Mattina\"."
    }
  ],
  "it-lv1-le2": [
    {
      "word": "Nome",
      "translation": "Nombre",
      "example": "Ejemplo con \"Nome\"."
    },
    {
      "word": "Età",
      "translation": "Edad",
      "example": "Ejemplo con \"Età\"."
    },
    {
      "word": "Paese",
      "translation": "País",
      "example": "Ejemplo con \"Paese\"."
    },
    {
      "word": "Città",
      "translation": "Ciudad",
      "example": "Ejemplo con \"Città\"."
    },
    {
      "word": "Lavoro",
      "translation": "Trabajo",
      "example": "Ejemplo con \"Lavoro\"."
    },
    {
      "word": "Studente",
      "translation": "Estudiante",
      "example": "Ejemplo con \"Studente\"."
    },
    {
      "word": "Insegnante",
      "translation": "Profesor/a",
      "example": "Ejemplo con \"Insegnante\"."
    },
    {
      "word": "Amico",
      "translation": "Amigo/a",
      "example": "Ejemplo con \"Amico\"."
    },
    {
      "word": "Lingua",
      "translation": "Idioma",
      "example": "Ejemplo con \"Lingua\"."
    },
    {
      "word": "Indirizzo",
      "translation": "Dirección",
      "example": "Ejemplo con \"Indirizzo\"."
    }
  ],
  "it-lv1-le3": [
    {
      "word": "Uno",
      "translation": "Uno",
      "example": "Ejemplo con \"Uno\"."
    },
    {
      "word": "Due",
      "translation": "Dos",
      "example": "Ejemplo con \"Due\"."
    },
    {
      "word": "Tre",
      "translation": "Tres",
      "example": "Ejemplo con \"Tre\"."
    },
    {
      "word": "Quattro",
      "translation": "Cuatro",
      "example": "Ejemplo con \"Quattro\"."
    },
    {
      "word": "Cinque",
      "translation": "Cinco",
      "example": "Ejemplo con \"Cinque\"."
    },
    {
      "word": "Sei",
      "translation": "Seis",
      "example": "Ejemplo con \"Sei\"."
    },
    {
      "word": "Sette",
      "translation": "Siete",
      "example": "Ejemplo con \"Sette\"."
    },
    {
      "word": "Otto",
      "translation": "Ocho",
      "example": "Ejemplo con \"Otto\"."
    },
    {
      "word": "Nove",
      "translation": "Nueve",
      "example": "Ejemplo con \"Nove\"."
    },
    {
      "word": "Dieci",
      "translation": "Diez",
      "example": "Ejemplo con \"Dieci\"."
    }
  ],
  "it-lv1-le4": [
    {
      "word": "Madre",
      "translation": "Madre",
      "example": "Ejemplo con \"Madre\"."
    },
    {
      "word": "Padre",
      "translation": "Padre",
      "example": "Ejemplo con \"Padre\"."
    },
    {
      "word": "Sorella",
      "translation": "Hermana",
      "example": "Ejemplo con \"Sorella\"."
    },
    {
      "word": "Fratello",
      "translation": "Hermano",
      "example": "Ejemplo con \"Fratello\"."
    },
    {
      "word": "Bambino",
      "translation": "Bebé",
      "example": "Ejemplo con \"Bambino\"."
    },
    {
      "word": "Famiglia",
      "translation": "Familia",
      "example": "Ejemplo con \"Famiglia\"."
    },
    {
      "word": "Figlio",
      "translation": "Hijo",
      "example": "Ejemplo con \"Figlio\"."
    },
    {
      "word": "Figlia",
      "translation": "Hija",
      "example": "Ejemplo con \"Figlia\"."
    },
    {
      "word": "Zio",
      "translation": "Tío",
      "example": "Ejemplo con \"Zio\"."
    },
    {
      "word": "Zia",
      "translation": "Tía",
      "example": "Ejemplo con \"Zia\"."
    }
  ],
  "it-lv1-le5": [
    {
      "word": "Rosso",
      "translation": "Rojo",
      "example": "Ejemplo con \"Rosso\"."
    },
    {
      "word": "Blu",
      "translation": "Azul",
      "example": "Ejemplo con \"Blu\"."
    },
    {
      "word": "Verde",
      "translation": "Verde",
      "example": "Ejemplo con \"Verde\"."
    },
    {
      "word": "Giallo",
      "translation": "Amarillo",
      "example": "Ejemplo con \"Giallo\"."
    },
    {
      "word": "Nero",
      "translation": "Negro",
      "example": "Ejemplo con \"Nero\"."
    },
    {
      "word": "Bianco",
      "translation": "Blanco",
      "example": "Ejemplo con \"Bianco\"."
    },
    {
      "word": "Rosa",
      "translation": "Rosa",
      "example": "Ejemplo con \"Rosa\"."
    },
    {
      "word": "Marrone",
      "translation": "Marrón",
      "example": "Ejemplo con \"Marrone\"."
    },
    {
      "word": "Arancione",
      "translation": "Naranja",
      "example": "Ejemplo con \"Arancione\"."
    },
    {
      "word": "Viola",
      "translation": "Morado",
      "example": "Ejemplo con \"Viola\"."
    }
  ],
  "it-lv1-le6": [
    {
      "word": "Cosa",
      "translation": "Qué",
      "example": "Ejemplo con \"Cosa\"."
    },
    {
      "word": "Dove",
      "translation": "Dónde",
      "example": "Ejemplo con \"Dove\"."
    },
    {
      "word": "Quando",
      "translation": "Cuándo",
      "example": "Ejemplo con \"Quando\"."
    },
    {
      "word": "Perché",
      "translation": "Por qué",
      "example": "Ejemplo con \"Perché\"."
    },
    {
      "word": "Come",
      "translation": "Cómo",
      "example": "Ejemplo con \"Come\"."
    },
    {
      "word": "Chi",
      "translation": "Quién",
      "example": "Ejemplo con \"Chi\"."
    },
    {
      "word": "Quale",
      "translation": "Cuál",
      "example": "Ejemplo con \"Quale\"."
    },
    {
      "word": "Quanto",
      "translation": "Cuánto",
      "example": "Ejemplo con \"Quanto\"."
    },
    {
      "word": "Sempre",
      "translation": "Siempre",
      "example": "Ejemplo con \"Sempre\"."
    },
    {
      "word": "Mai",
      "translation": "Nunca",
      "example": "Ejemplo con \"Mai\"."
    }
  ],
  "it-lv2-le1": [
    {
      "word": "Negozio",
      "translation": "Tienda",
      "example": "Ejemplo con \"Negozio\"."
    },
    {
      "word": "Prezzo",
      "translation": "Precio",
      "example": "Ejemplo con \"Prezzo\"."
    },
    {
      "word": "Pane",
      "translation": "Pan",
      "example": "Ejemplo con \"Pane\"."
    },
    {
      "word": "Acqua",
      "translation": "Agua",
      "example": "Ejemplo con \"Acqua\"."
    },
    {
      "word": "Mercato",
      "translation": "Mercado",
      "example": "Ejemplo con \"Mercato\"."
    },
    {
      "word": "Soldi",
      "translation": "Dinero",
      "example": "Ejemplo con \"Soldi\"."
    },
    {
      "word": "Economico",
      "translation": "Barato",
      "example": "Ejemplo con \"Economico\"."
    },
    {
      "word": "Costoso",
      "translation": "Caro",
      "example": "Ejemplo con \"Costoso\"."
    },
    {
      "word": "Caffè",
      "translation": "Café",
      "example": "Ejemplo con \"Caffè\"."
    },
    {
      "word": "Latte",
      "translation": "Leche",
      "example": "Ejemplo con \"Latte\"."
    }
  ],
  "it-lv2-le2": [
    {
      "word": "Zucchero",
      "translation": "Azúcar",
      "example": "Ejemplo con \"Zucchero\"."
    },
    {
      "word": "Sale",
      "translation": "Sal",
      "example": "Ejemplo con \"Sale\"."
    },
    {
      "word": "Riso",
      "translation": "Arroz",
      "example": "Ejemplo con \"Riso\"."
    },
    {
      "word": "Carne",
      "translation": "Carne",
      "example": "Ejemplo con \"Carne\"."
    },
    {
      "word": "Pesce",
      "translation": "Pescado",
      "example": "Ejemplo con \"Pesce\"."
    },
    {
      "word": "Frutta",
      "translation": "Fruta",
      "example": "Ejemplo con \"Frutta\"."
    },
    {
      "word": "Verdura",
      "translation": "Verdura",
      "example": "Ejemplo con \"Verdura\"."
    },
    {
      "word": "Colazione",
      "translation": "Desayuno",
      "example": "Ejemplo con \"Colazione\"."
    },
    {
      "word": "Pranzo",
      "translation": "Almuerzo",
      "example": "Ejemplo con \"Pranzo\"."
    },
    {
      "word": "Cena",
      "translation": "Cena",
      "example": "Ejemplo con \"Cena\"."
    }
  ],
  "it-lv2-le3": [
    {
      "word": "Cucina",
      "translation": "Cocina",
      "example": "Ejemplo con \"Cucina\"."
    },
    {
      "word": "Camera",
      "translation": "Dormitorio",
      "example": "Ejemplo con \"Camera\"."
    },
    {
      "word": "Bagno",
      "translation": "Baño",
      "example": "Ejemplo con \"Bagno\"."
    },
    {
      "word": "Finestra",
      "translation": "Ventana",
      "example": "Ejemplo con \"Finestra\"."
    },
    {
      "word": "Porta",
      "translation": "Puerta",
      "example": "Ejemplo con \"Porta\"."
    },
    {
      "word": "Tavolo",
      "translation": "Mesa",
      "example": "Ejemplo con \"Tavolo\"."
    },
    {
      "word": "Sedia",
      "translation": "Silla",
      "example": "Ejemplo con \"Sedia\"."
    },
    {
      "word": "Casa",
      "translation": "Casa",
      "example": "Ejemplo con \"Casa\"."
    },
    {
      "word": "Sole",
      "translation": "Sol",
      "example": "Ejemplo con \"Sole\"."
    },
    {
      "word": "Pioggia",
      "translation": "Lluvia",
      "example": "Ejemplo con \"Pioggia\"."
    }
  ],
  "it-lv2-le4": [
    {
      "word": "Camicia",
      "translation": "Camisa",
      "example": "Ejemplo con \"Camicia\"."
    },
    {
      "word": "Pantaloni",
      "translation": "Pantalón",
      "example": "Ejemplo con \"Pantaloni\"."
    },
    {
      "word": "Scarpe",
      "translation": "Zapatos",
      "example": "Ejemplo con \"Scarpe\"."
    },
    {
      "word": "Cappello",
      "translation": "Sombrero",
      "example": "Ejemplo con \"Cappello\"."
    },
    {
      "word": "Corpo",
      "translation": "Cuerpo",
      "example": "Ejemplo con \"Corpo\"."
    },
    {
      "word": "Testa",
      "translation": "Cabeza",
      "example": "Ejemplo con \"Testa\"."
    },
    {
      "word": "Mano",
      "translation": "Mano",
      "example": "Ejemplo con \"Mano\"."
    },
    {
      "word": "Piede",
      "translation": "Pie",
      "example": "Ejemplo con \"Piede\"."
    },
    {
      "word": "Cuore",
      "translation": "Corazón",
      "example": "Ejemplo con \"Cuore\"."
    },
    {
      "word": "Autobus",
      "translation": "Autobús",
      "example": "Ejemplo con \"Autobus\"."
    }
  ],
  "it-lv2-le5": [
    {
      "word": "Treno",
      "translation": "Tren",
      "example": "Ejemplo con \"Treno\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Aeroporto",
      "translation": "Aeropuerto",
      "example": "Ejemplo con \"Aeroporto\"."
    },
    {
      "word": "Biglietto",
      "translation": "Boleto",
      "example": "Ejemplo con \"Biglietto\"."
    },
    {
      "word": "Strada",
      "translation": "Carretera",
      "example": "Ejemplo con \"Strada\"."
    },
    {
      "word": "Ponte",
      "translation": "Puente",
      "example": "Ejemplo con \"Ponte\"."
    },
    {
      "word": "Nuvola",
      "translation": "Nube",
      "example": "Ejemplo con \"Nuvola\"."
    },
    {
      "word": "Vento",
      "translation": "Viento",
      "example": "Ejemplo con \"Vento\"."
    },
    {
      "word": "Neve",
      "translation": "Nieve",
      "example": "Ejemplo con \"Neve\"."
    },
    {
      "word": "Meteo",
      "translation": "Clima",
      "example": "Ejemplo con \"Meteo\"."
    }
  ],
  "it-lv2-le6": [
    {
      "word": "Caldo",
      "translation": "Caliente",
      "example": "Ejemplo con \"Caldo\"."
    },
    {
      "word": "Freddo",
      "translation": "Frío",
      "example": "Ejemplo con \"Freddo\"."
    },
    {
      "word": "Passaporto",
      "translation": "Pasaporte",
      "example": "Ejemplo con \"Passaporto\"."
    },
    {
      "word": "Hotel",
      "translation": "Hotel",
      "example": "Ejemplo con \"Hotel\"."
    },
    {
      "word": "Mappa",
      "translation": "Mapa",
      "example": "Ejemplo con \"Mappa\"."
    },
    {
      "word": "Bagaglio",
      "translation": "Equipaje",
      "example": "Ejemplo con \"Bagaglio\"."
    },
    {
      "word": "Medico",
      "translation": "Médico",
      "example": "Ejemplo con \"Medico\"."
    },
    {
      "word": "Infermiera",
      "translation": "Enfermera",
      "example": "Ejemplo con \"Infermiera\"."
    },
    {
      "word": "Medicina",
      "translation": "Medicina",
      "example": "Ejemplo con \"Medicina\"."
    },
    {
      "word": "Ospedale",
      "translation": "Hospital",
      "example": "Ejemplo con \"Ospedale\"."
    }
  ],
  "it-lv3-le1": [
    {
      "word": "Dolore",
      "translation": "Dolor",
      "example": "Ejemplo con \"Dolore\"."
    },
    {
      "word": "Riunione",
      "translation": "Reunión",
      "example": "Ejemplo con \"Riunione\"."
    },
    {
      "word": "Stipendio",
      "translation": "Salario",
      "example": "Ejemplo con \"Stipendio\"."
    },
    {
      "word": "Capo",
      "translation": "Jefe",
      "example": "Ejemplo con \"Capo\"."
    },
    {
      "word": "Squadra",
      "translation": "Equipo",
      "example": "Ejemplo con \"Squadra\"."
    },
    {
      "word": "Progetto",
      "translation": "Proyecto",
      "example": "Ejemplo con \"Progetto\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Ufficio",
      "translation": "Oficina",
      "example": "Ejemplo con \"Ufficio\"."
    },
    {
      "word": "Musica",
      "translation": "Música",
      "example": "Ejemplo con \"Musica\"."
    },
    {
      "word": "Felice",
      "translation": "Feliz",
      "example": "Ejemplo con \"Felice\"."
    }
  ],
  "it-lv3-le2": [
    {
      "word": "Chitarra",
      "translation": "Guitarra",
      "example": "Ejemplo con \"Chitarra\"."
    },
    {
      "word": "Sport",
      "translation": "Deporte",
      "example": "Ejemplo con \"Sport\"."
    },
    {
      "word": "Libro",
      "translation": "Libro",
      "example": "Ejemplo con \"Libro\"."
    },
    {
      "word": "Film",
      "translation": "Película",
      "example": "Ejemplo con \"Film\"."
    },
    {
      "word": "Danza",
      "translation": "Baile",
      "example": "Ejemplo con \"Danza\"."
    },
    {
      "word": "Gioco",
      "translation": "Juego",
      "example": "Ejemplo con \"Gioco\"."
    },
    {
      "word": "Triste",
      "translation": "Triste",
      "example": "Ejemplo con \"Triste\"."
    },
    {
      "word": "Arrabbiato",
      "translation": "Enojado",
      "example": "Ejemplo con \"Arrabbiato\"."
    },
    {
      "word": "Amore",
      "translation": "Amor",
      "example": "Ejemplo con \"Amore\"."
    },
    {
      "word": "Paura",
      "translation": "Miedo",
      "example": "Ejemplo con \"Paura\"."
    }
  ],
  "it-lv3-le3": [
    {
      "word": "Speranza",
      "translation": "Esperanza",
      "example": "Ejemplo con \"Speranza\"."
    },
    {
      "word": "Gioia",
      "translation": "Alegría",
      "example": "Ejemplo con \"Gioia\"."
    },
    {
      "word": "Internet",
      "translation": "Internet",
      "example": "Ejemplo con \"Internet\"."
    },
    {
      "word": "Computer",
      "translation": "Computadora",
      "example": "Ejemplo con \"Computer\"."
    },
    {
      "word": "Software",
      "translation": "Software",
      "example": "Ejemplo con \"Software\"."
    },
    {
      "word": "Sito",
      "translation": "Sitio web",
      "example": "Ejemplo con \"Sito\"."
    },
    {
      "word": "Notizie",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notizie\"."
    },
    {
      "word": "Messaggio",
      "translation": "Mensaje",
      "example": "Ejemplo con \"Messaggio\"."
    },
    {
      "word": "Telefono",
      "translation": "Teléfono",
      "example": "Ejemplo con \"Telefono\"."
    },
    {
      "word": "Pensare",
      "translation": "Pensar",
      "example": "Ejemplo con \"Pensare\"."
    }
  ],
  "it-lv3-le4": [
    {
      "word": "Natura",
      "translation": "Naturaleza",
      "example": "Ejemplo con \"Natura\"."
    },
    {
      "word": "Inquinamento",
      "translation": "Contaminación",
      "example": "Ejemplo con \"Inquinamento\"."
    },
    {
      "word": "Foresta",
      "translation": "Bosque",
      "example": "Ejemplo con \"Foresta\"."
    },
    {
      "word": "Fiume",
      "translation": "Río",
      "example": "Ejemplo con \"Fiume\"."
    },
    {
      "word": "Oceano",
      "translation": "Océano",
      "example": "Ejemplo con \"Oceano\"."
    },
    {
      "word": "Energia",
      "translation": "Energía",
      "example": "Ejemplo con \"Energia\"."
    },
    {
      "word": "Clima",
      "translation": "Clima",
      "example": "Ejemplo con \"Clima\"."
    },
    {
      "word": "Festa",
      "translation": "Fiesta",
      "example": "Ejemplo con \"Festa\"."
    },
    {
      "word": "Università",
      "translation": "Universidad",
      "example": "Ejemplo con \"Università\"."
    },
    {
      "word": "Conversazione",
      "translation": "Conversación",
      "example": "Ejemplo con \"Conversazione\"."
    }
  ],
  "it-lv3-le5": [
    {
      "word": "Opinione",
      "translation": "Opinión",
      "example": "Ejemplo con \"Opinione\"."
    },
    {
      "word": "Concordo",
      "translation": "De acuerdo",
      "example": "Ejemplo con \"Concordo\"."
    },
    {
      "word": "Discordo",
      "translation": "En desacuerdo",
      "example": "Ejemplo con \"Discordo\"."
    },
    {
      "word": "Forse",
      "translation": "Quizás",
      "example": "Ejemplo con \"Forse\"."
    },
    {
      "word": "Certamente",
      "translation": "Ciertamente",
      "example": "Ejemplo con \"Certamente\"."
    },
    {
      "word": "Matrimonio",
      "translation": "Boda",
      "example": "Ejemplo con \"Matrimonio\"."
    },
    {
      "word": "Festival",
      "translation": "Festival",
      "example": "Ejemplo con \"Festival\"."
    },
    {
      "word": "Concerto",
      "translation": "Concierto",
      "example": "Ejemplo con \"Concerto\"."
    },
    {
      "word": "Compleanno",
      "translation": "Cumpleaños",
      "example": "Ejemplo con \"Compleanno\"."
    },
    {
      "word": "Vacanza",
      "translation": "Vacaciones",
      "example": "Ejemplo con \"Vacanza\"."
    }
  ],
  "it-lv3-le6": [
    {
      "word": "Storia",
      "translation": "Historia",
      "example": "Ejemplo con \"Storia\"."
    },
    {
      "word": "Scienza",
      "translation": "Ciencia",
      "example": "Ejemplo con \"Scienza\"."
    },
    {
      "word": "Matematica",
      "translation": "Matemáticas",
      "example": "Ejemplo con \"Matematica\"."
    },
    {
      "word": "Esame",
      "translation": "Examen",
      "example": "Ejemplo con \"Esame\"."
    },
    {
      "word": "Compiti",
      "translation": "Tarea",
      "example": "Ejemplo con \"Compiti\"."
    },
    {
      "word": "Classe",
      "translation": "Clase",
      "example": "Ejemplo con \"Classe\"."
    },
    {
      "word": "Lettera",
      "translation": "Carta",
      "example": "Ejemplo con \"Lettera\"."
    },
    {
      "word": "Chiamata",
      "translation": "Llamada",
      "example": "Ejemplo con \"Chiamata\"."
    },
    {
      "word": "Risposta",
      "translation": "Respuesta",
      "example": "Ejemplo con \"Risposta\"."
    },
    {
      "word": "Domanda",
      "translation": "Pregunta",
      "example": "Ejemplo con \"Domanda\"."
    }
  ],
  "it-lv4-le1": [
    {
      "word": "Azienda",
      "translation": "Empresa",
      "example": "Ejemplo con \"Azienda\"."
    },
    {
      "word": "Tradizione",
      "translation": "Tradición",
      "example": "Ejemplo con \"Tradizione\"."
    },
    {
      "word": "Politica",
      "translation": "Política",
      "example": "Ejemplo con \"Politica\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Società",
      "translation": "Sociedad",
      "example": "Ejemplo con \"Società\"."
    },
    {
      "word": "Economia",
      "translation": "Economía",
      "example": "Ejemplo con \"Economia\"."
    },
    {
      "word": "Legge",
      "translation": "Ley",
      "example": "Ejemplo con \"Legge\"."
    },
    {
      "word": "Libertà",
      "translation": "Libertad",
      "example": "Ejemplo con \"Libertà\"."
    },
    {
      "word": "Mercato",
      "translation": "Mercado",
      "example": "Ejemplo con \"Mercato\"."
    },
    {
      "word": "Argomento",
      "translation": "Argumento",
      "example": "Ejemplo con \"Argomento\"."
    }
  ],
  "it-lv4-le2": [
    {
      "word": "Ricerca",
      "translation": "Investigación",
      "example": "Ejemplo con \"Ricerca\"."
    },
    {
      "word": "Scoperta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Scoperta\"."
    },
    {
      "word": "Laboratorio",
      "translation": "Laboratorio",
      "example": "Ejemplo con \"Laboratorio\"."
    },
    {
      "word": "Teoria",
      "translation": "Teoría",
      "example": "Ejemplo con \"Teoria\"."
    },
    {
      "word": "Dati",
      "translation": "Datos",
      "example": "Ejemplo con \"Dati\"."
    },
    {
      "word": "Esperimento",
      "translation": "Experimento",
      "example": "Ejemplo con \"Esperimento\"."
    },
    {
      "word": "Poesia",
      "translation": "Poesía",
      "example": "Ejemplo con \"Poesia\"."
    },
    {
      "word": "Pittura",
      "translation": "Pintura",
      "example": "Ejemplo con \"Pittura\"."
    },
    {
      "word": "Scultura",
      "translation": "Escultura",
      "example": "Ejemplo con \"Scultura\"."
    },
    {
      "word": "Romanzo",
      "translation": "Novela",
      "example": "Ejemplo con \"Romanzo\"."
    }
  ],
  "it-lv4-le3": [
    {
      "word": "Teatro",
      "translation": "Teatro",
      "example": "Ejemplo con \"Teatro\"."
    },
    {
      "word": "Artista",
      "translation": "Artista",
      "example": "Ejemplo con \"Artista\"."
    },
    {
      "word": "Letteratura",
      "translation": "Literatura",
      "example": "Ejemplo con \"Letteratura\"."
    },
    {
      "word": "Dibattito",
      "translation": "Debate",
      "example": "Ejemplo con \"Dibattito\"."
    },
    {
      "word": "Negoziazione",
      "translation": "Negociación",
      "example": "Ejemplo con \"Negoziazione\"."
    },
    {
      "word": "Strategia",
      "translation": "Estrategia",
      "example": "Ejemplo con \"Strategia\"."
    },
    {
      "word": "Leadership",
      "translation": "Liderazgo",
      "example": "Ejemplo con \"Leadership\"."
    },
    {
      "word": "Innovazione",
      "translation": "Innovación",
      "example": "Ejemplo con \"Innovazione\"."
    },
    {
      "word": "Globale",
      "translation": "Global",
      "example": "Ejemplo con \"Globale\"."
    },
    {
      "word": "Sfida",
      "translation": "Desafío",
      "example": "Ejemplo con \"Sfida\"."
    }
  ],
  "it-lv4-le4": [
    {
      "word": "Risultato",
      "translation": "Logro",
      "example": "Ejemplo con \"Risultato\"."
    },
    {
      "word": "Prospettiva",
      "translation": "Perspectiva",
      "example": "Ejemplo con \"Prospettiva\"."
    },
    {
      "word": "Analisi",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analisi\"."
    },
    {
      "word": "Oggi",
      "translation": "Hoy",
      "example": "Ejemplo con \"Oggi\"."
    },
    {
      "word": "Domani",
      "translation": "Mañana",
      "example": "Ejemplo con \"Domani\"."
    },
    {
      "word": "Settimana",
      "translation": "Semana",
      "example": "Ejemplo con \"Settimana\"."
    },
    {
      "word": "Mese",
      "translation": "Mes",
      "example": "Ejemplo con \"Mese\"."
    },
    {
      "word": "Anno",
      "translation": "Año",
      "example": "Ejemplo con \"Anno\"."
    },
    {
      "word": "Ora",
      "translation": "Hora",
      "example": "Ejemplo con \"Ora\"."
    },
    {
      "word": "Minuto",
      "translation": "Minuto",
      "example": "Ejemplo con \"Minuto\"."
    }
  ],
  "it-lv4-le5": [
    {
      "word": "Nonna",
      "translation": "Abuela",
      "example": "Ejemplo con \"Nonna\"."
    },
    {
      "word": "Nonno",
      "translation": "Abuelo",
      "example": "Ejemplo con \"Nonno\"."
    },
    {
      "word": "Genitori",
      "translation": "Padres",
      "example": "Ejemplo con \"Genitori\"."
    },
    {
      "word": "Figli",
      "translation": "Hijos",
      "example": "Ejemplo con \"Figli\"."
    },
    {
      "word": "Marito",
      "translation": "Esposo",
      "example": "Ejemplo con \"Marito\"."
    },
    {
      "word": "Moglie",
      "translation": "Esposa",
      "example": "Ejemplo con \"Moglie\"."
    },
    {
      "word": "Cugino",
      "translation": "Primo/a",
      "example": "Ejemplo con \"Cugino\"."
    },
    {
      "word": "Dieci",
      "translation": "Diez",
      "example": "Ejemplo con \"Dieci\"."
    },
    {
      "word": "Secondo",
      "translation": "Segundo",
      "example": "Ejemplo con \"Secondo\"."
    },
    {
      "word": "Tempo",
      "translation": "Tiempo",
      "example": "Ejemplo con \"Tempo\"."
    }
  ],
  "it-lv4-le6": [
    {
      "word": "Grigio",
      "translation": "Gris",
      "example": "Ejemplo con \"Grigio\"."
    },
    {
      "word": "Oro",
      "translation": "Dorado",
      "example": "Ejemplo con \"Oro\"."
    },
    {
      "word": "Deve",
      "translation": "Debe",
      "example": "Ejemplo con \"Deve\"."
    },
    {
      "word": "Può",
      "translation": "Puede",
      "example": "Ejemplo con \"Può\"."
    },
    {
      "word": "Treno",
      "translation": "Tren",
      "example": "Ejemplo con \"Treno\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notizie",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notizie\"."
    },
    {
      "word": "Politica",
      "translation": "Política",
      "example": "Ejemplo con \"Politica\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    }
  ],
  "it-lv5-le1": [
    {
      "word": "Ciao",
      "translation": "Hola",
      "example": "Ejemplo con \"Ciao\"."
    },
    {
      "word": "Treno",
      "translation": "Tren",
      "example": "Ejemplo con \"Treno\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notizie",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notizie\"."
    },
    {
      "word": "Politica",
      "translation": "Política",
      "example": "Ejemplo con \"Politica\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Ricerca",
      "translation": "Investigación",
      "example": "Ejemplo con \"Ricerca\"."
    },
    {
      "word": "Scoperta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Scoperta\"."
    },
    {
      "word": "Analisi",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analisi\"."
    }
  ],
  "it-lv5-le2": [
    {
      "word": "Ciao",
      "translation": "Hola",
      "example": "Ejemplo con \"Ciao\"."
    },
    {
      "word": "Treno",
      "translation": "Tren",
      "example": "Ejemplo con \"Treno\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notizie",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notizie\"."
    },
    {
      "word": "Politica",
      "translation": "Política",
      "example": "Ejemplo con \"Politica\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Ricerca",
      "translation": "Investigación",
      "example": "Ejemplo con \"Ricerca\"."
    },
    {
      "word": "Scoperta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Scoperta\"."
    },
    {
      "word": "Analisi",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analisi\"."
    }
  ],
  "it-lv5-le3": [
    {
      "word": "Ciao",
      "translation": "Hola",
      "example": "Ejemplo con \"Ciao\"."
    },
    {
      "word": "Treno",
      "translation": "Tren",
      "example": "Ejemplo con \"Treno\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notizie",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notizie\"."
    },
    {
      "word": "Politica",
      "translation": "Política",
      "example": "Ejemplo con \"Politica\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Ricerca",
      "translation": "Investigación",
      "example": "Ejemplo con \"Ricerca\"."
    },
    {
      "word": "Scoperta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Scoperta\"."
    },
    {
      "word": "Analisi",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analisi\"."
    }
  ],
  "it-lv5-le4": [
    {
      "word": "Ciao",
      "translation": "Hola",
      "example": "Ejemplo con \"Ciao\"."
    },
    {
      "word": "Treno",
      "translation": "Tren",
      "example": "Ejemplo con \"Treno\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notizie",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notizie\"."
    },
    {
      "word": "Politica",
      "translation": "Política",
      "example": "Ejemplo con \"Politica\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Ricerca",
      "translation": "Investigación",
      "example": "Ejemplo con \"Ricerca\"."
    },
    {
      "word": "Scoperta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Scoperta\"."
    },
    {
      "word": "Analisi",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analisi\"."
    }
  ],
  "it-lv5-le5": [
    {
      "word": "Ciao",
      "translation": "Hola",
      "example": "Ejemplo con \"Ciao\"."
    },
    {
      "word": "Treno",
      "translation": "Tren",
      "example": "Ejemplo con \"Treno\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notizie",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notizie\"."
    },
    {
      "word": "Politica",
      "translation": "Política",
      "example": "Ejemplo con \"Politica\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Ricerca",
      "translation": "Investigación",
      "example": "Ejemplo con \"Ricerca\"."
    },
    {
      "word": "Scoperta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Scoperta\"."
    },
    {
      "word": "Analisi",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analisi\"."
    }
  ],
  "it-lv5-le6": [
    {
      "word": "Ciao",
      "translation": "Hola",
      "example": "Ejemplo con \"Ciao\"."
    },
    {
      "word": "Treno",
      "translation": "Tren",
      "example": "Ejemplo con \"Treno\"."
    },
    {
      "word": "Taxi",
      "translation": "Taxi",
      "example": "Ejemplo con \"Taxi\"."
    },
    {
      "word": "Email",
      "translation": "Correo",
      "example": "Ejemplo con \"Email\"."
    },
    {
      "word": "Notizie",
      "translation": "Noticias",
      "example": "Ejemplo con \"Notizie\"."
    },
    {
      "word": "Politica",
      "translation": "Política",
      "example": "Ejemplo con \"Politica\"."
    },
    {
      "word": "Cultura",
      "translation": "Cultura",
      "example": "Ejemplo con \"Cultura\"."
    },
    {
      "word": "Ricerca",
      "translation": "Investigación",
      "example": "Ejemplo con \"Ricerca\"."
    },
    {
      "word": "Scoperta",
      "translation": "Descubrimiento",
      "example": "Ejemplo con \"Scoperta\"."
    },
    {
      "word": "Analisi",
      "translation": "Análisis",
      "example": "Ejemplo con \"Analisi\"."
    }
  ]
}

export const quizQuestions: Record<string, QuizOption[]> = {
  "en-lv1-le1": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Adiós",
      "correct": false
    },
    {
      "id": "c",
      "text": "Por favor",
      "correct": false
    },
    {
      "id": "d",
      "text": "Gracias",
      "correct": false
    }
  ],
  "en-lv1-le2": [
    {
      "id": "a",
      "text": "Nombre",
      "correct": true
    },
    {
      "id": "b",
      "text": "Edad",
      "correct": false
    },
    {
      "id": "c",
      "text": "País",
      "correct": false
    },
    {
      "id": "d",
      "text": "Ciudad",
      "correct": false
    }
  ],
  "en-lv1-le3": [
    {
      "id": "a",
      "text": "Uno",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dos",
      "correct": false
    },
    {
      "id": "c",
      "text": "Tres",
      "correct": false
    },
    {
      "id": "d",
      "text": "Cuatro",
      "correct": false
    }
  ],
  "en-lv1-le4": [
    {
      "id": "a",
      "text": "Madre",
      "correct": true
    },
    {
      "id": "b",
      "text": "Padre",
      "correct": false
    },
    {
      "id": "c",
      "text": "Hermana",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hermano",
      "correct": false
    }
  ],
  "en-lv1-le5": [
    {
      "id": "a",
      "text": "Rojo",
      "correct": true
    },
    {
      "id": "b",
      "text": "Azul",
      "correct": false
    },
    {
      "id": "c",
      "text": "Verde",
      "correct": false
    },
    {
      "id": "d",
      "text": "Amarillo",
      "correct": false
    }
  ],
  "en-lv1-le6": [
    {
      "id": "a",
      "text": "Qué",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dónde",
      "correct": false
    },
    {
      "id": "c",
      "text": "Cuándo",
      "correct": false
    },
    {
      "id": "d",
      "text": "Por qué",
      "correct": false
    }
  ],
  "en-lv2-le1": [
    {
      "id": "a",
      "text": "Tienda",
      "correct": true
    },
    {
      "id": "b",
      "text": "Precio",
      "correct": false
    },
    {
      "id": "c",
      "text": "Pan",
      "correct": false
    },
    {
      "id": "d",
      "text": "Agua",
      "correct": false
    }
  ],
  "en-lv2-le2": [
    {
      "id": "a",
      "text": "Azúcar",
      "correct": true
    },
    {
      "id": "b",
      "text": "Sal",
      "correct": false
    },
    {
      "id": "c",
      "text": "Arroz",
      "correct": false
    },
    {
      "id": "d",
      "text": "Carne",
      "correct": false
    }
  ],
  "en-lv2-le3": [
    {
      "id": "a",
      "text": "Cocina",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dormitorio",
      "correct": false
    },
    {
      "id": "c",
      "text": "Baño",
      "correct": false
    },
    {
      "id": "d",
      "text": "Ventana",
      "correct": false
    }
  ],
  "en-lv2-le4": [
    {
      "id": "a",
      "text": "Camisa",
      "correct": true
    },
    {
      "id": "b",
      "text": "Pantalón",
      "correct": false
    },
    {
      "id": "c",
      "text": "Zapatos",
      "correct": false
    },
    {
      "id": "d",
      "text": "Sombrero",
      "correct": false
    }
  ],
  "en-lv2-le5": [
    {
      "id": "a",
      "text": "Tren",
      "correct": true
    },
    {
      "id": "b",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "c",
      "text": "Aeropuerto",
      "correct": false
    },
    {
      "id": "d",
      "text": "Boleto",
      "correct": false
    }
  ],
  "en-lv2-le6": [
    {
      "id": "a",
      "text": "Caliente",
      "correct": true
    },
    {
      "id": "b",
      "text": "Frío",
      "correct": false
    },
    {
      "id": "c",
      "text": "Pasaporte",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hotel",
      "correct": false
    }
  ],
  "en-lv3-le1": [
    {
      "id": "a",
      "text": "Dolor",
      "correct": true
    },
    {
      "id": "b",
      "text": "Reunión",
      "correct": false
    },
    {
      "id": "c",
      "text": "Salario",
      "correct": false
    },
    {
      "id": "d",
      "text": "Jefe",
      "correct": false
    }
  ],
  "en-lv3-le2": [
    {
      "id": "a",
      "text": "Guitarra",
      "correct": true
    },
    {
      "id": "b",
      "text": "Deporte",
      "correct": false
    },
    {
      "id": "c",
      "text": "Libro",
      "correct": false
    },
    {
      "id": "d",
      "text": "Película",
      "correct": false
    }
  ],
  "en-lv3-le3": [
    {
      "id": "a",
      "text": "Esperanza",
      "correct": true
    },
    {
      "id": "b",
      "text": "Alegría",
      "correct": false
    },
    {
      "id": "c",
      "text": "Internet",
      "correct": false
    },
    {
      "id": "d",
      "text": "Computadora",
      "correct": false
    }
  ],
  "en-lv3-le4": [
    {
      "id": "a",
      "text": "Naturaleza",
      "correct": true
    },
    {
      "id": "b",
      "text": "Contaminación",
      "correct": false
    },
    {
      "id": "c",
      "text": "Bosque",
      "correct": false
    },
    {
      "id": "d",
      "text": "Río",
      "correct": false
    }
  ],
  "en-lv3-le5": [
    {
      "id": "a",
      "text": "Opinión",
      "correct": true
    },
    {
      "id": "b",
      "text": "De acuerdo",
      "correct": false
    },
    {
      "id": "c",
      "text": "En desacuerdo",
      "correct": false
    },
    {
      "id": "d",
      "text": "Quizás",
      "correct": false
    }
  ],
  "en-lv3-le6": [
    {
      "id": "a",
      "text": "Historia",
      "correct": true
    },
    {
      "id": "b",
      "text": "Ciencia",
      "correct": false
    },
    {
      "id": "c",
      "text": "Matemáticas",
      "correct": false
    },
    {
      "id": "d",
      "text": "Examen",
      "correct": false
    }
  ],
  "en-lv4-le1": [
    {
      "id": "a",
      "text": "Empresa",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tradición",
      "correct": false
    },
    {
      "id": "c",
      "text": "Política",
      "correct": false
    },
    {
      "id": "d",
      "text": "Cultura",
      "correct": false
    }
  ],
  "en-lv4-le2": [
    {
      "id": "a",
      "text": "Investigación",
      "correct": true
    },
    {
      "id": "b",
      "text": "Descubrimiento",
      "correct": false
    },
    {
      "id": "c",
      "text": "Laboratorio",
      "correct": false
    },
    {
      "id": "d",
      "text": "Teoría",
      "correct": false
    }
  ],
  "en-lv4-le3": [
    {
      "id": "a",
      "text": "Teatro",
      "correct": true
    },
    {
      "id": "b",
      "text": "Artista",
      "correct": false
    },
    {
      "id": "c",
      "text": "Literatura",
      "correct": false
    },
    {
      "id": "d",
      "text": "Debate",
      "correct": false
    }
  ],
  "en-lv4-le4": [
    {
      "id": "a",
      "text": "Logro",
      "correct": true
    },
    {
      "id": "b",
      "text": "Perspectiva",
      "correct": false
    },
    {
      "id": "c",
      "text": "Análisis",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hoy",
      "correct": false
    }
  ],
  "en-lv4-le5": [
    {
      "id": "a",
      "text": "Abuela",
      "correct": true
    },
    {
      "id": "b",
      "text": "Abuelo",
      "correct": false
    },
    {
      "id": "c",
      "text": "Padres",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hijos",
      "correct": false
    }
  ],
  "en-lv4-le6": [
    {
      "id": "a",
      "text": "Gris",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dorado",
      "correct": false
    },
    {
      "id": "c",
      "text": "Nunca",
      "correct": false
    },
    {
      "id": "d",
      "text": "Bonjour",
      "correct": false
    }
  ],
  "en-lv5-le1": [
    {
      "id": "a",
      "text": "Bonjour",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "en-lv5-le2": [
    {
      "id": "a",
      "text": "Bonjour",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "en-lv5-le3": [
    {
      "id": "a",
      "text": "Bonjour",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "en-lv5-le4": [
    {
      "id": "a",
      "text": "Bonjour",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "en-lv5-le5": [
    {
      "id": "a",
      "text": "Bonjour",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "en-lv5-le6": [
    {
      "id": "a",
      "text": "Bonjour",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "fr-lv1-le1": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Adiós",
      "correct": false
    },
    {
      "id": "c",
      "text": "Gracias",
      "correct": false
    },
    {
      "id": "d",
      "text": "Por favor",
      "correct": false
    }
  ],
  "fr-lv1-le2": [
    {
      "id": "a",
      "text": "Nombre",
      "correct": true
    },
    {
      "id": "b",
      "text": "Edad",
      "correct": false
    },
    {
      "id": "c",
      "text": "País",
      "correct": false
    },
    {
      "id": "d",
      "text": "Ciudad",
      "correct": false
    }
  ],
  "fr-lv1-le3": [
    {
      "id": "a",
      "text": "Uno",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dos",
      "correct": false
    },
    {
      "id": "c",
      "text": "Tres",
      "correct": false
    },
    {
      "id": "d",
      "text": "Cuatro",
      "correct": false
    }
  ],
  "fr-lv1-le4": [
    {
      "id": "a",
      "text": "Madre",
      "correct": true
    },
    {
      "id": "b",
      "text": "Padre",
      "correct": false
    },
    {
      "id": "c",
      "text": "Hermana",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hermano",
      "correct": false
    }
  ],
  "fr-lv1-le5": [
    {
      "id": "a",
      "text": "Rojo",
      "correct": true
    },
    {
      "id": "b",
      "text": "Azul",
      "correct": false
    },
    {
      "id": "c",
      "text": "Verde",
      "correct": false
    },
    {
      "id": "d",
      "text": "Amarillo",
      "correct": false
    }
  ],
  "fr-lv1-le6": [
    {
      "id": "a",
      "text": "Qué",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dónde",
      "correct": false
    },
    {
      "id": "c",
      "text": "Cuándo",
      "correct": false
    },
    {
      "id": "d",
      "text": "Por qué",
      "correct": false
    }
  ],
  "fr-lv2-le1": [
    {
      "id": "a",
      "text": "Tienda",
      "correct": true
    },
    {
      "id": "b",
      "text": "Precio",
      "correct": false
    },
    {
      "id": "c",
      "text": "Pan",
      "correct": false
    },
    {
      "id": "d",
      "text": "Agua",
      "correct": false
    }
  ],
  "fr-lv2-le2": [
    {
      "id": "a",
      "text": "Azúcar",
      "correct": true
    },
    {
      "id": "b",
      "text": "Sal",
      "correct": false
    },
    {
      "id": "c",
      "text": "Arroz",
      "correct": false
    },
    {
      "id": "d",
      "text": "Carne",
      "correct": false
    }
  ],
  "fr-lv2-le3": [
    {
      "id": "a",
      "text": "Cocina",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dormitorio",
      "correct": false
    },
    {
      "id": "c",
      "text": "Baño",
      "correct": false
    },
    {
      "id": "d",
      "text": "Ventana",
      "correct": false
    }
  ],
  "fr-lv2-le4": [
    {
      "id": "a",
      "text": "Camisa",
      "correct": true
    },
    {
      "id": "b",
      "text": "Pantalón",
      "correct": false
    },
    {
      "id": "c",
      "text": "Zapatos",
      "correct": false
    },
    {
      "id": "d",
      "text": "Sombrero",
      "correct": false
    }
  ],
  "fr-lv2-le5": [
    {
      "id": "a",
      "text": "Tren",
      "correct": true
    },
    {
      "id": "b",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "c",
      "text": "Aeropuerto",
      "correct": false
    },
    {
      "id": "d",
      "text": "Boleto",
      "correct": false
    }
  ],
  "fr-lv2-le6": [
    {
      "id": "a",
      "text": "Caliente",
      "correct": true
    },
    {
      "id": "b",
      "text": "Frío",
      "correct": false
    },
    {
      "id": "c",
      "text": "Pasaporte",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hotel",
      "correct": false
    }
  ],
  "fr-lv3-le1": [
    {
      "id": "a",
      "text": "Dolor",
      "correct": true
    },
    {
      "id": "b",
      "text": "Reunión",
      "correct": false
    },
    {
      "id": "c",
      "text": "Salario",
      "correct": false
    },
    {
      "id": "d",
      "text": "Jefe",
      "correct": false
    }
  ],
  "fr-lv3-le2": [
    {
      "id": "a",
      "text": "Guitarra",
      "correct": true
    },
    {
      "id": "b",
      "text": "Deporte",
      "correct": false
    },
    {
      "id": "c",
      "text": "Libro",
      "correct": false
    },
    {
      "id": "d",
      "text": "Película",
      "correct": false
    }
  ],
  "fr-lv3-le3": [
    {
      "id": "a",
      "text": "Esperanza",
      "correct": true
    },
    {
      "id": "b",
      "text": "Alegría",
      "correct": false
    },
    {
      "id": "c",
      "text": "Internet",
      "correct": false
    },
    {
      "id": "d",
      "text": "Computadora",
      "correct": false
    }
  ],
  "fr-lv3-le4": [
    {
      "id": "a",
      "text": "Naturaleza",
      "correct": true
    },
    {
      "id": "b",
      "text": "Contaminación",
      "correct": false
    },
    {
      "id": "c",
      "text": "Bosque",
      "correct": false
    },
    {
      "id": "d",
      "text": "Río",
      "correct": false
    }
  ],
  "fr-lv3-le5": [
    {
      "id": "a",
      "text": "Opinión",
      "correct": true
    },
    {
      "id": "b",
      "text": "De acuerdo",
      "correct": false
    },
    {
      "id": "c",
      "text": "En desacuerdo",
      "correct": false
    },
    {
      "id": "d",
      "text": "Quizás",
      "correct": false
    }
  ],
  "fr-lv3-le6": [
    {
      "id": "a",
      "text": "Historia",
      "correct": true
    },
    {
      "id": "b",
      "text": "Ciencia",
      "correct": false
    },
    {
      "id": "c",
      "text": "Matemáticas",
      "correct": false
    },
    {
      "id": "d",
      "text": "Examen",
      "correct": false
    }
  ],
  "fr-lv4-le1": [
    {
      "id": "a",
      "text": "Empresa",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tradición",
      "correct": false
    },
    {
      "id": "c",
      "text": "Política",
      "correct": false
    },
    {
      "id": "d",
      "text": "Cultura",
      "correct": false
    }
  ],
  "fr-lv4-le2": [
    {
      "id": "a",
      "text": "Investigación",
      "correct": true
    },
    {
      "id": "b",
      "text": "Descubrimiento",
      "correct": false
    },
    {
      "id": "c",
      "text": "Laboratorio",
      "correct": false
    },
    {
      "id": "d",
      "text": "Teoría",
      "correct": false
    }
  ],
  "fr-lv4-le3": [
    {
      "id": "a",
      "text": "Teatro",
      "correct": true
    },
    {
      "id": "b",
      "text": "Artista",
      "correct": false
    },
    {
      "id": "c",
      "text": "Literatura",
      "correct": false
    },
    {
      "id": "d",
      "text": "Debate",
      "correct": false
    }
  ],
  "fr-lv4-le4": [
    {
      "id": "a",
      "text": "Logro",
      "correct": true
    },
    {
      "id": "b",
      "text": "Perspectiva",
      "correct": false
    },
    {
      "id": "c",
      "text": "Análisis",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hoy",
      "correct": false
    }
  ],
  "fr-lv4-le5": [
    {
      "id": "a",
      "text": "Abuela",
      "correct": true
    },
    {
      "id": "b",
      "text": "Abuelo",
      "correct": false
    },
    {
      "id": "c",
      "text": "Padres",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hijos",
      "correct": false
    }
  ],
  "fr-lv4-le6": [
    {
      "id": "a",
      "text": "Gris",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dorado",
      "correct": false
    },
    {
      "id": "c",
      "text": "Debe",
      "correct": false
    },
    {
      "id": "d",
      "text": "Quizás",
      "correct": false
    }
  ],
  "fr-lv5-le1": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "fr-lv5-le2": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "fr-lv5-le3": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "fr-lv5-le4": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "fr-lv5-le5": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "fr-lv5-le6": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "pt-lv1-le1": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Adiós",
      "correct": false
    },
    {
      "id": "c",
      "text": "Gracias",
      "correct": false
    },
    {
      "id": "d",
      "text": "Por favor",
      "correct": false
    }
  ],
  "pt-lv1-le2": [
    {
      "id": "a",
      "text": "Nombre",
      "correct": true
    },
    {
      "id": "b",
      "text": "Edad",
      "correct": false
    },
    {
      "id": "c",
      "text": "País",
      "correct": false
    },
    {
      "id": "d",
      "text": "Ciudad",
      "correct": false
    }
  ],
  "pt-lv1-le3": [
    {
      "id": "a",
      "text": "Uno",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dos",
      "correct": false
    },
    {
      "id": "c",
      "text": "Tres",
      "correct": false
    },
    {
      "id": "d",
      "text": "Cuatro",
      "correct": false
    }
  ],
  "pt-lv1-le4": [
    {
      "id": "a",
      "text": "Madre",
      "correct": true
    },
    {
      "id": "b",
      "text": "Padre",
      "correct": false
    },
    {
      "id": "c",
      "text": "Hermana",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hermano",
      "correct": false
    }
  ],
  "pt-lv1-le5": [
    {
      "id": "a",
      "text": "Rojo",
      "correct": true
    },
    {
      "id": "b",
      "text": "Azul",
      "correct": false
    },
    {
      "id": "c",
      "text": "Verde",
      "correct": false
    },
    {
      "id": "d",
      "text": "Amarillo",
      "correct": false
    }
  ],
  "pt-lv1-le6": [
    {
      "id": "a",
      "text": "Qué",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dónde",
      "correct": false
    },
    {
      "id": "c",
      "text": "Cuándo",
      "correct": false
    },
    {
      "id": "d",
      "text": "Por qué",
      "correct": false
    }
  ],
  "pt-lv2-le1": [
    {
      "id": "a",
      "text": "Tienda",
      "correct": true
    },
    {
      "id": "b",
      "text": "Precio",
      "correct": false
    },
    {
      "id": "c",
      "text": "Pan",
      "correct": false
    },
    {
      "id": "d",
      "text": "Agua",
      "correct": false
    }
  ],
  "pt-lv2-le2": [
    {
      "id": "a",
      "text": "Azúcar",
      "correct": true
    },
    {
      "id": "b",
      "text": "Sal",
      "correct": false
    },
    {
      "id": "c",
      "text": "Arroz",
      "correct": false
    },
    {
      "id": "d",
      "text": "Carne",
      "correct": false
    }
  ],
  "pt-lv2-le3": [
    {
      "id": "a",
      "text": "Cocina",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dormitorio",
      "correct": false
    },
    {
      "id": "c",
      "text": "Baño",
      "correct": false
    },
    {
      "id": "d",
      "text": "Ventana",
      "correct": false
    }
  ],
  "pt-lv2-le4": [
    {
      "id": "a",
      "text": "Camisa",
      "correct": true
    },
    {
      "id": "b",
      "text": "Pantalón",
      "correct": false
    },
    {
      "id": "c",
      "text": "Zapatos",
      "correct": false
    },
    {
      "id": "d",
      "text": "Sombrero",
      "correct": false
    }
  ],
  "pt-lv2-le5": [
    {
      "id": "a",
      "text": "Tren",
      "correct": true
    },
    {
      "id": "b",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "c",
      "text": "Aeropuerto",
      "correct": false
    },
    {
      "id": "d",
      "text": "Boleto",
      "correct": false
    }
  ],
  "pt-lv2-le6": [
    {
      "id": "a",
      "text": "Caliente",
      "correct": true
    },
    {
      "id": "b",
      "text": "Frío",
      "correct": false
    },
    {
      "id": "c",
      "text": "Pasaporte",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hotel",
      "correct": false
    }
  ],
  "pt-lv3-le1": [
    {
      "id": "a",
      "text": "Dolor",
      "correct": true
    },
    {
      "id": "b",
      "text": "Reunión",
      "correct": false
    },
    {
      "id": "c",
      "text": "Salario",
      "correct": false
    },
    {
      "id": "d",
      "text": "Jefe",
      "correct": false
    }
  ],
  "pt-lv3-le2": [
    {
      "id": "a",
      "text": "Guitarra",
      "correct": true
    },
    {
      "id": "b",
      "text": "Deporte",
      "correct": false
    },
    {
      "id": "c",
      "text": "Libro",
      "correct": false
    },
    {
      "id": "d",
      "text": "Película",
      "correct": false
    }
  ],
  "pt-lv3-le3": [
    {
      "id": "a",
      "text": "Esperanza",
      "correct": true
    },
    {
      "id": "b",
      "text": "Alegría",
      "correct": false
    },
    {
      "id": "c",
      "text": "Internet",
      "correct": false
    },
    {
      "id": "d",
      "text": "Computadora",
      "correct": false
    }
  ],
  "pt-lv3-le4": [
    {
      "id": "a",
      "text": "Naturaleza",
      "correct": true
    },
    {
      "id": "b",
      "text": "Contaminación",
      "correct": false
    },
    {
      "id": "c",
      "text": "Bosque",
      "correct": false
    },
    {
      "id": "d",
      "text": "Río",
      "correct": false
    }
  ],
  "pt-lv3-le5": [
    {
      "id": "a",
      "text": "Opinión",
      "correct": true
    },
    {
      "id": "b",
      "text": "De acuerdo",
      "correct": false
    },
    {
      "id": "c",
      "text": "En desacuerdo",
      "correct": false
    },
    {
      "id": "d",
      "text": "Quizás",
      "correct": false
    }
  ],
  "pt-lv3-le6": [
    {
      "id": "a",
      "text": "Historia",
      "correct": true
    },
    {
      "id": "b",
      "text": "Ciencia",
      "correct": false
    },
    {
      "id": "c",
      "text": "Matemáticas",
      "correct": false
    },
    {
      "id": "d",
      "text": "Examen",
      "correct": false
    }
  ],
  "pt-lv4-le1": [
    {
      "id": "a",
      "text": "Empresa",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tradición",
      "correct": false
    },
    {
      "id": "c",
      "text": "Política",
      "correct": false
    },
    {
      "id": "d",
      "text": "Cultura",
      "correct": false
    }
  ],
  "pt-lv4-le2": [
    {
      "id": "a",
      "text": "Investigación",
      "correct": true
    },
    {
      "id": "b",
      "text": "Descubrimiento",
      "correct": false
    },
    {
      "id": "c",
      "text": "Laboratorio",
      "correct": false
    },
    {
      "id": "d",
      "text": "Teoría",
      "correct": false
    }
  ],
  "pt-lv4-le3": [
    {
      "id": "a",
      "text": "Teatro",
      "correct": true
    },
    {
      "id": "b",
      "text": "Artista",
      "correct": false
    },
    {
      "id": "c",
      "text": "Literatura",
      "correct": false
    },
    {
      "id": "d",
      "text": "Debate",
      "correct": false
    }
  ],
  "pt-lv4-le4": [
    {
      "id": "a",
      "text": "Logro",
      "correct": true
    },
    {
      "id": "b",
      "text": "Perspectiva",
      "correct": false
    },
    {
      "id": "c",
      "text": "Análisis",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hoy",
      "correct": false
    }
  ],
  "pt-lv4-le5": [
    {
      "id": "a",
      "text": "Abuela",
      "correct": true
    },
    {
      "id": "b",
      "text": "Abuelo",
      "correct": false
    },
    {
      "id": "c",
      "text": "Padres",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hijos",
      "correct": false
    }
  ],
  "pt-lv4-le6": [
    {
      "id": "a",
      "text": "Gris",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dorado",
      "correct": false
    },
    {
      "id": "c",
      "text": "Debe",
      "correct": false
    },
    {
      "id": "d",
      "text": "Puede",
      "correct": false
    }
  ],
  "pt-lv5-le1": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "pt-lv5-le2": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "pt-lv5-le3": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "pt-lv5-le4": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "pt-lv5-le5": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "pt-lv5-le6": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "it-lv1-le1": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Adiós",
      "correct": false
    },
    {
      "id": "c",
      "text": "Gracias",
      "correct": false
    },
    {
      "id": "d",
      "text": "Por favor",
      "correct": false
    }
  ],
  "it-lv1-le2": [
    {
      "id": "a",
      "text": "Nombre",
      "correct": true
    },
    {
      "id": "b",
      "text": "Edad",
      "correct": false
    },
    {
      "id": "c",
      "text": "País",
      "correct": false
    },
    {
      "id": "d",
      "text": "Ciudad",
      "correct": false
    }
  ],
  "it-lv1-le3": [
    {
      "id": "a",
      "text": "Uno",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dos",
      "correct": false
    },
    {
      "id": "c",
      "text": "Tres",
      "correct": false
    },
    {
      "id": "d",
      "text": "Cuatro",
      "correct": false
    }
  ],
  "it-lv1-le4": [
    {
      "id": "a",
      "text": "Madre",
      "correct": true
    },
    {
      "id": "b",
      "text": "Padre",
      "correct": false
    },
    {
      "id": "c",
      "text": "Hermana",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hermano",
      "correct": false
    }
  ],
  "it-lv1-le5": [
    {
      "id": "a",
      "text": "Rojo",
      "correct": true
    },
    {
      "id": "b",
      "text": "Azul",
      "correct": false
    },
    {
      "id": "c",
      "text": "Verde",
      "correct": false
    },
    {
      "id": "d",
      "text": "Amarillo",
      "correct": false
    }
  ],
  "it-lv1-le6": [
    {
      "id": "a",
      "text": "Qué",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dónde",
      "correct": false
    },
    {
      "id": "c",
      "text": "Cuándo",
      "correct": false
    },
    {
      "id": "d",
      "text": "Por qué",
      "correct": false
    }
  ],
  "it-lv2-le1": [
    {
      "id": "a",
      "text": "Tienda",
      "correct": true
    },
    {
      "id": "b",
      "text": "Precio",
      "correct": false
    },
    {
      "id": "c",
      "text": "Pan",
      "correct": false
    },
    {
      "id": "d",
      "text": "Agua",
      "correct": false
    }
  ],
  "it-lv2-le2": [
    {
      "id": "a",
      "text": "Azúcar",
      "correct": true
    },
    {
      "id": "b",
      "text": "Sal",
      "correct": false
    },
    {
      "id": "c",
      "text": "Arroz",
      "correct": false
    },
    {
      "id": "d",
      "text": "Carne",
      "correct": false
    }
  ],
  "it-lv2-le3": [
    {
      "id": "a",
      "text": "Cocina",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dormitorio",
      "correct": false
    },
    {
      "id": "c",
      "text": "Baño",
      "correct": false
    },
    {
      "id": "d",
      "text": "Ventana",
      "correct": false
    }
  ],
  "it-lv2-le4": [
    {
      "id": "a",
      "text": "Camisa",
      "correct": true
    },
    {
      "id": "b",
      "text": "Pantalón",
      "correct": false
    },
    {
      "id": "c",
      "text": "Zapatos",
      "correct": false
    },
    {
      "id": "d",
      "text": "Sombrero",
      "correct": false
    }
  ],
  "it-lv2-le5": [
    {
      "id": "a",
      "text": "Tren",
      "correct": true
    },
    {
      "id": "b",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "c",
      "text": "Aeropuerto",
      "correct": false
    },
    {
      "id": "d",
      "text": "Boleto",
      "correct": false
    }
  ],
  "it-lv2-le6": [
    {
      "id": "a",
      "text": "Caliente",
      "correct": true
    },
    {
      "id": "b",
      "text": "Frío",
      "correct": false
    },
    {
      "id": "c",
      "text": "Pasaporte",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hotel",
      "correct": false
    }
  ],
  "it-lv3-le1": [
    {
      "id": "a",
      "text": "Dolor",
      "correct": true
    },
    {
      "id": "b",
      "text": "Reunión",
      "correct": false
    },
    {
      "id": "c",
      "text": "Salario",
      "correct": false
    },
    {
      "id": "d",
      "text": "Jefe",
      "correct": false
    }
  ],
  "it-lv3-le2": [
    {
      "id": "a",
      "text": "Guitarra",
      "correct": true
    },
    {
      "id": "b",
      "text": "Deporte",
      "correct": false
    },
    {
      "id": "c",
      "text": "Libro",
      "correct": false
    },
    {
      "id": "d",
      "text": "Película",
      "correct": false
    }
  ],
  "it-lv3-le3": [
    {
      "id": "a",
      "text": "Esperanza",
      "correct": true
    },
    {
      "id": "b",
      "text": "Alegría",
      "correct": false
    },
    {
      "id": "c",
      "text": "Internet",
      "correct": false
    },
    {
      "id": "d",
      "text": "Computadora",
      "correct": false
    }
  ],
  "it-lv3-le4": [
    {
      "id": "a",
      "text": "Naturaleza",
      "correct": true
    },
    {
      "id": "b",
      "text": "Contaminación",
      "correct": false
    },
    {
      "id": "c",
      "text": "Bosque",
      "correct": false
    },
    {
      "id": "d",
      "text": "Río",
      "correct": false
    }
  ],
  "it-lv3-le5": [
    {
      "id": "a",
      "text": "Opinión",
      "correct": true
    },
    {
      "id": "b",
      "text": "De acuerdo",
      "correct": false
    },
    {
      "id": "c",
      "text": "En desacuerdo",
      "correct": false
    },
    {
      "id": "d",
      "text": "Quizás",
      "correct": false
    }
  ],
  "it-lv3-le6": [
    {
      "id": "a",
      "text": "Historia",
      "correct": true
    },
    {
      "id": "b",
      "text": "Ciencia",
      "correct": false
    },
    {
      "id": "c",
      "text": "Matemáticas",
      "correct": false
    },
    {
      "id": "d",
      "text": "Examen",
      "correct": false
    }
  ],
  "it-lv4-le1": [
    {
      "id": "a",
      "text": "Empresa",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tradición",
      "correct": false
    },
    {
      "id": "c",
      "text": "Política",
      "correct": false
    },
    {
      "id": "d",
      "text": "Cultura",
      "correct": false
    }
  ],
  "it-lv4-le2": [
    {
      "id": "a",
      "text": "Investigación",
      "correct": true
    },
    {
      "id": "b",
      "text": "Descubrimiento",
      "correct": false
    },
    {
      "id": "c",
      "text": "Laboratorio",
      "correct": false
    },
    {
      "id": "d",
      "text": "Teoría",
      "correct": false
    }
  ],
  "it-lv4-le3": [
    {
      "id": "a",
      "text": "Teatro",
      "correct": true
    },
    {
      "id": "b",
      "text": "Artista",
      "correct": false
    },
    {
      "id": "c",
      "text": "Literatura",
      "correct": false
    },
    {
      "id": "d",
      "text": "Debate",
      "correct": false
    }
  ],
  "it-lv4-le4": [
    {
      "id": "a",
      "text": "Logro",
      "correct": true
    },
    {
      "id": "b",
      "text": "Perspectiva",
      "correct": false
    },
    {
      "id": "c",
      "text": "Análisis",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hoy",
      "correct": false
    }
  ],
  "it-lv4-le5": [
    {
      "id": "a",
      "text": "Abuela",
      "correct": true
    },
    {
      "id": "b",
      "text": "Abuelo",
      "correct": false
    },
    {
      "id": "c",
      "text": "Padres",
      "correct": false
    },
    {
      "id": "d",
      "text": "Hijos",
      "correct": false
    }
  ],
  "it-lv4-le6": [
    {
      "id": "a",
      "text": "Gris",
      "correct": true
    },
    {
      "id": "b",
      "text": "Dorado",
      "correct": false
    },
    {
      "id": "c",
      "text": "Debe",
      "correct": false
    },
    {
      "id": "d",
      "text": "Puede",
      "correct": false
    }
  ],
  "it-lv5-le1": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "it-lv5-le2": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "it-lv5-le3": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "it-lv5-le4": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "it-lv5-le5": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ],
  "it-lv5-le6": [
    {
      "id": "a",
      "text": "Hola",
      "correct": true
    },
    {
      "id": "b",
      "text": "Tren",
      "correct": false
    },
    {
      "id": "c",
      "text": "Taxi",
      "correct": false
    },
    {
      "id": "d",
      "text": "Correo",
      "correct": false
    }
  ]
}

export const quizPrompts: Record<string, string> = {
  "en-lv1-le1": "¿Qué significa \"Hello\"?",
  "en-lv1-le2": "¿Qué significa \"Name\"?",
  "en-lv1-le3": "¿Qué significa \"One\"?",
  "en-lv1-le4": "¿Qué significa \"Mother\"?",
  "en-lv1-le5": "¿Qué significa \"Red\"?",
  "en-lv1-le6": "¿Qué significa \"What\"?",
  "en-lv2-le1": "¿Qué significa \"Shop\"?",
  "en-lv2-le2": "¿Qué significa \"Sugar\"?",
  "en-lv2-le3": "¿Qué significa \"Kitchen\"?",
  "en-lv2-le4": "¿Qué significa \"Shirt\"?",
  "en-lv2-le5": "¿Qué significa \"Train\"?",
  "en-lv2-le6": "¿Qué significa \"Hot\"?",
  "en-lv3-le1": "¿Qué significa \"Pain\"?",
  "en-lv3-le2": "¿Qué significa \"Guitar\"?",
  "en-lv3-le3": "¿Qué significa \"Hope\"?",
  "en-lv3-le4": "¿Qué significa \"Nature\"?",
  "en-lv3-le5": "¿Qué significa \"Opinion\"?",
  "en-lv3-le6": "¿Qué significa \"History\"?",
  "en-lv4-le1": "¿Qué significa \"Company\"?",
  "en-lv4-le2": "¿Qué significa \"Research\"?",
  "en-lv4-le3": "¿Qué significa \"Theater\"?",
  "en-lv4-le4": "¿Qué significa \"Achievement\"?",
  "en-lv4-le5": "¿Qué significa \"Grandmother\"?",
  "en-lv4-le6": "¿Qué significa \"Gray\"?",
  "en-lv5-le1": "¿Qué significa \"Bonjour\"?",
  "en-lv5-le2": "¿Qué significa \"Bonjour\"?",
  "en-lv5-le3": "¿Qué significa \"Bonjour\"?",
  "en-lv5-le4": "¿Qué significa \"Bonjour\"?",
  "en-lv5-le5": "¿Qué significa \"Bonjour\"?",
  "en-lv5-le6": "¿Qué significa \"Bonjour\"?",
  "fr-lv1-le1": "¿Qué significa \"Bonjour\"?",
  "fr-lv1-le2": "¿Qué significa \"Nom\"?",
  "fr-lv1-le3": "¿Qué significa \"Un\"?",
  "fr-lv1-le4": "¿Qué significa \"Mère\"?",
  "fr-lv1-le5": "¿Qué significa \"Rouge\"?",
  "fr-lv1-le6": "¿Qué significa \"Quoi\"?",
  "fr-lv2-le1": "¿Qué significa \"Magasin\"?",
  "fr-lv2-le2": "¿Qué significa \"Sucre\"?",
  "fr-lv2-le3": "¿Qué significa \"Cuisine\"?",
  "fr-lv2-le4": "¿Qué significa \"Chemise\"?",
  "fr-lv2-le5": "¿Qué significa \"Train\"?",
  "fr-lv2-le6": "¿Qué significa \"Chaud\"?",
  "fr-lv3-le1": "¿Qué significa \"Douleur\"?",
  "fr-lv3-le2": "¿Qué significa \"Guitare\"?",
  "fr-lv3-le3": "¿Qué significa \"Espoir\"?",
  "fr-lv3-le4": "¿Qué significa \"Nature\"?",
  "fr-lv3-le5": "¿Qué significa \"Opinion\"?",
  "fr-lv3-le6": "¿Qué significa \"Histoire\"?",
  "fr-lv4-le1": "¿Qué significa \"Entreprise\"?",
  "fr-lv4-le2": "¿Qué significa \"Recherche\"?",
  "fr-lv4-le3": "¿Qué significa \"Théâtre\"?",
  "fr-lv4-le4": "¿Qué significa \"Réussite\"?",
  "fr-lv4-le5": "¿Qué significa \"Grandmère\"?",
  "fr-lv4-le6": "¿Qué significa \"Gris\"?",
  "fr-lv5-le1": "¿Qué significa \"Bonjour\"?",
  "fr-lv5-le2": "¿Qué significa \"Bonjour\"?",
  "fr-lv5-le3": "¿Qué significa \"Bonjour\"?",
  "fr-lv5-le4": "¿Qué significa \"Bonjour\"?",
  "fr-lv5-le5": "¿Qué significa \"Bonjour\"?",
  "fr-lv5-le6": "¿Qué significa \"Bonjour\"?",
  "pt-lv1-le1": "¿Qué significa \"Olá\"?",
  "pt-lv1-le2": "¿Qué significa \"Nome\"?",
  "pt-lv1-le3": "¿Qué significa \"Um\"?",
  "pt-lv1-le4": "¿Qué significa \"Mãe\"?",
  "pt-lv1-le5": "¿Qué significa \"Vermelho\"?",
  "pt-lv1-le6": "¿Qué significa \"O que\"?",
  "pt-lv2-le1": "¿Qué significa \"Loja\"?",
  "pt-lv2-le2": "¿Qué significa \"Açúcar\"?",
  "pt-lv2-le3": "¿Qué significa \"Cozinha\"?",
  "pt-lv2-le4": "¿Qué significa \"Camisa\"?",
  "pt-lv2-le5": "¿Qué significa \"Trem\"?",
  "pt-lv2-le6": "¿Qué significa \"Quente\"?",
  "pt-lv3-le1": "¿Qué significa \"Dor\"?",
  "pt-lv3-le2": "¿Qué significa \"Guitarra\"?",
  "pt-lv3-le3": "¿Qué significa \"Esperança\"?",
  "pt-lv3-le4": "¿Qué significa \"Natureza\"?",
  "pt-lv3-le5": "¿Qué significa \"Opinião\"?",
  "pt-lv3-le6": "¿Qué significa \"História\"?",
  "pt-lv4-le1": "¿Qué significa \"Empresa\"?",
  "pt-lv4-le2": "¿Qué significa \"Pesquisa\"?",
  "pt-lv4-le3": "¿Qué significa \"Teatro\"?",
  "pt-lv4-le4": "¿Qué significa \"Conquista\"?",
  "pt-lv4-le5": "¿Qué significa \"Avó\"?",
  "pt-lv4-le6": "¿Qué significa \"Cinza\"?",
  "pt-lv5-le1": "¿Qué significa \"Olá\"?",
  "pt-lv5-le2": "¿Qué significa \"Olá\"?",
  "pt-lv5-le3": "¿Qué significa \"Olá\"?",
  "pt-lv5-le4": "¿Qué significa \"Olá\"?",
  "pt-lv5-le5": "¿Qué significa \"Olá\"?",
  "pt-lv5-le6": "¿Qué significa \"Olá\"?",
  "it-lv1-le1": "¿Qué significa \"Ciao\"?",
  "it-lv1-le2": "¿Qué significa \"Nome\"?",
  "it-lv1-le3": "¿Qué significa \"Uno\"?",
  "it-lv1-le4": "¿Qué significa \"Madre\"?",
  "it-lv1-le5": "¿Qué significa \"Rosso\"?",
  "it-lv1-le6": "¿Qué significa \"Cosa\"?",
  "it-lv2-le1": "¿Qué significa \"Negozio\"?",
  "it-lv2-le2": "¿Qué significa \"Zucchero\"?",
  "it-lv2-le3": "¿Qué significa \"Cucina\"?",
  "it-lv2-le4": "¿Qué significa \"Camicia\"?",
  "it-lv2-le5": "¿Qué significa \"Treno\"?",
  "it-lv2-le6": "¿Qué significa \"Caldo\"?",
  "it-lv3-le1": "¿Qué significa \"Dolore\"?",
  "it-lv3-le2": "¿Qué significa \"Chitarra\"?",
  "it-lv3-le3": "¿Qué significa \"Speranza\"?",
  "it-lv3-le4": "¿Qué significa \"Natura\"?",
  "it-lv3-le5": "¿Qué significa \"Opinione\"?",
  "it-lv3-le6": "¿Qué significa \"Storia\"?",
  "it-lv4-le1": "¿Qué significa \"Azienda\"?",
  "it-lv4-le2": "¿Qué significa \"Ricerca\"?",
  "it-lv4-le3": "¿Qué significa \"Teatro\"?",
  "it-lv4-le4": "¿Qué significa \"Risultato\"?",
  "it-lv4-le5": "¿Qué significa \"Nonna\"?",
  "it-lv4-le6": "¿Qué significa \"Grigio\"?",
  "it-lv5-le1": "¿Qué significa \"Ciao\"?",
  "it-lv5-le2": "¿Qué significa \"Ciao\"?",
  "it-lv5-le3": "¿Qué significa \"Ciao\"?",
  "it-lv5-le4": "¿Qué significa \"Ciao\"?",
  "it-lv5-le5": "¿Qué significa \"Ciao\"?",
  "it-lv5-le6": "¿Qué significa \"Ciao\"?"
}

export const defaultVocabulary: VocabularyItem[] = [
  { word: 'Welcome', translation: 'Bienvenida', example: 'Welcome to Langflow!' },
  { word: 'Learn', translation: 'Aprender', example: 'Learn every day.' },
  { word: 'Practice', translation: 'Practicar', example: 'Practice makes perfect.' },
]
