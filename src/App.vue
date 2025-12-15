<script setup>
import { ref, onMounted } from 'vue'
import WeatherCard from '../src/components/WeatherCard.vue'
import ExplanationCard from './components/ExplanationCard.vue'
import SearchBar from './components/SearchBar.vue'
import { getWeatherData } from './axios/weatherService.js'

const weatherData = ref(null)
const isLoading = ref(true)
const error = ref(null)

const fetchWeather = async (city) => {
  isLoading.value = true
  error.value = null
  weatherData.value = null

  try {
    const data = await getWeatherData(city)
    // WeatherAPI returns a 200 status with an error object if the city is not found
    if (data.error) {
      // Throw an error to be caught by the catch block
      throw new Error(data.error.message)
    }
    weatherData.value = data
  } catch (error) {
    error.value = `Cannot find location: "${city}"`
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchWeather('Amsterdam') // Standaard stad bij het laden
})
</script>

<template>
  <div
    class="min-h-screen relative overflow-hidden bg-gray-900 flex flex-col items-center justify-center p-4 font-sans"
  >
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0f172a] to-black"></div>
      <div
        class="absolute top-0 left-1/4 transform -translate-x-1/2 w-[400px] h-[400px] bg-purple-500/40 rounded-full blur-[100px] mix-blend-screen animate-pulse"
      ></div>
      <div
        class="absolute top-1/3 right-0 transform translate-x-1/2 w-[500px] h-[500px] bg-sky-400/30 rounded-full blur-[120px] mix-blend-screen"
      ></div>
      <div
        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-indigo-400/30 rounded-full blur-[120px] mix-blend-screen"
      ></div>
    </div>

    <main class="relative z-10 w-full max-w-3xl flex flex-col items-center">
      <SearchBar @search="fetchWeather" />
      <div v-if="isLoading" class="text-white text-center text-2xl">Laden...</div>
      <div v-else-if="error" class="text-red-400 bg-red-900/50 p-4 rounded-lg text-center">
        {{ error }}
      </div>
      <WeatherCard v-else-if="weatherData" :weather-data="weatherData" />

      <!-- Explanation Cards -->
      <div class="w-full mt-12 px-4 sm:px-0">
        <ExplanationCard
          title="How to Use"
          description="Enter a city name in the search bar above to get current weather conditions and a 3-day forecast."
        />
        <ExplanationCard
          title="About the Data"
          description="Weather data is provided by WeatherAPI.com, offering accurate and up-to-date information."
        />
      </div>
    </main>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  background-color: #0f172a; /* slate-900 */
}
</style>
