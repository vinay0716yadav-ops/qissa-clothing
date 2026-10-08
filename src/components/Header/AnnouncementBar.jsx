import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, Sparkles, ChevronRight } from 'lucide-react';

export const AnnouncementBar = () => {
  const { settings, navigateTo } = useStore();

  const messages = [
    settings.announcementText || "⚡ COMPLIMENTARY PAN-INDIA EXPRESS SHIPPING ON ALL ORDERS",
    "🧵 ARTISANAL HANDLOOM CHANDERI & 450 GSM HEAVYWEIGHT STREETWEAR",
    "✨ 1-ON-1 PERSONAL STYLIST & BESPOKE SIZING ON WHATSAPP"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 300);
    }, 4500);

    return () => clearInterval(timer);
  }, [messages.length]);

  const cleanPhone = (settings.whatsappNumber || '919545983060').replace(/[^0-9]/g, '');

  return (
    <div className="bg-[#0c0c0c] text-zinc-300 text-[11px] sm:text-xs tracking-wider py-2.5 px-4 border-b border-zinc-900 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Minimalist Live Concierge Badge */}
        <div className="hidden lg:flex items-center gap-2 text-zinc-400 whitespace-nowrap text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold tracking-widest text-zinc-300 uppercase">
            LIVE ATELIER CONCIERGE
          </span>
        </div>

        {/* Center: Smooth Rotating Luxury Announcement */}
        <div 
          onClick={() => navigateTo('catalog')}
          className="flex-1 flex items-center justify-center gap-2 cursor-pointer text-center group py-0.5"
        >
          <Sparkles className="w-3 h-3 text-amber-400 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" />
          <span 
            className={`font-black uppercase tracking-[0.12em] sm:tracking-[0.16em] text-zinc-200 group-hover:text-white transition-all duration-300 truncate max-w-[280px] sm:max-w-none text-[10.5px] sm:text-[11.5px] ${
              fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}
          >
            {messages[currentIndex]}
          </span>
          <ChevronRight className="w-3 h-3 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:inline-block" />
        </div>

        {/* Right: Sleek Single-Line WhatsApp Order Desk */}
        <div className="hidden sm:flex items-center text-zinc-400 whitespace-nowrap text-[11px]">
          <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors font-mono whitespace-nowrap shrink-0 group"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform shrink-0" />
            <span className="whitespace-nowrap font-medium text-zinc-300 group-hover:text-emerald-300">
              {settings.displayPhone || '+91 95459 83060'}
            </span>
          </a>
        </div>

      </div>
    </div>
  );
};
