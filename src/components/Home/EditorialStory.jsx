import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Instagram } from '../UI/Icons';

export const EditorialStory = () => {
  const { settings, navigateTo } = useStore();

  return (
    <section className="py-16 sm:py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Layout: Left Narrative, Right High-Fashion Diptych */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>THE BRAND PHILOSOPHY</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase font-heading tracking-tight leading-[0.95]">
              EVERY SEAM <br />
              HAS A TALE TO TELL.
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
              <strong className="text-white font-semibold">QISSA</strong> was born from a desire to celebrate narrative in motion. We believe modern clothing shouldn't be mass-produced in cold warehouses. Instead, each drop is crafted in limited small artisan batches—from handloom Chanderi silks to 450 GSM heavyweight French terry street fits.
            </p>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
              By removing traditional checkout friction, you chat directly with our design stylists on WhatsApp for custom sizing, fabric guidance, and swift bespoke dispatch.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={settings.instagramUrl || "https://www.instagram.com/qissalabel/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Follow @qissalabel</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </a>

              <button
                onClick={() => navigateTo('stories')}
                className="px-6 py-3.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
              >
                Read The Journal
              </button>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
                  alt="Qissa Craft 1"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">01. ARTISAN WEAVE</span>
                <p className="text-xs text-zinc-300">Shuttle-loomed natural fibers that breathe with the skin.</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">02. WHATSAPP CONCIERGE</span>
                <p className="text-xs text-zinc-300">Direct ordering at +91 95459 83060 with tailored size advice.</p>
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"
                  alt="Qissa Craft 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
