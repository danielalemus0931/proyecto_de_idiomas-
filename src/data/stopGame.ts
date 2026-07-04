export type StopCategoryId =
  | 'letra'
  | 'pais'
  | 'color'
  | 'animal'
  | 'alimento'
  | 'objeto'

export type StopCategory = {
  id: StopCategoryId
  label: string
  placeholder: string
  icon: string
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

export const STOP_TIME_SECONDS = 60
export const POINTS_PER_CATEGORY = 100

export const STOP_CATEGORIES: StopCategory[] = [
  { id: 'letra', label: 'Palabra', placeholder: 'Una palabra con la letra del día', icon: '🔤' },
  { id: 'pais', label: 'País', placeholder: 'Ej: Canada, Chile, France…', icon: '🌍' },
  { id: 'color', label: 'Color', placeholder: 'Ej: blue, rouge, rojo…', icon: '🎨' },
  { id: 'animal', label: 'Animal', placeholder: 'Ej: cat, perro, chat…', icon: '🐾' },
  { id: 'alimento', label: 'Alimento', placeholder: 'Comida o bebida', icon: '🍎' },
  { id: 'objeto', label: 'Objeto', placeholder: 'Un objeto cotidiano', icon: '📦' },
]
