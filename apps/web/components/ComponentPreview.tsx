export default function ComponentPreview() {
  return (
    <div className="max-w-3xl mx-auto px-10 py-12 flex flex-col gap-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight mb-1">Button</h1>
        <p className="text-sm text-zinc-500">
          클릭하면 동작이나 이벤트를 실행해요.
        </p>
      </div>

      {/* Preview */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          미리보기
        </h2>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-center min-h-40 gap-3">
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors">
            Primary
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 transition-colors">
            Secondary
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-md text-zinc-600 hover:bg-zinc-100 transition-colors">
            Ghost
          </button>
        </div>
      </section>

      {/* Variants */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          변형
        </h2>
        <div className="rounded-xl border border-zinc-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-500">변형</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-zinc-500">미리보기</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {[
                { label: "Primary", el: <button className="px-3 py-1.5 text-xs font-medium rounded bg-zinc-900 text-white">Button</button> },
                { label: "Secondary", el: <button className="px-3 py-1.5 text-xs font-medium rounded border border-zinc-200 bg-white text-zinc-900">Button</button> },
                { label: "Ghost", el: <button className="px-3 py-1.5 text-xs font-medium rounded text-zinc-600 hover:bg-zinc-100">Button</button> },
                { label: "Destructive", el: <button className="px-3 py-1.5 text-xs font-medium rounded bg-red-500 text-white">Button</button> },
              ].map(({ label, el }) => (
                <tr key={label}>
                  <td className="px-4 py-3 text-zinc-600">{label}</td>
                  <td className="px-4 py-3">{el}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          코드
        </h2>
        <pre className="rounded-xl bg-zinc-950 text-zinc-100 text-xs px-5 py-4 overflow-x-auto leading-relaxed">
          <code>{`<button className="px-4 py-2 rounded-md bg-zinc-900 text-white">
  Button
</button>`}</code>
        </pre>
      </section>
    </div>
  );
}
