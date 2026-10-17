<script setup>
useSeoMeta({
  title: '點歌台｜給直播主的點歌平台',
  ogTitle: '點歌台：給直播主的點歌平台',
  ogDescription: '觀眾用 Twitch 或 YouTube 登入點歌，免費或付費都可以；OBS 即時顯示歌名。',
})

const features = [
  { icon: '🎵', title: '自己的曲庫', text: '新增歌曲或用 CSV 一次匯入；之後可以上傳伴奏，直接在網頁或桌面版播放。' },
  { icon: '💜', title: '免費或付費點歌', text: '串 Twitch 頻道點數、Bits 與 YouTube Super Chat，錢由平台收，我們只確認誰付了。' },
  { icon: '📺', title: 'OBS 即時顯示', text: '貼一個網址到 OBS 瀏覽器來源，正在唱與接下來幾首自動更新。' },
]

// 骨架階段用來確認前端連得到後端
const { data: ping, error: pingError } = await useApi('/v1/ping', { server: false })
</script>

<template>
  <div class="space-y-12">
    <section class="rounded-3xl bg-gradient-to-br from-coral-100 via-night-50 to-night-100 p-8 dark:from-night-800 dark:via-night-900 dark:to-night-950 md:p-12">
      <h1 class="text-3xl font-bold text-heading md:text-4xl">直播點歌，一個網址搞定</h1>
      <p class="mt-3 max-w-xl text-muted">
        觀眾用 Twitch 或 YouTube 登入就能點歌，你在後台決定下一首，OBS 上的歌單即時更新。
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <NuxtLink to="/login" class="rounded-lg bg-coral-500 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-coral-600">
          我是直播主，開始使用
        </NuxtLink>
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <div v-for="f in features" :key="f.title" class="rounded-2xl bg-card p-5 ring-1 ring-line">
        <p class="text-2xl" aria-hidden="true">{{ f.icon }}</p>
        <h2 class="mt-2 font-semibold text-heading">{{ f.title }}</h2>
        <p class="mt-1 text-sm text-muted">{{ f.text }}</p>
      </div>
    </section>

    <p class="text-center text-xs text-muted" aria-live="polite">
      <span v-if="ping" class="text-ok">● 後端連線正常（request id {{ ping.requestId }}）</span>
      <span v-else-if="pingError" class="text-danger">● 連不到後端，請先啟動 song-request-api</span>
      <span v-else>確認後端連線中…</span>
    </p>
  </div>
</template>
