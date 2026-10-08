import React, { useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../Catalog/ProductCard';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export const TrendingCarousel = ({ title = "TRENDING NOW", subtitle = "Handcrafted Essentials & Cult Favorites" }) => {
  const { products, navigateTo } = useStore();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const trendingProducts = products.slice(0, 6);

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Nike-Style Action Arrows */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-heading tracking-tight text-black mt-1">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-black transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-black transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {trendingProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[280px] sm:min-w-[320px] max-w-[320px] flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Explore Full Catalog Link */}
      <div className="mt-6 text-center sm:text-right">
        <button
          onClick={() => navigateTo('catalog')}
          className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-black hover:underline"
        >
          <span>Explore All {products.length} Showcase Fits</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
