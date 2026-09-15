import type { PriceBreakdown } from "../types/booking";
import { formatCurrency } from "../utils/calculatePrice";

export function PriceBreakdownView({
  price,
  showHouse,
  showCarpet,
}: {
  price: PriceBreakdown;
  showHouse: boolean;
  showCarpet: boolean;
}) {
  return (
    <div className="rounded-3xl border border-sand bg-white p-6">
      {showHouse ? (
        <div className="mb-5">
          <h3 className="font-semibold text-ink">House Cleaning</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {price.houseLines.map((line) => (
              <li key={line.label} className="flex justify-between text-ink-muted">
                <span>{line.label}</span>
                <span>{formatCurrency(line.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {showCarpet ? (
        <div className="mb-5">
          <h3 className="font-semibold text-ink">Carpet Cleaning</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {price.carpetLines.map((line) => (
              <li key={line.label} className="flex justify-between text-ink-muted">
                <span>{line.label}</span>
                <span>{formatCurrency(line.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {price.addonLines.length > 0 ? (
        <div className="mb-5">
          <h3 className="font-semibold text-ink">Add-ons</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {price.addonLines.map((line) => (
              <li key={line.label} className="flex justify-between text-ink-muted">
                <span>{line.label}</span>
                <span>{formatCurrency(line.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="flex items-end justify-between border-t border-sand pt-4">
        <span className="font-semibold">Estimated total</span>
        <span className="font-serif text-3xl text-forest">{formatCurrency(price.total)}</span>
      </div>
    </div>
  );
}
