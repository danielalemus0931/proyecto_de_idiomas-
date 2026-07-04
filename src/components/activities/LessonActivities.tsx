import { useState } from 'react'
import type { VocabularyItem } from '../../types'
import type { QuizOption } from '../../types'
import Crossword from './Crossword'
import MatchingGame from './MatchingGame'
import WordScramble from './WordScramble'
import WordSearch from './WordSearch'
import Pronunciation from '../Pronunciation'

type ActivityTab = 'vocab' | 'quiz' | 'wordsearch' | 'crossword' | 'matching' | 'scramble'

type Props = {
  lessonWords: VocabularyItem[]
  quizOptions?: QuizOption[]
  quizPrompt?: string
  quizAnswer: string | null
  speechLang: string
  onQuizAnswer: (optionId: string, correct: boolean) => void
}

const TABS: { id: ActivityTab; label: string; icon: string }[] = [
  { id: 'vocab', label: 'Vocabulario', icon: '📖' },
  { id: 'quiz', label: 'Quiz', icon: '❓' },
  { id: 'wordsearch', label: 'Sopa de letras', icon: '🔍' },
  { id: 'crossword', label: 'Crucigrama', icon: '🧩' },
  { id: 'matching', label: 'Emparejar', icon: '🔗' },
  { id: 'scramble', label: 'Ordenar letras', icon: '🔤' },
]

export default function LessonActivities({
  lessonWords,
  quizOptions,
  quizPrompt,
  quizAnswer,
  speechLang,
  onQuizAnswer,
}: Props) {
  const [tab, setTab] = useState<ActivityTab>('vocab')

  return (
    <div className="lesson-activities">
      <div className="activity-tabs" role="tablist">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`activity-tab ${tab === item.id ? 'active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            <span aria-hidden="true">{item.icon}</span> {item.label}
          </button>
        ))}
      </div>

      <div className="activity-panel" role="tabpanel">
        {tab === 'vocab' && (
          <>
            <h3 className="section-title">Vocabulario</h3>
            <p className="activity-hint">
              🔊 Escucha la pronunciación · 🎤 repite y practica (Chrome o Edge).
            </p>
            <div className="vocab-list">
              {lessonWords.map((item) => (
                <article key={item.word} className="vocab-card">
                  <p className="vocab-word">{item.word}</p>
                  <p className="vocab-translation">{item.translation}</p>
                  <p className="vocab-example">&quot;{item.example}&quot;</p>
                  <Pronunciation text={item.word} lang={speechLang} />
                </article>
              ))}
            </div>
          </>
        )}

        {tab === 'quiz' && quizOptions && quizPrompt && (
          <section className="quiz-section">
            <h3>Quiz rápido</h3>
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
                    onClick={() => onQuizAnswer(option.id, option.correct)}
                  >
                    {option.text}
                  </button>
                )
              })}
            </div>
            {quizAnswer && (
              <p
                className={`quiz-feedback ${
                  quizOptions.find((o) => o.id === quizAnswer)?.correct ? 'success' : 'error'
                }`}
              >
                {quizOptions.find((o) => o.id === quizAnswer)?.correct
                  ? '¡Correcto! Sigue practicando.'
                  : 'Casi — revisa el vocabulario e inténtalo de nuevo.'}
              </p>
            )}
          </section>
        )}

        {tab === 'quiz' && (!quizOptions || !quizPrompt) && (
          <p className="activity-hint">Esta lección aún no tiene quiz. Prueba otra actividad.</p>
        )}

        {tab === 'wordsearch' && <WordSearch items={lessonWords} />}
        {tab === 'crossword' && <Crossword items={lessonWords} />}
        {tab === 'matching' && <MatchingGame items={lessonWords} speechLang={speechLang} />}
        {tab === 'scramble' && <WordScramble items={lessonWords} speechLang={speechLang} />}
      </div>
    </div>
  )
}
