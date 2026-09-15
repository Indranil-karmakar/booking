import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useBooking } from "../context/bookingDefaults";
import { formatCurrency, getPriceBreakdown, hasCarpet, hasHouse } from "../utils/calculatePrice";

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function Confirmation() {
  const { booking, resetBooking, setStep } = useBooking();
  const total = getPriceBreakdown(booking).total;
  const paid = booking.payment?.method === "pay_now";

  return (
    <div className="mx-auto max-w-xl text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
        <Check className="h-8 w-8" strokeWidth={2.5} />
      </div>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-sage">Booking confirmed</p>
      <h1 className="mt-3 font-serif text-4xl">Thank you, {booking.customer.firstName}!</h1>
      <p className="mt-3 text-ink-muted">Your cleaning appointment is confirmed.</p>
      <p className="mt-2 font-semibold tracking-wide">BOOKING #{booking.confirmationNumber}</p>

      <div className="mt-8 rounded-3xl border border-sand bg-white p-6 text-left text-sm">
        <Row label="Services">
          {hasHouse(booking.selectedServices) ? <div>House Cleaning</div> : null}
          {hasCarpet(booking.selectedServices) ? <div>Carpet Cleaning</div> : null}
        </Row>
        <Row label="Date">{formatDate(booking.appointment?.date)}</Row>
        <Row label="Time">{booking.appointment?.timeLabel}</Row>
        <Row label="Address">
          {booking.address.street}
          {booking.address.unit ? `, ${booking.address.unit}` : ""}
          <br />
          {booking.address.city}, {booking.address.state} {booking.address.zip}
        </Row>
        <Row label="Total">{formatCurrency(total)}</Row>
        <Row label="Payment">
          {paid ? "Paid through Square (demo)" : "Payment method saved securely (demo)"}
        </Row>
      </div>

      <p className="mt-6 text-sm text-ink-muted">
        We’ve sent your booking confirmation to {booking.customer.email}. This is mock behavior for the
        prototype.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          to="/booking/view"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-forest px-6 font-semibold text-white"
        >
          View booking
        </Link>
        <Link
          to="/"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-sand bg-white px-6 font-semibold"
        >
          Back to home
        </Link>
      </div>
      <button
        type="button"
        className="mt-6 text-sm font-semibold text-sage hover:underline"
        onClick={() => {
          resetBooking();
          setStep("service");
        }}
      >
        Start a new booking
      </button>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 border-b border-sand py-3 last:border-0">
      <div className="text-xs font-bold uppercase tracking-wide text-ink-muted">{label}</div>
      <div className="font-medium text-ink">{children}</div>
    </div>
  );
}
