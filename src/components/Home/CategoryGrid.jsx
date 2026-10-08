import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoryGrid = () => {
  const { setCategoryFilter, setGenderFilter, navigateTo } = useStore();

  const categories = [
    {
      title: "CO-ORD SETS",
      tagline: "Effortless Silk & Linen Silhouettes",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
      category: "Co-ord Sets",
      gender: "all",
      badge: "HOT"
    },
    {
      title: "STREETWEAR & HOODIES",
      tagline: "450 GSM Heavy French Terry Cotton",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
      category: "Streetwear & Hoodies",
      gender: "Unisex",
      badge: "CULT FIT"
    },
    {
      title: "MEN'S COUTURE & JACKETS",
      tagline: "Asymmetric Bandhgalas & Raw Slub Silk",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      category: "Men's Couture",
      gender: "Men",
      badge: "ROYAL"
    },
    {
      title: "ROYAL FESTIVE & SAREES",
      tagline: "Pre-Draped Satins & Pure Organza Capes",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80",
      category: "Sarees & Ensembles",
      gender: "Women",
      badge: "EXCLUSIVE"
    }
  ];

  const handleCategoryClick = (cat, gender) => {
    setCategoryFilter(cat);
    setGenderFilter(gender);
    navigateTo('catalog');
  };

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          CURATED ARCHIVES
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-heading tracking-tight text-black mt-1">
          EXPLORE BY CAPSULE
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleCategoryClick(item.category, item.gender)}
            className="group relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden cursor-pointer bg-zinc-900"
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-95"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity" />

            {/* Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-black font-extrabold text-[10px] uppercase tracking-widest rounded-full shadow">
                {item.badge}
              </span>
            </div>

            {/* Content Bottom */}
            <div className="absolute inset-x-6 bottom-6 z-10 text-white space-y-2">
              <p className="text-xs uppercase tracking-widest text-zinc-300 font-semibold">
                {item.tagline}
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase font-heading tracking-tight">
                {item.title}
              </h3>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-full group-hover:bg-amber-400 transition-colors shadow">
                  <span>Explore Capsule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
