import { supabase } from "@/integrations/supabase/client";

export type CourseRow = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  category: string | null;
  level: string | null;
  duration_weeks: number | null;
  price: number | null;
};

export async function listCourses() {
  const { data, error } = await supabase
    .from("courses")
    .select("id,slug,title,summary,category,level,duration_weeks,price")
    .eq("is_published", true)
    .order("title");
  if (error) throw error;
  return data as CourseRow[];
}

export async function getCourseBySlug(slug: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}
