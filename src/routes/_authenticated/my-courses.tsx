import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/my-courses")({
  component: MyCourses,
});

type Row = {
  id: string;
  progress_percent: number;
  completed_at: string | null;
  courses: { slug: string; title: string; category: string | null; level: string | null } | null;
};

function MyCourses() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("enrollments")
      .select("id,progress_percent,completed_at,courses(slug,title,category,level)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setRows((data as Row[]) ?? []));
  }, [user]);

  return (
    <section className="py-10 md:py-14">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">My Learning</h1>
            <p className="mt-1 text-sm text-muted-foreground">Pick up where you left off.</p>
          </div>
          <Button asChild variant="outline"><Link to="/catalog">Browse catalog</Link></Button>
        </div>

        {rows === null ? (
          <p className="mt-8 text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-muted-foreground">You haven't enrolled in any courses yet.</p>
            <Button asChild variant="gold" className="mt-4"><Link to="/catalog">Find a course</Link></Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {rows.map((r) => r.courses && (
              <Link key={r.id} to="/learn/$slug" params={{ slug: r.courses.slug }} className="block rounded-xl border border-border bg-card p-5 transition hover:border-accent/60">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent">{r.courses.category}</span>
                  {r.completed_at && <span className="text-accent">· Completed</span>}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold">{r.courses.title}</h3>
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground"><span>Progress</span><span>{r.progress_percent}%</span></div>
                  <Progress value={r.progress_percent} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
