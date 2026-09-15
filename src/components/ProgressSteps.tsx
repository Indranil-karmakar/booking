import type { BookingStep } from "../types/booking";

const GROUPS: { id: string; label: string; steps: BookingStep[] }[] = [
  { id: "service", label: "Service", steps: ["service"] },
  { id: "details", label: "Details", steps: ["house", "carpet"] },
  { id: "estimate", label: "Estimate", steps: ["estimate"] },
  { id: "schedule", label: "Schedule", steps: ["address", "schedule"] },
  { id: "information", label: "Information", steps: ["customer"] },
  { id: "review", label: "Review", steps: ["review"] },
  { id: "payment", label: "Payment", steps: ["payment"] },
];

interface ProgressStepsProps {
  current: BookingStep;
}

export function ProgressSteps({ current }: ProgressStepsProps) {
  if (current === "confirmation") return null;

  const currentIndex = GROUPS.findIndex((g) => g.steps.includes(current));

  return (
    <ol className="flex gap-1 overflow-x-auto pb-1" aria-label="Booking progress">
      {GROUPS.map((group, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;
        return (
          <li key={group.id} className="flex min-w-0 flex-1 flex-col gap-2">
            <span
              className={`h-1.5 rounded-full ${
                active ? "bg-forest" : done ? "bg-sage" : "bg-sand"
              }`}
            />
            <span
              className={`hidden truncate text-[11px] font-semibold uppercase tracking-wide sm:block ${
                active ? "text-forest" : done ? "text-ink" : "text-ink-muted"
              }`}
            >
              {group.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
