import React, { useState } from 'react';
import { Modal } from './index';

// This component uses mock data since we don't have a real image API
// In a real application, you would fetch images from an API
const ImageGallery = ({ countryName, countryCode }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Generate mock images based on country name
  const images = generateMockImages(countryName, countryCode);
  
  // Open modal with selected image
  const openImageModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };
  
  // Close modal
  const closeImageModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };
  
  return (
    <div>
      {/* Grid of images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="aspect-square overflow-hidden rounded-md cursor-pointer transform transition-transform hover:scale-[1.02]"
            onClick={() => openImageModal(image)}
          >
            <div className="w-full h-full bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/20 relative">
              <img 
                src={image.url} 
                alt={image.caption} 
                className="w-full h-full object-cover"
              />
              {/* Show caption on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-end p-2">
                <p className="text-white text-xs sm:text-sm font-medium truncate">
                  {image.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Image modal */}
      {showModal && selectedImage && (
        <Modal
          isOpen={showModal}
          onClose={closeImageModal}
          title={selectedImage.caption}
          size="xl"
        >
          <div className="flex flex-col">
            <div className="relative max-h-[70vh] overflow-hidden rounded-md">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.caption} 
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm">
              {selectedImage.description}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Helper function to generate mock images
const generateMockImages = (countryName, countryCode) => {
  // For demo purposes, create 8 mock images
  // In a real application, you would fetch these from an API like Unsplash or a travel API
  const images = [];
  const normalizedCountry = countryName.toLowerCase().replace(/\s+/g, '-');
  
  // Create attraction types that would be common in countries
  const attractions = [
    'landscape',
    'cityscape',
    'landmark',
    'monument',
    'food',
    'people',
    'beach',
    'architecture',
    'mountain',
    'market',
    'wildlife',
    'street'
  ];
  
  // Generate unique seed for this country
  const seed = [...countryName].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  // Create 8 images with different themes
  for (let i = 0; i < 8; i++) {
    // Use a different attraction type for each image
    const attractionIndex = (seed + i) % attractions.length;
    const attraction = attractions[attractionIndex];
    
    // Create deterministic but "random-looking" image URL using placeholder service
    const width = 600;
    const height = 400;
    const imageId = (seed * 17 + i * 41) % 1000; // Deterministic "random" ID
    
    // Use placeholders for demo, in a real app this would be a real API
    const url = `https://source.unsplash.com/collection/${imageId}/${width}x${height}?${normalizedCountry},${attraction}`;
    
    // Add a sample image
    images.push({
      url,
      caption: `${countryName} ${attraction}`,
      description: `Explore the beautiful ${attraction} of ${countryName}. This is sample text for demonstration purposes. In a real application, this would contain accurate information about this specific location or attraction.`
    });
  }
  
  return images;
};

export default ImageGallery; 