<script setup lang="ts">
import { Languages } from '@lucide/vue'

const { locale, locales, setLocale } = useI18n()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" aria-label="Switch language">
        <Languages class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="loc in locales"
        :key="loc.code"
        :disabled="loc.code === locale"
        @click="setLocale(loc.code)"
      >
        {{ loc.name }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
