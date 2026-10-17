<script setup>
useSeoMeta({ title: '登入｜點歌台' })

const { apiBase } = useRuntimeConfig().public
const route = useRoute()
// 登入後回到原本的頁面
const next = computed(() => encodeURIComponent(String(route.query.next ?? '/dashboard')))

// 第 1 階段的登入還在開發：按鈕先停用，後端完成 /v1/auth/* 後再打開
const ready = false
</script>

<template>
  <div class="mx-auto max-w-sm space-y-6 py-8">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-heading">登入點歌台</h1>
      <p class="mt-2 text-sm text-muted">直播主與觀眾都用直播平台的帳號登入。付費點歌時，我們用這個帳號確認付款的人就是點歌的人。</p>
    </div>
    <div class="space-y-3">
      <component
        :is="ready ? 'a' : 'button'"
        :href="ready ? `${apiBase}/v1/auth/twitch?next=${next}` : undefined"
        :disabled="!ready || undefined"
        class="flex w-full items-center justify-center gap-2 rounded-lg bg-twitch px-4 py-3 font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        用 Twitch 登入
      </component>
      <component
        :is="ready ? 'a' : 'button'"
        :href="ready ? `${apiBase}/v1/auth/google?next=${next}` : undefined"
        :disabled="!ready || undefined"
        class="flex w-full items-center justify-center gap-2 rounded-lg bg-youtube px-4 py-3 font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        用 YouTube（Google）登入
      </component>
    </div>
    <p v-if="!ready" class="text-center text-xs text-muted">登入功能開發中（第 1 階段）</p>
  </div>
</template>
