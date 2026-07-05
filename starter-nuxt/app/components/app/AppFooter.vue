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
        <a href="/api/health">Status</a>
      </Button>
    </div>
  </footer>
</template>
