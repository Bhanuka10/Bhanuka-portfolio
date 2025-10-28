import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: '0.0.0.0', // Allow access from network
    strictPort: false,
    open: false,
    cors: true,
    // Force CSS refresh
    hmr: {
      overlay: true
    }
  },
  preview: {
    port: 4173,
    host: '0.0.0.0', // Allow access from network
    strictPort: false,
    open: false,
    cors: true
  },
  css: {
    devSourcemap: true,
    // Force CSS processing consistency
    preprocessorOptions: {},
    postcss: {},
    // Ensure consistent CSS loading
    modules: false
  }
})
