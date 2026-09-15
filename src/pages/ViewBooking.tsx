import { Link } from "react-router-dom";
import { loadCompleted } from "../context/BookingProvider";
import { formatCurrency, hasCarpet, hasHouse } from "../utils/calculatePrice";

export function ViewBookingPage() {
  const booking = loadCompleted();
  if (!booking) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-serif text-3xl">No booking to show</h1>
        <p className="mt-3 text-ink-muted">Complete a demo booking to view the confirmation summary.</p>
        <Link to="/booking" className="mt-6 inline-flex font-semibold text-forest hover:underline">
          Start booking
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage">Your booking</p>
      <h1 className="mt-3 font-serif text-4xl">#{booking.confirmationNumber}</h1>
      <div className="mt-8 space-y-4 rounded-[1.75rem] border border-sand bg-white p-6 text-sm">
        <p>
          <strong>Name</strong>
          <br />
          {booking.customer.firstName} {booking.customer.lastName}
        </p>
        <p>
          <strong>Services</strong>
          <br />
          {hasHouse(booking.selectedServices) ? "House Cleaning" : null}
          {hasHouse(booking.selectedServices) && hasCarpet(booking.selectedServices) ? " + " : null}
          {hasCarpet(booking.selectedServices) ? "Carpet Cleaning" : null}
        </p>
        <p>
          <strong>When</strong>
          <br />
          {new Date(`${booking.appointment.date}T12:00:00`).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          <br />
          {booking.appointment.timeLabel}
        </p>
        <p>
          <strong>Where</strong>
          <br />
          {booking.address.street}
          {booking.address.unit ? `, ${booking.address.unit}` : ""}
          <br />
          {booking.address.city}, {booking.address.state} {booking.address.zip}
        </p>
        <p>
          <strong>Total</strong>
          <br />
          {formatCurrency(booking.total)} ·{" "}
          {booking.payment.method === "pay_now" ? "Paid (demo)" : "Card saved (demo)"}
        </p>
      </div>
      <Link to="/" className="mt-8 inline-flex font-semibold text-forest hover:underline">
        Back to home
      </Link>
    </div>
  );
}
