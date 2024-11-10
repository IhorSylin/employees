import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/


export default defineConfig({
  plugins: [react()],
  preview: {
    strictPort: true,
    port: 8080,
    proxy: {
      "/api": "http://employees-api:3000",
    },
  },
  server: {
    port: 3002,
    strictPort: true,
    host: true,
    proxy: {
      "/api": "http://employees-api:3000",
    },
  },
});