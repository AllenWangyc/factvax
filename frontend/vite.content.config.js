import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { CRX_CONTENT_OUTDIR } from './globalConfig'

export default defineConfig({
  build: {
    outDir: CRX_CONTENT_OUTDIR,
    lib: {
      entry: [
        path.resolve(__dirname, 'src/content/index.jsx'),
      ],
      formats: ['cjs'],
      fileName: () => {
        return 'content.js'
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          return 'content.css'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env.NODE.ENV': null
  },
  plugins: [react()],
})