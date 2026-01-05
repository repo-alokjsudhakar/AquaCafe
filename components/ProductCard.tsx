
import React, { useState } from 'react';
import { Plant } from '../types';

interface ProductCardProps {
  plant: Plant;
  onAddToCart: (plant: Plant) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ plant, onAddToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % plant.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + plant.images.length) % plant.images.length);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        {/* Carousel Images */}
        <div className="relative w-full h-full">
          {plant.images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`${plant.name} - view ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500 ${
                idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Carousel Controls */}
        {plant.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Pagination Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {plant.images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-emerald-700 shadow-sm border border-emerald-100">
            {plant.category}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={() => onAddToCart(plant)}
            className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800 leading-tight">{plant.name}</h3>
          <span className="text-emerald-600 font-bold text-lg">Rs. {plant.price.toFixed(2)}</span>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
          {plant.description}
        </p>
        
        <div className="flex items-center space-x-4 pt-4 border-t border-slate-50">
          <div className="flex items-center text-[11px] font-medium text-slate-400">
            <svg className="w-3.5 h-3.5 mr-1 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" />
            </svg>
            Light: {plant.lightRequirement}
          </div>
          <div className="flex items-center text-[11px] font-medium text-slate-400">
            <svg className="w-3.5 h-3.5 mr-1 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            {plant.careLevel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
