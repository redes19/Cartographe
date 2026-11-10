import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      watch: {
        usePolling: env.VITE_POLLING === 'true',
      },
    },
  }
})
