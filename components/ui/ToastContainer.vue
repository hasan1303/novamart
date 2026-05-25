<template>
  <Teleport to="body">
    <div class="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl min-w-[280px] max-w-xs"
          :class="{
            'bg-navy-800 border border-electric-500/30': toast.type === 'success',
            'bg-navy-800 border border-red-500/30':     toast.type === 'error',
            'bg-navy-800 border border-blue-500/30':    toast.type === 'info',
          }"
        >
          <div class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            :class="{
              'bg-electric-500/20 text-electric-400': toast.type === 'success',
              'bg-red-500/20 text-red-400':           toast.type === 'error',
              'bg-blue-500/20 text-blue-400':         toast.type === 'info',
            }"
          >
            <svg v-if="toast.type === 'success'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else-if="toast.type === 'error'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <p class="text-sm font-body text-[var(--text-primary)] flex-1">{{ toast.message }}</p>
          <button @click="toastStore.remove(toast.id)" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const toastStore = useToastStore()
const toasts = computed(() => toastStore.toasts)
</script>

<style scoped>
.toast-enter-active { animation: toastIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { animation: toastIn 0.2s ease-in reverse; }
@keyframes toastIn {
  from { opacity: 0; transform: translateX(100%) scale(0.9); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}
.toast-move { transition: transform 0.3s ease; }
</style>
