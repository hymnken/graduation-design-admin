import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server: [
    {
      host: '127.0.0.1',
      port: 7789,
      proxy: {
        '/bd': {
          target: 'https://geoapi.qweather.com/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/bd/, ''),
        },
      },
    },
    {
      '/api': {
        target: 'https://geoapi.qweather.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    {
      '/apq': {
        target: 'https:/devapi.qweather.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  ],

  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.join(__dirname, 'src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import 'src/styles/index.scss';`,
      },
    },
  },
  plugins: [vue()],
})
