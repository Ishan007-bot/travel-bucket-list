import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Actions
const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
const MARK_AS_VISITED = 'MARK_AS_VISITED';
const REMOVE_COUNTRY = 'REMOVE_COUNTRY';
const ADD_NOTE = 'ADD_NOTE';

// Initial state
const initialState = {
  savedCountries: []
};

// Load state from localStorage
const loadState = () => {
  try {
    const savedState = localStorage.getItem('travelState');
    if (savedState === null) {
      return initialState;
    }
    return JSON.parse(savedState);
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return initialState;
  }
};

// Reducer function
const travelReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case ADD_TO_WISHLIST:
      // Check if the country is already in the list
      const exists = state.savedCountries.some(country => country.cca3 === action.payload.cca3);
      if (exists) {
        return state;
      }
      
      // Add the country to the saved list with isVisited set to false
      newState = {
        ...state,
        savedCountries: [
          ...state.savedCountries,
          {
            ...action.payload,
            isVisited: false,
            notes: '',
            addedAt: new Date().toISOString()
          }
        ]
      };
      break;
      
    case MARK_AS_VISITED:
      // Find the country and update its isVisited status
      newState = {
        ...state,
        savedCountries: state.savedCountries.map(country => 
          country.cca3 === action.payload
            ? { ...country, isVisited: true, visitedAt: new Date().toISOString() }
            : country
        )
      };
      break;
      
    case REMOVE_COUNTRY:
      // Remove the country from the saved list
      newState = {
        ...state,
        savedCountries: state.savedCountries.filter(country => country.cca3 !== action.payload)
      };
      break;
      
    case ADD_NOTE:
      // Update the notes for a specific country
      newState = {
        ...state,
        savedCountries: state.savedCountries.map(country => 
          country.cca3 === action.payload.countryCode
            ? { ...country, notes: action.payload.note }
            : country
        )
      };
      break;
      
    default:
      return state;
  }
  
  // Save to localStorage
  localStorage.setItem('travelState', JSON.stringify(newState));
  return newState;
};

// Create context
export const TravelContext = createContext();

// Context provider component
export const TravelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(travelReducer, loadState());
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('travelState', JSON.stringify(state));
  }, [state]);
  
  // Helper functions to dispatch actions
  const addToWishlist = (country) => {
    dispatch({ type: ADD_TO_WISHLIST, payload: country });
  };
  
  const markAsVisited = (countryCode) => {
    dispatch({ type: MARK_AS_VISITED, payload: countryCode });
  };
  
  const removeCountry = (countryCode) => {
    dispatch({ type: REMOVE_COUNTRY, payload: countryCode });
  };
  
  const addNote = (countryCode, note) => {
    dispatch({ type: ADD_NOTE, payload: { countryCode, note } });
  };
  
  // Context value
  const value = {
    state,
    addToWishlist,
    markAsVisited,
    removeCountry,
    addNote
  };
  
  return (
    <TravelContext.Provider value={value}>
      {children}
    </TravelContext.Provider>
  );
};

// Custom hook to use the travel context
export const useTravelContext = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravelContext must be used within a TravelProvider');
  }
  return context;
}; 