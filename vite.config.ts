import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/GrammarGuru/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      build: {
        outDir: 'docs',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          manifest: {
            name: 'GrammarGuru AI',
            short_name: 'GrammarGuru',
            start_url: '.',
            display: 'standalone',
            background_color: '#f8f9fc',
            theme_color: '#4f46e5',
            description: 'Interactive English Grammar Teacher with Gemini AI',
            icons: [
              {
                src: 'https://cdn-icons-png.flaticon.com/512/3426/3426653.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
              }
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
