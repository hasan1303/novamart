<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="scrolled ? 'glass shadow-xl shadow-black/20' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-[72px]">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg bg-electric-500 flex items-center justify-center shadow-lg shadow-electric-500/40 group-hover:shadow-electric-400/60 transition-shadow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d1635" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <span class="font-display font-800 text-lg text-[var(--text-primary)]">Nova<span class="text-gradient">Mart</span></span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/products" class="nav-link">Products</NuxtLink>
          <NuxtLink to="/cart" class="nav-link">Cart</NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <!-- Theme Toggle -->
          <button @click="toggle" class="btn-ghost !px-3 !py-2" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            <Transition name="spin" mode="out-in">
              <svg v-if="isDark" key="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              <svg v-else key="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </Transition>
          </button>

          <!-- Cart -->
          <NuxtLink to="/cart" class="btn-ghost !px-3 !py-2 relative">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <Transition name="bounce">
              <span
                v-if="cartCount > 0"
                key="badge"
                class="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-electric-500 text-navy-950 text-[10px] font-display font-800 flex items-center justify-center px-1 shadow-lg shadow-electric-500/50"
              >{{ cartCount }}</span>
            </Transition>
          </NuxtLink>

          <!-- Mobile menu -->
          <button @click="mobileOpen = !mobileOpen" class="md:hidden btn-ghost !px-2.5 !py-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line v-if="!mobileOpen" x1="3" y1="6" x2="21" y2="6"/><line v-if="!mobileOpen" x1="3" y1="12" x2="21" y2="12"/><line v-if="!mobileOpen" x1="3" y1="18" x2="21" y2="18"/>
              <line v-if="mobileOpen" x1="18" y1="6" x2="6" y2="18"/><line v-if="mobileOpen" x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Nav -->
      <Transition name="slide-down">
        <nav v-if="mobileOpen" class="md:hidden pb-4 flex flex-col gap-1">
          <NuxtLink to="/" @click="mobileOpen = false" class="nav-link py-3 border-t border-[var(--border)]">Home</NuxtLink>
          <NuxtLink to="/products" @click="mobileOpen = false" class="nav-link py-3 border-t border-[var(--border)]">Products</NuxtLink>
          <NuxtLink to="/cart" @click="mobileOpen = false" class="nav-link py-3 border-t border-[var(--border)]">Cart ({{ cartCount }})</NuxtLink>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme()
const cartStore = useCartStore()
const cartCount = computed(() => cartStore.cartCount)
const scrolled = ref(false)
const mobileOpen = ref(false)

const onScroll = () => { scrolled.value = window.scrollY > 20 }

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.spin-enter-active, .spin-leave-active { transition: all 0.2s; }
.spin-enter-from { transform: rotate(-90deg); opacity: 0; }
.spin-leave-to  { transform: rotate(90deg); opacity: 0; }

.bounce-enter-active { animation: bounceIn 0.3s; }
.bounce-leave-active { animation: bounceIn 0.2s reverse; }
@keyframes bounceIn {
  0%   { transform: scale(0); opacity: 0; }
  60%  { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; overflow: hidden; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
