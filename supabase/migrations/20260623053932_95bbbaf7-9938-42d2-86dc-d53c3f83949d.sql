
DROP POLICY IF EXISTS "Lessons viewable" ON public.lessons;
CREATE POLICY "Lessons viewable by enrolled" ON public.lessons FOR SELECT TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.enrollments e WHERE e.course_id = lessons.course_id AND e.user_id = auth.uid())
  OR public.is_course_owner(course_id, auth.uid())
  OR public.has_role(auth.uid(), 'admin'::app_role)
);

DROP POLICY IF EXISTS "Resources viewable" ON public.resources;
CREATE POLICY "Resources viewable by enrolled" ON public.resources FOR SELECT TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.enrollments e WHERE e.course_id = resources.course_id AND e.user_id = auth.uid())
  OR public.is_course_owner(course_id, auth.uid())
  OR public.has_role(auth.uid(), 'admin'::app_role)
);

DROP POLICY IF EXISTS "Quizzes viewable" ON public.quizzes;
CREATE POLICY "Quizzes viewable by enrolled" ON public.quizzes FOR SELECT TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.enrollments e WHERE e.course_id = quizzes.course_id AND e.user_id = auth.uid())
  OR public.is_course_owner(course_id, auth.uid())
  OR public.has_role(auth.uid(), 'admin'::app_role)
);

DROP POLICY IF EXISTS "User issues own certificate" ON public.certificates;
CREATE POLICY "User issues earned certificate" ON public.certificates FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND (
    EXISTS (
      SELECT 1 FROM public.enrollments e
      WHERE e.user_id = auth.uid()
        AND e.course_id = certificates.course_id
        AND e.completed_at IS NOT NULL
    )
    OR public.is_course_owner(course_id, auth.uid())
    OR public.has_role(auth.uid(), 'admin'::app_role)
  )
);

DROP POLICY IF EXISTS "User enrolls self" ON public.enrollments;
CREATE POLICY "User enrolls self in free course" ON public.enrollments FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM public.courses c
    WHERE c.id = enrollments.course_id
      AND COALESCE(c.price, 0) = 0
  )
);

CREATE POLICY "Owners and admins can enroll users" ON public.enrollments FOR INSERT TO authenticated
WITH CHECK (
  public.is_course_owner(course_id, auth.uid())
  OR public.has_role(auth.uid(), 'admin'::app_role)
);
