import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { stones as defaultStones, type Stone } from "@/data/stones";
import type { QuotationFormData } from "@/components/vault/quotation-form";

export type { QuotationFormData };

/** A stone added to the quotation basket with its request preferences */
export interface QuotationItem {
  stoneId: string;
  formData: QuotationFormData;
}

type Currency = "USD" | "EUR" | "GBP";

interface VaultState {
  /** Quotation basket — items with their request preferences */
  quotation: QuotationItem[];
  /** Convenience: just the stone IDs in the quotation basket */
  quotationIds: string[];
  wishlist: string[];
  compare: string[];
  currency: Currency;
  unit: "ct" | "g";
  addToQuotation: (data: QuotationFormData) => void;
  removeFromQuotation: (id: string) => void;
  clearQuotation: () => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  setCurrency: (c: Currency) => void;
  setUnit: (u: "ct" | "g") => void;
  quotationStones: Stone[];
  // Stone management
  stones: Stone[];
  addStone: (stone: Stone) => void;
  updateStone: (stone: Stone) => void;
  deleteStone: (id: string) => void;
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

const REMOVED_STONE_IDS = new Set([
  "s-star-s001",
  "s-star-r001",
  "s-star-b001",
  "s-star-w001",
  "s-star-p001",
  "s-star-pk001",
  "zc-0215",
  "zc-yellow-001",
  "zc-brown-001",
  "tm-0156",
  "tm-honey-001",
  "tm-brown-001",
  "ms-0298",
  "tp-0142",
  "tp-colourless-001",
  "tp-green-001",
  "tp-yellow-001",
  "tp-brown-001",
  "sp-purple-001",
  "d-3021",
  // Removed Emerald
  "by-eme-001",
  // Duplicate IDs from old data
  "rg-0345",
  "rg-0182",
]);

const STONES_STORAGE_KEY = "vault_stones_v7";
const QUOTATION_STORAGE_KEY = "vault_quotation_v1";

export function VaultProvider({ children }: { children: ReactNode }) {
  const [quotation, setQuotation] = useState<QuotationItem[]>(() =>
    loadFromStorage<QuotationItem[]>(QUOTATION_STORAGE_KEY, []),
  );
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [unit, setUnit] = useState<"ct" | "g">("ct");
  const [stones, setStones] = useState<Stone[]>(() => {
    // Purge legacy storage keys so deleted stones don't get resurrected
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem("vault_stones");
        window.localStorage.removeItem("vault_stones_v2");
        window.localStorage.removeItem("vault_stones_v3");
        window.localStorage.removeItem("vault_stones_v4");
        window.localStorage.removeItem("vault_stones_v5");
        window.localStorage.removeItem("vault_stones_v6");
      } catch {}
    }
    const defaultIds = new Set(defaultStones.map((s) => s.id));
    const persisted = loadFromStorage<Stone[]>(STONES_STORAGE_KEY, []);
    const userAdded = persisted.filter(
      (s) =>
        !defaultIds.has(s.id) &&
        !REMOVED_STONE_IDS.has(s.id) &&
        (s.type as string) !== "Diamond" &&
        (s.subType as string) !== "Emerald",
    );
    return [...defaultStones, ...userAdded];
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() =>
    loadFromStorage("vault_logged_in", false),
  );

  // Persist quotation basket on change
  useEffect(() => {
    saveToStorage(QUOTATION_STORAGE_KEY, quotation);
  }, [quotation]);

  // Persist stones on change
  useEffect(() => {
    saveToStorage(STONES_STORAGE_KEY, stones);
  }, [stones]);
  useEffect(() => {
    saveToStorage("vault_logged_in", isLoggedIn);
  }, [isLoggedIn]);

  const value = useMemo<VaultState>(
    () => ({
      quotation,
      quotationIds: quotation.map((q) => q.stoneId),
      wishlist,
      compare,
      currency,
      unit,
      addToQuotation: (data) =>
        setQuotation((c) =>
          c.some((q) => q.stoneId === data.stoneId)
            ? c
            : [...c, { stoneId: data.stoneId, formData: data }],
        ),
      removeFromQuotation: (id) => setQuotation((c) => c.filter((q) => q.stoneId !== id)),
      clearQuotation: () => setQuotation([]),
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
      quotationStones: quotation
        .map((q) => stones.find((s) => s.id === q.stoneId))
        .filter((s): s is Stone => Boolean(s)),
      // Stones
      stones,
      addStone: (stone) => setStones((prev) => [...prev, stone]),
      updateStone: (stone) =>
        setStones((prev) => prev.map((s) => (s.id === stone.id ? stone : s))),
      deleteStone: (id) =>
        setStones((prev) => prev.filter((s) => s.id !== id)),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [quotation, wishlist, compare, currency, unit, stones, isLoggedIn],
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault() {
  const ctx = useContext(VaultContext);
  if (!ctx) throw new Error("useVault must be used inside VaultProvider");
  return ctx;
}
