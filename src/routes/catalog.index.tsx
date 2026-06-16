import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listCourses, type CourseRow } from "@/lib/lms";
import { BookOpen, Clock } from "lucide-react";

export const Route = createFileRoute("/catalog/")({
  component: CatalogList,
});

function CatalogList() {
  const [courses, setCourses] = useState<CourseRow[] | null>(null);
  useEffect(() => { listCourses().then(setCourses).catch(() => setCourses([])); }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">Course Catalog</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-semibold">Enroll in a course</h1>
          <p className="mt-3 text-muted-foreground">
            Self-paced and instructor-led programs with lessons, assignments, quizzes and a certificate of completion.
          </p>
        </div>

        {courses === null ? (
          <div className="mt-10 text-muted-foreground">Loading courses…</div>
        ) : courses.length === 0 ? (
          <div className="mt-10 text-muted-foreground">No courses available yet.</div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <Link
                key={c.id}
                to="/catalog/$slug"
                params={{ slug: c.slug }}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:border-accent/60 hover:shadow-lg"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent">{c.category}</span>
                  {c.level && <span className="text-muted-foreground">· {c.level}</span>}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug group-hover:text-accent">
                  {c.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{c.summary}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{c.duration_weeks} weeks</span>
                  <span className="inline-flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />Self-paced</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
