import axios from 'axios'

// Vervang 'JOUW_API_KEY' met je daadwerkelijke API-sleutel van WeatherAPI
const API_KEY = '8fcdf71eca2847568f9115705251009' // <-- BELANGRIJK: Vul hier je eigen API-sleutel in!
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json'

/**
 * Haalt de huidige weer- en voorspellingsdata op voor een specifieke stad.
 * @param {string} cityName De naam van de stad.
 * @returns {Promise<object>} Een promise die resulteert in de weerdata.
 */
export const getWeatherData = async (cityName) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: cityName,
        days: 5, // Haal data op voor 5 dagen
      },
    })
    return response.data
  } catch (error) {
    console.error('Fout bij het ophalen van weerdata:', error)
    throw error // Gooi de fout verder zodat de aanroepende code deze kan afhandelen
  }
}
