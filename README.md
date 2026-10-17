# 點歌平台前端（song-request-web）

開放給所有直播主使用的點歌平台前端。觀眾頁、直播主後台、伴奏播放器、OBS 疊加層，之後再包成桌面版（.exe）。

後端：[song-request-api](https://github.com/xaviera19ty/song-request-api)

| 項目 | 技術 |
| --- | --- |
| 框架 | Nuxt 4（Vue 3），JavaScript + JSDoc |
| 樣式 | Tailwind CSS 4；疊加層用 SCSS |
| 狀態 | Pinia |
| OBS 疊加層 | 原生 JavaScript，Vite 獨立打包（約 4 KB） |
| 桌面版 | Tauri 2（第 6 階段） |

## 本機開發

先把後端跑起來（預設 http://localhost:8090），再：

```bash
cp .env.example .env
pnpm install
pnpm dev                 # http://localhost:3100
```

首頁下方會顯示「後端連線正常」，代表前後端接通了。

### OBS 疊加層

```bash
pnpm overlay:dev         # http://localhost:3101/?demo=1 用假資料調樣式
```

`pnpm build` 會先把疊加層打包到 `public/overlay/`，網址是 `/overlay/?token=…`。

| 參數 | 說明 |
| --- | --- |
| `token` | OBS 專用 token（後台複製網址時帶上） |
| `theme` | `dark`（預設）或 `light` |
| `count` | 顯示接下來幾首，預設 3 |
| `compact=1` | 只顯示正在唱 |
| `demo=1` | 假資料 |

## 開發階段

1. **登入與開通**（進行中）：骨架、首頁、登入頁 ✅；Twitch／YouTube 登入、`/onboarding`
2. 曲庫：CRUD、CSV 匯入
3. 免費點歌：觀眾頁、即時隊列、OBS 疊加層接上 WebSocket
4. 付費點歌：價格設定、點歌碼對話框、付款紀錄
5. 伴奏與網頁播放器
6. 桌面版（Tauri）
7. 加值：自然語言找歌、報表
