/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080
  },
  test: {
    // Vitest will provide global APIs for test files.
    globals: true,
    environment: 'jsdom',
    reporters: ['html'],
    coverage: {
      enabled: true,
      reporter: ['html', 'text', 'json']
    }
  }
})
