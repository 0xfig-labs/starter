<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

useSeoMeta({
  title: 'Dashboard'
})

const { data, status } = useAsyncData('health', () =>
  $fetch('/api/health')
)
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
      <Card v-if="status === 'success'">
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium">
            Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-3xl font-semibold">
            {{ data?.service ?? '—' }}
          </p>
          <div class="mt-1 flex items-center gap-2">
            <span class="size-2 rounded-full bg-green-500" />
            <span class="text-xs text-muted-foreground">API online</span>
          </div>
        </CardContent>
      </Card>
      <Card v-else-if="status === 'error'">
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium">
            Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-destructive">Failed to load</p>
        </CardContent>
      </Card>
      <Card v-else>
        <CardHeader class="pb-2">
          <Skeleton class="h-4 w-16" />
        </CardHeader>
        <CardContent>
          <Skeleton class="h-8 w-24" />
          <Skeleton class="mt-2 h-3 w-20" />
        </CardContent>
      </Card>

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
    </div>
  </div>
</template>
