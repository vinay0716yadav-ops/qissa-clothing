import React, { useEffect } from 'react';
import { useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/Header/AnnouncementBar';
import { Navbar } from './components/Header/Navbar';
import { HeroBanner } from './components/Home/HeroBanner';
import { TrendingCarousel } from './components/Home/TrendingCarousel';
import { CategoryGrid } from './components/Home/CategoryGrid';
import { EditorialStory } from './components/Home/EditorialStory';
import { BrandFeatures } from './components/Home/BrandFeatures';
import { WhatsAppVIPBanner } from './components/Home/WhatsAppVIPBanner';
import { InstagramShowcase } from './components/Home/InstagramShowcase';
import { CatalogPage } from './components/Catalog/CatalogPage';
import { ProductDetailPage } from './components/Product/ProductDetailPage';
import { StoriesPage } from './components/Stories/StoriesPage';
import { Footer } from './components/Footer/Footer';
import { BagDrawer } from './components/Bag/BagDrawer';
import { WishlistDrawer } from './components/Wishlist/WishlistDrawer';
import { QuickViewModal } from './components/Catalog/QuickViewModal';
import { SizeGuideModal } from './components/Product/SizeGuideModal';
import { ToastContainer } from './components/UI/Toast';
import { AdminLayout } from './components/Admin/AdminLayout';

export function App() {
  const { currentPage, activeProductId, navigateTo, setActiveProductId } = useStore();

  // URL Hash routing listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('product/')) {
        const prodId = hash.replace('product/', '');
        navigateTo('product-detail', prodId);
      } else if (hash === 'catalog') {
        navigateTo('catalog');
      } else if (hash === 'stories') {
        navigateTo('stories');
      } else if (hash === 'admin') {
        navigateTo('admin');
      } else if (hash === '' || hash === 'home') {
        navigateTo('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-black selection:text-white">
      
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Global Modals & Drawers */}
      <BagDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <SizeGuideModal />

      {/* Conditional Layout based on View */}
      {currentPage === 'admin' ? (
        <AdminLayout />
      ) : (
        <>
          {/* Top Announcement Bar */}
          <AnnouncementBar />

          {/* Sticky Nike-Style Navigation */}
          <Navbar />

          {/* Page Routing */}
          <main className="flex-1">
            {currentPage === 'home' && (
              <>
                <HeroBanner />
                <TrendingCarousel title="NEW & TRENDING DROPS" subtitle="The Latest Showcase Releases" />
                <CategoryGrid />
                <TrendingCarousel title="CULT CLASSICS" subtitle="Most Inquired on WhatsApp" />
                <EditorialStory />
                <BrandFeatures />
                <WhatsAppVIPBanner />
                <InstagramShowcase />
              </>
            )}

            {currentPage === 'catalog' && (
              <CatalogPage />
            )}

            {currentPage === 'product-detail' && (
              <ProductDetailPage />
            )}

            {currentPage === 'stories' && (
              <StoriesPage />
            )}
          </main>

          {/* Global Footer */}
          <Footer />
        </>
      )}

    </div>
  );
}

export default App;
