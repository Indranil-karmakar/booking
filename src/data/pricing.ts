import type { CarpetAddon, HouseAddon } from "../types/booking";

/** Central mock pricing. Replace with backend pricing APIs later. */
export const PRICING = {
  house: {
    base: 100,
    bedroom: 25,
    bathroom: 20,
    cleaningType: {
      standard: 0,
      deep: 50,
      move: 75,
    },
    addons: {
      fridge: 25,
      oven: 25,
      windows: 15,
      baseboards: 20,
      extra: 35,
    },
  },
  carpet: {
    base: 50,
    bedroom: 30,
    livingRoom: 50,
    diningRoom: 35,
    hallway: 20,
    stairs: 40,
    otherArea: 25,
    roomSizeMultiplier: {
      small: 0.85,
      standard: 1,
      large: 1.25,
    },
    squareFootageSurchargeOver: 2000,
    squareFootagePer100: 8,
    addons: {
      protectant: 30,
      deodorizer: 20,
      stain: 25,
      petOdor: 30,
    },
  },
} as const;

export const HOUSE_ADDONS: HouseAddon[] = [
  {
    id: "fridge",
    name: "Inside Refrigerator",
    description: "Wipe shelves, drawers, and interior walls.",
    price: PRICING.house.addons.fridge,
  },
  {
    id: "oven",
    name: "Inside Oven",
    description: "Deep clean the inside of your oven.",
    price: PRICING.house.addons.oven,
  },
  {
    id: "windows",
    name: "Interior Windows",
    description: "Interior glass and accessible sills.",
    price: PRICING.house.addons.windows,
  },
  {
    id: "baseboards",
    name: "Baseboards",
    description: "Dust and wipe baseboards throughout.",
    price: PRICING.house.addons.baseboards,
  },
  {
    id: "extra",
    name: "Extra Cleaning",
    description: "Additional time for heavily soiled areas.",
    price: PRICING.house.addons.extra,
  },
];

export const CARPET_ADDONS: CarpetAddon[] = [
  {
    id: "protectant",
    name: "Carpet Protectant",
    description: "Helps resist future stains and soil.",
    price: PRICING.carpet.addons.protectant,
  },
  {
    id: "deodorizer",
    name: "Deodorizer",
    description: "Freshens carpets after cleaning.",
    price: PRICING.carpet.addons.deodorizer,
  },
  {
    id: "stain",
    name: "Stain Treatment",
    description: "Targeted treatment for visible stains.",
    price: PRICING.carpet.addons.stain,
  },
  {
    id: "petOdor",
    name: "Pet Odor Treatment",
    description: "Neutralizes lingering pet odors.",
    price: PRICING.carpet.addons.petOdor,
  },
];

export const CLEANING_TYPES = [
  {
    id: "standard" as const,
    name: "Standard Cleaning",
    description: "Routine dusting, kitchens, baths, floors, and tidy surfaces.",
  },
  {
    id: "deep" as const,
    name: "Deep Cleaning",
    description: "A more thorough clean for buildup, corners, and detail work.",
  },
  {
    id: "move" as const,
    name: "Move In / Move Out",
    description: "Empty-home clean for arrivals, departures, or turnovers.",
  },
];

export const ROOM_SIZES = [
  {
    id: "small" as const,
    name: "Small",
    description: "Compact rooms and apartments.",
  },
  {
    id: "standard" as const,
    name: "Standard",
    description: "Typical home room sizes.",
  },
  {
    id: "large" as const,
    name: "Large",
    description: "Open layouts and oversized rooms.",
  },
];
