export function LegalPage({
  title,
  body,
}: {
  title: string;
  body: string[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-4xl">{title}</h1>
      <div className="mt-8 space-y-4 text-ink-muted leading-relaxed">
        {body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      body={[
        "Havenstead collects only the information needed to schedule a cleaning: your name, contact details, service address, and booking preferences.",
        "This prototype does not transmit form data to a server. Payment fields are demo-only and are never stored.",
        "When Square is integrated, card details will be handled by Square. Havenstead will not store raw card numbers.",
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      body={[
        "This website is a frontend prototype for demonstration. Estimates are mock prices and are not a binding quote.",
        "A completed demo booking does not create a real service appointment or charge.",
        "In production, bookings would be confirmed only after availability and payment authorization are verified.",
      ]}
    />
  );
}

export function CancellationPage() {
  return (
    <LegalPage
      title="Cancellation policy"
      body={[
        "In production, appointments may be rescheduled or canceled up to 24 hours in advance without a fee.",
        "Same-day cancellations may be subject to a visit fee. This prototype does not enforce cancellation rules.",
        "To change a demo booking, return to the booking flow and start again, or use View Booking after confirmation.",
      ]}
    />
  );
}
