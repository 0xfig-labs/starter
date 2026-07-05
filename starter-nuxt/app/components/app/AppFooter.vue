<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <footer class="border-t">
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <p class="text-sm text-muted-foreground">
        &copy; {{ new Date().getFullYear() }} {{ appConfig.site.name }}
      </p>
      <Button
        variant="ghost"
        size="sm"
        as-child
      >
        <!-- eslint-disable-next-line link-checker/valid-route, link-checker/valid-sitemap-link -->
        <NuxtLink to="/api/health">Status</NuxtLink>
      </Button>
    </div>
  </footer>
</template>
