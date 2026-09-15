import { Link } from "react-router-dom";
import { CARPET_IMAGE, HOME_IMAGE } from "../data/company";

export function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage">Services</p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl">House and carpet cleaning, together</h1>
      <p className="mt-4 max-w-2xl text-ink-muted">
        Book either service on its own, or combine them in one visit. You stay on this website the entire
        time — one estimate, one schedule, one checkout.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <article className="rounded-[1.75rem] border border-sand bg-white p-6">
          <img src={HOME_IMAGE} alt="Kitchen and living space" className="h-56 w-full rounded-2xl object-cover" />
          <h2 className="mt-6 font-serif text-3xl">House Cleaning</h2>
          <p className="mt-3 text-ink-muted">
            Recurring-style standard cleans, deeper detail work, and empty-home move-in or move-out visits.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-muted">
            <li>Bedrooms, bathrooms, kitchens, and living areas</li>
            <li>Optional fridge, oven, windows, and baseboards</li>
            <li>Instant estimate as you configure the home</li>
          </ul>
          <Link to="/booking" className="mt-6 inline-flex font-semibold text-forest hover:underline">
            Get an Estimate
          </Link>
        </article>
        <article className="rounded-[1.75rem] border border-sand bg-white p-6">
          <img src={CARPET_IMAGE} alt="Carpeted living room" className="h-56 w-full rounded-2xl object-cover" />
          <h2 className="mt-6 font-serif text-3xl">Carpet Cleaning</h2>
          <p className="mt-3 text-ink-muted">
            Room-by-room carpet care with treatments for odor, stains, and protectant — sized for your home.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-muted">
            <li>Bedrooms, living rooms, dining rooms, hallways, stairs</li>
            <li>Small, standard, or large room sizing</li>
            <li>Combine with house cleaning in the same booking</li>
          </ul>
          <Link to="/booking" className="mt-6 inline-flex font-semibold text-forest hover:underline">
            Get an Estimate
          </Link>
        </article>
      </div>
    </div>
  );
}
