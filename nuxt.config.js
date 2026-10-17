import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },
  // 3000 留給 Realtime Lab，兩個專案可以同時跑
  devServer: { port: 3100 },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      // 瀏覽器與 SSR 都直接呼叫後端（前後端分離，不經過 Nuxt 轉送）
      apiBase: 'http://localhost:8090',
      // 自己的網址：og 標籤、分享連結
      siteUrl: 'http://localhost:3100',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hant-TW' },
      title: '點歌台',
      meta: [{ name: 'description', content: '給直播主的點歌平台：觀眾用 Twitch 或 YouTube 登入點歌，免費或付費都可以' }],
      // 在畫面渲染前套上深色 class，避免先閃一下淺色
      script: [{
        innerHTML: "try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}",
      }],
    },
  },
})
