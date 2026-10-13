import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        house: resolve(__dirname, 'the-house.html'),
        ritual: resolve(__dirname, 'the-ritual.html'),
        journal: resolve(__dirname, 'journal.html'),
        professional: resolve(__dirname, 'professional.html'),
        privateDiscovery: resolve(__dirname, 'private-discovery.html'),
        privacy: resolve(__dirname, 'privacy-policy.html'),
        terms: resolve(__dirname, 'terms.html')
      }
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: false
  }
});
