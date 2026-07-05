import { useEffect, useMemo, useState } from 'react'

import './App.css'

import Login from './components/Login'

import AdminDashboard from './components/AdminDashboard'

import { Flag } from './components/flags'

import LessonActivities from './components/activities/LessonActivities'

import StopGame from './components/activities/StopGame'

import AvatarStudio from './components/AvatarStudio'
import BodyAvatar from './components/BodyAvatar'
import { supabase } from './lib/supabase'
import { defaultAvatar, mergeAvatar } from './lib/avatar'
import { levelFromPoints, POINTS_PER_CORRECT } from './lib/gamification'
import { LANG_BCP47 } from './lib/speech'
import {

  defaultVocabulary,

  languages,

  languageLevels,

  lessons,

  TOTAL_VOCABULARY_WORDS,

  vocabulary,

} from './data/content'

import type { AvatarConfig, Gender, LanguageLevel, Role, StudentGrade, User, LessonActivityId } from './types'

import {
  countCompletedInLanguage,
  getActivitiesForLesson,
  getActivitiesForLevel,
  getCompletedActivities,
  isLessonCompleted,
  isLessonUnlocked,
  isLevelUnlocked,
  lessonActivityProgress,
  levelProgress,
  markActivityComplete,
} from './lib/lessonProgress'

import { COURSES, getCourse, isLevelAvailableForGrade } from './lib/courses'

import { getStudentCourse, setStudentCourse } from './lib/studentCourse'

import { enrichVocabularyExamples, getGrammarForLesson } from './lib/grammarContent'

import { buildWrittenQuiz } from './lib/lessonQuiz'

type Screen = 'home' | 'lessons' | 'lesson' | 'stop' | 'admin' | 'avatar'



function App() {

  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const [authLoading, setAuthLoading] = useState(true)

  const [screen, setScreen] = useState<Screen>('home')

  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(null)

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

  const [points, setPoints] = useState(0)

  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(defaultAvatar('female'))

  const [progressTick, setProgressTick] = useState(0)

  const [studentGrade, setStudentGrade] = useState<StudentGrade | null>(null)



  useEffect(() => {
    // Carga el perfil (nombre, rol, género, puntos y avatar) desde profiles.
    const loadProfile = async (userId: string, email: string) => {

      const { data } = await supabase

        .from('profiles')

        .select('id, name, email, role, gender, points, avatar_config')
        .eq('id', userId)

        .single()

      if (data) {
        const gender: Gender = data.gender === 'male' ? 'male' : 'female'
        setCurrentUser({ id: data.id, name: data.name, email: data.email, role: data.role, gender })
        setPoints(data.points ?? 0)
        setAvatarConfig(mergeAvatar(gender, data.avatar_config))
      } else {
        setCurrentUser({ id: userId, name: email, email, role: 'student' as Role, gender: 'female' })
        setPoints(0)
        setAvatarConfig(defaultAvatar('female'))
      }

      setStudentGrade(getStudentCourse(userId))

    }



    supabase.auth.getSession().then(({ data: { session } }) => {

      if (session?.user) {

        loadProfile(session.user.id, session.user.email ?? '')

      }

      setAuthLoading(false)

    })



    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {

      if (session?.user) {

        loadProfile(session.user.id, session.user.email ?? '')

      } else {

        setCurrentUser(null)

        setStudentGrade(null)

      }

    })



    return () => sub.subscription.unsubscribe()

  }, [])



  const selectedLanguage = languages.find((lang) => lang.id === selectedLanguageId)

  const languageLessons = selectedLanguageId ? lessons[selectedLanguageId] ?? [] : []

  const currentLesson = languageLessons.find((lesson) => lesson.id === selectedLessonId)



  const activeGrade: StudentGrade | null =

    currentUser?.role === 'staff' ? 11 : studentGrade



  const activeCourse = activeGrade ? getCourse(activeGrade) : null



  const lessonWords = useMemo(() => {

    if (!selectedLessonId || !activeGrade) return defaultVocabulary

    const base = vocabulary[selectedLessonId] ?? defaultVocabulary

    return enrichVocabularyExamples(base, selectedLanguageId ?? 'en', activeGrade)

  }, [selectedLessonId, selectedLanguageId, activeGrade])



  const grammarBlocks = useMemo(() => {

    if (!currentLesson || !activeGrade || !selectedLanguageId) return []

    return getGrammarForLesson(selectedLanguageId, currentLesson, activeGrade)

  }, [currentLesson, selectedLanguageId, activeGrade])



  const writtenQuiz = useMemo(() => {

    if (!currentLesson || !activeGrade || !selectedLanguageId) return []

    return buildWrittenQuiz(

      selectedLanguageId,

      currentLesson,

      vocabulary[currentLesson.id] ?? defaultVocabulary,

      grammarBlocks,

      activeGrade,

    )

  }, [currentLesson, selectedLanguageId, activeGrade, grammarBlocks])



  const totalLessonsAllLangs = Object.values(lessons).reduce((sum, list) => sum + list.length, 0)



  const orderedLessonIds =

    selectedLanguageId && languageLessons.length > 0

      ? [...languageLessons]

          .sort((a, b) => {

            const levelA = Number.parseInt(a.levelId.split('-lv')[1] ?? '0', 10)

            const levelB = Number.parseInt(b.levelId.split('-lv')[1] ?? '0', 10)

            if (levelA !== levelB) return levelA - levelB

            return a.order - b.order

          })

          .map((lesson) => lesson.id)

      : []



  const lessonsByLevel: Record<string, string[]> = {}

  languageLessons.forEach((lesson) => {

    if (!lessonsByLevel[lesson.levelId]) lessonsByLevel[lesson.levelId] = []

    lessonsByLevel[lesson.levelId].push(lesson.id)

  })

  Object.values(lessonsByLevel).forEach((ids) =>

    ids.sort((a, b) => {

      const orderA = languageLessons.find((l) => l.id === a)?.order ?? 0

      const orderB = languageLessons.find((l) => l.id === b)?.order ?? 0

      return orderA - orderB

    }),

  )



  const languageLevelList: LanguageLevel[] =

    selectedLanguageId && languageLevels[selectedLanguageId]

      ? [...languageLevels[selectedLanguageId]]

          .sort((a, b) => a.order - b.order)

          .filter((level) =>

            activeGrade ? isLevelAvailableForGrade(level.order, activeGrade) : true,

          )

      : []



  const completedInLanguage =

    currentUser && selectedLanguageId

      ? countCompletedInLanguage(currentUser.id, selectedLanguageId)

      : 0



  const visibleLessonCount = languageLevelList.reduce((sum, level) => {

    return sum + languageLessons.filter((l) => l.levelId === level.id).length

  }, 0)



  const selectCourse = (grade: StudentGrade) => {

    if (!currentUser) return

    setStudentCourse(currentUser.id, grade)

    setStudentGrade(grade)

  }



  const openLanguage = (languageId: string) => {

    if (currentUser?.role === 'student' && !studentGrade) return

    setSelectedLanguageId(languageId)

    setSelectedLessonId(null)

    setScreen('lessons')

  }



  const openLesson = (lessonId: string) => {

    setSelectedLessonId(lessonId)

    setScreen('lesson')

  }



  const goHome = () => {

    setScreen('home')

    setSelectedLanguageId(null)

    setSelectedLessonId(null)

  }



  const goToLessons = () => {

    setScreen('lessons')

    setSelectedLessonId(null)

  }



  const openStopGame = () => {

    setScreen('stop')

  }



  const handleLogout = async () => {

    await supabase.auth.signOut()

    setCurrentUser(null)

    goHome()

  }



  const persistProfile = async (fields: { points?: number; avatar_config?: AvatarConfig }) => {

    if (!currentUser) return

    await supabase.from('profiles').update(fields).eq('id', currentUser.id)

  }



  const handleQuizVerify = (passed: boolean, score: number, _total: number) => {

    if (!passed || !currentUser || !selectedLanguageId || !selectedLessonId) return

    if (isLessonCompleted(currentUser.id, selectedLanguageId, selectedLessonId)) return



    const newPoints = points + score * POINTS_PER_CORRECT

    setPoints(newPoints)

    void persistProfile({ points: newPoints })

  }



  const handleActivityComplete = (activity: LessonActivityId) => {

    if (!currentUser || !selectedLanguageId || !selectedLessonId) return

    const allDone = markActivityComplete(

      currentUser.id,

      selectedLanguageId,

      selectedLessonId,

      activity,

    )

    if (allDone) setProgressTick((n) => n + 1)

  }



  const lessonCompletedActivities =

    currentUser && selectedLanguageId && selectedLessonId

      ? getCompletedActivities(currentUser.id, selectedLanguageId, selectedLessonId)

      : []



  const handleAvatarChange = (config: AvatarConfig) => {

    setAvatarConfig(config)

    void persistProfile({ avatar_config: config })

  }



  if (authLoading) {

    return (

      <div className="login-screen">

        <p>Cargando…</p>

      </div>

    )

  }



  if (!currentUser) {

    return <Login />

  }



  return (

    <div className="app">

      <nav className="top-bar">

        <span className="top-bar-user">
          <span className="top-bar-avatar">
            <BodyAvatar config={avatarConfig} size={54} showBackground={false} />
          </span>
          <span className="top-bar-user-info">

            {currentUser.name}

            <span className="top-bar-meta">

              <span className="role-badge">

                {currentUser.role === 'staff' ? 'Docente / Administrativo' : 'Estudiante'}

              </span>

              {activeCourse && (

                <span className="course-badge">Curso {activeCourse.shortLabel}</span>

              )}

              <span className="level-badge small">Nivel {levelFromPoints(points)}</span>

            </span>

          </span>

        </span>

        <div className="top-bar-actions">

          <button className="nav-link" onClick={goHome}>

            Inicio

          </button>

          <button className="nav-link" onClick={() => setScreen('avatar')}>

            Mi avatar

          </button>

          {currentUser.role === 'staff' && (

            <button className="nav-link" onClick={() => setScreen('admin')}>

              Panel administrativo

            </button>

          )}

          <button className="nav-link logout" onClick={handleLogout}>

            Cerrar sesión

          </button>

        </div>

      </nav>



      {screen === 'admin' && currentUser.role === 'staff' && <AdminDashboard />}



      {screen === 'avatar' && (
        <AvatarStudio
          config={avatarConfig}
          points={points}
          gender={currentUser.gender}
          onChange={handleAvatarChange}
        />
      )}



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

            <p>Elige tu curso, practica gramática y verifica tus respuestas por escrito.</p>

          </header>



          <div className="stats-bar">

            <div className="stat-card">

              <span className="stat-value">4</span>

              <span className="stat-label">Cursos</span>

            </div>

            <div className="stat-card">

              <span className="stat-value">{languages.length}</span>

              <span className="stat-label">Idiomas</span>

            </div>

            <div className="stat-card">

              <span className="stat-value">{TOTAL_VOCABULARY_WORDS}+</span>

              <span className="stat-label">Palabras</span>

            </div>

            <div className="stat-card">

              <span className="stat-value">{totalLessonsAllLangs}</span>

              <span className="stat-label">Lecciones</span>

            </div>

          </div>



          <h2 className="section-title">Elige tu curso</h2>

          <p className="course-section-intro">

            La dificultad del idioma depende de tu grado escolar. Cada curso desbloquea más niveles

            y preguntas más exigentes en el quiz escrito.

          </p>

          <div className="course-grid">

            {COURSES.map((course) => {

              const selected = studentGrade === course.grade

              return (

                <button

                  key={course.grade}

                  type="button"

                  className={`course-card ${selected ? 'course-card--selected' : ''}`}

                  onClick={() => selectCourse(course.grade)}

                >

                  <span className="course-grade">{course.shortLabel}</span>

                  <h3>{course.label}</h3>

                  <p>{course.description}</p>

                  <div className="course-meta">

                    <span className="course-chip">{course.difficultyLabel}</span>

                    <span className="course-chip">{course.cefrRange}</span>

                    <span className="course-chip">{course.maxLevel} niveles</span>

                  </div>

                  {selected && <span className="course-selected-tag">Tu curso actual</span>}

                </button>

              )

            })}

          </div>



          {currentUser.role === 'student' && !studentGrade && (

            <p className="course-pick-hint">Selecciona tu curso (8°, 9°, 10° u 11°) para acceder a los idiomas.</p>

          )}



          <h2 className="section-title">Idiomas disponibles</h2>

          {activeCourse && (

            <p className="course-active-banner">

              Curso {activeCourse.label}: dificultad {activeCourse.difficultyLabel} ({activeCourse.cefrRange})

            </p>

          )}

          <div className="language-grid">

            {languages.map((language) => {

              const disabled = currentUser.role === 'student' && !studentGrade

              return (

                <button

                  key={language.id}

                  className={`language-card ${disabled ? 'language-card--disabled' : ''}`}

                  disabled={disabled}

                  onClick={() => openLanguage(language.id)}

                >

                  <span className="language-flag">

                    <Flag code={language.code} className="flag-svg" />

                  </span>

                  <h3>{language.name}</h3>

                  <p>{language.description}</p>

                  <span className="badge">

                    {activeCourse ? activeCourse.difficultyLabel : 'Elige curso'}

                  </span>

                </button>

              )

            })}

          </div>

        </>

      )}



      {screen === 'lessons' && selectedLanguage && activeGrade && (

        <>

          <button className="back-button" onClick={goHome}>

            ← Volver

          </button>

          <header className="lesson-header">

            <span className="lesson-header-flag">

              <Flag code={selectedLanguage.code} className="flag-svg" />

            </span>

            <div className="lesson-header-text">

              <h2>{selectedLanguage.name}</h2>

              <p>

                Curso {activeGrade}° · {activeCourse?.difficultyLabel} · {completedInLanguage}/

                {visibleLessonCount} lecciones completadas

              </p>

            </div>

          </header>



          <div className="language-progress-bar" aria-hidden="true">

            <div

              className="language-progress-fill"

              style={{

                width: `${visibleLessonCount ? (completedInLanguage / visibleLessonCount) * 100 : 0}%`,

              }}

            />

          </div>



          <button type="button" className="stop-competitive-card" onClick={openStopGame}>

            <span className="stop-competitive-icon" aria-hidden="true">

              ⚡

            </span>

            <div className="stop-competitive-body">

              <h3>Stop competitivo</h3>

              <p>

                1 minuto · letra, país, color, animal, alimento y objeto. Compite con otros estudiantes de {selectedLanguage.name}.

              </p>

              <span className="stop-competitive-tag">Actividad extra</span>

            </div>

            <span className="lesson-arrow" aria-hidden="true">

              →

            </span>

          </button>



          <h3 className="section-title">Ruta de aprendizaje</h3>

          {languageLevelList.map((level) => {

            const levelLessons = languageLessons

              .filter((lesson) => lesson.levelId === level.id)

              .sort((a, b) => a.order - b.order)

            const levelUnlocked =

              currentUser &&

              isLevelUnlocked(currentUser.id, selectedLanguage.id, level.order, lessonsByLevel)

            const progress = currentUser

              ? levelProgress(

                  currentUser.id,

                  selectedLanguage.id,

                  level.id,

                  levelLessons.map((l) => l.id),

                )

              : { completed: 0, total: levelLessons.length }



            return (

              <section

                key={`${level.id}-${progressTick}`}

                className={`level-section ${levelUnlocked ? '' : 'level-section--locked'}`}

              >

                <header className="level-section-header">

                  <div>

                    <h4 className="level-section-title">

                      {levelUnlocked ? '' : '🔒 '}

                      Nivel {level.order}: {level.name}

                    </h4>

                    <p className="level-section-desc">

                      {level.difficulty} · {level.description}

                      <span className="level-activities-hint">

                        {' '}· {getActivitiesForLevel(level.id).length} actividades por lección (gramática, quiz y stop incluidos)

                      </span>

                    </p>

                  </div>

                  <span className="level-section-progress">

                    {progress.completed}/{progress.total}

                  </span>

                </header>



                {!levelUnlocked && (

                  <p className="level-lock-hint">

                    Completa las actividades de cada lección del nivel anterior para desbloquear

                    este nivel.

                  </p>

                )}



                <div className="lesson-list">

                  {levelLessons.map((lesson) => {

                    const unlocked =

                      levelUnlocked &&

                      currentUser &&

                      isLessonUnlocked(

                        currentUser.id,

                        selectedLanguage.id,

                        lesson.id,

                        orderedLessonIds,

                      )

                    const done =

                      currentUser &&

                      isLessonCompleted(currentUser.id, selectedLanguage.id, lesson.id)

                    const actProgress =

                      currentUser &&

                      lessonActivityProgress(currentUser.id, selectedLanguage.id, lesson.id)



                    return (

                      <button

                        key={lesson.id}

                        type="button"

                        className={`lesson-card ${!unlocked ? 'lesson-card--locked' : ''} ${done ? 'lesson-card--done' : ''}`}

                        disabled={!unlocked}

                        onClick={() => unlocked && openLesson(lesson.id)}

                      >

                        <span className="lesson-number" aria-hidden="true">

                          {done ? '✓' : lesson.order}

                        </span>

                        <div className="lesson-card-body">

                          <h3>{lesson.title}</h3>

                          <p className="lesson-meta">

                            <span className="lesson-chip">{lesson.topic}</span>

                            <span className="lesson-chip">{lesson.duration}</span>

                            <span className="lesson-chip">

                              {actProgress

                                ? `${actProgress.completed}/${actProgress.total} actividades`

                                : `${getActivitiesForLesson(lesson.id, lesson.levelId).length} actividades`}

                            </span>

                            {done && <span className="lesson-chip lesson-chip--done">Completada</span>}

                            {!done && actProgress && actProgress.completed > 0 && (

                              <span className="lesson-chip lesson-chip--progress">En progreso</span>

                            )}

                            {!unlocked && (

                              <span className="lesson-chip lesson-chip--locked">Bloqueada</span>

                            )}

                          </p>

                        </div>

                        <span className="lesson-arrow" aria-hidden="true">

                          {unlocked ? '→' : '🔒'}

                        </span>

                      </button>

                    )

                  })}

                </div>

              </section>

            )

          })}



          {studentGrade && studentGrade < 11 && (

            <p className="course-upgrade-hint">

              En {studentGrade + 1}° grado se desbloquearán más niveles y condicionales avanzados.

            </p>

          )}

        </>

      )}



      {screen === 'stop' && selectedLanguage && currentUser && (

        <>

          <button className="back-button" onClick={goToLessons}>

            ← Lecciones

          </button>

          <StopGame

            languageId={selectedLanguage.id}

            languageName={selectedLanguage.name}

            currentUser={currentUser}

          />

        </>

      )}



      {screen === 'lesson' && currentLesson && selectedLanguage && activeGrade && (

        <>

          <button className="back-button" onClick={goToLessons}>

            ← Lecciones

          </button>

          <header className="lesson-header">

            <span className="lesson-header-flag">

              <Flag code={selectedLanguage.code} className="flag-svg" />

            </span>

            <div className="lesson-header-text">

              <h2>{currentLesson.title}</h2>

              <p>

                {selectedLanguage.name} · Curso {activeGrade}° · {currentLesson.topic}

              </p>

            </div>

          </header>



          <LessonActivities

            key={`${selectedLessonId}-${activeGrade}-${progressTick}`}

            lessonId={selectedLessonId ?? currentLesson.id}
            levelId={currentLesson.levelId}
            lessonWords={lessonWords}
            grammarBlocks={grammarBlocks}
            quizQuestions={writtenQuiz}
            studentGrade={activeGrade}
            speechLang={LANG_BCP47[selectedLanguage.id] ?? 'en-US'}
            lessonTopic={currentLesson.topic}
            lessonTitle={currentLesson.title}
            languageId={selectedLanguage.id}
            languageName={selectedLanguage.name}
            currentUser={currentUser}
            completedActivities={lessonCompletedActivities}
            lessonCompleted={
              !!(
                selectedLanguageId &&
                selectedLessonId &&
                currentUser &&
                isLessonCompleted(currentUser.id, selectedLanguageId, selectedLessonId)
              )
            }
            onActivityComplete={handleActivityComplete}
            onQuizVerify={handleQuizVerify}
          />

        </>

      )}

    </div>

  )

}



export default App


