export type StopCategoryId =
  | 'nombre'
  | 'animal'
  | 'pais'
  | 'cosa'
  | 'alimento'
  | 'color'
  | 'verbo'

export type StopCategory = {
  id: StopCategoryId
  label: string
  placeholder: string
}

export type StopAnswers = Record<StopCategoryId, string>

export type StopScoreEntry = {
  id?: string
  student_name: string
  score: number
  categories_filled: number
  time_remaining: number
  created_at?: string
}

export const STOP_TIME_SECONDS = 90
export const POINTS_PER_CATEGORY = 100

export const STOP_CATEGORIES: StopCategory[] = [
  { id: 'nombre', label: 'Nombre', placeholder: 'Un nombre propio' },
  { id: 'animal', label: 'Animal', placeholder: 'Ej: cat, chat, gato…' },
  { id: 'pais', label: 'País', placeholder: 'Ej: Canada, Chile…' },
  { id: 'cosa', label: 'Cosa', placeholder: 'Un objeto o cosa' },
  { id: 'alimento', label: 'Alimento', placeholder: 'Comida o bebida' },
  { id: 'color', label: 'Color', placeholder: 'Ej: blue, rouge…' },
  { id: 'verbo', label: 'Verbo', placeholder: 'Una acción' },
]
