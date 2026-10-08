import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  MessageCircle, 
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Sparkles
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
  const [activeDropdown, setActiveDropdown] = useState(null);
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

  const searchSuggestions = [
    { label: "Oversized Hoodies", filter: "Hoodies & Sweats" },
    { label: "Cargo Pants", filter: "Bottoms & Pants" },
    { label: "Bomber Jackets", filter: "Outerwear & Jackets" },
    { label: "Heavyweight 280 GSM Tees", filter: "Tees & Tops" },
    { label: "Raw Denim Selvedge", filter: "Heritage Fusion" }
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
    setActiveDropdown(null);
    navigateTo(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Brand Logo - Nike / High-Fashion Typography */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-baseline gap-1.5 focus:outline-none"
            >
              <span className="text-3xl sm:text-4xl font-black tracking-tighter uppercase font-heading text-black group-hover:opacity-85 transition-opacity">
                QISSA
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-400 font-sans hidden sm:inline-block">
                STUDIO
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              <button
                onClick={() => handleNavClick('catalog', 'all', 'all')}
                className={`text-sm font-bold uppercase tracking-wider transition-colors py-2 relative ${
                  currentPage === 'catalog' && !['Men', 'Women'].includes(useStore.getState?.()?.genderFilter) 
                    ? 'text-black' 
                    : 'text-zinc-700 hover:text-black'
                }`}
              >
                New & Featured
              </button>

              <button
                onClick={() => handleNavClick('catalog', 'Men', 'all')}
                className="text-sm font-bold uppercase tracking-wider text-zinc-700 hover:text-black transition-colors py-2"
              >
                Men
              </button>

              <button
                onClick={() => handleNavClick('catalog', 'Women', 'all')}
                className="text-sm font-bold uppercase tracking-wider text-zinc-700 hover:text-black transition-colors py-2"
              >
                Women
              </button>

              <button
                onClick={() => handleNavClick('catalog', 'Unisex', 'Hoodies & Sweats')}
                className="text-sm font-bold uppercase tracking-wider text-zinc-700 hover:text-black transition-colors py-2"
              >
                Streetwear
              </button>

              <button
                onClick={() => handleNavClick('stories')}
                className={`text-sm font-bold uppercase tracking-wider transition-colors py-2 ${
                  currentPage === 'stories' ? 'text-black font-extrabold' : 'text-zinc-700 hover:text-black'
                }`}
              >
                The Stories
              </button>
            </nav>
          </div>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Nike-Style Search Bar */}
            <div ref={searchContainerRef} className="relative hidden md:block w-48 lg:w-64">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative flex items-center">
                  <Search className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search drops, hoodies, fits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    className="w-full pl-10 pr-4 py-2 bg-zinc-100/80 hover:bg-zinc-100 focus:bg-white text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 rounded-full border border-transparent focus:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all duration-200"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 text-zinc-400 hover:text-black text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </form>

              {/* Search Suggestions Dropdown */}
              {searchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-4 z-50 animate-fade-in">
                  <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    Popular Searches
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {searchSuggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCategoryFilter(s.filter);
                          setSearchQuery('');
                          setSearchFocused(false);
                          navigateTo('catalog');
                        }}
                        className="px-3 py-1.5 bg-zinc-100 hover:bg-black hover:text-white rounded-full text-xs font-medium text-zinc-700 transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  {searchQuery && (
                    <div className="border-t border-zinc-100 pt-3">
                      <button
                        onClick={() => {
                          setSearchFocused(false);
                          navigateTo('catalog');
                        }}
                        className="w-full flex items-center justify-between text-xs font-semibold text-black hover:underline"
                      >
                        <span>Search all for "{searchQuery}"</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Direct WhatsApp Quick Contact Button */}
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 rounded-full text-xs font-semibold tracking-wide transition-colors"
              title="Chat with Qissa Stylist on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2.5 text-zinc-700 hover:text-black rounded-full hover:bg-zinc-100 transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Showcase Bag Button */}
            <button
              onClick={() => setIsBagOpen(true)}
              className="p-2.5 text-zinc-700 hover:text-black rounded-full hover:bg-zinc-100 transition-colors relative"
              aria-label="Showcase Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalBagItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalBagItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-zinc-700 hover:text-black lg:hidden rounded-full hover:bg-zinc-100 transition-colors"
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
                placeholder="Search collection..."
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
              onClick={() => handleNavClick('catalog', 'Men', 'all')}
              className="text-left py-1 hover:text-zinc-500 transition-colors flex items-center justify-between"
            >
              <span>MEN</span>
              <ArrowRight className="w-5 h-5 text-zinc-400 font-sans" />
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Women', 'all')}
              className="text-left py-1 hover:text-zinc-500 transition-colors flex items-center justify-between"
            >
              <span>WOMEN</span>
              <ArrowRight className="w-5 h-5 text-zinc-400 font-sans" />
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Unisex', 'all')}
              className="text-left py-1 hover:text-zinc-500 transition-colors flex items-center justify-between"
            >
              <span>UNISEX STREETWEAR</span>
              <ArrowRight className="w-5 h-5 text-zinc-400 font-sans" />
            </button>
            <button
              onClick={() => handleNavClick('stories')}
              className="text-left py-1 hover:text-zinc-500 transition-colors flex items-center justify-between"
            >
              <span>THE STORIES</span>
              <ArrowRight className="w-5 h-5 text-zinc-400 font-sans" />
            </button>
          </div>

          <div className="pt-4 border-t border-zinc-100 space-y-3">
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-xl font-bold text-sm tracking-wide shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat & Order on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('admin');
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider hover:text-black"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
