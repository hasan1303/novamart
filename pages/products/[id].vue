<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Back -->
    <NuxtLink to="/products" class="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-electric-400 transition-colors mb-10 group">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      Back to Products
    </NuxtLink>

    <!-- Skeleton -->
    <div v-if="loading" class="grid md:grid-cols-2 gap-12">
      <div class="aspect-square skeleton rounded-2xl bg-white/5"></div>
      <div class="space-y-4 pt-4">
        <div class="skeleton h-4 w-24 rounded bg-white/5"></div>
        <div class="skeleton h-8 w-full rounded bg-white/5"></div>
        <div class="skeleton h-8 w-3/4 rounded bg-white/5"></div>
        <div class="skeleton h-6 w-20 rounded bg-white/5"></div>
        <div class="space-y-2 pt-4">
          <div class="skeleton h-3 w-full rounded bg-white/5"></div>
          <div class="skeleton h-3 w-full rounded bg-white/5"></div>
          <div class="skeleton h-3 w-2/3 rounded bg-white/5"></div>
        </div>
        <div class="skeleton h-14 w-full rounded-xl bg-white/5 mt-6"></div>
      </div>
    </div>

    <!-- Product detail -->
    <div v-else-if="product" class="grid md:grid-cols-2 gap-12 lg:gap-20 items-start animate-fade-in">
      <!-- Image -->
      <div class="sticky top-24">
        <div class="card !rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-10 bg-white/5 relative group">
          <div class="absolute inset-0 bg-gradient-to-br from-electric-500/5 to-transparent"></div>
          <img :src="product.image" :alt="product.title" class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 relative z-10" />
          <div class="absolute top-4 left-4">
            <span class="badge">{{ formatCat(product.category) }}</span>
          </div>
        </div>
      </div>

      <!-- Info -->
      <div class="pt-2">
        <p class="text-electric-400 text-xs font-display font-600 tracking-wider uppercase mb-3">{{ formatCat(product.category) }}</p>
        <h1 class="font-display font-800 text-2xl sm:text-3xl text-[var(--text-primary)] leading-tight mb-4">{{ product.title }}</h1>

        <!-- Rating -->
        <div class="flex items-center gap-3 mb-6">
          <StarRating :rating="product.rating.rate" />
          <span class="font-display font-600 text-sm text-[var(--text-primary)]">{{ product.rating.rate.toFixed(1) }}</span>
          <span class="text-[var(--text-secondary)] text-sm">· {{ product.rating.count }} reviews</span>
        </div>

        <!-- Price -->
        <div class="flex items-end gap-3 mb-8 p-5 rounded-2xl border border-electric-500/20 bg-electric-500/5">
          <span class="font-display font-800 text-4xl text-electric-400">${{ product.price.toFixed(2) }}</span>
          <span class="text-[var(--text-secondary)] text-sm mb-1 line-through">${{ (product.price * 1.2).toFixed(2) }}</span>
          <span class="badge ml-auto">Save 20%</span>
        </div>

        <!-- Description -->
        <div class="mb-8">
          <h3 class="font-display font-700 text-sm text-[var(--text-primary)] mb-3">Description</h3>
          <p class="text-[var(--text-secondary)] leading-relaxed text-sm">{{ product.description }}</p>
        </div>

        <!-- Quantity + Add to cart -->
        <div class="flex items-center gap-3 mb-4">
          <div class="flex items-center border border-[var(--border)] rounded-xl overflow-hidden">
            <button @click="qty = Math.max(1, qty - 1)" class="w-11 h-11 flex items-center justify-center text-[var(--text-secondary)] hover:text-electric-400 hover:bg-electric-500/10 transition-colors font-display font-700 text-lg">−</button>
            <span class="w-10 text-center font-display font-700 text-[var(--text-primary)]">{{ qty }}</span>
            <button @click="qty++" class="w-11 h-11 flex items-center justify-center text-[var(--text-secondary)] hover:text-electric-400 hover:bg-electric-500/10 transition-colors font-display font-700 text-lg">+</button>
          </div>
          <button @click="addToCart" class="btn-primary flex-1 !py-3.5 text-base justify-center" :disabled="adding">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {{ adding ? '✓ Added to Cart!' : 'Add to Cart' }}
          </button>
        </div>
        <NuxtLink to="/cart" class="btn-ghost w-full justify-center !py-3.5">View Cart</NuxtLink>

        <!-- Trust badges -->
        <div class="flex gap-4 mt-8 pt-6 border-t border-[var(--border)]">
          <div v-for="b in badges" :key="b.label" class="flex items-center gap-2 text-[var(--text-secondary)] text-xs">
            <span>{{ b.icon }}</span>{{ b.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="text-center py-24">
      <p class="text-6xl mb-4">😕</p>
      <h2 class="font-display font-700 text-2xl text-[var(--text-primary)] mb-3">Product not found</h2>
      <NuxtLink to="/products" class="btn-primary mt-4">Back to Shop</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { fetchProduct } = useProducts()
const cartStore = useCartStore()
const toastStore = useToastStore()

const product = ref<any>(null)
const loading = ref(true)
const qty = ref(1)
const adding = ref(false)

const formatCat = (cat: string) => cat.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const badges = [
  { icon: '🔒', label: 'Secure checkout' },
  { icon: '🚀', label: 'Fast shipping' },
  { icon: '↩️', label: '30-day returns' },
]

async function addToCart() {
  if (!product.value) return
  adding.value = true
  for (let i = 0; i < qty.value; i++) {
    cartStore.addToCart({
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image: product.value.image,
      category: product.value.category,
    })
  }
  const shortTitle = product.value.title.length > 30
    ? product.value.title.slice(0, 30) + '…'
    : product.value.title
  toastStore.show(`${qty.value}× "${shortTitle}" added!`)
  await new Promise(r => setTimeout(r, 1200))
  adding.value = false
}

onMounted(async () => {
  try {
    product.value = await fetchProduct(route.params.id as string)
    if (product.value?.title) {
      useHead({ title: `${product.value.title} — NovaMart` })
    }
  } catch {
    // Product not found, will show 404 state
  }
  loading.value = false
})
</script>
