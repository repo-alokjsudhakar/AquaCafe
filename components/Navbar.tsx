
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  cartCount: number;
  onCartOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, cartCount, onCartOpen }) => {
  return (
    <nav className="sticky top-0 z-50 glass-morphism shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer group" onClick={() => onViewChange('home')}>
            {/* Logo Image from provided URL */}
            <div className="relative mr-4 w-14 h-14 flex items-center justify-center overflow-hidden rounded-xl bg-slate-900 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <img 
                src="https://i.pinimg.com/1200x/4f/60/04/4f60046c193a05a69fd7b03a8a819991.jpg" 
                alt="AquaCafe Logo" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-800 tracking-tighter leading-none">
                AQUA<span className="text-emerald-500">CAFE</span>
              </span>
              <span className="text-[10px] font-extrabold text-emerald-600/80 uppercase tracking-[0.25em] mt-1 group-hover:text-emerald-500 transition-colors">
                BUILD THE NATURE
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <button 
              onClick={() => onViewChange('home')}
              className={`${currentView === 'home' ? 'text-emerald-600 font-bold border-b-2 border-emerald-500' : 'text-slate-500'} hover:text-emerald-600 transition-all text-xs uppercase tracking-widest font-bold py-1`}
            >
              Home
            </button>
            <button 
              onClick={() => onViewChange('shop')}
              className={`${currentView === 'shop' ? 'text-emerald-600 font-bold border-b-2 border-emerald-500' : 'text-slate-500'} hover:text-emerald-600 transition-all text-xs uppercase tracking-widest font-bold py-1`}
            >
              Plant Library
            </button>
            <button 
              onClick={() => onViewChange('about')}
              className={`${currentView === 'about' ? 'text-emerald-600 font-bold border-b-2 border-emerald-500' : 'text-slate-500'} hover:text-emerald-600 transition-all text-xs uppercase tracking-widest font-bold py-1`}
            >
              Our Story
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartOpen}
              className="relative p-2.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
