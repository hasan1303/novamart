<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-[80vh] flex items-center overflow-hidden">
      <div class="absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px); background-size: 60px 60px;"></div>
      <div class="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-electric-500/10 blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-blue-500/8 blur-[100px] pointer-events-none"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div class="max-w-3xl animate-slide-up">
          <div class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-electric-500/30 bg-electric-500/10">
            <span class="w-2 h-2 rounded-full bg-electric-500 animate-pulse-soft"></span>
            <span class="text-electric-400 text-xs font-display font-600 tracking-wider uppercase">New arrivals every week</span>
          </div>
          <h1 class="font-display font-800 text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-[var(--text-primary)] mb-6">
            Shop the<br/><span class="text-gradient">Future</span> of<br/>Retail.
          </h1>
          <p class="text-[var(--text-secondary)] text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Curated collections across fashion, electronics, and lifestyle — all in one place.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/products" class="btn-primary text-base !px-8 !py-4">
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </NuxtLink>
            <NuxtLink to="/products" class="btn-ghost text-base !px-8 !py-4">Browse Categories</NuxtLink>
          </div>
        </div>
        <div class="mt-16 flex flex-wrap gap-10">
          <div v-for="stat in stats" :key="stat.label" class="animate-fade-in">
            <p class="font-display font-800 text-3xl text-electric-400">{{ stat.value }}</p>
            <p class="text-[var(--text-secondary)] text-sm mt-0.5">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-end justify-between mb-10">
        <div>
          <p class="text-electric-400 text-xs font-display font-600 tracking-wider uppercase mb-2">Browse by</p>
          <h2 class="section-title">Categories</h2>
        </div>
        <NuxtLink to="/products" class="btn-ghost hidden sm:inline-flex">View All</NuxtLink>
      </div>
      <div v-if="loadingCats" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="i in 4" :key="i" class="skeleton h-36 rounded-2xl bg-white/5"></div>
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NuxtLink
          v-for="cat in categories" :key="cat"
          :to="`/products?category=${encodeURIComponent(cat)}`"
          class="relative group overflow-hidden rounded-2xl border border-[var(--border)] p-6 flex flex-col items-start justify-end min-h-[140px] transition-all duration-300 hover:border-electric-500/40 hover:shadow-lg hover:shadow-electric-500/10 hover:-translate-y-1"
          :style="{ background: catColors[cat] || 'var(--bg-card)' }"
        >
          <div class="absolute top-4 right-4 text-3xl">{{ catIcons[cat] || '🛍️' }}</div>
          <div class="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent"></div>
          <span class="relative font-display font-700 text-sm text-white capitalize">{{ cat }}</span>
          <span class="relative text-white/60 text-xs mt-0.5 group-hover:text-electric-300 transition-colors">Shop →</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-end justify-between mb-10">
        <div>
          <p class="text-electric-400 text-xs font-display font-600 tracking-wider uppercase mb-2">Hand-picked for you</p>
          <h2 class="section-title">Featured Products</h2>
        </div>
        <NuxtLink to="/products" class="btn-ghost hidden sm:inline-flex">See All</NuxtLink>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <template v-if="loadingProducts">
          <ProductSkeleton v-for="i in 8" :key="i" />
        </template>
        <template v-else>
          <ProductCard
            v-for="(product, i) in featured" :key="product.id" :product="product"
            class="animate-slide-up" :style="{ animationDelay: `${i * 60}ms` }"
          />
        </template>
      </div>
      <div class="text-center mt-14">
        <NuxtLink to="/products" class="btn-primary !px-10 !py-4 text-base">
          View All Products
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </NuxtLink>
      </div>
    </section>

    <!-- Value Props -->
    <section class="py-16 border-t border-[var(--border)]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="vp in valueProps" :key="vp.title" class="flex flex-col items-center text-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center text-xl">{{ vp.icon }}</div>
            <h4 class="font-display font-700 text-sm text-[var(--text-primary)]">{{ vp.title }}</h4>
            <p class="text-xs text-[var(--text-secondary)] leading-relaxed">{{ vp.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'NovaMart — Premium Shopping' })
const { fetchProducts, fetchCategories } = useProducts()
const featured = ref<any[]>([])
const categories = ref<string[]>([])
const loadingProducts = ref(true)
const loadingCats = ref(true)

const stats = [
  { value: '20K+', label: 'Happy customers' },
  { value: '500+', label: 'Products' },
  { value: '4.8★', label: 'Avg. rating' },
  { value: 'Free', label: 'Returns' },
]
const valueProps = [
  { icon: '🚀', title: 'Fast Shipping', desc: 'Orders dispatched within 24 hours' },
  { icon: '🔒', title: 'Secure Payments', desc: 'End-to-end encrypted checkout' },
  { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free returns' },
  { icon: '💬', title: '24/7 Support', desc: 'Always here when you need us' },
]
const catColors: Record<string, string> = {
  "electronics":       'linear-gradient(135deg, #162050, #0d2060)',
  "jewelery":          'linear-gradient(135deg, #2a1a44, #3d0d60)',
  "men\'s clothing":   'linear-gradient(135deg, #1a2a1a, #0d4020)',
  "women\'s clothing": 'linear-gradient(135deg, #2a1a2a, #600d40)',
}
const catIcons: Record<string, string> = {
  "electronics":       '💻',
  "jewelery":          '💎',
  "men\'s clothing":   '👔',
  "women\'s clothing": '👗',
}
onMounted(async () => {
  const [prods, cats] = await Promise.all([fetchProducts(), fetchCategories()])
  featured.value = [...prods].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 8)
  loadingProducts.value = false
  categories.value = cats
  loadingCats.value = false
})
</script>
