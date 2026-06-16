import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${SITE.name}` },
      { name: "description", content: `Discover the mission, faculty and story behind ${SITE.name}.` },
      { property: "og:title", content: `About — ${SITE.name}` },
      { property: "og:description", content: `Discover the mission, faculty and story behind ${SITE.name}.` },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader eyebrow="About Us" title="Education without borders." intro="We exist to make excellent teaching available to anyone with the curiosity to learn." />

      <section className="container-x section-y grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl">Our story</h2>
          <p className="mt-4 text-muted-foreground">
            St Leonards College was founded by a group of examiners, engineers and educators
            who believed that great teaching shouldn't depend on your postcode. Today we serve
            thousands of students across four continents — preparing them for international
            exams, national curricula and modern careers.
          </p>
          <p className="mt-4 text-muted-foreground">
            Every program we run is built around three commitments: small live classes,
            world-class teachers, and learning materials that go beyond the textbook.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl sm:text-3xl">What we stand for</h2>
          <ul className="mt-4 space-y-4 text-sm">
            {[
              ["Access", "If you have a phone or a laptop, you have a desk in our college."],
              ["Excellence", "We hire only the top decile of teachers and curriculum writers."],
              ["Care", "Every student is known by name and supported throughout their journey."],
              ["Integrity", "Honest pricing, transparent outcomes and academic honesty by design."],
            ].map(([h, b]) => (
              <li key={h} className="rounded-xl border border-border bg-card p-4">
                <div className="font-display text-base font-semibold text-accent">{h}</div>
                <div className="mt-1 text-muted-foreground">{b}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand>
        <Button asChild variant="hero" size="lg"><Link to="/admissions">Start your application</Link></Button>
        <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
          <Link to="/contact">Talk to us</Link>
        </Button>
      </CTABand>
    </>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="border-b border-border bg-[image:var(--gradient-navy)] text-[color:var(--navy-foreground)]">
      <div className="container-x py-14 lg:py-20">
        <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--gold)]">{eyebrow}</div>
        <h1 className="mt-3 font-display text-4xl text-balance sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-white/75">{intro}</p>}
      </div>
    </section>
  );
}

export function CTABand({ children }: { children: React.ReactNode }) {
  return (
    <section className="container-x section-y">
      <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-navy)] p-10 text-center text-[color:var(--navy-foreground)]">
        <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[color:var(--gold)]/20 blur-3xl" />
        <h2 className="relative font-display text-3xl text-balance sm:text-4xl">Ready to learn without limits?</h2>
        <div className="relative mt-6 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </section>
  );
}
