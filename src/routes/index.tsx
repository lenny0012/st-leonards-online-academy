import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GraduationCap, Globe2, BookOpen, Award, Video, Users, ShieldCheck,
  CalendarClock, Sparkles, ArrowRight, Star, Quote, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { CATEGORIES, FEATURED } from "@/lib/courses";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { property: "og:title", content: `${SITE.name} — ${SITE.tagline}` },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const STATS = [
  { label: "Active Students", value: "12,400+" },
  { label: "Courses", value: "180+" },
  { label: "Expert Tutors", value: "320" },
  { label: "Graduates", value: "8,900+" },
];

const WHY = [
  { icon: GraduationCap, title: "Examiner-led teaching", body: "Lessons designed and delivered by curriculum specialists and Cambridge examiners." },
  { icon: Globe2, title: "Truly global classroom", body: "Join students from over 40 countries learning live and on-demand." },
  { icon: Video, title: "Live + recorded classes", body: "Attend live lessons or catch up later with full HD recordings." },
  { icon: Award, title: "Recognised certificates", body: "Earn certificates after completing courses and assessments." },
  { icon: ShieldCheck, title: "Safe learning space", body: "Verified tutors, moderated chat and family-friendly classrooms." },
  { icon: Users, title: "Small group attention", body: "Capped class sizes so every learner gets the help they need." },
];

const TESTIMONIALS = [
  { name: "Amara Okafor", role: "IGCSE Student, Lagos", text: "St Leonards rebuilt my confidence in Maths. I moved from a C to an A* in one term." },
  { name: "Liam Mwangi", role: "KCSE Candidate, Nairobi", text: "The live revision classes and past paper drills made the difference for me." },
  { name: "Priya Shah", role: "Web Dev Student, Mumbai", text: "I went from zero coding to deploying my own portfolio site in 14 weeks." },
];

const EVENTS = [
  { date: "Jun 24", title: "IGCSE Mathematics — Paper 4 Walkthrough", time: "5:00 PM EAT", tag: "Live Class" },
  { date: "Jun 27", title: "Intro to Python: Build a Calculator", time: "6:30 PM EAT", tag: "Workshop" },
  { date: "Jul 02", title: "Cybersecurity Essentials Open Day", time: "4:00 PM EAT", tag: "Event" },
  { date: "Jul 06", title: "KCSE Biology Revision Marathon", time: "9:00 AM EAT", tag: "Revision" },
];

const FAQS = [
  { q: "How are classes delivered?", a: "Through our live virtual classrooms (Zoom & Google Meet) plus on-demand video lessons in your dashboard. Every live class is recorded." },
  { q: "Are the certificates recognised?", a: "Yes — our certificates are issued by St Leonards College and many are aligned with international curricula like Cambridge IGCSE and Cisco." },
  { q: "Can I pay in instalments?", a: "Absolutely. We accept M-Pesa, card and bank payments, and most programs offer monthly instalment options." },
  { q: "Do you offer scholarships?", a: "We award need-based and merit scholarships every term. Apply through the Admissions page." },
  { q: "Which devices do I need?", a: "A laptop, tablet or smartphone with a stable internet connection. All learning materials are mobile-friendly." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-navy)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.07]" style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
        <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div className="text-[color:var(--navy-foreground)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--gold)]">
              <Sparkles className="h-3.5 w-3.5" /> Admissions open · Term 3
            </div>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
              An online college for the
              <span className="block text-[color:var(--gold)]">next generation of learners.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">
              IGCSE, CBC, KCSE and professional training — taught live by world-class
              tutors. Study from anywhere and earn certificates that count.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/admissions">Apply Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link to="/courses">Browse Courses</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                <Link to="/live-classes">Join Live Class</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-white/70">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-[color:var(--navy)] bg-[image:var(--gradient-gold)]" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-[color:var(--gold)]">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <div>Rated 4.9/5 by 2,300+ students</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-[color:var(--gold)]/30 blur-2xl" />
            <img
              src={heroImage}
              alt="Students learning online at St Leonards College"
              width={1600}
              height={1120}
              className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-[var(--shadow-elegant)] ring-1 ring-white/10"
            />
            <div className="absolute -bottom-6 left-6 rounded-xl bg-background p-4 shadow-[var(--shadow-elegant)] ring-1 ring-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Live now</div>
              <div className="mt-1 font-display text-sm font-semibold">IGCSE Chemistry · Mole Concept</div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> 184 students attending
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-secondary/50">
        <div className="container-x grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-4">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-semibold text-foreground sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="container-x section-y">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-accent">About the College</div>
            <h2 className="mt-3 font-display text-3xl text-balance sm:text-4xl">
              A college built around the learner — not the timetable.
            </h2>
          </div>
          <div className="text-muted-foreground">
            <p>
              St Leonards College is a fully online institution offering Cambridge IGCSE,
              the Kenyan CBC and KCSE curriculum, and a growing catalogue of professional
              certifications. We combine live, interactive teaching with on-demand video
              libraries, detailed notes, past papers and personal mentorship.
            </p>
            <p className="mt-4">
              Whether you're preparing for an international exam, picking up a new
              technical skill, or returning to study, our tutors meet you where you are
              and help you go further.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="container-x section-y">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-accent">Featured Programs</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Popular this term</h2>
          </div>
          <Link to="/courses" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent">
            All courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map(c => (
            <Link
              key={c.title}
              to="/courses"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-foreground/70">
                  {c.tag}
                </span>
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-5 font-display text-xl group-hover:text-accent">{c.title}</h3>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <CalendarClock className="h-3.5 w-3.5" /> {c.duration}
              </div>
              <div className="mt-6 flex items-center gap-1 text-sm font-medium text-foreground">
                Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container-x section-y">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.18em] text-accent">Why St Leonards</div>
            <h2 className="mt-3 font-display text-3xl text-balance sm:text-4xl">
              Everything you need to succeed online.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--navy)] text-[color:var(--gold)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x section-y">
        <div className="text-xs uppercase tracking-[0.18em] text-accent">Course Categories</div>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">Explore your path</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              to="/courses"
              hash={cat.slug}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:border-accent"
            >
              <div className="font-display text-lg text-foreground group-hover:text-accent">{cat.name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{cat.blurb}</p>
              <div className="mt-4 text-xs uppercase tracking-wider text-accent">
                {cat.groups.reduce((n, g) => n + g.courses.length, 0)} courses →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container-x section-y">
          <div className="text-xs uppercase tracking-[0.18em] text-accent">Student Voices</div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Outcomes our learners are proud of</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map(t => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-6">
                <Quote className="h-6 w-6 text-accent" />
                <blockquote className="mt-3 text-sm leading-relaxed text-foreground">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-5">
                  <div className="font-display text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="container-x section-y">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-accent">What's On</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Upcoming classes & events</h2>
          </div>
          <Link to="/live-classes" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:text-accent">
            Full calendar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {EVENTS.map(e => (
            <div key={e.title} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-5 sm:gap-6">
              <div className="rounded-xl bg-[color:var(--navy)] px-3 py-2 text-center text-[color:var(--navy-foreground)]">
                <div className="text-[10px] uppercase tracking-wider text-[color:var(--gold)]">{e.date.split(" ")[0]}</div>
                <div className="font-display text-xl font-semibold">{e.date.split(" ")[1]}</div>
              </div>
              <div className="min-w-0">
                <div className="font-display text-base font-semibold truncate">{e.title}</div>
                <div className="text-xs text-muted-foreground">{e.time} · {e.tag}</div>
              </div>
              <Button asChild variant="outline" size="sm" className="shrink-0">
                <Link to="/live-classes">Register</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x section-y">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-accent">FAQs</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-balance">Questions, answered.</h2>
            <p className="mt-4 text-muted-foreground">
              Still unsure? <Link to="/contact" className="text-accent underline-offset-4 hover:underline">Talk to admissions</Link> or message us on WhatsApp.
            </p>
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA / NEWSLETTER */}
      <section className="container-x section-y">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-navy)] p-8 text-[color:var(--navy-foreground)] sm:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[color:var(--gold)]/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl text-balance sm:text-4xl">
                Get the weekly study brief.
              </h2>
              <p className="mt-3 max-w-md text-white/75">
                Exam tips, free resources and new course drops — straight to your inbox.
              </p>
            </div>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => { e.preventDefault(); alert("Thanks! You're subscribed."); }}
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email"
                className="h-12 flex-1 rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white placeholder-white/50 outline-none focus:border-[color:var(--gold)]"
              />
              <Button type="submit" variant="hero" size="lg">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="block w-full p-5 text-left"
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-display text-base font-semibold">{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180 text-accent" : ""}`} />
      </div>
      {open && <p className="mt-3 text-sm text-muted-foreground">{a}</p>}
    </button>
  );
}
