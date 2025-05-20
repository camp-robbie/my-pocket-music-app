import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 상대 경로로 설정하여 어디에서든 배포 가능하도록
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // 프로덕션에서는 소스맵 비활성화로 보안 강화
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
    minify: 'terser', // 더 강력한 압축
    terserOptions: {
      compress: {
        drop_console: true, // 콘솔 로그 제거
        drop_debugger: true // 디버거 제거
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true // 네트워크에서 접근 가능하도록 설정
  }
})