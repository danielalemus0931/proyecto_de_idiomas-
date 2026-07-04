import type { Language, Lesson, QuizOption, VocabularyItem } from '../types'

export const languages: Language[] = [
  {
    id: 'en',
    name: 'Inglés',
    flag: '🇬🇧',
    code: 'gb',
    description: 'Saludos, presentaciones y vocabulario básico del día a día.',
    level: 'Principiante',
  },
  {
    id: 'fr',
    name: 'Francés',
    flag: '🇫🇷',
    code: 'fr',
    description: 'Frases útiles para viajar y conversaciones sencillas.',
    level: 'Principiante',
  },
  {
    id: 'pt',
    name: 'Portugués',
    flag: '🇵🇹',
    code: 'pt',
    description: 'Palabras esenciales para empezar a comunicarte.',
    level: 'Principiante',
  },
  {
    id: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
    code: 'it',
    description: 'Expresiones cotidianas y vocabulario de restaurante.',
    level: 'Principiante',
  },
]

export const lessons: Record<string, Lesson[]> = {
  en: [
    { id: 'en-1', title: 'Saludos y despedidas', topic: 'Conversación', duration: '5 min', words: 12 },
    { id: 'en-2', title: 'Presentarte', topic: 'Conversación', duration: '7 min', words: 15 },
    { id: 'en-3', title: 'En el café', topic: 'Vida diaria', duration: '6 min', words: 10 },
  ],
  fr: [
    { id: 'fr-1', title: 'Bonjour et au revoir', topic: 'Conversación', duration: '5 min', words: 11 },
    { id: 'fr-2', title: 'Se présenter', topic: 'Conversación', duration: '7 min', words: 14 },
  ],
  pt: [
    { id: 'pt-1', title: 'Cumprimentos', topic: 'Conversación', duration: '5 min', words: 10 },
    { id: 'pt-2', title: 'No mercado', topic: 'Vida diaria', duration: '6 min', words: 12 },
  ],
  it: [
    { id: 'it-1', title: 'Ciao e arrivederci', topic: 'Conversación', duration: '5 min', words: 11 },
    { id: 'it-2', title: 'Al ristorante', topic: 'Vida diaria', duration: '6 min', words: 13 },
  ],
}

export const vocabulary: Record<string, VocabularyItem[]> = {
  'en-1': [
    { word: 'Hello', translation: 'Hola', example: 'Hello! How are you?' },
    { word: 'Good morning', translation: 'Buenos días', example: 'Good morning, everyone!' },
    { word: 'Good night', translation: 'Buenas noches', example: 'Good night, see you tomorrow.' },
    { word: 'Goodbye', translation: 'Adiós', example: 'Goodbye! Have a nice day.' },
    { word: 'Please', translation: 'Por favor', example: 'Can I have water, please?' },
    { word: 'Thank you', translation: 'Gracias', example: 'Thank you for your help.' },
  ],
  'fr-1': [
    { word: 'Bonjour', translation: 'Hola / Buenos días', example: 'Bonjour madame!' },
    { word: 'Bonsoir', translation: 'Buenas tardes / noches', example: 'Bonsoir, comment allez-vous?' },
    { word: 'Au revoir', translation: 'Adiós', example: 'Au revoir et à bientôt!' },
    { word: 'Merci', translation: 'Gracias', example: 'Merci beaucoup!' },
    { word: 'S\'il vous plaît', translation: 'Por favor', example: 'Un café, s\'il vous plaît.' },
  ],
  'pt-1': [
    { word: 'Olá', translation: 'Hola', example: 'Olá! Tudo bem?' },
    { word: 'Bom dia', translation: 'Buenos días', example: 'Bom dia, como vai?' },
    { word: 'Boa noite', translation: 'Buenas noches', example: 'Boa noite, até amanhã.' },
    { word: 'Obrigado', translation: 'Gracias', example: 'Obrigado pela ajuda!' },
  ],
  'it-1': [
    { word: 'Ciao', translation: 'Hola / Adiós', example: 'Ciao! Come stai?' },
    { word: 'Buongiorno', translation: 'Buenos días', example: 'Buongiorno a tutti!' },
    { word: 'Buonanotte', translation: 'Buenas noches', example: 'Buonanotte, dormi bene.' },
    { word: 'Grazie', translation: 'Gracias', example: 'Grazie mille!' },
  ],
  'en-2': [
    { word: 'Name', translation: 'Nombre', example: 'My name is Ana.' },
    { word: 'Age', translation: 'Edad', example: 'I am twenty years old.' },
    { word: 'Country', translation: 'País', example: 'I am from Colombia.' },
    { word: 'Student', translation: 'Estudiante', example: 'I am a student.' },
    { word: 'Teacher', translation: 'Profesor/a', example: 'She is a teacher.' },
  ],
  'en-3': [
    { word: 'Coffee', translation: 'Café', example: 'I would like a coffee, please.' },
    { word: 'Water', translation: 'Agua', example: 'Can I have water?' },
    { word: 'Menu', translation: 'Menú', example: 'Can I see the menu?' },
    { word: 'Bill', translation: 'Cuenta', example: 'The bill, please.' },
    { word: 'Sugar', translation: 'Azúcar', example: 'With sugar, please.' },
  ],
  'fr-2': [
    { word: 'Je m\'appelle', translation: 'Me llamo', example: 'Je m\'appelle Marie.' },
    { word: 'J\'ai', translation: 'Tengo', example: 'J\'ai vingt ans.' },
    { word: 'Je suis', translation: 'Soy', example: 'Je suis étudiant.' },
    { word: 'France', translation: 'Francia', example: 'Je viens de France.' },
  ],
  'pt-2': [
    { word: 'Maçã', translation: 'Manzana', example: 'Quero uma maçã.' },
    { word: 'Pão', translation: 'Pan', example: 'Dois pães, por favor.' },
    { word: 'Leite', translation: 'Leche', example: 'Um litro de leite.' },
    { word: 'Preço', translation: 'Precio', example: 'Qual é o preço?' },
  ],
  'it-2': [
    { word: 'Pizza', translation: 'Pizza', example: 'Una pizza margherita.' },
    { word: 'Acqua', translation: 'Agua', example: 'Acqua naturale, per favore.' },
    { word: 'Conto', translation: 'Cuenta', example: 'Il conto, per favore.' },
    { word: 'Menu', translation: 'Menú', example: 'Posso vedere il menu?' },
  ],
}

export const quizQuestions: Record<string, QuizOption[]> = {
  'en-1': [
    { id: 'a', text: 'Hola', correct: true },
    { id: 'b', text: 'Adiós', correct: false },
    { id: 'c', text: 'Gracias', correct: false },
    { id: 'd', text: 'Por favor', correct: false },
  ],
  'fr-1': [
    { id: 'a', text: 'Hola / Buenos días', correct: true },
    { id: 'b', text: 'Adiós', correct: false },
    { id: 'c', text: 'Gracias', correct: false },
    { id: 'd', text: 'Por favor', correct: false },
  ],
  'pt-1': [
    { id: 'a', text: 'Hola', correct: true },
    { id: 'b', text: 'Buenos días', correct: false },
    { id: 'c', text: 'Gracias', correct: false },
    { id: 'd', text: 'Adiós', correct: false },
  ],
  'it-1': [
    { id: 'a', text: 'Hola / Adiós', correct: true },
    { id: 'b', text: 'Buenos días', correct: false },
    { id: 'c', text: 'Gracias', correct: false },
    { id: 'd', text: 'Buenas noches', correct: false },
  ],
  'en-2': [
    { id: 'a', text: 'Nombre', correct: true },
    { id: 'b', text: 'Edad', correct: false },
    { id: 'c', text: 'País', correct: false },
    { id: 'd', text: 'Profesor/a', correct: false },
  ],
  'en-3': [
    { id: 'a', text: 'Café', correct: true },
    { id: 'b', text: 'Agua', correct: false },
    { id: 'c', text: 'Menú', correct: false },
    { id: 'd', text: 'Azúcar', correct: false },
  ],
  'fr-2': [
    { id: 'a', text: 'Me llamo', correct: true },
    { id: 'b', text: 'Tengo', correct: false },
    { id: 'c', text: 'Soy', correct: false },
    { id: 'd', text: 'Francia', correct: false },
  ],
  'pt-2': [
    { id: 'a', text: 'Manzana', correct: true },
    { id: 'b', text: 'Pan', correct: false },
    { id: 'c', text: 'Leche', correct: false },
    { id: 'd', text: 'Precio', correct: false },
  ],
  'it-2': [
    { id: 'a', text: 'Pizza', correct: true },
    { id: 'b', text: 'Agua', correct: false },
    { id: 'c', text: 'Cuenta', correct: false },
    { id: 'd', text: 'Menú', correct: false },
  ],
}

export const quizPrompts: Record<string, string> = {
  'en-1': '¿Qué significa "Hello"?',
  'fr-1': '¿Qué significa "Bonjour"?',
  'pt-1': '¿Qué significa "Olá"?',
  'it-1': '¿Qué significa "Ciao"?',
  'en-2': '¿Qué significa "Name"?',
  'en-3': '¿Qué significa "Coffee"?',
  'fr-2': '¿Qué significa "Je m\'appelle"?',
  'pt-2': '¿Qué significa "Maçã"?',
  'it-2': '¿Qué significa "Pizza"?',
}

export const defaultVocabulary: VocabularyItem[] = [
  { word: 'Welcome', translation: 'Bienvenida', example: 'Welcome to Langflow!' },
  { word: 'Learn', translation: 'Aprender', example: 'Learn a new word every day.' },
  { word: 'Practice', translation: 'Practicar', example: 'Practice makes perfect.' },
]
