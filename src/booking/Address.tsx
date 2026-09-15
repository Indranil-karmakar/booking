import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { FieldGroup, FormInput } from "../components/FormInput";
import { useBooking } from "../context/bookingDefaults";
import { checkServiceArea } from "../utils/mockApi";
import { isValidZip, required } from "../utils/validation";
import type { StepCta } from "./stepCta";

export function AddressStep({
  onContinue,
  onBack,
  setCta,
}: {
  onContinue: () => void;
  onBack: () => void;
  setCta: (cta: StepCta) => void;
}) {
  const { booking, updateAddress, setZipStatus } = useBooking();
  const a = booking.address;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checking, setChecking] = useState(false);

  async function checkZip() {
    if (!isValidZip(a.zip)) {
      setZipStatus("idle");
      setErrors((e) => ({ ...e, zip: "Please enter a valid 5-digit ZIP code." }));
      return false;
    }
    setChecking(true);
    setZipStatus("checking");
    const result = await checkServiceArea(a.zip);
    setChecking(false);
    setZipStatus(result.ok ? "available" : "unavailable");
    if (!result.ok) {
      setErrors((e) => ({ ...e, zip: result.message }));
      return false;
    }
    setErrors((e) => ({ ...e, zip: "" }));
    return true;
  }

  async function continueFlow() {
    const next = {
      street: required(a.street, "Please enter your service address."),
      city: required(a.city, "Please enter a city."),
      state: required(a.state, "Please enter a state."),
      zip: isValidZip(a.zip) ? "" : "Please enter a valid 5-digit ZIP code.",
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    const ok = booking.zipStatus === "available" ? true : await checkZip();
    if (ok) onContinue();
  }

  useEffect(() => {
    setCta({
      label: checking ? "Checking area…" : "Continue",
      disabled: checking,
      run: () => {
        void continueFlow();
      },
    });
  });

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl">Where should we clean?</h1>
      <p className="mt-2 text-ink-muted">We’ll confirm we service your area before scheduling.</p>
      <div className="mt-8 space-y-4">
        <FormInput
          id="street"
          label="Address"
          required
          autoComplete="street-address"
          value={a.street}
          error={errors.street}
          onChange={(e) => updateAddress({ street: e.target.value })}
        />
        <FormInput
          id="unit"
          label="Apartment / Unit"
          autoComplete="address-line2"
          value={a.unit ?? ""}
          onChange={(e) => updateAddress({ unit: e.target.value })}
        />
        <FieldGroup>
          <FormInput
            id="city"
            label="City"
            required
            autoComplete="address-level2"
            value={a.city}
            error={errors.city}
            onChange={(e) => updateAddress({ city: e.target.value })}
          />
          <FormInput
            id="state"
            label="State"
            required
            autoComplete="address-level1"
            value={a.state}
            error={errors.state}
            onChange={(e) => updateAddress({ state: e.target.value })}
          />
        </FieldGroup>
        <FormInput
          id="zip"
          label="ZIP Code"
          required
          inputMode="numeric"
          autoComplete="postal-code"
          value={a.zip}
          error={errors.zip}
          onChange={(e) => updateAddress({ zip: e.target.value.replace(/\D/g, "").slice(0, 5) })}
        />
        <Button variant="outline" onClick={() => void checkZip()} disabled={checking}>
          {checking ? "Checking…" : "Check availability"}
        </Button>
        {booking.zipStatus === "available" ? (
          <p className="rounded-2xl bg-success-soft px-4 py-3 text-sm font-medium text-success" role="status">
            Great! We service this area.
          </p>
        ) : null}
        {booking.zipStatus === "unavailable" ? (
          <p className="rounded-2xl bg-danger-soft px-4 py-3 text-sm font-medium text-danger" role="alert">
            Sorry, we currently don't service this area.
          </p>
        ) : null}
      </div>
      <div className="mt-8 hidden gap-3 md:flex">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={() => void continueFlow()} disabled={checking}>
          Continue
        </Button>
      </div>
    </div>
  );
}
