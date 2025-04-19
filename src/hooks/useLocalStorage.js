import { useState, useEffect } from 'react';

/**
 * Custom hook for working with localStorage
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist in localStorage
 * @returns {[any, function]} - State value and setter function
 */
export function useLocalStorage(key, initialValue) {
  // Get stored value from localStorage or use initialValue
  const getStoredValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };
  
  // State to store our value
  const [storedValue, setStoredValue] = useState(getStoredValue);
  
  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
  
  // Listen for changes to this localStorage value across other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== e.oldValue) {
        setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key, initialValue]);
  
  return [storedValue, setValue];
} 