import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchAllProjects, fetchProject, type Project } from "@/lib/project-service";


export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }): Promise<{ project: Project; all: Project[] }> => {
    const all = await fetchAllProjects();
    const project = all.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project, all };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Кейс не найден — Алена Гаврилова" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — Кейс` },
        { name: "description", content: project.problem },
        { property: "og:title", content: `${project.title} — Кейс` },
        { property: "og:description", content: project.problem },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Кейс не найден</h1>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2 text-xs font-bold uppercase tracking-widest text-background"
        >
          На главную
        </Link>
      </div>
    </div>
  ),
});

/* ---------- Mockup pieces ---------- */

function ScrollableScreenContent({ label, image }: { label: string; image?: string }) {
  if (image) {
    return (
      <div className="mockup-scroll relative h-full w-full overflow-y-auto bg-white">
        <img src={image} alt={label} className="block w-full h-auto select-none" draggable={false} />
      </div>
    );
  }
  // Placeholder "screen content" — user replaces later. Height > container triggers scroll.
  return (
    <div className="mockup-scroll relative h-full w-full overflow-y-auto">
      <div className="animate-scroll-hint">
        <div className="flex min-h-[180%] flex-col gap-3 p-4">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative flex items-center justify-between">
            <div className="h-2 w-14 rounded-full bg-white/15" />
            <div className="h-2 w-8 rounded-full bg-white/10" />
          </div>
          <div className="relative h-24 rounded-2xl bg-white/[0.06] ring-1 ring-white/10" />
          <div className="relative grid grid-cols-3 gap-2">
            <div className="h-14 rounded-xl bg-white/[0.05] ring-1 ring-white/10" />
            <div className="h-14 rounded-xl bg-white/[0.05] ring-1 ring-white/10" />
            <div className="h-14 rounded-xl bg-white/[0.05] ring-1 ring-white/10" />
          </div>
          <div className="relative h-20 rounded-2xl bg-white/[0.04] ring-1 ring-white/10" />
          <div className="relative h-16 rounded-2xl bg-white/[0.04] ring-1 ring-white/10" />
          <div className="relative h-24 rounded-2xl bg-white/[0.05] ring-1 ring-white/10" />
          <div className="relative h-16 rounded-2xl bg-white/[0.04] ring-1 ring-white/10" />
          <div className="relative flex-1 rounded-2xl bg-white/[0.03] ring-1 ring-white/10" />
          <div className="relative flex items-center justify-center pt-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
              {label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneMockup({ label, image }: { label: string; image?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <div className="relative aspect-[9/19] rounded-[3rem] border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.02] p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="absolute left-1/2 top-3 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-background/90 ring-1 ring-white/10" />
        <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-background via-background/90 to-background ring-1 ring-white/5">
          <ScrollableScreenContent label={label} image={image} />
        </div>
      </div>
    </div>
  );
}

function DesktopMockup({ label, image }: { label: string; image?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <div className="relative aspect-[16/10] rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.02] p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="mb-2 flex items-center gap-1.5 px-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="relative h-[calc(100%-1.75rem)] w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-background/90 to-background ring-1 ring-white/5">
          <ScrollableScreenContent label={label} image={image} />
        </div>
      </div>
      {/* stand */}
      <div className="mx-auto mt-2 h-3 w-32 rounded-b-2xl bg-white/10" />
      <div className="mx-auto h-1 w-48 rounded-full bg-white/5" />
    </div>
  );
}


function Arrow() {
  return (
    <div className="flex items-center justify-center py-4 md:py-0">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-foreground/70 md:rotate-0 rotate-90"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

function ProjectPage() {
  const { project, all } = Route.useLoaderData() as { project: Project; all: Project[] };

  const toneAccent =
    project.tone === "blue"
      ? "text-accent-blue"
      : project.tone === "pink"
        ? "text-accent-pink"
        : "text-foreground";
  const toneGradient =
    project.tone === "blue"
      ? "from-accent-blue/40 via-accent-blue/10 to-transparent"
      : project.tone === "pink"
        ? "from-accent-pink/40 via-accent-pink/10 to-transparent"
        : "from-white/30 via-white/5 to-transparent";
  const toneOrb =
    project.tone === "blue" ? "bg-accent-blue/20" : "bg-accent-pink/20";

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  const Mockup = project.mockup.device === "desktop" ? DesktopMockup : PhoneMockup;
  const isBeforeAfter = project.mockup.beforeAfter;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Aurora */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className={`animate-float-slow absolute -left-[10%] -top-[10%] h-[55%] w-[55%] rounded-full ${toneOrb} blur-[120px]`} />
        <div className="animate-float-slow absolute -bottom-[10%] -right-[10%] h-[45%] w-[45%] rounded-full bg-accent-blue/15 blur-[120px] [animation-delay:-6s]" />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-glass-border backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="min-w-0 leading-tight">
            <div className="font-display text-sm font-bold uppercase tracking-[0.25em] text-foreground">
              Алена Гаврилова
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Product Design & Strategy
            </div>
          </Link>
          <Link
            to="/"
            className="shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest ring-1 ring-glass-border transition-colors hover:bg-white/5"
          >
            ← Все кейсы
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-24">
          <div className="animate-reveal">
            <div className="mb-6 flex flex-wrap gap-2">
              <span className={`rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${toneAccent}`}>
                {project.tag}
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                {project.subtag}
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                {project.year}
              </span>
            </div>
            <h1 className="mb-8 font-display text-5xl font-bold leading-[0.95] tracking-tighter text-balance md:text-7xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-pretty text-xl font-light leading-relaxed text-muted md:text-2xl">
              {project.problem}
            </p>
          </div>
        </section>



        {/* 01 — Ключевые моменты */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <span className="mb-8 block font-mono text-xs uppercase tracking-[0.3em] text-accent-pink">
            01 — Ключевые моменты
          </span>

          <div className="relative">
            <div className={`absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br ${toneGradient} blur-3xl`} />

            <div className="relative rounded-[2.5rem] border border-glass-border bg-background/40 p-8 backdrop-blur-2xl md:p-12">
              {/* Mockup(s) */}
              {isBeforeAfter ? (
                <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                  <div>
                    <div className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      {project.mockup.beforeLabel ?? "Было"}
                    </div>
                    <Mockup label="Место для скрина" image={project.mockup.beforeImage} />
                  </div>
                  <Arrow />
                  <div>
                    <div className={`mb-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] ${toneAccent}`}>
                      {project.mockup.afterLabel ?? "Стало"}
                    </div>
                    <Mockup label="Место для скрина" image={project.mockup.afterImage} />
                  </div>
                </div>
              ) : (
                <Mockup label="Место для скрина" image={project.mockup.image} />
              )}





              {/* Changes list */}
              <div className="mt-12">
                <div className={`mb-6 font-mono text-[10px] uppercase tracking-[0.3em] ${toneAccent}`}>
                  {project.mockup.changesTitle}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.mockup.changes.map((c, i) => (
                    <div
                      key={c.label}
                      className="animate-reveal rounded-2xl border border-white/15 bg-white/[0.06] p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
                      style={{ animationDelay: `${100 + i * 80}ms` }}
                    >
                      <div className={`mb-2 font-mono text-[10px] uppercase tracking-widest ${toneAccent}`}>
                        0{i + 1}
                      </div>
                      <div className="mb-2 font-display text-base font-semibold">{c.label}</div>
                      <p className="text-xs leading-relaxed text-muted">{c.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Контекст */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 px-6 py-24 md:grid-cols-2">
          <div className="md:sticky md:top-32">
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-accent-pink">
              02 — Контекст
            </span>
            <h2 className="mb-6 font-display text-3xl font-bold leading-tight md:text-4xl">
              С чего всё началось
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-muted">{project.context}</p>
        </section>

        {/* 03 — Подход */}
        <section className="border-y border-glass-border bg-foreground/[0.02] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-2xl">
              <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-accent-pink">
                03 — Подход
              </span>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                Как принимала решения
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {project.approach.map((step, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-foreground/5 p-8 ring-1 ring-glass-border backdrop-blur-xl"
                >
                  <div className={`mb-3 font-mono text-[10px] uppercase tracking-widest ${toneAccent}`}>
                    Шаг {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="leading-relaxed text-foreground/90">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — Решение */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-accent-pink">
            04 — Решение
          </span>
          <h2 className="mb-12 font-display text-3xl font-bold leading-tight md:text-4xl">
            Что сделала
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.solutionPoints.map((p, i) => (
              <div
                key={p.title}
                className="animate-reveal rounded-3xl border border-glass-border bg-foreground/5 p-8 backdrop-blur-xl"
                style={{ animationDelay: `${80 + i * 80}ms` }}
              >
                <div className={`mb-3 font-mono text-[10px] uppercase tracking-widest ${toneAccent}`}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold leading-snug">
                  {p.title}
                </h3>
                <p className="leading-relaxed text-muted">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 05 — Принцип */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-glass-border bg-foreground/5 p-10 backdrop-blur-xl md:p-16">
            <div className={`absolute -inset-20 -z-10 bg-gradient-to-br ${toneGradient} opacity-40 blur-3xl`} />
            <span className={`mb-6 block font-mono text-xs uppercase tracking-[0.3em] ${toneAccent}`}>
              05 — Принцип, который я забрала с собой
            </span>
            <p className="max-w-4xl text-pretty font-display text-2xl font-light leading-snug md:text-4xl">
              {project.principle}
            </p>
          </div>
        </section>

        {/* Next case */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group block rounded-[2rem] border border-glass-border bg-foreground/5 p-10 backdrop-blur-xl transition-colors hover:bg-foreground/10"
          >
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Следующий кейс →
            </div>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h3 className="font-display text-3xl font-bold leading-tight transition-colors group-hover:text-accent-pink md:text-4xl">
                {next.title}
              </h3>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {next.tag} · {next.subtag}
              </div>
            </div>
          </Link>
        </section>
      </main>

      <footer className="relative z-10 border-t border-glass-border px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-muted md:flex-row">
          <span>Alena Gavrilova · Product Profile</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
