<template>
  <UPageSection
    id="features"
    title="Built for small products"
    description="Keep the starter useful without locking every project into auth, database, or payments on day one."
    :features="[
      { icon: 'i-lucide-cloud', title: 'Cloudflare Pages SSR', description: 'Nuxt Nitro targets Cloudflare Pages and outputs a deployable dist directory.' },
      { icon: 'i-lucide-layout-dashboard', title: 'Product shell', description: 'Landing, pricing, dashboard, and API examples without CMS or blog assumptions.' },
      { icon: 'i-lucide-search-check', title: 'SEO-ready', description: 'Sitemap, robots, schema, and script management are already wired.' },
      { icon: 'i-lucide-plug', title: 'Easy to extend', description: 'Add auth, D1, KV, R2, Turnstile, or payments only when the product needs them.' }
    ]"
  />
</template>
