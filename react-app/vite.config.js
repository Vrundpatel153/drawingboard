import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  // Ensure env vars are available
  envPrefix: 'VITE_',
})
