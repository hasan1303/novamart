<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-10 animate-slide-up">
      <p class="text-electric-400 text-xs font-display font-600 tracking-wider uppercase mb-2">Explore</p>
      <h1 class="section-title mb-1">All Products</h1>
      <p class="text-[var(--text-secondary)]">{{ filtered.length }} items found</p>
    </div>

    <!-- Filters bar -->
    <div class="sticky top-16 z-30 py-4 mb-8" style="background: var(--bg-primary);">
      <div class="flex flex-col sm:flex-row gap-3">
        <!-- Search -->
        <div class="relative flex-1">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input v-model="search" class="input-field !pl-10" placeholder="Search products…" />
        </div>
        <!-- Category -->
        <select v-model="selectedCategory" class="input-field sm:w-48">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ formatCat(cat) }}</option>
        </select>
        <!-- Sort -->
        <select v-model="sort" class="input-field sm:w-44">
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <!-- Category pills -->
      <div class="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
        <button
          v-for="cat in ['', ...categories]" :key="cat"
          @click="selectedCategory = cat"
          class="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-display font-600 transition-all duration-200"
          :class="selectedCategory === cat
            ? 'bg-electric-500 text-navy-950 shadow-lg shadow-electric-500/30'
            : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-electric-500/40 hover:text-electric-400'"
        >{{ cat ? formatCat(cat) : 'All' }}</button>
      </div>
    </div>

    <!-- Grid -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      <ProductSkeleton v-for="i in 12" :key="i" />
    </div>
    <div v-else-if="filtered.length === 0" class="py-24 text-center">
      <div class="text-5xl mb-4">🔍</div>
      <h3 class="font-display font-700 text-xl text-[var(--text-primary)] mb-2">No products found</h3>
      <p class="text-[var(--text-secondary)] mb-6">Try adjusting your filters or search term</p>
      <button @click="reset" class="btn-ghost">Clear filters</button>
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      <ProductCard
        v-for="(product, i) in filtered" :key="product.id" :product="product"
        class="animate-fade-in" :style="{ animationDelay: `${Math.min(i, 8) * 40}ms` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'All Products — NovaMart' })

const route = useRoute()
const { fetchProducts, fetchCategories } = useProducts()

const products = ref<any[]>([])
const categories = ref<string[]>([])
const loading = ref(true)
const search = ref('')
const selectedCategory = ref((route.query.category as string) || '')
const sort = ref('default')

const formatCat = (cat: string) => cat.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const filtered = computed(() => {
  let list = [...products.value]
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  }
  if (selectedCategory.value) {
    list = list.filter(p => p.category === selectedCategory.value)
  }
  if (sort.value === 'price-asc') list.sort((a, b) => a.price - b.price)
  else if (sort.value === 'price-desc') list.sort((a, b) => b.price - a.price)
  else if (sort.value === 'rating') list.sort((a, b) => b.rating.rate - a.rating.rate)
  return list
})

function reset() { search.value = ''; selectedCategory.value = ''; sort.value = 'default' }

onMounted(async () => {
  const [prods, cats] = await Promise.all([fetchProducts(), fetchCategories()])
  products.value = prods
  categories.value = cats
  loading.value = false
})

// Sync category from route query
watch(() => route.query.category, (val) => { selectedCategory.value = (val as string) || '' })
</script>

<style scoped>
.scrollbar-hide { scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>
