# song-request-web：給 AI 工具的專案規則

點歌平台的前端（Nuxt 4）。後端在另一個 repo `song-request-api`，兩邊唯一的約定是後端的 `openapi.yaml`。
設計文件在 Notion「可以放點歌的前端配置」。

## 結構

- `app/`：Nuxt 頁面。觀眾頁 `/c/[slug]` 用 SSR；後台 `/dashboard/**` 與播放器用 CSR。
- `overlay/`：OBS 疊加層，**原生 JavaScript + SCSS**，不依賴 Vue，用 Vite 獨立打包到 `public/overlay/`。整場直播都開在 OBS 裡，要保持很小。
- `src-tauri/`（第 6 階段）：桌面版，包同一份前端。

## 規則

- JavaScript，不用 TypeScript；型別提示用 JSDoc，API 型別之後從 `openapi.yaml` 產生。
- 瀏覽器直接呼叫後端：用 `useApi`（頁面載入）或 `apiFetch`（事件處理），不要自己寫 `$fetch` 的 baseURL 與 credentials。
- 後端錯誤格式 `{ code, message }`，畫面依 code 顯示中文。
- 前端沒有任何密鑰；需要保密的東西都在後端。
- 觀眾暱稱、歌名一律當純文字顯示（Vue 的 `{{ }}`、疊加層用 `textContent`），不要用 `v-html` 或 `innerHTML`。
- 配色只用 `app/assets/css/main.css` 的語意色（surface、card、ink、muted…），深淺色模式都要能看。

## 指令

```bash
pnpm dev            # http://localhost:3100（3000 留給 Realtime Lab）
pnpm overlay:dev    # 只開疊加層：http://localhost:3101/?demo=1
pnpm build          # 疊加層 + Nuxt
```
