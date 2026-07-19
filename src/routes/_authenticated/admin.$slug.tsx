import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchProject, saveProject, uploadProjectImage, type Project } from "@/lib/project-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/admin/$slug")({
  component: AdminEdit,
});

function AdminEdit() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    fetchProject(slug).then((p) => setProject(p ?? null));
  }, [slug]);

  if (!project) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-muted">
        Загрузка…
      </div>
    );
  }

  function update<K extends keyof Project>(key: K, value: Project[K]) {
    setProject((p) => (p ? { ...p, [key]: value } : p));
  }

  function updateMockup<K extends keyof Project["mockup"]>(key: K, value: Project["mockup"][K]) {
    setProject((p) => (p ? { ...p, mockup: { ...p.mockup, [key]: value } } : p));
  }

  async function handleImageUpload(field: "beforeImage" | "afterImage" | "image", file: File) {
    try {
      const url = await uploadProjectImage(file);
      updateMockup(field, url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    }
  }

  async function handleSave() {
    if (!project) return;
    setSaving(true);
    setError(null);
    setOk(false);
    try {
      await saveProject(project);
      setOk(true);
      setTimeout(() => setOk(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  const p = project;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-glass-border bg-background/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-xs text-muted hover:text-foreground">
              ← К списку
            </Link>
            <div>
              <div className="font-display text-sm font-semibold">{p.title}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {p.slug}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {ok && <span className="text-xs text-green-400">Сохранено ✓</span>}
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "..." : "Сохранить"}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-10 px-6 py-10">
        {error && (
          <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Basic fields */}
        <Section title="Заголовки и описание">
          <Field label="Заголовок">
            <Input value={p.title} onChange={(e) => update("title", e.target.value)} />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Тег (например, Redesign)">
              <Input value={p.tag} onChange={(e) => update("tag", e.target.value)} />
            </Field>
            <Field label="Подтег">
              <Input value={p.subtag} onChange={(e) => update("subtag", e.target.value)} />
            </Field>
            <Field label="Год">
              <Input value={p.year} onChange={(e) => update("year", e.target.value)} />
            </Field>
          </div>
          <Field label="Тон акцента">
            <select
              value={p.tone}
              onChange={(e) => update("tone", e.target.value as Project["tone"])}
              className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm"
            >
              <option value="pink">Розовый</option>
              <option value="blue">Синий</option>
              <option value="white">Белый</option>
            </select>
          </Field>
          <Field label="Проблема (лид на странице)">
            <Textarea rows={3} value={p.problem} onChange={(e) => update("problem", e.target.value)} />
          </Field>
          <Field label="Краткое решение (на карточке)">
            <Textarea rows={2} value={p.solution} onChange={(e) => update("solution", e.target.value)} />
          </Field>
          <Field label="Контекст (02 — Контекст)">
            <Textarea rows={5} value={p.context} onChange={(e) => update("context", e.target.value)} />
          </Field>
        </Section>

        {/* Approach */}
        <ArraySection<string>
          title="Как принимала решения (03 — Подход)"
          items={p.approach}
          onChange={(next) => update("approach", next)}
          empty=""
          render={(v, onChange) => (
            <Textarea rows={2} value={v} onChange={(e) => onChange(e.target.value)} />
          )}
        />

        {/* Solution points */}
        <ArraySection
          title="Что сделала (04 — Решение)"
          items={p.solutionPoints}
          onChange={(next) => update("solutionPoints", next)}
          empty={{ title: "", description: "" }}
          render={(v, onChange) => (
            <div className="space-y-2">
              <Input
                placeholder="Заголовок"
                value={v.title}
                onChange={(e) => onChange({ ...v, title: e.target.value })}
              />
              <Textarea
                rows={2}
                placeholder="Описание"
                value={v.description}
                onChange={(e) => onChange({ ...v, description: e.target.value })}
              />
            </div>
          )}
        />

        {/* Mockup */}
        <Section title="Ключевые моменты — мокап">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Устройство">
              <select
                value={p.mockup.device}
                onChange={(e) => updateMockup("device", e.target.value as Project["mockup"]["device"])}
                className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm"
              >
                <option value="mobile">Телефон</option>
                <option value="desktop">Десктоп</option>
              </select>
            </Field>
            <Field label="Формат">
              <select
                value={p.mockup.beforeAfter ? "ba" : "single"}
                onChange={(e) => updateMockup("beforeAfter", e.target.value === "ba")}
                className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm"
              >
                <option value="single">Один экран</option>
                <option value="ba">Было / Стало</option>
              </select>
            </Field>
          </div>

          {p.mockup.beforeAfter ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Подпись «Было»">
                  <Input
                    value={p.mockup.beforeLabel ?? "Было"}
                    onChange={(e) => updateMockup("beforeLabel", e.target.value)}
                  />
                </Field>
                <Field label="Подпись «Стало»">
                  <Input
                    value={p.mockup.afterLabel ?? "Стало"}
                    onChange={(e) => updateMockup("afterLabel", e.target.value)}
                  />
                </Field>
              </div>
              <ImageField
                label="Изображение «Было»"
                url={p.mockup.beforeImage}
                onUpload={(f) => handleImageUpload("beforeImage", f)}
                onClear={() => updateMockup("beforeImage", undefined)}
              />
              <ImageField
                label="Изображение «Стало»"
                url={p.mockup.afterImage}
                onUpload={(f) => handleImageUpload("afterImage", f)}
                onClear={() => updateMockup("afterImage", undefined)}
              />
            </>
          ) : (
            <ImageField
              label="Изображение мокапа"
              url={p.mockup.image}
              onUpload={(f) => handleImageUpload("image", f)}
              onClear={() => updateMockup("image", undefined)}
            />
          )}
        </Section>

        {/* Changes */}
        <ArraySection
          title="Ключевые изменения"
          items={p.mockup.changes}
          onChange={(next) => updateMockup("changes", next)}
          empty={{ label: "", note: "" }}
          render={(v, onChange) => (
            <div className="space-y-2">
              <Input
                placeholder="Название"
                value={v.label}
                onChange={(e) => onChange({ ...v, label: e.target.value })}
              />
              <Textarea
                rows={2}
                placeholder="Пояснение"
                value={v.note}
                onChange={(e) => onChange({ ...v, note: e.target.value })}
              />
            </div>
          )}
        />

        {/* Principle */}
        <Section title="Принцип, который я забрала с собой (05)">
          <Textarea rows={4} value={p.principle} onChange={(e) => update("principle", e.target.value)} />
        </Section>

        <div className="sticky bottom-4 flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saving ? "..." : "Сохранить кейс"}
          </Button>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-glass-border bg-foreground/5 p-6">
      <h2 className="mb-4 font-display text-lg font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted">{label}</Label>
      {children}
    </div>
  );
}

function ArraySection<T>({
  title,
  items,
  onChange,
  render,
  empty,
}: {
  title: string;
  items: T[];
  onChange: (next: T[]) => void;
  render: (v: T, set: (v: T) => void) => React.ReactNode;
  empty: T;
}) {
  return (
    <section className="rounded-2xl border border-glass-border bg-foreground/5 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onChange([...items, structuredClone(empty)])}
        >
          + Добавить
        </Button>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-xl border border-glass-border bg-background/40 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => {
                    const next = [...items];
                    [next[i - 1], next[i]] = [next[i], next[i - 1]];
                    onChange(next);
                  }}
                  className="rounded px-2 py-0.5 text-xs text-muted hover:text-foreground disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={i === items.length - 1}
                  onClick={() => {
                    const next = [...items];
                    [next[i + 1], next[i]] = [next[i], next[i + 1]];
                    onChange(next);
                  }}
                  className="rounded px-2 py-0.5 text-xs text-muted hover:text-foreground disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!confirm("Удалить?")) return;
                    onChange(items.filter((_, idx) => idx !== i));
                  }}
                  className="rounded px-2 py-0.5 text-xs text-red-400 hover:text-red-300"
                >
                  Удалить
                </button>
              </div>
            </div>
            {render(item, (v) => {
              const next = [...items];
              next[i] = v;
              onChange(next);
            })}
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted">Пусто. Нажмите «+ Добавить», чтобы создать элемент.</p>
        )}
      </div>
    </section>
  );
}

function ImageField({
  label,
  url,
  onUpload,
  onClear,
}: {
  label: string;
  url?: string;
  onUpload: (file: File) => void;
  onClear: () => void;
}) {
  return (
    <Field label={label}>
      <div className="flex items-start gap-3">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-glass-border bg-background/40">
          {url ? (
            <img src={url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-[10px] text-muted">
              Нет
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUpload(f);
              e.target.value = "";
            }}
            className="block w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-foreground file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-background"
          />
          {url && (
            <div className="flex items-center gap-2">
              <Input value={url} readOnly className="text-xs" />
              <Button type="button" size="sm" variant="outline" onClick={onClear}>
                Убрать
              </Button>
            </div>
          )}
        </div>
      </div>
    </Field>
  );
}
