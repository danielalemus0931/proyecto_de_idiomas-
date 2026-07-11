import { useEffect, useMemo, useState } from 'react'

import './App.css'

import Login from './components/Login'

import AdminDashboard from './components/AdminDashboard'

import { Flag } from './components/flags'

import LessonActivities from './components/activities/LessonActivities'

import StopGame from './components/activities/StopGame'

import GradeSidebar from './components/GradeSidebar'

import SubjectView from './components/SubjectView'

import GradeSyllabusView from './components/GradeSyllabusView'

import AvatarStudio from './components/AvatarStudio'
import BrandLogo from './components/BrandLogo'
import KawaiiAvatar from './components/KawaiiAvatar'
import ConfettiBurst from './components/ConfettiBurst'
import { supabase } from './lib/supabase'
import { defaultKawaiiAvatar, fromAvatarConfig, mergeKawaiiAvatar } from './lib/kawaiiAvatar'
import { earnedBadges, levelFromPoints, POINTS_PER_CORRECT } from './lib/gamification'
import { LANG_BCP47 } from './lib/speech'
import { syncStudentProgress } from './lib/progressSync'
import {

  defaultVocabulary,

  languages,

  languageLevels,

  lessons,

  vocabulary,

} from './data/content'

import { SCHOOL_SUBJECTS, countGradeTopics, type SchoolSubjectId } from './data/subjects'

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

import { getCourse, isLevelAvailableForGrade } from './lib/courses'

import { getStudentCourse, setStudentCourse } from './lib/studentCourse'

import { clearDemoSession, getDemoUser } from './lib/demoAuth'

import { enrichVocabularyExamples, getGrammarForLesson } from './lib/grammarContent'

import { buildWrittenQuiz } from './lib/lessonQuiz'

type Screen = 'home' | 'lessons' | 'lesson' | 'subject' | 'syllabus' | 'stop' | 'admin' | 'avatar'



function App() {

  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const [authLoading, setAuthLoading] = useState(true)

  const [screen, setScreen] = useState<Screen>('home')
  const [gradesMenuOpen, setGradesMenuOpen] = useState(false)

  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(null)

  const [selectedSubjectId, setSelectedSubjectId] = useState<SchoolSubjectId | null>(null)

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

  const [points, setPoints] = useState(0)

  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(defaultKawaiiAvatar())

  const [progressTick, setProgressTick] = useState(0)

  const [studentGrade, setStudentGrade] = useState<StudentGrade | null>(null)

  const [showConfetti, setShowConfetti] = useState(false)



  useEffect(() => {
    // Carga el perfil (nombre, rol, género, puntos y avatar) desde profiles.
    const loadProfile = async (userId: string, email: string) => {

      const { data } = await supabase

        .from('profiles')

        .select('id, name, email, role, gender, points, avatar_config, assigned_language')
        .eq('id', userId)

        .single()

      if (data) {
        const gender: Gender = data.gender === 'male' ? 'male' : 'female'
        setCurrentUser({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          gender,
          assignedLanguage: data.assigned_language ?? null,
        })
        setPoints(data.points ?? 0)
        setAvatarConfig(mergeKawaiiAvatar(data.avatar_config))
      } else {
        setCurrentUser({
          id: userId,
          name: email,
          email,
          role: 'student' as Role,
          gender: 'female',
          assignedLanguage: null,
        })
        setPoints(0)
        setAvatarConfig(defaultKawaiiAvatar())
      }

      setStudentGrade(getStudentCourse(userId))

    }

    const demoUser = getDemoUser()
    if (demoUser) {
      setCurrentUser(demoUser)
      setPoints(0)
      setAvatarConfig(mergeKawaiiAvatar(null))
      setStudentGrade(getStudentCourse(demoUser.id))
      setAuthLoading(false)
      return
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

      } else if (!getDemoUser()) {

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
    studentGrade ?? (currentUser?.role === 'staff' ? 11 : null)



  const activeCourse = activeGrade !== null ? getCourse(activeGrade) : null



  const lessonWords = useMemo(() => {

    if (!selectedLessonId || activeGrade === null) return defaultVocabulary

    const base = vocabulary[selectedLessonId] ?? defaultVocabulary

    return enrichVocabularyExamples(base, selectedLanguageId ?? 'en', activeGrade)

  }, [selectedLessonId, selectedLanguageId, activeGrade])



  const grammarBlocks = useMemo(() => {

    if (!currentLesson || activeGrade === null || !selectedLanguageId) return []

    return getGrammarForLesson(selectedLanguageId, currentLesson, activeGrade)

  }, [currentLesson, selectedLanguageId, activeGrade])



  const writtenQuiz = useMemo(() => {

    if (!currentLesson || activeGrade === null || !selectedLanguageId) return []

    return buildWrittenQuiz(

      selectedLanguageId,

      currentLesson,

      vocabulary[currentLesson.id] ?? defaultVocabulary,

      grammarBlocks,

      activeGrade,

    )

  }, [currentLesson, selectedLanguageId, activeGrade, grammarBlocks])



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

            activeGrade !== null ? isLevelAvailableForGrade(level.order, activeGrade) : true,

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
    setGradesMenuOpen(false)
  }



  const openLanguage = (languageId: string) => {

    if (currentUser?.role === 'student' && studentGrade === null) return

    // El docente asigna el idioma: el estudiante solo entra al asignado.
    if (
      currentUser?.role === 'student' &&
      currentUser.assignedLanguage &&
      currentUser.assignedLanguage !== languageId
    )
      return

    setSelectedSubjectId(null)

    setSelectedLanguageId(languageId)

    setSelectedLessonId(null)

    setScreen('lessons')

  }

  const openSubject = (subjectId: SchoolSubjectId) => {
    if (currentUser?.role === 'student' && studentGrade === null) return
    setSelectedLanguageId(null)
    setSelectedLessonId(null)
    setSelectedSubjectId(subjectId)
    setScreen('subject')
  }

  const openSyllabus = () => {
    if (currentUser?.role === 'student' && studentGrade === null) return
    if (activeGrade === null) return
    setSelectedLanguageId(null)
    setSelectedLessonId(null)
    setSelectedSubjectId(null)
    setScreen('syllabus')
  }



  const openLesson = (lessonId: string) => {

    setSelectedLessonId(lessonId)

    setScreen('lesson')

  }



  const goHome = () => {

    setScreen('home')

    setSelectedLanguageId(null)

    setSelectedSubjectId(null)

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

    clearDemoSession()

    await supabase.auth.signOut()

    setCurrentUser(null)

    goHome()

  }

  const enterDemo = () => {
    const demoUser = getDemoUser()
    if (!demoUser) return
    setCurrentUser(demoUser)
    setPoints(0)
    setAvatarConfig(defaultKawaiiAvatar())
    setStudentGrade(getStudentCourse(demoUser.id))
    setScreen('home')
  }



  const persistProfile = async (fields: { points?: number; avatar_config?: AvatarConfig }) => {

    if (!currentUser) return

    await supabase.from('profiles').update(fields).eq('id', currentUser.id)

  }



  const handleQuizVerify = (passed: boolean, score: number, _total: number) => {

    if (!passed || !currentUser || !selectedLanguageId || !selectedLessonId) return

    if (isLessonCompleted(currentUser.id, selectedLanguageId, selectedLessonId)) return



    const prevBadges = earnedBadges(points).length

    const newPoints = points + score * POINTS_PER_CORRECT

    setPoints(newPoints)

    void persistProfile({ points: newPoints })

    if (earnedBadges(newPoints).length > prevBadges) setShowConfetti(true)

  }



  const handleAwardPoints = (amount: number) => {

    if (!currentUser || amount <= 0) return

    const prevBadges = earnedBadges(points).length

    const newPoints = points + amount

    setPoints(newPoints)

    void persistProfile({ points: newPoints })

    if (earnedBadges(newPoints).length > prevBadges) setShowConfetti(true)

  }

  const handlePersonalizedLessonComplete = (result: { correct: number; total: number }) => {
    const bonus = Math.max(5, result.correct * POINTS_PER_CORRECT)
    handleAwardPoints(bonus)
    setShowConfetti(true)
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

    // Sincroniza el progreso real a Supabase para que el docente lo vea.
    if (currentUser.role === 'student' && selectedLanguage) {
      void syncStudentProgress({
        studentId: currentUser.id,
        name: currentUser.name,
        languageName: selectedLanguage.name,
        lessonsCompleted: countCompletedInLanguage(currentUser.id, selectedLanguageId),
        totalLessons: visibleLessonCount || languageLessons.length,
      })
    }

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

    return <Login onDemoLogin={enterDemo} />

  }



  return (

    <div className="app-shell">

      <ConfettiBurst active={showConfetti} onDone={() => setShowConfetti(false)} />

      <GradeSidebar
        selected={studentGrade}
        open={gradesMenuOpen}
        onSelect={selectCourse}
        onClose={() => setGradesMenuOpen(false)}
      />

      <div className="app">

      <nav className="top-bar">

        <button
          type="button"
          className={`menu-burger ${gradesMenuOpen ? 'is-open' : ''}`}
          onClick={() => setGradesMenuOpen((v) => !v)}
          aria-label={gradesMenuOpen ? 'Cerrar menú de grados' : 'Abrir menú de grados'}
          aria-expanded={gradesMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <button type="button" className="top-bar-brand" onClick={goHome} aria-label="Ir al inicio">
          <BrandLogo size="sm" />
        </button>

        <span className="top-bar-user">
          <span className="top-bar-avatar">
            <KawaiiAvatar config={fromAvatarConfig(avatarConfig)} size={48} />
          </span>
          <span className="top-bar-user-info">

            {currentUser.name}

            <span className="top-bar-meta">

              <span className="role-badge">

                {currentUser.role === 'staff' ? 'Docente / Administrativo' : 'Estudiante'}

              </span>

              {activeCourse && (

                <span className="course-badge">{activeCourse.label}</span>

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
          onChange={handleAvatarChange}
          onDone={goHome}
        />
      )}



      {screen === 'home' && (

        <>

          <header className="welcome-card">
            <div className="welcome-card-avatar">
              <KawaiiAvatar config={fromAvatarConfig(avatarConfig)} size={110} />
            </div>
            <div className="welcome-card-body">
              <p className="welcome-card-hello">¡Hola, {currentUser.name}! ✨</p>
              <h1>
                El conocimiento también puede ser divertido. Atrévete a aprender de una forma
                diferente
              </h1>
              <p className="welcome-card-hint">
                Toca el menú ☰ para elegir tu grado y empieza a explorar.
              </p>
              {activeCourse && (
                <p className="welcome-card-grade">
                  Grado actual: <strong>{activeCourse.label}</strong>
                </p>
              )}
            </div>
          </header>



          <h2 className="section-title">Tu grado escolar</h2>

          <p className="course-section-intro">

            Usa el botón ☰ para abrir el menú de grados (Prescolar a 11°).

            Cada grado desbloquea más niveles y ajusta la dificultad del quiz.

          </p>

          {activeCourse && (

            <p className="course-active-banner">

              Grado seleccionado: {activeCourse.label} · {activeCourse.difficultyLabel} ({activeCourse.cefrRange})

            </p>

          )}

          {currentUser.role === 'student' && studentGrade === null && (

            <p className="course-pick-hint">Selecciona tu grado con el botón ☰ (Prescolar a 11°) para acceder a las materias e idiomas.</p>

          )}

          <h2 className="section-title">Temario del curso</h2>

          <p className="course-section-intro">
            Módulo con todos los temas que se van a ver en el grado seleccionado.
          </p>

          <button
            type="button"
            className={`syllabus-module-card ${activeGrade === null ? 'syllabus-module-card--disabled' : ''}`}
            disabled={activeGrade === null}
            onClick={openSyllabus}
          >
            <span className="syllabus-module-icon" aria-hidden="true">
              📋
            </span>
            <span className="syllabus-module-text">
              <strong>
                {activeCourse
                  ? `Temario completo · ${activeCourse.label}`
                  : 'Temario completo del curso'}
              </strong>
              <span>
                {activeGrade !== null
                  ? `${countGradeTopics(activeGrade)} temas de Matemáticas, Español y Ciencias naturales`
                  : 'Elige un grado con el menú ☰ para ver el temario'}
              </span>
            </span>
            <span className="syllabus-module-cta">
              {activeGrade === null ? 'Elige grado' : 'Ver temas'}
            </span>
          </button>



          <h2 className="section-title">Materias del curso</h2>

          <p className="course-section-intro">
            Temas alineados a los Derechos Básicos de Aprendizaje (DBA) y Estándares del Ministerio de Educación Nacional.
          </p>

          <div className="subject-grid">
            {SCHOOL_SUBJECTS.map((subject) => {
              const disabled = currentUser.role === 'student' && studentGrade === null
              return (
                <button
                  key={subject.id}
                  type="button"
                  className={`subject-card ${disabled ? 'subject-card--disabled' : ''}`}
                  style={{ ['--subject-accent' as string]: subject.accent }}
                  disabled={disabled}
                  onClick={() => openSubject(subject.id)}
                >
                  <span className="subject-card-icon" aria-hidden="true">
                    {subject.icon}
                  </span>
                  <h3>{subject.name}</h3>
                  <p>{subject.description}</p>
                  <span className="badge">
                    {disabled ? 'Elige grado' : activeCourse ? activeCourse.label : 'Abrir'}
                  </span>
                </button>
              )
            })}
          </div>

          <h2 className="section-title">Idiomas disponibles</h2>

          <p className="course-section-intro">
            Inglés, francés y portugués.
          </p>

          <div className="language-grid">

            {languages.map((language) => {

              const notAssigned =
                currentUser.role === 'student' &&
                !!currentUser.assignedLanguage &&
                currentUser.assignedLanguage !== language.id
              const isAssigned =
                currentUser.role === 'student' && currentUser.assignedLanguage === language.id
              const disabled = (currentUser.role === 'student' && studentGrade === null) || notAssigned

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

                    {notAssigned
                      ? '🔒 No asignado'
                      : isAssigned
                        ? '✓ Asignado a ti'
                        : activeCourse
                          ? activeCourse.difficultyLabel
                          : 'Elige curso'}

                  </span>

                </button>

              )

            })}

          </div>

        </>

      )}

      {screen === 'syllabus' && activeGrade !== null && (
        <GradeSyllabusView
          grade={activeGrade}
          onBack={goHome}
          onOpenSubject={openSubject}
        />
      )}

      {screen === 'subject' && selectedSubjectId && activeGrade !== null && (
        <SubjectView
          subjectId={selectedSubjectId}
          grade={activeGrade}
          onBack={goHome}
          onLessonComplete={handlePersonalizedLessonComplete}
        />
      )}



      {screen === 'lessons' && selectedLanguage && activeGrade !== null && (

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



          {studentGrade !== null && studentGrade < 11 && (

            <p className="course-upgrade-hint">

              En {getCourse((studentGrade + 1) as StudentGrade).label} se desbloquearán más niveles y contenidos avanzados.

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



      {screen === 'lesson' && currentLesson && selectedLanguage && activeGrade !== null && (

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
            onAwardPoints={handleAwardPoints}
          />

        </>

      )}

    </div>

    </div>

  )

}



export default App


