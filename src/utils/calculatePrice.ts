import { CARPET_ADDONS, HOUSE_ADDONS, PRICING } from "../data/pricing";
import type {
  BookingState,
  CarpetCleaningConfig,
  HouseCleaningConfig,
  PriceBreakdown,
  PriceLine,
  ServiceId,
} from "../types/booking";

function qtyLabel(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function calculateHousePrice(config: HouseCleaningConfig): {
  subtotal: number;
  addonTotal: number;
  lines: PriceLine[];
  addonLines: PriceLine[];
} {
  const lines: PriceLine[] = [
    { label: "Base cleaning", amount: PRICING.house.base },
    {
      label: qtyLabel(config.bedrooms, "bedroom", "bedrooms"),
      amount: config.bedrooms * PRICING.house.bedroom,
    },
    {
      label: qtyLabel(config.bathrooms, "bathroom", "bathrooms"),
      amount: config.bathrooms * PRICING.house.bathroom,
    },
  ];

  const typeSurcharge = PRICING.house.cleaningType[config.cleaningType];
  if (typeSurcharge) {
    const names = {
      standard: "Standard cleaning",
      deep: "Deep cleaning",
      move: "Move in / move out",
    };
    lines.push({ label: names[config.cleaningType], amount: typeSurcharge });
  }

  const addonLines: PriceLine[] = [];
  for (const addon of HOUSE_ADDONS) {
    if (config.addons.includes(addon.id)) {
      addonLines.push({ label: addon.name, amount: addon.price });
    }
  }

  const addonTotal = addonLines.reduce((sum, line) => sum + line.amount, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0) + addonTotal;
  return { subtotal, addonTotal, lines, addonLines };
}

export function calculateCarpetPrice(config: CarpetCleaningConfig): {
  subtotal: number;
  addonTotal: number;
  lines: PriceLine[];
  addonLines: PriceLine[];
} {
  const areas: PriceLine[] = [
    { label: "Base carpet cleaning", amount: PRICING.carpet.base },
  ];

  if (config.bedrooms)
    areas.push({
      label: qtyLabel(config.bedrooms, "bedroom", "bedrooms"),
      amount: config.bedrooms * PRICING.carpet.bedroom,
    });
  if (config.livingRooms)
    areas.push({
      label: qtyLabel(config.livingRooms, "living room", "living rooms"),
      amount: config.livingRooms * PRICING.carpet.livingRoom,
    });
  if (config.diningRooms)
    areas.push({
      label: qtyLabel(config.diningRooms, "dining room", "dining rooms"),
      amount: config.diningRooms * PRICING.carpet.diningRoom,
    });
  if (config.hallways)
    areas.push({
      label: qtyLabel(config.hallways, "hallway", "hallways"),
      amount: config.hallways * PRICING.carpet.hallway,
    });
  if (config.stairs)
    areas.push({
      label: qtyLabel(config.stairs, "stairway", "stairways"),
      amount: config.stairs * PRICING.carpet.stairs,
    });
  if (config.otherAreas)
    areas.push({
      label: qtyLabel(config.otherAreas, "other area", "other areas"),
      amount: config.otherAreas * PRICING.carpet.otherArea,
    });

  const areaSubtotal = areas.reduce((sum, line) => sum + line.amount, 0);
  const multiplier = PRICING.carpet.roomSizeMultiplier[config.roomSize];
  const sized = Math.round(areaSubtotal * multiplier);
  const sizeDelta = sized - areaSubtotal;

  const lines = [...areas];
  if (config.roomSize === "small") {
    lines.push({ label: "Small room adjustment", amount: sizeDelta });
  } else if (config.roomSize === "large") {
    lines.push({ label: "Large room surcharge", amount: sizeDelta });
  }

  if (config.squareFootage && config.squareFootage > PRICING.carpet.squareFootageSurchargeOver) {
    const extraHundreds = Math.ceil(
      (config.squareFootage - PRICING.carpet.squareFootageSurchargeOver) / 100,
    );
    lines.push({
      label: "Square footage surcharge",
      amount: extraHundreds * PRICING.carpet.squareFootagePer100,
    });
  }

  const addonLines: PriceLine[] = [];
  for (const addon of CARPET_ADDONS) {
    if (config.addons.includes(addon.id)) {
      addonLines.push({ label: addon.name, amount: addon.price });
    }
  }

  const addonTotal = addonLines.reduce((sum, line) => sum + line.amount, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0) + addonTotal;
  return { subtotal, addonTotal, lines, addonLines };
}

export function calculatePrice(
  selectedServices: ServiceId[],
  houseCleaning: HouseCleaningConfig,
  carpetCleaning: CarpetCleaningConfig,
): PriceBreakdown {
  const includeHouse = selectedServices.includes("house");
  const includeCarpet = selectedServices.includes("carpet");

  const house = includeHouse
    ? calculateHousePrice(houseCleaning)
    : { subtotal: 0, addonTotal: 0, lines: [], addonLines: [] };
  const carpet = includeCarpet
    ? calculateCarpetPrice(carpetCleaning)
    : { subtotal: 0, addonTotal: 0, lines: [], addonLines: [] };

  const houseService = house.subtotal - house.addonTotal;
  const carpetService = carpet.subtotal - carpet.addonTotal;
  const addonTotal = house.addonTotal + carpet.addonTotal;

  return {
    houseSubtotal: house.subtotal,
    carpetSubtotal: carpet.subtotal,
    houseAddonTotal: house.addonTotal,
    carpetAddonTotal: carpet.addonTotal,
    addonTotal,
    houseLines: house.lines,
    carpetLines: carpet.lines,
    addonLines: [...house.addonLines, ...carpet.addonLines],
    total: houseService + carpetService + addonTotal,
  };
}

export function getPriceBreakdown(state: BookingState): PriceBreakdown {
  return calculatePrice(state.selectedServices, state.houseCleaning, state.carpetCleaning);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function hasHouse(services: ServiceId[]) {
  return services.includes("house");
}

export function hasCarpet(services: ServiceId[]) {
  return services.includes("carpet");
}

export function carpetAreaCount(config: CarpetCleaningConfig) {
  return (
    config.bedrooms +
    config.livingRooms +
    config.diningRooms +
    config.hallways +
    config.stairs +
    config.otherAreas
  );
}
