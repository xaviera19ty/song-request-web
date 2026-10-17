// OBS 疊加層：獨立打包成很小的靜態頁面（不經過 Nuxt），輸出到 public/overlay/，
// 網址 /overlay/?token=…。開發時 `pnpm overlay:dev` 單獨預覽。
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: './',
  build: {
    outDir: fileURLToPath(new URL('../public/overlay', import.meta.url)),
    emptyOutDir: true,
  },
  server: { port: 3101 },
})
