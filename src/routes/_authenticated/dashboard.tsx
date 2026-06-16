import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { BookOpen, GraduationCap, Shield, Video, FileText, Award, Users, BarChart3 } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: `Dashboard — ${SITE.name}` }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user, roles, loading } = useAuth();
  if (loading) return <div className="container-x py-16 text-center text-muted-foreground">Loading…</div>;

  const isAdmin = roles.includes("admin");
  const isTeacher = roles.includes("teacher");
  const role = isAdmin ? "admin" : isTeacher ? "teacher" : "student";

  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 md:py-14">
      <div className="container-x">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent">{role} dashboard</p>
            <h1 className="mt-1 font-display text-3xl font-semibold md:text-4xl">
              Welcome, {user?.user_metadata?.full_name ?? user?.email?.split("@")[0]}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Continue where you left off.</p>
          </div>
          <Link to="/profile" className="text-sm font-medium text-accent hover:underline">View profile →</Link>
        </div>

        {role === "student" && <StudentPanel />}
        {role === "teacher" && <TeacherPanel />}
        {role === "admin" && <AdminPanel />}
      </div>
    </section>
  );
}

function Card({ icon: Icon, title, value, hint }: { icon: any; title: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent"><Icon className="h-5 w-5" /></div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
          <div className="font-display text-2xl font-semibold">{value}</div>
        </div>
      </div>
      {hint && <p className="mt-3 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function StudentPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card icon={BookOpen} title="Enrolled courses" value="0" hint="Browse the catalog to enroll." />
      <Card icon={Video} title="Upcoming classes" value="0" hint="Live sessions appear here." />
      <Card icon={FileText} title="Assignments due" value="0" hint="Coming soon." />
      <Card icon={Award} title="Certificates" value="0" hint="Earned after course completion." />
      <div className="md:col-span-2 lg:col-span-4 rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
        Your learning workspace is ready. Course enrollment, live sessions, assignments and certificates will plug in here as we roll out the next phases.
      </div>
    </div>
  );
}

function TeacherPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card icon={GraduationCap} title="Active classes" value="0" />
      <Card icon={Users} title="Students" value="0" />
      <Card icon={FileText} title="Submissions" value="0" />
      <Card icon={Video} title="Next session" value="—" />
    </div>
  );
}

function AdminPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card icon={Users} title="Total users" value="—" />
      <Card icon={BookOpen} title="Courses" value="—" />
      <Card icon={BarChart3} title="Enrollments" value="—" />
      <Card icon={Shield} title="Pending approvals" value="0" />
    </div>
  );
}
