import React from 'react';
import { Spinner } from './index';

const WeatherWidget = ({ weatherData, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <Spinner size="sm" variant="primary" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">Loading weather...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-500 py-2">
        Could not load weather information
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400 py-2">
        Weather information not available
      </div>
    );
  }

  const { name, weather, main, wind } = weatherData;
  const currentWeather = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{currentWeather.description}</p>
        </div>
        <div className="flex items-center">
          <img src={iconUrl} alt={currentWeather.description} className="w-16 h-16" />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">{Math.round(main.temp)}°C</span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-600 dark:text-gray-400">Feels like:</span>
          <span className="ml-1 text-gray-800 dark:text-white font-medium">{Math.round(main.feels_like)}°C</span>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400">Humidity:</span>
          <span className="ml-1 text-gray-800 dark:text-white font-medium">{main.humidity}%</span>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400">Min/Max:</span>
          <span className="ml-1 text-gray-800 dark:text-white font-medium">
            {Math.round(main.temp_min)}°/{Math.round(main.temp_max)}°
          </span>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400">Wind:</span>
          <span className="ml-1 text-gray-800 dark:text-white font-medium">{Math.round(wind.speed)} km/h</span>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic text-right">
        Current weather conditions
      </div>
    </div>
  );
};

export default WeatherWidget; 