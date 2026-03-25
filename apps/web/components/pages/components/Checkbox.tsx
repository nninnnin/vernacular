import { PageShell, Section, PreviewBox } from "@/components/PageShell";

export function ComponentCheckbox() {
  return (
    <PageShell title="Checkbox" description="하나 이상의 항목을 선택할 때 써요.">
      <Section title="미리보기">
        <PreviewBox>
          <label className="flex items-center gap-2 text-sm text-zinc-700 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 accent-zinc-900" defaultChecked />
            선택됨
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 accent-zinc-900" />
            미선택
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-not-allowed">
            <input type="checkbox" className="w-4 h-4 rounded border-zinc-200" disabled />
            비활성화
          </label>
        </PreviewBox>
      </Section>
      <Section title="코드">
        <pre className="rounded-xl bg-zinc-950 text-zinc-100 text-xs px-5 py-4 overflow-x-auto leading-relaxed">
          <code>{`<label className="flex items-center gap-2 text-sm cursor-pointer">
  <input type="checkbox" />
  레이블
</label>`}</code>
        </pre>
      </Section>
    </PageShell>
  );
}
