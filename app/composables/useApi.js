/**
 * 呼叫後端 song-request-api。前後端分離：瀏覽器直接打 API（不經過 Nuxt 轉送），
 * 帶上 cookie（credentials: 'include'）；SSR 時在 Nuxt 伺服器上執行，要把觀眾的 cookie 一起轉過去。
 *
 * @param {string | (() => string)} path 例如 '/v1/ping'
 * @param {Parameters<typeof useFetch>[1]} [options]
 */
export function useApi(path, options = {}) {
  const { apiBase } = useRuntimeConfig().public
  const headers = import.meta.server ? useRequestHeaders(['cookie']) : {}
  return useFetch(path, {
    baseURL: apiBase,
    credentials: 'include',
    ...options,
    headers: { ...headers, ...options.headers },
  })
}

/** 送出會改資料的請求（點歌、按讚、設定…），用在事件處理裡。 */
export function apiFetch(path, options = {}) {
  const { apiBase } = useRuntimeConfig().public
  return $fetch(path, { baseURL: apiBase, credentials: 'include', ...options })
}
