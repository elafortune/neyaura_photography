import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    // Inline assets < 4kb as base64 (icons, small SVGs)
    assetsInlineLimit: 4096,
    // Raise warning threshold (photo sites have larger chunks)
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Split vendor code into separate cacheable chunks
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
  // Optimize deps pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  },
})
