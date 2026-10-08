import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export const HeroBanner = () => {
  const { settings, navigateTo, setCategoryFilter, categories } = useStore();

  const currentHeroImg = settings.heroImage || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90";

  return (
    <div className="relative w-full overflow-hidden bg-black text-white select-none">
      {/* Background Media with Dark Gradient Overlay */}
      <div className="relative h-[85vh] min-h-[600px] max-h-[850px] w-full flex items-end sm:items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
          style={{
            backgroundImage: `url('${currentHeroImg}')`
          }}
        >
          {/* Nike-Style Deep Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 md:bg-gradient-to-r md:from-black/85 md:via-black/45 md:to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-black tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{settings.heroTagline || "QISSA LABEL ATELIER • DROP 04 LIVE"}</span>
            </div>

            {/* Nike Bold Massive Typography */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight font-heading leading-[0.9] text-white">
                WEAR YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-amber-200">
                  NARRATIVE.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 font-medium max-w-lg pt-2 leading-relaxed">
                {settings.heroDescription || "Handcrafted pure Chanderi silk co-ords, royal velvet ensembles, and 450 GSM heavyweight street fits. Order directly on WhatsApp with our personal stylist concierge."}
              </p>
            </div>

            {/* Action Buttons - Single Line WhatsApp Guaranteed */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  navigateTo('catalog');
                }}
                className="px-8 py-4 bg-white text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${(settings.whatsappNumber || '919545983060').replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Salam / Hi Qissa Label! 🧵 I'm browsing your latest showcase drop and would love personalized styling recommendations.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-[#25D366] hover:bg-[#20b858] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366] shrink-0" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Quick Filter Tag Bar */}
            <div className="pt-6 border-t border-white/15 hidden sm:block">
              <div className="text-[11px] uppercase tracking-widest text-zinc-400 font-extrabold mb-2.5">
                Quick Explore Drops
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 6).map((catName, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCategoryFilter(catName);
                      navigateTo('catalog');
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-white hover:text-black border border-white/20 text-xs font-bold text-zinc-200 transition-colors backdrop-blur-sm cursor-pointer whitespace-nowrap"
                  >
                    {catName}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
