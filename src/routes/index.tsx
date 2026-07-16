import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { fetchAllProjects, type Project } from "@/lib/project-service";


export const Route = createFileRoute("/")({
  loader: (): Promise<Project[]> => fetchAllProjects(),
  component: Index,
});


const processSteps = [
  { label: "Проблема", detail: "Идентификация боли" },
  { label: "Контекст", detail: "Сбор условий" },
  { label: "Пользователь", detail: "Эмпатия и CJM" },
  { label: "Бизнес", detail: "Метрики и цели" },
  { label: "Разработка", detail: "Тех-ограничения" },
  { label: "Компромисс", detail: "Оптимальный путь" },
  { label: "Решение", detail: "Прототип и UI" },
  { label: "Релиз", detail: "Запуск в продакшн" },
  { label: "Развитие", detail: "Анализ и итерация" },
];

const roles = [
  { title: "Product Designer", note: "Проектирую опыт целиком — от идеи до релиза." },
  { title: "UX Designer", note: "Работаю со сценариями, а не с экранами." },
  { title: "Product Manager", note: "Формулирую требования и веду фичи в продакшн." },
  { title: "UX Writer", note: "Слово в интерфейсе — тоже часть решения." },
];


function Index() {
  const projects = Route.useLoaderData() as Project[];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground selection:bg-accent-pink/30">
      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="animate-float-slow absolute -left-[10%] -top-[10%] h-[60%] w-[60%] rounded-full bg-accent-pink/20 blur-[120px]" />
        <div className="animate-float-slow absolute -bottom-[10%] -right-[10%] h-[50%] w-[50%] rounded-full bg-accent-blue/20 blur-[120px] [animation-delay:-5s]" />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-glass-border backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 sm:flex sm:justify-between">
          <div className="min-w-0 leading-tight">
            <div className="font-display text-sm font-bold uppercase tracking-[0.25em] text-foreground">
              Алена Гаврилова
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Product Design & Strategy
            </div>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium opacity-80 md:flex">
            <a href="#philosophy" className="transition-colors hover:text-accent-pink">Мышление</a>
            <a href="#process" className="transition-colors hover:text-accent-pink">Процесс</a>
            <a href="#projects" className="transition-colors hover:text-accent-pink">Проекты</a>
            <a href="#contact" className="transition-colors hover:text-accent-pink">Контакты</a>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="tel:+79002121111"
              aria-label="Позвонить +7 900 212 11 11"
              title="+7 900 212 11 11"
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-glass-border text-foreground transition-colors hover:bg-accent-pink/10 hover:text-accent-pink"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
            <a
              href="https://t.me/GavrilovaAY"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram @GavrilovaAY"
              title="@GavrilovaAY"
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-glass-border text-foreground transition-colors hover:bg-accent-blue/10 hover:text-accent-blue"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M21.05 3.05 2.6 10.2c-1.26.49-1.25 1.19-.23 1.5l4.73 1.48 10.94-6.9c.52-.32.99-.15.6.2l-8.86 8 -.33 4.86c.49 0 .7-.22.97-.48l2.33-2.27 4.83 3.57c.89.49 1.53.24 1.75-.82L21.9 4.29c.32-1.31-.5-1.9-1.35-1.55z" />
              </svg>
            </a>
            <a
              href="mailto:alenakudrs@gmail.com"
              aria-label="Написать на alenakudrs@gmail.com"
              title="alenakudrs@gmail.com"
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-glass-border text-foreground transition-colors hover:bg-accent-pink/10 hover:text-accent-pink"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-32">
          <div className="animate-reveal">
            <h2 className="mb-6 font-mono text-sm uppercase tracking-[0.3em] text-accent-pink">
              Product Designer & Manager
            </h2>
            <h1 className="mb-12 font-display text-5xl font-bold leading-[0.95] tracking-tighter text-balance md:text-7xl lg:text-[7.5rem]">
              За каждым{" "}
              <span className="bg-gradient-to-r from-accent-pink to-accent-blue bg-clip-text text-transparent">
                интерфейсом
              </span>{" "}
              стоит решение
            </h1>
            <p className="max-w-2xl text-pretty text-xl font-light leading-relaxed text-muted md:text-2xl">
              Это не портфолио в привычном понимании. Это цифровой продукт, который сам
              демонстрирует подход к проектированию — через мышление, а не через красивые экраны.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section
          id="philosophy"
          className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 px-6 py-32 md:grid-cols-2"
        >
          <div className="md:sticky md:top-32">
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-accent-pink">
              01 — Философия
            </span>
            <h3 className="mb-8 font-display text-4xl font-bold leading-tight md:text-5xl">
              Интерфейс — <br />
              лишь инструмент
            </h3>
            <div className="space-y-6 text-lg leading-relaxed text-muted">
              <p>
                Главная задача — решить проблему пользователя, соблюдая баланс между бизнесом и
                реальными ограничениями разработки.
              </p>
              <p>
                Работа начинается не с Figma. Она начинается с вопросов. Почему существует эта
                проблема? Что действительно нужно пользователю? Какое решение будет работать не
                только сегодня, но и завтра?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {roles.map((role, i) => (
              <div
                key={role.title}
                className="rounded-3xl bg-foreground/5 p-8 ring-1 ring-glass-border backdrop-blur-xl"
              >
                <span
                  className={`mb-4 block font-mono text-xs uppercase ${
                    i % 2 === 0 ? "text-accent-blue" : "text-accent-pink"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} / Роль
                </span>
                <h4 className="mb-3 font-display text-2xl font-medium">{role.title}</h4>
                <p className="text-muted">{role.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section
          id="process"
          className="border-y border-glass-border bg-foreground/[0.02] px-6 py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 max-w-2xl">
              <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-accent-pink">
                02 — Путь решения
              </span>
              <h3 className="mb-4 font-display text-4xl font-bold md:text-5xl">
                Каждая задача проходит одинаковый маршрут
              </h3>
              <p className="text-lg text-muted">
                От проблемы до релиза и дальнейшего развития. Не линейка шагов, а способ думать.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-9">
              {processSteps.map((step, i) => {
                const opacity = Math.min(30 + i * 9, 100) / 100;
                const isLast = i === processSteps.length - 1;
                return (
                  <div
                    key={step.label}
                    className="animate-reveal flex flex-col gap-4"
                    style={{ animationDelay: `${100 + i * 50}ms` }}
                  >
                    <div
                      className="h-1 w-full bg-accent-pink"
                      style={{
                        opacity,
                        boxShadow: isLast ? "0 0 15px rgba(236,72,153,0.5)" : undefined,
                      }}
                    />
                    <span className="font-mono text-[10px] uppercase text-accent-pink">
                      0{i + 1} · {step.label}
                    </span>
                    <span className="text-sm font-medium leading-snug">{step.detail}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-7xl px-6 py-32">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-accent-pink">
                03 — Кейсы
              </span>
              <h3 className="font-display text-4xl font-bold md:text-5xl">Кейсы как образ мысли</h3>
            </div>
            <p className="max-w-sm text-muted">
              Проекты выбраны не потому что самые красивые — каждый показывает отдельный тип
              продуктового мышления.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const toneClass =
                p.tone === "blue"
                  ? "bg-accent-blue/10 text-accent-blue"
                  : p.tone === "pink"
                    ? "bg-accent-pink/10 text-accent-pink"
                    : "bg-white/10 text-foreground";
              const glow =
                p.tone === "blue"
                  ? "hover:shadow-[0_0_40px_rgba(100,140,255,0.15)]"
                  : p.tone === "pink"
                    ? "hover:shadow-[0_0_40px_rgba(255,100,200,0.15)]"
                    : "hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]";
              const gradient =
                p.tone === "blue"
                  ? "from-accent-blue/30 to-accent-blue/0"
                  : p.tone === "pink"
                    ? "from-accent-pink/30 to-accent-pink/0"
                    : "from-white/20 to-white/0";
              return (
                <Link
                  key={p.slug}
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className={`group relative block rounded-[2rem] bg-glass-border p-px transition-all ${glow}`}
                >
                  <div className="flex h-full flex-col rounded-[1.9rem] bg-background/80 p-8 backdrop-blur-3xl">
                    <div className="mb-6 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${toneClass}`}
                      >
                        {p.tag}
                      </span>
                      <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                        {p.subtag}
                      </span>
                    </div>

                    <h4 className="mb-6 font-display text-2xl font-bold leading-tight transition-colors group-hover:text-accent-pink">
                      {p.title}
                    </h4>

                    <div className="mb-6 space-y-4 text-sm leading-relaxed">
                      <div>
                        <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                          Проблема
                        </div>
                        <p className="text-foreground/85">{p.problem}</p>
                      </div>
                      <div>
                        <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                          Решение
                        </div>
                        <p className="text-muted">{p.solution}</p>
                      </div>
                    </div>

                    <div
                      className={`mt-auto grid aspect-[16/9] w-full place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} ring-1 ring-glass-border`}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                        Открыть кейс →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Placeholder for 30+ more cases */}
            <div className="group relative flex min-h-[280px] items-center justify-center rounded-[2rem] border border-dashed border-glass-border bg-foreground/[0.02] p-10 text-center backdrop-blur-3xl">
              <p className="font-display text-2xl font-light leading-snug text-muted md:text-3xl">
                …и ещё{" "}
                <span className="bg-gradient-to-r from-accent-pink to-accent-blue bg-clip-text font-semibold text-transparent">
                  30+ продуктовых задач
                </span>{" "}
                от идеи до релиза
              </p>
            </div>
          </div>
        </section>


        {/* Closing */}
        <section id="contact" className="animate-reveal mx-auto max-w-4xl px-6 py-40 text-center">
          <span className="mb-6 block font-mono text-xs uppercase tracking-[0.3em] text-accent-pink">
            04 — Дальше
          </span>
          <h2 className="mb-8 font-display text-5xl font-bold tracking-tight text-balance md:text-7xl">
            Обсудим сложную <br />
            <span className="bg-gradient-to-r from-accent-pink to-accent-blue bg-clip-text text-transparent">
              продуктовую задачу?
            </span>
          </h2>
          <p className="mb-12 text-xl text-muted">
            Мыслю системно, работаю в компромиссах и довожу решения до работающего продукта.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="https://t.me/"
              className="rounded-full bg-accent-pink px-8 py-4 font-bold text-white shadow-lg shadow-accent-pink/20 transition-transform hover:scale-105"
            >
              Написать в Telegram
            </a>
            <a
              href="mailto:hello@example.com"
              className="rounded-full px-8 py-4 font-bold ring-1 ring-glass-border transition-colors hover:bg-white/5"
            >
              Написать на почту
            </a>
          </div>
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
