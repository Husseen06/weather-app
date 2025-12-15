<template>
  <div
    class="p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white mb-4"
  >
    <h2 class="text-2xl font-bold mb-2">{{ title }}</h2>
    <p class="text-lg">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>
