import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, MessageCircle, Sparkles, ChevronDown } from 'lucide-react';

export const HeroBanner = () => {
  const { settings, navigateTo, setCategoryFilter } = useStore();

  const featuredDrops = [
    { label: "Co-ord Sets", category: "Co-ord Sets" },
    { label: "Heavy Streetwear", category: "Streetwear & Hoodies" },
    { label: "Festive Anarkalis", category: "Dresses & Anarkalis" },
    { label: "Men's Couture", category: "Men's Couture" },
    { label: "Pre-Draped Sarees", category: "Sarees & Ensembles" }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
      {/* Background Media with Dark Gradient Overlay */}
      <div className="relative h-[85vh] min-h-[600px] max-h-[850px] w-full flex items-end sm:items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90')`
          }}
        >
          {/* Nike-Style Deep Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE FESTIVE & STREETWEAR CAPSULE</span>
            </div>

            {/* Nike Bold Massive Typography */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight font-heading leading-[0.9] text-white">
                WEAR YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-amber-200">
                  NARRATIVE.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 font-normal max-w-lg pt-2 leading-relaxed">
                Handcrafted luxury co-ords,selvedge denim, pure Chanderi silks and heavyweight streetwear. Order directly on WhatsApp with our personal stylist concierge.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  navigateTo('catalog');
                }}
                className="px-8 py-4 bg-white text-black font-extrabold text-sm uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg flex items-center gap-2"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Salam / Hi Qissa Label! 🧵 I'm browsing your latest drop and would love personalized styling recommendations.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-[#25D366] hover:bg-[#20b858] text-white font-extrabold text-sm uppercase tracking-wider rounded-full transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Quick Filter Tag Bar */}
            <div className="pt-6 border-t border-white/15 hidden sm:block">
              <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2.5">
                Quick Explore
              </div>
              <div className="flex flex-wrap gap-2">
                {featuredDrops.map((drop, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCategoryFilter(drop.category);
                      navigateTo('catalog');
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-white hover:text-black border border-white/20 text-xs font-semibold text-zinc-200 transition-colors backdrop-blur-sm"
                  >
                    {drop.label}
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
