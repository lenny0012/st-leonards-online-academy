
CREATE TYPE public.meeting_provider AS ENUM ('zoom', 'meet');

CREATE TABLE public.live_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  provider public.meeting_provider NOT NULL DEFAULT 'zoom',
  join_url TEXT NOT NULL,
  meeting_id TEXT,
  passcode TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX live_classes_course_starts_idx ON public.live_classes(course_id, starts_at);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.live_classes TO authenticated;
GRANT ALL ON public.live_classes TO service_role;

ALTER TABLE public.live_classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enrolled students can view course live classes"
ON public.live_classes FOR SELECT TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.enrollments e WHERE e.course_id = live_classes.course_id AND e.user_id = auth.uid())
  OR public.is_course_owner(course_id, auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Course owners and admins can insert live classes"
ON public.live_classes FOR INSERT TO authenticated
WITH CHECK (
  (public.is_course_owner(course_id, auth.uid()) OR public.has_role(auth.uid(), 'admin'))
  AND host_id = auth.uid()
);

CREATE POLICY "Course owners and admins can update live classes"
ON public.live_classes FOR UPDATE TO authenticated
USING (public.is_course_owner(course_id, auth.uid()) OR public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.is_course_owner(course_id, auth.uid()) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Course owners and admins can delete live classes"
ON public.live_classes FOR DELETE TO authenticated
USING (public.is_course_owner(course_id, auth.uid()) OR public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER live_classes_updated_at
BEFORE UPDATE ON public.live_classes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
