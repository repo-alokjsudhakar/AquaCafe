
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
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-slate-800">Your Basket</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" />
                  </svg>
                </button>
              </div>

              <div className="mt-8">
                {items.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="text-slate-500">Your garden is empty.</p>
                    <button onClick={onClose} className="mt-4 text-emerald-600 font-semibold text-sm">Browse Plants</button>
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {items.map((item) => (
                      <li key={item.id} className="py-6 flex">
                        <div className="flex-shrink-0 w-20 h-20 border border-slate-100 rounded-xl overflow-hidden">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-center object-cover" />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-slate-800">
                              <h3 className="font-bold">{item.name}</h3>
                              <p className="ml-4">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <div className="flex items-center bg-slate-50 rounded-lg p-1">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-emerald-600"
                              >
                                -
                              </button>
                              <span className="mx-3 text-slate-700 font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-emerald-600"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => onRemove(item.id)}
                              className="font-medium text-red-500 hover:text-red-600 transition-colors"
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
              <div className="border-t border-slate-100 py-6 px-4 sm:px-6 bg-slate-50/50">
                <div className="flex justify-between text-base font-medium text-slate-800 mb-6">
                  <p>Subtotal</p>
                  <p className="font-bold text-xl">Rs. {total.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-slate-500 mb-6">Shipping and taxes calculated at checkout.</p>
                <div className="space-y-3">
                  <button className="w-full bg-emerald-600 text-white rounded-2xl py-4 font-bold text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all">
                    Checkout Now
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full bg-white text-slate-600 border border-slate-200 rounded-2xl py-4 font-semibold hover:bg-slate-50 transition-all"
                  >
                    Keep Shopping
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
