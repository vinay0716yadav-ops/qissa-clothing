import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Plus, Trash2, Image, Sparkles, Check, Link, AlertCircle, Upload, Loader2 } from 'lucide-react';
import { processImageFile } from '../../utils/imageOptimizer';

export const ProductFormModal = ({ isOpen, onClose, editingProduct = null }) => {
  const { addProduct, updateProduct, settings, showToast, categories, addCategory } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    subtitle: '',
    category: 'Co-ord Sets',
    gender: 'Women',
    tag: 'NEW DROP',
    price: 3999,
    originalPrice: 4999,
    inStock: true,
    isHero: false,
    description: '',
    story: '',
    fabric: '100% Handcrafted Textile',
    care: 'Dry clean or gentle cold wash.',
    fit: 'Relaxed tailored fit.',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Royal Emerald', hex: '#0B4F3A' }
    ]
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#111111');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const photoInputRef = useRef(null);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        ...editingProduct,
        images: editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'],
        sizes: editingProduct.sizes || ['S', 'M', 'L'],
        colors: editingProduct.colors || [{ name: 'Default', hex: '#111111' }]
      });
    } else {
      setFormData({
        name: '',
        sku: 'QL-' + Math.floor(100 + Math.random() * 900),
        subtitle: "Women's Luxury Festive Drop",
        category: 'Co-ord Sets',
        gender: 'Women',
        tag: 'NEW DROP',
        price: 4999,
        originalPrice: 6499,
        inStock: true,
        isHero: false,
        description: 'Handcrafted luxury piece cut with contemporary lines.',
        story: 'Woven using traditional techniques with modern minimalism.',
        fabric: 'Pure Handloom Chanderi Cotton-Silk Blend',
        care: 'Dry clean only.',
        fit: 'True to size tailored fit.',
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
          { name: 'Onyx Black', hex: '#111111' },
          { name: 'Royal Emerald', hex: '#0B4F3A' }
        ]
      });
    }
    setErrorMessage('');
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const standardSizes = ["XS", "S", "M", "L", "XL", "XXL", "38 (S)", "40 (M)", "42 (L)", "44 (XL)"];

  // Quick preset fashion photo library curated for Qissa Label
  const curatedFashionImages = [
    { label: "Emerald Silk Co-ord", url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80" },
    { label: "Ruby Velvet Ensemble", url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80" },
    { label: "Pre-Draped Festive Saree", url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80" },
    { label: "450 GSM Black Hoodie", url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80" },
    { label: "Pure Linen Summer Co-ord", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80" },
    { label: "Men's Silk Bandhgala", url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80" },
    { label: "13.5oz Selvedge Denim", url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80" }
  ];

  const handleSizeToggle = (size) => {
    setFormData(prev => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
      };
    });
  };

  const handleAddImage = (urlToAdd) => {
    const targetUrl = urlToAdd || newImageUrl.trim();
    if (targetUrl) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, targetUrl]
      }));
      setNewImageUrl('');
    }
  };

  const handleFileUploadChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploadingPhoto(true);
    try {
      const optimizedUrls = [];
      for (const file of files) {
        const optimized = await processImageFile(file, 1400, 0.82);
        optimizedUrls.push(optimized);
      }
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...optimizedUrls]
      }));
      showToast(`Uploaded & optimized ${files.length} photo(s)!`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to upload photo', 'error');
    } finally {
      setIsUploadingPhoto(false);
      if (photoInputRef.current) photoInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (idx) => {
    if (formData.images.length === 1) {
      showToast('At least one primary image is required', 'error');
      return;
    }
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  };

  const handleAddColor = () => {
    if (newColorName.trim()) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, { name: newColorName.trim(), hex: newColorHex }]
      }));
      setNewColorName('');
      setNewColorHex('#111111');
    }
  };

  const handleRemoveColor = (idx) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage('Product title is required.');
      return;
    }
    if (!formData.price || formData.price <= 0) {
      setErrorMessage('Please provide a valid sale price.');
      return;
    }
    if (formData.images.length === 0) {
      setErrorMessage('Please add at least one product photography image.');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-up my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
              QISSA LABEL ATELIER ADMIN
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
              {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Clothing Drop'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 rounded-full text-zinc-600 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error notification banner */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Row 1: Name, SKU, Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Qissa Label 'Noor' Chanderi Silk Co-ord Set"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
                SKU / Identifier
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black uppercase font-mono"
              />
            </div>
          </div>

          {/* Row 2: Subtitle, Category, Gender, Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                placeholder="e.g. Women's Luxury Drop"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-700">
                  Category *
                </label>
                {!isCreatingCategory && (
                  <button
                    type="button"
                    onClick={() => setIsCreatingCategory(true)}
                    className="text-[10px] font-black text-amber-600 hover:text-black uppercase tracking-wider cursor-pointer"
                  >
                    + New Category
                  </button>
                )}
              </div>

              {isCreatingCategory ? (
                <div className="flex items-center gap-1.5 animate-fade-in">
                  <input
                    type="text"
                    placeholder="e.g. Bridal Wear"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-amber-400 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newCategoryName.trim()) {
                        addCategory(newCategoryName.trim());
                        setFormData({ ...formData, category: newCategoryName.trim() });
                        setNewCategoryName('');
                        setIsCreatingCategory(false);
                      }
                    }}
                    className="px-2.5 py-2 bg-black text-white text-[11px] font-black rounded-lg hover:bg-zinc-800 uppercase"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingCategory(false);
                      setNewCategoryName('');
                    }}
                    className="px-2 py-2 bg-zinc-200 text-zinc-600 text-[11px] font-bold rounded-lg hover:bg-zinc-300"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <select
                  value={formData.category}
                  onChange={(e) => {
                    if (e.target.value === '__add_new__') {
                      setIsCreatingCategory(true);
                    } else {
                      setFormData({ ...formData, category: e.target.value });
                    }
                  }}
                  className="w-full px-3.5 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black font-semibold bg-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="__add_new__" className="font-bold text-amber-600">
                    ➕ + Add New Category...
                  </option>
                </select>
              )}
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
                Gender Target
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black"
              >
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
                Badge Tag
              </label>
              <select
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black"
              >
                <option value="NEW DROP">NEW DROP</option>
                <option value="BEST SELLER">BEST SELLER</option>
                <option value="LIMITED EDITION">LIMITED EDITION</option>
                <option value="ICONIC FIT">ICONIC FIT</option>
                <option value="JUST IN">JUST IN</option>
                <option value="">No Badge</option>
              </select>
            </div>
          </div>

          {/* Row 3: Pricing & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
                Sale Price ({settings.currencySymbol}) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-zinc-300 rounded-xl text-sm font-bold focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
                Original MRP ({settings.currencySymbol})
              </label>
              <input
                type="number"
                min="0"
                value={formData.originalPrice || ''}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 accent-black rounded cursor-pointer"
                />
                <span className="text-xs font-black uppercase text-zinc-800">In Stock</span>
              </label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isHero}
                  onChange={(e) => setFormData({ ...formData, isHero: e.target.checked })}
                  className="w-4 h-4 accent-black rounded cursor-pointer"
                />
                <span className="text-xs font-black uppercase text-zinc-800">Hero Drop</span>
              </label>
            </div>
          </div>

          {/* Row 4: Descriptions & Story */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
                Product Description
              </label>
              <textarea
                rows="2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black leading-relaxed"
                placeholder="Details on silhouette, weave, and key highlights..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
                  Fabric & Material
                </label>
                <input
                  type="text"
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  className="w-full px-3.5 py-2 border border-zinc-300 rounded-xl text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
                  Care Instructions
                </label>
                <input
                  type="text"
                  value={formData.care}
                  onChange={(e) => setFormData({ ...formData, care: e.target.value })}
                  className="w-full px-3.5 py-2 border border-zinc-300 rounded-xl text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">
                  Fit Guidance
                </label>
                <input
                  type="text"
                  value={formData.fit}
                  onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                  className="w-full px-3.5 py-2 border border-zinc-300 rounded-xl text-xs focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Sizes Selection */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-2">
              Available Sizes (Click to toggle)
            </label>
            <div className="flex flex-wrap gap-2">
              {standardSizes.map(size => {
                const isSelected = formData.sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-black text-white border-black shadow'
                        : 'bg-zinc-100 text-zinc-600 border-transparent hover:border-zinc-300'
                    }`}
                  >
                    {size} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colors */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-700">
              Color Variants & Swatches
            </label>
            
            {/* List of active colors */}
            <div className="flex flex-wrap gap-2">
              {formData.colors.map((c, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-zinc-200 shadow-sm text-xs font-semibold">
                  <span className="w-3.5 h-3.5 rounded-full border border-zinc-300" style={{ backgroundColor: c.hex }} />
                  <span>{c.name}</span>
                  <button type="button" onClick={() => handleRemoveColor(idx)} className="text-zinc-400 hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new color input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="w-9 h-9 p-0 border border-zinc-300 rounded-lg cursor-pointer bg-white"
              />
              <input
                type="text"
                placeholder="Color Name (e.g. Royal Emerald)"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                className="flex-1 px-3.5 py-2 border border-zinc-300 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="px-4 py-2 bg-black text-white text-xs font-bold uppercase rounded-xl hover:bg-zinc-800 cursor-pointer"
              >
                Add Color
              </button>
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-700">
                  Product Photography ({formData.images.length} photos) *
                </label>
                <span className="text-[11px] text-zinc-500">Upload photos from device or paste direct image URLs</span>
              </div>
              
              {/* Device Photo Upload Button */}
              <div>
                <input
                  type="file"
                  ref={photoInputRef}
                  accept="image/*"
                  multiple
                  onChange={handleFileUploadChange}
                  className="hidden"
                  id="product-photo-upload"
                />
                <label
                  htmlFor="product-photo-upload"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm ${
                    isUploadingPhoto ? 'opacity-70 pointer-events-none' : ''
                  }`}
                >
                  {isUploadingPhoto ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>Optimizing Photo...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photos from Device</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Image Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 group border border-zinc-200 shadow-sm">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Remove photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded shadow">
                      ★ Cover Photo
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Add Custom URL */}
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Or paste image URL (https://...)"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 px-3.5 py-2 border border-zinc-300 rounded-xl text-xs"
              />
              <button
                type="button"
                onClick={() => handleAddImage()}
                className="px-5 py-2 bg-zinc-800 text-white text-xs font-bold uppercase rounded-xl hover:bg-black cursor-pointer"
              >
                Add URL
              </button>
            </div>

            {/* 1-Click Curated Presets */}
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                Quick 1-Click Editorial Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {curatedFashionImages.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddImage(preset.url)}
                    className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> {preset.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </form>

        {/* Footer Actions */}
        <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-zinc-300 text-zinc-700 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-zinc-800 shadow-lg cursor-pointer"
          >
            {editingProduct ? 'Save & Update Fit' : 'Publish to Showcase'}
          </button>
        </div>

      </div>
    </div>
  );
};
