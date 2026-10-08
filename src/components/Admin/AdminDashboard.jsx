import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductFormModal } from './ProductFormModal';
import { 
  ShoppingBag, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Download, 
  Upload, 
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';

export const AdminDashboard = ({ onNavigateTab }) => {
  const { 
    products, 
    inquiries, 
    settings, 
    exportDataJson, 
    importDataJson, 
    navigateTo 
  } = useStore();

  const [modalOpen, setModalOpen] = useState(false);

  const totalProducts = products.length;
  const inStockCount = products.filter(p => p.inStock).length;
  const totalInquiries = inquiries.length;
  const heroProducts = products.filter(p => p.isHero);

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          importDataJson(event.target.result);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-black to-zinc-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-zinc-800">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              WhatsApp Orders Linked: {settings.displayPhone || "+91 95459 83060"}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wider border border-blue-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              Cloud Sync: 100% Permanent
            </div>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
            QISSA ATELIER OVERVIEW
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            All additions, cover photos, pricing, and category changes are permanently stored in the global cloud database.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 bg-white hover:bg-zinc-100 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>View Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Fits</span>
            <ShoppingBag className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black text-black">{totalProducts}</div>
          <p className="text-[11px] text-zinc-500">Across 6+ capsules</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Ready to Dispatch</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">{inStockCount}</div>
          <p className="text-[11px] text-zinc-500">{Math.round((inStockCount / totalProducts) * 100)}% in active inventory</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">WhatsApp Clicks</span>
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
          </div>
          <div className="text-3xl font-black text-black">{totalInquiries}</div>
          <p className="text-[11px] text-zinc-500">Customer checkout leads</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Hero Drops</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-black">{heroProducts.length}</div>
          <p className="text-[11px] text-zinc-500">Featured in top campaigns</p>
        </div>

      </div>

      {/* Grid: Recent Products + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Recent Drops Showcase */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <h3 className="font-heading text-xl font-black uppercase tracking-wide text-black">
              Showcase Catalog ({products.length})
            </h3>
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-black flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-zinc-100 space-y-3">
            {products.slice(0, 5).map(product => (
              <div key={product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 rounded-lg bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200">
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-black line-clamp-1">{product.name}</h4>
                    <div className="text-[11px] text-zinc-500">
                      {product.category} • {product.gender}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-black text-xs sm:text-sm text-black">
                    {settings.currencySymbol}{product.price.toLocaleString()}
                  </div>
                  <span className={`text-[10px] font-bold uppercase ${product.inStock ? 'text-emerald-600' : 'text-red-500'}`}>
                    {product.inStock ? 'In Stock' : 'Sold Out'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Tools & Data Backup */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
          <h3 className="font-heading text-xl font-black uppercase tracking-wide text-black pb-3 border-b border-zinc-100">
            Catalog Tools & Backup
          </h3>

          <div className="space-y-3">
            <button
              onClick={exportDataJson}
              className="w-full py-3 px-4 bg-zinc-100 hover:bg-zinc-200 text-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4 text-zinc-600" />
                <span>Export Catalog (JSON)</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleImportClick}
              className="w-full py-3 px-4 bg-zinc-100 hover:bg-zinc-200 text-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-zinc-600" />
                <span>Import Catalog (JSON)</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">
              Direct WhatsApp Ordering Desk
            </span>
            <div className="text-sm font-black text-black">
              {settings.displayPhone || "+91 95459 83060"}
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Customers click "Order on WhatsApp" to receive instant pre-formatted order details for swift confirmation.
            </p>
          </div>
        </div>

      </div>

      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

    </div>
  );
};
