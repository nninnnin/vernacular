export function PageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-10 py-12 flex flex-col gap-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight mb-1">{title}</h1>
        {description && (
          <p className="text-sm text-zinc-500">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-center min-h-40 gap-3 flex-wrap p-6">
      {children}
    </div>
  );
}
