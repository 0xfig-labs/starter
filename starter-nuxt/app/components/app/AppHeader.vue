<script setup lang="ts">
const appConfig = useAppConfig()

const links = [
  { label: 'Features', to: '/#features', icon: 'i-lucide-sparkles' },
  { label: 'Pricing', to: '/pricing', icon: 'i-lucide-credit-card' },
  { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-layout-dashboard' }
]
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink
        to="/"
        class="flex min-w-0 items-center gap-2"
        aria-label="Home"
      >
        <AppLogo class="h-6 w-auto shrink-0" />
        <span class="truncate font-semibold">{{ appConfig.site.name }}</span>
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="links"
      variant="link"
      class="hidden md:flex"
    />

    <template #right>
      <UColorModeButton />
      <UButton
        :to="appConfig.site.github"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
        class="hidden sm:inline-flex"
      />
      <UDropdownMenu
        :items="links"
        :content="{ align: 'end' }"
      >
        <UButton
          icon="i-lucide-menu"
          aria-label="Open menu"
          color="neutral"
          variant="ghost"
          class="md:hidden"
        />
      </UDropdownMenu>
    </template>
  </UHeader>
</template>
