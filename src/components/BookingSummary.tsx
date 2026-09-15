import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { CLEANING_TYPES } from "../data/pricing";
import type { BookingState, BookingStep } from "../types/booking";
import { formatCurrency, getPriceBreakdown, hasCarpet, hasHouse } from "../utils/calculatePrice";
import { Button } from "./Button";

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface BookingSummaryProps {
  booking: BookingState;
  onEdit?: (step: BookingStep) => void;
  mobileAction?: { label: string; disabled?: boolean; onClick: () => void };
}

export function BookingSummary({ booking, onEdit, mobileAction }: BookingSummaryProps) {
  const [open, setOpen] = useState(false);
  const price = getPriceBreakdown(booking);
  const houseOn = hasHouse(booking.selectedServices);
  const carpetOn = hasCarpet(booking.selectedServices);
  const houseType = CLEANING_TYPES.find((t) => t.id === booking.houseCleaning.cleaningType);

  const body = (
    <div className="space-y-5">
      <div>
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">Your booking</h2>
      </div>

      {booking.selectedServices.length === 0 ? (
        <p className="text-sm text-ink-muted">Select a service to see your estimate.</p>
      ) : null}

      {houseOn ? (
        <section>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-ink">House Cleaning</h3>
            {onEdit ? (
              <button
                type="button"
                className="text-sm font-semibold text-sage hover:underline"
                onClick={() => onEdit("house")}
              >
                Edit
              </button>
            ) : null}
          </div>
          <ul className="mt-1 text-sm text-ink-muted">
            <li>
              {booking.houseCleaning.bedrooms} Bedroom
              {booking.houseCleaning.bedrooms === 1 ? "" : "s"}
            </li>
            <li>
              {booking.houseCleaning.bathrooms} Bathroom
              {booking.houseCleaning.bathrooms === 1 ? "" : "s"}
            </li>
            <li>{houseType?.name}</li>
          </ul>
        </section>
      ) : null}

      {carpetOn ? (
        <section>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-ink">Carpet Cleaning</h3>
            {onEdit ? (
              <button
                type="button"
                className="text-sm font-semibold text-sage hover:underline"
                onClick={() => onEdit("carpet")}
              >
                Edit
              </button>
            ) : null}
          </div>
          <ul className="mt-1 text-sm text-ink-muted">
            {booking.carpetCleaning.bedrooms ? (
              <li>
                {booking.carpetCleaning.bedrooms} Bedroom
                {booking.carpetCleaning.bedrooms === 1 ? "" : "s"}
              </li>
            ) : null}
            {booking.carpetCleaning.livingRooms ? (
              <li>
                {booking.carpetCleaning.livingRooms} Living room
                {booking.carpetCleaning.livingRooms === 1 ? "" : "s"}
              </li>
            ) : null}
            {booking.carpetCleaning.diningRooms ? (
              <li>
                {booking.carpetCleaning.diningRooms} Dining room
                {booking.carpetCleaning.diningRooms === 1 ? "" : "s"}
              </li>
            ) : null}
            {booking.carpetCleaning.hallways ? (
              <li>
                {booking.carpetCleaning.hallways} Hallway
                {booking.carpetCleaning.hallways === 1 ? "" : "s"}
              </li>
            ) : null}
            {booking.carpetCleaning.stairs ? (
              <li>
                {booking.carpetCleaning.stairs} Stair
                {booking.carpetCleaning.stairs === 1 ? "" : "s"}
              </li>
            ) : null}
            {booking.carpetCleaning.otherAreas ? (
              <li>
                {booking.carpetCleaning.otherAreas} Other area
                {booking.carpetCleaning.otherAreas === 1 ? "" : "s"}
              </li>
            ) : null}
          </ul>
        </section>
      ) : null}

      {booking.appointment ? (
        <section>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-ink">Appointment</h3>
            {onEdit ? (
              <button
                type="button"
                className="text-sm font-semibold text-sage hover:underline"
                onClick={() => onEdit("schedule")}
              >
                Edit
              </button>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-ink-muted">{formatDate(booking.appointment.date)}</p>
          <p className="text-sm text-ink-muted">{booking.appointment.timeLabel}</p>
        </section>
      ) : null}

      {booking.selectedServices.length > 0 ? (
        <div className="border-t border-sand pt-4">
          {houseOn ? (
            <div className="flex justify-between text-sm">
              <span className="text-ink-muted">House Cleaning</span>
              <span className="font-medium">{formatCurrency(price.houseSubtotal - price.houseAddonTotal)}</span>
            </div>
          ) : null}
          {carpetOn ? (
            <div className="flex justify-between text-sm">
              <span className="text-ink-muted">Carpet Cleaning</span>
              <span className="font-medium">
                {formatCurrency(price.carpetSubtotal - price.carpetAddonTotal)}
              </span>
            </div>
          ) : null}
          {price.addonTotal > 0 ? (
            <div className="flex justify-between text-sm">
              <span className="text-ink-muted">Add-ons</span>
              <span className="font-medium">{formatCurrency(price.addonTotal)}</span>
            </div>
          ) : null}
          <div className="mt-3 flex items-end justify-between">
            <span className="text-sm font-semibold text-ink">Estimated total</span>
            <span className="font-serif text-3xl text-forest">{formatCurrency(price.total)}</span>
          </div>
          <p className="mt-2 text-xs text-ink-muted">Prototype pricing. Final amount confirmed after visit details.</p>
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      <aside className="hidden md:block">
        <div className="sticky top-24 rounded-3xl border border-sand bg-white p-6 shadow-[0_8px_30px_rgba(20,26,24,0.04)]">
          {body}
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-white/95 p-3 backdrop-blur-sm md:hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between px-1 pb-2"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className="text-sm font-semibold">Estimated {formatCurrency(price.total)}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open ? <div className="max-h-64 overflow-y-auto px-1 pb-3">{body}</div> : null}
        {mobileAction ? (
          <Button
            size="lg"
            className="w-full"
            disabled={mobileAction.disabled}
            onClick={mobileAction.onClick}
          >
            {mobileAction.label}
          </Button>
        ) : null}
      </div>
    </>
  );
}
