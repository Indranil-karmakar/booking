import { useState, type FormEvent } from "react";
import { Button } from "../components/Button";
import { FieldGroup, FormInput, FormTextarea } from "../components/FormInput";
import { COMPANY } from "../data/company";
import { isValidEmail, required } from "../utils/validation";

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = {
      name: required(form.name, "Please enter your name."),
      email: isValidEmail(form.email) ? "" : "Please enter a valid email address.",
      message: required(form.message, "Please enter a message."),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setSent(true);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage">Contact</p>
        <h1 className="mt-3 font-serif text-4xl">We’re here to help</h1>
        <p className="mt-4 text-ink-muted">
          Questions about a booking? Reach the office during business hours, or send a note and we’ll respond
          as soon as we can.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-semibold">Phone</dt>
            <dd className="text-ink-muted">{COMPANY.phone}</dd>
          </div>
          <div>
            <dt className="font-semibold">Email</dt>
            <dd className="text-ink-muted">{COMPANY.email}</dd>
          </div>
          <div>
            <dt className="font-semibold">Hours</dt>
            <dd className="text-ink-muted">{COMPANY.hours}</dd>
          </div>
          <div>
            <dt className="font-semibold">Office</dt>
            <dd className="text-ink-muted">{COMPANY.address}</dd>
          </div>
        </dl>
      </div>
      {sent ? (
        <div className="rounded-[1.75rem] border border-sand bg-white p-8">
          <h2 className="font-serif text-2xl">Message sent</h2>
          <p className="mt-3 text-ink-muted">
            This is a prototype, so no email was actually delivered. In production this form would reach the
            Havenstead team.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="rounded-[1.75rem] border border-sand bg-white p-6 sm:p-8">
          <FieldGroup>
            <FormInput
              id="cname"
              label="Name"
              required
              value={form.name}
              error={errors.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <FormInput
              id="cemail"
              label="Email"
              required
              type="email"
              value={form.email}
              error={errors.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </FieldGroup>
          <div className="mt-4">
            <FormTextarea
              id="cmessage"
              label="Message"
              required
              value={form.message}
              error={errors.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <Button type="submit" className="mt-6" size="lg">
            Send message
          </Button>
        </form>
      )}
    </div>
  );
}
