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
    <div>
      <h1 class="text-2xl font-bold tracking-tight">
        Dashboard
      </h1>
      <p class="text-muted-foreground">
        A product app layout for authenticated areas. Add auth before putting private user data here.
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium">
            Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-3xl font-semibold">
            $0
          </p>
          <p class="text-xs text-muted-foreground mt-1">
            Wire this to your billing provider.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium">
            Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-3xl font-semibold">
            0
          </p>
          <p class="text-xs text-muted-foreground mt-1">
            Add auth when accounts are real.
          </p>
        </CardContent>
      </Card>

      <Card class="sm:col-span-2 xl:col-span-1">
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium">
            API
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            size="sm"
            as-child
          >
            <!-- eslint-disable-next-line link-checker/valid-route, link-checker/valid-sitemap-link -->
            <NuxtLink to="/api/health">Check health</NuxtLink>
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
