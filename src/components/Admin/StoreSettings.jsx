import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, Save, RotateCcw, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { Instagram } from '../UI/Icons';

export const StoreSettings = () => {
  const { settings, updateSettingsData, resetToDefaults, showToast } = useStore();

  const [form, setForm] = useState({ ...settings });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSettingsData(form);
  };

  const handleReset = () => {
    if (window.confirm('Reset all store settings and WhatsApp numbers to factory default?')) {
      resetToDefaults();
      setForm({ ...settings });
    }
  };

  // Test WhatsApp message link
  const testPhone = (form.whatsappNumber || '').replace(/[^0-9]/g, '');
  const sampleTestUrl = `https://wa.me/${testPhone}?text=${encodeURIComponent("Salam / Hi Qissa! 🧵 This is a test order message to verify my WhatsApp business integration.")}`;

  return (
    <div className="space-y-8 max-w-4xl">
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Card 1: WhatsApp Business Configuration */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
              <MessageCircle className="w-5 h-5 fill-emerald-600" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-black uppercase tracking-wide text-black">
                WhatsApp Business Integration
              </h3>
              <p className="text-xs text-zinc-500">
                Incoming orders from the website showcase will be sent directly to this WhatsApp phone number.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
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
              <span className="text-[11px] text-zinc-400 mt-1 block">
                Current: {form.whatsappNumber || '919545983060'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
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
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow"
            >
              <span>Test WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* WhatsApp Message Template */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
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

        {/* Card 2: Brand Identity & Social Links */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
            <div className="p-2.5 bg-zinc-100 text-black rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-black uppercase tracking-wide text-black">
                Brand & Social Profiles
              </h3>
              <p className="text-xs text-zinc-500">
                Official social handles and store metadata.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
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
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Brand Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
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

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Concierge Support Email
              </label>
              <input
                type="email"
                name="supportEmail"
                value={form.supportEmail}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Announcement Bar text */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
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

          {/* Currency Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Currency Symbol
              </label>
              <input
                type="text"
                name="currencySymbol"
                value={form.currencySymbol}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm font-bold focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Currency Code (ISO)
              </label>
              <input
                type="text"
                name="currencyCode"
                value={form.currencyCode}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm font-mono focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Factory Defaults</span>
          </button>

          <button
            type="submit"
            className="px-8 py-3 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
};
