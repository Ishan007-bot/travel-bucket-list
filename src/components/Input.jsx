import React, { useState } from 'react';

const Input = ({
  type = 'text',
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  
  // Handle input blur
  const handleBlur = () => {
    setTouched(true);
  };
  
  // Determine if error should be shown
  const showError = touched && error;
  
  // Classes for the input container
  const containerClasses = `
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();
  
  // Classes for the input element
  const inputClasses = `
    block px-3 py-2 rounded-md border 
    ${showError 
      ? 'border-red-500 text-red-600 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
    }
    focus:outline-none focus:ring-2
    transition-colors duration-200
    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : ''}
    ${fullWidth ? 'w-full' : ''}
  `.trim();

  return (
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={id} 
          className={`block mb-1 text-sm font-medium ${showError ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-200'}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        {...props}
      />
      
      {(showError || helperText) && (
        <p className={`mt-1 text-xs ${showError ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
          {showError ? error : helperText}
        </p>
      )}
    </div>
  );
};

export default Input; 