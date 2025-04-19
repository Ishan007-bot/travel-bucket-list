import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for fetching data with loading and error states
 * @param {Function} fetchFunction - The async function to execute for fetching data
 * @param {Array} dependencies - Dependencies that should trigger a refetch when changed
 * @param {boolean} executeImmediately - Whether to execute the fetch immediately
 * @returns {Object} Object containing data, loading state, error state, and a function to execute the fetch
 */
const useFetch = (fetchFunction, dependencies = [], executeImmediately = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(executeImmediately);
  const [error, setError] = useState(null);
  
  // Function to execute the fetch
  const executeFetch = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await fetchFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);
  
  // Execute fetch when dependencies change
  useEffect(() => {
    if (executeImmediately) {
      executeFetch();
    }
  }, [...dependencies, executeFetch]);
  
  return { data, loading, error, executeFetch };
};

export default useFetch; 