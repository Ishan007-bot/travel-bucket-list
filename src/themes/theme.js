// Theme configuration file with color palettes and styling values

// Common colors used across both themes
export const commonColors = {
  primary: {
    50: '#ebf5ff',
    100: '#e1effe',
    200: '#c3ddfd',
    300: '#a4cafe',
    400: '#76a9fa',
    500: '#3f83f8',
    600: '#1c64f2',
    700: '#1a56db',
    800: '#1e429f',
    900: '#233876',
  },
  success: {
    light: '#10b981', // emerald-500
    dark: '#34d399', // emerald-400
  },
  warning: {
    light: '#f59e0b', // amber-500
    dark: '#fbbf24', // amber-400
  },
  error: {
    light: '#ef4444', // red-500
    dark: '#f87171', // red-400
  },
  info: {
    light: '#3b82f6', // blue-500
    dark: '#60a5fa', // blue-400
  },
};

// Light theme colors
export const lightTheme = {
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb', // gray-50
    tertiary: '#f3f4f6', // gray-100
  },
  text: {
    primary: '#111827', // gray-900
    secondary: '#4b5563', // gray-600
    tertiary: '#9ca3af', // gray-400
    inverted: '#ffffff',
  },
  border: {
    light: '#e5e7eb', // gray-200
    medium: '#d1d5db', // gray-300
    dark: '#9ca3af', // gray-400
  },
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};

// Dark theme colors
export const darkTheme = {
  background: {
    primary: '#1f2937', // gray-800
    secondary: '#111827', // gray-900
    tertiary: '#374151', // gray-700
  },
  text: {
    primary: '#f9fafb', // gray-50
    secondary: '#e5e7eb', // gray-200
    tertiary: '#9ca3af', // gray-400
    inverted: '#111827', // gray-900
  },
  border: {
    light: '#374151', // gray-700
    medium: '#4b5563', // gray-600
    dark: '#6b7280', // gray-500
  },
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
  },
};

// Helper function to get current theme colors
export const getThemeColors = (theme) => {
  return {
    ...commonColors,
    ...(theme === 'light' ? lightTheme : darkTheme),
  };
}; 