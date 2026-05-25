import { defineStore } from 'pinia'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export const useToastStore = defineStore('toast', {
  state: () => ({ toasts: [] as Toast[] }),
  actions: {
    show(message: string, type: Toast['type'] = 'success') {
      const id = Math.random().toString(36).slice(2)
      this.toasts.push({ id, message, type })
      setTimeout(() => this.remove(id), 3200)
    },
    remove(id: string) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },
  },
})
