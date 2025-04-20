import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByCode } from '../api/countriesApi';
import { useTravelContext } from '../context/TravelContext';
import { formatNumber } from '../utils/formatUtils';
import { 
  Button, 
  Spinner,
  ImageGallery,
  TravelTips,
  CelebrationEffect
} from '../components';

const CountryDetail = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [note, setNote] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); // 'info', 'gallery', 'tips'
  
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
      // Show celebration effect
      setShowCelebration(true);
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
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle celebration completion
  const handleCelebrationComplete = () => {
    setShowCelebration(false);
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
  const { name, capital, population, flags, region, subregion, languages, currencies, borders, maps, cca2 } = country;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Celebration effect */}
      <CelebrationEffect 
        isActive={showCelebration} 
        onComplete={handleCelebrationComplete} 
      />
      
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
        <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 dark:text-gray-300">{name.common}</span>
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
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Wishlist
              </Button>
            ) : !isVisited ? (
              <>
                <Button variant="success" onClick={handleMarkAsVisited}>
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Visited
                </Button>
                <Button variant="danger" onClick={handleRemove}>
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Remove from Wishlist
                </Button>
              </>
            ) : (
              <Button variant="danger" onClick={handleRemove}>
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Remove from Visited
              </Button>
            )}
          </div>
          
          {isInWishlist && (
            <div className={`p-3 rounded-md ${isVisited ? 'bg-green-50 dark:bg-green-900/20' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
              <p className={`font-medium text-sm mb-2 ${isVisited ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-300'}`}>
                {isVisited ? (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    You have visited this country!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    This country is in your wishlist!
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'info'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('info')}
          >
            Country Information
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'gallery'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('gallery')}
          >
            Photo Gallery
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'tips'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => handleTabChange('tips')}
          >
            Travel Tips
          </button>
        </div>
      </div>
      
      {/* Tab content */}
      <div className="mb-8">
        {/* Country information tab */}
        {activeTab === 'info' && (
          <div>
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
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Area:</span>
                    <span className="ml-2 text-gray-800 dark:text-white">
                      {country.area ? `${formatNumber(country.area)} km²` : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Driving Side:</span>
                    <span className="ml-2 text-gray-800 dark:text-white capitalize">
                      {country.car?.side || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            {maps && maps.googleMaps && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Location</h3>
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-video relative">
                    <iframe
                      title={`Map of ${name.common}`}
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBUxvIhcqQ6zJuwP6qJG1mlVL97dVVTERU&q=${name.common}`}
                      className="absolute inset-0 w-full h-full border-0"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <a 
                      href={maps.googleMaps} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View on Google Maps
                    </a>
                  </div>
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
        )}
        
        {/* Photo gallery tab */}
        {activeTab === 'gallery' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white">{name.common} Gallery</h3>
            <ImageGallery countryName={name.common} countryCode={countryCode} />
          </div>
        )}
        
        {/* Travel tips tab */}
        {activeTab === 'tips' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Travel Tips for {name.common}</h3>
            <TravelTips countryName={name.common} countryCode={cca2} region={region} />
          </div>
        )}
      </div>
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