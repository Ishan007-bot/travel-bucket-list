import axios from 'axios';

// OpenWeatherMap API key 
const API_KEY = '2940eef946103ca119d1c2a69f634a4a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather for a capital city
 * @param {string} city - The city name (typically a country's capital)
 * @param {string} countryCode - The 2-letter country code
 * @returns {Promise<Object>} Weather data
 */
export const getWeatherForCity = async (city, countryCode) => {
  try {
    // Add a console log to see what we're trying to fetch
    console.log(`Fetching weather for ${city}, ${countryCode}`);
    
    // Use a proxy URL if facing CORS issues
    const response = await axios.get(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)},${countryCode}&units=metric&appid=${API_KEY}`
    );
    
    // Log the response to see what we got
    console.log('Weather API response:', response.data);
    return response.data;
  } catch (error) {
    // Log detailed error information
    console.error(`Error fetching weather data:`, error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Status code:', error.response.status);
    }
    throw error;
  }
};
