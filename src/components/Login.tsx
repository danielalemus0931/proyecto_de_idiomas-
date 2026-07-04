import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Gender, Role } from '../types'

function Login() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('student')
  const [gender, setGender] = useState<Gender>('female')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setInfo(null)
    setLoading(true)

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })
      if (error) setError(traducirError(error.message))
      // Si va bien, App detecta la sesión automáticamente.
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: { data: { name: name.trim(), role, gender } },
      })
      if (error) {
        setError(traducirError(error.message))
      } else if (data.session) {
        // Sesión inmediata (confirmación de correo desactivada): App entra solo.
      } else {
        setInfo('Cuenta creada. Revisa tu correo para confirmarla y luego inicia sesión.')
        setMode('signin')
      }
    }

    setLoading(false)
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="logo">
          <span className="logo-icon" aria-hidden="true">
            🌍
          </span>
          Langflow
        </div>
        <h1>{mode === 'signin' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
        <p className="login-subtitle">
          {mode === 'signin'
            ? 'Accede para continuar aprendiendo.'
            : 'Regístrate como estudiante o docente.'}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <label className="login-label">
              Nombre
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </label>
          )}

          <label className="login-label">
            Correo
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              autoComplete="username"
              required
            />
          </label>

          <label className="login-label">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              minLength={6}
              required
            />
          </label>

          {mode === 'signup' && (
            <>
              <label className="login-label">
                Rol
                <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
                  <option value="student">Estudiante</option>
                  <option value="staff">Docente / Administrativo</option>
                </select>
              </label>
              <label className="login-label">
                Personaje
                <select value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
                  <option value="female">Femenino</option>
                  <option value="male">Masculino</option>
                </select>
              </label>
            </>
          )}

          {error && <p className="login-error">{error}</p>}
          {info && <p className="login-info">{info}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Cargando…' : mode === 'signin' ? 'Entrar' : 'Registrarme'}
          </button>
        </form>

        <button
          type="button"
          className="login-toggle"
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin')
            setError(null)
            setInfo(null)
          }}
        >
          {mode === 'signin'
            ? '¿No tienes cuenta? Regístrate'
            : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  )
}

function traducirError(message: string): string {
  if (message.includes('Invalid login credentials')) return 'Correo o contraseña incorrectos.'
  if (message.includes('already registered')) return 'Ese correo ya está registrado.'
  if (message.includes('at least 6')) return 'La contraseña debe tener al menos 6 caracteres.'
  return message
}

export default Login
