export type DiscountType = "percent" | "bundle" | "fixed";

export interface Discount {
  id: string;
  name: string;
  code: string;
  type: DiscountType;
  /** For percent: 0-100. For fixed: USD amount. For bundle: ignored (use bundlePrice). */
  value: number;
  /** Bundle only: number of items required. */
  bundleQty?: number;
  /** Bundle only: total price for bundleQty items. */
  bundlePrice?: number;
  /** "all" or array of stone IDs */
  applicableTo: "all" | string[];
  /** Gem type filter — apply to all stones of this type */
  applicableType?: string;
  active: boolean;
  expiresAt?: string; // ISO date string
  createdAt: string;
}

export const defaultDiscounts: Discount[] = [
  {
    id: "promo-001",
    name: "Welcome 10% Off",
    code: "GEMS10",
    type: "percent",
    value: 10,
    applicableTo: "all",
    active: true,
    expiresAt: "2026-12-31",
    createdAt: new Date().toISOString(),
  },
  {
    id: "promo-002",
    name: "2 for $200 Amethyst Bundle",
    code: "BUNDLE2",
    type: "bundle",
    value: 0,
    bundleQty: 2,
    bundlePrice: 200,
    applicableTo: "all",
    applicableType: "Rare Gems",
    active: true,
    createdAt: new Date().toISOString(),
  },
];

export function computeDiscountedPrice(
  price: number,
  discount: Discount,
): number {
  if (discount.type === "percent") {
    return Math.round(price * (1 - discount.value / 100));
  }
  if (discount.type === "fixed") {
    return Math.max(0, price - discount.value);
  }
  // bundle: per-item price = bundlePrice / bundleQty
  if (discount.type === "bundle" && discount.bundleQty && discount.bundlePrice) {
    return Math.round(discount.bundlePrice / discount.bundleQty);
  }
  return price;
}

export function getApplicableDiscount(
  stoneId: string,
  stoneType: string,
  discounts: Discount[],
): Discount | undefined {
  const now = new Date();
  return discounts.find((d) => {
    if (!d.active) return false;
    if (d.expiresAt && new Date(d.expiresAt) < now) return false;
    const matchesStone =
      d.applicableTo === "all" || d.applicableTo.includes(stoneId);
    const matchesType =
      !d.applicableType || d.applicableType === stoneType;
    return matchesStone && matchesType;
  });
}

export function formatDiscount(d: Discount): string {
  if (d.type === "percent") return `${d.value}% OFF`;
  if (d.type === "fixed") return `-$${d.value}`;
  if (d.type === "bundle" && d.bundleQty && d.bundlePrice)
    return `${d.bundleQty} for $${d.bundlePrice}`;
  return "";
}
