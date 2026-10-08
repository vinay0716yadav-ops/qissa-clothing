import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Heart, MessageCircle, Eye, ShoppingBag, Check } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { 
    settings, 
    wishlist, 
    toggleWishlist, 
    navigateTo, 
    setQuickViewProduct,
    getWhatsAppUrl,
    addToBag
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const isFavorited = wishlist.includes(product.id);
  const primaryImg = product.images[0] || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80";
  const hoverImg = product.images[1] || primaryImg;

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleCardClick = (e) => {
    // Prevent triggering if clicked on action buttons
    if (e.target.closest('button') || e.target.closest('a')) return;
    navigateTo('product-detail', product.id);
  };

  const handleDirectWhatsApp = (e) => {
    e.stopPropagation();
    const targetSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard';
    const targetColor = product.colors && product.colors.length > 0 ? product.colors[selectedColorIdx] : 'Default';
    const waUrl = getWhatsAppUrl(product, { size: targetSize, color: targetColor, quantity: 1 });
    window.open(waUrl, '_blank');
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const targetSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard';
    const targetColor = product.colors && product.colors.length > 0 ? product.colors[selectedColorIdx] : 'Default';
    addToBag(product, targetSize, targetColor, 1);
  };

  return (
    <div 
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col justify-between transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] bg-zinc-100 overflow-hidden rounded-xl mb-3.5">
        
        {/* Main & Secondary Image */}
        <img
          src={isHovered && hoverImg ? hoverImg : primaryImg}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.tag && (
            <span className="px-2.5 py-1 bg-white text-black text-[10px] font-extrabold tracking-wider uppercase rounded shadow-sm">
              {product.tag}
            </span>
          )}
          {discountPercent && (
            <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold tracking-wider uppercase rounded shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isFavorited 
              ? 'bg-red-500 text-white shadow-md' 
              : 'bg-white/80 hover:bg-white text-zinc-700 hover:text-black shadow-sm'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
        </button>

        {/* Quick Actions Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={handleDirectWhatsApp}
            className="flex-1 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-1.5 transition-all"
            title="Order directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Order WhatsApp</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="p-2.5 bg-white hover:bg-zinc-100 text-black rounded-lg shadow-lg transition-colors"
            title="Add to Showcase Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-2.5 bg-black hover:bg-zinc-800 text-white rounded-lg shadow-lg transition-colors"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Fast Buy Button */}
        <div className="md:hidden absolute bottom-2 right-2 z-10">
          <button
            onClick={handleDirectWhatsApp}
            className="p-2.5 bg-[#25D366] text-white rounded-full shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
          </button>
        </div>

        {/* Stock Pill if sold out */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="px-4 py-2 bg-black text-white font-extrabold text-xs uppercase tracking-widest rounded-full">
              Made to Order / WhatsApp Only
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-1.5 px-0.5">
        
        {/* Color Swatches */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-0.5 pb-1">
            {product.colors.map((col, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIdx(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIdx === idx ? 'ring-2 ring-black ring-offset-1 scale-110' : 'border-zinc-300'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            <span className="text-[11px] text-zinc-400 font-medium ml-1">
              {product.colors.length} colors
            </span>
          </div>
        )}

        {/* Subtitle / Category */}
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          {product.subtitle || product.category}
        </div>

        {/* Title */}
        <h3 className="font-sans font-bold text-sm sm:text-base text-zinc-900 group-hover:text-black line-clamp-1">
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="font-extrabold text-sm sm:text-base text-zinc-900">
            {settings.currencySymbol}{product.price?.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-zinc-400 line-through font-medium">
              {settings.currencySymbol}{product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
