import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  X, 
  Check, 
  Grid, 
  LayoutGrid, 
  Sparkles,
  Search,
  RotateCcw
} from 'lucide-react';

export const CatalogPage = () => {
  const { 
    products, 
    categories,
    settings, 
    categoryFilter, 
    setCategoryFilter, 
    genderFilter, 
    setGenderFilter,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [showFilters, setShowFilters] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'newest', 'rating'
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [gridCols, setGridCols] = useState(3); // 2, 3, or 4 cols

  const allCategories = useMemo(() => ["all", ...categories], [categories]);

  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "38 (S)", "40 (M)", "42 (L)", "44 (XL)"];

  // Ultra-Smooth Filter & Search Computation
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search matching across multiple fields
      if (searchQuery && searchQuery.trim()) {
        const queryTerms = searchQuery.toLowerCase().trim().split(/\s+/);
        const searchableText = `${p.name} ${p.category} ${p.subtitle || ''} ${p.description || ''} ${p.tag || ''} ${p.fabric || ''} ${p.sku || ''} ${(p.colors || []).map(c => c.name).join(' ')}`.toLowerCase();
        
        const allTermsMatch = queryTerms.every(term => searchableText.includes(term));
        if (!allTermsMatch) return false;
      }

      // Category Filter
      if (categoryFilter !== 'all' && p.category !== categoryFilter) {
        return false;
      }

      // Gender Filter
      if (genderFilter !== 'all' && p.gender !== genderFilter && p.gender !== 'Unisex') {
        return false;
      }

      // Size Filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = p.sizes?.some(s => selectedSizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // Max Price Filter
      if (p.price > maxPrice) {
        return false;
      }

      // In-Stock Only
      if (inStockOnly && !p.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      if (sortBy === 'newest') return (b.id > a.id ? 1 : -1);
      return 0; // featured default
    });
  }, [products, categoryFilter, genderFilter, searchQuery, selectedSizes, maxPrice, inStockOnly, sortBy]);

  // Compute product count per category dynamically
  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    allCategories.forEach(cat => {
      if (cat !== 'all') {
        counts[cat] = products.filter(p => p.category === cat).length;
      }
    });
    return counts;
  }, [products]);

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setCategoryFilter('all');
    setGenderFilter('all');
    setSearchQuery('');
    setSelectedSizes([]);
    setMaxPrice(15000);
    setInStockOnly(false);
  };

  const activeFiltersCount = (categoryFilter !== 'all' ? 1 : 0) + 
    (genderFilter !== 'all' ? 1 : 0) + 
    (searchQuery.trim() ? 1 : 0) + 
    selectedSizes.length + 
    (inStockOnly ? 1 : 0) +
    (maxPrice < 15000 ? 1 : 0);

  return (
    <div className="bg-white min-h-screen py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row - Nike High-Fashion Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-100">
          <div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 mb-1 flex items-center gap-2">
              <span>QISSA LABEL SHOWCASE</span>
              <span>•</span>
              <span className="text-black font-black">{filteredProducts.length} Fits Available</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-heading tracking-tight text-black">
              {categoryFilter === 'all' 
                ? (genderFilter === 'all' ? 'All Showcase Apparel' : `${genderFilter}'s Collection`) 
                : categoryFilter}
            </h1>
          </div>

          {/* Controls: Filter Toggle, Sort, Grid View */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            
            {/* Desktop Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-zinc-800 hover:text-black border border-zinc-200 rounded-full hover:bg-zinc-50 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-zinc-800 border border-zinc-200 rounded-full hover:bg-zinc-50 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-9 py-2 bg-zinc-100 hover:bg-zinc-200 text-xs font-extrabold uppercase tracking-wider text-black rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-black transition-colors"
              >
                <option value="featured">Sort By: Featured</option>
                <option value="newest">Sort By: Newest Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
            </div>

            {/* Desktop Grid Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-zinc-100 p-1 rounded-full border border-zinc-200">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${gridCols === 2 ? 'bg-white shadow-sm text-black' : 'text-zinc-500 hover:text-black'}`}
                title="2 Columns"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${gridCols === 3 ? 'bg-white shadow-sm text-black' : 'text-zinc-500 hover:text-black'}`}
                title="3 Columns"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4 pb-2">
            <span className="text-xs font-bold text-zinc-400 mr-1">Active:</span>
            
            {categoryFilter !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-black rounded-full text-xs font-semibold">
                Category: {categoryFilter}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setCategoryFilter('all')} />
              </span>
            )}

            {genderFilter !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-black rounded-full text-xs font-semibold">
                Gender: {genderFilter}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setGenderFilter('all')} />
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-black rounded-full text-xs font-semibold">
                Search: "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setSearchQuery('')} />
              </span>
            )}

            {selectedSizes.map(s => (
              <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-black rounded-full text-xs font-semibold">
                Size: {s}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => toggleSize(s)} />
              </span>
            ))}

            {maxPrice < 15000 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-black rounded-full text-xs font-semibold">
                Under {settings.currencySymbol}{maxPrice.toLocaleString()}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setMaxPrice(15000)} />
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-black rounded-full text-xs font-semibold">
                In Stock Only
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setInStockOnly(false)} />
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-red-600 hover:underline ml-2 cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="flex gap-8 pt-8">
          
          {/* Desktop Left Filter Sidebar */}
          {showFilters && (
            <aside className="hidden lg:block w-64 shrink-0 space-y-8 pr-4 select-none">
              
              {/* Gender Tabs */}
              <div>
                <h3 className="font-heading text-lg font-black tracking-wide uppercase text-black mb-3">
                  Gender & Fit
                </h3>
                <div className="flex flex-col space-y-2">
                  {['all', 'Women', 'Men', 'Unisex'].map(g => (
                    <label key={g} className="flex items-center gap-2.5 text-xs sm:text-sm cursor-pointer hover:text-black">
                      <input
                        type="radio"
                        name="gender"
                        checked={genderFilter === g}
                        onChange={() => setGenderFilter(g)}
                        className="accent-black w-4 h-4 cursor-pointer"
                      />
                      <span className={genderFilter === g ? 'font-black text-black' : 'text-zinc-600 font-medium'}>
                        {g === 'all' ? 'All Showcase Genders' : g}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="pt-6 border-t border-zinc-100">
                <h3 className="font-heading text-lg font-black tracking-wide uppercase text-black mb-3">
                  Capsules & Collections
                </h3>
                <div className="flex flex-col space-y-1.5">
                  {allCategories.map(cat => {
                    const count = categoryCounts[cat] || 0;
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`flex items-center justify-between text-left text-xs sm:text-sm py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                          categoryFilter === cat 
                            ? 'bg-zinc-100 font-black text-black' 
                            : 'text-zinc-600 hover:text-black font-medium hover:bg-zinc-50'
                        }`}
                      >
                        <span>{cat === 'all' ? 'All Collections' : cat}</span>
                        <span className="text-[11px] text-zinc-400 font-mono">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizes */}
              <div className="pt-6 border-t border-zinc-100">
                <h3 className="font-heading text-lg font-black tracking-wide uppercase text-black mb-3">
                  Size Filter
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {allSizes.map(size => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-6 border-t border-zinc-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-lg font-black tracking-wide uppercase text-black">
                    Max Price
                  </h3>
                  <span className="text-xs font-black text-black">
                    {settings.currencySymbol}{maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-semibold mt-1">
                  <span>{settings.currencySymbol}1,500</span>
                  <span>{settings.currencySymbol}15,000+</span>
                </div>
              </div>

              {/* In-Stock Only Toggle */}
              <div className="pt-6 border-t border-zinc-100">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-black w-4 h-4 rounded"
                  />
                  <span className="text-xs sm:text-sm font-bold text-zinc-800">
                    Ready to Dispatch Only
                  </span>
                </label>
              </div>

            </aside>
          )}

          {/* Product Grid */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center space-y-4 bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
                <Sparkles className="w-10 h-10 text-zinc-400 mx-auto" />
                <h3 className="font-heading text-3xl font-black uppercase tracking-tight text-black">
                  No Matching Fits Found
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
                  We couldn't find any fits matching {searchQuery.trim() ? `"${searchQuery}" and ` : ''}your current filter combination. Try resetting your filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-black text-white font-extrabold text-xs uppercase tracking-wider rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-x-6 gap-y-10 ${
                gridCols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 
                gridCols === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <h2 className="font-heading text-2xl font-black uppercase tracking-wide">
                  Filters & Sorting
                </h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-400 mb-3">
                  Collection / Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase cursor-pointer ${
                        categoryFilter === cat ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      {cat === 'all' ? 'All' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-400 mb-3">
                  Available Sizes
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                        selectedSizes.includes(size) ? 'bg-black text-white border-black' : 'bg-white text-zinc-700 border-zinc-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 text-xs font-bold uppercase tracking-wider border border-zinc-300 rounded-xl cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
