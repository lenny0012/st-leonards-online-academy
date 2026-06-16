import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./about";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${SITE.name}` },
      { name: "description", content: "Get in touch with St Leonards College — admissions, support and partnership enquiries." },
      { property: "og:title", content: `Contact — ${SITE.name}` },
      { property: "og:description", content: "Get in touch with admissions, support and partnerships." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Contact" title="We'd love to hear from you." intro="Questions about courses, admissions or partnerships? Reach out and our team will respond within one business day." />
      <section className="container-x section-y grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="space-y-5">
          <InfoRow icon={Mail} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
          <InfoRow icon={Phone} label="Phone" value={SITE.phone} href={`tel:${SITE.phone.replace(/\s/g, "")}`} />
          <InfoRow icon={MessageCircle} label="WhatsApp" value="Chat with admissions" href={`https://wa.me/${SITE.whatsapp}`} />
          <InfoRow icon={MapPin} label="Location" value={SITE.address} />
        </div>
        <form
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          <h2 className="font-display text-2xl">Send us a message</h2>
          {sent ? (
            <div className="mt-6 rounded-xl border border-accent/40 bg-accent/10 p-5 text-sm">
              Message received — we'll be in touch shortly.
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              <Input label="Your name" name="name" />
              <Input label="Email" name="email" type="email" />
              <div className="grid gap-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea rows={5} required className="rounded-lg border border-input bg-background p-3 text-sm" />
              </div>
              <Button type="submit" variant="hero" size="lg">Send message</Button>
            </div>
          )}
        </form>
      </section>
    </>
  );
}

function InfoRow({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--navy)] text-[color:var(--gold)]"><Icon className="h-5 w-5" /></div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-1 font-display text-base font-semibold">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
}

function Input({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <input id={name} name={name} type={type} required className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-accent" />
    </div>
  );
}
