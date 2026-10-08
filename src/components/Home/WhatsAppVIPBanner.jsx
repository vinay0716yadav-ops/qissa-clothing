import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const WhatsAppVIPBanner = () => {
  const { settings, showToast } = useStore();
  const [customerName, setCustomerName] = useState('');
  const [stylePreference, setStylePreference] = useState('Festive Couture');

  const handleJoinVip = (e) => {
    e.preventDefault();
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = `Salam / Hi Qissa! ✨\n\nI want to join the *Qissa WhatsApp VIP Club* for early drop alerts & private custom fits!\n\n👤 *My Name:* ${customerName || 'Fashion Enthusiast'}\n🎨 *Preferred Style:* ${stylePreference}\n\nPlease add me to your private VIP broadcast!`;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    showToast('Redirecting to WhatsApp VIP Concierge...', 'success');
  };

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-900 via-black to-zinc-900 text-white p-8 sm:p-12 lg:p-16 border border-zinc-800 shadow-2xl">
        
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/20 text-[#25D366] text-xs font-extrabold uppercase tracking-widest border border-[#25D366]/30">
              <MessageCircle className="w-4 h-4 fill-[#25D366] text-transparent" />
              <span>DIRECT WHATSAPP CONCIERGE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-heading tracking-tight leading-tight">
              JOIN THE QISSA VIP CIRCLE. <br />
              GET FIRST ACCESS TO DROPS.
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Never miss limited-edition drops and archived capsules. Connect directly on WhatsApp with our head stylist at <strong className="text-white font-bold">{settings.displayPhone || "+91 95459 83060"}</strong> for instant size fitting, custom colorways, and bespoke doorstep delivery.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-zinc-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> 24-Hour Early Drop Access
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> Complimentary Custom Tailoring
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> Direct Video Call Fitting Option
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10">
            <form onSubmit={handleJoinVip} className="space-y-4">
              <h3 className="font-heading text-xl uppercase tracking-wider font-black text-white">
                Instant VIP Sign Up
              </h3>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-zinc-400 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ayesha Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#25D366] transition-colors placeholder:text-zinc-500"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-zinc-400 mb-1.5">
                  Style Preference
                </label>
                <select
                  value={stylePreference}
                  onChange={(e) => setStylePreference(e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#25D366] transition-colors"
                >
                  <option value="Festive Couture & Co-ords">Festive Couture & Co-ords</option>
                  <option value="Unisex Heavyweight Streetwear">Unisex Heavyweight Streetwear</option>
                  <option value="Men's Royal Couture & Bandhgalas">Men's Royal Couture & Bandhgalas</option>
                  <option value="Pre-Draped Sarees & Silks">Pre-Draped Sarees & Silks</option>
                  <option value="All Collections">All Collections</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Connect with VIP Stylist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
