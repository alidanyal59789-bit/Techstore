import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { PRODUCTS } from '../data/products';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext(null);

const STORAGE_KEY = 'techstore:cart';
const ORDERS_KEY = 'techstore:orders';

/**
 * Only `{ id, quantity }` pairs are persisted, never a copy of the product.
 * Prices, names and images are resolved from PRODUCTS on every render, which
 * means a saved cart always reflects current catalogue data and a product
 * removed from the catalogue quietly drops out of a stored cart instead of
 * rendering as a broken row.
 */
export function CartProvider({ children }) {
  const [lines, setLines] = useLocalStorage(STORAGE_KEY, []);
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState(null);
  const noticeTimer = useRef(null);

  /* ---- Checkout state ----------------------------------------------- */
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('details');
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
  const [address, setAddress] = useState({ flat: '', street: '', city: '', state: '', pin: '', landmark: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderResult, setOrderResult] = useState(null);
  const [orderHistory, setOrderHistory] = useLocalStorage(ORDERS_KEY, []);

  const flash = useCallback((message) => {
    setNotice({ message, key: Date.now() });
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 2600);
  }, []);

  const dismissNotice = useCallback(() => {
    clearTimeout(noticeTimer.current);
    setNotice(null);
  }, []);

  /* ---- Reads ----------------------------------------------------------- */

  // Guard against ids that no longer exist in the catalogue.
  const items = useMemo(
    () =>
      lines
        .map((line) => {
          const product = PRODUCTS.find((p) => p.id === line.id);
          return product ? { ...product, quantity: line.quantity } : null;
        })
        .filter(Boolean),
    [lines]
  );

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  // Free shipping over ₹2,000 — a fixed rule so the total has something to compute.
  const FREE_SHIPPING_AT = 2000;
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : 199;
  const total = subtotal + shipping;

  const quantityOf = useCallback(
    (id) => lines.find((line) => line.id === id)?.quantity ?? 0,
    [lines]
  );

  /* ---- Writes ---------------------------------------------------------- */

  /** Adding a product already in the cart increments it rather than duplicating. */
  const addItem = useCallback(
    (product, quantity = 1) => {
      setLines((current) => {
        const existing = current.find((line) => line.id === product.id);
        if (existing) {
          return current.map((line) =>
            line.id === product.id
              ? { ...line, quantity: Math.min(line.quantity + quantity, 99) }
              : line
          );
        }
        return [...current, { id: product.id, quantity }];
      });
      flash(`${product.name} added to cart`);
    },
    [setLines, flash]
  );

  /** Setting a quantity of zero or less removes the line. */
  const setQuantity = useCallback(
    (id, quantity) => {
      setLines((current) =>
        quantity <= 0
          ? current.filter((line) => line.id !== id)
          : current.map((line) =>
              line.id === id ? { ...line, quantity: Math.min(quantity, 99) } : line
            )
      );
    },
    [setLines]
  );

  const increment = useCallback(
    (id) => setQuantity(id, quantityOf(id) + 1),
    [setQuantity, quantityOf]
  );

  const decrement = useCallback(
    (id) => setQuantity(id, quantityOf(id) - 1),
    [setQuantity, quantityOf]
  );

  const removeItem = useCallback(
    (id) => {
      const name = PRODUCTS.find((p) => p.id === id)?.name;
      setLines((current) => current.filter((line) => line.id !== id));
      if (name) flash(`${name} removed`);
    },
    [setLines, flash]
  );

  const clearCart = useCallback(() => setLines([]), [setLines]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  /* ---- Checkout actions --------------------------------------------- */

  const openCheckout = useCallback(() => {
    setIsOpen(false);
    setCheckoutOpen(true);
    setCheckoutStep('details');
    setOrderResult(null);
  }, []);

  const closeCheckout = useCallback(() => {
    setCheckoutOpen(false);
    setCheckoutStep('details');
    setOrderResult(null);
  }, []);

  const goToStep = useCallback((step) => setCheckoutStep(step), []);

  const resetCheckout = useCallback(() => {
    setCheckoutOpen(false);
    setCheckoutStep('details');
    setOrderResult(null);
    setCustomerInfo({ name: '', email: '', phone: '' });
    setAddress({ flat: '', street: '', city: '', state: '', pin: '', landmark: '' });
    setPaymentMethod('cod');
  }, []);

  const updateCustomerInfo = useCallback((fields) => {
    setCustomerInfo((prev) => ({ ...prev, ...fields }));
  }, []);

  const updateAddress = useCallback((fields) => {
    setAddress((prev) => ({ ...prev, ...fields }));
  }, []);

  const placeOrder = useCallback(() => {
    const reference = `TS-${String(Date.now()).slice(-8)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const orderTotal = subtotal + shipping;
    const result = {
      reference,
      customerName: customerInfo.name.trim(),
      customerEmail: customerInfo.email.trim(),
      customerPhone: customerInfo.phone.trim(),
      items: items.map((item) => ({
        id: item.id,
        name: `${item.brand} ${item.name}`,
        image: item.image,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      shipping,
      total: orderTotal,
      paymentMethod,
      address: { ...address },
      placedAt: new Date().toISOString(),
    };
    setOrderResult(result);
    setOrderHistory((prev) => [result, ...prev]);
    setCheckoutStep('confirmation');
    // Clear cart after capturing order
    setLines([]);
  }, [customerInfo, address, paymentMethod, items, subtotal, shipping, setLines, setOrderHistory]);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      shipping,
      total,
      isOpen,
      notice,
      checkoutOpen,
      checkoutStep,
      orderResult,
      orderHistory,
      customerInfo,
      address,
      paymentMethod,
      addItem,
      removeItem,
      increment,
      decrement,
      setQuantity,
      clearCart,
      quantityOf,
      openCart,
      closeCart,
      openCheckout,
      closeCheckout,
      goToStep,
      resetCheckout,
      updateCustomerInfo,
      updateAddress,
      placeOrder,
      setPaymentMethod,
      flash,
      dismissNotice,
    }),
    [
      items,
      count,
      subtotal,
      shipping,
      total,
      isOpen,
      notice,
      checkoutOpen,
      checkoutStep,
      orderResult,
      orderHistory,
      customerInfo,
      address,
      paymentMethod,
      addItem,
      removeItem,
      increment,
      decrement,
      setQuantity,
      clearCart,
      quantityOf,
      openCart,
      closeCart,
      openCheckout,
      closeCheckout,
      goToStep,
      resetCheckout,
      updateCustomerInfo,
      updateAddress,
      placeOrder,
      setPaymentMethod,
      flash,
      dismissNotice,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside <CartProvider>');
  return context;
}
