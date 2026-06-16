import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, CTABand } from "./about";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { Video, Bell, Archive } from "lucide-react";

export const Route = createFileRoute("/live-classes")({
  head: () => ({
    meta: [
      { title: `Live Classes — ${SITE.name}` },
      { name: "description", content: "Join live online classes via Zoom and Google Meet. Class reminders, recordings and study materials included." },
      { property: "og:title", content: `Live Classes — ${SITE.name}` },
      { property: "og:description", content: "Join live online classes via Zoom and Google Meet." },
      { property: "og:url", content: "/live-classes" },
    ],
    links: [{ rel: "canonical", href: "/live-classes" }],
  }),
  component: LiveClasses,
});

const SCHEDULE = [
  { day: "Mon", time: "5:00 PM", subject: "IGCSE Mathematics", tutor: "Mr. Kariuki" },
  { day: "Tue", time: "6:30 PM", subject: "Python for Beginners", tutor: "Ms. Otieno" },
  { day: "Wed", time: "4:00 PM", subject: "KCSE Biology Revision", tutor: "Dr. Wanjiku" },
  { day: "Thu", time: "5:30 PM", subject: "Cisco CCNA Lab", tutor: "Eng. Mwangi" },
  { day: "Fri", time: "6:00 PM", subject: "Adobe Photoshop", tutor: "Ms. Achieng" },
  { day: "Sat", time: "9:00 AM", subject: "QuickBooks Accounting", tutor: "Mr. Njoroge" },
];

function LiveClasses() {
  return (
    <>
      <PageHeader eyebrow="Live Classes" title="Real teachers, real time." intro="Join live, interactive lessons from your dashboard. Every class is recorded so you can revisit it any time." />

      <section className="container-x section-y grid gap-5 sm:grid-cols-3">
        {[
          { icon: Video, title: "Zoom & Google Meet", body: "Join with one tap from your dashboard." },
          { icon: Bell, title: "Smart reminders", body: "Email and push notifications before every class." },
          { icon: Archive, title: "Recording archive", body: "Re-watch lessons anytime, on any device." },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--navy)] text-[color:var(--gold)]"><Icon className="h-5 w-5" /></div>
            <h3 className="mt-5 font-display text-lg">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </section>

      <section className="container-x section-y">
        <h2 className="font-display text-2xl sm:text-3xl">This week's schedule</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Day</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Subject</th>
                <th className="hidden px-4 py-3 sm:table-cell">Tutor</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {SCHEDULE.map(s => (
                <tr key={s.subject}>
                  <td className="px-4 py-3 font-medium">{s.day}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.time}</td>
                  <td className="px-4 py-3">{s.subject}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{s.tutor}</td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild size="sm" variant="gold"><Link to="/admissions">Join</Link></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CTABand>
        <Button asChild variant="hero" size="lg"><Link to="/admissions">Get class access</Link></Button>
      </CTABand>
    </>
  );
}
