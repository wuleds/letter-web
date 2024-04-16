import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({command, mode} ) =>{
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: mode === 'production'? 443 : 80,
      host: mode === 'production'? 'localhost' : '0.0.0.0',
      proxy: {
        '/api': {
          target: mode === 'production'
              ? env.VITE_PRO_API
              : env.VITE_DEV_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/link': {
          target: env.MODE === 'production'
              ? env.VITE_PRO_WSS
              : env.VITE_DEV_WS,
          ws: true,
          changeOrigin: true,
        }
      }
    },
  }
})