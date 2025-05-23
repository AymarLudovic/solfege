import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // Pour les plugins Club GSAP (SplitText, DrawSVG, etc.)
    "process.env": {},
    global: {},
  },
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger', 'gsap/Flip'],
  },
  server: {
    host: true, // Permet l'accès depuis d'autres appareils sur le réseau local
  }
});