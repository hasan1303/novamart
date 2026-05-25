<template>
  <div class="flex items-center gap-0.5">
    <svg
      v-for="i in 5"
      :key="i"
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="currentColor"
      :class="i <= Math.round(rating) ? 'star-filled' : 'star-empty'"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{ rating: number }>()
</script>
