import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Truck, MessageCircle, ShieldCheck, Sparkles, Scissors, Clock } from 'lucide-react';

export const BrandFeatures = () => {
  const { settings } = useStore();

  const features = [
    {
      icon: MessageCircle,
      title: "1-CLICK WHATSAPP ORDER",
      description: "Direct checkout to +91 95459 83060. No complex forms or carts required.",
      color: "text-emerald-500"
    },
    {
      icon: Scissors,
      title: "CUSTOM TAILORED FIT",
      description: "Share your exact chest and waist measurements on WhatsApp for complimentary custom adjustments.",
      color: "text-amber-500"
    },
    {
      icon: Truck,
      title: "FREE EXPRESS SHIPPING",
      description: "Complimentary door-to-door express delivery across all pin codes in India.",
      color: "text-blue-500"
    },
    {
      icon: Sparkles,
      title: "LIMITED SMALL BATCHES",
      description: "Every capsule is produced in numbered small runs to ensure rare exclusivity.",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-12 sm:py-16 border-y border-zinc-100 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => {
            const IconComponent = f.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white shadow-sm border border-zinc-200/60 shrink-0">
                  <IconComponent className={`w-6 h-6 ${f.color}`} />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-black tracking-wide text-zinc-900 uppercase">
                    {f.title}
                  </h4>
                  <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
