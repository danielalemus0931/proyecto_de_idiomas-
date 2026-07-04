import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan variables de entorno de Supabase. Revisa tu archivo .env (VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY).',
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente aislado (sin persistir sesión) para que el docente pueda crear
// cuentas de estudiantes sin cerrar su propia sesión.
export function createIsolatedClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      storageKey: 'langflow-admin-signup',
    },
  })
}
