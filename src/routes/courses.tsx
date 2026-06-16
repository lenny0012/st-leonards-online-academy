import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { PageHeader, CTABand } from "./about";
import { CATEGORIES } from "@/lib/courses";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: `Courses — ${SITE.name}` },
      { name: "description", content: "Explore IGCSE, CBC, KCSE and professional courses at St Leonards College — from Mathematics to Cybersecurity, Design and Web Development." },
      { property: "og:title", content: `Courses — ${SITE.name}` },
      { property: "og:description", content: "Explore IGCSE, CBC, KCSE and professional courses at St Leonards College." },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: Courses,
});

function Courses() {
  return (
    <>
      <PageHeader eyebrow="Catalogue" title="Find your next course." intro="From Cambridge IGCSE and KCSE revision to industry certifications — there's a path here for every learner." />

      <section className="container-x py-8">
        <div className="rounded-2xl border border-accent/40 bg-gradient-to-r from-accent/10 via-card to-card p-6 md:p-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl md:text-2xl font-semibold">Ready to start learning?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Enroll in our self-paced online courses with lessons, quizzes and certificates.</p>
          </div>
          <Button asChild variant="gold"><Link to="/catalog">Browse online courses →</Link></Button>
        </div>
      </section>


      <section className="container-x section-y">
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <a key={c.slug} href={`#${c.slug}`} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium hover:border-accent hover:text-accent">
              {c.name}
            </a>
          ))}
        </div>

        <div className="space-y-16">
          {CATEGORIES.map(cat => (
            <article key={cat.slug} id={cat.slug} className="scroll-mt-24">
              <header className="border-l-4 border-accent pl-4">
                <div className="text-xs uppercase tracking-[0.18em] text-accent">Category</div>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl">{cat.name}</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{cat.blurb}</p>
              </header>
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {cat.groups.map(group => (
                  <div key={group.name} className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-display text-base font-semibold text-accent">{group.name}</h3>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {group.courses.map(course => (
                        <li key={course.title} className="flex items-center gap-2 text-sm">
                          <BookOpen className="h-3.5 w-3.5 shrink-0 text-accent" />
                          <span className="truncate">{course.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTABand>
        <Button asChild variant="hero" size="lg"><Link to="/admissions">Enrol now</Link></Button>
        <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
          <Link to="/contact">Ask an advisor</Link>
        </Button>
      </CTABand>
    </>
  );
}
