import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

/**
 * Fetch all countries with essential data
 * @returns {Promise<Array>} Array of countries
 */
export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all?fields=name,capital,population,flags,cca3,region,subregion`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

/**
 * Fetch a specific country by its 3-letter country code
 * @param {string} countryCode - The 3-letter country code (cca3)
 * @returns {Promise<Object>} Country data
 */
export const getCountryByCode = async (countryCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/alpha/${countryCode}`);
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching country with code ${countryCode}:`, error);
    throw error;
  }
};

/**
 * Fetch countries by region
 * @param {string} region - Region name (Africa, Americas, Asia, Europe, Oceania)
 * @returns {Promise<Array>} Array of countries in the specified region
 */
export const getCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${BASE_URL}/region/${region}?fields=name,capital,population,flags,cca3,region,subregion`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries in region ${region}:`, error);
    throw error;
  }
};

/**
 * Search countries by name
 * @param {string} name - Country name to search for
 * @returns {Promise<Array>} Array of matching countries
 */
export const searchCountriesByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,cca3,region,subregion`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // No countries found with that name
      return [];
    }
    console.error(`Error searching countries with name ${name}:`, error);
    throw error;
  }
};

/**
 * Filter countries by multiple criteria
 * @param {Object} filters - Filter criteria
 * @param {Array} countries - Array of countries to filter
 * @returns {Array} Filtered countries
 */
export const filterCountries = (filters, countries) => {
  return countries.filter(country => {
    // Filter by region if specified
    if (filters.region && country.region !== filters.region) {
      return false;
    }
    
    // Filter by population if min and max are specified
    if (filters.populationMin && country.population < filters.populationMin) {
      return false;
    }
    if (filters.populationMax && country.population > filters.populationMax) {
      return false;
    }
    
    // Filter by search term if specified (match against name)
    if (filters.searchTerm && !country.name.common.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
}; 