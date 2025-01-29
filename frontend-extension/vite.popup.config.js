import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { CRX_OUTDIR } from './globalConfig'

export default defineConfig({
  server: {
    port: 3000,
    open: '/',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: CRX_OUTDIR,
  },
  plugins: [react()],
})