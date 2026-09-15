import { useCallback, useMemo, useState, type ReactNode } from "react";
import type {
  Address,
  Appointment,
  BookingState,
  BookingStep,
  CarpetCleaningConfig,
  CompletedBooking,
  Customer,
  HouseCleaningConfig,
  Payment,
  ServiceId,
} from "../types/booking";
import { getPriceBreakdown } from "../utils/calculatePrice";
import {
  BookingContext,
  COMPLETED_KEY,
  defaultBooking,
  getFlowSteps,
  STEP_KEY,
  STORAGE_KEY,
  type BookingContextValue,
} from "./bookingDefaults";

function loadBooking(): BookingState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultBooking;
    return { ...defaultBooking, ...JSON.parse(raw) } as BookingState;
  } catch {
    return defaultBooking;
  }
}

function persist(booking: BookingState) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
}

export function persistCompleted(booking: BookingState) {
  if (!booking.appointment || !booking.payment || !booking.confirmationNumber) return;
  const total = getPriceBreakdown(booking).total;
  const completed: CompletedBooking = {
    ...booking,
    appointment: booking.appointment,
    payment: booking.payment,
    confirmationNumber: booking.confirmationNumber,
    total,
  };
  sessionStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
}

function loadStep(): BookingStep {
  try {
    const raw = sessionStorage.getItem(STEP_KEY);
    return (raw as BookingStep) || "service";
  } catch {
    return "service";
  }
}

export function loadCompleted(): CompletedBooking | null {
  try {
    const raw = sessionStorage.getItem(COMPLETED_KEY);
    return raw ? (JSON.parse(raw) as CompletedBooking) : null;
  } catch {
    return null;
  }
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(loadBooking);
  const [step, setStepState] = useState<BookingStep>(loadStep);

  const commit = useCallback((next: BookingState) => {
    setBooking(next);
    persist(next);
  }, []);

  const flowSteps = useMemo(
    () => getFlowSteps(booking.selectedServices),
    [booking.selectedServices],
  );

  const setStep = useCallback((next: BookingStep) => {
    setStepState(next);
    sessionStorage.setItem(STEP_KEY, next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const setServices = useCallback(
    (services: ServiceId[]) => {
      commit({ ...booking, selectedServices: services });
    },
    [booking, commit],
  );

  const updateHouse = useCallback(
    (patch: Partial<HouseCleaningConfig>) => {
      commit({
        ...booking,
        houseCleaning: { ...booking.houseCleaning, ...patch },
      });
    },
    [booking, commit],
  );

  const updateCarpet = useCallback(
    (patch: Partial<CarpetCleaningConfig>) => {
      commit({
        ...booking,
        carpetCleaning: { ...booking.carpetCleaning, ...patch },
      });
    },
    [booking, commit],
  );

  const updateAddress = useCallback(
    (patch: Partial<Address>) => {
      commit({
        ...booking,
        address: { ...booking.address, ...patch },
        zipStatus: patch.zip !== undefined ? "idle" : booking.zipStatus,
      });
    },
    [booking, commit],
  );

  const setZipStatus = useCallback(
    (zipStatus: BookingState["zipStatus"]) => {
      commit({ ...booking, zipStatus });
    },
    [booking, commit],
  );

  const setAppointment = useCallback(
    (appointment: Appointment | undefined) => {
      commit({ ...booking, appointment });
    },
    [booking, commit],
  );

  const updateCustomer = useCallback(
    (patch: Partial<Customer>) => {
      commit({
        ...booking,
        customer: { ...booking.customer, ...patch },
      });
    },
    [booking, commit],
  );

  const setPayment = useCallback(
    (payment: Payment) => {
      commit({ ...booking, payment });
    },
    [booking, commit],
  );

  const setConfirmation = useCallback(
    (confirmationNumber: string, payment?: Payment) => {
      const next = {
        ...booking,
        confirmationNumber,
        payment: payment ?? booking.payment,
      };
      commit(next);
      persistCompleted(next);
    },
    [booking, commit],
  );

  const resetBooking = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STEP_KEY);
    setBooking(defaultBooking);
    setStepState("service");
  }, []);

  const goNext = useCallback(() => {
    const index = flowSteps.indexOf(step);
    const next = flowSteps[index + 1];
    if (next) setStep(next);
  }, [flowSteps, setStep, step]);

  const goBack = useCallback(() => {
    const index = flowSteps.indexOf(step);
    const prev = flowSteps[index - 1];
    if (prev) setStep(prev);
  }, [flowSteps, setStep, step]);

  const value: BookingContextValue = {
    booking,
    step,
    setStep,
    setServices,
    updateHouse,
    updateCarpet,
    updateAddress,
    setZipStatus,
    setAppointment,
    updateCustomer,
    setPayment,
    setConfirmation,
    resetBooking,
    goNext,
    goBack,
    flowSteps,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
