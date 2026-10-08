import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  MessageCircle, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowUpRight, 
  Sparkles,
  Lock
} from 'lucide-react';
import { Instagram } from '../UI/Icons';

export const Footer = () => {
  const { settings, navigateTo, setCategoryFilter, setGenderFilter, setSizeGuideOpen } = useStore();

  const handleLink = (cat, gender) => {
    setCategoryFilter(cat);
    setGenderFilter(gender);
    navigateTo('catalog');
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid - Nike Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Col 1: Bold Quick Actions */}
          <div className="space-y-3 font-heading text-lg sm:text-xl font-black uppercase tracking-wider text-white">
            <button 
              onClick={() => handleLink('all', 'all')}
              className="block text-left hover:text-zinc-400 transition-colors cursor-pointer"
            >
              EXPLORE ALL DROPS
            </button>
            <button 
              onClick={() => handleLink('Co-ord Sets', 'Women')}
              className="block text-left hover:text-zinc-400 transition-colors cursor-pointer"
            >
              FESTIVE CO-ORDS
            </button>
            <button 
              onClick={() => handleLink('Streetwear & Hoodies', 'Unisex')}
              className="block text-left hover:text-zinc-400 transition-colors cursor-pointer"
            >
              HEAVY STREETWEAR
            </button>
            <button 
              onClick={() => handleLink("Men's Couture", 'Men')}
              className="block text-left hover:text-zinc-400 transition-colors cursor-pointer"
            >
              MEN'S COUTURE
            </button>
            <button 
              onClick={() => setSizeGuideOpen(true)}
              className="block text-left hover:text-zinc-400 transition-colors cursor-pointer"
            >
              OFFICIAL SIZE GUIDE
            </button>
          </div>

          {/* Col 2: Customer Concierge */}
          <div className="space-y-3 text-xs">
            <h4 className="font-heading text-base font-black tracking-widest text-zinc-400 uppercase">
              GET ASSISTANCE
            </h4>
            <ul className="space-y-2.5 text-zinc-400 font-medium">
              <li>
                <a 
                  href={`https://wa.me/${(settings.whatsappNumber || '919545983060').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="whitespace-nowrap">WhatsApp Order Tracking</span>
                </a>
              </li>
              <li>
                <button onClick={() => setSizeGuideOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Garment Measurements & Custom Fit
                </button>
              </li>
              <li>
                <span className="text-zinc-500">Pan-India Express Dispatch (Complimentary)</span>
              </li>
              <li>
                <span className="text-zinc-500">Bespoke Bridal Consultations</span>
              </li>
              <li>
                <a href={`mailto:${settings.supportEmail || 'orders@qissalabel.com'}`} className="hover:text-white transition-colors">
                  {settings.supportEmail || 'orders@qissalabel.com'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: About Qissa Label */}
          <div className="space-y-3 text-xs">
            <h4 className="font-heading text-base font-black tracking-widest text-zinc-400 uppercase">
              THE ATELIER
            </h4>
            <ul className="space-y-2.5 text-zinc-400 font-medium">
              <li>
                <button onClick={() => navigateTo('stories')} className="hover:text-white transition-colors cursor-pointer">
                  The Story of Qissa Label
                </button>
              </li>
              <li>
                <span className="text-zinc-500">Handloom Silk Weaving Houses</span>
              </li>
              <li>
                <span className="text-zinc-500">450 GSM French Terry Studio</span>
              </li>
              <li>
                <span className="text-zinc-500">Sustainable Zero-Waste Small Batches</span>
              </li>
              <li>
                <a href={settings.instagramUrl || "https://www.instagram.com/qissalabel/"} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">
                  Curated by @qissalabel
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 & 5: Brand Identity, Location & WhatsApp Desk */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <span className="text-3xl font-black font-heading tracking-tighter text-white">
                QISSA LABEL
              </span>
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                Contemporary apparel & artisanal couture celebrating personal storytelling. Built with zero-friction direct WhatsApp ordering.
              </p>
            </div>

            {/* Direct WhatsApp Callout - Single Line */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between whitespace-nowrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>Official WhatsApp Line</span>
                </span>
                <span className="text-[11px] text-zinc-400 whitespace-nowrap">Available Daily</span>
              </div>
              <a
                href={`https://wa.me/${(settings.whatsappNumber || '919545983060').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base font-black text-white hover:text-[#25D366] transition-colors whitespace-nowrap font-mono"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                <span className="whitespace-nowrap">{settings.displayPhone || "+91 95459 83060"}</span>
              </a>
            </div>

            {/* Social handles */}
            <div className="flex items-center gap-3 pt-1 whitespace-nowrap">
              <a
                href={settings.instagramUrl || "https://www.instagram.com/qissalabel/"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-pink-400 transition-colors shrink-0"
                title="Follow @qissalabel on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${(settings.whatsappNumber || '919545983060').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-emerald-400 transition-colors shrink-0"
                title="WhatsApp Us"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <span className="text-xs text-zinc-400 font-semibold whitespace-nowrap">
                Instagram: <a href={settings.instagramUrl || "https://www.instagram.com/qissalabel/"} target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold">@qissalabel</a>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer - Nike Style */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          
          <div className="flex items-center gap-3 whitespace-nowrap">
            <span className="flex items-center gap-1 text-zinc-300 font-bold whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
              <span>India ({settings.currencyCode || 'INR'} {settings.currencySymbol || '₹'})</span>
            </span>
            <span>•</span>
            <span className="whitespace-nowrap">© {new Date().getFullYear()} QISSA LABEL ATELIER. All Rights Reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer" onClick={() => setSizeGuideOpen(true)}>Fit Guides</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer" onClick={() => navigateTo('stories')}>The Stories</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Terms of Showcase</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Privacy Policy</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
