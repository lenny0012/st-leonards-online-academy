import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./about";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Terms & Conditions — ${SITE.name}` },
      { name: "description", content: `Terms governing your use of ${SITE.name} and its learning services.` },
      { property: "og:title", content: `Terms & Conditions — ${SITE.name}` },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" intro="Last updated: June 2026" />
      <section className="container-x section-y">
        <div className="mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>These terms govern your use of {SITE.name}. By enrolling or accessing our platform, you agree to be bound by them.</p>
          <h2 className="font-display text-xl text-foreground">Enrolment</h2>
          <p>Enrolment is confirmed upon receipt of payment. Course access is personal and non-transferable.</p>
          <h2 className="font-display text-xl text-foreground">Payments & refunds</h2>
          <p>Tuition fees are payable in advance. Refund requests are considered within 7 days of enrolment, subject to deductions for materials already consumed.</p>
          <h2 className="font-display text-xl text-foreground">Conduct</h2>
          <p>Students and tutors must maintain respectful, honest and lawful conduct. We reserve the right to suspend accounts that violate these standards.</p>
          <h2 className="font-display text-xl text-foreground">Intellectual property</h2>
          <p>All course materials are the property of {SITE.name} or its licensors and may not be redistributed without written permission.</p>
          <h2 className="font-display text-xl text-foreground">Liability</h2>
          <p>We provide our services on an "as-is" basis and disclaim liability to the maximum extent permitted by law.</p>
          <h2 className="font-display text-xl text-foreground">Contact</h2>
          <p>Email {SITE.email} for any questions about these terms.</p>
        </div>
      </section>
    </>
  );
}
