import React, { useEffect, useRef } from 'react';
import Button from './Button';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnClickOutside = true,
  closeOnEsc = true,
}) => {
  const modalRef = useRef(null);
  
  // Size classes for the modal dialog
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };
  
  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (closeOnEsc && event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose, closeOnEsc]);
  
  // Handle click outside of modal dialog
  const handleClickOutside = (event) => {
    if (
      closeOnClickOutside &&
      modalRef.current && 
      !modalRef.current.contains(event.target)
    ) {
      onClose();
    }
  };
  
  // Prevent page scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity p-4"
      onClick={handleClickOutside}
      aria-modal="true"
      role="dialog"
    >
      <div 
        ref={modalRef}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full ${sizeClasses[size] || sizeClasses.md} transition-all transform animate-fade-in-down`}
      >
        {/* Modal header */}
        <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal content */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        
        {/* Modal footer */}
        {footer && (
          <div className="px-6 py-4 border-t dark:border-gray-700 flex justify-end space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Default modal with OK and Cancel buttons
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = 'OK',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  size = 'md',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      footer={
        <>
          <Button 
            variant="secondary" 
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button 
            variant={confirmVariant} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      {children}
    </Modal>
  );
};

export default Modal; 