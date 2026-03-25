import { PageShell, Section, PreviewBox } from "@/components/PageShell";

export function ComponentSelect() {
  return (
    <PageShell title="Select" description="목록 중 하나를 선택하는 드롭다운이에요.">
      <Section title="미리보기">
        <PreviewBox>
          <select className="px-3 py-2 text-sm border border-zinc-200 rounded-md bg-white text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900 transition-all">
            <option>옵션 선택</option>
            <option>옵션 1</option>
            <option>옵션 2</option>
            <option>옵션 3</option>
          </select>
        </PreviewBox>
      </Section>
      <Section title="코드">
        <pre className="rounded-xl bg-zinc-950 text-zinc-100 text-xs px-5 py-4 overflow-x-auto leading-relaxed">
          <code>{`<select className="px-3 py-2 text-sm border border-zinc-200 rounded-md">
  <option>옵션 선택</option>
</select>`}</code>
        </pre>
      </Section>
    </PageShell>
  );
}
