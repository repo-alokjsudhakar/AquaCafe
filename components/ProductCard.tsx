
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
      <div className="relative h-96 overflow-hidden bg-slate-50/50 flex items-center justify-center">
        {/* Carousel Images */}
        <div className="relative w-full h-full p-2">
          {plant.images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`${plant.name} - view ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 p-4 ${
                idx === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            />
          ))}
        </div>

        {/* Carousel Controls */}
        {plant.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Pagination Indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {plant.images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex ? 'bg-emerald-600 scale-125' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-800 shadow-sm border border-slate-100">
            {plant.category}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 translate-y-14 group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
          <button 
            onClick={() => onAddToCart(plant)}
            className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-500 shadow-2xl transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-black text-slate-800 leading-none tracking-tight">{plant.name}</h3>
          <span className="text-emerald-600 font-black text-lg">Rs. {plant.price.toFixed(0)}</span>
        </div>
        
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
          {plant.description}
        </p>
        
        <div className="flex items-center space-x-6 pt-5 border-t border-slate-50">
          <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <svg className="w-3.5 h-3.5 mr-1.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" />
            </svg>
            {plant.lightRequirement} Light
          </div>
          <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <svg className="w-3.5 h-3.5 mr-1.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            {plant.careLevel} Care
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
