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

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      shipping,
      total,
      isOpen,
      notice,
      addItem,
      removeItem,
      increment,
      decrement,
      setQuantity,
      clearCart,
      quantityOf,
      openCart,
      closeCart,
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
      addItem,
      removeItem,
      increment,
      decrement,
      setQuantity,
      clearCart,
      quantityOf,
      openCart,
      closeCart,
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
