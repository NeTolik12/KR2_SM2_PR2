import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/KR2_SM2_PR2/', // Замените на имя вашего репозитория
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})