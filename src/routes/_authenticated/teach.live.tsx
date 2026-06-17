import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2, Video, ExternalLink, ShieldAlert } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/teach/live")({
  head: () => ({ meta: [{ title: `Schedule Live Classes — ${SITE.name}` }] }),
  component: TeachLive,
});

type Course = { id: string; title: string };
type LiveRow = {
  id: string;
  title: string;
  provider: "zoom" | "meet";
  join_url: string;
  starts_at: string;
  courses: { title: string } | null;
};

function TeachLive() {
  const { user, roles, loading } = useAuth();
  const canTeach = roles.includes("teacher") || roles.includes("admin");

  const [courses, setCourses] = useState<Course[]>([]);
  const [rows, setRows] = useState<LiveRow[] | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    course_id: "",
    title: "",
    description: "",
    provider: "zoom" as "zoom" | "meet",
    join_url: "",
    passcode: "",
    starts_at: "",
    ends_at: "",
  });

  async function loadAll() {
    if (!user) return;
    const isAdmin = roles.includes("admin");
    const cq = supabase.from("courses").select("id,title").order("title");
    const { data: cs } = isAdmin ? await cq : await cq.eq("instructor_id", user.id);
    setCourses((cs as Course[]) ?? []);

    const { data: ls } = await supabase
      .from("live_classes")
      .select("id,title,provider,join_url,starts_at,courses(title)")
      .eq("host_id", user.id)
      .order("starts_at", { ascending: false });
    setRows((ls as unknown as LiveRow[]) ?? []);
  }

  useEffect(() => {
    if (canTeach) loadAll();
  }, [user, canTeach]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (!form.course_id || !form.title || !form.join_url || !form.starts_at) {
      toast.error("Course, title, link and start time are required.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("live_classes").insert({
      course_id: form.course_id,
      host_id: user.id,
      title: form.title,
      description: form.description || null,
      provider: form.provider,
      join_url: form.join_url,
      passcode: form.passcode || null,
      starts_at: new Date(form.starts_at).toISOString(),
      ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Live class scheduled.");
    setForm({ ...form, title: "", description: "", join_url: "", passcode: "", starts_at: "", ends_at: "" });
    loadAll();
  }

  async function remove(id: string) {
    if (!confirm("Delete this scheduled class?")) return;
    const { error } = await supabase.from("live_classes").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted.");
    loadAll();
  }

  if (loading) return <div className="container-x py-16 text-muted-foreground">Loading…</div>;
  if (!canTeach) {
    return (
      <div className="container-x py-16 text-center">
        <ShieldAlert className="mx-auto h-8 w-8 text-muted-foreground" />
        <h1 className="mt-3 font-display text-2xl">Teachers only</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your account needs the teacher or admin role to schedule classes.</p>
        <Button asChild variant="outline" className="mt-4"><Link to="/dashboard">Back to dashboard</Link></Button>
      </div>
    );
  }

  return (
    <section className="py-10 md:py-14">
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h1 className="font-display text-3xl font-semibold">Schedule a Live Class</h1>
          <p className="mt-1 text-sm text-muted-foreground">Paste a Zoom or Google Meet link. Enrolled students will see it in their dashboard.</p>

          {courses.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
              You don't own any courses yet. Create a course to start scheduling.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 grid gap-4 rounded-xl border border-border bg-card p-6">
              <div className="grid gap-2">
                <Label>Course</Label>
                <Select value={form.course_id} onValueChange={(v) => setForm({ ...form, course_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                  <SelectContent>
                    {courses.map((c) => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Week 3: Quadratic equations" />
              </div>
              <div className="grid gap-2">
                <Label>Description (optional)</Label>
                <Textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Provider</Label>
                  <Select value={form.provider} onValueChange={(v) => setForm({ ...form, provider: v as "zoom" | "meet" })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="meet">Google Meet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Passcode (optional)</Label>
                  <Input value={form.passcode} onChange={(e) => setForm({ ...form, passcode: e.target.value })} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Join URL</Label>
                <Input value={form.join_url} onChange={(e) => setForm({ ...form, join_url: e.target.value })} placeholder="https://zoom.us/j/… or https://meet.google.com/…" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Starts at</Label>
                  <Input type="datetime-local" value={form.starts_at} onChange={(e) => setForm({ ...form, starts_at: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Ends at (optional)</Label>
                  <Input type="datetime-local" value={form.ends_at} onChange={(e) => setForm({ ...form, ends_at: e.target.value })} />
                </div>
              </div>
              <Button type="submit" variant="navy" disabled={submitting}>{submitting ? "Saving…" : "Schedule class"}</Button>
            </form>
          )}
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold">Your scheduled classes</h2>
          {rows === null ? (
            <p className="mt-4 text-muted-foreground">Loading…</p>
          ) : rows.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
              <Video className="mx-auto h-6 w-6" />
              <p className="mt-2">No sessions yet.</p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {rows.map((r) => (
                <li key={r.id} className="flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-4">
                  <div className="min-w-0">
                    <div className="text-xs uppercase text-accent">{r.provider === "zoom" ? "Zoom" : "Google Meet"} · {r.courses?.title}</div>
                    <div className="mt-0.5 font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground">{new Date(r.starts_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</div>
                    <a href={r.join_url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-accent hover:underline">
                      Open link <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => remove(r.id)} aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
