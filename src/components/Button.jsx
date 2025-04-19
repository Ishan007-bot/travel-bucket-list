import React from 'react';

// Button variants:
// - primary: Blue background, white text
// - secondary: Gray background, darker text
// - success: Green background, white text
// - danger: Red background, white text
// - outline-primary: White background, blue border and text

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  // Base classes that apply to all buttons
  const baseClasses = 'rounded focus:outline-none transition-colors duration-200 font-medium inline-flex items-center justify-center';
  
  // Variant specific classes
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    'outline-primary': 'border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800'
  };
  
  // Size specific classes
  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-3 px-6'
  };
  
  // Disabled styles
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  // Full width
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant] || variantClasses.primary} 
    ${sizeClasses[size] || sizeClasses.md} 
    ${disabledClasses} 
    ${widthClasses} 
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 