import { Home, Layers, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useBooking } from "../context/bookingDefaults";
import type { ServiceId } from "../types/booking";
import type { StepCta } from "./stepCta";

const OPTIONS: {
  id: "house" | "carpet" | "both";
  title: string;
  description: string;
  icon: typeof Home;
}[] = [
  {
    id: "house",
    title: "House Cleaning",
    description: "Professional cleaning for your home.",
    icon: Home,
  },
  {
    id: "carpet",
    title: "Carpet Cleaning",
    description: "Deep cleaning for carpets and floor areas.",
    icon: Layers,
  },
  {
    id: "both",
    title: "Both Services",
    description: "Combine house and carpet cleaning in one appointment.",
    icon: Sparkles,
  },
];

function toChoice(services: ServiceId[]): "house" | "carpet" | "both" | null {
  const house = services.includes("house");
  const carpet = services.includes("carpet");
  if (house && carpet) return "both";
  if (house) return "house";
  if (carpet) return "carpet";
  return null;
}

export function ServiceSelection({
  onContinue,
  setCta,
}: {
  onContinue: () => void;
  setCta: (cta: StepCta) => void;
}) {
  const { booking, setServices } = useBooking();
  const selected = toChoice(booking.selectedServices);
  const [error, setError] = useState("");

  function choose(id: "house" | "carpet" | "both") {
    setError("");
    if (id === "both") setServices(["house", "carpet"]);
    else setServices([id]);
  }

  function continueFlow() {
    if (!selected) {
      setError("Please select at least one service.");
      return;
    }
    onContinue();
  }

  useEffect(() => {
    setCta({ label: "Continue", disabled: !selected, run: continueFlow });
  });

  return (
    <div>
      <h1 className="font-serif text-3xl sm:text-4xl">What would you like cleaned?</h1>
      <p className="mt-2 text-ink-muted">Choose one service or book both in a single visit.</p>
      <div className="mt-8 grid gap-3">
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          const active = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => choose(option.id)}
              className={`flex items-start gap-4 rounded-3xl border px-5 py-5 text-left transition-colors ${
                active ? "border-forest bg-sage-soft ring-1 ring-forest" : "border-sand bg-white hover:border-sage"
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  active ? "bg-forest text-white" : "bg-mist text-forest"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-lg font-semibold text-ink">{option.title}</span>
                <span className="mt-1 block text-sm text-ink-muted">{option.description}</span>
                {active ? (
                  <span className="mt-2 inline-block text-xs font-bold uppercase tracking-wide text-forest">
                    Selected
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="mt-3 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-8 hidden md:block">
        <Button size="lg" onClick={continueFlow} disabled={!selected}>
          Continue
        </Button>
      </div>
    </div>
  );
}
