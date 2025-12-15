<script setup>
import { computed, ref } from 'vue'
import BorderLine from './BorderLine.vue'
import WeatherInfo from './WeatherInfo.vue'
import ForecastDay from './ForecastDay.vue'

const props = defineProps({
  weatherData: {
    type: Object,
    required: true,
  },
})

const showDetails = ref(false)

const localTime = computed(() => {
  if (props.weatherData.location) {
    return new Date(props.weatherData.location.localtime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  return '[Local time]'
})

const highResIcon = computed(() => {
  if (props.weatherData.current?.condition.icon) {
    return props.weatherData.current.condition.icon.replace('64x64', '128x128')
  }
  return ''
})
</script>

<template>
  <!-- Liquid glass card -->
  <div
    class="text-white p-6 sm:p-10 rounded-2xl shadow-2xl gap-6 mb-6 relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 mx-auto w-full sm:w-[640px]"
  >
    <!-- Location & time -->
    <div class="mb-2 flex justify-between items-center">
      <div class="flex items-center justify-center gap-2">
        <i class="fa-solid fa-location-dot"></i>
        <h1 class="text-xl sm:text-3xl">{{ weatherData.location?.name || '[Place name]' }}</h1>
      </div>
      <div class="flex items-center justify-center gap-2">
        <i class="fa-regular fa-clock"></i>
        <h1 class="text-xl sm:text-3xl">{{ localTime }}</h1>
      </div>
    </div>

    <!-- current weather -->
    <div class="text-center flex-1">
      <img :src="highResIcon" alt="weather icon" class="mx-auto -mb-8 w-24 sm:w-32" />
      <h1 class="text-6xl sm:text-9xl mb-2">
        {{ Math.round(weatherData.current?.temp_c) || '[Temp]' }}&deg;
      </h1>
      <p class="text-lg sm:text-2xl">
        {{ weatherData.current?.condition.text || '[Weather condition]' }}
      </p>
    </div>

    <BorderLine />

    <!-- 5-day forecast -->
    <div v-if="weatherData.forecast">
      <ForecastDay
        v-for="day in weatherData.forecast.forecastday"
        :key="day.date_epoch"
        :day="day"
      />
    </div>

    <!-- info -->
    <WeatherInfo v-if="showDetails" :weather-data="weatherData" @close="showDetails = false" />

    <!-- forecast btn -->
    <div class="flex justify-end items-center gap-1 mt-10">
      <button
        @click="showDetails = true"
        class="cursor-pointer px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-sky-400/20"
      >
        More
        <i class="fa-solid fa-arrow-right text-sm -mb-px"></i>
      </button>
    </div>
  </div>
</template>
