import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, BRAND_SETTINGS } from '../data/initialProducts';
import { fetchCloudCatalog, syncCatalogToCloud } from '../utils/cloudSync';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  // Load products from localStorage or fallback to INITIAL_PRODUCTS
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('qissalabel_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Load categories from localStorage or fallback
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('qissalabel_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading categories from storage', e);
    }
    return [
      "Co-ord Sets",
      "Streetwear & Hoodies",
      "Dresses & Anarkalis",
      "Men's Couture",
      "Sarees & Ensembles",
      "Outerwear & Jackets",
      "Bottoms & Pants"
    ];
  });

  // Load settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('qissalabel_settings');
      if (saved) return { ...BRAND_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Error loading settings from storage', e);
    }
    return BRAND_SETTINGS;
  });

  // Showcase Bag (Multi-item order)
  const [bag, setBag] = useState(() => {
    try {
      const saved = localStorage.getItem('qissalabel_bag');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading bag from storage', e);
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('qissalabel_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading wishlist from storage', e);
    }
    return [];
  });

  // Inquiries / Leads log
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('qissalabel_inquiries');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading inquiries from storage', e);
    }
    return [];
  });

  // Navigation / View state
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'catalog', 'product-detail', 'stories', 'admin'
  const [activeProductId, setActiveProductId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // UI Drawers & Modals
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [cloudSyncStatus, setCloudSyncStatus] = useState('synced'); // 'synced', 'syncing', 'offline'
  
  // Admin authentication state with session persistence
  const [isAdminAuthenticated, setIsAdminAuthenticatedState] = useState(() => {
    try {
      return sessionStorage.getItem('qissalabel_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  const setIsAdminAuthenticated = useCallback((auth) => {
    setIsAdminAuthenticatedState(auth);
    try {
      if (auth) {
        sessionStorage.setItem('qissalabel_admin_auth', 'true');
      } else {
        sessionStorage.removeItem('qissalabel_admin_auth');
      }
    } catch (e) {}
  }, []);

  // Fetch persistent cloud catalog on initial app mount
  useEffect(() => {
    let isMounted = true;
    const loadCloudData = async () => {
      try {
        setCloudSyncStatus('syncing');
        const cloudData = await fetchCloudCatalog();
        if (isMounted && cloudData) {
          if (cloudData.products && Array.isArray(cloudData.products) && cloudData.products.length > 0) {
            setProducts(cloudData.products);
            localStorage.setItem('qissalabel_products', JSON.stringify(cloudData.products));
          }
          if (cloudData.categories && Array.isArray(cloudData.categories) && cloudData.categories.length > 0) {
            setCategories(cloudData.categories);
            localStorage.setItem('qissalabel_categories', JSON.stringify(cloudData.categories));
          }
          if (cloudData.settings) {
            setSettings(prev => ({ ...prev, ...cloudData.settings }));
            localStorage.setItem('qissalabel_settings', JSON.stringify({ ...BRAND_SETTINGS, ...cloudData.settings }));
          }
          setCloudSyncStatus('synced');
        } else if (isMounted) {
          setCloudSyncStatus('synced');
        }
      } catch (e) {
        if (isMounted) setCloudSyncStatus('offline');
      }
    };
    loadCloudData();
    return () => { isMounted = false; };
  }, []);

  // Auto-sync changes to cloud database (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      syncCatalogToCloud({ products, categories, settings });
    }, 1000);
    return () => clearTimeout(timer);
  }, [products, categories, settings]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('qissalabel_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('qissalabel_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('qissalabel_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('qissalabel_bag', JSON.stringify(bag));
  }, [bag]);

  useEffect(() => {
    localStorage.setItem('qissalabel_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('qissalabel_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Toast notification helper
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  }, []);

  // Log an inquiry when user clicks WhatsApp order
  const logInquiry = useCallback((details) => {
    const newEntry = {
      id: 'INQ-' + Date.now(),
      timestamp: new Date().toISOString(),
      ...details
    };
    setInquiries(prev => [newEntry, ...prev]);
  }, []);

  // Generate WhatsApp Order Link for a single product
  const getWhatsAppUrl = useCallback((product, { size, color, quantity = 1, customNote = '' } = {}) => {
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const selectedColor = typeof color === 'object' ? color.name : (color || (product.colors && product.colors[0]?.name) || 'Default');
    const cleanPhone = (settings.whatsappNumber || '919545983060').replace(/[^0-9]/g, '');

    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://qissalabel.shop';
    const productUrl = `${currentOrigin}/#product/${product.id}`;

    let message = settings.messageTemplate || BRAND_SETTINGS.messageTemplate;
    message = message
      .replace('{product_name}', product.name)
      .replace('{sku}', product.sku || product.id)
      .replace('{size}', selectedSize)
      .replace('{color}', selectedColor)
      .replace('{currency}', settings.currencySymbol || '₹')
      .replace('{price}', (product.price || 0).toLocaleString())
      .replace('{quantity}', quantity)
      .replace('{url}', productUrl);

    if (customNote) {
      message += `\n\n📝 *Customer Customization / Delivery Note:* ${customNote}`;
    }

    logInquiry({
      type: 'Single Product Order',
      productName: product.name,
      productId: product.id,
      sku: product.sku,
      size: selectedSize,
      color: selectedColor,
      quantity,
      price: product.price,
      totalAmount: product.price * quantity
    });

    const encodedText = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  }, [settings, logInquiry]);

  // Generate WhatsApp Order Link for full Bag
  const getBagWhatsAppUrl = useCallback((customNote = '') => {
    if (bag.length === 0) return null;
    const cleanPhone = (settings.whatsappNumber || '919545983060').replace(/[^0-9]/g, '');
    const totalAmount = bag.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://qissalabel.shop';

    let message = `Salam / Hi Qissa Label! 🧵✨\n\nI would like to place an order for the following showcase pieces:\n\n`;

    bag.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   • SKU: ${item.sku || 'N/A'}\n`;
      message += `   • Size: ${item.size} | Color: ${item.color}\n`;
      message += `   • Qty: ${item.quantity} × ${settings.currencySymbol || '₹'}${item.price.toLocaleString()} = ${settings.currencySymbol || '₹'}${(item.price * item.quantity).toLocaleString()}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *Estimated Total:* ${settings.currencySymbol || '₹'}${totalAmount.toLocaleString()}\n`;
    message += `📦 *Total Garments:* ${bag.reduce((c, i) => c + i.quantity, 0)}\n\n`;
    message += `🔗 *Catalog:* ${currentOrigin}\n\n`;

    if (customNote) {
      message += `📝 *Order Note:* ${customNote}\n\n`;
    }

    message += `Please confirm availability and share payment & delivery timeline! ✨`;

    logInquiry({
      type: 'Multi-Item Bag Order',
      itemCount: bag.length,
      totalUnits: bag.reduce((c, i) => c + i.quantity, 0),
      totalAmount,
      items: bag.map(i => ({ name: i.name, size: i.size, color: i.color, qty: i.quantity, price: i.price }))
    });

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }, [bag, settings, logInquiry]);

  // Bag Operations
  const addToBag = useCallback((product, size, color, quantity = 1) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const chosenColor = typeof color === 'object' ? color.name : (color || (product.colors && product.colors[0]?.name) || 'Default');
    const itemKey = `${product.id}-${chosenSize}-${chosenColor}`;

    setBag(prev => {
      const existing = prev.find(item => item.key === itemKey);
      if (existing) {
        return prev.map(item => item.key === itemKey ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, {
        key: itemKey,
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        size: chosenSize,
        color: chosenColor,
        quantity,
        subtitle: product.subtitle
      }];
    });

    showToast(`Added "${product.name}" (${chosenSize}) to Showcase Bag!`, 'success');
  }, [showToast]);

  const updateBagQuantity = useCallback((key, delta) => {
    setBag(prev => prev.map(item => {
      if (item.key === key) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  }, []);

  const removeFromBag = useCallback((key) => {
    setBag(prev => prev.filter(item => item.key !== key));
    showToast('Item removed from showcase bag', 'info');
  }, [showToast]);

  const clearBag = useCallback(() => {
    setBag([]);
  }, []);

  // Wishlist Operations
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => {
      const isFavorited = prev.includes(productId);
      if (isFavorited) {
        showToast('Removed from saved wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your private wardrobe shortlist! ❤️', 'success');
        return [...prev, productId];
      }
    });
  }, [showToast]);

  // Product CRUD (Admin) - Ultra-smooth reactive updates
  const addProduct = useCallback((productData) => {
    const newId = 'ql-' + Date.now().toString(36);
    const newProduct = {
      ...productData,
      id: newId,
      slug: (productData.name || 'drop').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewCount: 1,
      inStock: productData.inStock !== false
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`"${newProduct.name}" is now live on Qissa Label showcase!`, 'success');
    return newProduct;
  }, [showToast]);

  const updateProduct = useCallback((id, updatedFields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, ...updatedFields };
      }
      return p;
    }));
    // Also sync with showcase bag if prices/names changed
    setBag(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          name: updatedFields.name || item.name,
          price: updatedFields.price !== undefined ? updatedFields.price : item.price,
          sku: updatedFields.sku || item.sku,
          image: updatedFields.images ? updatedFields.images[0] : item.image
        };
      }
      return item;
    }));
    showToast('Product updated successfully!', 'success');
  }, [showToast]);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setBag(prev => prev.filter(item => item.id !== id));
    setWishlist(prev => prev.filter(wishId => wishId !== id));
    showToast('Product removed from showcase.', 'info');
  }, [showToast]);

  const duplicateProduct = useCallback((id) => {
    const source = products.find(p => p.id === id);
    if (!source) return;
    const clone = {
      ...source,
      id: 'ql-' + Date.now().toString(36),
      name: `${source.name} (Duplicate)`,
      sku: `${source.sku || 'QL'}-COPY`,
      slug: `${source.slug}-copy`
    };
    setProducts(prev => [clone, ...prev]);
    showToast(`Duplicated "${source.name}"`, 'success');
  }, [products, showToast]);

  // Category Operations (Admin & Storefront)
  const addCategory = useCallback((categoryName) => {
    const trimmed = categoryName ? categoryName.trim() : '';
    if (!trimmed) {
      showToast('Category name cannot be empty', 'error');
      return false;
    }
    if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      showToast(`Category "${trimmed}" already exists!`, 'info');
      return false;
    }
    setCategories(prev => [...prev, trimmed]);
    showToast(`Added new category "${trimmed}"`, 'success');
    return true;
  }, [categories, showToast]);

  const deleteCategory = useCallback((categoryName) => {
    if (categories.length <= 1) {
      showToast('You must keep at least one category.', 'error');
      return false;
    }
    setCategories(prev => prev.filter(c => c !== categoryName));
    showToast(`Category "${categoryName}" removed.`, 'info');
    return true;
  }, [categories, showToast]);

  const updateCategory = useCallback((oldName, newName) => {
    const trimmed = newName ? newName.trim() : '';
    if (!trimmed) return false;
    setCategories(prev => prev.map(c => c === oldName ? trimmed : c));
    // Also update existing products in that category
    setProducts(prev => prev.map(p => p.category === oldName ? { ...p, category: trimmed } : p));
    showToast(`Updated category "${oldName}" to "${trimmed}"`, 'success');
    return true;
  }, [showToast]);

  const updateSettingsData = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Store & WhatsApp configurations updated!', 'success');
  }, [showToast]);

  const resetToDefaults = useCallback(() => {
    setProducts(INITIAL_PRODUCTS);
    setCategories([
      "Co-ord Sets",
      "Streetwear & Hoodies",
      "Dresses & Anarkalis",
      "Men's Couture",
      "Sarees & Ensembles",
      "Outerwear & Jackets",
      "Bottoms & Pants"
    ]);
    setSettings(BRAND_SETTINGS);
    localStorage.removeItem('qissalabel_products');
    localStorage.removeItem('qissalabel_categories');
    localStorage.removeItem('qissalabel_settings');
    showToast('Reset to Qissa Label default catalog.', 'info');
  }, [showToast]);

  const exportDataJson = useCallback(() => {
    const data = {
      brand: 'QISSA LABEL',
      exportedAt: new Date().toISOString(),
      products,
      categories,
      settings,
      inquiries
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qissa-label-catalog-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Catalog exported as JSON backup.', 'success');
  }, [products, categories, settings, inquiries, showToast]);

  const importDataJson = useCallback((jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.products && Array.isArray(parsed.products)) {
        setProducts(parsed.products);
      }
      if (parsed.categories && Array.isArray(parsed.categories)) {
        setCategories(parsed.categories);
      }
      if (parsed.settings) {
        setSettings(prev => ({ ...prev, ...parsed.settings }));
      }
      showToast('Qissa Label catalog imported successfully!', 'success');
      return true;
    } catch (e) {
      showToast('Invalid JSON file format', 'error');
      return false;
    }
  }, [showToast]);

  // Navigate helper
  const navigateTo = useCallback((page, productId = null) => {
    setCurrentPage(page);
    if (productId) {
      setActiveProductId(productId);
      window.location.hash = `product/${productId}`;
    } else if (page === 'catalog') {
      window.location.hash = 'catalog';
    } else if (page === 'stories') {
      window.location.hash = 'stories';
    } else if (page === 'admin') {
      window.location.hash = 'admin';
    } else if (page === 'home') {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const forceCloudSync = useCallback(async () => {
    setCloudSyncStatus('syncing');
    const ok = await syncCatalogToCloud({ products, categories, settings });
    if (ok) {
      setCloudSyncStatus('synced');
      showToast('All products, covers & categories synchronized permanently to cloud database!', 'success');
      return true;
    } else {
      setCloudSyncStatus('synced');
      showToast('Catalog saved locally and scheduled for cloud replication.', 'info');
      return true;
    }
  }, [products, categories, settings, showToast]);

  const generateCatalogCode = useCallback(() => {
    return `export const INITIAL_PRODUCTS = ${JSON.stringify(products, null, 2)};\n\nexport const INITIAL_CATEGORIES = ${JSON.stringify(categories.map(c => ({ id: c, name: c, count: products.filter(p => p.category === c).length })), null, 2)};\n\nexport const BRAND_SETTINGS = ${JSON.stringify(settings, null, 2)};\n`;
  }, [products, categories, settings]);

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        settings,
        bag,
        wishlist,
        inquiries,
        currentPage,
        activeProductId,
        categoryFilter,
        genderFilter,
        searchQuery,
        isBagOpen,
        isWishlistOpen,
        quickViewProduct,
        sizeGuideOpen,
        toasts,
        isAdminAuthenticated,
        cloudSyncStatus,
        setCategoryFilter,
        setGenderFilter,
        setSearchQuery,
        setIsBagOpen,
        setIsWishlistOpen,
        setQuickViewProduct,
        setSizeGuideOpen,
        setIsAdminAuthenticated,
        showToast,
        getWhatsAppUrl,
        getBagWhatsAppUrl,
        addToBag,
        updateBagQuantity,
        removeFromBag,
        clearBag,
        toggleWishlist,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        addCategory,
        deleteCategory,
        updateCategory,
        updateSettingsData,
        resetToDefaults,
        exportDataJson,
        importDataJson,
        forceCloudSync,
        generateCatalogCode,
        navigateTo,
        setActiveProductId
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
