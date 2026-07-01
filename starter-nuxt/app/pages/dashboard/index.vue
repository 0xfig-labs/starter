<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

useSeoMeta({
  title: 'Dashboard'
})
</script>

<template>
  <div class="space-y-6">
    <UPageHeader
      title="Dashboard"
      description="A product app layout for authenticated areas. Add auth before putting private user data here."
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <UCard>
        <template #header>
          Revenue
        </template>
        <p class="text-3xl font-semibold">
          $0
        </p>
        <p class="text-sm text-muted">
          Wire this to your billing provider.
        </p>
      </UCard>

      <UCard>
        <template #header>
          Users
        </template>
        <p class="text-3xl font-semibold">
          0
        </p>
        <p class="text-sm text-muted">
          Add auth when accounts are real.
        </p>
      </UCard>

      <UCard class="sm:col-span-2 xl:col-span-1">
        <template #header>
          API
        </template>
        <UButton
          to="/api/health"
          label="Check health"
          color="neutral"
          variant="subtle"
        />
      </UCard>
    </div>
  </div>
</template>
