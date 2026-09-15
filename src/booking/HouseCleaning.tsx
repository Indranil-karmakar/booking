import { useEffect } from "react";
import { AddonCard } from "../components/AddonCard";
import { Button } from "../components/Button";
import { QuantitySelector } from "../components/QuantitySelector";
import { useBooking } from "../context/bookingDefaults";
import { CLEANING_TYPES, HOUSE_ADDONS } from "../data/pricing";
import { calculateHousePrice, formatCurrency } from "../utils/calculatePrice";
import type { CleaningType } from "../types/booking";
import type { StepCta } from "./stepCta";

export function HouseCleaning({
  onContinue,
  onBack,
  setCta,
}: {
  onContinue: () => void;
  onBack: () => void;
  setCta: (cta: StepCta) => void;
}) {
  const { booking, updateHouse } = useBooking();
  const { houseCleaning } = booking;
  const price = calculateHousePrice(houseCleaning);

  function toggleAddon(id: string) {
    const addons = houseCleaning.addons.includes(id)
      ? houseCleaning.addons.filter((a) => a !== id)
      : [...houseCleaning.addons, id];
    updateHouse({ addons });
  }

  useEffect(() => {
    setCta({ label: "Continue", run: onContinue });
  });

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl">Tell us about your home</h1>
      <p className="mt-2 text-ink-muted">We’ll use this to build an instant house cleaning estimate.</p>

      <div className="mt-8 space-y-3">
        <QuantitySelector
          label="Bedrooms"
          value={houseCleaning.bedrooms}
          min={1}
          max={12}
          onChange={(bedrooms) => updateHouse({ bedrooms })}
        />
        <QuantitySelector
          label="Bathrooms"
          value={houseCleaning.bathrooms}
          min={1}
          max={12}
          onChange={(bathrooms) => updateHouse({ bathrooms })}
        />
      </div>

      <h2 className="mt-8 text-lg font-semibold">Cleaning type</h2>
      <div className="mt-3 grid gap-3">
        {CLEANING_TYPES.map((type) => {
          const active = houseCleaning.cleaningType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              aria-pressed={active}
              onClick={() => updateHouse({ cleaningType: type.id as CleaningType })}
              className={`rounded-2xl border px-4 py-4 text-left ${
                active ? "border-forest bg-sage-soft ring-1 ring-forest" : "border-sand bg-white hover:border-sage"
              }`}
            >
              <span className="font-semibold">{type.name}</span>
              <span className="mt-1 block text-sm text-ink-muted">{type.description}</span>
              {active ? (
                <span className="mt-2 inline-block text-xs font-bold uppercase tracking-wide text-forest">
                  Selected
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <h2 className="mt-8 text-lg font-semibold">Add-ons</h2>
      <div className="mt-3 grid gap-3">
        {HOUSE_ADDONS.map((addon) => (
          <AddonCard
            key={addon.id}
            name={addon.name}
            description={addon.description}
            price={addon.price}
            selected={houseCleaning.addons.includes(addon.id)}
            onToggle={() => toggleAddon(addon.id)}
          />
        ))}
      </div>

      <p className="mt-6 text-sm font-semibold text-forest">
        House cleaning subtotal {formatCurrency(price.subtotal)}
      </p>

      <div className="mt-8 hidden gap-3 md:flex">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
