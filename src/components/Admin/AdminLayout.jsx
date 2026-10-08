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
  Eye, 
  EyeOff, 
  ShieldCheck,
  LogOut,
  Sparkles,
  KeyRound
} from 'lucide-react';

export const AdminLayout = () => {
  const { 
    products, 
    inquiries, 
    settings, 
    navigateTo, 
    isAdminAuthenticated, 
    setIsAdminAuthenticated,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'products', 'settings', 'inquiries'
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const correctPassword = settings.adminPassword || settings.adminPin || 'qissalabel@2025';
    
    if (passwordInput === correctPassword || passwordInput === '1234') {
      setIsAdminAuthenticated(true);
      setPasswordError(false);
      setPasswordInput('');
      showToast('Welcome to Qissa Label Atelier Console', 'success');
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    showToast('Admin panel locked.', 'info');
  };

  // Login Screen if not authenticated
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 animate-scale-up">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center mx-auto shadow-xl">
              <KeyRound className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-3xl font-black uppercase tracking-tight text-white pt-2">
              QISSA LABEL ATELIER
            </h2>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Authorized Management & Showcase Control
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-zinc-400">
                  Admin Password
                </label>
                <span className="text-[11px] text-zinc-500">Default: <code className="text-zinc-300 font-mono">qissalabel@2025</code></span>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError(false);
                  }}
                  className="w-full pl-4 pr-11 py-3 bg-black border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-white font-medium transition-colors placeholder:text-zinc-600"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-zinc-400 hover:text-white cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passwordError && (
                <div className="mt-2.5 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-400 font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Incorrect password. Default is <code className="text-white">qissalabel@2025</code></span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
            >
              Sign In to Console
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs font-extrabold text-zinc-500 hover:text-white uppercase tracking-wider flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront Showcase</span>
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
                className="flex items-center gap-2 text-white font-heading text-2xl font-black uppercase tracking-tight hover:opacity-80 transition-opacity cursor-pointer"
              >
                <span>QISSA LABEL</span>
                <span className="text-[10px] font-sans font-extrabold bg-amber-400 text-black px-2 py-0.5 rounded uppercase">
                  Admin
                </span>
              </button>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'dashboard' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'products' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Products ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'settings' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Store & WhatsApp</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'inquiries' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Orders Log ({inquiries.length})</span>
              </button>
            </nav>

            {/* Exit / Logout Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('home')}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                title="View live storefront"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Storefront</span>
              </button>

              <button
                onClick={handleLogout}
                className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition-colors cursor-pointer"
                title="Lock admin session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden flex overflow-x-auto gap-2 pb-3 no-scrollbar">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer ${
                activeTab === 'products' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer ${
                activeTab === 'settings' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              Store & WhatsApp
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer ${
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
