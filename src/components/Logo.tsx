import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest text-mist">
        <Home className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-lg text-ink">Havenstead</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          Cleaning Co.
        </span>
      </span>
    </Link>
  );
}
