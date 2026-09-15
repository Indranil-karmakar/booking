import { useEffect } from "react";
import { Button } from "../components/Button";
import { PriceBreakdownView } from "../components/PriceBreakdown";
import { useBooking } from "../context/bookingDefaults";
import { getPriceBreakdown, hasCarpet, hasHouse } from "../utils/calculatePrice";
import type { StepCta } from "./stepCta";

export function Estimate({
  onContinue,
  onBack,
  setCta,
}: {
  onContinue: () => void;
  onBack: () => void;
  setCta: (cta: StepCta) => void;
}) {
  const { booking, setStep } = useBooking();
  const price = getPriceBreakdown(booking);

  useEffect(() => {
    setCta({ label: "Continue", run: onContinue });
  });

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl">Your instant estimate</h1>
      <p className="mt-2 text-ink-muted">
        This is a prototype estimate based on your selections. You can edit details anytime before payment.
      </p>
      <div className="mt-8">
        <PriceBreakdownView
          price={price}
          showHouse={hasHouse(booking.selectedServices)}
          showCarpet={hasCarpet(booking.selectedServices)}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {hasHouse(booking.selectedServices) ? (
          <Button variant="outline" size="sm" onClick={() => setStep("house")}>
            Edit house cleaning
          </Button>
        ) : null}
        {hasCarpet(booking.selectedServices) ? (
          <Button variant="outline" size="sm" onClick={() => setStep("carpet")}>
            Edit carpet cleaning
          </Button>
        ) : null}
      </div>
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
