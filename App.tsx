
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import PlantAssistant from './components/PlantAssistant';
import { PLANTS as INITIAL_PLANTS, CATEGORIES } from './constants';
import { Plant, CartItem, View } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [plants] = useState<Plant[]>(INITIAL_PLANTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPlants = useMemo(() => {
    if (selectedCategory === 'All') return plants;
    return plants.filter(p => p.category === selectedCategory);
  }, [selectedCategory, plants]);

  const addToCart = (plant: Plant) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === plant.id);
      if (existing) {
        return prev.map(item => item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...plant, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const renderHome = () => (
    <div className="space-y-24 pb-20">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.tfhmagazine.com/-/media/Project/OneWeb/TFH/US/articles/040_expressing_perspective_through_aquatic_plant_arrangement.jpg?q=80&w=2000&auto=format&fit=cro" 
            className="w-full h-full object-cover brightness-[0.5] scale-105"
            alt="Lush Planted Aquarium Banner"
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="inline-block px-5 py-2 bg-emerald-400/20 backdrop-blur-md border border-emerald-400/30 rounded-full text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            Build the Nature
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Plants are the New <span className="text-emerald-400">Caffeine of Life</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-6 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg">
            AquaCafe brings the serene, oxygenating power of nature right into your living space. Hand-selected plants for every scaper.
          </p>
          <p className="text-emerald-400 font-black tracking-[0.4em] uppercase text-xs md:text-sm mb-12 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            For the Hobbyist By the Hobbyist
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => setCurrentView('shop')}
              className="px-12 py-6 bg-emerald-600 text-white rounded-[2rem] font-bold text-xl hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/40 w-full sm:w-auto hover:scale-105 active:scale-95"
            >
              Shop Collection
            </button>
            <button 
              onClick={() => setCurrentView('about')}
              className="px-12 py-6 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-[2rem] font-bold text-xl hover:bg-white/20 transition-all w-full sm:w-auto hover:scale-105"
            >
              Our Story
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Staff Favorites</h2>
            <p className="text-slate-500 text-lg max-w-lg">Hand-picked by our expert scapers for their beauty and resilience.</p>
          </div>
          <button 
            onClick={() => setCurrentView('shop')}
            className="group flex items-center space-x-2 text-emerald-600 font-black text-lg hover:text-emerald-700"
          >
            <span>Browse Full Library</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {plants.slice(0, 3).map(plant => (
            <ProductCard key={plant.id} plant={plant} onAddToCart={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );

  const renderShop = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-6xl font-black text-slate-900 mb-4 tracking-tight">Plant Library</h1>
          <p className="text-slate-500 text-xl max-w-2xl">Discover our curated selection of premium aquatic species.</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-16">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
              selectedCategory === cat 
                ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 scale-105' 
                : 'bg-white text-slate-500 border border-slate-100 hover:border-emerald-200 hover:text-emerald-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredPlants.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 font-bold text-xl">Empty Garden.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredPlants.map(plant => (
            <ProductCard key={plant.id} plant={plant} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar 
        currentView={currentView} 
        onViewChange={(v) => { setCurrentView(v); window.scrollTo(0, 0); }} 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <main className="animate-in fade-in duration-700">
        {currentView === 'home' && renderHome()}
        {currentView === 'shop' && renderShop()}
        {currentView === 'about' && (
          <div className="max-w-5xl mx-auto px-6 py-24 pb-40">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">Roots, Rhythms, and Rituals</h1>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-xl text-slate-600 leading-relaxed">
                <p className="font-medium text-slate-900">Plants are the energy of life.</p>
                <p>Nurturing the aquatic world with passion since 2024.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="pt-12 border-t border-slate-900 text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center">
            <p className="font-medium">© 2024 AquaCafe. Plants are the New Caffeine of Life.</p>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <PlantAssistant cartItems={cart} />
    </div>
  );
}
