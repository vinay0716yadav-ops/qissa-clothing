import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../Catalog/ProductCard';
import { 
  Heart, 
  MessageCircle, 
  ShoppingBag, 
  Ruler, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles,
  Scissors,
  Share2,
  ArrowLeft
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { 
    activeProductId, 
    products, 
    settings, 
    wishlist, 
    toggleWishlist, 
    addToBag, 
    getWhatsAppUrl, 
    navigateTo,
    setSizeGuideOpen,
    showToast
  } = useStore();

  const product = products.find(p => p.id === activeProductId) || products[0];

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [customNote, setCustomNote] = useState('');
  const [openAccordions, setOpenAccordions] = useState({
    story: true,
    fabric: true,
    fit: false,
    delivery: false
  });

  // Set initial size when product changes
  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    setActiveImageIdx(0);
    setSelectedColorIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product?.id]);

  if (!product) return null;

  const isFavorited = wishlist.includes(product.id);
  const chosenColor = product.colors?.[selectedColorIdx] || { name: 'Default', hex: '#000' };

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOrderWhatsApp = () => {
    const waUrl = getWhatsAppUrl(product, {
      size: selectedSize || (product.sizes?.[0] || 'Standard'),
      color: chosenColor,
      quantity: 1,
      customNote
    });
    window.open(waUrl, '_blank');
  };

  const handleAddToBag = () => {
    addToBag(product, selectedSize || (product.sizes?.[0] || 'Standard'), chosenColor, 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `QISSA - ${product.name}`,
        text: `Check out ${product.name} on Qissa Showcase`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'success');
    }
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-6">
          <button
            onClick={() => navigateTo('catalog')}
            className="flex items-center gap-1.5 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Showcase Drops</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-black transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Fit</span>
          </button>
        </div>

        {/* Main Product Section: Left Imagery Grid, Right Sticky Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Nike-Style Gallery (Multi-Image Grid) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Featured Photo */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 shadow-md">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {product.tag && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 bg-black text-white text-xs font-black tracking-wider uppercase rounded-md shadow-md">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row / Secondary Angles */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`aspect-[4/5] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIdx === idx 
                        ? 'border-black scale-105 shadow-md ring-2 ring-black/10' 
                        : 'border-transparent opacity-65 hover:opacity-100 bg-zinc-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Visual 3-Step WhatsApp Ordering Banner */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 mt-6">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                <MessageCircle className="w-4 h-4 fill-emerald-600 text-transparent" />
                <span>HOW TO ORDER ON WHATSAPP IN 3 STEPS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-white rounded-xl border border-zinc-200/60 text-xs">
                  <strong className="block text-black font-bold mb-1">1. Pick Size & Color</strong>
                  <span className="text-zinc-500">Choose your fit above and select your preferred colorway.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-zinc-200/60 text-xs">
                  <strong className="block text-black font-bold mb-1">2. Click WhatsApp Order</strong>
                  <span className="text-zinc-500">Auto-generates a pre-filled message with product SKU and size.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-zinc-200/60 text-xs">
                  <strong className="block text-black font-bold mb-1">3. Chat with Stylist</strong>
                  <span className="text-zinc-500">Confirm delivery address, payment mode (UPI/Card/COD), and custom alterations!</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Product Purchase Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-500">
                {product.subtitle || product.category} • SKU: {product.sku || product.id}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-heading tracking-tight text-black mt-1 leading-[0.95]">
                {product.name}
              </h1>

              {/* Price & Rating */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl sm:text-3xl font-black text-black">
                  {settings.currencySymbol}{product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-base text-zinc-400 line-through">
                      {settings.currencySymbol}{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
                      SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                Inclusive of all taxes • Free express shipping Pan-India
              </p>
            </div>

            {/* Colorway Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="pt-2 border-t border-zinc-100">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-black">
                    Color: <span className="font-medium text-zinc-600">{chosenColor.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`relative w-8 h-8 rounded-full transition-all cursor-pointer ${
                        selectedColorIdx === idx 
                          ? 'ring-2 ring-black ring-offset-2 scale-110 shadow-sm' 
                          : 'border border-zinc-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColorIdx === idx && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check className={`w-3.5 h-3.5 ${['#111111', '#181818', '#0B4F3A', '#621226'].includes(c.hex) ? 'text-white' : 'text-black'}`} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pt-2 border-t border-zinc-100">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-black">
                    Select Size
                  </span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-xs text-zinc-600 hover:text-black font-semibold underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom note for WhatsApp order */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                Special Customization / Delivery Note (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Need length customized / Gift packaging please"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black"
              />
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Giant Order on WhatsApp Button */}
              <button
                onClick={handleOrderWhatsApp}
                className="w-full py-4 sm:py-5 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm sm:text-base uppercase tracking-wider rounded-full transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-transparent" />
                <span>Order on WhatsApp ({settings.currencySymbol}{product.price.toLocaleString()})</span>
              </button>

              {/* Add to Showcase Bag & Wishlist Row */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToBag}
                  className="flex-1 py-4 bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Showcase Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 border rounded-full transition-colors cursor-pointer ${
                    isFavorited 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:text-black'
                  }`}
                  aria-label="Wishlist"
                  title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* Stylist Concierge Direct Phone Note */}
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80 flex items-center justify-between text-xs">
              <span className="text-zinc-600 font-medium">WhatsApp Concierge Desk:</span>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 hover:underline"
              >
                {settings.displayPhone || "+91 95459 83060"}
              </a>
            </div>

            {/* Accordions: Story, Fabric & Care, Size Advice, Shipping */}
            <div className="divide-y divide-zinc-200 pt-4">
              
              {/* Accordion 1: The Product Story */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('story')}
                  className="w-full flex items-center justify-between text-left font-heading text-xl uppercase font-black text-black cursor-pointer"
                >
                  <span>The Craft & Narrative</span>
                  {openAccordions.story ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {openAccordions.story && (
                  <div className="pt-3 text-xs sm:text-sm text-zinc-600 leading-relaxed space-y-2">
                    <p>{product.description}</p>
                    {product.story && (
                      <p className="italic text-zinc-700 font-serif border-l-2 border-amber-400 pl-3 py-1">
                        "{product.story}"
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: Fabric & Care */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full flex items-center justify-between text-left font-heading text-xl uppercase font-black text-black cursor-pointer"
                >
                  <span>Fabric & Care Instructions</span>
                  {openAccordions.fabric ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {openAccordions.fabric && (
                  <div className="pt-3 text-xs sm:text-sm text-zinc-600 space-y-2">
                    <div>
                      <strong className="text-black font-semibold block">Material Composition:</strong>
                      <span>{product.fabric || "Premium Handcrafted Textile"}</span>
                    </div>
                    <div>
                      <strong className="text-black font-semibold block">Care Guidance:</strong>
                      <span>{product.care || "Dry clean or gentle cold wash inside out."}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Fit & Sizing Advice */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('fit')}
                  className="w-full flex items-center justify-between text-left font-heading text-xl uppercase font-black text-black cursor-pointer"
                >
                  <span>Silhouette & Fit Advice</span>
                  {openAccordions.fit ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {openAccordions.fit && (
                  <div className="pt-3 text-xs sm:text-sm text-zinc-600 space-y-2">
                    <p>{product.fit || "True to size tailored fit. Contact on WhatsApp for custom measurements."}</p>
                    <p className="text-zinc-500">
                      Our models are 5'10" wearing size Small (Women) and 6'1" wearing size Large (Men).
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Delivery & WhatsApp Returns */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full flex items-center justify-between text-left font-heading text-xl uppercase font-black text-black cursor-pointer"
                >
                  <span>Shipping & WhatsApp Assistance</span>
                  {openAccordions.delivery ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {openAccordions.delivery && (
                  <div className="pt-3 text-xs sm:text-sm text-zinc-600 space-y-2 leading-relaxed">
                    <p>• <strong>Pan-India Express:</strong> Dispatches within 24-48 hours. Delivered in 3-5 business days.</p>
                    <p>• <strong>Worldwide Shipping:</strong> Available on request via WhatsApp.</p>
                    <p>• <strong>Hassle-free Exchange:</strong> Contact our WhatsApp support within 7 days of delivery for size replacement.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Complete The Look / Related Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-zinc-100">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                CURATED RECOMMENDATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase font-heading tracking-tight text-black mt-1">
                COMPLETE THE LOOK
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
