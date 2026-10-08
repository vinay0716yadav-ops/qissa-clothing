import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, Trash2, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';

export const WishlistDrawer = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    products, 
    toggleWishlist, 
    addToBag, 
    getWhatsAppUrl,
    settings,
    navigateTo 
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h2 className="font-heading text-2xl font-black uppercase tracking-tight text-black">
              Saved Wishlist ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 hover:bg-zinc-100 rounded-full text-zinc-600 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {wishlistProducts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center">
              <Heart className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-black">
              No Saved Fits Yet
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-xs leading-relaxed">
              Tap the heart icon on any product to curate your private wardrobe shortlist.
            </p>
            <button
              onClick={() => {
                setIsWishlistOpen(false);
                navigateTo('catalog');
              }}
              className="px-8 py-3.5 bg-black text-white font-extrabold text-xs uppercase tracking-wider rounded-full hover:bg-zinc-800 transition-colors shadow-lg"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-zinc-100">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                {/* Image */}
                <div 
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigateTo('product-detail', product.id);
                  }}
                  className="w-20 h-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0 cursor-pointer"
                >
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 
                        onClick={() => {
                          setIsWishlistOpen(false);
                          navigateTo('product-detail', product.id);
                        }}
                        className="text-sm font-bold text-black line-clamp-1 cursor-pointer hover:underline"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-zinc-400 hover:text-red-500 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs font-semibold text-zinc-500">
                      {product.subtitle || product.category}
                    </div>

                    <div className="text-sm font-black text-black mt-1">
                      {settings.currencySymbol}{product.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        const targetSize = product.sizes?.[0] || 'Standard';
                        const targetColor = product.colors?.[0] || 'Default';
                        const waUrl = getWhatsAppUrl(product, { size: targetSize, color: targetColor, quantity: 1 });
                        window.open(waUrl, '_blank');
                      }}
                      className="flex-1 py-2 bg-[#25D366] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        const targetSize = product.sizes?.[0] || 'Standard';
                        const targetColor = product.colors?.[0] || 'Default';
                        addToBag(product, targetSize, targetColor, 1);
                      }}
                      className="p-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
