import React, { useState } from 'react';
import Image from 'next/image';

const ImageModal = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose} // Add onClick to close modal when clicking outside
    >
      <div className="relative bg-white p-4 rounded-lg max-w-xl max-h-full overflow-hidden" onClick={(e) => e.stopPropagation()}> {/* Prevent click from propagating to overlay */}
        <button
          onClick={onClose}
          className="absolute top-4 right-7 text-red-500 hover:text-red-700 text-6xl font-bold cursor-pointer"
        >
          &times;
        </button>
        <Image
          src={images[currentIndex]}
          alt="Product Image"
          width={800}
          height={600}
          objectFit="contain"
          className="max-w-full max-h-[80vh]"
        />
        {images.length > 1 && (
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={handlePrev}
              className="bg-gray-800 text-white p-2 rounded-full ml-2 opacity-75 hover:opacity-100"
            >
              &#10094;
            </button>
          </div>
        )}
        {images.length > 1 && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={handleNext}
              className="bg-gray-800 text-white p-2 rounded-full mr-2 opacity-75 hover:opacity-100"
            >
              &#10095;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
