import {
  TOTAL_VOCABULARY_WORDS,
  LESSONS_PER_LEVEL,
  LEVEL_COUNT,
  languages as allLanguages,
  languageLevels,
  lessons,
  vocabulary,
  quizQuestions,
  quizPrompts,
  defaultVocabulary,
} from './generatedContent'

/** Idiomas activos en la plataforma (sin italiano). */
export const languages = allLanguages.filter((lang) => lang.id === 'en' || lang.id === 'fr' || lang.id === 'pt')

export {
  TOTAL_VOCABULARY_WORDS,
  LESSONS_PER_LEVEL,
  LEVEL_COUNT,
  languageLevels,
  lessons,
  vocabulary,
  quizQuestions,
  quizPrompts,
  defaultVocabulary,
}
