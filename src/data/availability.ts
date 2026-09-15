import type { TimeSlot } from "../types/booking";

export const TIME_SLOT_TEMPLATES: Omit<TimeSlot, "available">[] = [
  { id: "9-11", label: "9:00 AM – 11:00 AM", start: "09:00", end: "11:00" },
  { id: "10-12", label: "10:00 AM – 12:00 PM", start: "10:00", end: "12:00" },
  { id: "12-14", label: "12:00 PM – 2:00 PM", start: "12:00", end: "14:00" },
  { id: "14-16", label: "2:00 PM – 4:00 PM", start: "14:00", end: "16:00" },
  { id: "16-18", label: "4:00 PM – 6:00 PM", start: "16:00", end: "18:00" },
];

/** Mock ZIPs we do not currently service. All other valid 5-digit ZIPs are available. */
export const UNSERVICED_ZIPS = new Set([
  "00000",
  "11111",
  "99999",
  "00001",
  "55555",
]);

export function hashDate(isoDate: string): number {
  return isoDate.split("-").reduce((sum, part) => sum + Number(part), 0);
}
