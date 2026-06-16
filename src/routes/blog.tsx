import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "./about";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: `Blog & News — ${SITE.name}` },
      { name: "description", content: "Study tips, exam strategies, course updates and student stories from St Leonards College." },
      { property: "og:title", content: `Blog & News — ${SITE.name}` },
      { property: "og:description", content: "Study tips, exam strategies, course updates and student stories." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const POSTS = [
  { title: "How to ace IGCSE Maths Paper 4 in 6 weeks", category: "Exam Prep", date: "Jun 12, 2026", excerpt: "A week-by-week study plan from our top examiners — with past paper drills and worked solutions." },
  { title: "The CCNA learning roadmap for 2026", category: "Tech", date: "Jun 04, 2026", excerpt: "From subnetting basics to lab mastery. Here's how our students pass the CCNA on their first attempt." },
  { title: "From Canva to After Effects: a designer's journey", category: "Design", date: "May 28, 2026", excerpt: "Student Naliaka shares how she went from social posts to motion graphics in one semester." },
  { title: "KCSE Biology: 10 high-yield diagrams to master", category: "Revision", date: "May 20, 2026", excerpt: "Our biology team picks the diagrams that come up most often — and how to draw them under time pressure." },
  { title: "Why small group classes outperform private tutoring (sometimes)", category: "Learning", date: "May 11, 2026", excerpt: "Research, anecdotes and a few surprising data points from our 2025 cohort." },
  { title: "Building your first portfolio website in 14 weeks", category: "Programming", date: "May 02, 2026", excerpt: "A walkthrough of our Full-Stack Web Development track and what students build along the way." },
];

function Blog() {
  return (
    <>
      <PageHeader eyebrow="Blog & News" title="Tips, stories and updates." intro="Insights from our tutors and learners — to help you study smarter and stay inspired." />
      <section className="container-x section-y grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map(p => (
          <Link key={p.title} to="/blog" className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-accent">
            <div className="text-[11px] font-medium uppercase tracking-wider text-accent">{p.category}</div>
            <h2 className="mt-3 font-display text-lg group-hover:text-accent">{p.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
            <div className="mt-6 text-xs text-muted-foreground">{p.date}</div>
          </Link>
        ))}
      </section>
    </>
  );
}
