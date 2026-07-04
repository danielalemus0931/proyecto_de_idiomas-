import { useState } from 'react'
import './App.css'
import {
  defaultVocabulary,
  languages,
  lessons,
  quizPrompts,
  quizQuestions,
  vocabulary,
} from './data/content'

type Screen = 'home' | 'lessons' | 'lesson'

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(null)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)

  const selectedLanguage = languages.find((lang) => lang.id === selectedLanguageId)
  const languageLessons = selectedLanguageId ? lessons[selectedLanguageId] ?? [] : []
  const currentLesson = languageLessons.find((lesson) => lesson.id === selectedLessonId)
  const lessonWords = selectedLessonId
    ? vocabulary[selectedLessonId] ?? defaultVocabulary
    : defaultVocabulary
  const quizOptions = selectedLessonId ? quizQuestions[selectedLessonId] : undefined
  const quizPrompt = selectedLessonId ? quizPrompts[selectedLessonId] : undefined

  const openLanguage = (languageId: string) => {
    setSelectedLanguageId(languageId)
    setSelectedLessonId(null)
    setQuizAnswer(null)
    setScreen('lessons')
  }

  const openLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId)
    setQuizAnswer(null)
    setScreen('lesson')
  }

  const goHome = () => {
    setScreen('home')
    setSelectedLanguageId(null)
    setSelectedLessonId(null)
    setQuizAnswer(null)
  }

  const goToLessons = () => {
    setScreen('lessons')
    setSelectedLessonId(null)
    setQuizAnswer(null)
  }

  const handleQuizAnswer = (optionId: string, correct: boolean) => {
    if (quizAnswer !== null) return
    setQuizAnswer(optionId)
    if (correct) {
      // Placeholder for future progress tracking
    }
  }

  return (
    <div className="app">
      {screen === 'home' && (
        <>
          <header className="app-header">
            <div className="logo">
              <span className="logo-icon" aria-hidden="true">
                🌍
              </span>
              Langflow
            </div>
            <h1>Aprende idiomas a tu ritmo</h1>
            <p>Elige un idioma, practica vocabulario y pon a prueba lo aprendido.</p>
          </header>

          <div className="stats-bar">
            <div className="stat-card">
              <span className="stat-value">{languages.length}</span>
              <span className="stat-label">Idiomas</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">12+</span>
              <span className="stat-label">Lecciones</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">5 min</span>
              <span className="stat-label">Por sesión</span>
            </div>
          </div>

          <h2 className="section-title">Elige tu idioma</h2>
          <div className="language-grid">
            {languages.map((language) => (
              <button
                key={language.id}
                className="language-card"
                onClick={() => openLanguage(language.id)}
              >
                <span className="language-flag" aria-hidden="true">
                  {language.flag}
                </span>
                <h3>{language.name}</h3>
                <p>{language.description}</p>
                <span className="badge">{language.level}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {screen === 'lessons' && selectedLanguage && (
        <>
          <button className="back-button" onClick={goHome}>
            ← Volver
          </button>
          <header className="lesson-header">
            <h2>
              {selectedLanguage.flag} {selectedLanguage.name}
            </h2>
            <p>Selecciona una lección para empezar.</p>
          </header>

          <div className="lesson-list">
            {languageLessons.map((lesson) => (
              <button
                key={lesson.id}
                className="lesson-card"
                onClick={() => openLesson(lesson.id)}
              >
                <div>
                  <h3>{lesson.title}</h3>
                  <p className="lesson-meta">
                    {lesson.topic} · {lesson.duration} · {lesson.words} palabras
                  </p>
                </div>
                <span className="lesson-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {screen === 'lesson' && currentLesson && selectedLanguage && (
        <>
          <button className="back-button" onClick={goToLessons}>
            ← Lecciones
          </button>
          <header className="lesson-header">
            <h2>{currentLesson.title}</h2>
            <p>
              {selectedLanguage.name} · {currentLesson.topic}
            </p>
          </header>

          <h3 className="section-title">Vocabulario</h3>
          <div className="vocab-list">
            {lessonWords.map((item) => (
              <article key={item.word} className="vocab-card">
                <p className="vocab-word">{item.word}</p>
                <p className="vocab-translation">{item.translation}</p>
                <p className="vocab-example">"{item.example}"</p>
              </article>
            ))}
          </div>

          {quizOptions && quizPrompt && (
            <section className="quiz-section">
              <h3>Practica</h3>
              <p className="quiz-prompt">{quizPrompt}</p>
              <div className="quiz-options">
                {quizOptions.map((option) => {
                  const isSelected = quizAnswer === option.id
                  const showResult = quizAnswer !== null
                  let className = 'quiz-option'
                  if (showResult && option.correct) className += ' correct'
                  if (showResult && isSelected && !option.correct) className += ' incorrect'

                  return (
                    <button
                      key={option.id}
                      className={className}
                      disabled={quizAnswer !== null}
                      onClick={() => handleQuizAnswer(option.id, option.correct)}
                    >
                      {option.text}
                    </button>
                  )
                })}
              </div>
              {quizAnswer && (
                <p
                  className={`quiz-feedback ${
                    quizOptions.find((o) => o.id === quizAnswer)?.correct
                      ? 'success'
                      : 'error'
                  }`}
                >
                  {quizOptions.find((o) => o.id === quizAnswer)?.correct
                    ? '¡Correcto! Sigue practicando.'
                    : 'Casi — revisa el vocabulario e inténtalo de nuevo.'}
                </p>
              )}
            </section>
          )}
        </>
      )}
    </div>
  )
}

export default App
