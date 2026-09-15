interface QuantitySelectorProps {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({
  label,
  hint,
  value,
  min = 0,
  max = 12,
  onChange,
}: QuantitySelectorProps) {
  const atMin = value <= min;
  const atMax = value >= max;
  const display = value >= 10 && max >= 10 ? `${value}${value >= max ? "+" : ""}` : String(value);

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-sand bg-white px-4 py-3">
      <div>
        <p className="font-semibold text-ink">{label}</p>
        {hint ? <p className="text-sm text-ink-muted">{hint}</p> : null}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={atMin}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-sand text-lg font-semibold text-forest transition-colors hover:border-forest disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>
        <span className="w-10 text-center text-lg font-semibold tabular-nums" aria-live="polite">
          {display}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={atMax}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-sand text-lg font-semibold text-forest transition-colors hover:border-forest disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}
