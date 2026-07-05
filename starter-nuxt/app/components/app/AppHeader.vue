<script setup lang="ts">
import { Moon, Menu, Sun, Sparkles, CreditCard, LayoutDashboard } from '@lucide/vue'
import { useColorMode } from '@vueuse/core'

const appConfig = useAppConfig()

const color = useColorMode({
  attribute: 'class',
  storageKey: 'shadcn-color-scheme'
})

const { t } = useI18n()
const localePath = useLocalePath()

const links = computed(() => [
  { label: t('nav.features'), to: localePath('/') + '#features', icon: Sparkles },
  { label: t('nav.pricing'), to: localePath('/pricing'), icon: CreditCard },
  { label: t('nav.dashboard'), to: localePath('/dashboard'), icon: LayoutDashboard }
])
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
    <div class="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
      <NuxtLinkLocale
        to="/"
        class="flex min-w-0 items-center gap-2 font-semibold"
        aria-label="Home"
      >
        <AppLogo class="h-6 w-auto shrink-0" />
        <span class="truncate">{{ appConfig.site.name }}</span>
      </NuxtLinkLocale>

      <!-- Desktop nav -->
      <NavigationMenu class="hidden md:flex mx-4">
        <NavigationMenuList>
          <NavigationMenuItem
            v-for="link in links"
            :key="link.to"
          >
            <NavigationMenuLink as-child>
              <NuxtLink :to="link.to">
                <component
                  :is="link.icon"
                  class="size-4"
                />
                {{ link.label }}
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <!-- Right side actions -->
      <div class="flex flex-1 items-center justify-end gap-1">
        <Button
          variant="ghost"
          size="icon"
          as-child
          class="hidden sm:inline-flex"
        >
          <a
            :href="appConfig.site.github"
            target="_blank"
            aria-label="GitHub"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-4"
            ><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
          </a>
        </Button>

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

        <AppLocaleToggle />

        <!-- Mobile dropdown -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="md:hidden"
            >
              <Menu class="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              v-for="link in links"
              :key="link.to"
              as-child
            >
              <NuxtLink :to="link.to">
                <component
                  :is="link.icon"
                  class="size-4"
                />
                {{ link.label }}
              </NuxtLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
