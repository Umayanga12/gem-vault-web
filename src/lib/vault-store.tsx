import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { stones, type Stone } from "@/data/stones";

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
}

const VaultContext = createContext<VaultState | null>(null);

export function VaultProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [unit, setUnit] = useState<"ct" | "g">("ct");

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
        setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
      toggleCompare: (id) =>
        setCompare((c) =>
          c.includes(id) ? c.filter((x) => x !== id) : c.length >= 4 ? c : [...c, id],
        ),
      setCurrency,
      setUnit,
      cartStones: cart
        .map((id) => stones.find((s) => s.id === id))
        .filter((s): s is Stone => Boolean(s)),
    }),
    [cart, wishlist, compare, currency, unit],
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault() {
  const ctx = useContext(VaultContext);
  if (!ctx) throw new Error("useVault must be used inside VaultProvider");
  return ctx;
}
