import type { TimeSlot } from "../types/booking";

export function TimeSlotPicker({
  slots,
  selectedId,
  onSelect,
  loading,
}: {
  slots: TimeSlot[];
  selectedId?: string;
  onSelect: (slot: TimeSlot) => void;
  loading?: boolean;
}) {
  if (loading) {
    return <p className="text-sm text-ink-muted">Checking availability…</p>;
  }

  if (slots.length === 0) {
    return (
      <div className="rounded-2xl border border-sand bg-white p-6 text-sm text-ink-muted">
        No available time slots for this date. Please choose another day.
      </div>
    );
  }

  const anyOpen = slots.some((s) => s.available);
  if (!anyOpen) {
    return (
      <div className="rounded-2xl border border-sand bg-white p-6 text-sm text-ink-muted">
        This date is fully booked. Please choose another day.
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {slots.map((slot) => {
        const selected = selectedId === slot.id;
        return (
          <button
            key={slot.id}
            type="button"
            disabled={!slot.available}
            aria-pressed={selected}
            onClick={() => onSelect(slot)}
            className={`flex h-14 items-center justify-between rounded-2xl border px-4 text-left font-semibold transition-colors ${
              !slot.available
                ? "cursor-not-allowed border-sand bg-mist text-ink-muted"
                : selected
                  ? "border-forest bg-sage-soft text-forest"
                  : "border-sand bg-white hover:border-sage"
            }`}
          >
            <span>{slot.label}</span>
            {!slot.available ? (
              <span className="text-xs font-bold uppercase tracking-wide">Booked</span>
            ) : selected ? (
              <span className="text-xs font-bold uppercase tracking-wide">Selected</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
