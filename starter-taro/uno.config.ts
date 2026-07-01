import { defineConfig, presetUno, presetAttributify } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno(),
    presetRemToPx(),
    presetAttributify(),
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
    // 小程序安全区域
    ['safe-area-bottom', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
    ['safe-area-top', { 'padding-top': 'env(safe-area-inset-top)' }],
  ],
  // 快捷方式
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'text-ellipsis': 'overflow-hidden text-ellipsis whitespace-nowrap',
  },
  // 不生成 preflight（小程序不适用）
  preflights: [],
})
