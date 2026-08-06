import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { stones as defaultStones, type Stone } from "@/data/stones";
import { defaultDiscounts, type Discount } from "@/data/discounts";

type Currency = "USD" | "EUR" | "GBP";

interface VaultState {
  cart: string[];
  wishlist: string[];
  compare: string[];
  currency: Currency;
  unit: "ct" | "g";
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  setCurrency: (c: Currency) => void;
  setUnit: (u: "ct" | "g") => void;
  cartStones: Stone[];
  // Stone management
  stones: Stone[];
  addStone: (stone: Stone) => void;
  updateStone: (stone: Stone) => void;
  deleteStone: (id: string) => void;
  // Discount management
  discounts: Discount[];
  addDiscount: (d: Discount) => void;
  updateDiscount: (d: Discount) => void;
  deleteDiscount: (id: string) => void;
  // Authentication
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const VaultContext = createContext<VaultState | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

export function VaultProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [unit, setUnit] = useState<"ct" | "g">("ct");
  const [stones, setStones] = useState<Stone[]>(() =>
    loadFromStorage("vault_stones", defaultStones),
  );
  const [discounts, setDiscounts] = useState<Discount[]>(() =>
    loadFromStorage("vault_discounts", defaultDiscounts),
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() =>
    loadFromStorage("vault_logged_in", false),
  );

  // Persist stones & discounts on change
  useEffect(() => {
    saveToStorage("vault_stones", stones);
  }, [stones]);
  useEffect(() => {
    saveToStorage("vault_discounts", discounts);
  }, [discounts]);
  useEffect(() => {
    saveToStorage("vault_logged_in", isLoggedIn);
  }, [isLoggedIn]);

  const value = useMemo<VaultState>(
    () => ({
      cart,
      wishlist,
      compare,
      currency,
      unit,
      addToCart: (id) => setCart((c) => (c.includes(id) ? c : [...c, id])),
      removeFromCart: (id) => setCart((c) => c.filter((x) => x !== id)),
      toggleWishlist: (id) =>
        setWishlist((w) =>
          w.includes(id) ? w.filter((x) => x !== id) : [...w, id],
        ),
      toggleCompare: (id) =>
        setCompare((c) =>
          c.includes(id) ? c.filter((x) => x !== id) : c.length >= 4 ? c : [...c, id],
        ),
      setCurrency,
      setUnit,
      cartStones: cart
        .map((id) => stones.find((s) => s.id === id))
        .filter((s): s is Stone => Boolean(s)),
      // Stones
      stones,
      addStone: (stone) => setStones((prev) => [...prev, stone]),
      updateStone: (stone) =>
        setStones((prev) => prev.map((s) => (s.id === stone.id ? stone : s))),
      deleteStone: (id) =>
        setStones((prev) => prev.filter((s) => s.id !== id)),
      // Discounts
      discounts,
      addDiscount: (d) => setDiscounts((prev) => [...prev, d]),
      updateDiscount: (d) =>
        setDiscounts((prev) => prev.map((x) => (x.id === d.id ? d : x))),
      deleteDiscount: (id) =>
        setDiscounts((prev) => prev.filter((x) => x.id !== id)),
      // Authentication
      isLoggedIn,
      login: (password) => {
        if (password === "admin" || password === "gems123") {
          setIsLoggedIn(true);
          return true;
        }
        return false;
      },
      logout: () => {
        setIsLoggedIn(false);
      },
    }),
    [cart, wishlist, compare, currency, unit, stones, discounts, isLoggedIn],
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault() {
  const ctx = useContext(VaultContext);
  if (!ctx) throw new Error("useVault must be used inside VaultProvider");
  return ctx;
}
