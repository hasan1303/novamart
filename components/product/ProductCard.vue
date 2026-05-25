<template>
  <NuxtLink :to="`/products/${product.id}`" class="card group block">
    <!-- Image -->
    <div class="relative overflow-hidden bg-white/5 aspect-square flex items-center justify-center p-6">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-luminosity group-hover:mix-blend-normal"
        loading="lazy"
      />
      <!-- Category badge -->
      <div class="absolute top-3 left-3">
        <span class="badge text-[10px]">{{ formatCategory(product.category) }}</span>
      </div>
      <!-- Quick add overlay -->
      <div class="absolute inset-0 bg-navy-950/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          @click.prevent="addItem"
          class="btn-primary !py-2.5 shadow-xl"
          :disabled="adding"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {{ adding ? 'Added!' : 'Quick Add' }}
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="p-4">
      <p class="text-[var(--text-secondary)] text-xs mb-1 font-500">{{ formatCategory(product.category) }}</p>
      <h3 class="font-display font-600 text-sm text-[var(--text-primary)] line-clamp-2 leading-snug mb-2 group-hover:text-electric-400 transition-colors">
        {{ product.title }}
      </h3>
      <div class="flex items-center justify-between">
        <div>
          <StarRating :rating="product.rating.rate" />
          <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">{{ product.rating.count }} reviews</p>
        </div>
        <p class="font-display font-800 text-lg text-electric-400">${{ product.price.toFixed(2) }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

const props = defineProps<{ product: Product }>()

const cartStore = useCartStore()
const toastStore = useToastStore()
const adding = ref(false)

function formatCategory(cat: string) {
  return cat.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

async function addItem() {
  adding.value = true
  cartStore.addToCart({
    id: props.product.id,
    title: props.product.title,
    price: props.product.price,
    image: props.product.image,
    category: props.product.category,
  })
  toastStore.show(`"${props.product.title.slice(0, 30)}…" added to cart!`)
  await new Promise(r => setTimeout(r, 1000))
  adding.value = false
}
</script>
