import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./about";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy — ${SITE.name}` },
      { name: "description", content: `How ${SITE.name} collects, uses and protects your personal information.` },
      { property: "og:title", content: `Privacy Policy — ${SITE.name}` },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" intro="Last updated: June 2026" />
      <section className="container-x section-y">
        <div className="prose-slc mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>{SITE.name} ("we", "us") respects your privacy. This policy explains what information we collect, how we use it, and the choices you have.</p>
          <h2 className="font-display text-xl text-foreground">Information we collect</h2>
          <p>We collect details you provide when applying, enrolling or contacting us — including name, email, phone number and academic background. We also collect basic device and usage data to operate the platform.</p>
          <h2 className="font-display text-xl text-foreground">How we use information</h2>
          <p>To deliver classes and learning materials, communicate about your enrolment, issue certificates, process payments, and improve our services. We do not sell your data.</p>
          <h2 className="font-display text-xl text-foreground">Sharing</h2>
          <p>We share data only with vetted service providers (e.g. payment processors, email delivery, video conferencing) under strict confidentiality.</p>
          <h2 className="font-display text-xl text-foreground">Your rights</h2>
          <p>You may request access, correction or deletion of your personal data at any time by emailing {SITE.email}.</p>
          <h2 className="font-display text-xl text-foreground">Contact</h2>
          <p>Questions about this policy? Email {SITE.email}.</p>
        </div>
      </section>
    </>
  );
}
