import { useMemo, useState } from 'react'
import type { GrammarBlock, LessonActivityId, StudentGrade, VocabularyItem, WrittenQuizQuestion } from '../../types'
import { ACTIVITY_LABELS, ALL_LESSON_ACTIVITIES } from '../../lib/lessonProgress'
import GrammarSection from './GrammarSection'
import WrittenQuiz from './WrittenQuiz'
import Crossword from './Crossword'
import MatchingGame from './MatchingGame'
import WordScramble from './WordScramble'
import WordSearch from './WordSearch'
import Pronunciation from '../Pronunciation'

type ActivityTab = LessonActivityId

type Props = {
  lessonWords: VocabularyItem[]
  grammarBlocks: GrammarBlock[]
  quizQuestions: WrittenQuizQuestion[]
  studentGrade: StudentGrade
  speechLang: string
  completedActivities: LessonActivityId[]
  lessonCompleted?: boolean
  onActivityComplete: (activity: LessonActivityId) => void
  onQuizVerify: (passed: boolean, score: number, total: number) => void
}

const TABS: { id: ActivityTab; label: string; icon: string }[] = [
  { id: 'grammar', label: 'Gramática', icon: '📝' },
  { id: 'vocab', label: 'Vocabulario', icon: '📖' },
  { id: 'quiz', label: 'Quiz escrito', icon: '✍️' },
  { id: 'wordsearch', label: 'Sopa de letras', icon: '🔍' },
  { id: 'crossword', label: 'Crucigrama', icon: '🧩' },
  { id: 'matching', label: 'Emparejar', icon: '🔗' },
  { id: 'scramble', label: 'Ordenar letras', icon: '🔤' },
]

export default function LessonActivities({
  lessonWords,
  grammarBlocks,
  quizQuestions,
  studentGrade,
  speechLang,
  completedActivities,
  lessonCompleted = false,
  onActivityComplete,
  onQuizVerify,
}: Props) {
  const [tab, setTab] = useState<ActivityTab>('grammar')
  const quizKey = useMemo(
    () => `${studentGrade}-${quizQuestions.map((q) => q.id).join('-')}`,
    [studentGrade, quizQuestions],
  )

  const doneSet = new Set(completedActivities)
  const progressCount = completedActivities.length
  const allDone = ALL_LESSON_ACTIVITIES.every((a) => doneSet.has(a))

  const handleQuizVerify = (passed: boolean, score: number, total: number) => {
    if (passed) onActivityComplete('quiz')
    onQuizVerify(passed, score, total)
  }

  return (
    <div className="lesson-activities">
      <div className="activity-progress-panel">
        <div className="activity-progress-header">
          <span>
            Actividades: <strong>{progressCount}</strong> / {ALL_LESSON_ACTIVITIES.length}
          </span>
          {allDone ? (
            <span className="activity-progress-done">¡Lección lista para avanzar!</span>
          ) : (
            <span className="activity-progress-hint">Completa todas para desbloquear la siguiente</span>
          )}
        </div>
        <div className="activity-progress-bar" aria-hidden="true">
          <div
            className="activity-progress-fill"
            style={{ width: `${(progressCount / ALL_LESSON_ACTIVITIES.length) * 100}%` }}
          />
        </div>
        <ul className="activity-checklist">
          {ALL_LESSON_ACTIVITIES.map((id) => (
            <li key={id} className={doneSet.has(id) ? 'done' : ''}>
              {doneSet.has(id) ? '✓' : '○'} {ACTIVITY_LABELS[id]}
            </li>
          ))}
        </ul>
      </div>

      <div className="activity-tabs" role="tablist">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`activity-tab ${tab === item.id ? 'active' : ''} ${doneSet.has(item.id) ? 'tab-done' : ''}`}
            onClick={() => setTab(item.id)}
          >
            <span aria-hidden="true">{item.icon}</span> {item.label}
            {doneSet.has(item.id) && <span className="tab-check"> ✓</span>}
          </button>
        ))}
      </div>

      <div className="activity-panel" role="tabpanel">
        {tab === 'grammar' && (
          <GrammarSection
            blocks={grammarBlocks}
            completed={doneSet.has('grammar')}
            onConfirmRead={() => onActivityComplete('grammar')}
          />
        )}

        {tab === 'vocab' && (
          <>
            <h3 className="section-title">Vocabulario en contexto</h3>
            <p className="grammar-intro">
              Curso {studentGrade}° · 🔊 Escucha la pronunciación · 🎤 repite y practica (Chrome o
              Edge). Revisa todas las palabras antes de confirmar.
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
            {doneSet.has('vocab') ? (
              <p className="activity-feedback success">✓ Vocabulario confirmado</p>
            ) : (
              <button
                type="button"
                className="activity-button activity-confirm-btn"
                onClick={() => onActivityComplete('vocab')}
              >
                Confirmar vocabulario revisado
              </button>
            )}
          </>
        )}

        {tab === 'quiz' && (
          <WrittenQuiz
            key={quizKey}
            questions={quizQuestions}
            grade={studentGrade}
            lessonCompleted={lessonCompleted}
            onVerify={handleQuizVerify}
          />
        )}

        {tab === 'wordsearch' && (
          <WordSearch items={lessonWords} onComplete={() => onActivityComplete('wordsearch')} />
        )}
        {tab === 'crossword' && (
          <Crossword items={lessonWords} onComplete={() => onActivityComplete('crossword')} />
        )}
        {tab === 'matching' && (
          <MatchingGame
            items={lessonWords}
            speechLang={speechLang}
            onComplete={() => onActivityComplete('matching')}
          />
        )}
        {tab === 'scramble' && (
          <WordScramble
            items={lessonWords}
            speechLang={speechLang}
            onComplete={() => onActivityComplete('scramble')}
          />
        )}
      </div>
    </div>
  )
}
