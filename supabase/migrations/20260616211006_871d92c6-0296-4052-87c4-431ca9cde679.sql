
DROP POLICY "Teacher grades submissions" ON public.submissions;
CREATE POLICY "Teacher grades submissions" ON public.submissions FOR UPDATE TO authenticated
USING (
  public.has_role(auth.uid(),'admin') OR EXISTS (
    SELECT 1 FROM public.assignments a WHERE a.id = assignment_id AND public.is_course_owner(a.course_id, auth.uid())
  )
)
WITH CHECK (
  public.has_role(auth.uid(),'admin') OR EXISTS (
    SELECT 1 FROM public.assignments a WHERE a.id = assignment_id AND public.is_course_owner(a.course_id, auth.uid())
  )
);
