import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./about";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { useState } from "react";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: `Admissions — ${SITE.name}` },
      { name: "description", content: "Apply to St Leonards College in minutes. Open enrolment across IGCSE, CBC, KCSE and professional programs." },
      { property: "og:title", content: `Admissions — ${SITE.name}` },
      { property: "og:description", content: "Apply to St Leonards College — open enrolment for the new term." },
      { property: "og:url", content: "/admissions" },
    ],
    links: [{ rel: "canonical", href: "/admissions" }],
  }),
  component: Admissions,
});

const STEPS = [
  { n: "01", t: "Submit your application", b: "Tell us about you and pick your program." },
  { n: "02", t: "Speak with an advisor", b: "We'll match you to the right tutor and timetable." },
  { n: "03", t: "Pay & enrol", b: "Secure your seat with M-Pesa, card or bank transfer." },
  { n: "04", t: "Start learning", b: "Access your dashboard, live classes and study materials." },
];

function Admissions() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Admissions" title="Apply in minutes. Start this week." intro="Open enrolment is live for all programs. Fill in the short form below and an advisor will be in touch within 24 hours." />

      <section className="container-x section-y grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl">How it works</h2>
          <ol className="mt-6 space-y-4">
            {STEPS.map(s => (
              <li key={s.n} className="rounded-2xl border border-border bg-card p-5">
                <div className="font-display text-2xl text-accent">{s.n}</div>
                <div className="mt-2 font-display text-base font-semibold">{s.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.b}</div>
              </li>
            ))}
          </ol>
        </div>

        <form
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          <h2 className="font-display text-2xl">Application form</h2>
          {sent ? (
            <div className="mt-6 rounded-xl border border-accent/40 bg-accent/10 p-5 text-sm">
              Thank you — your application has been received. An admissions advisor will email you within 24 hours.
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              <Field label="Full name" name="name" />
              <Field label="Email address" name="email" type="email" />
              <Field label="Phone / WhatsApp" name="phone" type="tel" />
              <div className="grid gap-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Program of interest</label>
                <select required className="h-11 rounded-lg border border-input bg-background px-3 text-sm">
                  <option>IGCSE Programs</option>
                  <option>CBC / KCSE Tuition</option>
                  <option>Computer Packages</option>
                  <option>Networking & Cybersecurity</option>
                  <option>Graphic Design & Media</option>
                  <option>Accounting & Business</option>
                  <option>Programming & Development</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tell us about your goals</label>
                <textarea rows={4} className="rounded-lg border border-input bg-background p-3 text-sm" placeholder="What do you want to achieve this term?" />
              </div>
              <Button type="submit" variant="hero" size="lg" className="mt-2">Submit application</Button>
              <p className="text-xs text-muted-foreground">By submitting you agree to our terms and privacy policy. We never share your data.</p>
            </div>
          )}
        </form>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <input id={name} name={name} type={type} required className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-accent" />
    </div>
  );
}
