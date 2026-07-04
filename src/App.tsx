import { useEffect, useState } from 'react'
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
  lessons,
  quizPrompts,
  quizQuestions,
  vocabulary,
} from './data/content'
import type { AvatarConfig, Gender, Role, User } from './types'

type Screen = 'home' | 'lessons' | 'lesson' | 'stop' | 'admin' | 'avatar'

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(null)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)
  const [points, setPoints] = useState(0)
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(defaultAvatar('female'))

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
        // Perfil aún no creado: usa valores mínimos por defecto.
        setCurrentUser({ id: userId, name: email, email, role: 'student' as Role, gender: 'female' })
        setPoints(0)
        setAvatarConfig(defaultAvatar('female'))
      }
    }

    // Sesión inicial (si ya había una guardada).
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user.id, session.user.email ?? '')
      }
      setAuthLoading(false)
    })

    // Reacciona a inicios/cierres de sesión.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfile(session.user.id, session.user.email ?? '')
      } else {
        setCurrentUser(null)
      }
    })

    return () => sub.subscription.unsubscribe()
  }, [])

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

  const openStopGame = () => {
    setScreen('stop')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setCurrentUser(null)
    goHome()
  }

  // Guarda puntos y/o avatar del usuario actual en Supabase.
  const persistProfile = async (fields: { points?: number; avatar_config?: AvatarConfig }) => {
    if (!currentUser) return
    await supabase.from('profiles').update(fields).eq('id', currentUser.id)
  }

  const handleQuizAnswer = (optionId: string, correct: boolean) => {
    if (quizAnswer !== null) return
    setQuizAnswer(optionId)
    if (correct) {
      const newPoints = points + POINTS_PER_CORRECT
      setPoints(newPoints)
      void persistProfile({ points: newPoints })
    }
  }

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
                <span className="language-flag">
                  <Flag code={language.code} className="flag-svg" />
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
            <span className="lesson-header-flag">
              <Flag code={selectedLanguage.code} className="flag-svg" />
            </span>
            <div className="lesson-header-text">
              <h2>{selectedLanguage.name}</h2>
              <p>Selecciona una lección para empezar.</p>
            </div>
          </header>

          <button type="button" className="stop-competitive-card" onClick={openStopGame}>
            <span className="stop-competitive-icon" aria-hidden="true">
              ⚡
            </span>
            <div className="stop-competitive-body">
              <h3>Stop competitivo</h3>
              <p>
                90 segundos · nombre, animal, país, cosa, alimento, color y verbo. Compite con otros
                estudiantes de {selectedLanguage.name}.
              </p>
              <span className="stop-competitive-tag">Actividad extra del idioma</span>
            </div>
            <span className="lesson-arrow" aria-hidden="true">
              →
            </span>
          </button>

          <h3 className="section-title">Lecciones</h3>
          <div className="lesson-list">
            {languageLessons.map((lesson, index) => (
              <button
                key={lesson.id}
                className="lesson-card"
                onClick={() => openLesson(lesson.id)}
              >
                <span className="lesson-number" aria-hidden="true">
                  {index + 1}
                </span>
                <div className="lesson-card-body">
                  <h3>{lesson.title}</h3>
                  <p className="lesson-meta">
                    <span className="lesson-chip">{lesson.topic}</span>
                    <span className="lesson-chip">{lesson.duration}</span>
                    <span className="lesson-chip">{lesson.words} palabras</span>
                    <span className="lesson-chip">6 actividades</span>
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

      {screen === 'lesson' && currentLesson && selectedLanguage && (
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
                {selectedLanguage.name} · {currentLesson.topic}
              </p>
            </div>
          </header>

          <LessonActivities
            key={selectedLessonId}
            lessonWords={lessonWords}
            quizOptions={quizOptions}
            quizPrompt={quizPrompt}
            quizAnswer={quizAnswer}
            speechLang={LANG_BCP47[selectedLanguage.id] ?? 'en-US'}
            onQuizAnswer={handleQuizAnswer}
          />
        </>
      )}
    </div>
  )
}

export default App
