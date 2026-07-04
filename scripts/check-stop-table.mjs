/**
 * Comprueba si la tabla stop_scores existe en Supabase.
 * Ejecutar: node scripts/check-stop-table.mjs
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function loadEnv() {
  try {
    const env = readFileSync(resolve(root, '.env'), 'utf8')
    for (const line of env.split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/)
      if (m) process.env[m[1].trim()] = m[2].trim()
    }
  } catch {
    /* ignore */
  }
}

loadEnv()

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en .env')
  process.exit(1)
}

const supabase = createClient(url, key)

const { error } = await supabase.from('stop_scores').select('id').limit(1)

if (error) {
  console.log('PENDIENTE: la tabla stop_scores aun no existe.')
  console.log('Abre Supabase SQL Editor y ejecuta: supabase/migrations/stop_scores.sql')
  console.log('URL: https://supabase.com/dashboard/project/qvyrrwqzrydksppddnbn/sql/new')
  process.exit(2)
}

console.log('OK: la tabla stop_scores ya existe. El ranking global funcionara.')
