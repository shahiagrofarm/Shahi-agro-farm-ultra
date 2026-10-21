import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, ProductItem, FARM_INFO } from '../data/constants';

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  items: { name: string; quantity: number; unit: string; price: number; subtotal: number }[];
  totalAmount: number;
  totalWeightKg: number;
  customerName: string;
  phone: string;
  district: string;
  deliveryAddress: string;
  paymentMethod: string;
  trxId?: string;
  status: 'Received' | 'Confirmed' | 'Dispatched' | 'Delivered';
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  totalWeightKg: number;
  placeOrder: (customerData: {
    customerName: string;
    phone: string;
    district: string;
    address: string;
    paymentMethod: string;
    trxId?: string;
  }) => { order: PlacedOrder; whatsappUrl: string };
  orders: PlacedOrder[];
  lookupOrder: (query: string) => PlacedOrder | null;
  lang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
  toggleLang: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<'en' | 'bn'>(() => {
    try {
      const saved = localStorage.getItem('saf_lang');
      if (saved === 'bn' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLang = (l: 'en' | 'bn') => {
    setLangState(l);
    try {
      localStorage.setItem('saf_lang', l);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'bn' : 'en');
  };

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shahiAgroCartV1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse cart', e);
    }
    return [];
  });

  const [orders, setOrders] = useState<PlacedOrder[]>(() => {
    try {
      const savedOrders = localStorage.getItem('saf_orders');
      if (savedOrders) return JSON.parse(savedOrders);
    } catch (e) {
      console.warn('Failed to parse saved orders', e);
    }
    return [
      {
        orderId: 'SAF-2026-1042',
        date: '2026-10-18',
        items: [
          { name: 'Shahi Grass Silage (50 KG)', quantity: 20, unit: 'packet', price: 350, subtotal: 7000 },
          { name: 'Pure Shahi Ghee (900g)', quantity: 1, unit: 'jar', price: 1450, subtotal: 1450 }
        ],
        totalAmount: 8450,
        totalWeightKg: 1000.9,
        customerName: 'Kazi M. Rahman',
        phone: '01712345678',
        district: 'Cumilla',
        deliveryAddress: 'Rahman Dairy Farm, Burichang, Cumilla',
        paymentMethod: 'bKash Advance Token',
        trxId: 'BK9X2491AA',
        status: 'Dispatched'
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('shahiAgroCartV1', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('saf_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders', e);
    }
  }, [orders]);

  const addToCart = (productId: string, quantityToAdd?: number) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (existing) {
        let newQty = existing.quantity + (quantityToAdd || product.stepQty);
        if (newQty > product.maxQty) newQty = product.maxQty;
        return prev.map(item =>
          item.product.id === productId ? { ...item, quantity: newQty } : item
        );
      } else {
        const initialQty = quantityToAdd || product.minQty;
        return [...prev, { product, quantity: initialQty }];
      }
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, newQty: number) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    if (newQty < product.minQty) {
      removeFromCart(productId);
      return;
    }

    const clampedQty = Math.min(newQty, product.maxQty);
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: clampedQty } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCount = cart.reduce((sum, item) => sum + (item.product.id === 'silage' ? 1 : item.quantity), 0);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const totalWeightKg = cart.reduce((sum, item) => {
    if (item.product.id === 'silage') {
      return sum + item.quantity * 50;
    }
    if (item.product.id === 'ghee200') {
      return sum + item.quantity * 0.2;
    }
    if (item.product.id === 'ghee900') {
      return sum + item.quantity * 0.9;
    }
    return sum;
  }, 0);

  const placeOrder = (customerData: {
    customerName: string;
    phone: string;
    district: string;
    address: string;
    paymentMethod: string;
    trxId?: string;
  }) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `SAF-${new Date().getFullYear()}-${randomSuffix}`;

    const itemsSummary = cart.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      unit: item.product.unit,
      price: item.product.price,
      subtotal: item.product.price * item.quantity,
    }));

    const newOrder: PlacedOrder = {
      orderId,
      date: new Date().toISOString().split('T')[0],
      items: itemsSummary,
      totalAmount: subtotal,
      totalWeightKg,
      customerName: customerData.customerName,
      phone: customerData.phone,
      district: customerData.district,
      deliveryAddress: customerData.address,
      paymentMethod: customerData.paymentMethod,
      trxId: customerData.trxId,
      status: 'Received',
    };

    setOrders(prev => [newOrder, ...prev]);

    // Construct official WhatsApp order payload
    const itemsText = itemsSummary
      .map(i => `• ${i.name}: ${i.quantity} ${i.unit} (৳${i.subtotal.toLocaleString()})`)
      .join('\n');

    const whatsappMessage = 
`*NEW ORDER INQUIRY — SHAHI AGRO FARM*
Order Reference: *#${orderId}*

*Customer Details:*
• Name: ${customerData.customerName}
• Phone: ${customerData.phone}
• District: ${customerData.district}
• Delivery Address: ${customerData.address}

*Ordered Items:*
${itemsText}

*Order Summary:*
• Estimated Product Subtotal: ৳${subtotal.toLocaleString()}
• Estimated Weight: ${totalWeightKg.toFixed(1)} KG
• Payment Method: ${customerData.paymentMethod}
${customerData.trxId ? `• Transaction/Sender ID: ${customerData.trxId}` : ''}

_Note: Delivery vehicle fare & dispatch schedule to be finalized with farm dispatch team in Noakhali._`;

    const encoded = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${FARM_INFO.whatsappInternational}?text=${encoded}`;

    clearCart();

    return { order: newOrder, whatsappUrl };
  };

  const lookupOrder = (query: string): PlacedOrder | null => {
    const clean = query.trim().toUpperCase();
    if (!clean) return null;
    return (
      orders.find(o => o.orderId.toUpperCase() === clean || o.phone.replace(/\D/g, '').includes(clean.replace(/\D/g, ''))) || null
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        subtotal,
        totalWeightKg,
        placeOrder,
        orders,
        lookupOrder,
        lang,
        setLang,
        toggleLang,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
