import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/' : '/', // Adjust base if deploying to a subdirectory
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      port: 3000,
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Ensures the dist folder is cleaned before build
  },
  optimizeDeps: {
    include: ['animejs'],
  }
}))