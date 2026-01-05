
import React, { useState, useRef, useEffect } from 'react';
import { getPlantConsultation } from '../services/geminiService';
import { CartItem } from '../types';

interface Message {
  role: 'user' | 'bot';
  text: string;
  sources?: any[];
  image?: string;
}

interface PlantAssistantProps {
  cartItems: CartItem[];
}

const PlantAssistant: React.FC<PlantAssistantProps> = ({ cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hello! I'm AquaBot. Send me a photo of your plants or ask any questions about your aquascape!" }
  ]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    // ... logic remains same, just updating visual part below
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input;
    const imageToSend = selectedImage;
    
    setInput('');
    setSelectedImage(null);
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMessage || (imageToSend ? "Analyzing this image..." : ""), 
      image: imageToSend || undefined 
    }]);
    setIsLoading(true);

    const result = await getPlantConsultation(userMessage || "Identify this plant and provide care tips.", cartItems.map(i => i.name), imageToSend || undefined);
    setMessages(prev => [...prev, { 
      role: 'bot', 
      text: result.text || '', 
      sources: result.sources 
    }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[380px] h-[550px] max-w-[calc(100vw-2rem)] glass-morphism rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-5 bg-emerald-600 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold leading-tight">AquaBot Vision</p>
                <p className="text-[10px] text-emerald-100 uppercase tracking-widest font-semibold">AI Consultant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 bg-emerald-50/20 hide-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                {m.image && (
                  <img src={m.image} alt="User upload" className="max-w-[80%] rounded-2xl mb-2 shadow-sm border-2 border-white" />
                )}
                <div className={`max-w-[90%] p-4 rounded-3xl shadow-sm text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 rounded-bl-none border border-emerald-50'
                }`}>
                  {m.text}
                </div>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 max-w-[90%]">
                    {m.sources.map((source, idx) => (
                      source.web?.uri && (
                        <a 
                          key={idx} 
                          href={source.web.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] bg-white border border-slate-100 text-emerald-600 px-2 py-1 rounded-lg hover:bg-emerald-50 truncate max-w-[150px]"
                        >
                          {source.web.title || 'Source'}
                        </a>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-bl-none border border-emerald-50 shadow-sm space-x-1.5 flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex flex-col space-y-3 shrink-0">
            {selectedImage && (
              <div className="relative inline-block self-start">
                <img src={selectedImage} alt="Preview" className="w-16 h-16 object-contain rounded-xl border-2 border-emerald-500 bg-slate-50" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <form onSubmit={handleSend} className="flex space-x-2">
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-emerald-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageSelect} 
                className="hidden" 
                accept="image/*" 
              />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your plant..."
                className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
              <button type="submit" className="bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 disabled:opacity-50" disabled={isLoading}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-emerald-700 hover:scale-110 transition-all duration-300 group ring-4 ring-white"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        </svg>
      </button>
    </div>
  );
};

export default PlantAssistant;
