import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@simplesteps/core': path.resolve(__dirname, '../packages/core/src'),
    },
  },
  // Allow importing from outside the root (packages/core)
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
