import { CreditCard, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { FieldGroup, FormInput } from "../components/FormInput";
import { useBooking } from "../context/bookingDefaults";
import type { PaymentMethod } from "../types/booking";
import { formatCurrency, getPriceBreakdown } from "../utils/calculatePrice";
import { createBooking, createSquarePayment, saveSquarePaymentMethod } from "../utils/mockApi";
import { formatCardNumber, formatExpiry } from "../utils/validation";
import type { StepCta } from "./stepCta";

export function Payment({
  onContinue,
  onBack,
  setCta,
}: {
  onContinue: () => void;
  onBack: () => void;
  setCta: (cta: StepCta) => void;
}) {
  const { booking, setPayment, setConfirmation } = useBooking();
  const total = getPriceBreakdown(booking).total;
  const [method, setMethod] = useState<PaymentMethod>("pay_now");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState(booking.address.zip);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState("");

  function validate() {
    const next = {
      card: card.replace(/\s/g, "").length === 16 ? "" : "Enter a 16-digit demo card number.",
      expiry: /^\d{2}\/\d{2}$/.test(expiry) ? "" : "Enter expiration as MM/YY.",
      cvv: cvv.length >= 3 ? "" : "Enter a 3-digit CVV.",
      zip: zip.length === 5 ? "" : "Enter a 5-digit ZIP.",
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  }

  async function submit() {
    setFail("");
    if (!validate()) return;
    setBusy(true);
    setPayment({ method, status: "processing" });
    const pay =
      method === "pay_now" ? await createSquarePayment(card) : await saveSquarePaymentMethod(card);
    if (!pay.ok) {
      setBusy(false);
      setPayment({ method, status: "failed" });
      setFail(
        pay.message + " Please check your payment information and try again.",
      );
      return;
    }
    const bookingResult = await createBooking(booking);
    const payment = { method, status: "success" as const };
    setPayment(payment);
    setConfirmation(bookingResult.confirmationNumber, payment);
    setBusy(false);
    onContinue();
  }

  useEffect(() => {
    setCta({
      label: busy ? "Processing…" : "Confirm & Book",
      disabled: busy,
      run: () => {
        void submit();
      },
    });
  });

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl">Secure payment</h1>
      <p className="mt-2 text-ink-muted">
        Demo checkout only. No real payment is processed and card details never leave this browser.
      </p>

      <div className="mt-6 rounded-2xl border border-gold bg-gold-soft px-4 py-3 text-sm text-ink">
        Prototype mode — Square integration is simulated. Use card <strong>4242 4242 4242 4242</strong> for
        success, or end with <strong>0002</strong> to see a failure.
      </div>

      <div className="mt-6 flex items-end justify-between rounded-3xl border border-sand bg-white p-5">
        <span className="text-sm font-semibold">Total</span>
        <span className="font-serif text-4xl text-forest">{formatCurrency(total)}</span>
      </div>

      <fieldset className="mt-6 space-y-3">
        <legend className="mb-2 font-semibold">Payment options</legend>
        {(
          [
            ["pay_now", "Pay full amount now"],
            ["save_card", "Save payment method for future payment"],
          ] as const
        ).map(([id, label]) => (
          <label
            key={id}
            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 ${
              method === id ? "border-forest bg-sage-soft" : "border-sand bg-white"
            }`}
          >
            <input
              type="radio"
              name="pay-method"
              className="h-4 w-4 accent-forest"
              checked={method === id}
              onChange={() => setMethod(id)}
            />
            <span className="font-medium">{label}</span>
          </label>
        ))}
      </fieldset>
      <p className="mt-3 text-sm text-ink-muted">
        Your payment information is securely handled by Square. We never store your card details.
      </p>

      <div className="mt-6 rounded-3xl border border-sand bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <CreditCard className="h-4 w-4" /> Card details
          </div>
          <div className="flex gap-1 text-[10px] font-bold tracking-wide text-ink-muted">
            <span className="rounded bg-mist px-1.5 py-0.5">VISA</span>
            <span className="rounded bg-mist px-1.5 py-0.5">MC</span>
            <span className="rounded bg-mist px-1.5 py-0.5">AMEX</span>
          </div>
        </div>
        <div className="space-y-4">
          <FormInput
            id="card"
            label="Card number"
            inputMode="numeric"
            autoComplete="off"
            placeholder="ACCT-000015"
            value={card}
            error={errors.card}
            onChange={(e) => setCard(formatCardNumber(e.target.value))}
          />
          <FieldGroup>
            <FormInput
              id="expiry"
              label="Expiration"
              placeholder="MM/YY"
              autoComplete="off"
              value={expiry}
              error={errors.expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            />
            <FormInput
              id="cvv"
              label="CVV"
              inputMode="numeric"
              autoComplete="off"
              value={cvv}
              error={errors.cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
            />
          </FieldGroup>
          <FormInput
            id="card-zip"
            label="ZIP"
            inputMode="numeric"
            autoComplete="off"
            value={zip}
            error={errors.zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
          />
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
          <Lock className="h-3.5 w-3.5" /> Secure payment powered by Square
        </p>
      </div>

      {fail ? (
        <div className="mt-4 rounded-2xl bg-danger-soft p-4 text-sm text-danger" role="alert">
          <p className="font-semibold">Payment could not be completed.</p>
          <p className="mt-1">{fail}</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => setFail("")}>
            Try again
          </Button>
        </div>
      ) : null}

      <div className="mt-8 hidden gap-3 md:flex">
        <Button variant="outline" onClick={onBack} disabled={busy}>
          Back
        </Button>
        <Button size="lg" onClick={() => void submit()} disabled={busy}>
          {busy ? "Processing…" : "Confirm & Book"}
        </Button>
      </div>
    </div>
  );
}
