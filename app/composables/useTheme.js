// 深淺色切換：實際狀態是 <html class="dark">，選擇存在 localStorage。
export function useTheme() {
  // SSR 不知道使用者的選擇，一律先當淺色，掛載後再同步
  const isDark = useState('theme-dark', () => false)

  onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })

  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    try {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
    catch {
      // 無痕模式存不了，只影響下次開啟
    }
  }

  return { isDark, toggle }
}
