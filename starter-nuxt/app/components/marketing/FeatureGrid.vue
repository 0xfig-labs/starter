<script setup lang="ts">
import { Cloud, LayoutDashboard, SearchCheck, Plug } from '@lucide/vue'

const { t } = useI18n()

const features = computed(() => [
  { icon: Cloud, title: t('home.features.items.0.title'), description: t('home.features.items.0.description') },
  { icon: LayoutDashboard, title: t('home.features.items.1.title'), description: t('home.features.items.1.description') },
  { icon: SearchCheck, title: t('home.features.items.2.title'), description: t('home.features.items.2.description') },
  { icon: Plug, title: t('home.features.items.3.title'), description: t('home.features.items.3.description') }
])
</script>

<template>
  <section
    id="features"
    class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
  >
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        {{ $t('home.features.heading') }}
      </h2>
      <p class="mt-4 text-muted-foreground">
        {{ $t('home.features.subtitle') }}
      </p>
    </div>
    <div class="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
      <Card
        v-for="f in features"
        :key="f.title"
      >
        <CardHeader>
          <div class="flex items-center gap-3">
            <div class="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <component
                :is="f.icon"
                class="size-5 text-primary"
              />
            </div>
            <CardTitle class="text-base">
              {{ f.title }}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            {{ f.description }}
          </p>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
