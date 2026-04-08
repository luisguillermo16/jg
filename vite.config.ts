import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Separamos las librerías grandes en sus propios "chunks" para que el navegador 
        // pueda cachearlas independientemente de tu código.
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap': ['gsap', '@gsap/react'],
          'vendor-motion': ['framer-motion', '@vercel/analytics', '@vercel/speed-insights'],
        },
      },
    },
    // Optimizaciones adicionales
    chunkSizeWarningLimit: 800,
    cssCodeSplit: true,
    minify: 'esbuild',
    sourcemap: false,
    assetsInlineLimit: 4096, // No inlinear archivos de más de 4KB para evitar bloating del JS
  },
})
