import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, BRAND_SETTINGS } from '../data/initialProducts';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  // Load products from localStorage or fallback to INITIAL_PRODUCTS
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('qissa_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading products from storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Load settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('qissa_settings');
      if (saved) return { ...BRAND_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Error loading settings from storage', e);
    }
    return BRAND_SETTINGS;
  });

  // Showcase Bag (Multi-item order)
  const [bag, setBag] = useState(() => {
    try {
      const saved = localStorage.getItem('qissa_bag');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading bag from storage', e);
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('qissa_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading wishlist from storage', e);
    }
    return [];
  });

  // Inquiries / Leads log
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('qissa_inquiries');
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
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('qissa_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('qissa_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('qissa_bag', JSON.stringify(bag));
  }, [bag]);

  useEffect(() => {
    localStorage.setItem('qissa_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('qissa_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Toast notification helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  // Log an inquiry when user clicks WhatsApp order
  const logInquiry = (details) => {
    const newEntry = {
      id: 'INQ-' + Date.now(),
      timestamp: new Date().toISOString(),
      ...details
    };
    setInquiries(prev => [newEntry, ...prev]);
  };

  // Generate WhatsApp Order Link for a single product
  const getWhatsAppUrl = (product, { size, color, quantity = 1, customNote = '' } = {}) => {
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const selectedColor = typeof color === 'object' ? color.name : (color || (product.colors && product.colors[0]?.name) || 'Default');
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://qissa.shop';
    const productUrl = `${currentOrigin}/#product/${product.id}`;

    let message = settings.messageTemplate || BRAND_SETTINGS.messageTemplate;
    message = message
      .replace('{product_name}', product.name)
      .replace('{sku}', product.sku || product.id)
      .replace('{size}', selectedSize)
      .replace('{color}', selectedColor)
      .replace('{currency}', settings.currencySymbol)
      .replace('{price}', product.price.toLocaleString())
      .replace('{quantity}', quantity)
      .replace('{url}', productUrl);

    if (customNote) {
      message += `\n\n📝 *Customer Note:* ${customNote}`;
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
  };

  // Generate WhatsApp Order Link for full Bag
  const getBagWhatsAppUrl = (customNote = '') => {
    if (bag.length === 0) return null;
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const totalAmount = bag.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://qissa.shop';

    let message = `Salam / Hi Qissa! 🧵\n\nI'd like to place an order for the following items from your showcase bag:\n\n`;

    bag.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   • SKU: ${item.sku || 'N/A'}\n`;
      message += `   • Size: ${item.size} | Color: ${item.color}\n`;
      message += `   • Qty: ${item.quantity} × ${settings.currencySymbol}${item.price.toLocaleString()} = ${settings.currencySymbol}${(item.price * item.quantity).toLocaleString()}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *Total Estimated Amount:* ${settings.currencySymbol}${totalAmount.toLocaleString()}\n`;
    message += `📦 *Total Items:* ${bag.reduce((c, i) => c + i.quantity, 0)}\n\n`;
    message += `🔗 *View Catalog:* ${currentOrigin}\n\n`;

    if (customNote) {
      message += `📝 *Delivery / Fit Note:* ${customNote}\n\n`;
    }

    message += `Please confirm stock availability and share payment/delivery steps! ✨`;

    logInquiry({
      type: 'Multi-Item Bag Order',
      itemCount: bag.length,
      totalUnits: bag.reduce((c, i) => c + i.quantity, 0),
      totalAmount,
      items: bag.map(i => ({ name: i.name, size: i.size, color: i.color, qty: i.quantity, price: i.price }))
    });

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  // Bag Operations
  const addToBag = (product, size, color, quantity = 1) => {
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

    showToast(`Added "${product.name}" (${chosenSize}) to your Showcase Bag!`, 'success');
  };

  const updateBagQuantity = (key, delta) => {
    setBag(prev => prev.map(item => {
      if (item.key === key) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromBag = (key) => {
    setBag(prev => prev.filter(item => item.key !== key));
    showToast('Item removed from showcase bag', 'info');
  };

  const clearBag = () => {
    setBag([]);
  };

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const isFavorited = prev.includes(productId);
      if (isFavorited) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist! ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  // Product CRUD (Admin)
  const addProduct = (productData) => {
    const newId = 'qis-' + Date.now().toString(36);
    const newProduct = {
      ...productData,
      id: newId,
      slug: (productData.name || 'item').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewCount: 1,
      inStock: productData.inStock !== false
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" created successfully!`, 'success');
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    showToast('Product updated successfully!', 'success');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted from showcase.', 'info');
  };

  const duplicateProduct = (id) => {
    const source = products.find(p => p.id === id);
    if (!source) return;
    const clone = {
      ...source,
      id: 'qis-' + Date.now().toString(36),
      name: `${source.name} (Copy)`,
      sku: `${source.sku}-CP`,
      slug: `${source.slug}-copy`
    };
    setProducts(prev => [clone, ...prev]);
    showToast(`Duplicated "${source.name}"`, 'success');
  };

  const updateSettingsData = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Store & WhatsApp settings updated!', 'success');
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setSettings(BRAND_SETTINGS);
    showToast('Store catalog reset to default factory data.', 'info');
  };

  const exportDataJson = () => {
    const data = {
      brand: 'QISSA Clothing',
      exportedAt: new Date().toISOString(),
      products,
      settings,
      inquiries
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qissa-catalog-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Catalog exported as JSON backup.', 'success');
  };

  const importDataJson = (jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.products && Array.isArray(parsed.products)) {
        setProducts(parsed.products);
      }
      if (parsed.settings) {
        setSettings(prev => ({ ...prev, ...parsed.settings }));
      }
      showToast('Catalog imported successfully!', 'success');
      return true;
    } catch (e) {
      showToast('Invalid JSON file format', 'error');
      return false;
    }
  };

  // Navigate helper
  const navigateTo = (page, productId = null) => {
    setCurrentPage(page);
    if (productId) {
      setActiveProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreContext.Provider
      value={{
        products,
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
        updateSettingsData,
        resetToDefaults,
        exportDataJson,
        importDataJson,
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
