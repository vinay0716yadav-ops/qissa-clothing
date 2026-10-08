import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductFormModal } from './ProductFormModal';
import { 
  Plus, 
  Search, 
  Edit3, 
  Copy, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  XCircle,
  Eye,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export const ProductManager = () => {
  const { 
    products, 
    updateProduct, 
    deleteProduct, 
    duplicateProduct, 
    settings,
    navigateTo 
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const categories = [
    "all",
    "Co-ord Sets",
    "Streetwear & Hoodies",
    "Dresses & Anarkalis",
    "Men's Couture",
    "Sarees & Ensembles",
    "Outerwear & Jackets",
    "Bottoms & Pants"
  ];

  // Instant smooth search and filter
  const filtered = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSku = (p.sku || '').toLowerCase().includes(q);
        const matchCat = (p.category || '').toLowerCase().includes(q);
        const matchTag = (p.tag || '').toLowerCase().includes(q);
        return matchName || matchSku || matchCat || matchTag;
      }
      return true;
    });
  }, [products, selectedCategory, searchTerm]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from Qissa Label showcase?`)) {
      deleteProduct(id);
    }
  };

  const toggleInStock = (p) => {
    updateProduct(p.id, { inStock: !p.inStock });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar: Search, Category Filter, and Add Drop Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        <div className="flex flex-1 items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search title, SKU, or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black shadow-sm font-medium"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold focus:outline-none focus:border-black shadow-sm cursor-pointer"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'all' ? 'All Collections' : c}</option>
            ))}
          </select>
        </div>

        {/* Add Product Button */}
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>

      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase font-black text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Item & Visual</th>
                <th className="p-4">Category / Target</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4">Sizes & Colors</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-zinc-500">
                    No matching fits found. Click "Add New Product" to publish a new piece to the showcase.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-50/80 transition-colors">
                    
                    {/* Item and Visual */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-16 rounded-lg bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200 shadow-sm">
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-black line-clamp-1">{product.name}</div>
                          <div className="text-[11px] text-zinc-400 font-mono font-semibold">SKU: {product.sku || product.id}</div>
                          {product.tag && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-zinc-100 text-zinc-900 text-[10px] font-black rounded uppercase">
                              {product.tag}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category & Gender */}
                    <td className="p-4">
                      <div className="font-bold text-zinc-900">{product.category}</div>
                      <div className="text-xs text-zinc-500 font-medium">{product.gender}</div>
                    </td>

                    {/* Price */}
                    <td className="p-4">
                      <div className="font-black text-black">
                        {settings.currencySymbol}{product.price.toLocaleString()}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-zinc-400 line-through">
                          {settings.currencySymbol}{product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </td>

                    {/* Stock Status Toggle */}
                    <td className="p-4">
                      <button
                        onClick={() => toggleInStock(product)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                          product.inStock 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
                            : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                        }`}
                      >
                        {product.inStock ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        <span>{product.inStock ? 'In Stock' : 'Sold Out'}</span>
                      </button>
                    </td>

                    {/* Sizes and Colors */}
                    <td className="p-4">
                      <div className="text-xs text-zinc-700 font-semibold">
                        {product.sizes ? product.sizes.join(', ') : 'Standard'}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {product.colors?.map((c, i) => (
                          <span
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-zinc-300"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-2 text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => duplicateProduct(product.id)}
                          className="p-2 text-zinc-600 hover:text-black hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                          title="Duplicate Product"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add / Edit */}
      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editingProduct={editingProduct}
      />

    </div>
  );
};
