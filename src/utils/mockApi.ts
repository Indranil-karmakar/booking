import { hashDate, TIME_SLOT_TEMPLATES, UNSERVICED_ZIPS } from "../data/availability";
import type { BookingState, TimeSlot } from "../types/booking";
import { calculatePrice } from "./calculatePrice";
import { isValidZip } from "./validation";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Replace with backend pricing API. */
export async function calculateEstimate(state: BookingState) {
  await wait(250);
  return calculatePrice(state.selectedServices, state.houseCleaning, state.carpetCleaning);
}

/** Replace with scheduling API. */
export async function getAvailableSlots(isoDate: string): Promise<TimeSlot[]> {
  await wait(180);
  const hash = hashDate(isoDate);
  const bookedIndex = hash % TIME_SLOT_TEMPLATES.length;
  const secondBooked = (hash * 3) % TIME_SLOT_TEMPLATES.length;

  return TIME_SLOT_TEMPLATES.map((slot, index) => ({
    ...slot,
    available: index !== bookedIndex && index !== secondBooked,
  }));
}

export async function checkServiceArea(zip: string) {
  await wait(400);
  if (!isValidZip(zip)) {
    return { ok: false as const, message: "Please enter a valid 5-digit ZIP code." };
  }
  if (UNSERVICED_ZIPS.has(zip)) {
    return {
      ok: false as const,
      message: "Sorry, we currently don't service this area.",
    };
  }
  return { ok: true as const, message: "Great! We service this area." };
}

/** Replace with booking API. */
export async function createBooking(_state: BookingState) {
  await wait(500);
  const n = 10000 + Math.floor(Math.random() * 89999);
  return { confirmationNumber: `CLN-${n}` };
}

/** Replace with Square Web Payments SDK. Demo only — never send card data. */
export async function createSquarePayment(cardNumber: string) {
  await wait(1100);
  const digits = cardNumber.replace(/\s/g, "");
  if (digits.endsWith("0002")) {
    return { ok: false as const, message: "Payment could not be completed." };
  }
  if (digits.length < 16) {
    return { ok: false as const, message: "Please check your payment information and try again." };
  }
  return { ok: true as const };
}

/** Replace with Square card-on-file / customer API. */
export async function saveSquarePaymentMethod(cardNumber: string) {
  await wait(900);
  const digits = cardNumber.replace(/\s/g, "");
  if (digits.endsWith("0002")) {
    return { ok: false as const, message: "Payment method could not be saved." };
  }
  if (digits.length < 16) {
    return { ok: false as const, message: "Please check your payment information and try again." };
  }
  return { ok: true as const };
}
