import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, MessageCircle, ShoppingBag, Check, ShieldCheck, Ruler, ArrowRight } from 'lucide-react';

export const QuickViewModal = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    settings, 
    wishlist, 
    toggleWishlist, 
    addToBag, 
    getWhatsAppUrl, 
    navigateTo,
    setSizeGuideOpen
  } = useStore();

  if (!quickViewProduct) return null;

  const [selectedSize, setSelectedSize] = useState(
    quickViewProduct.sizes && quickViewProduct.sizes.length > 0 ? quickViewProduct.sizes[0] : 'Standard'
  );
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const isFavorited = wishlist.includes(quickViewProduct.id);
  const chosenColor = quickViewProduct.colors?.[selectedColorIdx] || { name: 'Default', hex: '#000' };

  const handleOrderWhatsApp = () => {
    const waUrl = getWhatsAppUrl(quickViewProduct, {
      size: selectedSize,
      color: chosenColor,
      quantity: 1
    });
    window.open(waUrl, '_blank');
  };

  const handleAddToBag = () => {
    addToBag(quickViewProduct, selectedSize, chosenColor, 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-up my-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 hover:bg-black hover:text-white rounded-full transition-colors shadow-md text-zinc-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Images */}
          <div className="p-6 bg-zinc-50 flex flex-col justify-between">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-200 shadow-inner">
              <img
                src={quickViewProduct.images[activeImageIdx] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />
              {quickViewProduct.tag && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md">
                  {quickViewProduct.tag}
                </span>
              )}
            </div>

            {/* Thumbnail list */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx ? 'border-black scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & WhatsApp Ordering */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  {quickViewProduct.subtitle || quickViewProduct.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase font-heading tracking-tight text-black mt-1">
                  {quickViewProduct.name}
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-black">
                  {settings.currencySymbol}{quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    {settings.currencySymbol}{quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  In Stock & Ready for WhatsApp Order
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Color Selection */}
              {quickViewProduct.colors && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-2">
                    Color: <span className="text-zinc-600 font-medium">{chosenColor.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {quickViewProduct.colors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          selectedColorIdx === idx ? 'border-black scale-110 ring-2 ring-black/20' : 'border-zinc-300'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {quickViewProduct.sizes && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                      Select Size
                    </span>
                    <button
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-xs text-zinc-500 hover:text-black font-semibold underline flex items-center gap-1"
                    >
                      <Ruler className="w-3.5 h-3.5" /> Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {quickViewProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                          selectedSize === size
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleOrderWhatsApp}
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm uppercase tracking-wider rounded-full transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Order on WhatsApp Now</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={handleAddToBag}
                  className="flex-1 py-3 bg-zinc-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Showcase Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 border rounded-full transition-colors ${
                    isFavorited ? 'bg-red-50 border-red-200 text-red-600' : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-600' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  navigateTo('product-detail', quickViewProduct.id);
                }}
                className="w-full text-center text-xs font-bold text-zinc-500 hover:text-black uppercase tracking-wider pt-1 flex items-center justify-center gap-1"
              >
                <span>View Full Product Details & Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
