import React from 'react';

// Available sizes: xs, sm, md, lg, xl
// Available variants: primary, secondary, white

const Spinner = ({ 
  size = 'md', 
  variant = 'primary',
  fullScreen = false,
  text = 'Loading...'
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  // Variant colors
  const variantClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600 dark:text-gray-300',
    white: 'text-white'
  };
  
  // Border classes
  const borderSizeClasses = {
    xs: 'border-2',
    sm: 'border-2',
    md: 'border-3',
    lg: 'border-4',
    xl: 'border-4'
  };
  
  // Combined spinner classes
  const spinnerClasses = `
    ${sizeClasses[size] || sizeClasses.md}
    ${variantClasses[variant] || variantClasses.primary}
    ${borderSizeClasses[size] || borderSizeClasses.md}
    spinner-border
    rounded-full
    border-solid
    border-r-transparent
    animate-spin
    inline-block
  `;
  
  // If fullScreen is true, render a centered spinner that takes the full screen
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex justify-center items-center z-50">
        <div className="text-center">
          <div className={spinnerClasses} role="status" aria-label="Loading">
            <span className="sr-only">Loading...</span>
          </div>
          {text && <p className="mt-2 text-gray-700 dark:text-gray-300">{text}</p>}
        </div>
      </div>
    );
  }
  
  // Regular spinner
  return (
    <div className="inline-block">
      <div className={spinnerClasses} role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

// Spinner with text centered in a container
export const SpinnerWithText = ({ text = 'Loading...', size = 'md', variant = 'primary' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <Spinner size={size} variant={variant} />
      <p className="mt-2 text-gray-700 dark:text-gray-300">{text}</p>
    </div>
  );
};

export default Spinner; 