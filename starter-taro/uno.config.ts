import { defineConfig, presetUno, presetAttributify } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno(),
    presetRemToPx(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      // 按需指定 icon 集合，避免全量安装 @iconify/json
      collections: {
        mingcute: () => import('@iconify-json/mingcute/icons.json').then((i) => i.default),
        logos: () => import('@iconify-json/logos/icons.json').then((i) => i.default),
        'svg-spinners': () =>
          import('@iconify-json/svg-spinners/icons.json').then((i) => i.default),
      },
    }),
  ],
  // 自定义规则
  rules: [
    // 项目约定：text-28 表示 28px/rpx 设计稿字号，而不是 Uno 默认的 spacing scale。
    [/^text-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })],

    // 小程序安全区域
    ['safe-area-bottom', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
    ['safe-area-top', { 'padding-top': 'env(safe-area-inset-top)' }],

    // WXSS 不支持带 / . : 的 CSS 选择器，以下为替代方案
    [/^bw-(\d+)$/, ([, d]) => ({ 'background-color': `rgba(255,255,255,${+d / 100})` })],
    [/^tw-(\d+)$/, ([, d]) => ({ color: `rgba(255,255,255,${+d / 100})` })],
    ['top-35-pct', { top: '35%' }],
  ],
  // 快捷方式
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'text-ellipsis': 'overflow-hidden text-ellipsis whitespace-nowrap',
  },
  // 不生成 preflight（小程序不适用）
  preflights: [],
  // WXSS 不支持 CSS 转义序列（`\`），去掉选择器中的反斜杠
  postprocess: [
    (util) => {
      if (util.selector) {
        util.selector = util.selector.replace(/\\/g, '')
      }
    },
  ],
})
