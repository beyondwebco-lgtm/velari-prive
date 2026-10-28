import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        theScience: resolve(__dirname, 'the-science.html'),
        privateDiscovery: resolve(__dirname, 'private-discovery.html'),
        exclusiveAccess: resolve(__dirname, 'exclusive-access.html'),
        privacy: resolve(__dirname, 'privacy-policy.html'),
        terms: resolve(__dirname, 'terms.html')
      }
    }
  },
  plugins: [
    {
      name: 'html-rewrite-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url ? req.url.split('?')[0] : '';
          if (url === '/the-science') {
            req.url = '/the-science.html';
          } else if (url === '/private-discovery') {
            req.url = '/private-discovery.html';
          } else if (url === '/exclusive-access') {
            req.url = '/exclusive-access.html';
          } else if (url === '/the-house' || url === '/the-house.html') {
            req.url = '/index.html';
          } else if (url === '/the-ritual' || url === '/the-ritual.html') {
            req.url = '/index.html';
          } else if (url === '/professional' || url === '/professional.html') {
            req.url = '/private-discovery.html';
          } else if (url === '/journal' || url === '/journal.html') {
            req.url = '/the-science.html';
          }
          next();
        });
      }
    }
  ],
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: false
  }
});
