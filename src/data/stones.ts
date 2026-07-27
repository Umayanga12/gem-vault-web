import diamondImg from "@/assets/hero-diamond.jpg";
import sapphireImg from "@/assets/gem-sapphire.jpg";
import rubyImg from "@/assets/gem-ruby.jpg";
import emeraldImg from "@/assets/gem-emerald.jpg";
import amethystImg from "@/assets/gem-amethyst.jpg";

export type GemType = "Diamond" | "Sapphire" | "Ruby" | "Emerald" | "Other";

export interface Stone {
  id: string;
  name: string;
  type: GemType;
  origin: "Natural" | "Lab-grown";
  shape: string;
  cut: string;
  carat: number;
  color: string;
  clarity: string;
  country: string;
  treatment: "Unheated" | "Heated" | "Minor oil" | "None";
  lab: "GIA" | "IGI" | "AGS" | "GRS";
  certificate: string;
  price: number;
  images: string[];
  alt: string;
  note: string;
}

const imageFor: Record<GemType, string> = {
  Diamond: diamondImg,
  Sapphire: sapphireImg,
  Ruby: rubyImg,
  Emerald: emeraldImg,
  Other: amethystImg,
};

function set(type: GemType): string[] {
  return [imageFor[type], imageFor[type], imageFor[type], imageFor[type]];
}

export const stones: Stone[] = [
  {
    id: "d-3021",
    name: "Round Brilliant Diamond",
    type: "Diamond",
    origin: "Natural",
    shape: "Round",
    cut: "Excellent",
    carat: 3.02,
    color: "D",
    clarity: "VVS1",
    country: "Botswana",
    treatment: "None",
    lab: "GIA",
    certificate: "GIA 2214938471",
    price: 148500,
    images: set("Diamond"),
    alt: "3.02 carat D colour round brilliant cut diamond photographed against a dark background",
    note: "Triple Excellent proportions with no fluorescence. Table 56%, depth 61.4%.",
  },
  {
    id: "s-1180",
    name: "Kashmir-type Blue Sapphire",
    type: "Sapphire",
    origin: "Natural",
    shape: "Cushion",
    cut: "Very Good",
    carat: 5.18,
    color: "Vivid Blue",
    clarity: "Eye-clean",
    country: "Sri Lanka",
    treatment: "Unheated",
    lab: "GRS",
    certificate: "GRS 2024-081155",
    price: 96200,
    images: set("Sapphire"),
    alt: "5.18 carat unheated vivid blue cushion cut sapphire on a dark background",
    note: "Velvety saturation with even colour distribution; no evidence of heat treatment.",
  },
  {
    id: "r-0244",
    name: "Burmese Ruby",
    type: "Ruby",
    origin: "Natural",
    shape: "Oval",
    cut: "Good",
    carat: 2.44,
    color: "Pigeon Blood",
    clarity: "VS",
    country: "Myanmar (Mogok)",
    treatment: "Unheated",
    lab: "GRS",
    certificate: "GRS 2023-114402",
    price: 212000,
    images: set("Ruby"),
    alt: "2.44 carat unheated pigeon blood Burmese ruby, oval cut, on a dark background",
    note: "Strong red fluorescence typical of Mogok material. Unheated with minor silk.",
  },
  {
    id: "e-0431",
    name: "Colombian Emerald",
    type: "Emerald",
    origin: "Natural",
    shape: "Emerald",
    cut: "Very Good",
    carat: 4.31,
    color: "Vivid Green",
    clarity: "SI",
    country: "Colombia (Muzo)",
    treatment: "Minor oil",
    lab: "GRS",
    certificate: "GRS 2024-030918",
    price: 74800,
    images: set("Emerald"),
    alt: "4.31 carat vivid green Colombian emerald, emerald cut, on a dark background",
    note: "Classic Muzo warm green. Insignificant to minor clarity enhancement (cedarwood oil).",
  },
  {
    id: "d-1508",
    name: "Lab-grown Oval Diamond",
    type: "Diamond",
    origin: "Lab-grown",
    shape: "Oval",
    cut: "Excellent",
    carat: 1.508,
    color: "E",
    clarity: "VS1",
    country: "United States",
    treatment: "None",
    lab: "IGI",
    certificate: "IGI LG618402955",
    price: 3150,
    images: set("Diamond"),
    alt: "1.51 carat lab-grown E colour oval cut diamond on a dark background",
    note: "CVD-grown, post-growth treated. Length-to-width ratio 1.38.",
  },
  {
    id: "o-0765",
    name: "Rose de France Amethyst",
    type: "Other",
    origin: "Natural",
    shape: "Pear",
    cut: "Very Good",
    carat: 7.65,
    color: "Deep Violet",
    clarity: "IF",
    country: "Zambia",
    treatment: "None",
    lab: "IGI",
    certificate: "IGI 331902884",
    price: 2280,
    images: set("Other"),
    alt: "7.65 carat deep violet pear cut Zambian amethyst on a dark background",
    note: "Internally flawless with strong dichroism under incandescent light.",
  },
  {
    id: "s-0292",
    name: "Padparadscha-adjacent Sapphire",
    type: "Sapphire",
    origin: "Natural",
    shape: "Round",
    cut: "Excellent",
    carat: 2.92,
    color: "Pinkish Orange",
    clarity: "VVS",
    country: "Madagascar",
    treatment: "Heated",
    lab: "GIA",
    certificate: "GIA 5231770944",
    price: 41500,
    images: set("Sapphire"),
    alt: "2.92 carat pinkish orange Madagascar sapphire, round cut, on a dark background",
    note: "Heated, no residue. Colour sits just outside the padparadscha reference range.",
  },
  {
    id: "r-0118",
    name: "Mozambique Ruby",
    type: "Ruby",
    origin: "Natural",
    shape: "Cushion",
    cut: "Very Good",
    carat: 1.18,
    color: "Vivid Red",
    clarity: "VS",
    country: "Mozambique",
    treatment: "Heated",
    lab: "GIA",
    certificate: "GIA 6425110387",
    price: 8600,
    images: set("Ruby"),
    alt: "1.18 carat heated vivid red Mozambique ruby, cushion cut, on a dark background",
    note: "Standard heat, no glass filling. Bright crystal with lively return.",
  },
  {
    id: "e-0210",
    name: "Zambian Emerald",
    type: "Emerald",
    origin: "Natural",
    shape: "Oval",
    cut: "Good",
    carat: 2.1,
    color: "Bluish Green",
    clarity: "VS",
    country: "Zambia (Kagem)",
    treatment: "Minor oil",
    lab: "IGI",
    certificate: "IGI 552018733",
    price: 11400,
    images: set("Emerald"),
    alt: "2.10 carat bluish green Zambian emerald, oval cut, on a dark background",
    note: "Cooler tone than Colombian material, higher clarity, excellent saturation.",
  },
  {
    id: "d-0508",
    name: "Fancy Yellow Cushion Diamond",
    type: "Diamond",
    origin: "Natural",
    shape: "Cushion",
    cut: "Very Good",
    carat: 5.08,
    color: "Fancy Intense Yellow",
    clarity: "VS2",
    country: "South Africa",
    treatment: "None",
    lab: "AGS",
    certificate: "AGS 104119827006",
    price: 187000,
    images: set("Diamond"),
    alt: "5.08 carat fancy intense yellow cushion cut diamond on a dark background",
    note: "Even colour across the crown, no colour zoning visible face-up.",
  },
];

export const gemTypes: GemType[] = ["Diamond", "Sapphire", "Ruby", "Emerald", "Other"];

export const typeAccent: Record<GemType, string> = {
  Diamond: "bg-brass/15 text-brass border-brass/40",
  Sapphire: "bg-sapphire/40 text-pearl border-sapphire",
  Ruby: "bg-ruby/40 text-pearl border-ruby",
  Emerald: "bg-emerald/40 text-pearl border-emerald",
  Other: "bg-amethyst/40 text-pearl border-amethyst",
};

export function getStone(id: string) {
  return stones.find((s) => s.id === id);
}

export function formatPrice(value: number, currency: "USD" | "EUR" | "GBP" = "USD") {
  const rate = currency === "USD" ? 1 : currency === "EUR" ? 0.92 : 0.79;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value * rate));
}
