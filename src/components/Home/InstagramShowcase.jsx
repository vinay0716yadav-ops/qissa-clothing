import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Instagram } from '../UI/Icons';
import { ArrowUpRight, Heart, MessageCircle, Sparkles } from 'lucide-react';

export const InstagramShowcase = () => {
  const { settings, navigateTo, setCategoryFilter } = useStore();

  const feedItems = [
    {
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      caption: "Gul-e-Noor pure Chanderi silk in Royal Emerald. #QissaLabel #HandloomCouture",
      likes: "1.4k",
      category: "Co-ord Sets",
      tag: "Silk Co-ord"
    },
    {
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      caption: "450 GSM Heavy French Terry in Onyx Black. Architectural drape. #Streetwear",
      likes: "2.1k",
      category: "Streetwear & Hoodies",
      tag: "450 GSM Hoodie"
    },
    {
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
      caption: "Mehfil royal micro-velvet Anarkali with antique dabka threadwork. #RoyalFestive",
      likes: "3.2k",
      category: "Dresses & Anarkalis",
      tag: "Velvet Anarkali"
    },
    {
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      caption: "Asymmetric Bandhgala tailored in raw slub silk for modern celebrations. #MensCouture",
      likes: "1.8k",
      category: "Men's Couture",
      tag: "Bandhgala"
    },
    {
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      caption: "60-second ready pre-draped modal satin saree with sheer silk cape. #SareeLove",
      likes: "4.5k",
      category: "Sarees & Ensembles",
      tag: "Pre-Draped Saree"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-zinc-900 text-white overflow-hidden border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMUNITY & RUNWAY ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-heading tracking-tight text-white">
              AS SEEN ON @QISSALABEL
            </h2>
          </div>

          <a
            href={settings.instagramUrl || "https://www.instagram.com/qissalabel/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-colors cursor-pointer shadow-lg"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 5-Column Photo Feed */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {feedItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setCategoryFilter(item.category);
                navigateTo('catalog');
              }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-black cursor-pointer shadow-md"
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />

              {/* Tag pill */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider rounded-md border border-white/10">
                  {item.tag}
                </span>
              </div>

              {/* Hover Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs font-bold text-zinc-300">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" /> {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" /> Shop Fit
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-200 line-clamp-2 leading-snug">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
