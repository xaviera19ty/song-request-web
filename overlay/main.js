// OBS 疊加層：原生 JavaScript，不依賴任何框架，整場直播都開在 OBS 裡，所以要盡量輕。
//
// 網址參數：
//   token    OBS 專用 token（後台複製網址時帶上）
//   theme    light / dark（預設 dark）
//   count    顯示接下來幾首（預設 3）
//   compact  1 = 只顯示正在唱
//   demo     1 = 顯示假資料，調整樣式用
//
// 第 3 階段接上 WebSocket（song.playing、song.requested、queue.reordered）；目前先把畫面與參數做好。
import './style.scss'

const params = new URLSearchParams(location.search)
const options = {
  token: params.get('token'),
  theme: params.get('theme') === 'light' ? 'light' : 'dark',
  count: Math.min(Math.max(Number(params.get('count') ?? 3) || 3, 0), 10),
  compact: params.get('compact') === '1',
  demo: params.get('demo') === '1',
}

const root = document.getElementById('overlay')
root.dataset.theme = options.theme

/** @typedef {{ title: string, artist: string, requestedBy: string, paid?: boolean }} Song */

/** 把文字放進 DOM 一律用 textContent，觀眾暱稱與歌名都不能當成 HTML 解析 */
function el(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

/**
 * @param {{ playing: Song | null, upNext: Song[] }} state
 */
function render(state) {
  root.replaceChildren()

  const now = el('section', 'now')
  now.append(el('p', 'label', '正在唱'))
  if (state.playing) {
    now.append(el('p', 'title', state.playing.title), el('p', 'meta', `${state.playing.artist}・${state.playing.requestedBy} 點的`))
    if (state.playing.paid) now.classList.add('paid')
  }
  else {
    now.append(el('p', 'title idle', '等待點歌中'))
  }
  root.append(now)

  if (options.compact || options.count === 0 || state.upNext.length === 0) return
  const list = el('ol', 'next')
  for (const song of state.upNext.slice(0, options.count)) {
    const item = el('li', song.paid ? 'paid' : '')
    item.append(el('span', 'title', song.title), el('span', 'meta', song.artist))
    list.append(item)
  }
  root.append(el('p', 'label', '接下來'), list)
}

function renderMessage(text) {
  root.replaceChildren(el('p', 'message', text))
}

if (options.demo) {
  render({
    playing: { title: '夜に駆ける', artist: 'YOASOBI', requestedBy: '小明', paid: true },
    upNext: [
      { title: '小幸運', artist: '田馥甄', requestedBy: 'A' },
      { title: 'Lemon', artist: '米津玄師', requestedBy: 'B', paid: true },
      { title: '告白氣球', artist: '周杰倫', requestedBy: 'C' },
    ],
  })
}
else if (!options.token) {
  renderMessage('網址缺少 token，請到點歌台後台重新複製 OBS 網址')
}
else {
  render({ playing: null, upNext: [] })
}
