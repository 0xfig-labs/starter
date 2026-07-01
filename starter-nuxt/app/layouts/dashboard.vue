<script setup lang="ts">
const appConfig = useAppConfig()

const links = [
  { label: 'Overview', icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
  { label: 'Customers', icon: 'i-lucide-users', to: '/dashboard/customers' },
  { label: 'Settings', icon: 'i-lucide-settings', to: '/dashboard/settings' }
]

useSeoMeta({
  titleTemplate: `%s · ${appConfig.site.name}`
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      collapsible
      resizable
    >
      <template #header>
        <NuxtLink
          to="/"
          class="flex min-w-0 items-center gap-2 font-semibold"
          aria-label="Home"
        >
          <AppLogo class="h-6 w-auto shrink-0" />
          <span class="truncate">{{ appConfig.site.name }}</span>
        </NuxtLink>
      </template>

      <UNavigationMenu
        :items="links"
        orientation="vertical"
      />

      <template #footer>
        <UButton
          to="/"
          label="Back to site"
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="ghost"
          block
        />
      </template>
    </UDashboardSidebar>

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar title="Dashboard">
          <template #leading>
            <UDashboardSidebarToggle />
          </template>

          <template #right>
            <UColorModeButton />
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <div class="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          <slot />
        </div>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
