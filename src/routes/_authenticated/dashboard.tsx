import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, GraduationCap, Shield, Video, FileText, Award, Users, BarChart3 } from "lucide-react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";

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

        {role === "student" && <StudentPanel userId={user!.id} />}
        {role === "teacher" && <TeacherPanel />}
        {role === "admin" && <AdminPanel />}
      </div>
    </section>
  );
}

function Card({ icon: Icon, title, value, hint }: { icon: any; title: string; value: string | number; hint?: string }) {
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

function StudentPanel({ userId }: { userId: string }) {
  const [stats, setStats] = useState({ enrolled: 0, certificates: 0, completed: 0 });
  useEffect(() => {
    (async () => {
      const [{ count: enrolled }, { count: certificates }, { count: completed }] = await Promise.all([
        supabase.from("enrollments").select("*", { count: "exact", head: true }).eq("user_id", userId),
        supabase.from("certificates").select("*", { count: "exact", head: true }).eq("user_id", userId),
        supabase.from("enrollments").select("*", { count: "exact", head: true }).eq("user_id", userId).not("completed_at", "is", null),
      ]);
      setStats({ enrolled: enrolled ?? 0, certificates: certificates ?? 0, completed: completed ?? 0 });
    })();
  }, [userId]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card icon={BookOpen} title="Enrolled courses" value={stats.enrolled} />
        <Card icon={Video} title="Completed" value={stats.completed} />
        <Card icon={FileText} title="Active learning" value={Math.max(stats.enrolled - stats.completed, 0)} />
        <Card icon={Award} title="Certificates" value={stats.certificates} />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link to="/my-courses" className="rounded-xl border border-border bg-card p-5 transition hover:border-accent/60">
          <div className="font-display text-lg font-semibold">My Learning →</div>
          <p className="mt-1 text-sm text-muted-foreground">Continue your enrolled courses.</p>
        </Link>
        <Link to="/live" className="rounded-xl border border-border bg-card p-5 transition hover:border-accent/60">
          <div className="font-display text-lg font-semibold">Live Classes →</div>
          <p className="mt-1 text-sm text-muted-foreground">Join Zoom & Meet sessions.</p>
        </Link>
        <Link to="/catalog" className="rounded-xl border border-border bg-card p-5 transition hover:border-accent/60">
          <div className="font-display text-lg font-semibold">Browse Catalog →</div>
          <p className="mt-1 text-sm text-muted-foreground">Discover new courses to enroll in.</p>
        </Link>
        <Link to="/certificates" className="rounded-xl border border-border bg-card p-5 transition hover:border-accent/60">
          <div className="font-display text-lg font-semibold">My Certificates →</div>
          <p className="mt-1 text-sm text-muted-foreground">View and share your achievements.</p>
        </Link>
      </div>
    </>
  );
}

function TeacherPanel() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card icon={GraduationCap} title="Active classes" value="—" />
        <Card icon={Users} title="Students" value="—" />
        <Card icon={FileText} title="Submissions" value="—" />
        <Card icon={Video} title="Next session" value="—" />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Link to="/teach/live" className="rounded-xl border border-border bg-card p-5 transition hover:border-accent/60">
          <div className="font-display text-lg font-semibold">Schedule Live Class →</div>
          <p className="mt-1 text-sm text-muted-foreground">Post Zoom or Google Meet sessions for your students.</p>
        </Link>
        <Link to="/live" className="rounded-xl border border-border bg-card p-5 transition hover:border-accent/60">
          <div className="font-display text-lg font-semibold">Upcoming Sessions →</div>
          <p className="mt-1 text-sm text-muted-foreground">See all live classes happening soon.</p>
        </Link>
      </div>
    </>
  );
}

function AdminPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card icon={Users} title="Total users" value="—" />
      <Card icon={BookOpen} title="Courses" value="—" />
      <Card icon={BarChart3} title="Enrollments" value="—" />
      <Card icon={Shield} title="Pending" value="—" />
    </div>
  );
}
