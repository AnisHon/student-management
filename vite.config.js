import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.vue', '.json']
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://192.168.20.191:8080',changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/api/, '')
  //   }
  // }
})
