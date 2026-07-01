<script setup lang="ts">
const appConfig = useAppConfig()

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'en' }
})

useSeoMeta({
  title: appConfig.site.name,
  description: appConfig.site.description,
  ogTitle: appConfig.site.name,
  ogDescription: appConfig.site.description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <AppHeader />

    <UMain class="flex-1">
      <slot />
    </UMain>

    <AppFooter />
  </div>
</template>
