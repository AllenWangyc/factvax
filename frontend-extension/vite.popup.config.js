import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { CRX_OUTDIR } from './globalConfig'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: '/',
    // https: {
    //   key: fs.readFileSync('./key.pem'), 
    //   cert: fs.readFileSync('./cert.pem'), 
    // },
    // Reverse proxy setting, turn off mockjs before using it.
    // proxy: {
    //   '/api': {
    //     // target: 'http://localhost/',
    //     target: 'https://fact-vax-app-e8d263b7267d.herokuapp.com/',
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
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