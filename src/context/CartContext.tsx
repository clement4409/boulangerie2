import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { priceToNumber } from "../lib/utils";
import type { Product } from "../data";

export type CartItem = {
  name: string;
  priceEur: number;
  priceLabel: string;
  image: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (product: Product) => void;
  remove: (name: string) => void;
  setQty: (name: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "mf-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const add = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === product.name);
      if (existing) {
        return prev.map((i) =>
          i.name === product.name ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          name: product.name,
          priceEur: priceToNumber(product.price),
          priceLabel: product.price,
          image: product.image,
          qty: 1,
        },
      ];
    });
    setOpen(true);
  };

  const remove = (name: string) =>
    setItems((prev) => prev.filter((i) => i.name !== name));

  const setQty = (name: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.name !== name)
        : prev.map((i) => (i.name === name ? { ...i, qty } : i))
    );

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const total = useMemo(
    () => items.reduce((s, i) => s + i.priceEur * i.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, count, total, open, setOpen, add, remove, setQty, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
