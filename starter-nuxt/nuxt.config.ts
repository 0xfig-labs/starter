import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    'shadcn-nuxt',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@pinia/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/tailwind.css'],

  site: {
    name: 'Indie Starter',
    url: 'https://example.pages.dev'
  },

  routeRules: {
    '/': { prerender: true },
    '/api/**': { prerender: false }
  },

  devServer: {
    port: 27167
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'cloudflare_pages'
  },

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' }
    ]
  },

  ogImage: {
    enabled: false
  },

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  }
})
