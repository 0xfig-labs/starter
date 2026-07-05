<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

useHead({
  script: [
    {
      innerHTML: `(function(){var t=localStorage.getItem('shadcn-color-scheme');if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('dark')})()`,
      type: 'text/javascript',
      tagPosition: 'head'
    }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>

