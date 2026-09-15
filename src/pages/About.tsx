import { TEAM_IMAGE } from "../data/company";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage">About</p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl">A quieter way to book a clean home</h1>
      <img
        src={TEAM_IMAGE}
        alt="Bright, well-kept interior of a home"
        className="mt-8 h-72 w-full rounded-[1.75rem] object-cover"
      />
      <div className="mt-8 space-y-4 text-ink-muted leading-relaxed">
        <p>
          Havenstead is a professional cleaning company built around a simple idea: house cleaning and carpet
          cleaning should not feel like two different businesses.
        </p>
        <p>
          Customers choose what they need, see an estimate immediately, pick a time that works, and check out
          in one flow. No account required. No handoff to another website.
        </p>
        <p>
          This prototype is designed for a later Square payment integration and a real scheduling backend. The
          booking experience you see here is the product — not a placeholder.
        </p>
      </div>
    </div>
  );
}
