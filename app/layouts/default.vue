<template>
  <div class="flex min-h-screen flex-col">
    <header class="border-b border-line bg-card">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <NuxtLink to="/" class="flex items-center gap-2 font-semibold text-heading">
          <span class="grid size-7 place-items-center rounded-lg bg-coral-500 text-sm text-white" aria-hidden="true">♪</span>
          點歌台
        </NuxtLink>
        <nav class="flex items-center gap-2">
          <NuxtLink to="/login" class="rounded-md px-3 py-1.5 text-sm font-medium text-heading hover:bg-hover">登入</NuxtLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
    <main class="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <slot />
    </main>
    <footer class="border-t border-line py-6 text-center text-xs text-muted">
      點歌台・錢由 Twitch／YouTube 收，平台不經手現金
    </footer>
  </div>
</template>
