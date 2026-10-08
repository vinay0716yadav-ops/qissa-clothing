import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';

export const MegaMenu = ({ activeMenu, onClose }) => {
  const { navigateTo, setCategoryFilter, setGenderFilter, settings } = useStore();

  if (!activeMenu) return null;

  const menuData = {
    women: {
      title: "WOMEN'S ATELIER",
      links: [
        { label: "All Women's Fits", category: "all", gender: "Women" },
        { label: "Silk & Linen Co-ord Sets", category: "Co-ord Sets", gender: "Women" },
        { label: "Royal Velvet Anarkalis", category: "Dresses & Anarkalis", gender: "Women" },
        { label: "Pre-Draped Satins & Sarees", category: "Sarees & Ensembles", gender: "Women" },
        { label: "Resortwear Tops & Kurtas", category: "Co-ord Sets", gender: "Women" }
      ],
      featured: {
        title: "THE FESTIVE SILK DROP",
        subtitle: "Handloom Chanderi & Liquid Modal",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        category: "Co-ord Sets",
        gender: "Women"
      }
    },
    men: {
      title: "MEN'S COUTURE & BESPOKE",
      links: [
        { label: "All Men's Fits", category: "all", gender: "Men" },
        { label: "Asymmetric Bandhgala Jackets", category: "Men's Couture", gender: "Men" },
        { label: "Raw Slub Silk Overshirts", category: "Men's Couture", gender: "Men" },
        { label: "Selvedge Denim Layers", category: "Outerwear & Jackets", gender: "Men" },
        { label: "450 GSM Heavy Streetwear", category: "Streetwear & Hoodies", gender: "Unisex" }
      ],
      featured: {
        title: "ROYAL HERITAGE TAILORING",
        subtitle: "Artisanal Raw Slub Silk Overlaps",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        category: "Men's Couture",
        gender: "Men"
      }
    },
    streetwear: {
      title: "STREETWEAR & HOODIES",
      links: [
        { label: "All Streetwear Drops", category: "Streetwear & Hoodies", gender: "Unisex" },
        { label: "450 GSM French Terry Hoodies", category: "Streetwear & Hoodies", gender: "Unisex" },
        { label: "280 GSM Heavy Boxy Tees", category: "Streetwear & Hoodies", gender: "Unisex" },
        { label: "13.5oz Selvedge Denim Kimonos", category: "Outerwear & Jackets", gender: "Unisex" },
        { label: "Utilitarian Wide-Leg Pants", category: "Bottoms & Pants", gender: "Unisex" }
      ],
      featured: {
        title: "BRUTALIST HOODIE CAPSULE",
        subtitle: "Architectural Drape & Persian Inscriptions",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
        category: "Streetwear & Hoodies",
        gender: "Unisex"
      }
    }
  };

  const current = menuData[activeMenu];
  if (!current) return null;

  const handleLinkClick = (category, gender) => {
    setCategoryFilter(category);
    setGenderFilter(gender);
    onClose();
    navigateTo('catalog');
  };

  return (
    <div 
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white border-b border-zinc-200 shadow-2xl z-50 animate-fade-in"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8 items-center">
          
          {/* Category Links Column */}
          <div className="col-span-5 space-y-4">
            <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400 block">
              {current.title}
            </span>
            <ul className="space-y-2.5">
              {current.links.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link.category, link.gender)}
                    className="text-sm font-bold text-zinc-800 hover:text-black hover:translate-x-1 transition-all flex items-center justify-between w-full group py-1 cursor-pointer text-left"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-black transition-colors" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
              <a
                href={`https://wa.me/${(settings.whatsappNumber || '919545983060').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Salam / Hi Qissa Label! 🧵 I'd like personal styling guidance for ${current.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-600/20" />
                <span>Chat with Stylist on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Featured Editorial Card Column */}
          <div className="col-span-7">
            <div 
              onClick={() => handleLinkClick(current.featured.category, current.featured.gender)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 shadow-md"
            >
              <img
                src={current.featured.image}
                alt={current.featured.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute inset-x-6 bottom-6 text-white space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                  {current.featured.subtitle}
                </span>
                <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-white">
                  {current.featured.title}
                </h3>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white underline underline-offset-4 group-hover:text-amber-300 transition-colors">
                    <span>Explore Capsule Drop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
