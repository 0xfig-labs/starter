<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        © {{ new Date().getFullYear() }} {{ appConfig.site.name }}
      </p>
    </template>

    <template #right>
      <UButton
        to="/api/health"
        label="Status"
        color="neutral"
        variant="ghost"
        size="sm"
      />
    </template>
  </UFooter>
</template>
