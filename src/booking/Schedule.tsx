import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Calendar } from "../components/Calendar";
import { TimeSlotPicker } from "../components/TimeSlotPicker";
import { useBooking } from "../context/bookingDefaults";
import type { TimeSlot } from "../types/booking";
import { getAvailableSlots } from "../utils/mockApi";
import type { StepCta } from "./stepCta";

export function Schedule({
  onContinue,
  onBack,
  setCta,
}: {
  onContinue: () => void;
  onBack: () => void;
  setCta: (cta: StepCta) => void;
}) {
  const { booking, setAppointment } = useBooking();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const date = booking.appointment?.date;

  useEffect(() => {
    if (!date) {
      setSlots([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    void getAvailableSlots(date).then((result) => {
      if (cancelled) return;
      setSlots(result);
      setLoading(false);
      const stillValid = result.find(
        (s) => s.id === booking.appointment?.timeSlotId && s.available,
      );
      if (!stillValid && booking.appointment?.timeSlotId) {
        setAppointment({ date, timeSlotId: "", timeLabel: "" });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [date]);

  function continueFlow() {
    if (!date) {
      setError("Please select an appointment date.");
      return;
    }
    if (!booking.appointment?.timeSlotId) {
      setError("Please select an available time.");
      return;
    }
    onContinue();
  }

  useEffect(() => {
    setCta({
      label: booking.appointment?.timeSlotId ? "Continue" : "Select time",
      disabled: !booking.appointment?.timeSlotId,
      run: continueFlow,
    });
  });

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl">Choose your appointment</h1>
      <p className="mt-2 text-ink-muted">Select a future date, then pick an open arrival window.</p>
      <div className="mt-8">
        <Calendar
          value={date}
          onChange={(iso) => {
            setError("");
            setAppointment({ date: iso, timeSlotId: "", timeLabel: "" });
          }}
        />
      </div>
      {date ? (
        <div className="mt-6">
          <h2 className="mb-3 font-semibold">
            {new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </h2>
          <TimeSlotPicker
            slots={slots}
            loading={loading}
            selectedId={booking.appointment?.timeSlotId}
            onSelect={(slot) => {
              setError("");
              setAppointment({ date, timeSlotId: slot.id, timeLabel: slot.label });
            }}
          />
        </div>
      ) : null}
      {error ? (
        <p className="mt-3 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-8 hidden gap-3 md:flex">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={continueFlow} disabled={!booking.appointment?.timeSlotId}>
          Continue
        </Button>
      </div>
    </div>
  );
}
