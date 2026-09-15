import { ArrowRight, CalendarCheck, Check, Clock, Home, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { CARPET_IMAGE, COMPANY, HERO_IMAGE, HOME_IMAGE } from "../data/company";

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage">Havenstead Cleaning</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
              {COMPANY.tagline}
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink-muted">
              Book trusted house and carpet cleaning services in just a few minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="inline-flex h-14 items-center gap-2 rounded-xl bg-forest px-6 font-semibold text-white hover:bg-forest-dark"
              >
                Book Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex h-14 items-center rounded-xl border border-sand bg-white px-6 font-semibold hover:border-forest"
              >
                Explore Services
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={HERO_IMAGE}
              alt="Professional cleaner wiping a bright kitchen counter"
              className="h-[420px] w-full rounded-[2rem] object-cover shadow-[0_20px_50px_rgba(20,26,24,0.12)]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h2 className="font-serif text-3xl">Services</h2>
        <p className="mt-2 text-ink-muted">One booking flow for house, carpet, or both.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-[1.75rem] border border-sand bg-white">
            <img src={HOME_IMAGE} alt="Sunlit living room ready for house cleaning" className="h-52 w-full object-cover" />
            <div className="p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sage-soft text-forest">
                <Home className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl">House Cleaning</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                <li>Standard cleaning</li>
                <li>Deep cleaning</li>
                <li>Move-in / move-out</li>
                <li>Custom add-ons</li>
              </ul>
              <Link to="/booking" className="mt-6 inline-flex font-semibold text-forest hover:underline">
                Get an Estimate
              </Link>
            </div>
          </article>
          <article className="overflow-hidden rounded-[1.75rem] border border-sand bg-white">
            <img src={CARPET_IMAGE} alt="Neutral sofa and carpet in a living room" className="h-52 w-full object-cover" />
            <div className="p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sage-soft text-forest">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-2xl">Carpet Cleaning</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                <li>Room cleaning</li>
                <li>Hallways</li>
                <li>Stairs</li>
                <li>Carpet treatments</li>
                <li>Deodorizing</li>
                <li>Protectant</li>
              </ul>
              <Link to="/booking" className="mt-6 inline-flex font-semibold text-forest hover:underline">
                Get an Estimate
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-3xl">Why choose us</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: CalendarCheck, title: "Easy online booking" },
            { icon: Check, title: "Upfront estimates" },
            { icon: Clock, title: "Flexible scheduling" },
            { icon: Home, title: "Professional cleaners" },
            { icon: Shield, title: "Secure payments" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-sand bg-white p-5">
              <item.icon className="h-5 w-5 text-sage" />
              <p className="mt-3 font-semibold">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-serif text-3xl">How it works</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "Choose your service" },
              { n: "02", t: "Customize your cleaning" },
              { n: "03", t: "Pick a time" },
              { n: "04", t: "Book securely" },
            ].map((step) => (
              <li key={step.n}>
                <p className="font-serif text-3xl text-gold">{step.n}</p>
                <p className="mt-2 font-semibold">{step.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-serif text-4xl">Ready for a cleaner home?</h2>
        <p className="mt-3 text-ink-muted">House, carpet, or both — one appointment, one estimate.</p>
        <Link
          to="/booking"
          className="mt-8 inline-flex h-14 items-center rounded-xl bg-forest px-8 font-semibold text-white hover:bg-forest-dark"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
}
