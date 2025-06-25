import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {  // Proxy API requests to your backend
        target: 'http://localhost:3000',  // Replace with your backend port
        changeOrigin: true,
      },
    },
  },
});