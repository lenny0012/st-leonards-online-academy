import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Award } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/verify/$number")({
  head: () => ({ meta: [{ title: `Verify certificate — ${SITE.name}` }] }),
  component: Verify,
});

type Result = {
  certificate_number: string;
  issued_at: string;
  profiles: { full_name: string | null } | null;
  courses: { title: string; category: string | null } | null;
};

function Verify() {
  const { number } = useParams({ from: "/verify/$number" });
  const [data, setData] = useState<Result | null | "missing">(null);

  useEffect(() => {
    (async () => {
      const { data: cert } = await supabase
        .from("certificates")
        .select("certificate_number,issued_at,user_id,courses(title,category)")
        .eq("certificate_number", number)
        .maybeSingle();
      if (!cert) { setData("missing"); return; }
      // profile may be RLS-restricted for non-owners; gracefully degrade.
      const { data: prof } = await supabase.from("profiles").select("full_name").eq("id", cert.user_id).maybeSingle();
      setData({
        certificate_number: cert.certificate_number,
        issued_at: cert.issued_at,
        profiles: prof ?? null,
        courses: cert.courses as Result["courses"],
      });
    })();
  }, [number]);

  if (data === null) return <div className="container-x py-16 text-muted-foreground">Verifying…</div>;
  if (data === "missing") return (
    <div className="container-x py-16">
      <h1 className="font-display text-2xl font-semibold">Certificate not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">No certificate matches this number.</p>
      <Link to="/" className="mt-4 inline-block text-accent underline">Back to home</Link>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container-x">
        <div className="mx-auto max-w-3xl rounded-2xl border-4 border-accent/40 bg-card p-10 shadow-2xl">
          <div className="text-center">
            <Award className="mx-auto h-14 w-14 text-accent" />
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Certificate of Completion</p>
            <h1 className="mt-4 font-display text-2xl text-muted-foreground">This certifies that</h1>
            <p className="mt-2 font-display text-4xl md:text-5xl font-semibold">
              {data.profiles?.full_name ?? "St Leonards student"}
            </p>
            <p className="mt-4 text-muted-foreground">has successfully completed the course</p>
            <p className="mt-2 font-display text-2xl md:text-3xl font-semibold text-accent">
              {data.courses?.title}
            </p>
            <div className="mt-10 grid gap-2 text-xs text-muted-foreground">
              <p>Issued on {new Date(data.issued_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
              <p>Certificate number: <span className="font-mono">{data.certificate_number}</span></p>
              <p className="mt-2 font-display text-base font-medium text-foreground">{SITE.name}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
