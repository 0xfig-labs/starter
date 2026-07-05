import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    'shadcn-nuxt',
    '@nuxt/hints',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@pinia/nuxt',
    '@nuxt/test-utils/module'
  ],
  hints: {
    // lazyLoad is noisy during dev and this starter has few components to optimize
    features: {
      lazyLoad: false
    }
  },

  devtools: {
  },

  css: ['~/assets/css/tailwind.css'],
  // site.* is consumed by @nuxtjs/seo (sitemap/robots).
  // app/app.config.ts site.* is consumed by UI components.
  // Keep both in sync when changing name/url.
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
    ],
    optimizeDeps: {
      include: [
        '@lucide/vue',
        '@unhead/schema-org/vue',
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
        'vue-sonner'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  linkChecker: {
    // API routes are handled by Nitro, not Nuxt pages — exclude from link validation
    exclude: ['/api/**']
  },

  i18n: {
    baseUrl: 'https://example.pages.dev',
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
