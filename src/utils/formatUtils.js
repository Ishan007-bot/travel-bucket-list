/**
 * Format a number with commas for thousands separators
 * @param {number} number - The number to format
 * @returns {string} Formatted number with commas
 */
export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format a date to a readable string
 * @param {string} dateString - ISO date string
 * @param {object} options - Date formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return date.toLocaleDateString(undefined, { ...defaultOptions, ...options });
};

/**
 * Calculate time difference and return humanized format
 * @param {string} dateString - ISO date string
 * @returns {string} Humanized time difference
 */
export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  
  const seconds = Math.floor((now - date) / 1000);
  
  // Less than a minute
  if (seconds < 60) {
    return 'just now';
  }
  
  // Less than an hour
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  
  // Less than a day
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  
  // Less than a month
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  
  // Less than a year
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  
  // More than a year
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}; 