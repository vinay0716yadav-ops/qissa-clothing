import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  ArrowRight, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const BagDrawer = () => {
  const { 
    isBagOpen, 
    setIsBagOpen, 
    bag, 
    updateBagQuantity, 
    removeFromBag, 
    clearBag, 
    settings, 
    getBagWhatsAppUrl,
    navigateTo 
  } = useStore();

  const [orderNote, setOrderNote] = useState('');

  if (!isBagOpen) return null;

  const totalAmount = bag.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = bag.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    const waUrl = getBagWhatsAppUrl(orderNote);
    if (waUrl) {
      window.open(waUrl, '_blank');
      setIsBagOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h2 className="font-heading text-2xl font-black uppercase tracking-tight text-black">
              Showcase Bag ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsBagOpen(false)}
            className="p-2 hover:bg-zinc-100 rounded-full text-zinc-600 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bag Content */}
        {bag.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-black">
              Your Showcase Bag is Empty
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-xs leading-relaxed">
              Explore our handcrafted co-ords, royal couture, and heavyweight streetwear fits.
            </p>
            <button
              onClick={() => {
                setIsBagOpen(false);
                navigateTo('catalog');
              }}
              className="px-8 py-3.5 bg-black text-white font-extrabold text-xs uppercase tracking-wider rounded-full hover:bg-zinc-800 transition-colors shadow-lg"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-zinc-100">
            {bag.map((item) => (
              <div key={item.key} className="pt-4 first:pt-0 flex gap-4">
                {/* Item Thumbnail */}
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-black line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromBag(item.key)}
                        className="text-zinc-400 hover:text-red-500 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-zinc-500 font-medium">
                      Size: <span className="font-bold text-black">{item.size}</span> | Color: <span className="font-bold text-black">{item.color}</span>
                    </div>

                    <div className="text-xs text-zinc-400">
                      SKU: {item.sku || 'QIS-ITEM'}
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-zinc-200 rounded-lg">
                      <button
                        onClick={() => updateBagQuantity(item.key, -1)}
                        className="p-1 text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-l-md"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-black">{item.quantity}</span>
                      <button
                        onClick={() => updateBagQuantity(item.key, 1)}
                        className="p-1 text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-r-md"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-black text-black">
                      {settings.currencySymbol}{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Checkout via WhatsApp */}
        {bag.length > 0 && (
          <div className="p-6 border-t border-zinc-100 bg-zinc-50 space-y-4">
            
            {/* Custom note */}
            <div>
              <input
                type="text"
                placeholder="Add special delivery instructions / custom fit note..."
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs placeholder:text-zinc-400 focus:outline-none focus:border-black"
              />
            </div>

            {/* Subtotal Calculation */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-500 font-medium">
                <span>Subtotal ({totalItems} items)</span>
                <span>{settings.currencySymbol}{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-500 font-medium">
                <span>Pan-India Shipping</span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-base font-black text-black pt-2 border-t border-zinc-200">
                <span>Estimated Total</span>
                <span>{settings.currencySymbol}{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Giant WhatsApp Checkout CTA */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm uppercase tracking-wider rounded-full transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Checkout via WhatsApp ({settings.currencySymbol}{totalAmount.toLocaleString()})</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Direct Stylist Confirmation
              </span>
              <button
                onClick={clearBag}
                className="text-red-500 hover:underline"
              >
                Clear Bag
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
