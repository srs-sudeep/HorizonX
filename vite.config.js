import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import AutoExport from 'unplugin-auto-export/vite';
import { defineConfig } from 'vite';
// ESLint is handled via scripts, no plugin needed
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    checker({
      typescript: true,
    }),
    // ESLint is handled via scripts
    AutoExport({
      // Directories to watch, paths can use aliases; It just needs to end with /*
      path: ['~/views/**/{components,hooks}/*', '~/hooks/*'],
      // Directories or files to ignore (optional)
      ignore: ['**/node_modules/*'],
      // File extension (default is 'ts') `ts` | `js`
      extname: 'ts',
      // Custom export format
      formatter: (filename, extname) => `export * from './${filename}'`,
    }),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@core': path.resolve(__dirname, './src/core'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@config': path.resolve(__dirname, './src/config'),
      '@services': path.resolve(__dirname, './src/services'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
});
