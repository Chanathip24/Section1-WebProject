import React from 'react'
import { X } from "lucide-react";
const ImageModal = ({
    isOpen,
    onClose,
    images,
    currentIndex,
    setCurrentIndex,
  }) => {
    if (!isOpen) return null;
  
    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };
  
    const prevImage = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
  
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 text-4xl"
          >
            ‹
          </button>
  
          <img
            src={`http://localhost:8081/${images[currentIndex]}`}
            alt="Product"
            className="max-h-[100vh] max-w-[80vw] object-contain"
          />
  
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 text-4xl"
          >
            ›
          </button>
  
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

export default ImageModal