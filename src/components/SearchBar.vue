<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])
const searchTerm = ref('')

const handleSearch = () => {
  if (searchTerm.value.trim()) {
    emit('search', searchTerm.value.trim())
    searchTerm.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="handleSearch" class="mb-8 w-full mx-auto sm:w-[640px]">
    <div class="relative rounded-lg shadow-lg overflow-hidden w-full">
      <span
        class="absolute left-0 inset-y-0 flex items-center pl-3 text-white/70 pointer-events-none"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search for a city..."
        class="w-full pl-10 pr-12 p-3 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-lg"
      />
      <button
        type="submit"
        class="cursor-pointer absolute top-0 right-0 p-3 text-white/70 hover:text-white transition-colors"
      >
        <i class="fa-solid fa-search"></i>
      </button>
    </div>
  </form>
</template>
