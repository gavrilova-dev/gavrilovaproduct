import { supabase } from "@/integrations/supabase/client";
import { projects as staticProjects, type Project } from "./projects";

export type { Project } from "./projects";

const STATIC_ORDER = new Map(staticProjects.map((p, i) => [p.slug, i]));

export async function fetchAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("slug, sort_order, data");
  if (error) {
    console.error("fetchAllProjects error", error);
    return staticProjects;
  }
  const overrides = new Map<string, { data: Project; sort_order: number }>();
  for (const row of data ?? []) {
    overrides.set(row.slug, {
      data: row.data as unknown as Project,
      sort_order: row.sort_order ?? 0,
    });
  }
  const merged: Project[] = staticProjects.map((p) => overrides.get(p.slug)?.data ?? p);
  // Include DB-only projects that don't exist in static seed
  for (const [slug, row] of overrides) {
    if (!STATIC_ORDER.has(slug)) merged.push(row.data);
  }
  // Sort: DB sort_order overrides static index; unknown -> keep static order
  merged.sort((a, b) => {
    const sa = overrides.get(a.slug)?.sort_order ?? STATIC_ORDER.get(a.slug) ?? 999;
    const sb = overrides.get(b.slug)?.sort_order ?? STATIC_ORDER.get(b.slug) ?? 999;
    return sa - sb;
  });
  return merged;
}

export async function fetchProject(slug: string): Promise<Project | undefined> {
  const all = await fetchAllProjects();
  return all.find((p) => p.slug === slug);
}

export async function saveProject(project: Project): Promise<void> {
  const sort_order = STATIC_ORDER.get(project.slug) ?? 100;
  const { error } = await supabase
    .from("projects")
    .upsert(
      { slug: project.slug, data: project as unknown as Record<string, unknown>, sort_order },
      { onConflict: "slug" },
    );
  if (error) throw error;
}

export async function resetProject(slug: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("slug", slug);
  if (error) throw error;
}

export async function uploadProjectImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "png";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("project-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from("project-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function isCurrentUserAdmin(userId: string | null): Promise<boolean> {
  if (!userId) return false;
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) return false;
  return !!data;
}

export async function claimAdminIfEmpty(): Promise<boolean> {
  const { data, error } = await supabase.rpc("claim_admin_if_empty");
  if (error) {
    console.error("claim_admin_if_empty", error);
    return false;
  }
  return !!data;
}
