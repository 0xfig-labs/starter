<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue'

const { t } = useI18n()

const { error } = defineProps<{
  error: { statusCode?: number; message?: string }
}>()

useSeoMeta({
  title: t('error.title', { code: error.statusCode ?? '' })
})
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-4 p-8">
    <h1 class="text-4xl font-bold">
      {{ error.statusCode ?? '—' }}
    </h1>
    <p class="text-muted-foreground">
      {{ error.statusCode === 404 ? t('error.notFound') : (error.message ?? t('error.unknown')) }}
    </p>
    <Button as-child>
      <NuxtLinkLocale to="/">
        <ArrowLeft class="size-4" />
        {{ t('error.goHome') }}
      </NuxtLinkLocale>
    </Button>
  </div>
</template>

