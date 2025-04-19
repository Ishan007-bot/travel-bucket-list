import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAllCountries, getCountriesByRegion, searchCountriesByName, filterCountries } from '../api/countriesApi';
import { useTravelContext } from '../context/TravelContext';
import { formatNumber } from '../utils/formatUtils';
import { Button, Input, Spinner, CountryCard } from '../components';

const Home = () => {
  const location = useLocation();
  
  // State for countries data
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'population'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [populationRange, setPopulationRange] = useState({ min: 0, max: 2000000000 });
  
  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);
  
  // Load countries data
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        let data;
        
        if (selectedRegion) {
          data = await getCountriesByRegion(selectedRegion);
        } else {
          data = await getAllCountries();
        }
        
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load countries. Please try again later.');
        setLoading(false);
      }
    };
    
    loadCountries();
  }, [selectedRegion]);
  
  // Filter and sort countries based on search term and filters
  useEffect(() => {
    let result = [...countries];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply population filter
    result = result.filter(country => 
      country.population >= populationRange.min && 
      country.population <= populationRange.max
    );
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.common.localeCompare(b.name.common)
          : b.name.common.localeCompare(a.name.common);
      } else if (sortBy === 'population') {
        return sortOrder === 'asc'
          ? a.population - b.population
          : b.population - a.population;
      }
      return 0;
    });
    
    setFilteredCountries(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [countries, searchTerm, populationRange, sortBy, sortOrder]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle region filter change
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  // Handle sort order change
  const handleSortOrderChange = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };
  
  // Handle population range change
  const handlePopulationMinChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPopulationRange(prev => ({ ...prev, min: value }));
  };
  
  const handlePopulationMaxChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPopulationRange(prev => ({ ...prev, max: value }));
  };
  
  // Handle view mode toggle
  const handleViewModeToggle = () => {
    setViewMode(prevMode => prevMode === 'grid' ? 'list' : 'grid');
  };
  
  // Pagination
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCountries.slice(indexOfFirstItem, indexOfLastItem);
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  if (loading && countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Spinner size="lg" variant="primary" />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading countries...</p>
      </div>
    );
  }
  
  if (error && countries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">{error}</div>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      {/* Hero section with search */}
      <div className="bg-blue-600 dark:bg-blue-800 text-white p-8 rounded-lg mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Discover the World</h1>
          <p className="text-lg text-blue-100 mb-8">
            Find information about countries, add them to your wishlist, and track your travels
          </p>
          
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-white text-gray-800 w-full py-3 px-4 rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
      
      {/* Filters section */}
      <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Region filter */}
            <div>
              <select
                value={selectedRegion}
                onChange={handleRegionChange}
                className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3"
              >
                <option value="">All Regions</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
            
            {/* Sort options */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3"
              >
                <option value="name">Name</option>
                <option value="population">Population</option>
              </select>
              
              <button
                onClick={handleSortOrderChange}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
                title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              >
                {sortOrder === 'asc' ? (
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Population range */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min population"
                value={populationRange.min || ''}
                onChange={handlePopulationMinChange}
                className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 w-32"
              />
              <span className="text-gray-500 dark:text-gray-400">to</span>
              <input
                type="number"
                placeholder="Max population"
                value={populationRange.max || ''}
                onChange={handlePopulationMaxChange}
                className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 w-32"
              />
            </div>
          </div>
          
          {/* View mode toggle */}
          <div>
            <button
              onClick={handleViewModeToggle}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
              title={viewMode === 'grid' ? 'Grid View' : 'List View'}
            >
              {viewMode === 'grid' ? (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {currentItems.length} of {filteredCountries.length} countries
        </p>
        {loading && countries.length > 0 && (
          <div className="flex items-center">
            <Spinner size="sm" variant="primary" />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Updating results...</span>
          </div>
        )}
      </div>
      
      {/* Countries grid/list */}
      {currentItems.length > 0 ? (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
          }
        `}>
          {currentItems.map(country => (
            <div key={country.cca3} className={`
              ${viewMode === 'list' 
                ? 'bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300'
                : ''
              }
            `}>
              {viewMode === 'grid' ? (
                <CountryCard country={country} />
              ) : (
                <Link to={`/country/${country.cca3}`} className="flex items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="w-20 h-12 overflow-hidden rounded mr-4 flex-shrink-0">
                    <img 
                      src={country.flags.svg || country.flags.png} 
                      alt={`Flag of ${country.name.common}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{country.name.common}</h3>
                    <div className="text-sm">
                      <span className="text-gray-600 dark:text-gray-300">{country.region}</span>
                      <span className="mx-2">•</span>
                      <span className="text-gray-600 dark:text-gray-300">Pop: {formatNumber(country.population)}</span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300 mb-4">No countries found matching your criteria</p>
          <Button variant="primary" onClick={() => {
            setSearchTerm('');
            setSelectedRegion('');
            setPopulationRange({ min: 0, max: 2000000000 });
          }}>
            Reset Filters
          </Button>
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              // Show limited page numbers with ellipsis
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                (pageNumber === 2 && currentPage > 3) ||
                (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return <span key={pageNumber} className="px-2 py-1 text-gray-500 dark:text-gray-400">...</span>;
              }
              return null;
            })}
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 