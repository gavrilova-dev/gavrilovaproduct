CREATE OR REPLACE FUNCTION public.current_user_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'::public.app_role
  )
$$;

REVOKE ALL ON FUNCTION public.current_user_is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.current_user_is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.current_user_is_admin() TO service_role;

DROP POLICY IF EXISTS "user_roles_read_self_or_admin" ON public.user_roles;
CREATE POLICY "user_roles_read_self" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "projects_admin_write" ON public.projects;
CREATE POLICY "projects_admin_write" ON public.projects
  FOR ALL TO authenticated
  USING (public.current_user_is_admin())
  WITH CHECK (public.current_user_is_admin());

DROP POLICY IF EXISTS "project_images_admin_insert" ON storage.objects;
DROP POLICY IF EXISTS "project_images_admin_update" ON storage.objects;
DROP POLICY IF EXISTS "project_images_admin_delete" ON storage.objects;

CREATE POLICY "project_images_admin_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'project-images' AND public.current_user_is_admin());

CREATE POLICY "project_images_admin_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'project-images' AND public.current_user_is_admin())
  WITH CHECK (bucket_id = 'project-images' AND public.current_user_is_admin());

CREATE POLICY "project_images_admin_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'project-images' AND public.current_user_is_admin());