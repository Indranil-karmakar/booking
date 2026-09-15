import { useCallback, useRef, useState } from "react";
import { AddressStep } from "../booking/Address";
import { CarpetCleaning } from "../booking/CarpetCleaning";
import { Confirmation } from "../booking/Confirmation";
import { CustomerDetails } from "../booking/CustomerDetails";
import { Estimate } from "../booking/Estimate";
import { HouseCleaning } from "../booking/HouseCleaning";
import { Payment } from "../booking/Payment";
import { Review } from "../booking/Review";
import { Schedule } from "../booking/Schedule";
import { ServiceSelection } from "../booking/ServiceSelection";
import type { StepCta } from "../booking/stepCta";
import { BookingSummary } from "../components/BookingSummary";
import { ProgressSteps } from "../components/ProgressSteps";
import { useBooking } from "../context/bookingDefaults";

export function BookingPage() {
  const { booking, step, setStep, goNext, goBack } = useBooking();
  const runRef = useRef<() => void>(() => {});
  const [cta, setCtaState] = useState<StepCta>({
    label: "Continue",
    disabled: true,
    run: () => {},
  });

  const setCta = useCallback((next: StepCta) => {
    runRef.current = next.run;
    setCtaState((prev) => {
      if (prev.label === next.label && prev.disabled === next.disabled) return prev;
      return {
        label: next.label,
        disabled: next.disabled,
        run: () => runRef.current(),
      };
    });
  }, []);

  const showSummary = step !== "confirmation";
  const props = { onContinue: goNext, onBack: goBack, setCta };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
      {showSummary ? (
        <div className="mb-8">
          <ProgressSteps current={step} />
        </div>
      ) : null}

      <div className={`grid gap-10 ${showSummary ? "md:grid-cols-[1fr_340px]" : ""}`}>
        <div className={showSummary ? "pb-28 md:pb-8" : ""}>
          {step !== "service" && step !== "confirmation" ? (
            <button
              type="button"
              className="mb-4 text-sm font-semibold text-sage hover:underline md:hidden"
              onClick={goBack}
            >
              Back
            </button>
          ) : null}

          {step === "service" ? <ServiceSelection onContinue={goNext} setCta={setCta} /> : null}
          {step === "house" ? <HouseCleaning {...props} /> : null}
          {step === "carpet" ? <CarpetCleaning {...props} /> : null}
          {step === "estimate" ? <Estimate {...props} /> : null}
          {step === "address" ? <AddressStep {...props} /> : null}
          {step === "schedule" ? <Schedule {...props} /> : null}
          {step === "customer" ? <CustomerDetails {...props} /> : null}
          {step === "review" ? <Review {...props} /> : null}
          {step === "payment" ? <Payment {...props} /> : null}
          {step === "confirmation" ? <Confirmation /> : null}
        </div>

        {showSummary ? (
          <BookingSummary
            booking={booking}
            onEdit={setStep}
            mobileAction={{
              label: cta.label,
              disabled: cta.disabled,
              onClick: cta.run,
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
