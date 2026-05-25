<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-10 animate-slide-up">
      <p class="text-electric-400 text-xs font-display font-600 tracking-wider uppercase mb-2">Your</p>
      <h1 class="section-title">Shopping Cart
        <span v-if="cartCount > 0" class="ml-3 align-middle badge text-base !text-sm">{{ cartCount }}</span>
      </h1>
    </div>

    <!-- Empty -->
    <div v-if="isEmpty" class="text-center py-28 animate-fade-in">
      <div class="w-24 h-24 rounded-3xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center mx-auto mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-electric-400" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </div>
      <h2 class="font-display font-700 text-2xl text-[var(--text-primary)] mb-3">Your cart is empty</h2>
      <p class="text-[var(--text-secondary)] mb-8 max-w-xs mx-auto">Discover amazing products and add them to your cart.</p>
      <NuxtLink to="/products" class="btn-primary !px-10 !py-4">Start Shopping</NuxtLink>
    </div>

    <!-- Cart layout -->
    <div v-else class="grid lg:grid-cols-3 gap-8 animate-fade-in">
      <!-- Items -->
      <div class="lg:col-span-2 space-y-4">
        <TransitionGroup name="cart-item">
          <div
            v-for="item in items" :key="item.id"
            class="card !rounded-2xl p-4 flex items-center gap-4"
          >
            <!-- Image -->
            <NuxtLink :to="`/products/${item.id}`" class="flex-shrink-0 w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center p-2 hover:ring-2 ring-electric-500/40 transition-all">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-contain" />
            </NuxtLink>

            <!-- Details -->
            <div class="flex-1 min-w-0">
              <NuxtLink :to="`/products/${item.id}`">
                <p class="font-display font-600 text-sm text-[var(--text-primary)] line-clamp-2 leading-snug hover:text-electric-400 transition-colors">{{ item.title }}</p>
              </NuxtLink>
              <p class="text-[var(--text-secondary)] text-xs mt-1 capitalize">{{ item.category }}</p>
              <p class="font-display font-700 text-electric-400 mt-1">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>

            <!-- Qty controls -->
            <div class="flex flex-col items-end gap-3">
              <button @click="cartStore.removeFromCart(item.id)" class="text-[var(--text-secondary)] hover:text-red-400 transition-colors p-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              </button>
              <div class="flex items-center border border-[var(--border)] rounded-lg overflow-hidden">
                <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-electric-400 hover:bg-electric-500/10 transition-colors text-sm font-700">−</button>
                <span class="w-8 text-center font-display font-700 text-sm text-[var(--text-primary)]">{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-electric-400 hover:bg-electric-500/10 transition-colors text-sm font-700">+</button>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Clear cart -->
        <div class="text-right">
          <button @click="cartStore.clearCart()" class="text-sm text-[var(--text-secondary)] hover:text-red-400 transition-colors flex items-center gap-1.5 ml-auto">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            Clear cart
          </button>
        </div>
      </div>

      <!-- Summary -->
      <div class="lg:col-span-1">
        <div class="card !rounded-2xl p-6 sticky top-24">
          <h2 class="font-display font-700 text-lg text-[var(--text-primary)] mb-6">Order Summary</h2>
          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-sm">
              <span class="text-[var(--text-secondary)]">Subtotal ({{ cartCount }} items)</span>
              <span class="font-display font-600 text-[var(--text-primary)]">${{ cartTotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-[var(--text-secondary)]">Shipping</span>
              <span class="text-electric-400 font-display font-600">Free</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-[var(--text-secondary)]">Tax (8%)</span>
              <span class="font-display font-600 text-[var(--text-primary)]">${{ (cartTotal * 0.08).toFixed(2) }}</span>
            </div>
          </div>

          <div class="border-t border-[var(--border)] pt-4 mb-6">
            <div class="flex justify-between">
              <span class="font-display font-700 text-[var(--text-primary)]">Total</span>
              <span class="font-display font-800 text-2xl text-electric-400">${{ (cartTotal * 1.08).toFixed(2) }}</span>
            </div>
          </div>

          <!-- Coupon -->
          <div class="flex gap-2 mb-6">
            <input v-model="coupon" class="input-field !py-2.5 text-sm" placeholder="Coupon code" />
            <button class="btn-ghost !py-2.5 !px-4 text-sm flex-shrink-0">Apply</button>
          </div>

          <button @click="checkout" class="btn-primary w-full justify-center !py-4 text-base">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            Proceed to Checkout
          </button>

          <NuxtLink to="/products" class="btn-ghost w-full justify-center mt-3">Continue Shopping</NuxtLink>

          <!-- Trust badges -->
          <div class="mt-6 pt-5 border-t border-[var(--border)] flex items-center justify-center gap-4">
            <span class="text-[var(--text-secondary)] text-xs flex items-center gap-1">🔒 SSL Secured</span>
            <span class="text-[var(--text-secondary)] text-xs flex items-center gap-1">✓ Trusted</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Cart — NovaMart' })

const cartStore = useCartStore()
const toastStore = useToastStore()
const coupon = ref('')

const items = computed(() => cartStore.items)
const isEmpty = computed(() => cartStore.isEmpty)
const cartCount = computed(() => cartStore.cartCount)
const cartTotal = computed(() => cartStore.cartTotal)

function checkout() {
  toastStore.show('Checkout coming soon! This is a demo store.', 'info')
}
</script>

<style scoped>
.cart-item-enter-active { animation: slideInRight 0.3s ease-out; }
.cart-item-leave-active { animation: slideInRight 0.25s ease-in reverse; position: absolute; width: 100%; }
.cart-item-move { transition: transform 0.3s ease; }
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
}
</style>
