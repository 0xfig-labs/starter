<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
    <div class="mx-auto max-w-2xl text-center">
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
        {{ $t('home.hero.title') }}
      </h1>
      <p class="mt-6 text-lg text-muted-foreground">
        {{ $t('home.hero.subtitle') }}
      </p>
      <div class="mt-10 flex items-center justify-center gap-4">
        <Button
          size="lg"
          as-child
        >
          <NuxtLinkLocale to="/dashboard">
            {{ $t('home.hero.start') }}
            <ArrowRight class="size-4" />
          </NuxtLinkLocale>
        </Button>
        <Button
          size="lg"
          variant="outline"
          as-child
        >
          <NuxtLinkLocale to="/pricing">{{ $t('home.hero.pricing') }}</NuxtLinkLocale>
        </Button>
      </div>
    </div>
  </section>
</template>
