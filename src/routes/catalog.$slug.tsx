import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Award, FileText, HelpCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/catalog/$slug")({
  component: CourseDetail,
});

type Course = { id: string; slug: string; title: string; summary: string | null; category: string | null; level: string | null; duration_weeks: number | null };
type Lesson = { id: string; position: number; title: string; duration_min: number | null };

function CourseDetail() {
  const { slug } = useParams({ from: "/catalog/$slug" });
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [enrolled, setEnrolled] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: c } = await supabase.from("courses").select("id,slug,title,summary,category,level,duration_weeks").eq("slug", slug).maybeSingle();
      if (!c) { setLoading(false); return; }
      setCourse(c);
      const { data: ls } = await supabase.from("lessons").select("id,position,title,duration_min").eq("course_id", c.id).order("position");
      setLessons(ls ?? []);
      if (user) {
        const { data: e } = await supabase.from("enrollments").select("id").eq("user_id", user.id).eq("course_id", c.id).maybeSingle();
        if (e) setEnrolled(e.id);
      }
      setLoading(false);
    })();
  }, [slug, user]);

  async function enroll() {
    if (!user) { navigate({ to: "/auth" }); return; }
    if (!course) return;
    setEnrolling(true);
    const { data, error } = await supabase.from("enrollments").insert({ user_id: user.id, course_id: course.id }).select("id").single();
    setEnrolling(false);
    if (error) return toast.error(error.message);
    setEnrolled(data.id);
    toast.success("You're enrolled!");
    navigate({ to: "/learn/$slug", params: { slug: course.slug } });
  }

  if (loading) return <div className="container-x py-16 text-muted-foreground">Loading…</div>;
  if (!course) return <div className="container-x py-16">Course not found. <Link to="/catalog" className="text-accent underline">Back to catalog</Link></div>;

  return (
    <section className="py-10 md:py-14">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <Link to="/catalog" className="text-xs text-muted-foreground hover:text-accent">← All courses</Link>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent">{course.category}</span>
            {course.level && <span className="text-muted-foreground">· {course.level}</span>}
          </div>
          <h1 className="mt-3 font-display text-3xl md:text-4xl font-semibold">{course.title}</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">{course.summary}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration_weeks} weeks</span>
            <span className="inline-flex items-center gap-1"><BookOpen className="h-4 w-4" />{lessons.length} lessons</span>
            <span className="inline-flex items-center gap-1"><FileText className="h-4 w-4" />Project</span>
            <span className="inline-flex items-center gap-1"><HelpCircle className="h-4 w-4" />Quiz</span>
            <span className="inline-flex items-center gap-1"><Award className="h-4 w-4" />Certificate</span>
          </div>

          <h2 className="mt-10 font-display text-xl font-semibold">What you'll learn</h2>
          <ol className="mt-4 grid gap-2">
            {lessons.map((l) => (
              <li key={l.id} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 text-sm">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent/10 text-xs font-semibold text-accent">{l.position}</div>
                <div className="flex-1">
                  <div className="font-medium">{l.title}</div>
                  <div className="text-xs text-muted-foreground">{l.duration_min} min</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <div className="text-2xl font-semibold">Free</div>
          <p className="mt-1 text-xs text-muted-foreground">Full access · Certificate included</p>
          {enrolled ? (
            <Button asChild variant="navy" className="mt-4 w-full">
              <Link to="/learn/$slug" params={{ slug: course.slug }}>
                <CheckCircle2 className="mr-2 h-4 w-4" />Continue learning
              </Link>
            </Button>
          ) : (
            <Button onClick={enroll} disabled={enrolling} variant="gold" className="mt-4 w-full">
              {enrolling ? "Enrolling…" : user ? "Enroll now" : "Sign in to enroll"}
            </Button>
          )}
          <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
            <li>✓ Self-paced lessons</li>
            <li>✓ Project assignment</li>
            <li>✓ End-of-course quiz</li>
            <li>✓ Downloadable resources</li>
            <li>✓ Certificate of completion</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
