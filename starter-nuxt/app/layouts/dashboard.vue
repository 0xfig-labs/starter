<script setup lang="ts">
import { ArrowLeft, LayoutDashboard, Moon, Settings, Sun, Users } from '@lucide/vue'
import { useColorMode } from '@vueuse/core'

const appConfig = useAppConfig()

const color = useColorMode({
  attribute: 'class',
  storageKey: 'shadcn-color-scheme'
})

const localePath = useLocalePath()
const route = useRoute()

useSeoMeta({
  titleTemplate: `%s · ${appConfig.site.name}`
})

const navItems = computed(() => [
  { label: 'Overview', icon: LayoutDashboard, to: localePath('/dashboard') },
  { label: 'Customers', icon: Users, to: localePath('/dashboard/customers') },
  { label: 'Settings', icon: Settings, to: localePath('/dashboard/settings') }
])
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>
        <NuxtLinkLocale
          to="/"
          class="flex min-w-0 items-center gap-2 px-2 font-semibold"
          aria-label="Home"
        >
          <AppLogo class="h-6 w-auto shrink-0" />
          <span class="truncate">{{ appConfig.site.name }}</span>
        </NuxtLinkLocale>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem
                v-for="item in navItems"
                :key="item.to"
              >
                <SidebarMenuButton
                  as-child
                  :is-active="route.path === item.to || undefined"
                >
                  <NuxtLink :to="item.to">
                    <component
                      :is="item.icon"
                      class="size-4"
                    />
                    <span>{{ item.label }}</span>
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <NuxtLinkLocale to="/">
                <ArrowLeft class="size-4" />
                <span>{{ $t('nav.backToSite') }}</span>
              </NuxtLinkLocale>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>

      <NuxtLoadingIndicator />
    <SidebarInset>
      <header class="flex h-12 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator
          orientation="vertical"
          class="mr-2 h-4"
        />
        <div class="flex flex-1 items-center gap-2" />
        <Button
          variant="ghost"
          size="icon"
          @click="color = color === 'dark' ? 'light' : 'dark'"
        >
          <Sun
            v-if="color === 'light'"
            class="size-4"
          />
          <Moon
            v-else
            class="size-4"
          />
        </Button>
      </header>

      <div class="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
