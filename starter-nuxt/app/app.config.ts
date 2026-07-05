export default defineAppConfig({
  // site.* is consumed by UI components via useAppConfig().
  // nuxt.config.ts site.* is consumed by @nuxtjs/seo (sitemap/robots).
  // Keep both in sync when changing name/url/description.
  site: {
    name: 'Indie Starter',
    description: 'Nuxt 4 starter for indie products on Cloudflare Pages.',
    url: 'https://example.pages.dev',
    github: 'https://github.com/your-name/your-product'
  }
})
