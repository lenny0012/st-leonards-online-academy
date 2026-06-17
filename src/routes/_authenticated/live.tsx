import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Video, Calendar, ExternalLink } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/live")({
  head: () => ({ meta: [{ title: `Live Classes — ${SITE.name}` }] }),
  component: LiveClassesPage,
});

type Row = {
  id: string;
  title: string;
  description: string | null;
  provider: "zoom" | "meet";
  join_url: string;
  starts_at: string;
  ends_at: string | null;
  passcode: string | null;
  courses: { title: string; slug: string } | null;
};

function LiveClassesPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("live_classes")
      .select("id,title,description,provider,join_url,starts_at,ends_at,passcode,courses(title,slug)")
      .gte("starts_at", new Date(Date.now() - 60 * 60 * 1000).toISOString())
      .order("starts_at", { ascending: true })
      .then(({ data }) => setRows((data as unknown as Row[]) ?? []));
  }, [user]);

  return (
    <section className="py-10 md:py-14">
      <div className="container-x">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">Upcoming Live Classes</h1>
            <p className="mt-1 text-sm text-muted-foreground">Join Zoom or Google Meet sessions for your enrolled courses.</p>
          </div>
        </div>

        {rows === null ? (
          <p className="mt-8 text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <Video className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-muted-foreground">No live classes scheduled yet. Check back soon.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {rows.map((r) => {
              const start = new Date(r.starts_at);
              const isLive = Date.now() >= start.getTime() - 10 * 60 * 1000 && (!r.ends_at || Date.now() <= new Date(r.ends_at).getTime());
              return (
                <div key={r.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent uppercase">{r.provider === "zoom" ? "Zoom" : "Google Meet"}</span>
                      {r.courses && <span className="text-muted-foreground">{r.courses.title}</span>}
                      {isLive && <span className="rounded-full bg-red-500/10 px-2 py-0.5 font-medium text-red-500">● LIVE</span>}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold">{r.title}</h3>
                    {r.description && <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>}
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {start.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                      {r.passcode && <span className="ml-3">Passcode: <code className="rounded bg-secondary px-1.5 py-0.5">{r.passcode}</code></span>}
                    </div>
                  </div>
                  <Button asChild variant={isLive ? "gold" : "outline"}>
                    <a href={r.join_url} target="_blank" rel="noopener noreferrer">
                      Join <ExternalLink className="ml-1.5 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
