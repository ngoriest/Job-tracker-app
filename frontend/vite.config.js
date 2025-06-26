import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        presets: [
          ['@babel/preset-react', {
            runtime: 'automatic',
            importSource: '@emotion/react'
          }]
        ],
        plugins: [
          ['@emotion/babel-plugin', { 
            sourceMap: true,
            autoLabel: 'dev-only' 
          }]
        ],
        babelrc: false,
        configFile: false
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq) => {
            console.log('Proxying request to:', proxyReq.path);
          });
        }
      }
    },
    port: 5173,
    open: true,
    cors: true
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@emotion/react',
    logOverride: {
      'this-is-undefined-in-esm': 'silent'
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@emotion/react',
      '@emotion/styled',
      'react-router-dom'
    ],
    exclude: []
  },
  build: {
    sourcemap: true,
    minify: 'terser',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          emotion: ['@emotion/react', '@emotion/styled'],
          router: ['react-router-dom']
        }
      }
    }
  }
});