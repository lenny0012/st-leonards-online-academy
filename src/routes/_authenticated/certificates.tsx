import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Award } from "lucide-react";

export const Route = createFileRoute("/_authenticated/certificates")({
  component: Certificates,
});

type Row = { id: string; certificate_number: string; issued_at: string; courses: { title: string; slug: string } | null };

function Certificates() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("certificates").select("id,certificate_number,issued_at,courses(title,slug)").eq("user_id", user.id).order("issued_at", { ascending: false }).then(({ data }) => setRows((data as Row[]) ?? []));
  }, [user]);

  return (
    <section className="py-10 md:py-14">
      <div className="container-x">
        <h1 className="font-display text-3xl font-semibold">My Certificates</h1>
        <p className="mt-1 text-sm text-muted-foreground">Share your achievements with the world.</p>

        {rows === null ? <p className="mt-8 text-muted-foreground">Loading…</p> :
          rows.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
              Complete a course to earn your first certificate.
            </div>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {rows.map((r) => (
                <Link key={r.id} to="/verify/$number" params={{ number: r.certificate_number }} className="rounded-xl border border-border bg-card p-5 transition hover:border-accent/60">
                  <div className="flex items-start gap-3">
                    <Award className="h-8 w-8 text-accent" />
                    <div>
                      <h3 className="font-display text-lg font-semibold">{r.courses?.title}</h3>
                      <p className="text-xs text-muted-foreground">Issued {new Date(r.issued_at).toLocaleDateString()}</p>
                      <p className="mt-1 text-xs font-mono text-muted-foreground">{r.certificate_number}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
      </div>
    </section>
  );
}
