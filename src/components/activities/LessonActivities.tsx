import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { GrammarBlock, LessonActivityId, StudentGrade, User, VocabularyItem, WrittenQuizQuestion } from '../../types'
import { getActivityDifficulty } from '../../lib/activityDifficulty'
import { ACTIVITY_LABELS, getActivitiesForLevel } from '../../lib/lessonProgress'
import { shuffle } from '../../utils/activityHelpers'
import ActivityThemeBanner from './ActivityThemeBanner'
import GrammarSection from './GrammarSection'
import WrittenQuiz from './WrittenQuiz'
import Crossword from './Crossword'
import MatchingGame from './MatchingGame'
import WordScramble from './WordScramble'
import WordSearch from './WordSearch'
import StopGame from './StopGame'
import Pronunciation from '../Pronunciation'

type ActivityTab = LessonActivityId

type Props = {
  lessonId: string
  levelId: string
  lessonWords: VocabularyItem[]
  grammarBlocks: GrammarBlock[]
  quizQuestions: WrittenQuizQuestion[]
  studentGrade: StudentGrade
  speechLang: string
  lessonTopic: string
  lessonTitle: string
  languageId: string
  languageName: string
  currentUser: User
  completedActivities: LessonActivityId[]
  lessonCompleted?: boolean
  onActivityComplete: (activity: LessonActivityId) => void
  onQuizVerify: (passed: boolean, score: number, total: number) => void
}

const TAB_META: { id: ActivityTab; label: string; icon: string }[] = [
  { id: 'grammar', label: 'Gramática', icon: '📝' },
  { id: 'vocab', label: 'Vocabulario', icon: '📖' },
  { id: 'quiz', label: 'Quiz escrito', icon: '✍️' },
  { id: 'wordsearch', label: 'Sopa de letras', icon: '🔍' },
  { id: 'crossword', label: 'Crucigrama', icon: '🧩' },
  { id: 'matching', label: 'Emparejar', icon: '🔗' },
  { id: 'scramble', label: 'Ordenar letras', icon: '🔤' },
  { id: 'stop', label: 'Stop', icon: '⚡' },
]

function ThemeWrap({
  activityId,
  topic,
  lessonTitle,
  children,
}: {
  activityId: LessonActivityId
  topic: string
  lessonTitle: string
  children: ReactNode
}) {
  return (
    <>
      <ActivityThemeBanner activityId={activityId} topic={topic} lessonTitle={lessonTitle} />
      {children}
    </>
  )
}

function normalizeAnswer(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?;:'"]/g, '')
}

export default function LessonActivities({
  lessonId,
  levelId,
  lessonWords,
  grammarBlocks,
  quizQuestions,
  studentGrade,
  speechLang,
  lessonTopic,
  lessonTitle,
  languageId,
  languageName,
  currentUser,
  completedActivities,
  lessonCompleted = false,
  onActivityComplete,
  onQuizVerify,
}: Props) {
  const difficulty = useMemo(() => getActivityDifficulty(levelId), [levelId])
  const lessonActivities = useMemo(() => getActivitiesForLevel(levelId), [levelId])
  const visibleTabs = TAB_META.filter((item) => lessonActivities.includes(item.id))
  const [tab, setTab] = useState<ActivityTab>(() => lessonActivities[0] ?? 'quiz')

  const recallWords = useMemo(
    () => shuffle(lessonWords).slice(0, difficulty.vocabRecallCount),
    [lessonWords, difficulty.vocabRecallCount, lessonId],
  )
  const [recallAnswers, setRecallAnswers] = useState<Record<string, string>>({})
  const [recallChecked, setRecallChecked] = useState(false)

  useEffect(() => {
    setTab(lessonActivities[0] ?? 'quiz')
    setRecallAnswers({})
    setRecallChecked(false)
  }, [lessonId, levelId, lessonActivities])

  const quizKey = useMemo(
    () => `${studentGrade}-${quizQuestions.map((q) => q.id).join('-')}`,
    [studentGrade, quizQuestions],
  )

  const doneSet = new Set(completedActivities)
  const progressCount = lessonActivities.filter((a) => doneSet.has(a)).length
  const allDone = lessonActivities.every((a) => doneSet.has(a))

  const recallCorrect = recallWords.filter((item) => {
    const user = normalizeAnswer(recallAnswers[item.word] ?? '')
    const acceptable = [
      normalizeAnswer(item.translation),
      normalizeAnswer(item.translation.split('/')[0] ?? item.translation),
    ]
    return acceptable.some((a) => user === a || user.includes(a) || a.includes(user))
  }).length
  const recallPassRatio = difficulty.levelOrder >= 4 ? 0.85 : 0.7
  const recallPassed = recallCorrect >= Math.ceil(recallWords.length * recallPassRatio)

  const handleQuizVerify = (passed: boolean, score: number, total: number) => {
    if (passed) onActivityComplete('quiz')
    onQuizVerify(passed, score, total)
  }

  return (
    <div className="lesson-activities">
      <div className="activity-progress-panel">
        <div className="activity-progress-header">
          <span>
            Actividades: <strong>{progressCount}</strong> / {lessonActivities.length}
          </span>
          {allDone ? (
            <span className="activity-progress-done">¡Lección lista para avanzar!</span>
          ) : (
            <span className="activity-progress-hint">
              Nivel {difficulty.levelOrder}: actividades variadas · Quiz y Stop siempre incluidos
            </span>
          )}
        </div>
        <div className="activity-progress-bar" aria-hidden="true">
          <div
            className="activity-progress-fill"
            style={{ width: `${(progressCount / lessonActivities.length) * 100}%` }}
          />
        </div>
        <ul className="activity-checklist">
          {lessonActivities.map((id) => (
            <li key={id} className={doneSet.has(id) ? 'done' : ''}>
              {doneSet.has(id) ? '✓' : '○'} {ACTIVITY_LABELS[id]}
              {(id === 'quiz' || id === 'stop') && <span className="activity-fixed-tag"> fijo</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="activity-tabs" role="tablist">
        {visibleTabs.map((item) => (
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
        {tab === 'grammar' && lessonActivities.includes('grammar') && (
          <ThemeWrap activityId="grammar" topic={lessonTopic} lessonTitle={lessonTitle}>
            <GrammarSection
              blocks={grammarBlocks}
              completed={doneSet.has('grammar')}
              requireCheck={difficulty.grammarCheckRequired}
              onConfirmRead={() => onActivityComplete('grammar')}
            />
          </ThemeWrap>
        )}

        {tab === 'vocab' && lessonActivities.includes('vocab') && (
          <ThemeWrap activityId="vocab" topic={lessonTopic} lessonTitle={lessonTitle}>
            <h3 className="section-title">Vocabulario en contexto</h3>
            <p className="grammar-intro">
              Curso {studentGrade}° · Nivel {difficulty.levelOrder} · 🔊 Escucha y 🎤 repite cada
              palabra. Luego demuestra que recuerdas el significado.
            </p>
            <div className="vocab-list">
              {lessonWords.map((item) => (
                <article key={item.word} className="vocab-card vocab-card--themed">
                  <p className="vocab-word">{item.word}</p>
                  <p className="vocab-translation">{item.translation}</p>
                  <p className="vocab-example">&quot;{item.example}&quot;</p>
                  <Pronunciation text={item.word} lang={speechLang} />
                </article>
              ))}
            </div>

            {!doneSet.has('vocab') && recallWords.length > 0 && (
              <div className="vocab-recall-box">
                <h4>Prueba de recuerdo</h4>
                <p className="activity-hint">
                  Escribe en español el significado. Necesitas{' '}
                  {Math.ceil(recallWords.length * recallPassRatio)} de {recallWords.length} correctas.
                </p>
                {recallWords.map((item) => (
                  <label key={item.word} className="vocab-recall-row">
                    <span className="vocab-recall-word">{item.word}</span>
                    <input
                      className="vocab-recall-input"
                      value={recallAnswers[item.word] ?? ''}
                      onChange={(e) => {
                        setRecallAnswers((prev) => ({ ...prev, [item.word]: e.target.value }))
                        setRecallChecked(false)
                      }}
                      placeholder="Significado en español…"
                    />
                  </label>
                ))}
                <button
                  type="button"
                  className="activity-button secondary"
                  onClick={() => setRecallChecked(true)}
                >
                  Verificar recuerdo
                </button>
                {recallChecked && (
                  <p className={`activity-feedback ${recallPassed ? 'success' : 'error'}`}>
                    {recallPassed
                      ? `✓ ${recallCorrect}/${recallWords.length} correctas — puedes confirmar.`
                      : `${recallCorrect}/${recallWords.length} correctas. Repasa las tarjetas e intenta de nuevo.`}
                  </p>
                )}
              </div>
            )}

            {doneSet.has('vocab') ? (
              <p className="activity-feedback success">✓ Vocabulario confirmado</p>
            ) : (
              <button
                type="button"
                className="activity-button activity-confirm-btn"
                onClick={() => onActivityComplete('vocab')}
                disabled={!recallPassed}
              >
                Confirmar vocabulario revisado
              </button>
            )}
          </ThemeWrap>
        )}

        {tab === 'quiz' && lessonActivities.includes('quiz') && (
          <ThemeWrap activityId="quiz" topic={lessonTopic} lessonTitle={lessonTitle}>
            <WrittenQuiz
              key={quizKey}
              questions={quizQuestions}
              grade={studentGrade}
              lessonCompleted={lessonCompleted}
              onVerify={handleQuizVerify}
            />
          </ThemeWrap>
        )}

        {tab === 'wordsearch' && lessonActivities.includes('wordsearch') && (
          <ThemeWrap activityId="wordsearch" topic={lessonTopic} lessonTitle={lessonTitle}>
            <WordSearch
              items={lessonWords}
              wordCount={difficulty.wordSearchCount}
              onComplete={() => onActivityComplete('wordsearch')}
            />
          </ThemeWrap>
        )}

        {tab === 'crossword' && lessonActivities.includes('crossword') && (
          <ThemeWrap activityId="crossword" topic={lessonTopic} lessonTitle={lessonTitle}>
            <Crossword
              items={lessonWords}
              clueCount={difficulty.crosswordClues}
              onComplete={() => onActivityComplete('crossword')}
            />
          </ThemeWrap>
        )}

        {tab === 'matching' && lessonActivities.includes('matching') && (
          <ThemeWrap activityId="matching" topic={lessonTopic} lessonTitle={lessonTitle}>
            <MatchingGame
              items={lessonWords}
              speechLang={speechLang}
              pairCount={difficulty.matchingPairs}
              onComplete={() => onActivityComplete('matching')}
            />
          </ThemeWrap>
        )}

        {tab === 'scramble' && lessonActivities.includes('scramble') && (
          <ThemeWrap activityId="scramble" topic={lessonTopic} lessonTitle={lessonTitle}>
            <WordScramble
              items={lessonWords}
              speechLang={speechLang}
              wordCount={difficulty.scrambleWords}
              passRatio={difficulty.scramblePassRatio}
              onComplete={() => onActivityComplete('scramble')}
            />
          </ThemeWrap>
        )}

        {tab === 'stop' && lessonActivities.includes('stop') && (
          <ThemeWrap activityId="stop" topic={lessonTopic} lessonTitle={lessonTitle}>
            {doneSet.has('stop') && (
              <p className="activity-feedback success">
                ✓ Stop completado — puedes jugar de nuevo para mejorar tu puntaje.
              </p>
            )}
            <StopGame
              languageId={languageId}
              languageName={languageName}
              currentUser={currentUser}
              embedded
              onComplete={() => onActivityComplete('stop')}
            />
          </ThemeWrap>
        )}
      </div>
    </div>
  )
}
