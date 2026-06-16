import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, CTABand } from "./about";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { Users, Clock, BookOpenCheck, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/online-tuition")({
  head: () => ({
    meta: [
      { title: `Online Tuition — ${SITE.name}` },
      { name: "description", content: "One-to-one and small group online tuition for IGCSE, KCSE, CBC and professional subjects." },
      { property: "og:title", content: `Online Tuition — ${SITE.name}` },
      { property: "og:description", content: "One-to-one and small group online tuition for IGCSE, KCSE, CBC and professional subjects." },
      { property: "og:url", content: "/online-tuition" },
    ],
    links: [{ rel: "canonical", href: "/online-tuition" }],
  }),
  component: OnlineTuition,
});

const FEATURES = [
  { icon: Users, title: "1-to-1 or small groups", body: "Choose private tutoring or group sessions capped at 8 students." },
  { icon: Clock, title: "Flexible timetable", body: "Pick a schedule that works across your time zone, 7 days a week." },
  { icon: BookOpenCheck, title: "Full curriculum match", body: "Tutors follow your exact syllabus — Cambridge, KNEC or other boards." },
  { icon: MessageSquare, title: "Direct tutor chat", body: "Message your tutor between sessions for quick help on tough questions." },
];

function OnlineTuition() {
  return (
    <>
      <PageHeader eyebrow="Online Tuition" title="A tutor for every subject, on your schedule." intro="Get matched with an expert tutor for any IGCSE, KCSE, CBC or skill-based subject — live, online and tailored to you." />
      <section className="container-x section-y grid gap-5 sm:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--navy)] text-[color:var(--gold)]"><Icon className="h-5 w-5" /></div>
            <h3 className="mt-5 font-display text-lg">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </section>
      <CTABand>
        <Button asChild variant="hero" size="lg"><Link to="/contact">Request a tutor</Link></Button>
        <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"><Link to="/courses">See subjects</Link></Button>
      </CTABand>
    </>
  );
}
