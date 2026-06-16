import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Circle, Award, FileText, HelpCircle, Link2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/learn/$slug")({
  component: LearnPage,
});

type Lesson = { id: string; position: number; title: string; content: string | null; duration_min: number | null };
type Assignment = { id: string; title: string; description: string | null; max_points: number | null };
type Submission = { id: string; content: string | null; grade: number | null; feedback: string | null };
type QuizQ = { q: string; options: string[]; answer: number };
type Quiz = { id: string; title: string; passing_score: number; questions: QuizQ[] };
type Resource = { id: string; title: string; description: string | null; url: string; kind: string };

function LearnPage() {
  const { slug } = useParams({ from: "/_authenticated/learn/$slug" });
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<{ id: string; title: string } | null>(null);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [submissionText, setSubmissionText] = useState("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizResult, setQuizResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [certificate, setCertificate] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: c } = await supabase.from("courses").select("id,title").eq("slug", slug).maybeSingle();
      if (!c) return;
      setCourse(c);
      const { data: e } = await supabase.from("enrollments").select("id").eq("user_id", user.id).eq("course_id", c.id).maybeSingle();
      if (!e) { navigate({ to: "/catalog/$slug", params: { slug } }); return; }
      setEnrollmentId(e.id);

      const [{ data: ls }, { data: lp }, { data: a }, { data: q }, { data: r }, { data: cert }] = await Promise.all([
        supabase.from("lessons").select("id,position,title,content,duration_min").eq("course_id", c.id).order("position"),
        supabase.from("lesson_progress").select("lesson_id").eq("enrollment_id", e.id),
        supabase.from("assignments").select("id,title,description,max_points").eq("course_id", c.id).maybeSingle(),
        supabase.from("quizzes").select("id,title,passing_score,questions").eq("course_id", c.id).maybeSingle(),
        supabase.from("resources").select("id,title,description,url,kind").eq("course_id", c.id),
        supabase.from("certificates").select("certificate_number").eq("user_id", user.id).eq("course_id", c.id).maybeSingle(),
      ]);
      setLessons(ls ?? []);
      setCompleted(new Set((lp ?? []).map((x) => x.lesson_id)));
      setActiveLessonId(ls?.[0]?.id ?? null);
      if (a) setAssignment(a);
      if (q) setQuiz(q as unknown as Quiz);
      setResources(r ?? []);
      if (cert) setCertificate(cert.certificate_number);
      if (a) {
        const { data: sub } = await supabase.from("submissions").select("id,content,grade,feedback").eq("assignment_id", a.id).eq("user_id", user.id).maybeSingle();
        if (sub) { setSubmission(sub); setSubmissionText(sub.content ?? ""); }
      }
    })();
  }, [slug, user, navigate]);

  const progress = lessons.length ? Math.round((completed.size / lessons.length) * 100) : 0;
  const activeLesson = lessons.find((l) => l.id === activeLessonId) ?? null;

  async function toggleLesson(lessonId: string) {
    if (!enrollmentId) return;
    if (completed.has(lessonId)) {
      await supabase.from("lesson_progress").delete().eq("enrollment_id", enrollmentId).eq("lesson_id", lessonId);
      const next = new Set(completed); next.delete(lessonId); setCompleted(next);
    } else {
      await supabase.from("lesson_progress").insert({ enrollment_id: enrollmentId, lesson_id: lessonId });
      const next = new Set(completed); next.add(lessonId); setCompleted(next);
    }
    const newPct = lessons.length ? Math.round(((completed.has(lessonId) ? completed.size - 1 : completed.size + 1) / lessons.length) * 100) : 0;
    await supabase.from("enrollments").update({ progress_percent: newPct }).eq("id", enrollmentId);
  }

  async function submitAssignment() {
    if (!assignment || !user) return;
    if (submissionText.trim().length < 20) return toast.error("Write at least 20 characters.");
    const { data, error } = await supabase.from("submissions").upsert({
      assignment_id: assignment.id, user_id: user.id, content: submissionText,
    }, { onConflict: "assignment_id,user_id" }).select("*").single();
    if (error) return toast.error(error.message);
    setSubmission(data as Submission);
    toast.success("Submitted! Your instructor will grade soon.");
  }

  async function submitQuiz() {
    if (!quiz || !user) return;
    const correct = quiz.questions.reduce((n, q, i) => n + (quizAnswers[i] === q.answer ? 1 : 0), 0);
    const score = Math.round((correct / quiz.questions.length) * 100);
    const passed = score >= quiz.passing_score;
    await supabase.from("quiz_attempts").insert({ quiz_id: quiz.id, user_id: user.id, answers: quizAnswers, score, passed });
    setQuizResult({ score, passed });
    toast[passed ? "success" : "error"](`You scored ${score}%`);
  }

  async function claimCertificate() {
    if (!course || !user) return;
    if (progress < 100) return toast.error("Complete all lessons first.");
    if (!quizResult?.passed) return toast.error("Pass the quiz to claim your certificate.");
    const { data, error } = await supabase.from("certificates").insert({ user_id: user.id, course_id: course.id }).select("certificate_number").single();
    if (error) return toast.error(error.message);
    setCertificate(data.certificate_number);
    await supabase.from("enrollments").update({ completed_at: new Date().toISOString() }).eq("id", enrollmentId!);
    toast.success("Certificate issued!");
  }

  if (!course) return <div className="container-x py-16 text-muted-foreground">Loading…</div>;

  return (
    <section className="py-8 md:py-12">
      <div className="container-x">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent">Now learning</p>
            <h1 className="mt-1 font-display text-2xl md:text-3xl font-semibold">{course.title}</h1>
          </div>
          <div className="min-w-[200px]">
            <div className="mb-1 flex justify-between text-xs text-muted-foreground">
              <span>Progress</span><span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-xl border border-border bg-card p-3">
            <div className="px-2 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Lessons</div>
            <ul className="mt-1 grid gap-0.5">
              {lessons.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => setActiveLessonId(l.id)}
                    className={`flex w-full items-start gap-2 rounded-md px-2 py-2 text-left text-sm transition hover:bg-secondary ${activeLessonId === l.id ? "bg-secondary" : ""}`}
                  >
                    {completed.has(l.id) ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}
                    <span className="flex-1">{l.position}. {l.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div>
            <Tabs defaultValue="lesson">
              <TabsList>
                <TabsTrigger value="lesson">Lesson</TabsTrigger>
                <TabsTrigger value="assignment"><FileText className="mr-1 h-3.5 w-3.5" />Assignment</TabsTrigger>
                <TabsTrigger value="quiz"><HelpCircle className="mr-1 h-3.5 w-3.5" />Quiz</TabsTrigger>
                <TabsTrigger value="resources"><Link2 className="mr-1 h-3.5 w-3.5" />Resources</TabsTrigger>
                <TabsTrigger value="certificate"><Award className="mr-1 h-3.5 w-3.5" />Certificate</TabsTrigger>
              </TabsList>

              <TabsContent value="lesson" className="mt-4">
                {activeLesson ? (
                  <article className="rounded-xl border border-border bg-card p-6">
                    <h2 className="font-display text-xl font-semibold">{activeLesson.title}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">{activeLesson.duration_min} min · Lesson {activeLesson.position} of {lessons.length}</p>
                    <p className="mt-4 whitespace-pre-line leading-relaxed text-foreground/90">{activeLesson.content}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Button onClick={() => toggleLesson(activeLesson.id)} variant={completed.has(activeLesson.id) ? "outline" : "navy"}>
                        {completed.has(activeLesson.id) ? "Mark incomplete" : "Mark as complete"}
                      </Button>
                      {(() => {
                        const idx = lessons.findIndex((l) => l.id === activeLesson.id);
                        const next = lessons[idx + 1];
                        return next ? <Button variant="outline" onClick={() => setActiveLessonId(next.id)}>Next lesson →</Button> : null;
                      })()}
                    </div>
                  </article>
                ) : <p className="text-muted-foreground">No lessons.</p>}
              </TabsContent>

              <TabsContent value="assignment" className="mt-4">
                {assignment ? (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h2 className="font-display text-xl font-semibold">{assignment.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{assignment.description}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Max points: {assignment.max_points}</p>
                    <Textarea
                      className="mt-4 min-h-[160px]"
                      placeholder="Type your submission here…"
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                    />
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <Button onClick={submitAssignment} variant="navy">{submission ? "Update submission" : "Submit"}</Button>
                      {submission?.grade != null && <span className="text-sm">Grade: <strong>{submission.grade}/{assignment.max_points}</strong></span>}
                    </div>
                    {submission?.feedback && (
                      <div className="mt-4 rounded-md border border-border bg-secondary/40 p-3 text-sm">
                        <strong>Instructor feedback:</strong> {submission.feedback}
                      </div>
                    )}
                  </div>
                ) : <p className="text-muted-foreground">No assignment for this course.</p>}
              </TabsContent>

              <TabsContent value="quiz" className="mt-4">
                {quiz ? (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h2 className="font-display text-xl font-semibold">{quiz.title}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">Passing score: {quiz.passing_score}%</p>
                    <div className="mt-5 grid gap-5">
                      {quiz.questions.map((q, i) => (
                        <div key={i}>
                          <p className="font-medium">{i + 1}. {q.q}</p>
                          <div className="mt-2 grid gap-1.5">
                            {q.options.map((opt, oi) => (
                              <label key={oi} className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-secondary cursor-pointer">
                                <input type="radio" name={`q-${i}`} checked={quizAnswers[i] === oi} onChange={() => setQuizAnswers({ ...quizAnswers, [i]: oi })} />
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <Button onClick={submitQuiz} variant="navy" disabled={Object.keys(quizAnswers).length < quiz.questions.length}>Submit quiz</Button>
                      {quizResult && (
                        <span className={`text-sm font-medium ${quizResult.passed ? "text-accent" : "text-destructive"}`}>
                          {quizResult.passed ? "✓ Passed" : "✗ Not passed"} — {quizResult.score}%
                        </span>
                      )}
                    </div>
                  </div>
                ) : <p className="text-muted-foreground">No quiz for this course.</p>}
              </TabsContent>

              <TabsContent value="resources" className="mt-4">
                <div className="grid gap-3">
                  {resources.map((r) => (
                    <a key={r.id} href={r.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition hover:border-accent/60">
                      <div>
                        <div className="font-medium">{r.title}</div>
                        {r.description && <div className="text-xs text-muted-foreground">{r.description}</div>}
                      </div>
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent uppercase">{r.kind}</span>
                    </a>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="certificate" className="mt-4">
                <div className="rounded-xl border border-border bg-card p-6 text-center">
                  <Award className="mx-auto h-10 w-10 text-accent" />
                  <h2 className="mt-3 font-display text-xl font-semibold">Certificate of Completion</h2>
                  {certificate ? (
                    <>
                      <p className="mt-2 text-sm text-muted-foreground">Awarded to you for completing <strong>{course.title}</strong>.</p>
                      <p className="mt-1 text-xs text-muted-foreground">Number: {certificate}</p>
                      <Button asChild variant="gold" className="mt-4">
                        <Link to="/verify/$number" params={{ number: certificate }}>View certificate</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="mt-2 text-sm text-muted-foreground">Complete all lessons and pass the quiz to claim your certificate.</p>
                      <p className="mt-1 text-xs text-muted-foreground">Progress: {progress}% · Quiz: {quizResult?.passed ? "passed" : "not passed yet"}</p>
                      <Button onClick={claimCertificate} variant="gold" className="mt-4" disabled={progress < 100 || !quizResult?.passed}>Claim certificate</Button>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
