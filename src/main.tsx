import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FlagMosaic from './components/FlagMosaic.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FlagMosaic />
    <App />
  </StrictMode>,
)
