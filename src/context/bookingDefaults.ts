import { createContext, useContext } from "react";
import type {
  Address,
  Appointment,
  BookingState,
  BookingStep,
  CarpetCleaningConfig,
  Customer,
  HouseCleaningConfig,
  Payment,
  ServiceId,
} from "../types/booking";

export const STORAGE_KEY = "havenstead-booking";
export const STEP_KEY = "havenstead-step";
export const COMPLETED_KEY = "havenstead-completed";

export const defaultHouse: HouseCleaningConfig = {
  bedrooms: 2,
  bathrooms: 2,
  cleaningType: "standard",
  addons: [],
};

export const defaultCarpet: CarpetCleaningConfig = {
  bedrooms: 2,
  livingRooms: 1,
  diningRooms: 0,
  hallways: 1,
  stairs: 0,
  otherAreas: 0,
  roomSize: "standard",
  addons: [],
};

export const defaultAddress: Address = {
  street: "",
  unit: "",
  city: "",
  state: "",
  zip: "",
};

export const defaultCustomer: Customer = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
};

export const defaultBooking: BookingState = {
  selectedServices: [],
  houseCleaning: defaultHouse,
  carpetCleaning: defaultCarpet,
  address: defaultAddress,
  customer: defaultCustomer,
  zipStatus: "idle",
};

export interface BookingContextValue {
  booking: BookingState;
  step: BookingStep;
  setStep: (step: BookingStep) => void;
  setServices: (services: ServiceId[]) => void;
  updateHouse: (patch: Partial<HouseCleaningConfig>) => void;
  updateCarpet: (patch: Partial<CarpetCleaningConfig>) => void;
  updateAddress: (patch: Partial<Address>) => void;
  setZipStatus: (status: BookingState["zipStatus"]) => void;
  setAppointment: (appointment: Appointment | undefined) => void;
  updateCustomer: (patch: Partial<Customer>) => void;
  setPayment: (payment: Payment) => void;
  setConfirmation: (confirmationNumber: string, payment?: Payment) => void;
  resetBooking: () => void;
  goNext: () => void;
  goBack: () => void;
  flowSteps: BookingStep[];
}

export const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

export const FLOW_ORDER: BookingStep[] = [
  "service",
  "house",
  "carpet",
  "estimate",
  "address",
  "schedule",
  "customer",
  "review",
  "payment",
  "confirmation",
];

export function getFlowSteps(services: ServiceId[]): BookingStep[] {
  return FLOW_ORDER.filter((step) => {
    if (step === "house") return services.includes("house");
    if (step === "carpet") return services.includes("carpet");
    return true;
  });
}
