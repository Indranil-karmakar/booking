import { Link } from "react-router-dom";
import { COMPANY } from "../data/company";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-sand bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            House and carpet cleaning, booked in one visit. Instant estimates. No account required.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/services" className="hover:text-forest">
                House Cleaning
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-forest">
                Carpet Cleaning
              </Link>
            </li>
            <li>
              <Link to="/booking" className="hover:text-forest">
                Combined Booking
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-forest">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-forest">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-forest">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-forest">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/cancellation" className="hover:text-forest">
                Cancellation Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>{COMPANY.phone}</li>
            <li>{COMPANY.email}</li>
            <li>{COMPANY.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sand py-5 text-center text-xs text-ink-muted">
        © {new Date().getFullYear()} {COMPANY.legalName}. Prototype for demonstration only.
      </div>
    </footer>
  );
}
