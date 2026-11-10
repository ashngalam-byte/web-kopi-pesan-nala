import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Size } from "./types";

/** Biaya layanan tetap sesuai desain keranjang (Rp 2.000). */
export const SERVICE_FEE = 2000;
/** Ongkir "Antar ke Alamat" sesuai desain checkout (Rp 5.000). */
export const DELIVERY_FEE = 5000;

const STORAGE_KEY = "nala-cart-v1";

type AddItem = { productId: string; name: string; image: string; price: number; size: Size | null };

type CartContextValue = {
  items: CartItem[];
  subtotal: number;
  add: (item: AddItem, qty: number) => void;
  setQty: (productId: string, size: Size | null, qty: number) => void;
  remove: (productId: string, size: Size | null) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadItems);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // penyimpanan tidak tersedia — keranjang tetap berjalan di memori
    }
  }, [items]);

  const add = useCallback((item: AddItem, qty: number) => {
    if (qty <= 0) return;
    setItems((prev) => {
      const index = prev.findIndex(
        (it) => it.productId === item.productId && it.size === item.size,
      );
      if (index >= 0) {
        const next = [...prev];
        const existing = next[index];
        if (existing) next[index] = { ...existing, qty: existing.qty + qty };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const setQty = useCallback((productId: string, size: Size | null, qty: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.productId === productId && it.size === size ? { ...it, qty: Math.max(1, qty) } : it,
      ),
    );
  }, []);

  const remove = useCallback((productId: string, size: Size | null) => {
    setItems((prev) => prev.filter((it) => !(it.productId === productId && it.size === size)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, subtotal, add, setQty, remove, clear }),
    [items, subtotal, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam CartProvider");
  return ctx;
}
