export type ServiceId = "house" | "carpet";

export type CleaningType = "standard" | "deep" | "move";

export type CarpetRoomSize = "small" | "standard" | "large";

export type PaymentMethod = "pay_now" | "save_card";

export type PaymentStatus = "pending" | "processing" | "success" | "failed";

export type BookingStep =
  | "service"
  | "house"
  | "carpet"
  | "estimate"
  | "address"
  | "schedule"
  | "customer"
  | "review"
  | "payment"
  | "confirmation";

export interface HouseAddon {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface CarpetAddon {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface HouseCleaningConfig {
  bedrooms: number;
  bathrooms: number;
  cleaningType: CleaningType;
  addons: string[];
}

export interface CarpetCleaningConfig {
  bedrooms: number;
  livingRooms: number;
  diningRooms: number;
  hallways: number;
  stairs: number;
  otherAreas: number;
  roomSize: CarpetRoomSize;
  squareFootage?: number;
  addons: string[];
}

export interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
}

export interface Appointment {
  date: string;
  timeSlotId: string;
  timeLabel: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface Payment {
  method: PaymentMethod;
  status: PaymentStatus;
}

export interface PriceLine {
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  houseSubtotal: number;
  carpetSubtotal: number;
  houseAddonTotal: number;
  carpetAddonTotal: number;
  addonTotal: number;
  houseLines: PriceLine[];
  carpetLines: PriceLine[];
  addonLines: PriceLine[];
  total: number;
}

export interface TimeSlot {
  id: string;
  label: string;
  start: string;
  end: string;
  available: boolean;
}

export interface BookingState {
  selectedServices: ServiceId[];
  houseCleaning: HouseCleaningConfig;
  carpetCleaning: CarpetCleaningConfig;
  address: Address;
  appointment?: Appointment;
  customer: Customer;
  payment?: Payment;
  confirmationNumber?: string;
  zipStatus?: "idle" | "checking" | "available" | "unavailable";
}

export interface CompletedBooking extends BookingState {
  appointment: Appointment;
  payment: Payment;
  confirmationNumber: string;
  total: number;
}
