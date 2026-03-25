import { PageShell, Section, PreviewBox } from "@/components/PageShell";

export function ComponentButton() {
  return (
    <PageShell title="Button" description="클릭하면 동작이나 이벤트를 실행해요.">
      <Section title="미리보기">
        <PreviewBox>
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors">Primary</button>
          <button className="px-4 py-2 text-sm font-medium rounded-md border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 transition-colors">Secondary</button>
          <button className="px-4 py-2 text-sm font-medium rounded-md text-zinc-600 hover:bg-zinc-100 transition-colors">Ghost</button>
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors">Destructive</button>
        </PreviewBox>
      </Section>
      <Section title="변형">
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
      </Section>
      <Section title="코드">
        <pre className="rounded-xl bg-zinc-950 text-zinc-100 text-xs px-5 py-4 overflow-x-auto leading-relaxed">
          <code>{`<button className="px-4 py-2 rounded-md bg-zinc-900 text-white">
  Button
</button>`}</code>
        </pre>
      </Section>
    </PageShell>
  );
}
