import { Check } from "lucide-react";
import { formatCurrency } from "../utils/calculatePrice";

interface AddonCardProps {
  name: string;
  description: string;
  price: number;
  selected: boolean;
  onToggle: () => void;
}

export function AddonCard({ name, description, price, selected, onToggle }: AddonCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition-colors ${
        selected ? "border-forest bg-sage-soft" : "border-sand bg-white hover:border-sage"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
          selected ? "border-forest bg-forest text-white" : "border-sand bg-white"
        }`}
        aria-hidden="true"
      >
        {selected ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <span className="font-semibold text-ink">{name}</span>
          <span className="shrink-0 font-semibold text-forest">+{formatCurrency(price)}</span>
        </span>
        <span className="mt-1 block text-sm text-ink-muted">{description}</span>
      </span>
    </button>
  );
}
