import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Instagram } from '../UI/Icons';

export const StoriesPage = () => {
  const { settings, navigateTo, setCategoryFilter } = useStore();

  const editorialStories = [
    {
      id: "chanderi-craft",
      chapter: "CHAPTER 01",
      title: "THE WEAVE OF CHANDERI: RESCUING SHUTTLE LOOMS",
      subtitle: "Heritage Fusion & Artisanal Drapes",
      excerpt: "In a world of synthetic fast-fashion, we returned to century-old wooden loom houses. Every yard of Chanderi silk is hand-interwoven with gold and silver zari, yielding a texture that breathes effortlessly under tropical sun.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
      quote: "A garment should carry the fingerprint of its maker, not the sterile imprint of an assembly line.",
      category: "Co-ord Sets"
    },
    {
      id: "streetwear-brutalism",
      chapter: "CHAPTER 02",
      title: "450 GSM & RAW SILHOUETTES: REINVENTING INDIAN STREETWEAR",
      subtitle: "Brutalist Shapes Meet Persian Calligraphy",
      excerpt: "We engineered our 'Afsana' hoodies using 450 GSM combed organic French terry cotton. Heavy enough to drape with architectural gravity, soft enough to wear all night across Mumbai, Delhi, and Bangalore.",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
      quote: "Streetwear isn't just logos. It's the armor of the modern nomad.",
      category: "Streetwear & Hoodies"
    },
    {
      id: "pre-draped-revolution",
      chapter: "CHAPTER 03",
      title: "THE 60-SECOND SAREE: DRAMA WITHOUT THE COMPLEXITY",
      subtitle: "Modern Eveningwear Ensembles",
      excerpt: "Our fluid modal satin and pure organza ensembles eliminate the friction of traditional draping without losing an ounce of cinematic runway volume.",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80",
      quote: "Tradition isn't worship of ashes; it's the preservation of fire.",
      category: "Sarees & Ensembles"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EDITORIAL & ARCHIVES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase font-heading tracking-tight text-white leading-[0.9]">
            THE STORIES <br />
            BEHIND THE SEAMS.
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed pt-2">
            Welcome to the Qissa Journal. Discover the master artisans, raw textile experiments, and cultural cross-currents that sculpt our collections.
          </p>

          <div className="pt-2">
            <a
              href={settings.instagramUrl || "https://www.instagram.com/qissalabel/"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full text-xs font-bold uppercase tracking-wider border border-zinc-700 transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Follow @qissalabel on Instagram</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </a>
          </div>
        </div>

        {/* Stories Chronology */}
        <div className="space-y-24">
          {editorialStories.map((story, idx) => (
            <div
              key={story.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Image Frame */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:col-start-6' : ''}`}>
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl group">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-1">
                      {story.subtitle}
                    </span>
                    <p className="text-sm font-semibold text-zinc-200 line-clamp-1">
                      Archived in Studio Collection
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Narrative Frame */}
              <div className={`lg:col-span-5 space-y-4 ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <span className="text-xs font-black tracking-widest text-zinc-500 uppercase">
                  {story.chapter}
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase font-heading tracking-tight text-white leading-tight">
                  {story.title}
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed">
                  {story.excerpt}
                </p>

                <blockquote className="border-l-2 border-amber-400 pl-4 py-1 italic text-sm text-zinc-300 font-serif">
                  "{story.quote}"
                </blockquote>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCategoryFilter(story.category);
                      navigateTo('catalog');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-full hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>Shop Capsule Fits</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Storytelling Concierge */}
        <div className="mt-28 p-8 sm:p-12 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-4 max-w-3xl mx-auto">
          <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="font-heading text-3xl font-black uppercase tracking-tight text-white">
            WANT A CUSTOM TALE CRAFTED FOR YOU?
          </h3>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Our atelier takes bespoke orders for bridal troupes, festive ceremonies, and private streetwear capsules. Chat directly with our head designer on WhatsApp.
          </p>
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Salam / Hi Qissa Atelier! ✨ I'd like to consult on a custom bespoke ensemble.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-black text-xs uppercase tracking-wider rounded-full hover:bg-[#20ba59] transition-all shadow-xl"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Consult Atelier on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
