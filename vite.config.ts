import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // OneDrive bloquea PNGs grandes en public/avatars (EBUSY al hacer watch).
      ignored: ['**/public/avatars/**'],
    },
  },
})
