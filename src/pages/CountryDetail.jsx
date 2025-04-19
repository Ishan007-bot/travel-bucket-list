import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByCode } from '../api/countriesApi';
import { useTravelContext } from '../context/TravelContext';
import { formatNumber } from '../utils/formatUtils';
import { Button, Spinner } from '../components';

const CountryDetail = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [note, setNote] = useState('');
  const { state, addToWishlist, markAsVisited, removeCountry, addNote } = useTravelContext();

  // Check if country is saved in context
  const savedCountry = state.savedCountries.find(c => c.cca3 === countryCode);
  const isInWishlist = Boolean(savedCountry);
  const isVisited = savedCountry?.isVisited || false;

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(countryCode);
        setCountry(data);
        
        // Set note if exists
        if (savedCountry?.notes) {
          setNote(savedCountry.notes);
        }
      } catch (err) {
        setError('Failed to load country information. Please try again later.');
        console.error('Error fetching country data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [countryCode, savedCountry]);

  // Handle wishlist button click
  const handleAddToWishlist = () => {
    if (!isInWishlist && country) {
      addToWishlist(country);
    }
  };

  // Handle mark as visited button click
  const handleMarkAsVisited = () => {
    if (country) {
      markAsVisited(countryCode);
    }
  };

  // Handle remove button click
  const handleRemove = () => {
    if (isInWishlist) {
      removeCountry(countryCode);
    }
  };

  // Handle saving note
  const handleSaveNote = () => {
    if (isInWishlist) {
      addNote(countryCode, note);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <SpinnerWithText text="Loading country information..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-red-500 mb-4">{error}</div>
        <Link to="/">
          <Button variant="primary">Go Back to Home</Button>
        </Link>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-700 dark:text-gray-300 mb-4">Country not found</div>
        <Link to="/">
          <Button variant="primary">Go Back to Home</Button>
        </Link>
      </div>
    );
  }

  // Extract data from country object
  const { name, capital, population, flags, region, subregion, languages, currencies, borders, maps } = country;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link to="/">
          <Button variant="outline-primary" className="flex items-center">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Countries
          </Button>
        </Link>
      </div>

      {/* Country header */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="w-full md:w-2/5 mb-4 md:mb-0 md:mr-6">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={flags.svg || flags.png} 
              alt={`Flag of ${name.common}`}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-3/5">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{name.common}</h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-4">{name.official}</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {!isInWishlist ? (
              <Button variant="primary" onClick={handleAddToWishlist}>
                Add to Wishlist
              </Button>
            ) : !isVisited ? (
              <>
                <Button variant="success" onClick={handleMarkAsVisited}>
                  Mark as Visited
                </Button>
                <Button variant="danger" onClick={handleRemove}>
                  Remove from Wishlist
                </Button>
              </>
            ) : (
              <Button variant="danger" onClick={handleRemove}>
                Remove from Visited
              </Button>
            )}
          </div>
          
          {isInWishlist && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="font-medium text-sm text-blue-700 dark:text-blue-300 mb-2">
                {isVisited ? 'You have visited this country!' : 'This country is in your wishlist!'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Country information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Basic Information</h3>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Capital:</span>
              <span className="ml-2 text-gray-800 dark:text-white">{capital?.[0] || 'N/A'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Region:</span>
              <span className="ml-2 text-gray-800 dark:text-white">{region || 'N/A'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Subregion:</span>
              <span className="ml-2 text-gray-800 dark:text-white">{subregion || 'N/A'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Population:</span>
              <span className="ml-2 text-gray-800 dark:text-white">{formatNumber(population) || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Additional Details</h3>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Languages:</span>
              <span className="ml-2 text-gray-800 dark:text-white">
                {languages ? Object.values(languages).join(', ') : 'N/A'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Currencies:</span>
              <span className="ml-2 text-gray-800 dark:text-white">
                {currencies 
                  ? Object.values(currencies).map(currency => `${currency.name} (${currency.symbol || ''})`).join(', ') 
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      {maps && maps.googleMaps && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Location</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <a 
              href={maps.googleMaps} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-3 bg-blue-50 dark:bg-blue-900/20 text-center rounded-md text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      )}

      {/* Neighboring countries */}
      {borders && borders.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Bordering Countries</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex flex-wrap gap-2">
              {borders.map(borderCode => (
                <Link 
                  key={borderCode} 
                  to={`/country/${borderCode}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {borderCode}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notes section (only if country is in wishlist) */}
      {isInWishlist && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Your Notes</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add your travel notes here..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-y min-h-[120px]"
            />
            <div className="mt-3">
              <Button variant="secondary" onClick={handleSaveNote}>
                Save Notes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// For loading state
const SpinnerWithText = ({ text }) => {
  return (
    <div className="flex flex-col items-center">
      <Spinner size="lg" variant="primary" />
      <p className="mt-4 text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
};

export default CountryDetail; 