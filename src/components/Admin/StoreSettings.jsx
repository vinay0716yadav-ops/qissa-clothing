import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  MessageCircle, 
  Save, 
  RotateCcw, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Camera, 
  Image, 
  Plus, 
  Trash2, 
  Tag, 
  Check 
} from 'lucide-react';
import { Instagram } from '../UI/Icons';

export const StoreSettings = () => {
  const { 
    settings, 
    updateSettingsData, 
    resetToDefaults, 
    showToast,
    categories,
    addCategory,
    deleteCategory,
    products
  } = useStore();

  const [form, setForm] = useState({ ...settings });
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [newCatInput, setNewCatInput] = useState('');

  const curatedCovers = [
    {
      label: "Emerald Handloom Silk",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90"
    },
    {
      label: "Royal Velvet Couture",
      url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=2000&q=90"
    },
    {
      label: "Pre-Draped Satin Saree",
      url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=90"
    },
    {
      label: "450 GSM Heavy Streetwear",
      url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=2000&q=90"
    },
    {
      label: "European Pure Linen",
      url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=90"
    },
    {
      label: "Selvedge Indigo Denim",
      url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2000&q=90"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectCoverPreset = (url) => {
    setForm(prev => ({ ...prev, heroImage: url }));
    showToast('Cover preset selected! Click Save to apply.', 'info');
  };

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (newCatInput.trim()) {
      addCategory(newCatInput.trim());
      setNewCatInput('');
    }
  };

  const handleDeleteCategory = (catName) => {
    const count = products.filter(p => p.category === catName).length;
    if (count > 0) {
      if (!window.confirm(`Category "${catName}" has ${count} associated products. Are you sure you want to remove it from the category list?`)) {
        return;
      }
    }
    deleteCategory(catName);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSettingsData(form);
  };

  const handleReset = () => {
    if (window.confirm('Reset all store settings and WhatsApp numbers to Qissa Label default?')) {
      resetToDefaults();
      setForm({ ...settings });
    }
  };

  // Test WhatsApp message link
  const testPhone = (form.whatsappNumber || '919545983060').replace(/[^0-9]/g, '');
  const sampleTestUrl = `https://wa.me/${testPhone}?text=${encodeURIComponent("Salam / Hi Qissa Label! 🧵 This is a test order message to verify my WhatsApp business order integration.")}`;

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Category Management Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-black uppercase tracking-wide text-black">
                Category & Capsule Management
              </h3>
              <p className="text-xs text-zinc-500">
                Add, manage, and organize apparel categories across the storefront and filters.
              </p>
            </div>
          </div>
        </div>

        {/* Add New Category Form */}
        <form onSubmit={handleAddCategorySubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Type new category name (e.g. Bridal Ensembles, Luxury Footwear)..."
            value={newCatInput}
            onChange={(e) => setNewCatInput(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-zinc-300 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </form>

        {/* Active Categories List */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-wider text-zinc-400">
            Active Categories ({categories.length})
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {categories.map((cat, idx) => {
              const productCount = products.filter(p => p.category === cat).length;
              return (
                <div
                  key={idx}
                  className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between group hover:border-zinc-300 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-bold text-xs text-zinc-900 block truncate">
                      {cat}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      {productCount} {productCount === 1 ? 'product' : 'products'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                    title={`Delete category "${cat}"`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Card 1: WhatsApp Business Configuration */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
              <MessageCircle className="w-5 h-5 fill-emerald-600" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-black uppercase tracking-wide text-black">
                WhatsApp Business Order Integration
              </h3>
              <p className="text-xs text-zinc-500">
                Incoming orders from the website showcase will be sent directly to this WhatsApp phone number.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5">
                WhatsApp Phone (With Country Code, No + or spaces) *
              </label>
              <input
                type="text"
                required
                name="whatsappNumber"
                placeholder="e.g. 919545983060"
                value={form.whatsappNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm font-mono font-bold focus:outline-none focus:border-black"
              />
              <span className="text-[11px] text-zinc-400 mt-1 block whitespace-nowrap">
                Current: {form.whatsappNumber || '919545983060'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5">
                Display Phone (Public View on Navbar & Footer)
              </label>
              <input
                type="text"
                name="displayPhone"
                placeholder="e.g. +91 95459 83060"
                value={form.displayPhone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black font-semibold"
              />
            </div>
          </div>

          {/* Test Link Button */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/70 flex items-center justify-between">
            <div className="text-xs text-emerald-900">
              <strong className="block font-bold">Instant Test Connection</strong>
              <span>Test if your WhatsApp Web / Mobile app opens properly with a pre-filled draft.</span>
            </div>
            <a
              href={sampleTestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow whitespace-nowrap"
            >
              <span>Test WhatsApp Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* WhatsApp Message Template */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700">
                WhatsApp Order Message Template
              </label>
              <span className="text-[11px] text-zinc-400">Supported variables: {'{product_name}'}, {'{sku}'}, {'{size}'}, {'{color}'}, {'{currency}'}, {'{price}'}, {'{quantity}'}, {'{url}'}</span>
            </div>
            <textarea
              rows="7"
              name="messageTemplate"
              value={form.messageTemplate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-zinc-300 rounded-xl text-xs font-mono bg-zinc-50 focus:outline-none focus:border-black leading-relaxed"
            />
          </div>
        </div>

        {/* Card 2: Storefront Cover & Hero Configuration */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-black uppercase tracking-wide text-black">
                Storefront Hero Banner & Cover Photo
              </h3>
              <p className="text-xs text-zinc-500">
                Manage the high-impact cover photo and headline shown on your storefront.
              </p>
            </div>
          </div>

          {/* Preset Visual Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-700">
              Pick Editorial Cover Preset
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {curatedCovers.map((c, idx) => {
                const isSelected = form.heroImage === c.url;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectCoverPreset(c.url)}
                    className={`group relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      isSelected ? 'border-amber-500 ring-2 ring-amber-400/40' : 'border-zinc-200 hover:border-black'
                    }`}
                  >
                    <img src={c.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[11px] font-bold text-white leading-tight">
                        {c.label} {isSelected && '✓'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-zinc-100">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5">
                Or Custom Hero Cover Image URL
              </label>
              <input
                type="url"
                name="heroImage"
                value={form.heroImage || ''}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5">
                  Top Pill Tagline
                </label>
                <input
                  type="text"
                  name="heroTagline"
                  value={form.heroTagline || ''}
                  onChange={handleChange}
                  placeholder="QISSA LABEL ATELIER • DROP 04 LIVE"
                  className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-xs focus:outline-none focus:border-black font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5">
                  Hero Headline
                </label>
                <input
                  type="text"
                  name="heroHeading"
                  value={form.heroHeading || ''}
                  onChange={handleChange}
                  placeholder="WEAR YOUR NARRATIVE."
                  className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-xs focus:outline-none focus:border-black font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Brand Identity & Security Password */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
            <div className="p-2.5 bg-zinc-100 text-black rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-black uppercase tracking-wide text-black">
                Brand & Admin Security
              </h3>
              <p className="text-xs text-zinc-500">
                Official social handles and secure admin password control.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
                value={form.brandName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5">
                Instagram Profile URL
              </label>
              <input
                type="url"
                name="instagramUrl"
                value={form.instagramUrl}
                onChange={handleChange}
                placeholder="https://www.instagram.com/qissalabel/"
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Announcement Bar text */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5">
              Top Announcement Ticker Text
            </label>
            <input
              type="text"
              name="announcementText"
              value={form.announcementText}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black font-semibold"
            />
          </div>

          {/* Admin Security Password (Completely Masked) */}
          <div className="pt-2 border-t border-zinc-100">
            <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1.5">
              Admin Access Password
            </label>
            <div className="relative">
              <input
                type={showAdminPassword ? "text" : "password"}
                name="adminPassword"
                value={form.adminPassword || ''}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full pl-4 pr-11 py-2.5 border border-zinc-300 rounded-xl text-sm font-mono focus:outline-none focus:border-black font-bold"
              />
              <button
                type="button"
                onClick={() => setShowAdminPassword(!showAdminPassword)}
                className="absolute right-3.5 top-3 text-zinc-400 hover:text-black cursor-pointer"
                title={showAdminPassword ? "Hide password" : "Show password"}
              >
                {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <span className="text-[11px] text-zinc-400 mt-1 block">
              Used to unlock the /admin console. Passwords remain private and masked.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Qissa Label Defaults</span>
          </button>

          <button
            type="submit"
            className="px-8 py-3 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
};
