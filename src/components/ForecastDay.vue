<script setup>
import { computed } from 'vue'

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
})

const dayOfWeek = computed(() => {
  return new Date(props.day.date).toLocaleDateString('en-us', { weekday: 'long' })
})
</script>

<template>
  <div class="flex items-center justify-between py-2">
    <p class="w-1/3">{{ dayOfWeek }}</p>
    <div class="w-1/3 flex justify-center">
      <img :src="day.day.condition.icon" alt="weather icon" width="30" />
    </div>
    <div class="w-1/3 text-right">
      <p>{{ Math.round(day.day.maxtemp_c) }}&deg; / {{ Math.round(day.day.mintemp_c) }}&deg;</p>
    </div>
  </div>
</template>
