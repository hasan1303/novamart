<template>
  <div class="min-h-screen">
    <AppNavbar />
    <main>
      <NuxtPage />
    </main>
    <AppFooter />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: 'favicon.svg' }],
})

const { init } = useTheme()
const cart = useCartStore()

onMounted(() => {
  init()
  cart.hydrate()
})
</script>
