import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // Use '/Centsible/' base path for production builds (GitHub Pages), '/' for local dev
  const base = command === 'build' ? '/Centsible/' : '/'
  return {
    plugins: [react()],
    base,
  }
})
