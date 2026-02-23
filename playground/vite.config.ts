import { defineConfig } from 'vite';
import path from 'path';
import { readFileSync } from 'fs';

const rootPkg = JSON.parse(readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'));
const repoUrl = typeof rootPkg.repository === 'string'
  ? rootPkg.repository
  : rootPkg.repository?.url ?? '';

export default defineConfig({
  base: process.env.BASE_URL || '/',
  define: {
    __REPO_URL__: JSON.stringify(repoUrl),
  },
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
