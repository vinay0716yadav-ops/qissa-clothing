import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';

export const AnnouncementBar = () => {
  const { settings, navigateTo } = useStore();

  return (
    <div className="bg-[#111111] text-zinc-300 text-[11px] sm:text-xs font-semibold tracking-wide py-2 px-4 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Quick badge */}
        <div className="hidden md:flex items-center gap-2 text-zinc-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-zinc-300 font-bold">QISSA LABEL CONCIERGE</span>
          <span className="text-zinc-600">•</span>
          <span>Order Direct on WhatsApp (+91 95459 83060)</span>
        </div>

        {/* Center: Running Ticker */}
        <div 
          onClick={() => navigateTo('catalog')}
          className="mx-auto flex items-center gap-2 cursor-pointer hover:text-white transition-colors duration-200 text-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-extrabold tracking-wider text-white">
            {settings.announcementText || "⚡ NEW FESTIVE & STREETWEAR DROP IS LIVE • FREE PAN-INDIA SHIPPING"}
          </span>
        </div>

        {/* Right: Quick actions */}
        <div className="hidden md:flex items-center gap-4 text-zinc-400">
          <a
            href={`https://wa.me/${(settings.whatsappNumber || '919545983060').replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors font-mono"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>{settings.displayPhone || '+91 95459 83060'}</span>
          </a>
          <span className="text-zinc-700">|</span>
          <button 
            onClick={() => navigateTo('admin')} 
            className="text-zinc-400 hover:text-white transition-colors text-[11px] uppercase tracking-wider font-extrabold cursor-pointer"
          >
            Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
};
