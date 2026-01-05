
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md pointer-events-auto">
          <div className="h-full flex flex-col bg-white shadow-2xl">
            <div className="flex-1 py-8 overflow-y-auto px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Your Basket</h2>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-12">
                {items.length === 0 ? (
                  <div className="text-center py-24">
                    <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="text-slate-500 font-medium">Your garden is empty.</p>
                    <button onClick={onClose} className="mt-6 text-emerald-600 font-black text-sm uppercase tracking-widest hover:text-emerald-700">Explore Collection</button>
                  </div>
                ) : (
                  <ul className="space-y-8">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 flex items-center justify-center">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-black text-slate-800 text-lg leading-none">{item.name}</h3>
                              <p className="mt-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600">{item.category}</p>
                            </div>
                            <p className="font-black text-slate-900">Rs. {(item.price * item.quantity).toFixed(0)}</p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center bg-slate-50 rounded-xl px-2 py-1">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="mx-4 text-slate-800 font-black text-sm w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                            <button 
                              onClick={() => onRemove(item.id)}
                              className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-500 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {items.length > 0 && (
              <div className="border-t border-slate-100 p-8 bg-slate-50/50">
                <div className="flex justify-between items-center mb-8">
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Subtotal</p>
                  <p className="font-black text-3xl text-slate-900">Rs. {total.toFixed(0)}</p>
                </div>
                <div className="space-y-4">
                  <button className="w-full bg-slate-900 text-white rounded-2xl py-5 font-black text-lg hover:bg-slate-800 shadow-2xl shadow-slate-200 transition-all active:scale-95">
                    Checkout Now
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full bg-white text-slate-500 border border-slate-200 rounded-2xl py-5 font-bold hover:bg-slate-50 transition-all"
                  >
                    Keep Browsing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
