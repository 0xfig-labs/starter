<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const appConfig = useAppConfig()

useColorMode({
  attribute: 'class',
  storageKey: 'shadcn-color-scheme'
})

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'en' }
})

useSeoMeta({
  description: appConfig.site.description,
  ogDescription: appConfig.site.description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="min-h-svh flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
