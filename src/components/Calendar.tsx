import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

function toISO(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

interface CalendarProps {
  value?: string;
  onChange: (isoDate: string) => void;
}

export function Calendar({ value, onChange }: CalendarProps) {
  const today = startOfDay(new Date());
  const initial = value ? new Date(`${value}T12:00:00`) : today;
  const [cursor, setCursor] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));

  const weeks = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    const rows: (Date | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [cursor]);

  const label = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="rounded-3xl border border-sand bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-sand hover:border-forest"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="font-serif text-lg">{label}</p>
        <button
          type="button"
          aria-label="Next month"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-sand hover:border-forest"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((date, i) => {
          if (!date) return <div key={`e-${i}`} />;
          const iso = toISO(date);
          const past = date < today;
          const selected = value === iso;
          return (
            <button
              key={iso}
              type="button"
              disabled={past}
              onClick={() => onChange(iso)}
              aria-pressed={selected}
              className={`h-11 rounded-xl text-sm font-semibold transition-colors ${
                past
                  ? "cursor-not-allowed text-sand"
                  : selected
                    ? "bg-forest text-white"
                    : "hover:bg-sage-soft"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
