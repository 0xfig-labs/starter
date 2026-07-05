<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const appConfig = useAppConfig()
const { locale } = useI18n()

useColorMode({
  attribute: 'class',
  storageKey: 'shadcn-color-scheme'
})

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: locale }
})

useSeoMeta({
  description: appConfig.site.description,
  ogDescription: appConfig.site.description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="min-h-svh flex flex-col">
    <NuxtLoadingIndicator />
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

