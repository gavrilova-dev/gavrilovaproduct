UPDATE public.projects
SET data = jsonb_set(
  data,
  '{mockup,image}',
  '"https://ivdoacvowuwuoccdxuyt.supabase.co/storage/v1/object/public/project-images/design-system-uikit-v2.png"'::jsonb
)
WHERE slug = 'design-system';