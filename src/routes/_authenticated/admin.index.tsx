import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllProjects, isCurrentUserAdmin, resetProject } from "@/lib/project-service";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminList,
});

function AdminList() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const uid = data.user?.id ?? null;
      setUserId(uid);
      setIsAdmin(await isCurrentUserAdmin(uid));
    });
  }, []);

  const { data: projects, refetch } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: fetchAllProjects,
  });

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  async function handleReset(slug: string) {
    if (!confirm("Сбросить изменения этого кейса к исходной версии?")) return;
    await resetProject(slug);
    refetch();
  }

  if (isAdmin === false) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-6 text-foreground">
        <div className="max-w-md text-center">
          <h1 className="mb-2 font-display text-2xl font-bold">Нет доступа</h1>
          <p className="mb-6 text-sm text-muted">
            У этого аккаунта нет прав администратора. Обратитесь к владельцу сайта.
          </p>
          <div className="flex justify-center gap-2">
            <Button onClick={handleSignOut} variant="outline">
              Выйти
            </Button>
            <Link
              to="/"
              className="rounded-md border px-4 py-2 text-sm hover:bg-white/5"
            >
              На главную
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted">User ID: {userId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-glass-border px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <div className="font-display text-sm font-bold uppercase tracking-[0.2em]">Админка</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Кейсы портфолио
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="rounded-md border px-3 py-1.5 text-xs hover:bg-white/5">
              Открыть сайт
            </Link>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              Выйти
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="mb-6 font-display text-3xl font-bold">Все кейсы</h1>
        <div className="grid gap-3">
          {projects?.map((p) => (
            <div
              key={p.slug}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-glass-border bg-foreground/5 px-5 py-4"
            >
              <div className="min-w-0 flex-1">
                <div className="font-display text-lg font-semibold">{p.title}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {p.slug} · {p.tag}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="rounded-md border px-3 py-1.5 text-xs hover:bg-white/5"
                >
                  Просмотр
                </Link>
                <Link
                  to="/admin/$slug"
                  params={{ slug: p.slug }}
                  className="rounded-md bg-foreground px-3 py-1.5 text-xs font-semibold text-background"
                >
                  Редактировать
                </Link>
                <Button variant="outline" size="sm" onClick={() => handleReset(p.slug)}>
                  Сброс
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
