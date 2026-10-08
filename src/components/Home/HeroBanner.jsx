import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, MessageCircle, Sparkles, Camera, Image, X, Check } from 'lucide-react';

export const HeroBanner = () => {
  const { settings, updateSettingsData, navigateTo, setCategoryFilter, showToast, isAdminAuthenticated, categories } = useStore();

  const [coverModalOpen, setCoverModalOpen] = useState(false);
  const [customCoverUrl, setCustomCoverUrl] = useState('');

  const currentHeroImg = settings.heroImage || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90";

  const curatedCovers = [
    {
      label: "Emerald Handloom Silk",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90"
    },
    {
      label: "Royal Velvet Couture",
      url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=2000&q=90"
    },
    {
      label: "Pre-Draped Satin Saree",
      url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=90"
    },
    {
      label: "450 GSM Heavy Streetwear",
      url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=2000&q=90"
    },
    {
      label: "European Pure Linen",
      url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=90"
    },
    {
      label: "Selvedge Indigo Denim",
      url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2000&q=90"
    }
  ];

  const handleSelectCover = (url) => {
    updateSettingsData({ heroImage: url });
    showToast('Cover photo updated successfully!', 'success');
    setCoverModalOpen(false);
  };

  const handleCustomCoverSubmit = (e) => {
    e.preventDefault();
    if (customCoverUrl.trim()) {
      handleSelectCover(customCoverUrl.trim());
      setCustomCoverUrl('');
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
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

        {/* Update Cover Button (ONLY VISIBLE TO AUTHENTICATED ADMIN) */}
        {isAdminAuthenticated && (
          <div className="absolute top-6 right-6 z-20 animate-fade-in">
            <button
              onClick={() => setCoverModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/85 hover:bg-black text-white text-xs font-black uppercase tracking-wider backdrop-blur-md border border-amber-400/60 hover:border-amber-400 transition-all shadow-xl cursor-pointer whitespace-nowrap group"
              title="Admin Atelier: Update Hero Cover Photo"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform shrink-0" />
              <span className="text-amber-300">Admin: Update Cover Photo</span>
            </button>
          </div>
        )}

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

      {/* Update Cover Modal */}
      {coverModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-white space-y-6 animate-scale-up shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <Camera className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-white">
                  Update Storefront Cover Image
                </h3>
              </div>
              <button
                onClick={() => setCoverModalOpen(false)}
                className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Curated Presets Grid */}
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-400">
                Choose High-Fashion Editorial Cover Preset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {curatedCovers.map((c, idx) => {
                  const isSelected = currentHeroImg === c.url;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectCover(c.url)}
                      className={`group relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                        isSelected ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-zinc-700 hover:border-white'
                      }`}
                    >
                      <img src={c.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-[11px] font-bold text-white leading-tight">
                          {c.label} {isSelected && '✓'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom URL Input */}
            <form onSubmit={handleCustomCoverSubmit} className="space-y-3 pt-2 border-t border-zinc-800">
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-400">
                Or Paste Custom Cover Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={customCoverUrl}
                  onChange={(e) => setCustomCoverUrl(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-black border border-zinc-700 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 font-mono"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Set Custom Cover
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};
