import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const booking = location.pathname.startsWith("/booking");

  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-mist/95 backdrop-blur-sm">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? "text-forest" : "text-ink-muted hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/booking"
          className="hidden h-10 min-w-28 items-center justify-center rounded-xl bg-forest px-4 text-sm font-semibold text-white hover:bg-forest-dark md:inline-flex"
        >
          Book Now
        </Link>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-sand md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-sand px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 font-semibold ${isActive ? "bg-sage-soft text-forest" : "text-ink"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {!booking ? (
              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-forest px-3 py-3 text-center font-semibold text-white"
              >
                Book Now
              </Link>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
