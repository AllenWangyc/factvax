import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  server: {
    port: 3000,
    open: '/dashboard/login',
    https: {
      key: fs.readFileSync('./key.pem'), 
      cert: fs.readFileSync('./cert.pem'), 
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'build',
  },
  plugins: [react()],
})
