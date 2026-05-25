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
const { init } = useTheme()
const cart = useCartStore()

onMounted(() => {
  init()
  cart.hydrate()
})
</script>
