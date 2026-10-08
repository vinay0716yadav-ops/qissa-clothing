import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminDashboard } from './AdminDashboard';
import { ProductManager } from './ProductManager';
import { StoreSettings } from './StoreSettings';
import { InquiriesLog } from './InquiriesLog';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Sliders, 
  MessageCircle, 
  ArrowLeft, 
  Lock, 
  Unlock, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const AdminLayout = () => {
  const { 
    products, 
    inquiries, 
    settings, 
    navigateTo, 
    isAdminAuthenticated, 
    setIsAdminAuthenticated 
  } = useStore();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'products', 'settings', 'inquiries'
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === (settings.adminPin || '1234')) {
      setIsAdminAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Login Screen if not authenticated
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="font-heading text-3xl font-black uppercase tracking-tight text-white pt-2">
              QISSA ATELIER ADMIN
            </h2>
            <p className="text-xs text-zinc-400">
              Enter Admin PIN to manage products and WhatsApp configurations.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 text-center">
                Security PIN (Default: 1234)
              </label>
              <input
                type="password"
                maxLength="6"
                placeholder="••••"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className="w-full text-center text-2xl tracking-[0.5em] py-3 bg-black border border-zinc-700 rounded-xl text-white font-mono focus:outline-none focus:border-white"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-400 font-medium text-center mt-2">
                  Incorrect PIN. Please try default '1234'.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-wider flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Storefront</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 pb-16">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-black text-white sticky top-0 z-30 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand and Tag */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 text-white font-heading text-2xl font-black uppercase tracking-tight hover:opacity-80 transition-opacity"
              >
                <span>QISSA</span>
                <span className="text-[10px] font-sans font-extrabold bg-amber-400 text-black px-2 py-0.5 rounded uppercase">
                  Admin
                </span>
              </button>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'dashboard' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'products' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Products ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'settings' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Store & WhatsApp</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'inquiries' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Orders Log ({inquiries.length})</span>
              </button>
            </nav>

            {/* Exit to Storefront */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('home')}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Storefront</span>
              </button>
            </div>

          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden flex overflow-x-auto gap-2 pb-3 no-scrollbar">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 ${
                activeTab === 'dashboard' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 ${
                activeTab === 'products' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 ${
                activeTab === 'settings' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              Store & WhatsApp
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 ${
                activeTab === 'inquiries' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              Orders ({inquiries.length})
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'settings' && <StoreSettings />}
        {activeTab === 'inquiries' && <InquiriesLog />}
      </main>

    </div>
  );
};
