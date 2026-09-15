import { useEffect, useState } from "react";
import { AddonCard } from "../components/AddonCard";
import { Button } from "../components/Button";
import { FormInput } from "../components/FormInput";
import { QuantitySelector } from "../components/QuantitySelector";
import { useBooking } from "../context/bookingDefaults";
import { CARPET_ADDONS, ROOM_SIZES } from "../data/pricing";
import { calculateCarpetPrice, carpetAreaCount, formatCurrency } from "../utils/calculatePrice";
import type { CarpetRoomSize } from "../types/booking";
import type { StepCta } from "./stepCta";

export function CarpetCleaning({
  onContinue,
  onBack,
  setCta,
}: {
  onContinue: () => void;
  onBack: () => void;
  setCta: (cta: StepCta) => void;
}) {
  const { booking, updateCarpet } = useBooking();
  const { carpetCleaning } = booking;
  const price = calculateCarpetPrice(carpetCleaning);
  const [error, setError] = useState("");
  const areas = carpetAreaCount(carpetCleaning);

  function toggleAddon(id: string) {
    const addons = carpetCleaning.addons.includes(id)
      ? carpetCleaning.addons.filter((a) => a !== id)
      : [...carpetCleaning.addons, id];
    updateCarpet({ addons });
  }

  function continueFlow() {
    if (areas < 1) {
      setError("Please select at least one carpet area.");
      return;
    }
    onContinue();
  }

  useEffect(() => {
    setCta({ label: "Continue", disabled: areas < 1, run: continueFlow });
  });

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl">Tell us about your carpet</h1>
      <p className="mt-2 text-ink-muted">Add the rooms and treatments you want included.</p>

      <div className="mt-8 space-y-3">
        <QuantitySelector
          label="Bedrooms"
          value={carpetCleaning.bedrooms}
          onChange={(bedrooms) => updateCarpet({ bedrooms })}
        />
        <QuantitySelector
          label="Living Room"
          value={carpetCleaning.livingRooms}
          onChange={(livingRooms) => updateCarpet({ livingRooms })}
        />
        <QuantitySelector
          label="Dining Room"
          value={carpetCleaning.diningRooms}
          onChange={(diningRooms) => updateCarpet({ diningRooms })}
        />
        <QuantitySelector
          label="Hallway"
          value={carpetCleaning.hallways}
          onChange={(hallways) => updateCarpet({ hallways })}
        />
        <QuantitySelector
          label="Stairs"
          value={carpetCleaning.stairs}
          onChange={(stairs) => updateCarpet({ stairs })}
        />
        <QuantitySelector
          label="Other Areas"
          value={carpetCleaning.otherAreas}
          onChange={(otherAreas) => updateCarpet({ otherAreas })}
        />
      </div>
      {error ? (
        <p className="mt-3 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <h2 className="mt-8 text-lg font-semibold">Room size</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {ROOM_SIZES.map((size) => {
          const active = carpetCleaning.roomSize === size.id;
          return (
            <button
              key={size.id}
              type="button"
              aria-pressed={active}
              onClick={() => updateCarpet({ roomSize: size.id as CarpetRoomSize })}
              className={`rounded-2xl border px-4 py-4 text-left ${
                active ? "border-forest bg-sage-soft ring-1 ring-forest" : "border-sand bg-white hover:border-sage"
              }`}
            >
              <span className="font-semibold">{size.name}</span>
              <span className="mt-1 block text-sm text-ink-muted">{size.description}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <FormInput
          id="sqft"
          label="Approximate square footage (optional)"
          inputMode="numeric"
          placeholder="e.g. 1200"
          value={carpetCleaning.squareFootage ? String(carpetCleaning.squareFootage) : ""}
          onChange={(e) => {
            const n = e.target.value.replace(/\D/g, "");
            updateCarpet({ squareFootage: n ? Number(n) : undefined });
          }}
        />
      </div>

      <h2 className="mt-8 text-lg font-semibold">Carpet add-ons</h2>
      <div className="mt-3 grid gap-3">
        {CARPET_ADDONS.map((addon) => (
          <AddonCard
            key={addon.id}
            name={addon.name}
            description={addon.description}
            price={addon.price}
            selected={carpetCleaning.addons.includes(addon.id)}
            onToggle={() => toggleAddon(addon.id)}
          />
        ))}
      </div>

      <p className="mt-6 text-sm font-semibold text-forest">
        Carpet cleaning subtotal {formatCurrency(price.subtotal)}
      </p>

      <div className="mt-8 hidden gap-3 md:flex">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={continueFlow} disabled={areas < 1}>
          Continue
        </Button>
      </div>
    </div>
  );
}
