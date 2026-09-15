import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { FieldGroup, FormInput, FormTextarea } from "../components/FormInput";
import { useBooking } from "../context/bookingDefaults";
import { formatPhone, isValidEmail, isValidPhone, required } from "../utils/validation";
import type { StepCta } from "./stepCta";

export function CustomerDetails({
  onContinue,
  onBack,
  setCta,
}: {
  onContinue: () => void;
  onBack: () => void;
  setCta: (cta: StepCta) => void;
}) {
  const { booking, updateCustomer } = useBooking();
  const c = booking.customer;
  const [errors, setErrors] = useState<Record<string, string>>({});

  function continueFlow() {
    const next = {
      firstName: required(c.firstName, "Please enter your first name."),
      lastName: required(c.lastName, "Please enter your last name."),
      email: !c.email.trim()
        ? "Please enter your email address."
        : isValidEmail(c.email)
          ? ""
          : "Please enter a valid email address.",
      phone: !c.phone.trim()
        ? "Please enter your phone number."
        : isValidPhone(c.phone)
          ? ""
          : "Please enter a valid phone number.",
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    onContinue();
  }

  useEffect(() => {
    setCta({ label: "Continue to review", run: continueFlow });
  });

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl">Your information</h1>
      <p className="mt-2 text-ink-muted">No account needed. We’ll use this to confirm your booking.</p>
      <div className="mt-8 space-y-4">
        <FieldGroup>
          <FormInput
            id="firstName"
            label="First name"
            required
            autoComplete="given-name"
            value={c.firstName}
            error={errors.firstName}
            onChange={(e) => updateCustomer({ firstName: e.target.value })}
          />
          <FormInput
            id="lastName"
            label="Last name"
            required
            autoComplete="family-name"
            value={c.lastName}
            error={errors.lastName}
            onChange={(e) => updateCustomer({ lastName: e.target.value })}
          />
        </FieldGroup>
        <FormInput
          id="email"
          label="Email"
          required
          type="email"
          autoComplete="email"
          value={c.email}
          error={errors.email}
          onChange={(e) => updateCustomer({ email: e.target.value })}
        />
        <FormInput
          id="phone"
          label="Phone"
          required
          type="tel"
          autoComplete="tel"
          value={c.phone}
          error={errors.phone}
          onChange={(e) => updateCustomer({ phone: formatPhone(e.target.value) })}
        />
        <FormTextarea
          id="notes"
          label="Special instructions"
          hint="Gate codes, pets, parking, or areas to skip."
          value={c.notes ?? ""}
          onChange={(e) => updateCustomer({ notes: e.target.value })}
        />
      </div>
      <div className="mt-8 hidden gap-3 md:flex">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={continueFlow}>
          Continue to review
        </Button>
      </div>
    </div>
  );
}
