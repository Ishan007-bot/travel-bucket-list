import React from 'react';
import { Link } from 'react-router-dom';
import { useTravelContext } from '../context/TravelContext';
import { formatNumber } from '../utils/formatUtils';

const CountryCard = ({ country }) => {
  const { state, addToWishlist, markAsVisited, removeCountry } = useTravelContext();
  
  // Check if country is in wishlist or visited
  const savedCountry = state.savedCountries.find(saved => saved.cca3 === country.cca3);
  const isInWishlist = Boolean(savedCountry);
  const isVisited = savedCountry?.isVisited || false;
  
  // Handle add to wishlist button click
  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(country);
  };
  
  // Handle mark as visited button click
  const handleMarkAsVisited = (e) => {
    e.preventDefault();
    e.stopPropagation();
    markAsVisited(country.cca3);
  };
  
  // Handle remove button click
  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeCountry(country.cca3);
  };

  return (
    <Link to={`/country/${country.cca3}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
        <div className="relative pb-[56.25%]">
          <img 
            src={country.flags.svg || country.flags.png} 
            alt={`Flag of ${country.name.common}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {(isInWishlist || isVisited) && (
            <div className="absolute top-0 right-0 p-2">
              {isVisited ? (
                <span className="bg-green-500 text-white text-xs font-bold rounded-full py-1 px-2">
                  Visited
                </span>
              ) : (
                <span className="bg-blue-500 text-white text-xs font-bold rounded-full py-1 px-2">
                  Wishlist
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{country.name.common}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{country.region}</p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p><span className="font-medium">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
            <p><span className="font-medium">Population:</span> {formatNumber(country.population)}</p>
          </div>
        </div>
        
        <div className="px-4 pb-4 mt-auto">
          {isInWishlist ? (
            <div className="flex space-x-2">
              {!isVisited && (
                <button
                  onClick={handleMarkAsVisited}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded-md transition-colors"
                >
                  Mark Visited
                </button>
              )}
              <button
                onClick={handleRemove}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded-md transition-colors"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToWishlist}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded-md transition-colors"
            >
              Add to Wishlist
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CountryCard; 