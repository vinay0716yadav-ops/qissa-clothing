import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  MessageCircle, 
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { 
    bag, 
    wishlist, 
    products, 
    settings, 
    currentPage, 
    navigateTo, 
    setIsBagOpen, 
    setIsWishlistOpen,
    setCategoryFilter,
    setGenderFilter,
    setSearchQuery,
    searchQuery
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const totalBagItems = bag.reduce((sum, item) => sum + item.quantity, 0);

  // Close search suggestion popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut: CMD+K or '/' to focus search, ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchFocused(true);
      } else if (e.key === 'Escape') {
        setSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Instant Live Search Results (Calculated as user types)
  const liveResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return products.filter(p => {
      const nameMatch = p.name.toLowerCase().includes(q);
      const catMatch = (p.category || '').toLowerCase().includes(q);
      const descMatch = (p.description || '').toLowerCase().includes(q);
      const tagMatch = (p.tag || '').toLowerCase().includes(q);
      const skuMatch = (p.sku || '').toLowerCase().includes(q);
      const colorMatch = p.colors?.some(c => c.name.toLowerCase().includes(q));
      return nameMatch || catMatch || descMatch || tagMatch || skuMatch || colorMatch;
    }).slice(0, 4);
  }, [products, searchQuery]);

  const trendingTags = [
    { label: "Silk Co-ords", category: "Co-ord Sets", gender: "Women" },
    { label: "450 GSM Hoodies", category: "Streetwear & Hoodies", gender: "Unisex" },
    { label: "Bandhgalas", category: "Men's Couture", gender: "Men" },
    { label: "Pre-Draped Sarees", category: "Sarees & Ensembles", gender: "Women" },
    { label: "Velvet Anarkalis", category: "Dresses & Anarkalis", gender: "Women" }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      navigateTo('catalog');
    }
  };

  const handleNavClick = (page, gender = 'all', category = 'all') => {
    setGenderFilter(gender);
    setCategoryFilter(category);
    setMobileMenuOpen(false);
    setSearchFocused(false);
    setHoveredNav(null);
    navigateTo(page);
  };

  const handleProductSelect = (productId) => {
    setSearchFocused(false);
    setSearchQuery('');
    navigateTo('product-detail', productId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Brand Logo - Nike / High-Fashion Typography */}
          <div className="flex items-center gap-8 lg:gap-10">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-baseline gap-2 focus:outline-none cursor-pointer"
            >
              <span className="text-3xl sm:text-4xl font-black tracking-tighter uppercase font-heading text-black group-hover:opacity-85 transition-opacity">
                QISSA LABEL
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 font-sans hidden sm:inline-block">
                ATELIER
              </span>
            </button>

            {/* Desktop Navigation Links with Nike Style */}
            <nav className="hidden lg:flex items-center gap-7">
              <button
                onClick={() => handleNavClick('catalog', 'all', 'all')}
                className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors py-2 cursor-pointer ${
                  currentPage === 'catalog' ? 'text-black' : 'text-zinc-700 hover:text-black'
                }`}
              >
                New & Featured
              </button>

              <button
                onClick={() => handleNavClick('catalog', 'Women', 'all')}
                className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-700 hover:text-black transition-colors py-2 cursor-pointer"
              >
                Women
              </button>

              <button
                onClick={() => handleNavClick('catalog', 'Men', 'all')}
                className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-700 hover:text-black transition-colors py-2 cursor-pointer"
              >
                Men
              </button>

              <button
                onClick={() => handleNavClick('catalog', 'Unisex', 'Streetwear & Hoodies')}
                className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-700 hover:text-black transition-colors py-2 cursor-pointer"
              >
                Streetwear
              </button>

              <button
                onClick={() => handleNavClick('stories')}
                className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors py-2 cursor-pointer ${
                  currentPage === 'stories' ? 'text-black font-black' : 'text-zinc-700 hover:text-black'
                }`}
              >
                The Stories
              </button>
            </nav>
          </div>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Ultra-Smooth Nike-Style Search Bar */}
            <div ref={searchContainerRef} className="relative hidden md:block w-52 lg:w-72">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative flex items-center">
                  <Search className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search drops, silk co-ords, fits... (⌘K)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    className={`w-full pl-10 pr-8 py-2 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 rounded-full border transition-all duration-200 ${
                      searchFocused 
                        ? 'bg-white border-black shadow-lg ring-2 ring-black/5 w-80 -ml-8' 
                        : 'bg-zinc-100 hover:bg-zinc-100/90 border-transparent'
                    }`}
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 text-zinc-400 hover:text-black text-xs cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="absolute right-3 text-[10px] font-bold text-zinc-400 bg-zinc-200/70 px-1.5 py-0.5 rounded pointer-events-none">
                      ⌘K
                    </span>
                  )}
                </div>
              </form>

              {/* Instant Search Results Dropdown Popover */}
              {searchFocused && (
                <div className="absolute top-full right-0 w-96 mt-2 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-4 z-50 animate-scale-up">
                  
                  {/* Live matching products preview */}
                  {liveResults.length > 0 ? (
                    <div className="space-y-3">
                      <div className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Matching Showcase Fits ({liveResults.length})</span>
                        <span className="text-[10px] text-zinc-500">Click to view</span>
                      </div>
                      <div className="divide-y divide-zinc-100 max-h-64 overflow-y-auto">
                        {liveResults.map(p => (
                          <div
                            key={p.id}
                            onClick={() => handleProductSelect(p.id)}
                            className="py-2 flex items-center gap-3 cursor-pointer hover:bg-zinc-50 p-2 rounded-xl transition-colors group"
                          >
                            <div className="w-10 h-12 rounded-lg bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200">
                              <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-black line-clamp-1 group-hover:underline">
                                {p.name}
                              </h4>
                              <div className="text-[11px] text-zinc-500">
                                {p.category} • <strong className="text-black">{settings.currencySymbol}{p.price.toLocaleString()}</strong>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-black transition-colors" />
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-zinc-100">
                        <button
                          onClick={() => {
                            setSearchFocused(false);
                            navigateTo('catalog');
                          }}
                          className="w-full text-center py-2 bg-black text-white text-xs font-extrabold uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-colors"
                        >
                          View All Results in Catalog
                        </button>
                      </div>
                    </div>
                  ) : searchQuery.trim() ? (
                    <div className="py-6 text-center text-zinc-500 text-xs">
                      No fits found matching "{searchQuery}". Try "Co-ord", "Hoodie", or "Silk".
                    </div>
                  ) : null}

                  {/* Trending tags when search query is empty */}
                  {!searchQuery.trim() && (
                    <div className="space-y-3">
                      <div className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider">
                        Trending Searches
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {trendingTags.map((t, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setCategoryFilter(t.category);
                              setGenderFilter(t.gender);
                              setSearchFocused(false);
                              navigateTo('catalog');
                            }}
                            className="px-3 py-1.5 bg-zinc-100 hover:bg-black hover:text-white rounded-full text-xs font-semibold text-zinc-700 transition-colors cursor-pointer"
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Direct WhatsApp Quick Contact Button */}
            <a
              href={`https://wa.me/${(settings.whatsappNumber || '919545983060').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 rounded-full text-xs font-bold tracking-wide transition-colors"
              title="Chat with Qissa Label Stylist"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
              <span>WhatsApp Concierge</span>
            </a>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2.5 text-zinc-700 hover:text-black rounded-full hover:bg-zinc-100 transition-colors relative cursor-pointer"
              aria-label="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-up">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Showcase Bag Button */}
            <button
              onClick={() => setIsBagOpen(true)}
              className="p-2.5 text-zinc-700 hover:text-black rounded-full hover:bg-zinc-100 transition-colors relative cursor-pointer"
              aria-label="Showcase Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalBagItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-up">
                  {totalBagItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-zinc-700 hover:text-black lg:hidden rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-100 bg-white px-6 py-6 space-y-6 shadow-xl animate-fade-in">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search Qissa Label fits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-100 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-3 font-heading text-2xl tracking-wide">
            <button
              onClick={() => handleNavClick('catalog', 'all', 'all')}
              className="text-left py-1 hover:text-zinc-500 transition-colors flex items-center justify-between"
            >
              <span>NEW & FEATURED</span>
              <ArrowRight className="w-5 h-5 text-zinc-400 font-sans" />
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Women', 'all')}
              className="text-left py-1 hover:text-zinc-500 transition-colors flex items-center justify-between"
            >
              <span>WOMEN'S COUTURE & CO-ORDS</span>
              <ArrowRight className="w-5 h-5 text-zinc-400 font-sans" />
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Men', 'all')}
              className="text-left py-1 hover:text-zinc-500 transition-colors flex items-center justify-between"
            >
              <span>MEN'S COUTURE & BANDHGALAS</span>
              <ArrowRight className="w-5 h-5 text-zinc-400 font-sans" />
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Unisex', 'Streetwear & Hoodies')}
              className="text-left py-1 hover:text-zinc-500 transition-colors flex items-center justify-between"
            >
              <span>UNISEX STREETWEAR (450 GSM)</span>
              <ArrowRight className="w-5 h-5 text-zinc-400 font-sans" />
            </button>
            <button
              onClick={() => handleNavClick('stories')}
              className="text-left py-1 hover:text-zinc-500 transition-colors flex items-center justify-between"
            >
              <span>THE STORIES JOURNAL</span>
              <ArrowRight className="w-5 h-5 text-zinc-400 font-sans" />
            </button>
          </div>

          <div className="pt-4 border-t border-zinc-100 space-y-3">
            <a
              href={`https://wa.me/${(settings.whatsappNumber || '919545983060').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white rounded-xl font-bold text-sm tracking-wide shadow-sm"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Chat & Order on WhatsApp (+91 95459 83060)</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('admin');
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider hover:text-black"
            >
              Admin Atelier Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
