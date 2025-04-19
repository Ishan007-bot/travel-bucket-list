import { useState, useEffect } from 'react';

/**
 * Custom hook for handling media queries
 * @param {string} query - Media query string
 * @returns {boolean} - Whether the media query matches
 */
export function useMediaQuery(query) {
  // Initialize with null to avoid hydration issues
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Set initial value on client-side
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    // Create listener to update state
    const listener = (e) => setMatches(e.matches);
    
    // Attach the listener
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
    }
    
    // Clean up
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        // Fallback for older browsers
        media.removeListener(listener);
      }
    };
  }, [query]);
  
  return matches;
}

// Predefined media query hooks
export function useIsMobile() {
  return useMediaQuery('(max-width: 639px)');
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}

export function useIsDarkMode() {
  return useMediaQuery('(prefers-color-scheme: dark)');
} 