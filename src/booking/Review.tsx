import { useEffect } from "react";
import { Button } from "../components/Button";
import { PriceBreakdownView } from "../components/PriceBreakdown";
import { CLEANING_TYPES } from "../data/pricing";
import { useBooking } from "../context/bookingDefaults";
import type { BookingStep } from "../types/booking";
import { getPriceBreakdown, hasCarpet, hasHouse } from "../utils/calculatePrice";
import type { StepCta } from "./stepCta";

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function EditLink({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="text-sm font-semibold text-sage hover:underline" onClick={onClick}>
      Edit
    </button>
  );
}

export function Review({
  onContinue,
  onBack,
  setCta,
}: {
  onContinue: () => void;
  onBack: () => void;
  setCta: (cta: StepCta) => void;
}) {
  const { booking, setStep } = useBooking();
  const price = getPriceBreakdown(booking);
  const houseType = CLEANING_TYPES.find((t) => t.id === booking.houseCleaning.cleaningType);
  const a = booking.address;

  useEffect(() => {
    setCta({ label: "Continue to payment", run: onContinue });
  });

  function edit(step: BookingStep) {
    setStep(step);
  }

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl">Review your booking</h1>
      <p className="mt-2 text-ink-muted">Confirm the details below, then continue to secure payment.</p>

      <div className="mt-8 space-y-4">
        {hasHouse(booking.selectedServices) ? (
          <section className="rounded-3xl border border-sand bg-white p-5">
            <div className="flex items-start justify-between">
              <h2 className="font-semibold">House Cleaning</h2>
              <EditLink onClick={() => edit("house")} />
            </div>
            <ul className="mt-2 text-sm text-ink-muted">
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

        {hasCarpet(booking.selectedServices) ? (
          <section className="rounded-3xl border border-sand bg-white p-5">
            <div className="flex items-start justify-between">
              <h2 className="font-semibold">Carpet Cleaning</h2>
              <EditLink onClick={() => edit("carpet")} />
            </div>
            <ul className="mt-2 text-sm text-ink-muted">
              {booking.carpetCleaning.bedrooms ? <li>{booking.carpetCleaning.bedrooms} Bedrooms</li> : null}
              {booking.carpetCleaning.livingRooms ? (
                <li>{booking.carpetCleaning.livingRooms} Living room</li>
              ) : null}
              {booking.carpetCleaning.diningRooms ? (
                <li>{booking.carpetCleaning.diningRooms} Dining room</li>
              ) : null}
              {booking.carpetCleaning.hallways ? <li>{booking.carpetCleaning.hallways} Hallway</li> : null}
              {booking.carpetCleaning.stairs ? <li>{booking.carpetCleaning.stairs} Stairs</li> : null}
              {booking.carpetCleaning.otherAreas ? <li>{booking.carpetCleaning.otherAreas} Other areas</li> : null}
            </ul>
          </section>
        ) : null}

        <section className="rounded-3xl border border-sand bg-white p-5">
          <div className="flex items-start justify-between">
            <h2 className="font-semibold">Address</h2>
            <EditLink onClick={() => edit("address")} />
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            {a.street}
            {a.unit ? `, ${a.unit}` : ""}
            <br />
            {a.city}, {a.state} {a.zip}
          </p>
        </section>

        <section className="rounded-3xl border border-sand bg-white p-5">
          <div className="flex items-start justify-between">
            <h2 className="font-semibold">Appointment</h2>
            <EditLink onClick={() => edit("schedule")} />
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            {booking.appointment ? formatDate(booking.appointment.date) : "Not selected"}
            <br />
            {booking.appointment?.timeLabel}
          </p>
        </section>

        <section className="rounded-3xl border border-sand bg-white p-5">
          <div className="flex items-start justify-between">
            <h2 className="font-semibold">Your information</h2>
            <EditLink onClick={() => edit("customer")} />
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            {booking.customer.firstName} {booking.customer.lastName}
            <br />
            {booking.customer.email}
            <br />
            {booking.customer.phone}
          </p>
        </section>

        <PriceBreakdownView
          price={price}
          showHouse={hasHouse(booking.selectedServices)}
          showCarpet={hasCarpet(booking.selectedServices)}
        />
      </div>

      <div className="mt-8 hidden gap-3 md:flex">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={onContinue}>
          Continue to payment
        </Button>
      </div>
    </div>
  );
}
