<template>
  <footer class="mt-24 border-t border-[var(--border)]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-electric-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d1635" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <span class="font-display font-800 text-lg">Nova<span class="text-gradient">Mart</span></span>
          </div>
          <p class="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs">
            Premium products curated for the modern lifestyle. Shop with confidence, delivered with care.
          </p>
        </div>
        <div>
          <h4 class="font-display font-700 text-sm mb-4 text-[var(--text-primary)]">Shop</h4>
          <ul class="space-y-2">
            <li v-for="link in shopLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-[var(--text-secondary)] hover:text-electric-400 transition-colors">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-display font-700 text-sm mb-4 text-[var(--text-primary)]">Support</h4>
          <ul class="space-y-2">
            <li v-for="item in supportLinks" :key="item">
              <span class="text-sm text-[var(--text-secondary)] cursor-default">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-3">
        <p class="text-xs text-[var(--text-secondary)]">© 2025 NovaMart. Built with Nuxt 3 + FakeStore API.</p>
        <p class="text-xs text-[var(--text-secondary)]">Demo project — no real transactions.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const shopLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'All Products' },
  { to: '/cart', label: 'Cart' },
]
const supportLinks = ['FAQ', 'Shipping Info', 'Returns', 'Contact']
</script>
