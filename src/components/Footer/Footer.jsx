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
        
        {/* Main 4-Column Grid - Nike Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Col 1: Bold Quick Actions */}
          <div className="space-y-3 font-heading text-lg sm:text-xl font-black uppercase tracking-wider text-white">
            <button 
              onClick={() => handleLink('all', 'all')}
              className="block text-left hover:text-zinc-400 transition-colors"
            >
              EXPLORE ALL DROPS
            </button>
            <button 
              onClick={() => handleLink('Co-ord Sets', 'Women')}
              className="block text-left hover:text-zinc-400 transition-colors"
            >
              FESTIVE CO-ORDS
            </button>
            <button 
              onClick={() => handleLink('Streetwear & Hoodies', 'Unisex')}
              className="block text-left hover:text-zinc-400 transition-colors"
            >
              HEAVY STREETWEAR
            </button>
            <button 
              onClick={() => handleLink("Men's Couture", 'Men')}
              className="block text-left hover:text-zinc-400 transition-colors"
            >
              MEN'S COUTURE
            </button>
            <button 
              onClick={() => setSizeGuideOpen(true)}
              className="block text-left hover:text-zinc-400 transition-colors"
            >
              OFFICIAL SIZE GUIDE
            </button>
            <button 
              onClick={() => navigateTo('admin')}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors text-sm font-sans font-bold"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>ADMIN CATALOG PANEL</span>
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
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Order Tracking</span>
                </a>
              </li>
              <li>
                <button onClick={() => setSizeGuideOpen(true)} className="hover:text-white transition-colors">
                  Garment Measurements & Fits
                </button>
              </li>
              <li>
                <span className="text-zinc-500">Pan-India Express Dispatch (Free)</span>
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

          {/* Col 3: About Qissa */}
          <div className="space-y-3 text-xs">
            <h4 className="font-heading text-base font-black tracking-widest text-zinc-400 uppercase">
              THE BRAND
            </h4>
            <ul className="space-y-2.5 text-zinc-400 font-medium">
              <li>
                <button onClick={() => navigateTo('stories')} className="hover:text-white transition-colors">
                  The Story of Qissa
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
                <span className="text-zinc-500">Curated by @qissalabel</span>
              </li>
            </ul>
          </div>

          {/* Col 4 & 5: Brand Identity, Location & WhatsApp Desk */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <span className="text-3xl font-black font-heading tracking-tighter text-white">
                QISSA
              </span>
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                Contemporary apparel & artisanal couture celebrating the beauty of personal storytelling. Built with zero-friction direct WhatsApp ordering.
              </p>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Official WhatsApp Line
                </span>
                <span className="text-[11px] text-zinc-400">Available Daily</span>
              </div>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base font-black text-white hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>{settings.displayPhone || "+91 95459 83060"}</span>
              </a>
            </div>

            {/* Social handles */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={settings.instagramUrl || "https://www.instagram.com/qissalabel/"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-pink-400 transition-colors"
                title="Follow @qissalabel on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-emerald-400 transition-colors"
                title="WhatsApp Us"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <span className="text-xs text-zinc-400 font-semibold">
                Instagram: <a href={settings.instagramUrl || "https://www.instagram.com/qissalabel/"} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">@qissalabel</a>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer - Nike Style */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-zinc-300 font-bold">
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>India ({settings.currencyCode || 'INR'} {settings.currencySymbol || '₹'})</span>
            </span>
            <span>•</span>
            <span>© {new Date().getFullYear()} QISSA LABEL. All Rights Reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Guides</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Terms of Sale</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Privacy Policy</span>
            <button 
              onClick={() => navigateTo('admin')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Admin Login
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
