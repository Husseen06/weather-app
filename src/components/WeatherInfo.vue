<script setup>
import { computed } from 'vue'

const props = defineProps({
  weatherData: {
    type: Object,
    required: true,
  },
})

const lastUpdated = computed(() => {
  return new Date(props.weatherData.current.last_updated_epoch * 1000).toLocaleString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <div
    class="absolute bg-white/60 backdrop-blur-md text-slate-900 inset-x-0 bottom-0 rounded-t-lg p-8"
  >
    <!-- Close button -->
    <div class="flex justify-end mb-10">
      <button
        @click="$emit('close')"
        class="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
      >
        ❌
        <i class="fa-solid fa-xmark text-xl text-slate-800"></i>
      </button>
    </div>

    <div class="flex items-center justify-between gap-6 mb-20">
      <!-- Wind speed -->
      <div class="text-center flex-1">
        <i class="fa-solid fa-wind mb text-2xl"></i>
        <p class="text-xl font-bold">{{ weatherData.current?.wind_kph }} km/h</p>
        <p>wind</p>
      </div>
      <!-- Humidity level -->
      <div class="text-center flex-1">
        <i class="fa-solid fa-droplet mb text-2xl"></i>
        <p class="text-xl font-bold">{{ weatherData.current?.humidity }}%</p>
        <p>humidity</p>
      </div>
      <!-- Precipitation -->
      <div class="text-center flex-1">
        <i class="fa-solid fa-umbrella mb text-2xl"></i>
        <p class="text-xl font-bold">{{ weatherData.current?.precip_mm }} mm</p>
        <p>precipitation</p>
      </div>
    </div>
    <div class="flex items-center justify-between gap-6 mb-10">
      <!-- Wind direction -->
      <div class="text-center flex-1">
        <i class="fa-solid fa-compass mb text-2xl"></i>
        <p class="text-xl font-bold">{{ weatherData.current?.wind_dir }}</p>
        <p>direction</p>
      </div>
      <!-- Feels like -->
      <div class="text-center flex-1">
        <i class="fa-solid fa-temperature-half mb text-2xl"></i>
        <p class="text-xl font-bold">{{ Math.round(weatherData.current?.feelslike_c) }}&deg;</p>
        <p>Feels</p>
      </div>
      <!-- UV -->
      <div class="text-center flex-1">
        <i class="fa-solid fa-sun mb text-2xl"></i>
        <p class="text-xl font-bold">{{ weatherData.current?.uv }}</p>
        <p>UV index</p>
      </div>
    </div>
    <!-- Last update and delete -->
    <div class="flex justify-between items-center">
      <h3 class="text-slate-900/50">last update: {{ lastUpdated }}</h3>
      <button class="cursor-pointer">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>
</template>
