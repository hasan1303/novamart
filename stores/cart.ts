import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  category: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    cartCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    addToCart(product: Omit<CartItem, 'quantity'>) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.persist()
    },

    removeFromCart(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
      this.persist()
    },

    updateQuantity(id: number, quantity: number) {
      if (quantity < 1) { this.removeFromCart(id); return }
      const item = this.items.find((i) => i.id === id)
      if (item) { item.quantity = quantity; this.persist() }
    },

    clearCart() {
      this.items = []
      this.persist()
    },

    persist() {
      if (import.meta.client) {
        localStorage.setItem('nova-cart', JSON.stringify(this.items))
      }
    },

    hydrate() {
      if (import.meta.client) {
        const saved = localStorage.getItem('nova-cart')
        if (saved) {
          try { this.items = JSON.parse(saved) } catch { this.items = [] }
        }
      }
    },
  },
})
