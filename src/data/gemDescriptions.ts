/**
 * Comprehensive gem descriptions and image mappings.
 * Used by:
 *  - Sub-type pills in browse page (now clickable links → /gems/:slug)
 *  - Gem detail pages (/gems/:slug)
 *  - StoneDetails component description block
 */

export interface GemInfo {
  /** Display name */
  name: string;
  /** Full description shown on the gem detail page */
  description: string;
  /** Relative path to representative image (from project root) */
  image?: string;
  /** Accent color (oklch) for theming */
  accent?: string;
  /** Which parent category this belongs to (routeType in gemCategories) */
  parentType?: string;
}

/** Map from gem label → GemInfo */
export const gemInfoMap: Record<string, GemInfo> = {
  // ── Sapphire varieties ──────────────────────────────────────────────────
  "Blue Sapphire": {
    name: "Blue Sapphire",
    description:
      "Blue Sapphire is one of the most sought-after varieties of corundum and is particularly renowned as a classic Ceylon gemstone. Sri Lankan Blue Sapphires are found in a wide range of blue tones, from lighter and fancy blues to highly prized cornflower and royal blue shades. The depth, saturation, clarity, cut and overall appearance influence the character and value of each stone.",
    image: "/gems/sapphire/Blue_sapphire.jpg",
    accent: "oklch(0.62 0.060 250)",
    parentType: "Sapphire",
  },
  Blue: {
    name: "Blue Sapphire",
    description:
      "Blue Sapphire is one of the most sought-after varieties of corundum and is particularly renowned as a classic Ceylon gemstone. Sri Lankan Blue Sapphires are found in a wide range of blue tones, from lighter and fancy blues to highly prized cornflower and royal blue shades. The depth, saturation, clarity, cut and overall appearance influence the character and value of each stone.",
    image: "/gems/sapphire/Blue_sapphire.jpg",
    accent: "oklch(0.62 0.060 250)",
    parentType: "Sapphire",
  },
  "Ruby / Red": {
    name: "Ruby Sapphire / Red Sapphire",
    description:
      "Ruby Sapphire refers to the red and reddish varieties of corundum found in the Sri Lankan gem market. These stones range from pinkish-red to strong, vivid red tones. Fine examples with attractive color, clarity and saturation are highly valued by collectors and gem enthusiasts.",
    image: "/gems/sapphire/ruby.jpg",
    accent: "oklch(0.64 0.135 15)",
    parentType: "Sapphire",
  },
  "Ruby Sapphire": {
    name: "Ruby Sapphire / Red Sapphire",
    description:
      "Ruby Sapphire refers to the red and reddish varieties of corundum found in the Sri Lankan gem market. These stones range from pinkish-red to strong, vivid red tones. Fine examples with attractive color, clarity and saturation are highly valued by collectors and gem enthusiasts.",
    image: "/gems/sapphire/ruby.jpg",
    accent: "oklch(0.64 0.135 15)",
    parentType: "Sapphire",
  },
  Padparadscha: {
    name: "Padparadscha Sapphire",
    description:
      "Padparadscha Sapphire is one of the most distinctive and sought-after sapphire varieties, known for its delicate combination of pink and orange. Sri Lankan stones can display beautiful sunset, peach, salmon, pinkish-orange and orangish-pink tones. The balance and intensity of the pink and orange colors are important characteristics of these exceptional gems.",
    image: "/gems/sapphire/Padparadscha.jpg",
    accent: "oklch(0.70 0.120 50)",
    parentType: "Sapphire",
  },
  Yellow: {
    name: "Yellow Sapphire",
    description:
      "Yellow Sapphire is a popular variety of corundum ranging from soft light yellow to rich golden and deep yellow. Sri Lankan Yellow Sapphires are appreciated for their attractive golden tones, brilliance and natural beauty.",
    image: "/gems/sapphire/Yellow-sapphire.jpg",
    accent: "oklch(0.75 0.105 85)",
    parentType: "Sapphire",
  },
  "Yellow Sapphire": {
    name: "Yellow Sapphire",
    description:
      "Yellow Sapphire is a popular variety of corundum ranging from soft light yellow to rich golden and deep yellow. Sri Lankan Yellow Sapphires are appreciated for their attractive golden tones, brilliance and natural beauty.",
    image: "/gems/sapphire/Yellow-sapphire.jpg",
    accent: "oklch(0.75 0.105 85)",
    parentType: "Sapphire",
  },
  Pink: {
    name: "Pink Sapphire",
    description:
      "Pink Sapphire ranges from delicate light pink to vivid and intense pink. Its color is produced naturally within the corundum crystal, and attractive saturation, clarity and brilliance contribute to its appeal.",
    image: "/gems/sapphire/Pink-sapphire.jpg",
    accent: "oklch(0.70 0.110 350)",
    parentType: "Sapphire",
  },
  "Pink Sapphire": {
    name: "Pink Sapphire",
    description:
      "Pink Sapphire ranges from delicate light pink to vivid and intense pink. Its color is produced naturally within the corundum crystal, and attractive saturation, clarity and brilliance contribute to its appeal.",
    image: "/gems/sapphire/Pink-sapphire.jpg",
    accent: "oklch(0.70 0.110 350)",
    parentType: "Sapphire",
  },
  Purple: {
    name: "Purple Sapphire",
    description:
      "Purple Sapphire displays colors ranging from soft lavender and light purple to medium and deep violet. These stones can show beautiful combinations of purple, violet and pinkish-purple tones and are valued for their distinctive color and brilliance.",
    image: "/gems/sapphire/purple-sapphire.jpg",
    accent: "oklch(0.64 0.095 313)",
    parentType: "Sapphire",
  },
  "Purple Sapphire": {
    name: "Purple Sapphire",
    description:
      "Purple Sapphire displays colors ranging from soft lavender and light purple to medium and deep violet. These stones can show beautiful combinations of purple, violet and pinkish-purple tones and are valued for their distinctive color and brilliance.",
    image: "/gems/sapphire/purple-sapphire.jpg",
    accent: "oklch(0.64 0.095 313)",
    parentType: "Sapphire",
  },
  White: {
    name: "White Sapphire",
    description:
      "White Sapphire is the colorless or near-colorless variety of corundum. Sri Lankan White Sapphires can range from pure white and colorless appearances to bluish-white and yellowish-white tones. Their brilliance and clarity make them a popular natural gemstone choice.",
    image: "/gems/sapphire/White-sapphire.jpg",
    accent: "oklch(0.80 0.015 240)",
    parentType: "Sapphire",
  },
  "White Sapphire": {
    name: "White Sapphire",
    description:
      "White Sapphire is the colorless or near-colorless variety of corundum. Sri Lankan White Sapphires can range from pure white and colorless appearances to bluish-white and yellowish-white tones. Their brilliance and clarity make them a popular natural gemstone choice.",
    image: "/gems/sapphire/White-sapphire.jpg",
    accent: "oklch(0.80 0.015 240)",
    parentType: "Sapphire",
  },
  Green: {
    name: "Green Sapphire",
    description:
      "Green Sapphire occurs in a range of natural green tones, from light and delicate green to deeper green shades. Some Sri Lankan stones may also display yellowish-green or bluish-green hues, giving each gem its own distinctive appearance.",
    image: "/gems/sapphire/Green-Sapphires.jpg",
    accent: "oklch(0.62 0.085 160)",
    parentType: "Sapphire",
  },
  "Green Sapphire": {
    name: "Green Sapphire",
    description:
      "Green Sapphire occurs in a range of natural green tones, from light and delicate green to deeper green shades. Some Sri Lankan stones may also display yellowish-green or bluish-green hues, giving each gem its own distinctive appearance.",
    image: "/gems/sapphire/Green-Sapphires.jpg",
    accent: "oklch(0.62 0.085 160)",
    parentType: "Sapphire",
  },
  "Bi-Colour (Wedding Stone)": {
    name: "Bi-Colour Sapphire / Wedding Stone",
    description:
      "Bi-Colour Sapphires display two distinct colors within the same gemstone, creating a naturally occurring color combination. Blue and yellow is one of the popular combinations found in the Sri Lankan market. Their unique color zoning makes each stone individual and particularly attractive for collectors and custom jewellery.",
    image: "/gems/sapphire/bi-color-sapphire.jpg",
    accent: "oklch(0.68 0.075 220)",
    parentType: "Sapphire",
  },

  // ── Star Sapphire varieties ─────────────────────────────────────────────
  "Star Sapphire": {
    name: "Star Sapphire",
    description:
      "Star Sapphire is a phenomenal variety of sapphire that displays a distinctive star-shaped optical effect known as asterism when viewed under suitable lighting. The effect can occur in different sapphire colors, including blue, pink, yellow, purple, green, white and black, as well as bi-colour stones.",
    image: "/gems/star_sapphire/image.png",
    accent: "oklch(0.65 0.080 255)",
    parentType: "Star Sapphire",
  },
  "Blue Star": {
    name: "Blue Star Sapphire",
    description:
      "Star Sapphire is a phenomenal variety of sapphire that displays a distinctive star-shaped optical effect known as asterism when viewed under suitable lighting. The blue variety is the most classic and celebrated of the star sapphires.",
    image: "/gems/star_sapphire/image.png",
    accent: "oklch(0.62 0.070 250)",
    parentType: "Star Sapphire",
  },
  "Pink Star": {
    name: "Pink Star Sapphire",
    description:
      "Star Sapphire is a phenomenal variety of sapphire that displays a distinctive star-shaped optical effect known as asterism when viewed under suitable lighting. The pink variety combines the delicacy of pink corundum with the rare asterism phenomenon.",
    image: "/gems/star_sapphire/image.png",
    accent: "oklch(0.70 0.110 350)",
    parentType: "Star Sapphire",
  },
  "Yellow Star": {
    name: "Yellow Star Sapphire",
    description:
      "Star Sapphire is a phenomenal variety of sapphire that displays a distinctive star-shaped optical effect known as asterism when viewed under suitable lighting. The yellow variety displays the star effect across a warm golden or yellow body.",
    image: "/gems/star_sapphire/image.png",
    accent: "oklch(0.75 0.105 85)",
    parentType: "Star Sapphire",
  },
  "Purple Star": {
    name: "Purple Star Sapphire",
    description:
      "Star Sapphire is a phenomenal variety of sapphire that displays a distinctive star-shaped optical effect known as asterism when viewed under suitable lighting. The purple variety showcases the elegant star effect across a violet to purple body color.",
    image: "/gems/star_sapphire/image.png",
    accent: "oklch(0.64 0.095 313)",
    parentType: "Star Sapphire",
  },
  "Green Star": {
    name: "Green Star Sapphire",
    description:
      "Star Sapphire is a phenomenal variety of sapphire that displays a distinctive star-shaped optical effect known as asterism when viewed under suitable lighting. The green variety is among the rarer star sapphire colors.",
    image: "/gems/star_sapphire/image.png",
    accent: "oklch(0.62 0.085 160)",
    parentType: "Star Sapphire",
  },
  "White Star": {
    name: "White Star Sapphire",
    description:
      "Star Sapphire is a phenomenal variety of sapphire that displays a distinctive star-shaped optical effect known as asterism when viewed under suitable lighting. The white variety displays the star against a colorless or milky white body.",
    image: "/gems/star_sapphire/image.png",
    accent: "oklch(0.80 0.015 240)",
    parentType: "Star Sapphire",
  },
  "Black Star": {
    name: "Black Star Sapphire",
    description:
      "Star Sapphire is a phenomenal variety of sapphire that displays a distinctive star-shaped optical effect known as asterism when viewed under suitable lighting. The black variety produces a striking silver star that floats dramatically across the dark surface.",
    image: "/gems/star_sapphire/image.png",
    accent: "oklch(0.40 0.015 250)",
    parentType: "Star Sapphire",
  },
  "Bi-Colour Star": {
    name: "Bi-Colour Star Sapphire",
    description:
      "Star Sapphire is a phenomenal variety of sapphire that displays a distinctive star-shaped optical effect known as asterism when viewed under suitable lighting. The bi-colour variety combines natural color zoning with the asterism phenomenon.",
    image: "/gems/star_sapphire/image.png",
    accent: "oklch(0.65 0.080 255)",
    parentType: "Star Sapphire",
  },

  // ── Chrysoberyl varieties ───────────────────────────────────────────────
  Chrysoberyl: {
    name: "Chrysoberyl",
    description:
      "Chrysoberyl is a durable and naturally brilliant gemstone known for its attractive yellow, golden, green and honey-colored varieties. Sri Lankan Chrysoberyl is particularly appreciated for its distinctive honey and apple-green colors and its strong natural brilliance.",
    image: "/gems/Chrysoberyl/chrysoberyl.jpg",
    accent: "oklch(0.68 0.095 95)",
    parentType: "Chrysoberyl",
  },
  "Chrysoberyl Cat's Eye": {
    name: "Chrysoberyl Cat's Eye",
    description:
      "Chrysoberyl Cat's Eye is a phenomenal variety of chrysoberyl that displays a sharp, moving band of light across the surface of the stone. This optical phenomenon, known as chatoyancy, is highly characteristic of fine Cat's Eye gemstones. Sri Lankan examples are commonly found in attractive honey and greenish tones.",
    image: "/gems/Chrysoberyl/catseye.webp",
    accent: "oklch(0.70 0.090 80)",
    parentType: "Chrysoberyl",
  },
  Alexandrite: {
    name: "Alexandrite",
    description:
      "Alexandrite is a rare and highly prized variety of chrysoberyl famous for its remarkable color-changing phenomenon. Depending on the light source, a fine Alexandrite can appear greenish or bluish-green in daylight and shift toward reddish, purplish-red or raspberry tones under incandescent light. The strength and quality of the color change are important characteristics of the gemstone.",
    image: "/gems/Chrysoberyl/alexsendrite.jpg",
    accent: "oklch(0.60 0.100 160)",
    parentType: "Chrysoberyl",
  },
  "Alexandrite Cat's Eye": {
    name: "Alexandrite Cat's Eye",
    description:
      "Alexandrite Cat's Eye is an exceptionally rare phenomenal variety that combines color change with the distinctive cat's-eye effect, or chatoyancy. The stone can display a moving band of light across its surface while also showing a change in body color under different lighting conditions. Fine examples combine two rare optical phenomena in one gemstone.",
    image: "/gems/Chrysoberyl/alex-catseye.jpg",
    accent: "oklch(0.58 0.110 145)",
    parentType: "Chrysoberyl",
  },

  // ── Spinel varieties ────────────────────────────────────────────────────
  Spinel: {
    name: "Spinel",
    description:
      "Spinel is a naturally occurring gemstone known for its excellent brilliance and wide range of colors. Sri Lankan Spinel can occur in red, pink, blue, purple, white and green, offering a diverse selection for collectors and jewellery.",
    image: "/gems/Spinel/spinel.jpg",
    accent: "oklch(0.62 0.120 10)",
    parentType: "Spinel",
  },
  "Blue Spinel": {
    name: "Blue Spinel",
    description:
      "Spinel is a naturally occurring gemstone known for its excellent brilliance and wide range of colors. Sri Lankan Spinel can occur in red, pink, blue, purple, white and green, offering a diverse selection for collectors and jewellery.",
    image: "/gems/Spinel/spinel.webp",
    accent: "oklch(0.62 0.060 250)",
    parentType: "Spinel",
  },
  "Purple Spinel": {
    name: "Purple Spinel",
    description:
      "Spinel is a naturally occurring gemstone known for its excellent brilliance and wide range of colors. Sri Lankan Spinel can occur in red, pink, blue, purple, white and green, offering a diverse selection for collectors and jewellery.",
    image: "/gems/Spinel/purple.webp",
    accent: "oklch(0.64 0.095 313)",
    parentType: "Spinel",
  },
  "Red Spinel": {
    name: "Red Spinel",
    description:
      "Spinel is a naturally occurring gemstone known for its excellent brilliance and wide range of colors. Sri Lankan Spinel can occur in red, pink, blue, purple, white and green, offering a diverse selection for collectors and jewellery.",
    image: "/gems/Spinel/spinel.jpg",
    accent: "oklch(0.64 0.135 15)",
    parentType: "Spinel",
  },
  "Pink Spinel": {
    name: "Pink Spinel",
    description:
      "Spinel is a naturally occurring gemstone known for its excellent brilliance and wide range of colors. Sri Lankan Spinel can occur in red, pink, blue, purple, white and green, offering a diverse selection for collectors and jewellery.",
    image: "/gems/Spinel/spinel.webp",
    accent: "oklch(0.70 0.110 350)",
    parentType: "Spinel",
  },
  "White Spinel": {
    name: "White Spinel",
    description:
      "Spinel is a naturally occurring gemstone known for its excellent brilliance and wide range of colors. Sri Lankan Spinel can occur in red, pink, blue, purple, white and green, offering a diverse selection for collectors and jewellery.",
    image: "/gems/Spinel/spinel.webp",
    accent: "oklch(0.80 0.015 240)",
    parentType: "Spinel",
  },
  "Green Spinel": {
    name: "Green Spinel",
    description:
      "Spinel is a naturally occurring gemstone known for its excellent brilliance and wide range of colors. Sri Lankan Spinel can occur in red, pink, blue, purple, white and green, offering a diverse selection for collectors and jewellery.",
    image: "/gems/Spinel/green.jpg",
    accent: "oklch(0.62 0.085 160)",
    parentType: "Spinel",
  },

  // ── Star Spinel ─────────────────────────────────────────────────────────
  "Star Spinel": {
    name: "Star Spinel",
    description:
      "Star Spinel is a phenomenal variety of spinel that can display a star-like optical effect across the surface of the gemstone. The phenomenon is relatively uncommon and can add significant visual character to the stone.",
    image: "/gems/Spinel/star.jpg",
    accent: "oklch(0.60 0.110 10)",
    parentType: "Star Spinel",
  },
  Red: {
    name: "Red Star Spinel",
    description:
      "Star Spinel is a phenomenal variety of spinel that can display a star-like optical effect across the surface of the gemstone. The phenomenon is relatively uncommon and can add significant visual character to the stone.",
    image: "/gems/Spinel/star.jpg",
    accent: "oklch(0.64 0.135 15)",
    parentType: "Star Spinel",
  },
  "Blue purple": {
    name: "Blue-Purple Star Spinel",
    description:
      "Star Spinel is a phenomenal variety of spinel that can display a star-like optical effect across the surface of the gemstone. The phenomenon is relatively uncommon and can add significant visual character to the stone.",
    image: "/gems/Spinel/star.jpg",
    accent: "oklch(0.62 0.100 280)",
    parentType: "Star Spinel",
  },

  // ── Garnet varieties ────────────────────────────────────────────────────
  Garnet: {
    name: "Garnet",
    description:
      "Garnet is a gemstone family occurring in a wide variety of colors and compositions. Sri Lankan Garnets are known for their attractive natural colors, brilliance and durability, making them suitable for both jewellery and gemstone collections.",
    image: "/gems/Garnet/garnet.jpg",
    accent: "oklch(0.60 0.140 25)",
    parentType: "Garnet",
  },
  "Pyrope Garnet": {
    name: "Pyrope Garnet",
    description:
      "Garnet is a gemstone family occurring in a wide variety of colors and compositions. Sri Lankan Garnets are known for their attractive natural colors, brilliance and durability, making them suitable for both jewellery and gemstone collections.",
    image: "/gems/Garnet/perope.jpg",
    accent: "oklch(0.62 0.140 20)",
    parentType: "Garnet",
  },
  "Almandine Garnet": {
    name: "Almandine Garnet",
    description:
      "Garnet is a gemstone family occurring in a wide variety of colors and compositions. Sri Lankan Garnets are known for their attractive natural colors, brilliance and durability, making them suitable for both jewellery and gemstone collections.",
    image: "/gems/Garnet/garnet.jpg",
    accent: "oklch(0.60 0.145 18)",
    parentType: "Garnet",
  },
  "Hessonite Garnet": {
    name: "Hessonite Garnet",
    description:
      "Garnet is a gemstone family occurring in a wide variety of colors and compositions. Sri Lankan Garnets are known for their attractive natural colors, brilliance and durability, making them suitable for both jewellery and gemstone collections.",
    image: "/gems/Garnet/hessonite.webp",
    accent: "oklch(0.65 0.120 55)",
    parentType: "Garnet",
  },

  // ── Zircon varieties ────────────────────────────────────────────────────
  Zircon: {
    name: "Zircon",
    description:
      "Zircon is a natural gemstone known for its exceptional brilliance, strong dispersion and wide range of natural colors. Sri Lankan Zircon is particularly well known and can occur in yellow, brown, green and other attractive shades.",
    image: "/gems/Zircon/dscn0704.jpg",
    accent: "oklch(0.70 0.040 220)",
    parentType: "Zircon",
  },
  "Green Zircon": {
    name: "Green Zircon",
    description:
      "Zircon is a natural gemstone known for its exceptional brilliance, strong dispersion and wide range of natural colors. Sri Lankan Zircon is particularly well known and can occur in yellow, brown, green and other attractive shades.",
    image: "/gems/Zircon/zercon.jpg",
    accent: "oklch(0.65 0.080 155)",
    parentType: "Zircon",
  },
  "Brown Zircon": {
    name: "Brown Zircon",
    description:
      "Zircon is a natural gemstone known for its exceptional brilliance, strong dispersion and wide range of natural colors. Sri Lankan Zircon is particularly well known and can occur in yellow, brown, green and other attractive shades.",
    image: "/gems/Zircon/brwn xir.webp",
    accent: "oklch(0.60 0.080 55)",
    parentType: "Zircon",
  },
  "Yellow Zircon": {
    name: "Yellow Zircon",
    description:
      "Zircon is a natural gemstone known for its exceptional brilliance, strong dispersion and wide range of natural colors. Sri Lankan Zircon is particularly well known and can occur in yellow, brown, green and other attractive shades.",
    image: "/gems/Zircon/zercon.jpg",
    accent: "oklch(0.75 0.095 85)",
    parentType: "Zircon",
  },

  // ── Tourmaline varieties ────────────────────────────────────────────────
  Tourmaline: {
    name: "Tourmaline",
    description:
      "Tourmaline is one of the most color-diverse gemstone families, occurring naturally in many different colors. Sri Lankan and regional stones can display attractive brown, honey and green tones, with each crystal offering its own distinctive color and character.",
    image: "/gems/Tourmaline/brown.jpg",
    accent: "oklch(0.62 0.120 350)",
    parentType: "Tourmaline",
  },
  Brown: {
    name: "Brown Tourmaline",
    description:
      "Tourmaline is one of the most color-diverse gemstone families, occurring naturally in many different colors. Sri Lankan and regional stones can display attractive brown, honey and green tones, with each crystal offering its own distinctive color and character.",
    image: "/gems/Tourmaline/brown.jpg",
    accent: "oklch(0.58 0.080 50)",
    parentType: "Tourmaline",
  },
  Honey: {
    name: "Honey Tourmaline",
    description:
      "Tourmaline is one of the most color-diverse gemstone families, occurring naturally in many different colors. Sri Lankan and regional stones can display attractive brown, honey and green tones, with each crystal offering its own distinctive color and character.",
    image: "/gems/Tourmaline/yellow.webp",
    accent: "oklch(0.70 0.100 75)",
    parentType: "Tourmaline",
  },
  "Green Tourmaline": {
    name: "Green Tourmaline",
    description:
      "Tourmaline is one of the most color-diverse gemstone families, occurring naturally in many different colors. Sri Lankan and regional stones can display attractive brown, honey and green tones, with each crystal offering its own distinctive color and character.",
    image: "/gems/Tourmaline/green.avif",
    accent: "oklch(0.60 0.100 155)",
    parentType: "Tourmaline",
  },

  // ── Beryl varieties ─────────────────────────────────────────────────────
  Beryl: {
    name: "Beryl",
    description:
      "Beryl is a gemstone family that includes several important varieties. In the Sri Lankan market, Aquamarine and colorless or white Beryl are among the varieties encountered. Beryl is appreciated for its clarity, transparency and attractive natural colors.",
    image: "/gems/Beryl/aqamerine.jpg",
    accent: "oklch(0.65 0.090 175)",
    parentType: "Beryl",
  },
  Aquamarine: {
    name: "Aquamarine",
    description:
      "Aquamarine is the blue to blue-green variety of beryl. Its delicate ocean-like colors, transparency and brilliance make it a popular gemstone for jewellery.",
    image: "/gems/Beryl/aqamerine.jpg",
    accent: "oklch(0.68 0.075 210)",
    parentType: "Beryl",
  },
  "White / Colorless Beryl": {
    name: "White / Colorless Beryl",
    description:
      "White or colorless Beryl is a transparent variety of beryl with little or no visible body color. Clean examples can display attractive brilliance and clarity.",
    image: "/gems/Beryl/Natural-White-Beryl-gems-756e-1672917943.webp",
    accent: "oklch(0.80 0.015 200)",
    parentType: "Beryl",
  },

  // ── Moonstone varieties ─────────────────────────────────────────────────
  Moonstone: {
    name: "Moonstone",
    description:
      "Moonstone is a feldspar gemstone recognized for its distinctive floating glow, known as adularescence. Sri Lankan Moonstone is particularly associated with soft white and bluish appearances, with the moving light effect giving each stone a unique character.",
    image: "/gems/Moonstone/moonstone.jpg",
    accent: "oklch(0.80 0.020 240)",
    parentType: "Moonstone",
  },
  "Bluish Moonstone": {
    name: "Bluish Moonstone",
    description:
      "Bluish Moonstone displays a characteristic blue or bluish adularescent glow across a translucent to transparent body.",
    image: "/gems/Moonstone/moonstone.jpg",
    accent: "oklch(0.72 0.045 225)",
    parentType: "Moonstone",
  },
  "Whitish Moonstone": {
    name: "Whitish Moonstone",
    description:
      "Whitish Moonstone has a pale or white body with a soft, floating adularescent sheen. Its gentle appearance makes it a popular traditional gemstone.",
    image: "/gems/Moonstone/moonstone.jpg",
    accent: "oklch(0.85 0.010 240)",
    parentType: "Moonstone",
  },

  // ── Quartz varieties ────────────────────────────────────────────────────
  Quartz: {
    name: "Quartz",
    description:
      "Quartz is one of the most abundant and diverse gemstone minerals and occurs in many colors and varieties. Sri Lankan Quartz can be found in clear, yellow, purple, pink, brown and other natural forms, including distinctive varieties such as Amethyst, Ametrine and Rutilated Quartz.",
    image: "/gems/Quartz/amatrine.jpg",
    accent: "oklch(0.72 0.030 310)",
    parentType: "Quartz",
  },
  Amethyst: {
    name: "Amethyst",
    description:
      "Amethyst is the purple variety of quartz, ranging from light lavender to deeper purple tones. It is one of the most recognized and popular quartz gemstones.",
    image: "/gems/Quartz/amethyst.jpg",
    accent: "oklch(0.64 0.095 313)",
    parentType: "Quartz",
  },
  "Purple / Amethyst": {
    name: "Amethyst",
    description:
      "Amethyst is the purple variety of quartz, ranging from light lavender to deeper purple tones. It is one of the most recognized and popular quartz gemstones.",
    image: "/gems/Quartz/amethyst.jpg",
    accent: "oklch(0.64 0.095 313)",
    parentType: "Quartz",
  },
  Ametrine: {
    name: "Ametrine",
    description:
      "Ametrine is a naturally occurring quartz variety displaying both purple amethyst and yellow or golden citrine colors within the same crystal.",
    image: "/gems/Quartz/amatrine.jpg",
    accent: "oklch(0.68 0.080 290)",
    parentType: "Quartz",
  },
  "Rutilated Quartz": {
    name: "Rutilated Quartz",
    description:
      "Rutilated Quartz contains visible needle-like inclusions of rutile within transparent or translucent quartz, creating distinctive natural patterns inside the gemstone.",
    image: "/gems/Quartz/Coffin_Black_Rutilated_Quartz_600x600.jpg",
    accent: "oklch(0.68 0.060 70)",
    parentType: "Quartz",
  },
  Colorless: {
    name: "Colorless Quartz",
    description:
      "Quartz is one of the most abundant and diverse gemstone minerals and occurs in many colors and varieties. Sri Lankan Quartz can be found in clear, yellow, purple, pink, brown and other natural forms.",
    image: "/gems/Quartz/color-less.webp",
    accent: "oklch(0.78 0.010 220)",
    parentType: "Quartz",
  },
  Lemon: {
    name: "Lemon Quartz",
    description:
      "Quartz is one of the most abundant and diverse gemstone minerals and occurs in many colors and varieties. Sri Lankan Quartz can be found in clear, yellow, purple, pink, brown and other natural forms.",
    image: "/gems/Quartz/10.5-Carat_Lemon_Quartz_Stone.webp",
    accent: "oklch(0.80 0.105 95)",
    parentType: "Quartz",
  },

  // ── Topaz varieties ─────────────────────────────────────────────────────
  Topaz: {
    name: "Topaz",
    description:
      "Topaz is a transparent gemstone known for its excellent clarity, brilliance and range of colors. It occurs naturally in colorless, yellow, brown and other shades, while some colors may also be produced or enhanced through treatment.",
    image: "/gems/Topaz/topaz.jpg",
    accent: "oklch(0.72 0.070 50)",
    parentType: "Topaz",
  },

  // ── Rare Gems ───────────────────────────────────────────────────────────
  "Cobalt Spinel": {
    name: "Cobalt Spinel",
    description:
      "Cobalt Spinel is a rare and highly distinctive variety of spinel associated with intense blue coloration. Fine blue examples are particularly sought after by collectors because of their rarity and striking color.",
    image: "/gems/Rare/cobolt-spinel.jpg",
    accent: "oklch(0.55 0.140 250)",
    parentType: "Rare Gems",
  },
  Singhalite: {
    name: "Singhalite",
    description:
      "Singhalite is a rare gemstone first identified in Sri Lanka and named after the Sinhalese people. It is known for its greenish-yellow to brownish-green colors and is particularly interesting to collectors of rare Sri Lankan gemstones.",
    image: "/gems/Rare/sinhalite.webp",
    accent: "oklch(0.65 0.090 95)",
    parentType: "Rare Gems",
  },
  Kornerupine: {
    name: "Kornerupine",
    description:
      "Kornerupine is a relatively rare gemstone occurring in colors ranging from green to yellowish-green and brownish tones. Transparent gem-quality material is uncommon, making it an interesting collector's stone.",
    image: "/gems/Rare/kornupine.webp",
    accent: "oklch(0.60 0.095 145)",
    parentType: "Rare Gems",
  },
  Serendibite: {
    name: "Serendibite",
    description:
      "Serendibite is an exceptionally rare mineral named after Serendib, the historic name associated with Sri Lanka. Gem-quality Serendibite is extremely uncommon and is highly regarded among collectors of rare gemstones.",
    image: "/gems/Rare/Serendibite.webp",
    accent: "oklch(0.50 0.060 270)",
    parentType: "Rare Gems",
  },
  Taaffeite: {
    name: "Taaffeite",
    description:
      "Taaffeite is an exceptionally rare gemstone recognized for its unusual optical and physical properties. It can occur in attractive pink, mauve, violet and other subtle colors and is considered a prized collector's gemstone.",
    image: "/gems/Rare/taaffeite.webp",
    accent: "oklch(0.68 0.085 340)",
    parentType: "Rare Gems",
  },
};

/**
 * Convert any label to a URL-safe slug.
 * e.g. "Chrysoberyl Cat's Eye" → "chrysoberyl-cats-eye"
 */
export function labelToSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Find a GemInfo by URL slug (reverse of labelToSlug).
 */
export function slugToGemInfo(slug: string): GemInfo | undefined {
  for (const [key, info] of Object.entries(gemInfoMap)) {
    if (labelToSlug(key) === slug) return info;
  }
  return undefined;
}

/**
 * Resolve a gem description by its label.
 */
export function getGemInfo(label: string): GemInfo | undefined {
  return gemInfoMap[label];
}
